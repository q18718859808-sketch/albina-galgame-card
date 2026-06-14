//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/* @__NO_SIDE_EFFECTS__ */
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, D = /-\w/g, O = E((e) => e.replace(D, (e) => e.slice(1).toUpperCase())), k = /\B([A-Z])/g, A = E((e) => e.replace(k, "-$1").toLowerCase()), ee = E((e) => e.charAt(0).toUpperCase() + e.slice(1)), te = E((e) => e ? `on${ee(e)}` : ""), j = (e, t) => !Object.is(e, t), ne = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, M = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, re = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ie = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ae, oe = () => ae ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function se(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? de(r) : se(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var ce = /;(?![^(]*\))/g, le = /:([^]+)/, ue = /\/\*[^]*?\*\//g;
function de(e) {
	let t = {};
	return e.replace(ue, "").split(ce).forEach((e) => {
		if (e) {
			let n = e.split(le);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function N(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = N(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var fe = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pe = /* @__PURE__ */ e(fe);
fe + "";
function me(e) {
	return !!e || e === "";
}
function he(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = ge(e[r], t[r]);
	return n;
}
function ge(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? he(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !ge(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
var _e = (e) => !!(e && e.__v_isRef === !0), P = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? _e(e) ? P(e.value) : JSON.stringify(e, ve, 2) : String(e), ve = (e, t) => _e(t) ? ve(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[ye(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => ye(e)) } : _(t) ? ye(t) : v(t) && !d(t) && !C(t) ? String(t) : t, ye = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, F, be = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && F && (F.active ? (this.parent = F, this.index = (F.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = F;
			try {
				return F = this, e();
			} finally {
				F = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = F, F = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (F === this) F = this.prevScope;
			else {
				let e = F;
				for (; e;) {
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
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function xe(e) {
	return new be(e);
}
function Se() {
	return F;
}
function I(e, t = !1) {
	F && F.cleanups.push(e);
}
var L, R = /* @__PURE__ */ new WeakSet(), z = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, F && (F.active ? F.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, R.has(this) && (R.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ee(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, ze(this), ke(this);
		let e = L, t = Fe;
		L = this, Fe = !0;
		try {
			return this.fn();
		} finally {
			Ae(this), L = e, Fe = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ne(e);
			this.deps = this.depsTail = void 0, ze(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? R.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		je(this) && this.run();
	}
	get dirty() {
		return je(this);
	}
}, Ce = 0, we, Te;
function Ee(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Te, Te = e;
		return;
	}
	e.next = we, we = e;
}
function De() {
	Ce++;
}
function Oe() {
	if (--Ce > 0) return;
	if (Te) {
		let e = Te;
		for (Te = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; we;) {
		let t = we;
		for (we = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function ke(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ae(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ne(r), Pe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function je(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Me(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Me(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Be) || (e.globalVersion = Be, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !je(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = L, r = Fe;
	L = e, Fe = !0;
	try {
		ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || j(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		L = n, Fe = r, Ae(e), e.flags &= -3;
	}
}
function Ne(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ne(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Pe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Fe = !0, Ie = [];
function Le() {
	Ie.push(Fe), Fe = !1;
}
function Re() {
	let e = Ie.pop();
	Fe = e === void 0 ? !0 : e;
}
function ze(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = L;
		L = void 0;
		try {
			t();
		} finally {
			L = e;
		}
	}
}
var Be = 0, Ve = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, He = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!L || !Fe || L === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== L) t = this.activeLink = new Ve(L, this), L.deps ? (t.prevDep = L.depsTail, L.depsTail.nextDep = t, L.depsTail = t) : L.deps = L.depsTail = t, Ue(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = L.depsTail, t.nextDep = void 0, L.depsTail.nextDep = t, L.depsTail = t, L.deps === t && (L.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Be++, this.notify(e);
	}
	notify(e) {
		De();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Oe();
		}
	}
};
function Ue(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ue(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var We = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ Symbol(""), Ke = /* @__PURE__ */ Symbol(""), qe = /* @__PURE__ */ Symbol("");
function Je(e, t, n) {
	if (Fe && L) {
		let t = We.get(e);
		t || We.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new He()), r.map = t, r.key = n), r.track();
	}
}
function Ye(e, t, n, r, i, a) {
	let o = We.get(e);
	if (!o) {
		Be++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (De(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === qe || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(qe)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ge)), f(e) && s(o.get(Ke)));
				break;
			case "delete":
				i || (s(o.get(Ge)), f(e) && s(o.get(Ke)));
				break;
			case "set":
				f(e) && s(o.get(Ge));
				break;
		}
	}
	Oe();
}
function Xe(e, t) {
	let n = We.get(e);
	return n && n.get(t);
}
function Ze(e) {
	let t = /* @__PURE__ */ zt(e);
	return t === e ? t : (Je(t, "iterate", qe), /* @__PURE__ */ Lt(e) ? t : t.map(Vt));
}
function Qe(e) {
	return Je(e = /* @__PURE__ */ zt(e), "iterate", qe), e;
}
function $e(e, t) {
	return /* @__PURE__ */ It(e) ? Ht(/* @__PURE__ */ Ft(e) ? Vt(t) : t) : Vt(t);
}
var et = {
	__proto__: null,
	[Symbol.iterator]() {
		return tt(this, Symbol.iterator, (e) => $e(this, e));
	},
	concat(...e) {
		return Ze(this).concat(...e.map((e) => d(e) ? Ze(e) : e));
	},
	entries() {
		return tt(this, "entries", (e) => (e[1] = $e(this, e[1]), e));
	},
	every(e, t) {
		return rt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return rt(this, "filter", e, t, (e) => e.map((e) => $e(this, e)), arguments);
	},
	find(e, t) {
		return rt(this, "find", e, t, (e) => $e(this, e), arguments);
	},
	findIndex(e, t) {
		return rt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return rt(this, "findLast", e, t, (e) => $e(this, e), arguments);
	},
	findLastIndex(e, t) {
		return rt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return rt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return at(this, "includes", e);
	},
	indexOf(...e) {
		return at(this, "indexOf", e);
	},
	join(e) {
		return Ze(this).join(e);
	},
	lastIndexOf(...e) {
		return at(this, "lastIndexOf", e);
	},
	map(e, t) {
		return rt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ot(this, "pop");
	},
	push(...e) {
		return ot(this, "push", e);
	},
	reduce(e, ...t) {
		return it(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return it(this, "reduceRight", e, t);
	},
	shift() {
		return ot(this, "shift");
	},
	some(e, t) {
		return rt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ot(this, "splice", e);
	},
	toReversed() {
		return Ze(this).toReversed();
	},
	toSorted(e) {
		return Ze(this).toSorted(e);
	},
	toSpliced(...e) {
		return Ze(this).toSpliced(...e);
	},
	unshift(...e) {
		return ot(this, "unshift", e);
	},
	values() {
		return tt(this, "values", (e) => $e(this, e));
	}
};
function tt(e, t, n) {
	let r = Qe(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Lt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var nt = Array.prototype;
function rt(e, t, n, r, i, a) {
	let o = Qe(e), s = o !== e && !/* @__PURE__ */ Lt(e), c = o[t];
	if (c !== nt[t]) {
		let t = c.apply(e, a);
		return s ? Vt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, $e(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function it(e, t, n, r) {
	let i = Qe(e), a = i !== e && !/* @__PURE__ */ Lt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = $e(e, t)), n.call(this, t, $e(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? $e(e, c) : c;
}
function at(e, t, n) {
	let r = /* @__PURE__ */ zt(e);
	Je(r, "iterate", qe);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Rt(n[0]) ? (n[0] = /* @__PURE__ */ zt(n[0]), r[t](...n)) : i;
}
function ot(e, t, n = []) {
	Le(), De();
	let r = (/* @__PURE__ */ zt(e))[t].apply(e, n);
	return Oe(), Re(), r;
}
var st = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ct = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function lt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ zt(this);
	return Je(t, "has", e), t.hasOwnProperty(e);
}
var ut = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Ot : Dt : i ? Et : Tt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = et[t])) return e;
			if (t === "hasOwnProperty") return lt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ Ut(e) ? e : n);
		if ((_(t) ? ct.has(t) : st(t)) || (r || Je(e, "get", t), i)) return o;
		if (/* @__PURE__ */ Ut(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Nt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Nt(o) : /* @__PURE__ */ jt(o) : o;
	}
}, dt = class extends ut {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ It(i);
			if (!/* @__PURE__ */ Lt(n) && !/* @__PURE__ */ It(n) && (i = /* @__PURE__ */ zt(i), n = /* @__PURE__ */ zt(n)), !a && /* @__PURE__ */ Ut(i) && !/* @__PURE__ */ Ut(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ Ut(e) ? e : r);
		return e === /* @__PURE__ */ zt(r) && (o ? j(n, i) && Ye(e, "set", t, n, i) : Ye(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Ye(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !ct.has(t)) && Je(e, "has", t), n;
	}
	ownKeys(e) {
		return Je(e, "iterate", d(e) ? "length" : Ge), Reflect.ownKeys(e);
	}
}, ft = class extends ut {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, pt = /* @__PURE__ */ new dt(), mt = /* @__PURE__ */ new ft(), ht = /* @__PURE__ */ new dt(!0), gt = (e) => e, _t = (e) => Reflect.getPrototypeOf(e);
function vt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ zt(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? gt : t ? Ht : Vt;
		return !t && Je(a, "iterate", l ? Ke : Ge), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function yt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function bt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ zt(r), a = /* @__PURE__ */ zt(n);
			e || (j(n, a) && Je(i, "get", n), Je(i, "get", a));
			let { has: o } = _t(i), s = t ? gt : e ? Ht : Vt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && Je(/* @__PURE__ */ zt(t), "iterate", Ge), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ zt(n), i = /* @__PURE__ */ zt(t);
			return e || (j(t, i) && Je(r, "has", t), Je(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ zt(a), s = t ? gt : e ? Ht : Vt;
			return !e && Je(o, "iterate", Ge), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: yt("add"),
		set: yt("set"),
		delete: yt("delete"),
		clear: yt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ zt(this), r = _t(n), i = /* @__PURE__ */ zt(e), a = !t && !/* @__PURE__ */ Lt(e) && !/* @__PURE__ */ It(e) ? i : e;
			return r.has.call(n, a) || j(e, a) && r.has.call(n, e) || j(i, a) && r.has.call(n, i) || (n.add(a), Ye(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Lt(n) && !/* @__PURE__ */ It(n) && (n = /* @__PURE__ */ zt(n));
			let r = /* @__PURE__ */ zt(this), { has: i, get: a } = _t(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ zt(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? j(n, s) && Ye(r, "set", e, n, s) : Ye(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ zt(this), { has: n, get: r } = _t(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ zt(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Ye(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ zt(this), t = e.size !== 0, n = e.clear();
			return t && Ye(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = vt(r, e, t);
	}), n;
}
function xt(e, t) {
	let n = bt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var St = { get: /* @__PURE__ */ xt(!1, !1) }, Ct = { get: /* @__PURE__ */ xt(!1, !0) }, wt = { get: /* @__PURE__ */ xt(!0, !1) }, Tt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap();
function kt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
function At(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : kt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function jt(e) {
	return /* @__PURE__ */ It(e) ? e : Pt(e, !1, pt, St, Tt);
}
/* @__NO_SIDE_EFFECTS__ */
function Mt(e) {
	return Pt(e, !1, ht, Ct, Et);
}
/* @__NO_SIDE_EFFECTS__ */
function Nt(e) {
	return Pt(e, !0, mt, wt, Dt);
}
function Pt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = At(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return /* @__PURE__ */ It(e) ? /* @__PURE__ */ Ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function It(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ zt(t) : e;
}
function Bt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && M(e, "__v_skip", !0), e;
}
var Vt = (e) => v(e) ? /* @__PURE__ */ jt(e) : e, Ht = (e) => v(e) ? /* @__PURE__ */ Nt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function Ut(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function Wt(e) {
	return Gt(e, !1);
}
function Gt(e, t) {
	return /* @__PURE__ */ Ut(e) ? e : new Kt(e, t);
}
var Kt = class {
	constructor(e, t) {
		this.dep = new He(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ zt(e), this._value = t ? e : Vt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Lt(e) || /* @__PURE__ */ It(e);
		e = n ? e : /* @__PURE__ */ zt(e), j(e, t) && (this._rawValue = e, this._value = n ? e : Vt(e), this.dep.trigger());
	}
};
function B(e) {
	return /* @__PURE__ */ Ut(e) ? e.value : e;
}
var qt = {
	get: (e, t, n) => t === "__v_raw" ? e : B(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ Ut(i) && !/* @__PURE__ */ Ut(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Jt(e) {
	return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, qt);
}
/* @__NO_SIDE_EFFECTS__ */
function Yt(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Zt(e, n);
	return t;
}
var Xt = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ zt(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Rt(i) || /* @__PURE__ */ Lt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = B(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ Ut(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ Ut(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Xe(this._raw, this._key);
	}
};
function Zt(e, t, n) {
	return new Xt(e, t, n);
}
var Qt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new He(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Be - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && L !== this) return Ee(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Me(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function $t(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Qt(r, i, n);
}
var en = {}, tn = /* @__PURE__ */ new WeakMap(), nn = void 0;
function rn(e, t = !1, n = nn) {
	if (n) {
		let t = tn.get(n);
		t || tn.set(n, t = []), t.push(e);
	}
}
function an(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Lt(e) || o === !1 || o === 0 ? on(e, 1) : on(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ Ut(e) ? (g = () => e.value, y = /* @__PURE__ */ Lt(e)) : /* @__PURE__ */ Ft(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Ft(e) || /* @__PURE__ */ Lt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ Ut(e)) return e.value;
		if (/* @__PURE__ */ Ft(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Le();
			try {
				_();
			} finally {
				Re();
			}
		}
		let t = nn;
		nn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			nn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => on(e(), t);
	}
	let x = Se(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(en) : en, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => j(e, C[t])) : j(e, C))) {
				_ && _();
				let t = nn;
				nn = m;
				try {
					let t = [
						e,
						C === en ? void 0 : b && C[0] === en ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					nn = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new z(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => rn(e, !1, m), _ = m.onStop = () => {
		let e = tn.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			tn.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function on(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ Ut(e)) on(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) on(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		on(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) on(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && on(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function sn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		ln(e, t, n);
	}
}
function cn(e, t, n, r) {
	if (h(e)) {
		let i = sn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			ln(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(cn(e[a], t, n, r));
		return i;
	}
}
function ln(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Le(), sn(o, null, 10, [
				e,
				i,
				a
			]), Re();
			return;
		}
	}
	un(e, r, a, i, s);
}
function un(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var dn = [], fn = -1, pn = [], mn = null, hn = 0, gn = /* @__PURE__ */ Promise.resolve(), _n = null;
function vn(e) {
	let t = _n || gn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function yn(e) {
	let t = fn + 1, n = dn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = dn[r], a = Tn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function bn(e) {
	if (!(e.flags & 1)) {
		let t = Tn(e), n = dn[dn.length - 1];
		!n || !(e.flags & 2) && t >= Tn(n) ? dn.push(e) : dn.splice(yn(t), 0, e), e.flags |= 1, xn();
	}
}
function xn() {
	_n ||= gn.then(En);
}
function Sn(e) {
	d(e) ? pn.push(...e) : mn && e.id === -1 ? mn.splice(hn + 1, 0, e) : e.flags & 1 || (pn.push(e), e.flags |= 1), xn();
}
function Cn(e, t, n = fn + 1) {
	for (; n < dn.length; n++) {
		let t = dn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			dn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function wn(e) {
	if (pn.length) {
		let e = [...new Set(pn)].sort((e, t) => Tn(e) - Tn(t));
		if (pn.length = 0, mn) {
			mn.push(...e);
			return;
		}
		for (mn = e, hn = 0; hn < mn.length; hn++) {
			let e = mn[hn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		mn = null, hn = 0;
	}
}
var Tn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function En(e) {
	try {
		for (fn = 0; fn < dn.length; fn++) {
			let e = dn[fn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), sn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; fn < dn.length; fn++) {
			let e = dn[fn];
			e && (e.flags &= -2);
		}
		fn = -1, dn.length = 0, wn(e), _n = null, (dn.length || pn.length) && En(e);
	}
}
var Dn = null, On = null;
function kn(e) {
	let t = Dn;
	return Dn = e, On = e && e.type.__scopeId || null, t;
}
function An(e, t = Dn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Wi(-1);
		let i = kn(t), a;
		try {
			a = e(...n);
		} finally {
			kn(i), r._d && Wi(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function jn(e, n) {
	if (Dn === null) return e;
	let r = Da(Dn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && on(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Mn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Le(), cn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Re());
	}
}
function Nn(e, t) {
	if (da) {
		let n = da.provides, r = da.parent && da.parent.provides;
		r === n && (n = da.provides = Object.create(r)), n[e] = t;
	}
}
function Pn(e, t, n = !1) {
	let r = fa();
	if (r || qr) {
		let i = qr ? qr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function Fn() {
	return !!(fa() || qr);
}
var In = /* @__PURE__ */ Symbol.for("v-scx"), Ln = () => Pn(In);
function Rn(e, t, n) {
	return zn(e, t, n);
}
function zn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (va) {
		if (c === "sync") {
			let e = Ln();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = da;
	u.call = (e, t, n) => cn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		wi(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : bn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = an(e, n, u);
	return va && (f ? f.push(h) : d && h()), h;
}
function Bn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Vn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = ha(this), s = zn(i, a.bind(r), n);
	return o(), s;
}
function Vn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Hn = /* @__PURE__ */ Symbol("_vte"), Un = (e) => e.__isTeleport, Wn = /* @__PURE__ */ Symbol("_leaveCb"), Gn = /* @__PURE__ */ Symbol("_enterCb");
function Kn() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return mr(() => {
		e.isMounted = !0;
	}), _r(() => {
		e.isUnmounting = !0;
	}), e;
}
var qn = [Function, Array], Jn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: qn,
	onEnter: qn,
	onAfterEnter: qn,
	onEnterCancelled: qn,
	onBeforeLeave: qn,
	onLeave: qn,
	onAfterLeave: qn,
	onLeaveCancelled: qn,
	onBeforeAppear: qn,
	onAppear: qn,
	onAfterAppear: qn,
	onAppearCancelled: qn
};
function Yn(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Xn(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Yn(n, e), C = (e, t) => {
		e && cn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Wn] && t[Wn](!0);
			let i = S[x];
			i && Ji(e, i) && i.el[Wn] && i.el[Wn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[Gn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Gn] = void 0);
			};
			let c = t[Gn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Gn] && t[Gn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Wn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Wn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Wn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Xn(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function Zn(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, Zn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Qn(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === H ? (o.patchFlag & 128 && i++, r = r.concat(Qn(o.children, t, s))) : (t || o.type !== Ri) && r.push(s == null ? o : ea(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function $n(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function er(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function tr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var nr = /* @__PURE__ */ new WeakMap();
function rr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => rr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (ar(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && rr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Da(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ zt(v), b = v === t ? i : (e) => tr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && tr(_, t));
	if (m != null && m !== p) {
		if (ir(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ Ut(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) sn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ Ut(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), nr.delete(e);
				};
				t.id = -1, nr.set(e, t), wi(t, r);
			} else ir(e), i();
		}
	}
}
function ir(e) {
	let t = nr.get(e);
	t && (t.flags |= 8, nr.delete(e));
}
oe().requestIdleCallback, oe().cancelIdleCallback;
var ar = (e) => !!e.type.__asyncLoader, or = (e) => e.type.__isKeepAlive;
function sr(e, t) {
	lr(e, "a", t);
}
function cr(e, t) {
	lr(e, "da", t);
}
function lr(e, t, n = da) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (dr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) or(e.parent.vnode) && ur(r, t, n, e), e = e.parent;
	}
}
function ur(e, t, n, r) {
	let i = dr(t, e, r, !0);
	vr(() => {
		c(r[t], i);
	}, n);
}
function dr(e, t, n = da, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Le();
			let i = ha(n), a = cn(t, n, e, r);
			return i(), Re(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var fr = (e) => (t, n = da) => {
	(!va || e === "sp") && dr(e, (...e) => t(...e), n);
}, pr = fr("bm"), mr = fr("m"), hr = fr("bu"), gr = fr("u"), _r = fr("bum"), vr = fr("um"), yr = fr("sp"), br = fr("rtg"), xr = fr("rtc");
function Sr(e, t = da) {
	dr("ec", e, t);
}
var Cr = /* @__PURE__ */ Symbol.for("v-ndc");
function V(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Ft(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Lt(e), s = /* @__PURE__ */ It(e), e = Qe(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Ht(Vt(e[n])) : Vt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var wr = (e) => e ? _a(e) ? Da(e) : wr(e.parent) : null, Tr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => wr(e.parent),
	$root: (e) => wr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Pr(e),
	$forceUpdate: (e) => e.f ||= () => {
		bn(e.update);
	},
	$nextTick: (e) => e.n ||= vn.bind(e.proxy),
	$watch: (e) => Bn.bind(e)
}), Er = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Dr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Er(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else kr && (s[n] = 0);
		}
		let d = Tr[n], f, p;
		if (d) return n === "$attrs" && Je(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Er(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Er(n, c) || u(o, c) || u(i, c) || u(Tr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Or(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var kr = !0;
function Ar(e) {
	let t = Pr(e), n = e.proxy, i = e.ctx;
	kr = !1, t.beforeCreate && Mr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: D, errorCaptured: O, serverPrefetch: k, expose: A, inheritAttrs: ee, components: te, directives: j, filters: ne } = t;
	if (u && jr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ jt(t));
	}
	if (kr = !0, o) for (let e in o) {
		let t = o[e], a = K({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Nr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Nn(t, e[t]);
		});
	}
	f && Mr(f, e, "c");
	function M(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (M(pr, p), M(mr, m), M(hr, g), M(gr, _), M(sr, y), M(cr, b), M(Sr, O), M(xr, E), M(br, D), M(_r, S), M(vr, w), M(yr, k), d(A)) if (A.length) {
		let t = e.exposed ||= {};
		A.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), ee != null && (e.inheritAttrs = ee), te && (e.components = te), j && (e.directives = j), k && er(e);
}
function jr(e, t, n = r) {
	d(e) && (e = zr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Pn(r.from || n, r.default, !0) : Pn(r.from || n) : Pn(r), /* @__PURE__ */ Ut(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Mr(e, t, n) {
	cn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Nr(e, t, n, r) {
	let i = r.includes(".") ? Vn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Rn(i, n);
	} else if (h(e)) Rn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Nr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Rn(i, r, e);
	}
}
function Pr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Fr(c, e, o, !0)), Fr(c, t, o)), v(t) && a.set(t, c), c;
}
function Fr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Fr(e, a, n, !0), i && i.forEach((t) => Fr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ir[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ir = {
	data: Lr,
	props: Hr,
	emits: Hr,
	methods: Vr,
	computed: Vr,
	beforeCreate: Br,
	created: Br,
	beforeMount: Br,
	mounted: Br,
	beforeUpdate: Br,
	updated: Br,
	beforeDestroy: Br,
	beforeUnmount: Br,
	destroyed: Br,
	unmounted: Br,
	activated: Br,
	deactivated: Br,
	errorCaptured: Br,
	serverPrefetch: Br,
	components: Vr,
	directives: Vr,
	watch: Ur,
	provide: Lr,
	inject: Rr
};
function Lr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Rr(e, t) {
	return Vr(zr(e), zr(t));
}
function zr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Br(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Vr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Hr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Or(e), Or(t ?? {})) : t;
}
function Ur(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Br(e[r], t[r]);
	return n;
}
function Wr() {
	return {
		app: null,
		config: {
			isNativeTag: i,
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
var Gr = 0;
function Kr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Wr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Gr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: ka,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || Zi(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Da(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (cn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = qr;
				qr = l;
				try {
					return e();
				} finally {
					qr = t;
				}
			}
		};
		return l;
	};
}
var qr = null, Jr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${O(t)}Modifiers`] || e[`${A(t)}Modifiers`];
function Yr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Jr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(re)));
	let c, l = i[c = te(n)] || i[c = te(O(n))];
	!l && o && (l = i[c = te(A(n))]), l && cn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, cn(u, e, 6, a);
	}
}
var Xr = /* @__PURE__ */ new WeakMap();
function Zr(e, t, n = !1) {
	let r = n ? Xr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Zr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Qr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, A(t)) || u(e, t));
}
function $r(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = kn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ra(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = ra(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : ei(c);
		}
	} catch (t) {
		Bi.length = 0, ln(t, e, 1), v = Zi(Ri);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = ti(y, a)), b = ea(b, y, !1, !0));
	}
	return n.dirs && (b = ea(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Zn(b, n.transition), v = b, kn(_), v;
}
var ei = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, ti = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function ni(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ri(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ii(o, r, n) && !Qr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? ri(r, o, l) : !0 : !!o;
	return !1;
}
function ri(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ii(t, e, a) && !Qr(n, a)) return !0;
	}
	return !1;
}
function ii(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ge(r, i) : r !== i;
}
function ai({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var oi = {}, si = () => Object.create(oi), ci = (e) => Object.getPrototypeOf(e) === oi;
function li(e, t, n, r = !1) {
	let i = {}, a = si();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), di(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Mt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function ui(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ zt(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Qr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = O(o);
					i[t] = fi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		di(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = A(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = fi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && Ye(e.attrs, "set", "");
}
function di(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = O(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Qr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ zt(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = fi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function fi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ha(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === A(n)) && (r = !0));
	}
	return r;
}
var pi = /* @__PURE__ */ new WeakMap();
function mi(e, r, i = !1) {
	let a = i ? pi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = mi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = O(c[e]);
		hi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = O(e);
		if (hi(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				} else n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function hi(e) {
	return e[0] !== "$" && !T(e);
}
var gi = (e) => e === "_" || e === "_ctx" || e === "$stable", _i = (e) => d(e) ? e.map(ra) : [ra(e)], vi = (e, t, n) => {
	if (t._n) return t;
	let r = An((...e) => _i(t(...e)), n);
	return r._c = !1, r;
}, yi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (gi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = vi(n, i, r);
		else if (i != null) {
			let e = _i(i);
			t[n] = () => e;
		}
	}
}, bi = (e, t) => {
	let n = _i(t);
	e.slots.default = () => n;
}, xi = (e, t, n) => {
	for (let r in t) (n || !gi(r)) && (e[r] = t[r]);
}, Si = (e, t, n) => {
	let r = e.slots = si();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (xi(r, t, n), n && M(r, "_", e, !0)) : yi(t, r);
	} else t && bi(e, t);
}, Ci = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : xi(a, n, r) : (o = !n.$stable, yi(n, a)), s = n;
	} else n && (bi(e, n), s = { default: 1 });
	if (o) for (let e in a) !gi(e) && s[e] == null && delete a[e];
}, wi = Ii;
function Ti(e) {
	return Ei(e);
}
function Ei(e, i) {
	let a = oe();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Ji(e, t) && (r = he(e), de(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Li:
				y(e, t, n, r);
				break;
			case Ri:
				b(e, t, n, r);
				break;
			case zi:
				e ?? x(t, n, r, o);
				break;
			case H:
				te(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? j(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, P);
		}
		u != null && i ? rr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && rr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), k(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && O(e.children, d, null, r, i, Di(e, a), s, u), _ && Mn(e, null, r, "created"), D(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && sa(f, r, e);
		}
		_ && Mn(e, null, r, "beforeMount");
		let v = ki(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && wi(() => {
			try {
				f && sa(f, r, e), v && g.enter(d), _ && Mn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, D = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Fi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				D(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, O = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ia(e[l]) : ra(e[l]), t, n, r, i, a, o, s);
	}, k = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Oi(r, !1), (g = h.onVnodeBeforeUpdate) && sa(g, r, n, e), f && Mn(n, e, r, "beforeUpdate"), r && Oi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? A(e.dynamicChildren, d, l, r, i, Di(n, a), o) : s || se(e, n, l, null, r, i, Di(n, a), o, !1), u > 0) {
			if (u & 16) ee(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ee(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && wi(() => {
			g && sa(g, r, n, e), f && Mn(n, e, r, "updated");
		}, i);
	}, A = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === H || !Ji(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ee = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, te = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), O(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (A(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ai(e, t, !0)) : se(e, t, n, f, i, a, s, c, l);
	}, j = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : M(t, n, r, i, a, o, c) : re(e, t, c);
	}, M = (e, t, n, r, i, a, o) => {
		let s = e.component = ua(e, r, i);
		if (or(e) && (s.ctx.renderer = P), ya(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ie, o), !e.el) {
				let r = s.subTree = Zi(Ri);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ie(s, e, t, n, i, a, o);
	}, re = (e, t, n) => {
		let r = t.component = e.component;
		if (ni(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ae(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ie = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Mi(e);
					if (n) {
						t && (t.el = c.el, ae(e, t, o)), n.asyncDep.then(() => {
							wi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Oi(e, !1), t ? (t.el = c.el, ae(e, t, o)) : t = c, n && ne(n), (d = t.props && t.props.onVnodeBeforeUpdate) && sa(d, s, t, c), Oi(e, !0);
				let f = $r(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), he(p), e, i, a), t.el = f.el, u === null && ai(e, f.el), r && wi(r, i), (d = t.props && t.props.onVnodeUpdated) && wi(() => sa(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = ar(t);
				if (Oi(e, !1), l && ne(l), !m && (o = c && c.onVnodeBeforeMount) && sa(o, d, t), Oi(e, !0), s && ye) {
					let t = () => {
						e.subTree = $r(e), ye(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = $r(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && wi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					wi(() => sa(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && ar(d.vnode) && d.vnode.shapeFlag & 256) && e.a && wi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new z(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => bn(u), Oi(e, !0), l();
	}, ae = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, ui(e, t.props, r, n), Ci(e, t.children, n), Le(), Cn(e), Re();
	}, se = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				le(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && me(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? le(l, d, n, r, i, a, o, s, c) : me(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && O(d, n, r, i, a, o, s, c));
	}, ce = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? ia(t[p]) : ra(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? me(e, a, o, !0, !1, f) : O(t, r, i, a, o, s, c, l, f);
	}, le = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ia(t[u]) : ra(t[u]);
			if (Ji(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ia(t[p]) : ra(t[p]);
			if (Ji(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ia(t[u]) : ra(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) de(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ia(t[u]) : ra(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					de(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Ji(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? de(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? ji(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Pi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? ue(n, r, p, 2) : _--);
			}
		}
	}, ue = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			ue(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, P);
			return;
		}
		if (c === H) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) ue(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === zi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), wi(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Wn](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, de = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Le(), rr(s, null, n, e, !0), Re()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !ar(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && sa(_, t, e), u & 6) pe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Mn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, P, r) : l && !l.hasOnce && (a !== H || d > 0 && d & 64) ? me(l, t, n, !1, !0) : (a === H && d & 384 || !i && u & 16) && me(c, t, n), r && N(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && wi(() => {
			_ && sa(_, t, e), h && Mn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, N = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === H) {
			fe(n, r);
			return;
		}
		if (t === zi) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, fe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, pe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ni(c), Ni(l), r && ne(r), i.stop(), a && (a.flags |= 8, de(o, e, t, n)), s && wi(s, t), wi(() => {
			e.isUnmounted = !0;
		}, t);
	}, me = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) de(e[o], t, n, r, i);
	}, he = (e) => {
		if (e.shapeFlag & 6) return he(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Hn];
		return n ? h(n) : t;
	}, ge = !1, _e = (e, t, n) => {
		let r;
		e == null ? t._vnode && (de(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ge ||= (ge = !0, Cn(r), wn(), !1);
	}, P = {
		p: v,
		um: de,
		m: ue,
		r: N,
		mt: M,
		mc: O,
		pc: se,
		pbc: A,
		n: he,
		o: e
	}, ve, ye;
	return i && ([ve, ye] = i(P)), {
		render: _e,
		hydrate: ve,
		createApp: Kr(_e, ve)
	};
}
function Di({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Oi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ki(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ai(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ia(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ai(t, a)), a.type === Li && (a.patchFlag === -1 && (a = i[e] = ia(a)), a.el = t.el), a.type === Ri && !a.el && (a.el = t.el);
	}
}
function ji(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function Mi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Mi(t);
}
function Ni(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Pi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Pi(t.subTree) : null;
}
var Fi = (e) => e.__isSuspense;
function Ii(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Sn(e);
}
var H = /* @__PURE__ */ Symbol.for("v-fgt"), Li = /* @__PURE__ */ Symbol.for("v-txt"), Ri = /* @__PURE__ */ Symbol.for("v-cmt"), zi = /* @__PURE__ */ Symbol.for("v-stc"), Bi = [], Vi = null;
function U(e = !1) {
	Bi.push(Vi = e ? null : []);
}
function Hi() {
	Bi.pop(), Vi = Bi[Bi.length - 1] || null;
}
var Ui = 1;
function Wi(e, t = !1) {
	Ui += e, e < 0 && Vi && t && (Vi.hasOnce = !0);
}
function Gi(e) {
	return e.dynamicChildren = Ui > 0 ? Vi || n : null, Hi(), Ui > 0 && Vi && Vi.push(e), e;
}
function W(e, t, n, r, i, a) {
	return Gi(G(e, t, n, r, i, a, !0));
}
function Ki(e, t, n, r, i) {
	return Gi(Zi(e, t, n, r, i, !0));
}
function qi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Ji(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Yi = ({ key: e }) => e ?? null, Xi = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ Ut(e) || h(e) ? {
	i: Dn,
	r: e,
	k: t,
	f: !!n
} : e);
function G(e, t = null, n = null, r = 0, i = null, a = e === H ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Yi(t),
		ref: t && Xi(t),
		scopeId: On,
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
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Dn
	};
	return s ? (aa(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ui > 0 && !o && Vi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Vi.push(c), c;
}
var Zi = Qi;
function Qi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Cr) && (e = Ri), qi(e)) {
		let r = ea(e, t, !0);
		return n && aa(r, n), Ui > 0 && !a && Vi && (r.shapeFlag & 6 ? Vi[Vi.indexOf(e)] = r : Vi.push(r)), r.patchFlag = -2, r;
	}
	if (Oa(e) && (e = e.__vccOpts), t) {
		t = $i(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = N(e)), v(n) && (/* @__PURE__ */ Rt(n) && !d(n) && (n = s({}, n)), t.style = se(n));
	}
	let o = g(e) ? 1 : Fi(e) ? 128 : Un(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return G(e, t, n, r, i, o, a, !0);
}
function $i(e) {
	return e ? /* @__PURE__ */ Rt(e) || ci(e) ? s({}, e) : e : null;
}
function ea(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? oa(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Yi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Xi(t)) : [a, Xi(t)] : Xi(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== H ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && ea(e.ssContent),
		ssFallback: e.ssFallback && ea(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Zn(u, c.clone(u)), u;
}
function ta(e = " ", t = 0) {
	return Zi(Li, null, e, t);
}
function na(e = "", t = !1) {
	return t ? (U(), Ki(Ri, null, e)) : Zi(Ri, null, e);
}
function ra(e) {
	return e == null || typeof e == "boolean" ? Zi(Ri) : d(e) ? Zi(H, null, e.slice()) : qi(e) ? ia(e) : Zi(Li, null, String(e));
}
function ia(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : ea(e);
}
function aa(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), aa(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ci(t) ? t._ctx = Dn : r === 3 && Dn && (Dn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: Dn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ta(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function oa(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = N([t.class, r.class]));
		else if (e === "style") t.style = se([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function sa(e, t, n, r = null) {
	cn(e, t, 7, [n, r]);
}
var ca = Wr(), la = 0;
function ua(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ca, o = {
		uid: la++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new be(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: mi(i, a),
		emitsOptions: Zr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Yr.bind(null, o), e.ce && e.ce(o), o;
}
var da = null, fa = () => da || Dn, pa, ma;
{
	let e = oe(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	pa = t("__VUE_INSTANCE_SETTERS__", (e) => da = e), ma = t("__VUE_SSR_SETTERS__", (e) => va = e);
}
var ha = (e) => {
	let t = da;
	return pa(e), e.scope.on(), () => {
		e.scope.off(), pa(t);
	};
}, ga = () => {
	da && da.scope.off(), pa(null);
};
function _a(e) {
	return e.vnode.shapeFlag & 4;
}
var va = !1;
function ya(e, t = !1, n = !1) {
	t && ma(t);
	let { props: r, children: i } = e.vnode, a = _a(e);
	li(e, r, a, t), Si(e, i, n || t);
	let o = a ? ba(e, t) : void 0;
	return t && ma(!1), o;
}
function ba(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Dr);
	let { setup: r } = n;
	if (r) {
		Le();
		let n = e.setupContext = r.length > 1 ? Ea(e) : null, i = ha(e), a = sn(r, e, 0, [e.props, n]), o = y(a);
		if (Re(), i(), (o || e.sp) && !ar(e) && er(e), o) {
			if (a.then(ga, ga), t) return a.then((n) => {
				xa(e, n, t);
			}).catch((t) => {
				ln(t, e, 0);
			});
			e.asyncDep = a;
		} else xa(e, a, t);
	} else wa(e, t);
}
function xa(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Jt(t)), wa(e, n);
}
var Sa, Ca;
function wa(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Sa && !i.render) {
			let t = i.template || Pr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = Sa(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, Ca && Ca(e);
	}
	{
		let t = ha(e);
		Le();
		try {
			Ar(e);
		} finally {
			Re(), t();
		}
	}
}
var Ta = { get(e, t) {
	return Je(e, "get", ""), e[t];
} };
function Ea(e) {
	return {
		attrs: new Proxy(e.attrs, Ta),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Da(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Jt(Bt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Tr) return Tr[n](e);
		},
		has(e, t) {
			return t in e || t in Tr;
		}
	}) : e.proxy;
}
function Oa(e) {
	return h(e) && "__vccOpts" in e;
}
var K = (e, t) => /* @__PURE__ */ $t(e, t, va), ka = "3.5.34", Aa = void 0, ja = typeof window < "u" && window.trustedTypes;
if (ja) try {
	Aa = /* @__PURE__ */ ja.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ma = Aa ? (e) => Aa.createHTML(e) : (e) => e, Na = "http://www.w3.org/2000/svg", Pa = "http://www.w3.org/1998/Math/MathML", Fa = typeof document < "u" ? document : null, Ia = Fa && /* @__PURE__ */ Fa.createElement("template"), La = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Fa.createElementNS(Na, e) : t === "mathml" ? Fa.createElementNS(Pa, e) : n ? Fa.createElement(e, { is: n }) : Fa.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Fa.createTextNode(e),
	createComment: (e) => Fa.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Fa.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ia.innerHTML = Ma(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ia.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ra = "transition", za = "animation", Ba = /* @__PURE__ */ Symbol("_vtc"), Va = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Ha = /* @__PURE__ */ s({}, Jn, Va), Ua = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Wa = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Ga(e) {
	let t = {};
	for (let n in e) n in Va || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Ka(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Ya(e, t ? d : c), Ya(e, t ? u : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, Ya(e, f), Ya(e, m), Ya(e, p), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Ua(i, [t, o]), Xa(() => {
			Ya(t, e ? l : a), Ja(t, e ? d : c), Wa(i) || Qa(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			Ua(v, [e]), Ja(e, a), Ja(e, o);
		},
		onBeforeAppear(e) {
			Ua(C, [e]), Ja(e, l), Ja(e, u);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			Ja(e, f), e._enterCancelled ? (Ja(e, p), no(e)) : (no(e), Ja(e, p)), Xa(() => {
				e._isLeaving && (Ya(e, f), Ja(e, m), Wa(x) || Qa(e, r, _, n));
			}), Ua(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Ua(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Ua(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), Ua(S, [e]);
		}
	});
}
function Ka(e) {
	if (e == null) return null;
	if (v(e)) return [qa(e.enter), qa(e.leave)];
	{
		let t = qa(e);
		return [t, t];
	}
}
function qa(e) {
	return ie(e);
}
function Ja(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Ba] || (e[Ba] = /* @__PURE__ */ new Set())).add(t);
}
function Ya(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Ba];
	n && (n.delete(t), n.size || (e[Ba] = void 0));
}
function Xa(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Za = 0;
function Qa(e, t, n, r) {
	let i = e._endId = ++Za, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = $a(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function $a(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Ra}Delay`), a = r(`${Ra}Duration`), o = eo(i, a), s = r(`${za}Delay`), c = r(`${za}Duration`), l = eo(s, c), u = null, d = 0, f = 0;
	t === Ra ? o > 0 && (u = Ra, d = o, f = a.length) : t === za ? l > 0 && (u = za, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Ra : za : null, f = u ? u === Ra ? a.length : c.length : 0);
	let p = u === Ra && /\b(?:transform|all)(?:,|$)/.test(r(`${Ra}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function eo(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => to(t) + to(e[n])));
}
function to(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function no(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function ro(e, t, n) {
	let r = e[Ba];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var io = /* @__PURE__ */ Symbol("_vod"), ao = /* @__PURE__ */ Symbol("_vsh"), oo = /* @__PURE__ */ Symbol(""), so = /(?:^|;)\s*display\s*:/;
function co(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? uo(r, t, "");
		}
		else for (let e in t) n[e] ?? uo(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? uo(r, i, "") : ho(e, i, !g(t) && t ? t[i] : void 0, o) || uo(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[oo];
			e && (n += ";" + e), r.cssText = n, a = so.test(n);
		}
	} else t && e.removeAttribute("style");
	io in e && (e[io] = a ? r.display : "", e[ao] && (r.display = "none"));
}
var lo = /\s*!important$/;
function uo(e, t, n) {
	if (d(n)) n.forEach((n) => uo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = mo(e, t);
		lo.test(n) ? e.setProperty(A(r), n.replace(lo, ""), "important") : e[r] = n;
	}
}
var fo = [
	"Webkit",
	"Moz",
	"ms"
], po = {};
function mo(e, t) {
	let n = po[t];
	if (n) return n;
	let r = O(t);
	if (r !== "filter" && r in e) return po[t] = r;
	r = ee(r);
	for (let n = 0; n < fo.length; n++) {
		let i = fo[n] + r;
		if (i in e) return po[t] = i;
	}
	return t;
}
function ho(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var go = "http://www.w3.org/1999/xlink";
function _o(e, t, n, r, i, a = pe(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(go, t.slice(6, t.length)) : e.setAttributeNS(go, t, n) : n == null || a && !me(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function vo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ma(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = me(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function yo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function bo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var xo = /* @__PURE__ */ Symbol("_vei");
function So(e, t, n, r, i = null) {
	let a = e[xo] || (e[xo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = wo(t);
		r ? yo(e, n, a[t] = Oo(r, i), s) : o && (bo(e, n, o, s), a[t] = void 0);
	}
}
var Co = /(?:Once|Passive|Capture)$/;
function wo(e) {
	let t;
	if (Co.test(e)) {
		t = {};
		let n;
		for (; n = e.match(Co);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : A(e.slice(2)), t];
}
var To = 0, Eo = /* @__PURE__ */ Promise.resolve(), Do = () => To ||= (Eo.then(() => To = 0), Date.now());
function Oo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		cn(ko(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = Do(), n;
}
function ko(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var Ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? ro(e, r, c) : t === "style" ? co(e, n, r) : a(t) ? o(t) || So(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mo(e, t, r, c)) ? (vo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && _o(e, t, r, c, s, t !== "value")) : e._isVueCE && (No(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? vo(e, O(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), _o(e, t, r, c));
};
function Mo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ao(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ao(t) && g(n) ? !1 : t in e;
}
function No(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = O(t);
	return Array.isArray(n) ? n.some((e) => O(e) === r) : Object.keys(n).some((e) => O(e) === r);
}
var Po = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ Symbol("_moveCb"), Lo = /* @__PURE__ */ Symbol("_enterCb"), Ro = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ s({}, Ha, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = fa(), r = Kn(), i, a;
		return gr(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!Uo(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(zo), i.forEach(Bo);
			let r = i.filter(Vo);
			no(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				Ja(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Io] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Io] = null, Ya(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ zt(e), s = Ga(o), c = o.tag || H;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && (i.push(t), Zn(t, Xn(t, s, r, n)), Po.set(t, Ho(t.el)));
			}
			a = t.default ? Qn(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && Zn(t, Xn(t, s, r, n));
			}
			return Zi(c, null, a);
		};
	}
});
function zo(e) {
	let t = e.el;
	t[Io] && t[Io](), t[Lo] && t[Lo]();
}
function Bo(e) {
	Fo.set(e, Ho(e.el));
}
function Vo(e) {
	let t = Po.get(e), n = Fo.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function Ho(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function Uo(e, t, n) {
	let r = e.cloneNode(), i = e[Ba];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = $a(r);
	return a.removeChild(r), o;
}
var Wo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ne(t, e) : t;
};
function Go(e) {
	e.target.composing = !0;
}
function Ko(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var qo = /* @__PURE__ */ Symbol("_assign");
function Jo(e, t, n) {
	return t && (e = e.trim()), n && (e = re(e)), e;
}
var Yo = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[qo] = Wo(i);
		let a = r || i.props && i.props.type === "number";
		yo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[qo](Jo(e.value, n, a));
		}), (n || a) && yo(e, "change", () => {
			e.value = Jo(e.value, n, a);
		}), t || (yo(e, "compositionstart", Go), yo(e, "compositionend", Ko), yo(e, "change", Ko));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[qo] = Wo(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? re(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Xo = /* @__PURE__ */ s({ patchProp: jo }, La), Zo;
function Qo() {
	return Zo ||= Ti(Xo);
}
var $o = ((...e) => {
	let t = Qo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = ts(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, es(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function es(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ts(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var ns = typeof window < "u", rs, is = (e) => rs = e, as = Symbol();
function os(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ss;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ss ||= {});
var cs = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function ls(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function us(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		hs(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function ds(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function fs(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
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
		e.dispatchEvent(t);
	}
}
var ps = typeof navigator == "object" ? navigator : { userAgent: "" }, ms = /Macintosh/.test(ps.userAgent) && /AppleWebKit/.test(ps.userAgent) && !/Safari/.test(ps.userAgent), hs = ns ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ms ? gs : "msSaveOrOpenBlob" in ps ? _s : vs : () => {};
function gs(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? fs(r) : ds(r.href) ? us(e, t, n) : (r.target = "_blank", fs(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		fs(r);
	}, 0));
}
function _s(e, t = "download", n) {
	if (typeof e == "string") if (ds(e)) us(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			fs(t);
		});
	}
	else navigator.msSaveOrOpenBlob(ls(e, n), t);
}
function vs(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return us(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(cs.HTMLElement)) || "safari" in cs, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || ms) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: ys } = Object;
function bs() {
	let e = xe(!0), t = e.run(() => /* @__PURE__ */ Wt({})), n = [], r = [], i = Bt({
		install(e) {
			is(i), i._a = e, e.provide(as, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
		},
		use(e) {
			return this._a ? n.push(e) : r.push(e), this;
		},
		_p: n,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return i;
}
var xs = () => {};
function Ss(e, t, n, r = xs) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && Se() && I(i), i;
}
function Cs(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var ws = (e) => e(), Ts = Symbol(), Es = Symbol();
function Ds(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		os(i) && os(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ Ut(r) && !/* @__PURE__ */ Ft(r) ? e[n] = Ds(i, r) : e[n] = r;
	}
	return e;
}
var Os = Symbol();
function ks(e) {
	return !os(e) || !Object.prototype.hasOwnProperty.call(e, Os);
}
var { assign: As } = Object;
function js(e) {
	return !!(/* @__PURE__ */ Ut(e) && e.effect);
}
function Ms(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), As(/* @__PURE__ */ Yt(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = Bt(K(() => {
			is(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = Ns(e, l, t, n, r, !0), c;
}
function Ns(e, t, n = {}, r, i, a) {
	let o, s = As({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: ss.patchFunction,
			storeId: e,
			events: void 0
		}) : (Ds(r.state.value[e], t), n = {
			type: ss.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		vn().then(() => {
			m === i && (l = !0);
		}), u = !0, Cs(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			As(e, t);
		});
	} : xs;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (Ts in t) return t[Es] = n, t;
		let i = function() {
			is(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Cs(f, {
				args: n,
				name: i[Es],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw Cs(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Cs(a, e), e)).catch((e) => (Cs(o, e), Promise.reject(e))) : (Cs(a, l), l);
		};
		return i[Ts] = !0, i[Es] = n, i;
	}, y = /* @__PURE__ */ jt({
		_p: r,
		$id: e,
		$onAction: Ss.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = Ss(d, t, n.detached, () => a()), a = o.run(() => Rn(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: ss.direct,
					events: void 0
				}, r);
			}, As({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || ws)(() => r._e.run(() => (o = xe()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ Ut(n) && !js(n) || /* @__PURE__ */ Ft(n) ? a || (p && ks(n) && (/* @__PURE__ */ Ut(n) ? n.value = p[t] : Ds(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return As(y, b), As(/* @__PURE__ */ zt(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				As(t, e);
			});
		}
	}), r._p.forEach((e) => {
		As(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function Ps(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = Fn();
		return n ||= o ? Pn(as, null) : null, n && is(n), n = rs, n._s.has(e) || (i ? Ns(e, t, r, n) : Ms(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
//#endregion
//#region src/core/eventResolver.ts
var Fs = {
	white_canvas: "白色画布",
	golden_bough_rebuild: "金枝重构",
	ring_conspiracy: "环指共谋"
};
function Is(e) {
	return Math.max(0, Math.min(100, Math.round(e)));
}
function Ls(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Rs() {
	return {
		intimacy: 0,
		reliance: 0,
		obsession: 0,
		suspicion: 0
	};
}
function zs(e) {
	let t = {
		intimacy: Is(e.affection.albina),
		reliance: Is(e.trust),
		obsession: Is(e.artResonance + e.affection.albina * .35),
		suspicion: Is(e.danger - e.trust * .25 + (e.route === "ring_conspiracy" ? 8 : 0))
	};
	return e.relationshipVectors = t, t;
}
function Bs(e, t, n, r) {
	let i = {
		id: Ls("route_event"),
		route: e.route,
		sceneId: e.sceneId,
		title: t,
		detail: n,
		status: "queued",
		pressure: Is(r),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeEvents.unshift(i), e.routeEvents = e.routeEvents.slice(0, 40), i;
}
function Vs(e, t) {
	if (e.replayAnchors.find((n) => n.choiceId === t.choiceId && n.sceneId === e.sceneId && n.route === e.route)) return;
	let n = {
		id: Ls("replay_anchor"),
		route: e.route,
		sceneId: e.sceneId,
		title: `${Fs[e.route]} · ${t.choiceText}`,
		choiceId: t.choiceId,
		cg: t.unlockedCg,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.replayAnchors.unshift(n), e.replayAnchors = e.replayAnchors.slice(0, 60), n;
}
function Hs(e) {
	return (!e.relationshipVectors || typeof e.relationshipVectors != "object") && (e.relationshipVectors = Rs()), Array.isArray(e.routeEvents) || (e.routeEvents = []), Array.isArray(e.replayAnchors) || (e.replayAnchors = []), zs(e), e;
}
function Us(e, t) {
	Hs(e);
	let n = [], r = [], i = Vs(e, t);
	i && r.push(i), t.previousRoute !== e.route && n.push(Bs(e, `路线进入：${Fs[e.route]}`, `玩家选择“${t.choiceText}”，叙事权威转入 ${Fs[e.route]}。`, e.danger + 16));
	for (let r of t.completedObjectives) n.push(Bs(e, `目标完成：${r.title}`, "路线目标已完成，后续叙事可以承认该进展，但不得反向撤销。", 18 + e.danger * .25));
	for (let r of t.consequences) n.push(Bs(e, `后果挂起：${r.title}`, r.detail, r.level === "critical" ? 92 : r.level === "warning" ? 62 : 28));
	return {
		events: n,
		replayAnchors: r,
		relationshipVectors: zs(e)
	};
}
//#endregion
//#region src/core/economyEngine.ts
var Ws = [
	{
		id: "stabilize_boundary",
		label: "稳住边界",
		detail: "消耗 10 冷静，降低事件压力与危险。",
		cost: { composure: 10 },
		pressureReduction: 14,
		dangerDelta: -6,
		trustDelta: 1,
		artResonanceDelta: 0
	},
	{
		id: "spend_material",
		label: "投入材料",
		detail: "消耗 1 材料，以艺术处理方式压低事件压力。",
		cost: { materials: 1 },
		pressureReduction: 12,
		dangerDelta: -3,
		trustDelta: 0,
		artResonanceDelta: 2
	},
	{
		id: "trade_leverage",
		label: "交换筹码",
		detail: "消耗 8 筹码，快速处理高压事件。",
		cost: { leverage: 8 },
		pressureReduction: 20,
		dangerDelta: -4,
		trustDelta: -1,
		artResonanceDelta: 1
	}
];
function Gs(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function Ks(e) {
	return {
		composure: 60,
		materials: 3,
		leverage: Gs(e.trust * .6),
		exposure: Gs(e.danger)
	};
}
function qs(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Js(e, t) {
	return e.composure >= (t.composure ?? 0) && e.materials >= (t.materials ?? 0) && e.leverage >= (t.leverage ?? 0);
}
function Ys(e, t) {
	e.composure = Gs(e.composure - (t.composure ?? 0)), e.materials = Gs(e.materials - (t.materials ?? 0)), e.leverage = Gs(e.leverage - (t.leverage ?? 0));
}
function Xs(e) {
	return (!e.routeEconomy || typeof e.routeEconomy != "object") && (e.routeEconomy = Ks(e)), Array.isArray(e.routeActionLog) || (e.routeActionLog = []), e.routeEconomy.composure = Gs(e.routeEconomy.composure), e.routeEconomy.materials = Gs(e.routeEconomy.materials, 0, 12), e.routeEconomy.leverage = Gs(Math.max(e.routeEconomy.leverage, e.trust * .35)), e.routeEconomy.exposure = Gs(e.danger), e;
}
function Zs(e, t) {
	Xs(e);
	let n = e.routeEvents.find((e) => e.id === t);
	return !n || n.status !== "queued" ? [] : Ws.map((t) => ({
		...t,
		available: Js(e.routeEconomy, t.cost)
	}));
}
function Qs(e, t, n) {
	Xs(e);
	let r = e.routeEvents.find((e) => e.id === t), i = Zs(e, t).find((e) => e.id === n);
	if (!r || !i) return {
		ok: !1,
		eventId: t,
		actionId: n,
		result: "未找到可处理的事件或行动。"
	};
	if (!i.available) return {
		ok: !1,
		eventId: t,
		actionId: n,
		result: "资源不足，无法执行该行动。"
	};
	Ys(e.routeEconomy, i.cost), r.pressure = Gs(r.pressure - i.pressureReduction), r.pressure <= 20 && (r.status = "resolved", r.resolvedAt = (/* @__PURE__ */ new Date()).toISOString()), e.danger = Gs(e.danger + i.dangerDelta), e.trust = Gs(e.trust + i.trustDelta), e.artResonance = Gs(e.artResonance + i.artResonanceDelta), e.routeEconomy.exposure = Gs(e.danger), Hs(e);
	let a = `${i.label}：事件压力降至 ${r.pressure}，危险值为 ${e.danger}。`, o = {
		id: qs("route_action"),
		route: e.route,
		sceneId: e.sceneId,
		eventId: t,
		actionId: n,
		result: a,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeActionLog.unshift(o), e.routeActionLog = e.routeActionLog.slice(0, 80), {
		ok: !0,
		eventId: t,
		actionId: n,
		result: a
	};
}
//#endregion
//#region src/core/activityEngine.ts
var $s = [
	{
		id: "canvas_study",
		route: "white_canvas",
		label: "校准白色画布",
		detail: "观察阿尔比娜的构图习惯，积累材料并提升共鸣。",
		cost: { composure: 6 },
		reward: {
			materials: 1,
			trust: 1,
			artResonance: 3,
			flag: "activity_canvas_study"
		},
		eventTitle: "画布校准完成",
		eventDetail: "白色画布路线获得一次可引用的创作校准记录。",
		eventPressure: 16
	},
	{
		id: "boundary_rehearsal",
		route: "white_canvas",
		label: "边界排练",
		detail: "用明确同意和撤回规则降低路线风险。",
		cost: { composure: 8 },
		reward: {
			trust: 2,
			danger: -3,
			leverage: 1,
			flag: "activity_boundary_rehearsal"
		},
		eventTitle: "边界排练完成",
		eventDetail: "亲密推进获得明确边界锚点，危险叙事必须承认该约束。",
		eventPressure: 12,
		requiresFlag: "activity_canvas_study"
	},
	{
		id: "fascia_trace",
		route: "golden_bough_rebuild",
		label: "追踪法西娅残响",
		detail: "消耗材料追踪义体与金枝之间的残响。",
		cost: { materials: 1 },
		reward: {
			trust: 1,
			artResonance: 4,
			unlockCg: "fascia_heartbeat",
			flag: "activity_fascia_trace"
		},
		eventTitle: "法西娅残响定位",
		eventDetail: "金枝重构路线获得法西娅相关的可回放锚点。",
		eventPressure: 22
	},
	{
		id: "memory_anchor_drill",
		route: "golden_bough_rebuild",
		label: "记忆锚点演练",
		detail: "以冷静维持重构手术中的称谓与记忆连续性。",
		cost: { composure: 9 },
		reward: {
			trust: 3,
			danger: -2,
			leverage: 2,
			flag: "activity_memory_anchor_drill"
		},
		eventTitle: "记忆锚点稳定",
		eventDetail: "重构路线获得一次稳定记忆锚点，后续叙事不得随意抹除。",
		eventPressure: 18,
		requiresFlag: "activity_fascia_trace"
	},
	{
		id: "spider_gallery_recon",
		route: "ring_conspiracy",
		label: "侦察蜘蛛巢画廊",
		detail: "冒险换取环指路线筹码，可能提高短期暴露。",
		cost: { composure: 7 },
		reward: {
			leverage: 5,
			materials: 1,
			danger: 2,
			flag: "activity_spider_gallery_recon"
		},
		eventTitle: "蜘蛛巢侦察完成",
		eventDetail: "环指共谋路线获得新的谈判筹码，但暴露风险上升。",
		eventPressure: 34
	},
	{
		id: "counter_contract",
		route: "ring_conspiracy",
		label: "反写委托条款",
		detail: "消耗筹码重写危险委托的一部分条件。",
		cost: { leverage: 4 },
		reward: {
			trust: 2,
			danger: -5,
			artResonance: 1,
			flag: "activity_counter_contract"
		},
		eventTitle: "委托条款被反写",
		eventDetail: "环指共谋路线获得反制条款，后续敌对推进必须受到该条款约束。",
		eventPressure: 26,
		requiresFlag: "activity_spider_gallery_recon",
		requiresLeverage: 4
	}
];
function ec(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function tc(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function nc(e, t) {
	return e.routeEconomy.composure >= (t.composure ?? 0) && e.routeEconomy.materials >= (t.materials ?? 0) && e.routeEconomy.leverage >= (t.leverage ?? 0);
}
function rc(e, t) {
	e.routeEconomy.composure = ec(e.routeEconomy.composure - (t.composure ?? 0)), e.routeEconomy.materials = ec(e.routeEconomy.materials - (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = ec(e.routeEconomy.leverage - (t.leverage ?? 0));
}
function ic(e, t) {
	e.routeEconomy.composure = ec(e.routeEconomy.composure + (t.composure ?? 0)), e.routeEconomy.materials = ec(e.routeEconomy.materials + (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = ec(e.routeEconomy.leverage + (t.leverage ?? 0)), e.danger = ec(e.danger + (t.danger ?? 0)), e.trust = ec(e.trust + (t.trust ?? 0)), e.affection.albina = ec(e.affection.albina + (t.affection ?? 0)), e.artResonance = ec(e.artResonance + (t.artResonance ?? 0)), t.flag && (e.flags[t.flag] = !0), t.unlockCg && !e.unlockedCg.includes(t.unlockCg) && e.unlockedCg.push(t.unlockCg);
}
function ac(e, t) {
	let n = {
		id: tc("activity_event"),
		route: e.route,
		sceneId: e.sceneId,
		title: t.eventTitle,
		detail: t.eventDetail,
		status: "queued",
		pressure: ec(t.eventPressure + e.danger * .2),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeEvents.unshift(n), e.routeEvents = e.routeEvents.slice(0, 40), n;
}
function oc(e) {
	return Array.isArray(e.routeActivityLog) || (e.routeActivityLog = []), Array.isArray(e.routeEvents) || (e.routeEvents = []), Array.isArray(e.timeline) || (e.timeline = []), e;
}
function sc(e) {
	return oc(e), Xs(e), $s.filter((t) => t.route === e.route).map((t) => {
		let n = t.requiresFlag && e.flags[t.requiresFlag] !== !0, r = t.requiresLeverage && e.routeEconomy.leverage < t.requiresLeverage, i = !nc(e, t.cost), a = n ? "需要先完成前置活动" : r ? `需要筹码 ${t.requiresLeverage}` : i ? "资源不足" : void 0;
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			cost: t.cost,
			reward: t.reward,
			available: !a,
			lockedReason: a
		};
	});
}
function cc(e, t) {
	oc(e), Xs(e);
	let n = $s.find((n) => n.id === t && n.route === e.route), r = sc(e).find((e) => e.id === t);
	if (!n || !r) return {
		ok: !1,
		activityId: t,
		result: "未找到当前路线活动。"
	};
	if (!r.available) return {
		ok: !1,
		activityId: t,
		result: r.lockedReason ?? "活动不可执行。"
	};
	rc(e, n.cost), ic(e, n.reward);
	let i = ac(e, n);
	Xs(e), Hs(e);
	let a = `${n.label}：${n.eventDetail}`, o = {
		id: tc("route_activity"),
		route: e.route,
		sceneId: e.sceneId,
		activityId: t,
		eventId: i.id,
		label: n.label,
		result: a,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeActivityLog.unshift(o), e.routeActivityLog = e.routeActivityLog.slice(0, 80), e.timeline.unshift({
		id: tc("timeline_activity"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `活动：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		activityId: t,
		result: a
	};
}
//#endregion
//#region src/core/loadoutEngine.ts
var lc = [
	{
		id: "rain_room_badge",
		label: "雨室观测徽记",
		detail: "记录初次进入雨室时的身份锚点，用于稳定前端存档与世界书扫描。",
		kind: "key",
		unlockHint: "初始携带"
	},
	{
		id: "white_canvas_scrap",
		route: "white_canvas",
		label: "白色画布残片",
		detail: "从雨巷回溯中取回的画布纤维，能标记白线任务链起点。",
		kind: "material",
		unlockHint: "完成白线任务：回溯雨巷",
		condition: { quest: "white_retrace_rain" }
	},
	{
		id: "white_canvas_medium",
		route: "white_canvas",
		label: "调和画媒",
		detail: "让白色画布不再只是 CG 奖励，而成为后续装备和图库规则的材料。",
		kind: "material",
		unlockHint: "完成白线任务：准备画布",
		condition: { quest: "white_prepare_canvas" }
	},
	{
		id: "boundary_contract_key",
		route: "white_canvas",
		label: "边界契约钥",
		detail: "用于约束亲密推进、撤回规则和画室内的危险叙事。",
		kind: "key",
		unlockHint: "完成白线任务：边界契约",
		condition: { quest: "white_boundary_contract" }
	},
	{
		id: "rooftop_rain_seal",
		route: "white_canvas",
		label: "天台雨印",
		detail: "将告白场景、雨声和白线终章图库串成可复查的记忆物。",
		kind: "memory",
		unlockHint: "完成白线任务：天台告白",
		condition: { quest: "white_rooftop_confession" }
	},
	{
		id: "first_canvas_plate",
		route: "white_canvas",
		label: "第一幅画铭牌",
		detail: "白线完成后的路线奖章，可作为终章衣装与图库规则的门槛。",
		kind: "evidence",
		unlockHint: "完成白线终章任务",
		condition: { quest: "white_complete_first_canvas" }
	},
	{
		id: "golden_bough_sample",
		route: "golden_bough_rebuild",
		label: "金枝样本",
		detail: "来自 LCE（边狱应急处置）扫描的金色残片，标记重构线的实验入口。",
		kind: "material",
		unlockHint: "完成金枝任务：扫描样本",
		condition: { quest: "golden_scan_bough" }
	},
	{
		id: "fascia_pulse_thread",
		route: "golden_bough_rebuild",
		label: "法西娅脉冲线",
		detail: "连接义体、金枝与白金巨剑的脉冲线，可解锁武器整备。",
		kind: "gear",
		unlockHint: "完成金枝任务：追踪法西娅",
		condition: { quest: "golden_trace_fascia" }
	},
	{
		id: "pronoun_memory_shard",
		route: "golden_bough_rebuild",
		label: "称谓记忆碎片",
		detail: "用于锁定称谓、边界和重构后身份连续性的记忆碎片。",
		kind: "memory",
		unlockHint: "完成金枝任务：恢复称谓",
		condition: { quest: "golden_restore_pronouns" }
	},
	{
		id: "buffer_chamber_core",
		route: "golden_bough_rebuild",
		label: "缓冲室核心",
		detail: "重构手术中稳定危险值的核心部件，可用于防具整备。",
		kind: "gear",
		unlockHint: "完成金枝任务：缓冲室",
		condition: { quest: "golden_buffer_chamber" }
	},
	{
		id: "dawn_rebuild_seed",
		route: "golden_bough_rebuild",
		label: "黎明重构种子",
		detail: "金枝线终章留下的高阶整备材料。",
		kind: "key",
		unlockHint: "完成金枝终章任务",
		condition: { quest: "golden_rebuild_dawn" }
	},
	{
		id: "ring_invitation_token",
		route: "ring_conspiracy",
		label: "环指邀请筹码",
		detail: "进入环指委托链的第一枚筹码。",
		kind: "key",
		unlockHint: "完成环线任务：接受条款",
		condition: { quest: "ring_accept_terms" }
	},
	{
		id: "spider_gallery_film",
		route: "ring_conspiracy",
		label: "蜘蛛巢底片",
		detail: "记录画廊侦察结果，可解锁环线图库规则。",
		kind: "evidence",
		unlockHint: "完成环线任务：画廊侦察",
		condition: { quest: "ring_gallery_recon" }
	},
	{
		id: "counter_contract_pin",
		route: "ring_conspiracy",
		label: "反制契约别针",
		detail: "将危险委托改写为可控条款的整备饰物。",
		kind: "gear",
		unlockHint: "完成环线任务：反制契约",
		condition: { quest: "ring_counter_contract" }
	},
	{
		id: "pursuit_route_map",
		route: "ring_conspiracy",
		label: "追逐路线图",
		detail: "记录后巷逃脱路线，影响环线后续风险判断。",
		kind: "evidence",
		unlockHint: "完成环线任务：追逐逃脱",
		condition: { quest: "ring_pursuit_escape" }
	},
	{
		id: "maestro_shadow_mask",
		route: "ring_conspiracy",
		label: "指挥家影面",
		detail: "面对指挥家阴影后获得的终章整备材料。",
		kind: "gear",
		unlockHint: "完成环线终章任务",
		condition: { quest: "ring_face_maestro" }
	},
	{
		id: "canvas_calibration_notes",
		route: "white_canvas",
		label: "画布校准笔记",
		detail: "行动节点产出的创作校准记录，可作为白线装备辅助材料。",
		kind: "evidence",
		unlockHint: "完成行动：校准白色画布",
		condition: { flag: "activity_canvas_study" }
	},
	{
		id: "boundary_rehearsal_card",
		route: "white_canvas",
		label: "边界排练卡",
		detail: "行动节点产出的边界提示卡，降低玩家误触高风险推进的概率。",
		kind: "key",
		unlockHint: "完成行动：边界排练",
		condition: { flag: "activity_boundary_rehearsal" }
	},
	{
		id: "lce_trace_report",
		route: "golden_bough_rebuild",
		label: "LCE（边狱应急处置）追踪报告",
		detail: "法西娅残响行动留下的检验报告。",
		kind: "evidence",
		unlockHint: "完成行动：追踪法西娅残响",
		condition: { flag: "activity_fascia_trace" }
	},
	{
		id: "memory_anchor_nail",
		route: "golden_bough_rebuild",
		label: "记忆锚钉",
		detail: "稳定称谓和人格连续性的行动奖励。",
		kind: "gear",
		unlockHint: "完成行动：记忆锚点演练",
		condition: { flag: "activity_memory_anchor_drill" }
	},
	{
		id: "spider_recon_pack",
		route: "ring_conspiracy",
		label: "蜘蛛巢侦察包",
		detail: "环线行动产出的谈判筹码包。",
		kind: "evidence",
		unlockHint: "完成行动：侦察蜘蛛巢画廊",
		condition: { flag: "activity_spider_gallery_recon" }
	},
	{
		id: "counter_contract_clause",
		route: "ring_conspiracy",
		label: "反写条款",
		detail: "环线行动产出的反制条款，可解锁高阶防具整备。",
		kind: "key",
		unlockHint: "完成行动：反写委托条款",
		condition: { flag: "activity_counter_contract" }
	}
], uc = [
	{
		id: "rainroom_observer_badge",
		itemId: "rain_room_badge",
		slot: "accessory",
		label: "雨室观测徽记",
		detail: "提供基础身份稳定，适合任何路线的起始整备。",
		modifier: {
			trust: 1,
			composure: 2
		}
	},
	{
		id: "white_canvas_bracer",
		itemId: "white_canvas_medium",
		slot: "tool",
		route: "white_canvas",
		label: "白色画布护臂",
		detail: "让白线创作材料转化为可装备的控制工具。",
		modifier: {
			artResonance: 3,
			composure: 2
		}
	},
	{
		id: "boundary_contract_charm",
		itemId: "boundary_contract_key",
		slot: "accessory",
		route: "white_canvas",
		label: "边界契约护符",
		detail: "亲密推进前的边界确认物，偏向信任和危险控制。",
		modifier: {
			trust: 3,
			danger: -2
		}
	},
	{
		id: "first_canvas_standard",
		itemId: "first_canvas_plate",
		slot: "armor",
		route: "white_canvas",
		label: "第一幅画肩章",
		detail: "白线终章整备，象征完成的第一幅画。",
		modifier: {
			affection: 2,
			artResonance: 4
		}
	},
	{
		id: "fascia_splinter_blade",
		itemId: "fascia_pulse_thread",
		slot: "weapon",
		route: "golden_bough_rebuild",
		label: "法西娅裂片刃",
		detail: "白金巨剑的轻量整备形态，强化金枝线共鸣。",
		modifier: {
			artResonance: 4,
			trust: 2
		}
	},
	{
		id: "memory_anchor_lens",
		itemId: "pronoun_memory_shard",
		slot: "accessory",
		route: "golden_bough_rebuild",
		label: "称谓锚定镜片",
		detail: "防止重构叙事抹除称谓和身份的饰物。",
		modifier: {
			trust: 4,
			danger: -1
		}
	},
	{
		id: "buffer_chamber_frame",
		itemId: "buffer_chamber_core",
		slot: "armor",
		route: "golden_bough_rebuild",
		label: "缓冲室胸框",
		detail: "将缓冲室核心接入义体防护结构。",
		modifier: {
			composure: 4,
			danger: -3
		}
	},
	{
		id: "dawn_rebuild_frame",
		itemId: "dawn_rebuild_seed",
		slot: "tool",
		route: "golden_bough_rebuild",
		label: "黎明重构框架",
		detail: "金枝终章整备，提供高额艺术共鸣。",
		modifier: {
			artResonance: 5,
			affection: 2
		}
	},
	{
		id: "ring_counter_signet",
		itemId: "counter_contract_pin",
		slot: "accessory",
		route: "ring_conspiracy",
		label: "反制环印",
		detail: "环指委托链的反制饰物，偏向筹码与风险改写。",
		modifier: {
			leverage: 3,
			danger: -3
		}
	},
	{
		id: "pursuit_route_compass",
		itemId: "pursuit_route_map",
		slot: "tool",
		route: "ring_conspiracy",
		label: "后巷路线罗盘",
		detail: "将追逐路线图变为可装备的逃脱工具。",
		modifier: {
			composure: 3,
			leverage: 2
		}
	},
	{
		id: "maestro_shadow_coat",
		itemId: "maestro_shadow_mask",
		slot: "armor",
		route: "ring_conspiracy",
		label: "指挥家影衣",
		detail: "环线终章整备，强化面对指挥家阴影时的抗压能力。",
		modifier: {
			trust: 3,
			artResonance: 3,
			danger: -2
		}
	},
	{
		id: "counter_contract_armor",
		itemId: "counter_contract_clause",
		slot: "armor",
		route: "ring_conspiracy",
		label: "反写条款装甲",
		detail: "将行动产出的反写条款固化为防具规则。",
		modifier: {
			danger: -4,
			leverage: 2
		},
		condition: { flag: "activity_counter_contract" }
	}
], dc = [
	{
		id: "albina_raincoat",
		label: "雨室外套",
		detail: "默认立绘状态，适合开场、雨巷和低风险对话。",
		sprite: "rain"
	},
	{
		id: "albina_white_canvas",
		route: "white_canvas",
		label: "白色画布装束",
		detail: "白线画室装束，强调白、金、机械义体和画布意象。",
		sprite: "white-canvas",
		condition: { quest: "white_prepare_canvas" }
	},
	{
		id: "albina_first_canvas",
		route: "white_canvas",
		label: "第一幅画礼装",
		detail: "白线终章后开放的纪念衣装。",
		sprite: "smile",
		condition: { quest: "white_complete_first_canvas" }
	},
	{
		id: "albina_golden_bough",
		route: "golden_bough_rebuild",
		label: "金枝重构装束",
		detail: "金枝线实验装束，保留义体、金枝和法西娅回路。",
		sprite: "golden-bough",
		condition: { quest: "golden_scan_bough" }
	},
	{
		id: "albina_surgical",
		route: "golden_bough_rebuild",
		label: "重构手术服",
		detail: "恢复称谓后开放，适合高压医疗与义体重构场景。",
		sprite: "surgical",
		condition: { quest: "golden_restore_pronouns" }
	},
	{
		id: "albina_ring_disguise",
		route: "ring_conspiracy",
		label: "环指潜入装束",
		detail: "环线邀请后开放，用于画廊侦察和委托反制。",
		sprite: "ring-conspiracy",
		condition: { quest: "ring_accept_terms" }
	},
	{
		id: "albina_maestro",
		route: "ring_conspiracy",
		label: "指挥家阴影装束",
		detail: "环线终章后开放的高风险衣装。",
		sprite: "maestro",
		condition: { quest: "ring_face_maestro" }
	},
	{
		id: "albina_armored",
		label: "白金装甲",
		detail: "反写条款稳定后开放，适合作战和高压事件。",
		sprite: "armored",
		condition: { flag: "activity_counter_contract" }
	}
], fc = [
	{
		id: "cg_opening_rain",
		cgId: "opening_rain",
		label: "开场雨室",
		detail: "初始图库条目，证明图库规则层已接管默认 CG。"
	},
	{
		id: "cg_white_canvas_choice",
		cgId: "white_canvas_choice",
		route: "white_canvas",
		label: "白色画布选择",
		detail: "由白线准备画布任务解锁。",
		condition: { quest: "white_prepare_canvas" }
	},
	{
		id: "cg_rain_confession",
		cgId: "rain_confession",
		route: "white_canvas",
		label: "天台雨声告白",
		detail: "由白线天台告白任务解锁。",
		condition: { quest: "white_rooftop_confession" }
	},
	{
		id: "cg_white_canvas_ending",
		cgId: "white_canvas_ending",
		route: "white_canvas",
		label: "白线终章",
		detail: "由白线终章任务解锁。",
		condition: { quest: "white_complete_first_canvas" }
	},
	{
		id: "cg_golden_bough_rebuild",
		cgId: "golden_bough_rebuild",
		route: "golden_bough_rebuild",
		label: "金枝重构",
		detail: "由金枝扫描任务解锁。",
		condition: { quest: "golden_scan_bough" }
	},
	{
		id: "cg_fascia_heartbeat",
		cgId: "fascia_heartbeat",
		route: "golden_bough_rebuild",
		label: "法西娅心跳",
		detail: "由金枝追踪任务或法西娅残响行动解锁。",
		condition: { cg: "fascia_heartbeat" }
	},
	{
		id: "cg_surgery_of_memory",
		cgId: "surgery_of_memory",
		route: "golden_bough_rebuild",
		label: "记忆手术",
		detail: "由金枝恢复称谓任务解锁。",
		condition: { quest: "golden_restore_pronouns" }
	},
	{
		id: "cg_golden_bough_ending",
		cgId: "golden_bough_ending",
		route: "golden_bough_rebuild",
		label: "金枝终章",
		detail: "由金枝终章任务解锁。",
		condition: { quest: "golden_rebuild_dawn" }
	},
	{
		id: "cg_ring_invitation",
		cgId: "ring_invitation",
		route: "ring_conspiracy",
		label: "环指邀请",
		detail: "由环线接受条款任务解锁。",
		condition: { quest: "ring_accept_terms" }
	},
	{
		id: "cg_first_gallery",
		cgId: "first_gallery",
		route: "ring_conspiracy",
		label: "第一画廊",
		detail: "由环线画廊侦察任务解锁。",
		condition: { quest: "ring_gallery_recon" }
	},
	{
		id: "cg_conspiracy_contract",
		cgId: "conspiracy_contract",
		route: "ring_conspiracy",
		label: "共谋契约",
		detail: "由环线反制契约任务解锁。",
		condition: { quest: "ring_counter_contract" }
	},
	{
		id: "cg_backstreet_pursuit",
		cgId: "backstreet_pursuit",
		route: "ring_conspiracy",
		label: "后巷追逐",
		detail: "由环线追逐逃脱任务解锁。",
		condition: { quest: "ring_pursuit_escape" }
	},
	{
		id: "cg_maestro_shadow",
		cgId: "maestro_shadow",
		route: "ring_conspiracy",
		label: "指挥家阴影",
		detail: "由环线终章任务额外解锁。",
		condition: { quest: "ring_face_maestro" }
	},
	{
		id: "cg_ring_conspiracy_ending",
		cgId: "ring_conspiracy_ending",
		route: "ring_conspiracy",
		label: "环线终章",
		detail: "由环线终章任务解锁。",
		condition: { quest: "ring_face_maestro" }
	}
];
function pc(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function mc(e, t) {
	return Array.isArray(e) ? Array.from(new Set(e.filter((e) => typeof e == "string" && t.has(e)))) : [];
}
function hc(e, t) {
	return Array.isArray(e.completedQuestNodeIds) && e.completedQuestNodeIds.includes(t);
}
function gc(e, t) {
	return Array.isArray(e.inventoryItemIds) && e.inventoryItemIds.includes(t);
}
function _c(e, t) {
	return t ? !(t.route && e.route !== t.route || t.quest && !hc(e, t.quest) || t.flag && e.flags[t.flag] !== !0 || t.cg && !e.unlockedCg.includes(t.cg) || t.item && !gc(e, t.item) || t.trustAtLeast !== void 0 && e.trust < t.trustAtLeast || t.artResonanceAtLeast !== void 0 && e.artResonance < t.artResonanceAtLeast) : !0;
}
function vc(e, t) {
	if (t) {
		if (t.route && e.route !== t.route) return "当前路线未对应";
		if (t.quest && !hc(e, t.quest)) return "需要完成指定任务";
		if (t.flag && e.flags[t.flag] !== !0) return "需要取得指定路线记录";
		if (t.cg && !e.unlockedCg.includes(t.cg)) return "需要先解锁指定 CG";
		if (t.item && !gc(e, t.item)) return "需要取得指定物品";
		if (t.trustAtLeast !== void 0 && e.trust < t.trustAtLeast) return `信任需要达到 ${t.trustAtLeast}`;
		if (t.artResonanceAtLeast !== void 0 && e.artResonance < t.artResonanceAtLeast) return `艺术共鸣需要达到 ${t.artResonanceAtLeast}`;
	}
}
function yc(e, t) {
	return !t || t === e;
}
function bc(e) {
	return lc.find((t) => t.id === e);
}
function xc(e) {
	return dc.find((t) => t.id === e);
}
function Sc(e) {
	return uc.find((t) => t.id === e);
}
function Cc(e, t, n, r, i, a) {
	if (e.progressionUnlockLog.some((e) => e.kind === n && e.targetId === r) || t.some((e) => e.kind === n && e.targetId === r)) return;
	let o = {
		id: pc("progression_unlock"),
		route: e.route,
		sceneId: e.sceneId,
		kind: n,
		targetId: r,
		label: i,
		trigger: a,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	t.push(o);
}
function wc(e) {
	let t = new Set(lc.map((e) => e.id)), n = new Set(dc.map((e) => e.id)), r = new Set(uc.map((e) => e.id));
	Array.isArray(e.inventoryItemIds) || (e.inventoryItemIds = []), (!e.equippedItemIds || typeof e.equippedItemIds != "object") && (e.equippedItemIds = {}), Array.isArray(e.wardrobeOutfitIds) || (e.wardrobeOutfitIds = []), Array.isArray(e.progressionUnlockLog) || (e.progressionUnlockLog = []), Array.isArray(e.unlockedCg) || (e.unlockedCg = []), e.inventoryItemIds = mc(e.inventoryItemIds, t), e.wardrobeOutfitIds = mc(e.wardrobeOutfitIds, n), e.progressionUnlockLog = e.progressionUnlockLog.filter((e) => e && typeof e.targetId == "string").slice(0, 80);
	for (let t of [
		"weapon",
		"armor",
		"accessory",
		"tool"
	]) {
		let n = e.equippedItemIds[t];
		n && !r.has(n) && delete e.equippedItemIds[t];
	}
}
function Tc(e) {
	let t = xc(e.activeWardrobeOutfitId);
	if (!t) return;
	let n = e.scene.characters.find((e) => e.id === "albina");
	n && (n.sprite = t.sprite);
}
function Ec(e) {
	let t = xc(e.activeWardrobeOutfitId);
	return t && e.wardrobeOutfitIds.includes(t.id) && yc(e.route, t.route) ? t.id : dc.find((t) => e.wardrobeOutfitIds.includes(t.id) && yc(e.route, t.route))?.id ?? dc.find((t) => e.wardrobeOutfitIds.includes(t.id))?.id ?? "albina_raincoat";
}
function Dc(e, t = "system", n = !1) {
	wc(e);
	let r = [];
	for (let i of lc) _c(e, i.condition) && !e.inventoryItemIds.includes(i.id) && (e.inventoryItemIds.push(i.id), n && Cc(e, r, "inventory", i.id, i.label, t));
	for (let i of dc) _c(e, i.condition) && !e.wardrobeOutfitIds.includes(i.id) && (e.wardrobeOutfitIds.push(i.id), n && Cc(e, r, "wardrobe", i.id, i.label, t));
	for (let i of fc) _c(e, i.condition) && (e.unlockedCg.includes(i.cgId) || e.unlockedCg.push(i.cgId), n && Cc(e, r, "cg", i.cgId, i.label, t));
	for (let i of uc) _c(e, i.condition) && gc(e, i.itemId) && n && Cc(e, r, "equipment", i.id, i.label, t);
	return e.wardrobeOutfitIds.includes("albina_raincoat") || e.wardrobeOutfitIds.unshift("albina_raincoat"), e.activeWardrobeOutfitId = Ec(e), Tc(e), r.length && (e.progressionUnlockLog.unshift(...r), e.progressionUnlockLog = e.progressionUnlockLog.slice(0, 80)), r;
}
function Oc(e) {
	return wc(e), Dc(e, "system", !1), e.activeWardrobeOutfitId = Ec(e), Tc(e), e;
}
function kc(e) {
	return Oc(e), lc.filter((t) => yc(e.route, t.route) || e.inventoryItemIds.includes(t.id)).map((t) => ({
		id: t.id,
		route: t.route,
		label: t.label,
		detail: t.detail,
		kind: t.kind,
		quantity: +!!e.inventoryItemIds.includes(t.id),
		unlockHint: t.unlockHint,
		unlocked: e.inventoryItemIds.includes(t.id)
	}));
}
function Ac(e) {
	return Oc(e), uc.filter((t) => yc(e.route, t.route) || e.equippedItemIds[t.slot] === t.id).map((t) => {
		let n = bc(t.itemId), r = yc(e.route, t.route) ? gc(e, t.itemId) ? vc(e, t.condition) : `需要物品：${n?.label ?? t.itemId}` : "当前路线未对应";
		return {
			id: t.id,
			itemId: t.itemId,
			slot: t.slot,
			route: t.route,
			label: t.label,
			detail: t.detail,
			modifier: t.modifier,
			status: e.equippedItemIds[t.slot] === t.id ? "equipped" : r ? "locked" : "available",
			lockedReason: r
		};
	});
}
function jc(e) {
	return Oc(e), dc.filter((t) => yc(e.route, t.route) || e.wardrobeOutfitIds.includes(t.id)).map((t) => {
		let n = yc(e.route, t.route) ? e.wardrobeOutfitIds.includes(t.id) ? void 0 : vc(e, t.condition) : "当前路线未对应";
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			sprite: t.sprite,
			status: e.activeWardrobeOutfitId === t.id ? "active" : n ? "locked" : "available",
			lockedReason: n
		};
	});
}
function Mc(e) {
	return Oc(e), fc.map((t) => {
		let n = e.unlockedCg.includes(t.cgId);
		return {
			id: t.id,
			cgId: t.cgId,
			route: t.route,
			label: t.label,
			detail: t.detail,
			status: n ? "unlocked" : "locked",
			lockedReason: n ? void 0 : vc(e, t.condition)
		};
	});
}
function Nc(e, t) {
	Oc(e);
	let n = Ac(e).find((e) => e.id === t);
	return n ? n.status === "locked" ? {
		ok: !1,
		targetId: t,
		result: n.lockedReason ?? "装备尚未解锁。"
	} : (e.equippedItemIds[n.slot] = n.id, e.timeline.unshift({
		id: pc("timeline_equip"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `装备：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		targetId: t,
		result: `已装备：${n.label}`
	}) : {
		ok: !1,
		targetId: t,
		result: "未找到该装备。"
	};
}
function Pc(e, t) {
	Oc(e);
	let n = jc(e).find((e) => e.id === t);
	return n ? n.status === "locked" ? {
		ok: !1,
		targetId: t,
		result: n.lockedReason ?? "衣装尚未解锁。"
	} : (e.activeWardrobeOutfitId = n.id, Tc(e), e.timeline.unshift({
		id: pc("timeline_wardrobe"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `衣装：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		targetId: t,
		result: `已切换衣装：${n.label}`
	}) : {
		ok: !1,
		targetId: t,
		result: "未找到该衣装。"
	};
}
function Fc(e) {
	Oc(e);
	let t = {};
	for (let n of Object.values(e.equippedItemIds)) {
		let e = n ? Sc(n) : void 0;
		if (e) for (let [n, r] of Object.entries(e.modifier)) {
			let e = n;
			t[e] = (t[e] ?? 0) + (r ?? 0);
		}
	}
	return t;
}
//#endregion
//#region src/core/conflictEngine.ts
var Ic = [
	"blade",
	"boundary",
	"analysis",
	"resonance"
], Lc = [
	{
		id: "white_alley_pressure",
		route: "white_canvas",
		label: "雨巷压力突入",
		detail: "雨又开始下了。回访雨巷时，围观的人群在远处堆积，法西娜的残响混进雨水里，画布把每一步都误读为邀约。她需要有人替她把白线压住。",
		stage: 1,
		threat: 18,
		endurance: 24,
		recommendedMastery: "boundary",
		reward: {
			materials: 1,
			trust: 1,
			danger: -1,
			mastery: { boundary: 4 },
			flag: "conflict_white_alley_pressure"
		},
		condition: { quest: "white_retrace_rain" }
	},
	{
		id: "white_gallery_break",
		route: "white_canvas",
		label: "画室断裂控制",
		detail: "画布刚准备好的那一刻，创作的冲动会短暂地失控。剑在震，手在痒，她想切下去——但今晚不是时候。把冲动压回规则内，让它可撤回、可确认、可停止。",
		stage: 2,
		threat: 22,
		endurance: 28,
		recommendedMastery: "analysis",
		reward: {
			composure: 6,
			trust: 1,
			artResonance: 2,
			mastery: { analysis: 4 },
			flag: "conflict_white_gallery_break"
		},
		condition: { quest: "white_prepare_canvas" }
	},
	{
		id: "white_rooftop_stand",
		route: "white_canvas",
		label: "天台告白站位",
		detail: "告白之前，先确认三件事：你站在哪里、退路在哪个方向、要说的话按什么顺序。她值得被认真对待，而不是被写进一份不可逆的收藏。",
		stage: 4,
		threat: 28,
		endurance: 34,
		recommendedMastery: "resonance",
		reward: {
			affection: 1,
			trust: 2,
			danger: -2,
			mastery: { resonance: 5 },
			flag: "conflict_white_rooftop_stand"
		},
		condition: { quest: "white_boundary_contract" }
	},
	{
		id: "golden_lce_containment",
		route: "golden_bough_rebuild",
		label: "LCE（边狱应急处置）裂隙收束",
		detail: "扫描金枝裂隙后的第一次收束，要求把义体损伤、记忆断层和法西娜回声压进同一份战术记录。",
		stage: 1,
		threat: 26,
		endurance: 30,
		recommendedMastery: "analysis",
		reward: {
			materials: 1,
			leverage: 1,
			danger: -1,
			mastery: { analysis: 5 },
			flag: "conflict_golden_lce_containment"
		},
		condition: { quest: "golden_scan_bough" }
	},
	{
		id: "golden_fascia_echo",
		route: "golden_bough_rebuild",
		label: "法西娜残响交锋",
		detail: "法西娅内侧传来一阵脉冲。你必须判断——这是伤口在喊痛，是武器在蓄势，还是她身体的一部分在求安抚？",
		stage: 2,
		threat: 30,
		endurance: 34,
		recommendedMastery: "resonance",
		reward: {
			trust: 2,
			artResonance: 3,
			mastery: { resonance: 5 },
			flag: "conflict_golden_fascia_echo"
		},
		condition: { quest: "golden_trace_fascia" }
	},
	{
		id: "golden_bough_failure_buffer",
		route: "golden_bough_rebuild",
		label: "重构失败缓冲",
		detail: "金枝腔室里，先模拟一次最坏的结果。把可逆的路径、冷却的顺序、她该被怎么称呼，都写成可以重复的动作——这样真出事时，手不会抖。",
		stage: 4,
		threat: 34,
		endurance: 38,
		recommendedMastery: "boundary",
		reward: {
			composure: 8,
			danger: -4,
			mastery: { boundary: 5 },
			flag: "conflict_golden_failure_buffer"
		},
		condition: { quest: "golden_buffer_chamber" }
	},
	{
		id: "ring_spider_pursuit",
		route: "ring_conspiracy",
		label: "蜘蛛巢追踪战",
		detail: "画廊里有人在看你。先反追踪回去，确认是谁在观察。短期的暴露会换来一个撤离窗口，以及委托背后真正的结构。",
		stage: 2,
		threat: 34,
		endurance: 34,
		recommendedMastery: "blade",
		reward: {
			leverage: 3,
			materials: 1,
			danger: -1,
			mastery: { blade: 5 },
			flag: "conflict_ring_spider_pursuit"
		},
		condition: { quest: "ring_gallery_recon" }
	},
	{
		id: "ring_contract_enforcer",
		route: "ring_conspiracy",
		label: "契约执行人反制",
		detail: "契约已经反写。但执行人到了现场，要校验。你必须证明——条款，已经归你这边调用。",
		stage: 3,
		threat: 38,
		endurance: 40,
		recommendedMastery: "analysis",
		reward: {
			leverage: 2,
			trust: 1,
			danger: -3,
			mastery: { analysis: 6 },
			flag: "conflict_ring_contract_enforcer"
		},
		condition: { quest: "ring_counter_contract" }
	},
	{
		id: "ring_maestro_rehearsal",
		route: "ring_conspiracy",
		label: "首席阴影预演",
		detail: "在真的见到指挥家之前，先预演一次最坏的命令。把共谋从\"被迫执行\"改写成\"两个人的策略\"——这样你们都还有得选。",
		stage: 5,
		threat: 44,
		endurance: 46,
		recommendedMastery: "resonance",
		reward: {
			affection: 1,
			trust: 3,
			artResonance: 4,
			mastery: { resonance: 7 },
			flag: "conflict_ring_maestro_rehearsal"
		},
		condition: { quest: "ring_face_maestro" }
	}
], Rc = [
	{
		id: "measured_guard",
		kind: "guard",
		label: "边界防御",
		detail: "以冷静和边界熟练度压低威胁，适合控制危险和保护撤回权。",
		cost: { composure: 4 },
		basePower: 22,
		mastery: "boundary"
	},
	{
		id: "precision_cut",
		kind: "strike",
		label: "白金切断",
		detail: "消耗材料执行高强度切断，适合处理追踪、执行人与实体化残响。",
		cost: { materials: 1 },
		basePower: 30,
		mastery: "blade"
	},
	{
		id: "forensic_scan",
		kind: "analyze",
		label: "战术扫描",
		detail: "用冷静读取结构弱点，适合金枝、契约和画廊式复杂对象。",
		cost: { composure: 5 },
		basePower: 26,
		mastery: "analysis"
	},
	{
		id: "resonance_surge",
		kind: "resonate",
		label: "共鸣压制",
		detail: "消耗筹码引发高输出共鸣，能快速收束高压场景但需要风险储备。",
		cost: { leverage: 2 },
		basePower: 34,
		mastery: "resonance"
	}
], zc = [
	{
		id: "white_boundary_supply",
		route: "white_canvas",
		label: "边界补给包",
		detail: "将一次白线冲突记录换成冷静和材料，用于继续推进画布任务。",
		cost: { leverage: 1 },
		reward: {
			composure: 12,
			materials: 1,
			flag: "exchange_white_boundary_supply"
		},
		condition: { conflict: "white_alley_pressure" }
	},
	{
		id: "golden_lce_coolant",
		route: "golden_bough_rebuild",
		label: "LCE（边狱应急处置）冷却单元",
		detail: "向 LCE（边狱应急处置）交换一次冷却组件，压低重构风险并返还行动资源。",
		cost: { materials: 1 },
		reward: {
			composure: 8,
			danger: -5,
			flag: "exchange_golden_lce_coolant"
		},
		condition: { conflict: "golden_fascia_echo" }
	},
	{
		id: "ring_anonymous_ticket",
		route: "ring_conspiracy",
		label: "匿名筹码交换",
		detail: "用材料换取环线筹码，短期暴露升高，但能打开更高阶反制行动。",
		cost: { materials: 1 },
		reward: {
			leverage: 4,
			danger: 1,
			flag: "exchange_ring_anonymous_ticket"
		},
		condition: { quest: "ring_gallery_recon" }
	},
	{
		id: "rainroom_recalibration",
		label: "雨室整备重校准",
		detail: "把任意路线的一次冲突经验重校准为全局熟练度，适合补齐短板。",
		cost: { leverage: 2 },
		reward: {
			composure: 8,
			mastery: {
				blade: 1,
				boundary: 1,
				analysis: 1,
				resonance: 1
			},
			flag: "exchange_rainroom_recalibration"
		},
		condition: { mastery: {
			track: "boundary",
			value: 1
		} }
	}
], Bc = [
	{
		id: "rainroom_self_check",
		channel: "雨室本地回线",
		label: "状态自检",
		detail: "检查当前危险、资源和可撤回边界，生成一条稳定监视记录。",
		watchLevel: "stable"
	},
	{
		id: "vergilius_boundary_line",
		route: "white_canvas",
		channel: "红色低频线路",
		label: "边界确认联络",
		detail: "将白线冲突结果同步到外部监督，防止亲密推进越过撤回权。",
		condition: { conflict: "white_gallery_break" },
		watchLevel: "warning"
	},
	{
		id: "faust_lce_consult",
		route: "golden_bough_rebuild",
		channel: "LCE（边狱应急处置）咨询窗",
		label: "重构风险会诊",
		detail: "将法西娜残响与金枝裂隙数据发起会诊，获得一次风险压低。",
		condition: { conflict: "golden_fascia_echo" },
		watchLevel: "warning"
	},
	{
		id: "ring_broker_ping",
		route: "ring_conspiracy",
		channel: "匿名经纪人",
		label: "委托逆向询价",
		detail: "用执行人反制记录向匿名渠道询价，确认哪些契约还能继续反写。",
		condition: { conflict: "ring_contract_enforcer" },
		watchLevel: "critical"
	},
	{
		id: "dante_clock_relay",
		channel: "时钟中继",
		label: "跨路线监视中继",
		detail: "把任意一次高压冲突写入跨路线监视，便于后续回放和状态归档。",
		condition: { mastery: {
			track: "analysis",
			value: 2
		} },
		watchLevel: "stable"
	}
];
function Vc(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function Hc(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Uc(e, t) {
	return !t || t === e;
}
function Wc(e, t) {
	return Array.isArray(e) ? Array.from(new Set(e.filter((e) => typeof e == "string" && t.has(e)))) : [];
}
function Gc() {
	return {
		blade: 0,
		boundary: 0,
		analysis: 0,
		resonance: 0
	};
}
function Kc(e, t) {
	return Array.isArray(e.completedQuestNodeIds) && e.completedQuestNodeIds.includes(t);
}
function qc(e, t) {
	return Array.isArray(e.inventoryItemIds) && e.inventoryItemIds.includes(t);
}
function Jc(e, t) {
	return Array.isArray(e.clearedConflictIds) && e.clearedConflictIds.includes(t);
}
function Yc(e, t) {
	return e.routeEconomy.composure >= (t.composure ?? 0) && e.routeEconomy.materials >= (t.materials ?? 0) && e.routeEconomy.leverage >= (t.leverage ?? 0) && (!t.itemId || qc(e, t.itemId));
}
function Xc(e, t) {
	e.routeEconomy.composure = Vc(e.routeEconomy.composure - (t.composure ?? 0)), e.routeEconomy.materials = Vc(e.routeEconomy.materials - (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = Vc(e.routeEconomy.leverage - (t.leverage ?? 0));
}
function Zc(e, t) {
	if (t) for (let n of Ic) e.conflictMastery[n] = Vc(e.conflictMastery[n] + (t[n] ?? 0), 0, 99);
}
function Qc(e, t) {
	e.routeEconomy.composure = Vc(e.routeEconomy.composure + (t.composure ?? 0)), e.routeEconomy.materials = Vc(e.routeEconomy.materials + (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = Vc(e.routeEconomy.leverage + (t.leverage ?? 0)), e.danger = Vc(e.danger + (t.danger ?? 0)), e.trust = Vc(e.trust + (t.trust ?? 0)), e.affection.albina = Vc(e.affection.albina + (t.affection ?? 0)), e.artResonance = Vc(e.artResonance + (t.artResonance ?? 0)), t.flag && (e.flags[t.flag] = !0), t.unlockCg && !e.unlockedCg.includes(t.unlockCg) && e.unlockedCg.push(t.unlockCg), t.itemId && !e.inventoryItemIds.includes(t.itemId) && e.inventoryItemIds.push(t.itemId), Zc(e, t.mastery);
}
function $c(e, t) {
	if (t) {
		if (t.route && e.route !== t.route) return "当前路线未对应";
		if (t.quest && !Kc(e, t.quest)) return "需要先完成指定任务";
		if (t.flag && e.flags[t.flag] !== !0) return "需要指定路线记录";
		if (t.item && !qc(e, t.item)) return "需要指定物品";
		if (t.conflict && !Jc(e, t.conflict)) return "需要先清除指定冲突";
		if (t.trustAtLeast !== void 0 && e.trust < t.trustAtLeast) return `信任需要达到 ${t.trustAtLeast}`;
		if (t.mastery && e.conflictMastery[t.mastery.track] < t.mastery.value) return `熟练度 ${t.mastery.track} 需要达到 ${t.mastery.value}`;
	}
}
function el(e, t, n, r, i = "queued") {
	let a = {
		id: Hc("tactical_event"),
		route: e.route,
		sceneId: e.sceneId,
		title: t,
		detail: n,
		status: i,
		pressure: Vc(r),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		resolvedAt: i === "resolved" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
	};
	return e.routeEvents.unshift(a), e.routeEvents = e.routeEvents.slice(0, 40), a;
}
function tl(e, t, n, r, i, a) {
	let o = {
		id: Hc("watch_signal"),
		route: e.route,
		label: t,
		detail: n,
		level: r,
		pressure: Vc(i),
		sourceId: a,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	e.watchSignals.unshift(o), e.watchSignals = e.watchSignals.slice(0, 40);
}
function nl(e) {
	let t = e && typeof e == "object" && !Array.isArray(e) ? e : {}, n = Gc();
	for (let e of Ic) n[e] = Vc(Number(t[e] ?? 0), 0, 99);
	return n;
}
function rl(e, t, n, r, i) {
	let a = `recovery_${t.id}`;
	if (e.routeEvents.some((e) => e.id === a && e.status === "queued")) return;
	let o = {
		id: a,
		route: e.route,
		sceneId: e.sceneId,
		title: `复苏任务：${t.label}`,
		detail: `${n.label} 输出 ${r}，剩余威胁 ${i}。建议通过交换、联络或重新选位补齐战术资源，再次尝试压制。`,
		status: "queued",
		pressure: Vc(i),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		resolvedAt: void 0
	};
	e.routeEvents.unshift(o), e.routeEvents = e.routeEvents.slice(0, 40), e.flags[`recovery_pending_${t.id}`] = !0, e.routeEconomy.composure = Vc(e.routeEconomy.composure + 2);
}
function il(e, t) {
	let n = Fc(e), r = e.conflictMastery[t.mastery] ?? 0, i = t.mastery === "boundary" ? (n.trust ?? 0) + (n.composure ?? 0) * .35 : t.mastery === "analysis" ? (n.leverage ?? 0) + (n.trust ?? 0) : t.mastery === "resonance" ? (n.artResonance ?? 0) + (n.affection ?? 0) : (n.materials ?? 0) + Math.max(0, 4 - e.danger * .03);
	return Vc(t.basePower + r * 2.5 + i, 0, 120);
}
function al(e) {
	return Xs(e), (!e.conflictMastery || typeof e.conflictMastery != "object") && (e.conflictMastery = Gc()), e.conflictMastery = nl(e.conflictMastery), Array.isArray(e.clearedConflictIds) || (e.clearedConflictIds = []), Array.isArray(e.conflictResolutionLog) || (e.conflictResolutionLog = []), Array.isArray(e.claimedExchangeIds) || (e.claimedExchangeIds = []), Array.isArray(e.exchangeLog) || (e.exchangeLog = []), Array.isArray(e.resolvedContactIds) || (e.resolvedContactIds = []), Array.isArray(e.contactLog) || (e.contactLog = []), Array.isArray(e.watchSignals) || (e.watchSignals = []), Array.isArray(e.timeline) || (e.timeline = []), Array.isArray(e.routeEvents) || (e.routeEvents = []), e.clearedConflictIds = Wc(e.clearedConflictIds, new Set(Lc.map((e) => e.id))), e.claimedExchangeIds = Wc(e.claimedExchangeIds, new Set(zc.map((e) => e.id))), e.resolvedContactIds = Wc(e.resolvedContactIds, new Set(Bc.map((e) => e.id))), e.conflictResolutionLog = e.conflictResolutionLog.filter((e) => e && typeof e.conflictId == "string").slice(0, 80), e.exchangeLog = e.exchangeLog.filter((e) => e && typeof e.exchangeId == "string").slice(0, 80), e.contactLog = e.contactLog.filter((e) => e && typeof e.contactId == "string").slice(0, 80), e.watchSignals = e.watchSignals.filter((e) => e && typeof e.sourceId == "string").slice(0, 40), e;
}
function ol(e) {
	return al(e), Lc.filter((t) => t.route === e.route).map((t) => {
		let n = Jc(e, t.id), r = n ? void 0 : $c(e, t.condition);
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			stage: t.stage,
			threat: t.threat,
			endurance: t.endurance,
			recommendedMastery: t.recommendedMastery,
			reward: t.reward,
			status: n ? "cleared" : r ? "locked" : "available",
			lockedReason: r
		};
	});
}
function sl(e, t) {
	al(e);
	let n = ol(e).find((e) => e.id === t);
	return !n || n.status !== "available" ? [] : Rc.map((t) => {
		let n = !Yc(e, t.cost);
		return {
			id: t.id,
			kind: t.kind,
			label: t.label,
			detail: t.detail,
			cost: t.cost,
			basePower: t.basePower,
			mastery: t.mastery,
			available: !n,
			lockedReason: n ? "资源不足" : void 0
		};
	});
}
function cl(e, t, n) {
	al(e), Hs(e);
	let r = Lc.find((n) => n.id === t && n.route === e.route), i = ol(e).find((e) => e.id === t), a = Rc.find((e) => e.id === n), o = sl(e, t).find((e) => e.id === n);
	if (!r || !i) return {
		ok: !1,
		targetId: t,
		result: "未找到当前路线冲突。"
	};
	if (i.status === "cleared") return {
		ok: !1,
		targetId: t,
		result: "冲突已经清除。"
	};
	if (i.status === "locked") return {
		ok: !1,
		targetId: t,
		result: i.lockedReason ?? "冲突尚未解锁。"
	};
	if (!a || !o) return {
		ok: !1,
		targetId: n,
		result: "未找到可用战术行动。"
	};
	if (!o.available) return {
		ok: !1,
		targetId: n,
		result: o.lockedReason ?? "行动资源不足。"
	};
	Xc(e, a.cost);
	let s = il(e, a), c = Vc(r.threat + r.endurance - s), l = s >= r.endurance;
	Zc(e, { [a.mastery]: l ? 2 : 1 }), l ? (e.clearedConflictIds.includes(r.id) || e.clearedConflictIds.push(r.id), Qc(e, r.reward), el(e, r.label, `${r.detail} 冲突已由 ${a.label} 清除。`, Math.max(8, c), "resolved"), tl(e, `${r.label} 已清除`, `${a.label} 输出 ${s}，剩余威胁 ${c}。`, c > 24 ? "warning" : "stable", c, r.id)) : (e.danger = Vc(e.danger + Math.max(2, Math.ceil(c / 18))), el(e, r.label, `${a.label} 未完全压制冲突，威胁仍在监视列表中。`, c, "queued"), tl(e, `${r.label} 未清除`, `${a.label} 输出 ${s}，剩余威胁 ${c}。`, c >= 42 ? "critical" : "warning", c, r.id), c >= 28 && rl(e, r, a, s, c)), Xs(e), Hs(e);
	let u = `${r.label}：${a.label} 输出 ${s}，剩余威胁 ${c}，${l ? "冲突清除" : "进入监视"}。`, d = {
		id: Hc("conflict_log"),
		route: e.route,
		sceneId: e.sceneId,
		conflictId: t,
		actionId: n,
		label: r.label,
		result: u,
		power: s,
		threatAfter: c,
		cleared: l,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.conflictResolutionLog.unshift(d), e.conflictResolutionLog = e.conflictResolutionLog.slice(0, 80), e.timeline.unshift({
		id: Hc("timeline_conflict"),
		route: e.route,
		sceneId: e.sceneId,
		kind: l ? "consequence" : "memory",
		summary: `战术：${r.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		targetId: t,
		result: u
	};
}
function ll(e) {
	return al(e), zc.filter((t) => Uc(e.route, t.route)).map((t) => {
		let n = e.claimedExchangeIds.includes(t.id), r = n ? void 0 : $c(e, t.condition) ?? (Yc(e, t.cost) ? void 0 : "资源不足");
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			cost: t.cost,
			reward: t.reward,
			status: n ? "claimed" : r ? "locked" : "available",
			lockedReason: r
		};
	});
}
function ul(e, t) {
	al(e);
	let n = zc.find((n) => n.id === t && Uc(e.route, n.route)), r = ll(e).find((e) => e.id === t);
	if (!n || !r) return {
		ok: !1,
		targetId: t,
		result: "未找到当前路线交换。"
	};
	if (r.status === "claimed") return {
		ok: !1,
		targetId: t,
		result: "交换已经完成。"
	};
	if (r.status === "locked") return {
		ok: !1,
		targetId: t,
		result: r.lockedReason ?? "交换尚未解锁。"
	};
	Xc(e, n.cost), Qc(e, n.reward), e.claimedExchangeIds.push(n.id), Xs(e);
	let i = `${n.label}：交换完成，资源和规则层已更新。`, a = {
		id: Hc("exchange_log"),
		route: e.route,
		sceneId: e.sceneId,
		exchangeId: t,
		label: n.label,
		result: i,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.exchangeLog.unshift(a), e.exchangeLog = e.exchangeLog.slice(0, 80), e.timeline.unshift({
		id: Hc("timeline_exchange"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `交换：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		targetId: t,
		result: i
	};
}
function dl(e) {
	return al(e), Bc.filter((t) => Uc(e.route, t.route)).map((t) => {
		let n = e.resolvedContactIds.includes(t.id), r = n ? void 0 : $c(e, t.condition);
		return {
			id: t.id,
			route: t.route,
			channel: t.channel,
			label: t.label,
			detail: t.detail,
			status: n ? "resolved" : r ? "locked" : "available",
			lockedReason: r,
			watchLevel: t.watchLevel
		};
	});
}
function fl(e, t) {
	al(e);
	let n = Bc.find((n) => n.id === t && Uc(e.route, n.route)), r = dl(e).find((e) => e.id === t);
	if (!n || !r) return {
		ok: !1,
		targetId: t,
		result: "未找到联络对象。"
	};
	if (r.status === "resolved") return {
		ok: !1,
		targetId: t,
		result: "联络已经完成。"
	};
	if (r.status === "locked") return {
		ok: !1,
		targetId: t,
		result: r.lockedReason ?? "联络尚未解锁。"
	};
	e.resolvedContactIds.push(n.id), e.flags[`contact_${n.id}`] = !0, n.watchLevel === "critical" ? (e.danger = Vc(e.danger - 4), e.routeEconomy.leverage = Vc(e.routeEconomy.leverage + 2)) : n.watchLevel === "warning" ? (e.danger = Vc(e.danger - 2), e.trust = Vc(e.trust + 1)) : e.routeEconomy.composure = Vc(e.routeEconomy.composure + 4), Xs(e), tl(e, n.label, n.detail, n.watchLevel, n.watchLevel === "critical" ? 44 : n.watchLevel === "warning" ? 28 : 10, n.id);
	let i = `${n.label}：${n.channel} 已记录，监视信号更新。`, a = {
		id: Hc("contact_log"),
		route: e.route,
		sceneId: e.sceneId,
		contactId: t,
		label: n.label,
		result: i,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.contactLog.unshift(a), e.contactLog = e.contactLog.slice(0, 80), e.timeline.unshift({
		id: Hc("timeline_contact"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `联络：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		targetId: t,
		result: i
	};
}
function pl(e) {
	al(e);
	let t = [];
	e.danger >= 60 && t.push({
		id: "watch_dynamic_danger",
		route: e.route,
		label: "危险值过高",
		detail: "当前危险值已经超过安全线，建议先执行防御、交换或联络。",
		level: e.danger >= 78 ? "critical" : "warning",
		pressure: e.danger,
		sourceId: "danger",
		createdAt: e.updatedAt
	});
	for (let n of e.routeEvents.filter((t) => t.route === e.route && t.status === "queued" && t.pressure >= 32).slice(0, 5)) t.push({
		id: `watch_event_${n.id}`,
		route: e.route,
		label: n.title,
		detail: n.detail,
		level: n.pressure >= 44 ? "critical" : "warning",
		pressure: n.pressure,
		sourceId: n.id,
		createdAt: n.createdAt
	});
	return [...t, ...e.watchSignals.filter((t) => t.route === e.route)].sort((e, t) => t.pressure - e.pressure).slice(0, 12);
}
//#endregion
//#region src/config.ts
var ml = "albina-galgame-card", hl = "阿尔比娜 Galgame Card", gl = "打开阿尔比娜前端", _l = "albinaGalgameCardGameSaveV1", vl = `https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.28/release/github-cdn-root/dist/${ml}`, yl = {
	opening_001: {
		chapter: 1,
		sceneId: "opening_001",
		route: "white_canvas",
		locationId: "backstreets_rain",
		background: "bg/backstreets_rain.jpg",
		cg: "cg/opening_rain.jpg",
		tone: "rain",
		characters: [{
			id: "protagonist",
			sprite: "normal",
			position: "left",
			active: !1,
			scale: .92
		}, {
			id: "albina",
			sprite: "normal",
			position: "center",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。",
		choices: [
			{
				id: "enter_white_canvas",
				text: "留在她的白色画布前",
				nextSceneId: "white_canvas_001",
				effects: {
					route: "white_canvas",
					affection: 2,
					trust: 2,
					artResonance: 1,
					unlockCg: "opening_rain",
					flag: "route_white_canvas_seen"
				}
			},
			{
				id: "enter_rebuild",
				text: "询问金枝重构的痕迹",
				nextSceneId: "golden_bough_001",
				effects: {
					route: "golden_bough_rebuild",
					trust: 3,
					danger: 1,
					unlockCg: "golden_bough_rebuild",
					flag: "route_rebuild_seen"
				}
			},
			{
				id: "enter_conspiracy",
				text: "接受环指的危险邀请",
				nextSceneId: "ring_conspiracy_001",
				effects: {
					route: "ring_conspiracy",
					danger: 3,
					artResonance: 2,
					unlockCg: "ring_invitation",
					flag: "route_conspiracy_seen"
				}
			}
		]
	},
	white_canvas_001: {
		chapter: 1,
		sceneId: "white_canvas_001",
		route: "white_canvas",
		locationId: "white_canvas_room",
		background: "bg/white_canvas.jpg",
		cg: "cg/white_canvas_choice.jpg",
		tone: "quiet",
		characters: [{
			id: "protagonist",
			sprite: "tender",
			position: "left",
			active: !1,
			scale: .94
		}, {
			id: "albina",
			sprite: "white-canvas",
			position: "right",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。",
		choices: [{
			id: "white_touch_boundary",
			text: "告诉她：完整也是一种作品",
			nextSceneId: "white_canvas_002",
			effects: {
				affection: 3,
				trust: 4,
				artResonance: 2,
				unlockCg: "trust_threshold",
				flag: "albina_learns_wholeness"
			}
		}, {
			id: "white_tease_back",
			text: "反问她是否害怕自己的画布",
			nextSceneId: "white_canvas_002",
			effects: {
				affection: 2,
				danger: 1,
				artResonance: 3,
				unlockCg: "art_resonance",
				flag: "player_teases_artist"
			}
		}]
	},
	white_canvas_002: {
		chapter: 2,
		sceneId: "white_canvas_002",
		route: "white_canvas",
		locationId: "rain_room",
		background: "bg/rain_room.jpg",
		cg: "cg/rain_confession.jpg",
		tone: "rain",
		characters: [{
			id: "albina",
			sprite: "shy",
			position: "center",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。",
		choices: [{
			id: "white_follow_to_lab",
			text: "陪她把画布带进 LCE 临时手术室",
			nextSceneId: "white_canvas_003",
			effects: {
				trust: 3,
				affection: 2,
				artResonance: 2,
				unlockCg: "hollow_torso_reveal",
				flag: "white_lab_boundary_seen"
			}
		}, {
			id: "return_opening_from_white",
			text: "回到路线选择",
			nextSceneId: "opening_001",
			effects: {
				trust: 1,
				flag: "white_canvas_looped"
			}
		}]
	},
	white_canvas_003: {
		chapter: 3,
		sceneId: "white_canvas_003",
		route: "white_canvas",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/hollow_torso_reveal.jpg",
		tone: "quiet",
		characters: [
			{
				id: "lce_doctor",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .86
			},
			{
				id: "albina",
				sprite: "surgical",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "LCE 医师",
		text: "灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。",
		choices: [{
			id: "white_sign_witness_protocol",
			text: "只签见证，不签处置权",
			nextSceneId: "white_canvas_004",
			effects: {
				trust: 4,
				affection: 1,
				artResonance: 2,
				unlockCg: "lce_raid",
				flag: "witness_not_ownership"
			}
		}, {
			id: "white_interrupt_lab_terms",
			text: "要求医师删去所有所有权措辞",
			nextSceneId: "white_canvas_004",
			effects: {
				trust: 3,
				danger: 1,
				artResonance: 3,
				unlockCg: "fascia_heartbeat",
				flag: "lab_terms_rewritten"
			}
		}]
	},
	white_canvas_004: {
		chapter: 4,
		sceneId: "white_canvas_004",
		route: "white_canvas",
		locationId: "limbus_bus",
		background: "bg/limbus_bus.jpg",
		cg: "cg/limbus_bus_night.jpg",
		tone: "rain",
		characters: [
			{
				id: "dante",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "rain",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "wet-hair",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。",
		choices: [{
			id: "white_keep_empty_seat",
			text: "替她保留那张无人审判的座位",
			nextSceneId: "white_canvas_005",
			effects: {
				affection: 4,
				trust: 3,
				artResonance: 1,
				unlockCg: "white_canvas_ending",
				flag: "white_canvas_empty_seat"
			}
		}, {
			id: "white_share_rain_window",
			text: "把雨夜倒影交给她自己命名",
			nextSceneId: "white_canvas_005",
			effects: {
				affection: 3,
				trust: 2,
				artResonance: 3,
				unlockCg: "rain_confession",
				flag: "rain_reflection_named"
			}
		}]
	},
	white_canvas_005: {
		chapter: 5,
		sceneId: "white_canvas_005",
		route: "white_canvas",
		locationId: "outskirts_dawn",
		background: "bg/outskirts_dawn.jpg",
		cg: "cg/white_canvas_ending.jpg",
		tone: "quiet",
		characters: [{
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}, {
			id: "albina",
			sprite: "endgame",
			position: "center",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。",
		choices: [{
			id: "white_canvas_route_complete",
			text: "记录白色画布路线的暂定结局",
			nextSceneId: "white_canvas_006",
			effects: {
				affection: 2,
				trust: 2,
				danger: -1,
				artResonance: 2,
				flag: "white_canvas_route_complete"
			}
		}]
	},
	white_canvas_006: {
		chapter: 6,
		sceneId: "white_canvas_006",
		route: "white_canvas",
		locationId: "white_canvas_room",
		background: "bg/white_canvas.jpg",
		cg: "cg/white_canvas_choice.jpg",
		tone: "quiet",
		characters: [{
			id: "albina",
			sprite: "white-canvas",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "tender",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。",
		choices: [{
			id: "white_006_name_silence",
			text: "替那条轮廓取一个不会被收藏的名字",
			nextSceneId: "white_canvas_007",
			effects: {
				affection: 3,
				trust: 3,
				artResonance: 3,
				unlockCg: "art_resonance",
				flag: "silhouette_named"
			}
		}, {
			id: "white_006_refuse_naming",
			text: "让轮廓保持无名，由她决定",
			nextSceneId: "white_canvas_007",
			effects: {
				trust: 4,
				affection: 2,
				artResonance: 2,
				unlockCg: "trust_threshold",
				flag: "naming_returned"
			}
		}]
	},
	white_canvas_007: {
		chapter: 7,
		sceneId: "white_canvas_007",
		route: "white_canvas",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/fascia_heartbeat.jpg",
		tone: "quiet",
		characters: [
			{
				id: "albina",
				sprite: "shy",
				position: "right",
				active: !0,
				scale: 1
			},
			{
				id: "fascia",
				sprite: "normal",
				position: "center",
				active: !1,
				scale: .86
			},
			{
				id: "protagonist",
				sprite: "tender",
				position: "left",
				active: !1,
				scale: .9
			}
		],
		speaker: "法西娅",
		text: "法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。",
		choices: [{
			id: "white_007_keep_mirror_open",
			text: "让镜子继续映照，不替她遮蔽",
			nextSceneId: "white_canvas_008",
			effects: {
				trust: 3,
				artResonance: 4,
				danger: 1,
				unlockCg: "fascia_heartbeat",
				flag: "mirror_kept_open"
			}
		}, {
			id: "white_007_ask_fascia_term",
			text: "当着阿尔比娜问法西娅一个边界问题",
			nextSceneId: "white_canvas_008",
			effects: {
				trust: 2,
				affection: 1,
				artResonance: 3,
				unlockCg: "art_resonance",
				flag: "fascia_addressed_directly"
			}
		}]
	},
	white_canvas_008: {
		chapter: 8,
		sceneId: "white_canvas_008",
		route: "white_canvas",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/hollow_torso_reveal.jpg",
		tone: "quiet",
		characters: [
			{
				id: "lce_doctor",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "surgical",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。",
		choices: [{
			id: "white_008_hold_fascia",
			text: "替她暂时照看法西娅",
			nextSceneId: "white_canvas_009",
			effects: {
				trust: 5,
				affection: 2,
				artResonance: 2,
				unlockCg: "fascia_heartbeat",
				flag: "fascia_held_by_player"
			}
		}, {
			id: "white_008_stay_witness_only",
			text: "只站在她视野内，不接手",
			nextSceneId: "white_canvas_009",
			effects: {
				trust: 3,
				affection: 1,
				artResonance: 3,
				unlockCg: "lce_raid",
				flag: "witness_distance_kept"
			}
		}]
	},
	white_canvas_009: {
		chapter: 9,
		sceneId: "white_canvas_009",
		route: "white_canvas",
		locationId: "rain_room",
		background: "bg/rain_room.jpg",
		cg: "cg/rain_confession.jpg",
		tone: "rain",
		characters: [{
			id: "albina",
			sprite: "rain",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "wet-hair",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。",
		choices: [{
			id: "white_009_keep_half_step",
			text: "守住半步距离，不擅自靠近",
			nextSceneId: "white_canvas_010",
			effects: {
				affection: 3,
				trust: 4,
				artResonance: 2,
				unlockCg: "rain_confession",
				flag: "half_step_distance"
			}
		}, {
			id: "white_009_share_umbrella_edge",
			text: "把伞沿偏向她那侧",
			nextSceneId: "white_canvas_010",
			effects: {
				affection: 4,
				trust: 2,
				artResonance: 2,
				unlockCg: "rain_reflection",
				flag: "umbrella_shared"
			}
		}]
	},
	white_canvas_010: {
		chapter: 10,
		sceneId: "white_canvas_010",
		route: "white_canvas",
		locationId: "limbus_bus",
		background: "bg/limbus_bus.jpg",
		cg: "cg/limbus_bus_night.jpg",
		tone: "rain",
		characters: [
			{
				id: "dante",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .8
			},
			{
				id: "albina",
				sprite: "rain",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "但丁",
		text: "但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。",
		choices: [{
			id: "white_010_acknowledge_leave",
			text: "承认她随时可以离开这张画布",
			nextSceneId: "white_canvas_011",
			effects: {
				trust: 4,
				affection: 2,
				artResonance: 3,
				unlockCg: "limbus_bus_night",
				flag: "leaving_acknowledged"
			}
		}, {
			id: "white_010_offer_return_ticket",
			text: "给她一张可以返回的车票，而不是绳索",
			nextSceneId: "white_canvas_011",
			effects: {
				affection: 3,
				trust: 3,
				artResonance: 2,
				unlockCg: "rain_reflection",
				flag: "return_ticket_given"
			}
		}]
	},
	white_canvas_011: {
		chapter: 11,
		sceneId: "white_canvas_011",
		route: "white_canvas",
		locationId: "nest_station",
		background: "bg/nest_station.jpg",
		cg: "cg/art_resonance.jpg",
		tone: "quiet",
		characters: [{
			id: "albina",
			sprite: "white-canvas",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？",
		choices: [{
			id: "white_011_curtain_call",
			text: "答应替她谢幕，不替她登台",
			nextSceneId: "white_canvas_012",
			effects: {
				trust: 5,
				affection: 2,
				artResonance: 3,
				unlockCg: "white_canvas_ending",
				flag: "curtain_call_promised"
			}
		}, {
			id: "white_011_walk_beside",
			text: "陪她走下月台，不离开也不催促",
			nextSceneId: "white_canvas_012",
			effects: {
				affection: 4,
				trust: 3,
				artResonance: 2,
				unlockCg: "rain_confession",
				flag: "platform_walked_together"
			}
		}]
	},
	white_canvas_012: {
		chapter: 12,
		sceneId: "white_canvas_012",
		route: "white_canvas",
		locationId: "spider_gallery",
		background: "bg/spider_gallery.jpg",
		cg: "cg/maestro_shadow.jpg",
		tone: "gallery",
		characters: [
			{
				id: "callisto",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "ring-conspiracy",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "卡利斯托",
		text: "蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。",
		choices: [{
			id: "white_012_refuse_exhibit",
			text: "当众拒绝展出她的缺陷",
			nextSceneId: "white_canvas_013",
			effects: {
				trust: 4,
				affection: 2,
				danger: 1,
				artResonance: 3,
				unlockCg: "trust_threshold",
				flag: "defect_not_exhibited"
			}
		}, {
			id: "white_012_let_her_decide",
			text: "把展与不展的决定权交还给她",
			nextSceneId: "white_canvas_013",
			effects: {
				trust: 5,
				affection: 3,
				artResonance: 4,
				unlockCg: "art_resonance",
				flag: "exhibit_choice_returned"
			}
		}]
	},
	white_canvas_013: {
		chapter: 13,
		sceneId: "white_canvas_013",
		route: "white_canvas",
		locationId: "ring_atelier",
		background: "bg/ring_atelier.jpg",
		cg: "cg/art_resonance.jpg",
		tone: "gallery",
		characters: [{
			id: "albina",
			sprite: "furious",
			position: "right",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "battle",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。",
		choices: [{
			id: "white_013_point_to_mirror",
			text: "指向墙上那面映过法西娅的镜子",
			nextSceneId: "white_canvas_014",
			effects: {
				trust: 3,
				artResonance: 5,
				affection: 2,
				unlockCg: "mirror_broken",
				flag: "mirror_pointed_out"
			}
		}, {
			id: "white_013_refuse_to_choose",
			text: "拒绝替她决定，让她自己下刀",
			nextSceneId: "white_canvas_014",
			effects: {
				trust: 4,
				affection: 1,
				artResonance: 3,
				unlockCg: "art_resonance",
				flag: "knife_returned"
			}
		}]
	},
	white_canvas_014: {
		chapter: 14,
		sceneId: "white_canvas_014",
		route: "white_canvas",
		locationId: "city_rooftop",
		background: "bg/city_rooftop.jpg",
		cg: "cg/trust_threshold.jpg",
		tone: "quiet",
		characters: [{
			id: "albina",
			sprite: "endgame",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？",
		choices: [{
			id: "white_014_keep_base_color",
			text: "答应替她保留最后一层底色",
			nextSceneId: "white_canvas_015",
			effects: {
				affection: 4,
				trust: 4,
				artResonance: 3,
				unlockCg: "white_canvas_ending",
				flag: "base_color_kept"
			}
		}, {
			id: "white_014_offer_restart",
			text: "答应陪她从空白重新开始",
			nextSceneId: "white_canvas_015",
			effects: {
				affection: 3,
				trust: 5,
				artResonance: 4,
				unlockCg: "art_resonance",
				flag: "restart_offered"
			}
		}]
	},
	white_canvas_015: {
		chapter: 15,
		sceneId: "white_canvas_015",
		route: "white_canvas",
		locationId: "outskirts_dawn",
		background: "bg/outskirts_dawn.jpg",
		cg: "cg/white_canvas_ending.jpg",
		tone: "quiet",
		characters: [
			{
				id: "protagonist",
				sprite: "resolve",
				position: "left",
				active: !1,
				scale: .92
			},
			{
				id: "albina",
				sprite: "endgame",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "fascia",
				sprite: "normal",
				position: "right",
				active: !1,
				scale: .84
			}
		],
		speaker: "阿尔比娜",
		text: "城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。",
		choices: [{
			id: "white_canvas_route_final",
			text: "为白色画布路线盖上最后一枚印章",
			nextSceneId: "opening_001",
			effects: {
				affection: 3,
				trust: 3,
				danger: -2,
				artResonance: 4,
				flag: "white_canvas_route_final"
			}
		}]
	},
	golden_bough_001: {
		chapter: 1,
		sceneId: "golden_bough_001",
		route: "golden_bough_rebuild",
		locationId: "golden_bough_fault",
		background: "bg/golden_bough.jpg",
		cg: "cg/rebuild_awakening.jpg",
		tone: "golden",
		characters: [{
			id: "albina",
			sprite: "golden-bough",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "serious",
			position: "left",
			active: !1,
			scale: .9
		}],
		speaker: "阿尔比娜",
		text: "金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。",
		choices: [{
			id: "rebuild_anchor",
			text: "成为她的记忆锚点",
			nextSceneId: "golden_bough_002",
			effects: {
				trust: 5,
				affection: 1,
				artResonance: 2,
				unlockCg: "surgery_of_memory",
				flag: "player_memory_anchor"
			}
		}, {
			id: "rebuild_question_fascia",
			text: "先检查法西娅",
			nextSceneId: "golden_bough_002",
			effects: {
				trust: 2,
				danger: 1,
				artResonance: 4,
				unlockCg: "fascia_heartbeat",
				flag: "fascia_checked_first"
			}
		}]
	},
	golden_bough_002: {
		chapter: 2,
		sceneId: "golden_bough_002",
		route: "golden_bough_rebuild",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/golden_bough_ending.jpg",
		tone: "golden",
		characters: [{
			id: "albina",
			sprite: "endgame",
			position: "right",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .94
		}],
		speaker: "旁白",
		text: "镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。",
		choices: [{
			id: "rebuild_push_into_raid",
			text: "带着记忆锚点突入金枝异常现场",
			nextSceneId: "golden_bough_003",
			effects: {
				trust: 3,
				danger: 2,
				artResonance: 3,
				unlockCg: "lce_raid",
				flag: "rebuild_raid_committed"
			}
		}, {
			id: "return_opening_from_rebuild",
			text: "回到路线选择",
			nextSceneId: "opening_001",
			effects: {
				trust: 1,
				flag: "rebuild_looped"
			}
		}]
	},
	golden_bough_003: {
		chapter: 3,
		sceneId: "golden_bough_003",
		route: "golden_bough_rebuild",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/lce_raid.jpg",
		tone: "threat",
		characters: [
			{
				id: "faust",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "fascia-open",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "浮士德",
		text: "金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。",
		choices: [{
			id: "rebuild_cut_false_completion",
			text: "切断“完成品”的错误定义",
			nextSceneId: "golden_bough_004",
			effects: {
				trust: 4,
				danger: 1,
				artResonance: 4,
				unlockCg: "surgery_of_memory",
				flag: "false_completion_cut"
			}
		}, {
			id: "rebuild_guard_fascia_pulse",
			text: "守住法西娅的心跳频率",
			nextSceneId: "golden_bough_004",
			effects: {
				trust: 3,
				affection: 1,
				artResonance: 3,
				unlockCg: "fascia_heartbeat",
				flag: "fascia_pulse_guarded"
			}
		}]
	},
	golden_bough_004: {
		chapter: 4,
		sceneId: "golden_bough_004",
		route: "golden_bough_rebuild",
		locationId: "city_rooftop",
		background: "bg/city_rooftop.jpg",
		cg: "cg/araya_rooftop.jpg",
		tone: "golden",
		characters: [
			{
				id: "vergilius",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "golden-bough",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "resolve",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "维吉利乌斯",
		text: "楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。",
		choices: [{
			id: "rebuild_accept_missing_pieces",
			text: "承认缺口也是她的结构",
			nextSceneId: "golden_bough_005",
			effects: {
				affection: 2,
				trust: 4,
				artResonance: 2,
				unlockCg: "golden_bough_ending",
				flag: "missing_pieces_accepted"
			}
		}, {
			id: "rebuild_use_rooftop_signal",
			text: "用楼顶信号重排记忆顺序",
			nextSceneId: "golden_bough_005",
			effects: {
				trust: 3,
				danger: -1,
				artResonance: 4,
				unlockCg: "araya_rooftop",
				flag: "rooftop_signal_reordered"
			}
		}]
	},
	golden_bough_005: {
		chapter: 5,
		sceneId: "golden_bough_005",
		route: "golden_bough_rebuild",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/golden_bough_ending.jpg",
		tone: "golden",
		characters: [
			{
				id: "golden_apparition",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "endgame",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "resolve",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "阿尔比娜",
		text: "最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。",
		choices: [{
			id: "golden_bough_route_complete",
			text: "记录金枝重构路线的暂定结局",
			nextSceneId: "golden_bough_006",
			effects: {
				trust: 2,
				affection: 1,
				danger: -1,
				artResonance: 3,
				flag: "golden_bough_route_complete"
			}
		}]
	},
	golden_bough_006: {
		chapter: 6,
		sceneId: "golden_bough_006",
		route: "golden_bough_rebuild",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/surgery_of_memory.jpg",
		tone: "golden",
		characters: [
			{
				id: "faust",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "fascia-open",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "浮士德",
		text: "记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。",
		choices: [{
			id: "rebuild_006_read_aloud",
			text: "把那段记忆当着她的面念出来",
			nextSceneId: "golden_bough_007",
			effects: {
				trust: 4,
				affection: 2,
				artResonance: 3,
				unlockCg: "surgery_of_memory",
				flag: "memory_read_aloud"
			}
		}, {
			id: "rebuild_006_keep_silent_anchor",
			text: "只做锚点，不替她出声",
			nextSceneId: "golden_bough_007",
			effects: {
				trust: 5,
				affection: 1,
				artResonance: 2,
				unlockCg: "fascia_heartbeat",
				flag: "silent_anchor_kept"
			}
		}]
	},
	golden_bough_007: {
		chapter: 7,
		sceneId: "golden_bough_007",
		route: "golden_bough_rebuild",
		locationId: "golden_bough_fault",
		background: "bg/golden_bough.jpg",
		cg: "cg/rebuild_awakening.jpg",
		tone: "golden",
		characters: [{
			id: "albina",
			sprite: "golden-bough",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "battle",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。",
		choices: [{
			id: "rebuild_007_match_her_pulse",
			text: "按她的节拍调整呼吸",
			nextSceneId: "golden_bough_008",
			effects: {
				trust: 4,
				affection: 3,
				artResonance: 3,
				unlockCg: "fascia_heartbeat",
				flag: "pulse_matched"
			}
		}, {
			id: "rebuild_007_stay_own_rhythm",
			text: "保留你自己的呼吸节奏，让她对齐",
			nextSceneId: "golden_bough_008",
			effects: {
				trust: 3,
				affection: 1,
				artResonance: 4,
				unlockCg: "surgery_of_memory",
				flag: "own_rhythm_kept"
			}
		}]
	},
	golden_bough_008: {
		chapter: 8,
		sceneId: "golden_bough_008",
		route: "golden_bough_rebuild",
		locationId: "city_rooftop",
		background: "bg/city_rooftop.jpg",
		cg: "cg/araya_rooftop.jpg",
		tone: "threat",
		characters: [
			{
				id: "vergilius",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "combat",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "维吉利乌斯",
		text: "LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。",
		choices: [{
			id: "rebuild_008_protect_current_self",
			text: "保护此刻这个尚未完成的她",
			nextSceneId: "golden_bough_009",
			effects: {
				trust: 4,
				affection: 2,
				danger: 1,
				artResonance: 3,
				unlockCg: "lce_raid",
				flag: "current_self_protected"
			}
		}, {
			id: "rebuild_008_trade_old_memory",
			text: "用一段旧记忆换取撤退时间",
			nextSceneId: "golden_bough_009",
			effects: {
				trust: 2,
				danger: -2,
				artResonance: 4,
				unlockCg: "surgery_of_memory",
				flag: "memory_traded"
			}
		}]
	},
	golden_bough_009: {
		chapter: 9,
		sceneId: "golden_bough_009",
		route: "golden_bough_rebuild",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/golden_bough_ending.jpg",
		tone: "golden",
		characters: [
			{
				id: "golden_apparition",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "endgame",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "resolve",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "金色幻影",
		text: "镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。",
		choices: [{
			id: "rebuild_009_refuse_perfect_copy",
			text: "替她拒绝那个完美复制品",
			nextSceneId: "golden_bough_010",
			effects: {
				trust: 5,
				affection: 2,
				artResonance: 3,
				unlockCg: "golden_bough_ending",
				flag: "perfect_copy_refused"
			}
		}, {
			id: "rebuild_009_hand_question_back",
			text: "把问题原样交还给她",
			nextSceneId: "golden_bough_010",
			effects: {
				trust: 3,
				affection: 3,
				artResonance: 4,
				unlockCg: "araya_rooftop",
				flag: "question_returned"
			}
		}]
	},
	golden_bough_010: {
		chapter: 10,
		sceneId: "golden_bough_010",
		route: "golden_bough_rebuild",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/lce_raid.jpg",
		tone: "threat",
		characters: [
			{
				id: "lce_doctor",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "surgical",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "LCE 医师",
		text: "医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。",
		choices: [{
			id: "rebuild_010_veto_sealing",
			text: "当着医师反对封存记忆",
			nextSceneId: "golden_bough_011",
			effects: {
				trust: 4,
				affection: 2,
				danger: 2,
				artResonance: 3,
				unlockCg: "lce_raid",
				flag: "memory_seal_vetoed"
			}
		}, {
			id: "rebuild_010_ask_her_choice",
			text: "低声问她自己想怎么签",
			nextSceneId: "golden_bough_011",
			effects: {
				trust: 5,
				affection: 3,
				artResonance: 2,
				unlockCg: "surgery_of_memory",
				flag: "seal_choice_hers"
			}
		}]
	},
	golden_bough_011: {
		chapter: 11,
		sceneId: "golden_bough_011",
		route: "golden_bough_rebuild",
		locationId: "limbus_bus",
		background: "bg/limbus_bus.jpg",
		cg: "cg/limbus_bus_night.jpg",
		tone: "quiet",
		characters: [
			{
				id: "dante",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .8
			},
			{
				id: "albina",
				sprite: "rain",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "tender",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。",
		choices: [{
			id: "rebuild_011_sit_beside",
			text: "坐到她旁边，不说话",
			nextSceneId: "golden_bough_012",
			effects: {
				affection: 4,
				trust: 3,
				artResonance: 2,
				unlockCg: "limbus_bus_night",
				flag: "silent_companionship"
			}
		}, {
			id: "rebuild_011_ask_next_revision",
			text: "问她下一笔想修改哪里",
			nextSceneId: "golden_bough_012",
			effects: {
				affection: 2,
				trust: 4,
				artResonance: 3,
				unlockCg: "araya_rooftop",
				flag: "next_revision_asked"
			}
		}]
	},
	golden_bough_012: {
		chapter: 12,
		sceneId: "golden_bough_012",
		route: "golden_bough_rebuild",
		locationId: "ring_atelier",
		background: "bg/ring_atelier.jpg",
		cg: "cg/conspiracy_contract.jpg",
		tone: "gallery",
		characters: [
			{
				id: "ren",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "furious",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "环指代理人",
		text: "环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\"未完成\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。",
		choices: [{
			id: "rebuild_012_break_contract",
			text: "当面撕毁那份替换协议",
			nextSceneId: "golden_bough_013",
			effects: {
				trust: 4,
				danger: 2,
				artResonance: 3,
				unlockCg: "conspiracy_contract",
				flag: "replacement_contract_torn"
			}
		}, {
			id: "rebuild_012_negotiate_terms",
			text: "替她重新谈判条件，不让她独自承担",
			nextSceneId: "golden_bough_013",
			effects: {
				trust: 3,
				affection: 2,
				artResonance: 4,
				unlockCg: "surgery_of_memory",
				flag: "terms_renegotiated"
			}
		}]
	},
	golden_bough_013: {
		chapter: 13,
		sceneId: "golden_bough_013",
		route: "golden_bough_rebuild",
		locationId: "golden_bough_fault",
		background: "bg/golden_bough.jpg",
		cg: "cg/golden_bough_ending.jpg",
		tone: "golden",
		characters: [
			{
				id: "albina",
				sprite: "golden-bough",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "fascia",
				sprite: "normal",
				position: "right",
				active: !1,
				scale: .84
			},
			{
				id: "protagonist",
				sprite: "resolve",
				position: "left",
				active: !1,
				scale: .92
			}
		],
		speaker: "阿尔比娜",
		text: "回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？",
		choices: [{
			id: "rebuild_013_promise_name",
			text: "答应她即使失败也记得这个名字",
			nextSceneId: "golden_bough_014",
			effects: {
				affection: 4,
				trust: 5,
				artResonance: 3,
				unlockCg: "golden_bough_ending",
				flag: "name_promise_given"
			}
		}, {
			id: "rebuild_013_offer_witness",
			text: "只承诺做见证，不承诺结果",
			nextSceneId: "golden_bough_014",
			effects: {
				affection: 2,
				trust: 4,
				artResonance: 4,
				unlockCg: "surgery_of_memory",
				flag: "witness_only_promise"
			}
		}]
	},
	golden_bough_014: {
		chapter: 14,
		sceneId: "golden_bough_014",
		route: "golden_bough_rebuild",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/araya_rooftop.jpg",
		tone: "golden",
		characters: [{
			id: "albina",
			sprite: "endgame",
			position: "center",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}],
		speaker: "阿尔比娜",
		text: "镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。",
		choices: [{
			id: "rebuild_014_keep_unlit",
			text: "答应只保管，不替她点亮",
			nextSceneId: "golden_bough_015",
			effects: {
				trust: 5,
				affection: 3,
				artResonance: 3,
				unlockCg: "golden_bough_ending",
				flag: "gilded_bough_kept_unlit"
			}
		}, {
			id: "rebuild_014_ask_when_to_light",
			text: "问她什么时刻才能点亮",
			nextSceneId: "golden_bough_015",
			effects: {
				affection: 3,
				trust: 3,
				artResonance: 4,
				unlockCg: "araya_rooftop",
				flag: "lighting_condition_asked"
			}
		}]
	},
	golden_bough_015: {
		chapter: 15,
		sceneId: "golden_bough_015",
		route: "golden_bough_rebuild",
		locationId: "outskirts_dawn",
		background: "bg/outskirts_dawn.jpg",
		cg: "cg/golden_bough_ending.jpg",
		tone: "golden",
		characters: [{
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}, {
			id: "albina",
			sprite: "endgame",
			position: "center",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。",
		choices: [{
			id: "golden_bough_route_final",
			text: "为金枝重构路线落最后一笔",
			nextSceneId: "opening_001",
			effects: {
				affection: 3,
				trust: 3,
				danger: -2,
				artResonance: 4,
				flag: "golden_bough_route_final"
			}
		}]
	},
	ring_conspiracy_001: {
		chapter: 1,
		sceneId: "ring_conspiracy_001",
		route: "ring_conspiracy",
		locationId: "spider_gallery",
		background: "bg/spider_gallery.jpg",
		cg: "cg/conspiracy_contract.jpg",
		tone: "threat",
		characters: [
			{
				id: "callisto",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .86
			},
			{
				id: "albina",
				sprite: "ring-conspiracy",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "ren",
				sprite: "normal",
				position: "right",
				active: !1,
				scale: .84
			}
		],
		speaker: "阿尔比娜",
		text: "蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。",
		choices: [{
			id: "conspiracy_accept",
			text: "接下委托，但保留自己的条件",
			nextSceneId: "ring_conspiracy_002",
			effects: {
				trust: 2,
				danger: 3,
				artResonance: 3,
				unlockCg: "conspiracy_contract",
				flag: "contract_with_boundary"
			}
		}, {
			id: "conspiracy_pressure",
			text: "逼她说出真正目标",
			nextSceneId: "ring_conspiracy_002",
			effects: {
				affection: 1,
				danger: 4,
				artResonance: 2,
				unlockCg: "maestro_shadow",
				flag: "pressed_true_goal"
			}
		}]
	},
	ring_conspiracy_002: {
		chapter: 2,
		sceneId: "ring_conspiracy_002",
		route: "ring_conspiracy",
		locationId: "ring_atelier",
		background: "bg/ring_atelier.jpg",
		cg: "cg/ring_conspiracy_ending.jpg",
		tone: "gallery",
		characters: [{
			id: "albina",
			sprite: "furious",
			position: "right",
			active: !0,
			scale: 1
		}, {
			id: "protagonist",
			sprite: "battle",
			position: "left",
			active: !1,
			scale: .95
		}],
		speaker: "阿尔比娜",
		text: "她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。",
		choices: [{
			id: "conspiracy_escape_to_backstreets",
			text: "带着未签名委托冲出画廊",
			nextSceneId: "ring_conspiracy_003",
			effects: {
				danger: 3,
				trust: 2,
				artResonance: 2,
				unlockCg: "backstreet_pursuit",
				flag: "ring_escape_committed"
			}
		}, {
			id: "return_opening_from_ring",
			text: "回到路线选择",
			nextSceneId: "opening_001",
			effects: {
				danger: -1,
				trust: 1,
				flag: "conspiracy_looped"
			}
		}]
	},
	ring_conspiracy_003: {
		chapter: 3,
		sceneId: "ring_conspiracy_003",
		route: "ring_conspiracy",
		locationId: "backstreets_rain",
		background: "bg/backstreets_rain.jpg",
		cg: "cg/backstreet_pursuit.jpg",
		tone: "threat",
		characters: [
			{
				id: "ring_agent",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "combat",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "环指代理人",
		text: "追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。",
		choices: [{
			id: "conspiracy_break_pursuit_frame",
			text: "打碎追兵布下的取景框",
			nextSceneId: "ring_conspiracy_004",
			effects: {
				danger: 2,
				trust: 3,
				artResonance: 3,
				unlockCg: "combat_transition_01",
				flag: "pursuit_frame_broken"
			}
		}, {
			id: "conspiracy_feed_false_signature",
			text: "交出伪造签名引开视线",
			nextSceneId: "ring_conspiracy_004",
			effects: {
				danger: -1,
				trust: 2,
				artResonance: 4,
				unlockCg: "ren_interruption",
				flag: "false_signature_planted"
			}
		}]
	},
	ring_conspiracy_004: {
		chapter: 4,
		sceneId: "ring_conspiracy_004",
		route: "ring_conspiracy",
		locationId: "spider_gallery",
		background: "bg/spider_gallery.jpg",
		cg: "cg/maestro_shadow.jpg",
		tone: "gallery",
		characters: [
			{
				id: "ren",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "maestro",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "shadow",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。",
		choices: [{
			id: "ring_conspiracy_route_complete",
			text: "记录环指共谋路线的暂定结局",
			nextSceneId: "ring_conspiracy_005",
			effects: {
				danger: -2,
				trust: 2,
				affection: 1,
				artResonance: 3,
				unlockCg: "ring_conspiracy_ending",
				flag: "ring_conspiracy_route_complete"
			}
		}]
	},
	ring_conspiracy_005: {
		chapter: 5,
		sceneId: "ring_conspiracy_005",
		route: "ring_conspiracy",
		locationId: "ring_atelier",
		background: "bg/ring_atelier.jpg",
		cg: "cg/maestro_shadow.jpg",
		tone: "gallery",
		characters: [
			{
				id: "callisto",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .86
			},
			{
				id: "albina",
				sprite: "maestro",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "shadow",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "卡利斯托",
		text: "卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。",
		choices: [{
			id: "conspiracy_005_refuse_duo",
			text: "当众拒绝成为合作展品",
			nextSceneId: "ring_conspiracy_006",
			effects: {
				trust: 3,
				danger: 2,
				artResonance: 3,
				unlockCg: "maestro_shadow",
				flag: "duo_exhibit_refused"
			}
		}, {
			id: "conspiracy_005_let_her_answer",
			text: "不替她回答，让阿尔比娜开口",
			nextSceneId: "ring_conspiracy_006",
			effects: {
				trust: 4,
				affection: 2,
				artResonance: 4,
				unlockCg: "conspiracy_contract",
				flag: "albina_answered_herself"
			}
		}]
	},
	ring_conspiracy_006: {
		chapter: 6,
		sceneId: "ring_conspiracy_006",
		route: "ring_conspiracy",
		locationId: "spider_gallery",
		background: "bg/spider_gallery.jpg",
		cg: "cg/conspiracy_contract.jpg",
		tone: "threat",
		characters: [
			{
				id: "ren",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "furious",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "阿尔比娜",
		text: "蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。",
		choices: [{
			id: "conspiracy_006_stand_with_her",
			text: "站到她身侧，分担凝视",
			nextSceneId: "ring_conspiracy_007",
			effects: {
				affection: 3,
				trust: 4,
				danger: 1,
				artResonance: 3,
				unlockCg: "maestro_shadow",
				flag: "gaze_shared"
			}
		}, {
			id: "conspiracy_006_block_view",
			text: "挡在她和委托人之间",
			nextSceneId: "ring_conspiracy_007",
			effects: {
				affection: 2,
				trust: 3,
				danger: 3,
				artResonance: 2,
				unlockCg: "combat_transition_01",
				flag: "view_blocked"
			}
		}]
	},
	ring_conspiracy_007: {
		chapter: 7,
		sceneId: "ring_conspiracy_007",
		route: "ring_conspiracy",
		locationId: "backstreets_rain",
		background: "bg/backstreets_rain.jpg",
		cg: "cg/backstreet_pursuit.jpg",
		tone: "threat",
		characters: [
			{
				id: "ring_agent",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "combat",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "环指代理人",
		text: "雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。",
		choices: [{
			id: "conspiracy_007_break_frame",
			text: "冲破画框",
			nextSceneId: "ring_conspiracy_008",
			effects: {
				danger: 3,
				trust: 3,
				artResonance: 3,
				unlockCg: "combat_transition_01",
				flag: "street_frame_broken"
			}
		}, {
			id: "conspiracy_007_seize_frame",
			text: "把画框抢过来，反过来框住他",
			nextSceneId: "ring_conspiracy_008",
			effects: {
				danger: 2,
				trust: 4,
				artResonance: 4,
				unlockCg: "maestro_shadow",
				flag: "frame_seized"
			}
		}]
	},
	ring_conspiracy_008: {
		chapter: 8,
		sceneId: "ring_conspiracy_008",
		route: "ring_conspiracy",
		locationId: "lce_lab",
		background: "bg/lce_lab.jpg",
		cg: "cg/lce_raid.jpg",
		tone: "threat",
		characters: [
			{
				id: "lce_doctor",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "surgical",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "serious",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "LCE 医师",
		text: "LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。",
		choices: [{
			id: "conspiracy_008_refuse_testimony",
			text: "当面拒绝用她换取证词",
			nextSceneId: "ring_conspiracy_009",
			effects: {
				trust: 5,
				affection: 2,
				danger: 2,
				artResonance: 2,
				unlockCg: "lce_raid",
				flag: "testimony_refused"
			}
		}, {
			id: "conspiracy_008_hand_pen_to_her",
			text: "把笔交还给她，由她自己决定",
			nextSceneId: "ring_conspiracy_009",
			effects: {
				trust: 4,
				affection: 3,
				artResonance: 3,
				unlockCg: "conspiracy_contract",
				flag: "pen_returned_to_albina"
			}
		}]
	},
	ring_conspiracy_009: {
		chapter: 9,
		sceneId: "ring_conspiracy_009",
		route: "ring_conspiracy",
		locationId: "mirror_corridor",
		background: "bg/mirror_corridor.jpg",
		cg: "cg/maestro_shadow.jpg",
		tone: "gallery",
		characters: [
			{
				id: "golden_apparition",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "maestro",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "shadow",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "镜廊里同时映出\"环指版的她\"和\"现在的她\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？",
		choices: [{
			id: "conspiracy_009_choose_present",
			text: "选现在的她，不挑那个环指版",
			nextSceneId: "ring_conspiracy_010",
			effects: {
				affection: 4,
				trust: 3,
				artResonance: 3,
				unlockCg: "art_resonance",
				flag: "present_albina_chosen"
			}
		}, {
			id: "conspiracy_009_refuse_choice",
			text: "拒绝回答，让她自己挑镜子",
			nextSceneId: "ring_conspiracy_010",
			effects: {
				affection: 2,
				trust: 4,
				artResonance: 4,
				unlockCg: "maestro_shadow",
				flag: "mirror_choice_returned"
			}
		}]
	},
	ring_conspiracy_010: {
		chapter: 10,
		sceneId: "ring_conspiracy_010",
		route: "ring_conspiracy",
		locationId: "ring_atelier",
		background: "bg/ring_atelier.jpg",
		cg: "cg/conspiracy_contract.jpg",
		tone: "gallery",
		characters: [
			{
				id: "callisto",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "furious",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "卡利斯托",
		text: "卡利斯托拿出一枚\"合作者徽章\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。",
		choices: [{
			id: "conspiracy_010_throw_badge",
			text: "把徽章扔回卡利斯托脸上",
			nextSceneId: "ring_conspiracy_011",
			effects: {
				affection: 3,
				trust: 4,
				danger: 3,
				artResonance: 2,
				unlockCg: "combat_transition_01",
				flag: "badge_thrown"
			}
		}, {
			id: "conspiracy_010_keep_badge_unworn",
			text: "收下徽章，但谁都不许戴",
			nextSceneId: "ring_conspiracy_011",
			effects: {
				affection: 2,
				trust: 3,
				danger: 1,
				artResonance: 4,
				unlockCg: "maestro_shadow",
				flag: "badge_kept_unworn"
			}
		}]
	},
	ring_conspiracy_011: {
		chapter: 11,
		sceneId: "ring_conspiracy_011",
		route: "ring_conspiracy",
		locationId: "spider_gallery",
		background: "bg/spider_gallery.jpg",
		cg: "cg/maestro_shadow.jpg",
		tone: "threat",
		characters: [
			{
				id: "ren",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "combat",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "battle",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "环指代理人",
		text: "代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。",
		choices: [{
			id: "conspiracy_011_rewrite_ending",
			text: "当众改写结局，让他们措手不及",
			nextSceneId: "ring_conspiracy_012",
			effects: {
				trust: 4,
				danger: 2,
				artResonance: 4,
				unlockCg: "ring_conspiracy_ending",
				flag: "ending_rewritten"
			}
		}, {
			id: "conspiracy_011_burn_film",
			text: "直接烧掉胶片，让剧本作废",
			nextSceneId: "ring_conspiracy_012",
			effects: {
				trust: 3,
				danger: 4,
				artResonance: 3,
				unlockCg: "combat_transition_01",
				flag: "film_burned"
			}
		}]
	},
	ring_conspiracy_012: {
		chapter: 12,
		sceneId: "ring_conspiracy_012",
		route: "ring_conspiracy",
		locationId: "city_rooftop",
		background: "bg/city_rooftop.jpg",
		cg: "cg/araya_rooftop.jpg",
		tone: "threat",
		characters: [
			{
				id: "vergilius",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .84
			},
			{
				id: "albina",
				sprite: "rain",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "resolve",
				position: "right",
				active: !1,
				scale: .92
			}
		],
		speaker: "维吉利乌斯",
		text: "楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。",
		choices: [{
			id: "conspiracy_012_end_tonight",
			text: "选择结束今晚的共谋",
			nextSceneId: "ring_conspiracy_013",
			effects: {
				trust: 3,
				affection: 2,
				danger: -2,
				artResonance: 3,
				unlockCg: "ring_conspiracy_ending",
				flag: "night_ended"
			}
		}, {
			id: "conspiracy_012_keep_blade",
			text: "收下画刀，留给未来必要时再用",
			nextSceneId: "ring_conspiracy_013",
			effects: {
				trust: 4,
				affection: 1,
				danger: 1,
				artResonance: 4,
				unlockCg: "maestro_shadow",
				flag: "blade_kept"
			}
		}]
	},
	ring_conspiracy_013: {
		chapter: 13,
		sceneId: "ring_conspiracy_013",
		route: "ring_conspiracy",
		locationId: "limbus_bus",
		background: "bg/limbus_bus.jpg",
		cg: "cg/limbus_bus_night.jpg",
		tone: "quiet",
		characters: [
			{
				id: "dante",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .8
			},
			{
				id: "albina",
				sprite: "rain",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "wet-hair",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "阿尔比娜",
		text: "夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。",
		choices: [{
			id: "conspiracy_013_hold_one_second",
			text: "认真握住那一秒，不多不少",
			nextSceneId: "ring_conspiracy_014",
			effects: {
				affection: 4,
				trust: 3,
				artResonance: 3,
				unlockCg: "fascia_heartbeat",
				flag: "one_second_held"
			}
		}, {
			id: "conspiracy_013_return_gently",
			text: "提前把它轻轻送回，不占有",
			nextSceneId: "ring_conspiracy_014",
			effects: {
				affection: 2,
				trust: 5,
				artResonance: 4,
				unlockCg: "rain_reflection",
				flag: "heartbeat_returned_early"
			}
		}]
	},
	ring_conspiracy_014: {
		chapter: 14,
		sceneId: "ring_conspiracy_014",
		route: "ring_conspiracy",
		locationId: "nest_station",
		background: "bg/nest_station.jpg",
		cg: "cg/ring_conspiracy_ending.jpg",
		tone: "gallery",
		characters: [
			{
				id: "callisto",
				sprite: "normal",
				position: "left",
				active: !1,
				scale: .82
			},
			{
				id: "albina",
				sprite: "maestro",
				position: "center",
				active: !0,
				scale: 1
			},
			{
				id: "protagonist",
				sprite: "shadow",
				position: "right",
				active: !1,
				scale: .9
			}
		],
		speaker: "卡利斯托",
		text: "巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？",
		choices: [{
			id: "conspiracy_014_erase_from_catalog",
			text: "选择从环指目录里彻底抹去",
			nextSceneId: "ring_conspiracy_015",
			effects: {
				trust: 4,
				affection: 2,
				danger: -2,
				artResonance: 3,
				unlockCg: "ring_conspiracy_ending",
				flag: "catalog_erased"
			}
		}, {
			id: "conspiracy_014_keep_one_line",
			text: "只保留一行不被署名的记录",
			nextSceneId: "ring_conspiracy_015",
			effects: {
				trust: 3,
				affection: 3,
				artResonance: 4,
				unlockCg: "maestro_shadow",
				flag: "anonymous_line_kept"
			}
		}]
	},
	ring_conspiracy_015: {
		chapter: 15,
		sceneId: "ring_conspiracy_015",
		route: "ring_conspiracy",
		locationId: "outskirts_dawn",
		background: "bg/outskirts_dawn.jpg",
		cg: "cg/ring_conspiracy_ending.jpg",
		tone: "quiet",
		characters: [{
			id: "protagonist",
			sprite: "resolve",
			position: "left",
			active: !1,
			scale: .92
		}, {
			id: "albina",
			sprite: "endgame",
			position: "center",
			active: !0,
			scale: 1
		}],
		speaker: "阿尔比娜",
		text: "城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。",
		choices: [{
			id: "ring_conspiracy_route_final",
			text: "为环指共谋路线合上最后一卷胶片",
			nextSceneId: "opening_001",
			effects: {
				affection: 3,
				trust: 3,
				danger: -2,
				artResonance: 4,
				flag: "ring_conspiracy_route_final"
			}
		}]
	}
};
function bl(e) {
	return JSON.parse(JSON.stringify(e));
}
function xl(e) {
	return bl(yl[e] ?? yl.opening_001);
}
function Sl(e) {
	return e === "golden_bough_rebuild" ? "golden_bough_001" : e === "ring_conspiracy" ? "ring_conspiracy_001" : "white_canvas_001";
}
function Cl() {
	return Object.values(yl).map(bl);
}
//#endregion
//#region src/core/progressionEngine.ts
var wl = 2142, Tl = 260, El = 1882, Dl = 1882, Ol = 15, kl = [
	0,
	12,
	30,
	60,
	100
], Al = [
	{
		id: "narrative_curator",
		label: "剧情索引师",
		detail: "维护原著适配、路线节点与动态记忆之间的可追踪边界，防止把标题覆盖误报成完整剧情复刻。",
		unlockHint: "默认可用。",
		condition: () => !0,
		modifier: (e) => ({
			composure: e * 2,
			artResonance: e
		})
	},
	{
		id: "boundary_mediator",
		route: "white_canvas",
		label: "边界调停者",
		detail: "把白色画布路线的同意、暂停、撤回写成稳定规则，削弱危险推进。",
		unlockHint: "进入白色画布路线或完成边界桌任务。",
		condition: (e) => e.flags.route_white_canvas_seen === !0 || e.flags.quest_white_boundary_contract === !0,
		modifier: (e) => ({
			trust: e * 2,
			danger: -e
		})
	},
	{
		id: "memory_surgeon",
		route: "golden_bough_rebuild",
		label: "记忆修复师",
		detail: "处理金枝重构、法西娅残响与称谓连续性，降低重构叙事漂移。",
		unlockHint: "进入金枝重构路线或完成金枝裂隙扫描。",
		condition: (e) => e.flags.route_rebuild_seen === !0 || e.flags.quest_golden_scan_bough === !0,
		modifier: (e) => ({
			composure: e,
			artResonance: e * 2
		})
	},
	{
		id: "ring_counterforger",
		route: "ring_conspiracy",
		label: "契约反写者",
		detail: "把环指共谋中的敌对条款改写为玩家可利用的制衡条件。",
		unlockHint: "进入环指共谋路线或完成蜘蛛巢侦察。",
		condition: (e) => e.flags.route_conspiracy_seen === !0 || e.flags.activity_spider_gallery_recon === !0,
		modifier: (e) => ({
			leverage: e * 2,
			danger: -Math.floor(e / 2)
		})
	}
], jl = [
	{
		id: "ach_manifest_index_ack",
		label: "索引边界确认",
		detail: "承认 2142/2142 是标题索引覆盖，而不是全量深写剧情复刻。",
		requirement: "初始化剧情索引。",
		condition: (e) => e.narrativeIndex.some((e) => e.id === "manifest_title_index" && e.coverage === wl),
		reward: {
			professionXp: { narrative_curator: 4 },
			composure: 2,
			flag: "achievement_manifest_index_ack"
		}
	},
	{
		id: "ach_first_scene_branch",
		label: "第一条分支镜头",
		detail: "完成第一个由任务、战术或路线状态解锁的场景分支。",
		requirement: "解决任意场景分支。",
		condition: (e) => e.resolvedSceneBranchIds.length >= 1,
		reward: {
			professionXp: { narrative_curator: 6 },
			artResonance: 1
		}
	},
	{
		id: "ach_three_route_witness",
		label: "三路线见证",
		detail: "至少进入过白色画布、金枝重构与环指共谋三条路线。",
		requirement: "三条路线入口均被记录。",
		condition: (e) => e.flags.route_white_canvas_seen === !0 && e.flags.route_rebuild_seen === !0 && e.flags.route_conspiracy_seen === !0,
		reward: {
			professionXp: { narrative_curator: 8 },
			leverage: 1
		}
	},
	{
		id: "ach_white_boundary_archivist",
		route: "white_canvas",
		label: "白厅边界档案",
		detail: "白色画布路线已把无创创作和边界规则写入权威状态。",
		requirement: "完成边界桌规则，并清理画廊破局压力。",
		condition: (e) => e.flags.quest_white_boundary_contract === !0 && e.clearedConflictIds.includes("white_gallery_break"),
		reward: {
			professionXp: { boundary_mediator: 10 },
			trust: 2,
			danger: -2
		}
	},
	{
		id: "ach_golden_memory_protocol",
		route: "golden_bough_rebuild",
		label: "重构称谓协议",
		detail: "金枝重构路线已确认法西娅心跳和称谓连续性。",
		requirement: "完成称谓复位，并解决法西娅残响。",
		condition: (e) => e.flags.quest_golden_restore_pronouns === !0 && e.clearedConflictIds.includes("golden_fascia_echo"),
		reward: {
			professionXp: { memory_surgeon: 10 },
			artResonance: 3
		}
	},
	{
		id: "ach_ring_counter_clause",
		route: "ring_conspiracy",
		label: "反写条款生效",
		detail: "环指共谋路线已取得反制条款并压制契约执行人。",
		requirement: "完成反写委托条款，并解决契约执行人。",
		condition: (e) => e.flags.quest_ring_counter_contract === !0 && e.clearedConflictIds.includes("ring_contract_enforcer"),
		reward: {
			professionXp: { ring_counterforger: 10 },
			leverage: 3,
			danger: -2
		}
	},
	{
		id: "ach_reality_projection",
		label: "现实覆盖投影",
		detail: "现实覆盖层已开始把聊天现场、路线状态和原著适配边界分开显示。",
		requirement: "激活至少两个现实覆盖。",
		condition: (e) => e.realityOverlayIds.length >= 2,
		reward: {
			professionXp: { narrative_curator: 5 },
			composure: 2
		}
	},
	{
		id: "ach_profession_level_two",
		label: "专精成型",
		detail: "至少一个职业化路线达到 2 级。",
		requirement: "任意职业达到 2 级。",
		condition: (e) => Object.values(e.professionProgress).some((e) => e.level >= 2),
		reward: {
			materials: 1,
			trust: 1,
			flag: "achievement_profession_level_two"
		}
	}
], Ml = [
	{
		id: "overlay_opening_boundary",
		label: "开场边界投影",
		detail: "把开场定位为玩家与阿尔比娜关系的入口，而不是原著全集复述。",
		directive: "生成时必须先确认玩家身份、路线入口和同意边界，再推进亲密或危险叙事。",
		intensity: 1,
		condition: () => !0,
		reward: {
			professionXp: { narrative_curator: 2 },
			composure: 1
		}
	},
	{
		id: "overlay_manifest_bridge_notice",
		label: "索引覆盖投影",
		detail: "2142 个标题已被索引，但 1882 个仍是桥接提示，需要按触发语境使用。",
		directive: "当触发冷门术语时，只把它作为氛围、角色反应或战术成本锚点，不把它冒充完整剧情复述。",
		intensity: 2,
		condition: (e) => e.narrativeIndex.some((e) => e.id === "p4_bridge_lore" && e.coverage === El),
		reward: {
			professionXp: { narrative_curator: 3 },
			artResonance: 1
		}
	},
	{
		id: "overlay_white_canvas_safety",
		route: "white_canvas",
		label: "白色画布现实约束",
		detail: "白色画布路线必须把“完整的人”置于“作品”之前。",
		directive: "任何亲密推进都必须承认暂停、撤回和重新确认。",
		intensity: 2,
		condition: (e) => e.route === "white_canvas" || e.flags.route_white_canvas_seen === !0,
		reward: {
			professionXp: { boundary_mediator: 3 },
			trust: 1,
			danger: -1
		}
	},
	{
		id: "overlay_golden_memory_fault",
		route: "golden_bough_rebuild",
		label: "金枝断层现实约束",
		detail: "重构路线必须保留称谓、身体连续性和法西娅的主体边界。",
		directive: "不要让修复变成随意抹除；每次重构都需要代价、见证和稳定锚。",
		intensity: 3,
		condition: (e) => e.route === "golden_bough_rebuild" || e.flags.route_rebuild_seen === !0,
		reward: {
			professionXp: { memory_surgeon: 3 },
			artResonance: 1
		}
	},
	{
		id: "overlay_ring_contract_pressure",
		route: "ring_conspiracy",
		label: "环指契约现实约束",
		detail: "共谋路线必须让危险有代价，同时保留玩家反写条款的主动权。",
		directive: "敌对推进需要暴露、筹码或契约压力支撑；玩家可通过反制条款夺回节奏。",
		intensity: 4,
		condition: (e) => e.route === "ring_conspiracy" || e.flags.route_conspiracy_seen === !0,
		reward: {
			professionXp: { ring_counterforger: 3 },
			leverage: 1
		}
	}
], Nl = [
	{
		id: "branch_white_rain_followup",
		route: "white_canvas",
		label: "雨巷二次回望",
		detail: "把初遇后巷从单幕开场扩展为可回访的感情锚点。",
		chapter: 1,
		requirement: "进入白色画布路线。",
		condition: (e) => e.flags.route_white_canvas_seen === !0,
		reward: {
			trust: 1,
			affection: 1,
			professionXp: { narrative_curator: 2 },
			flag: "branch_white_rain_followup"
		},
		result: "雨巷回望被写入剧情索引：阿尔比娜不再只把玩家当作素材评估。"
	},
	{
		id: "branch_white_no_cut_canvas",
		route: "white_canvas",
		label: "无创画布分镜",
		detail: "将“作品可以不切开任何人”落实为白色画室的分支事件。",
		chapter: 2,
		requirement: "完成准备无创画布任务。",
		condition: (e) => e.flags.quest_white_prepare_canvas === !0,
		reward: {
			trust: 2,
			artResonance: 2,
			professionXp: { boundary_mediator: 4 },
			flag: "branch_white_no_cut_canvas"
		},
		result: "白色画室新增无创分镜：亲密推进必须先确认完整性。"
	},
	{
		id: "branch_white_boundary_table",
		route: "white_canvas",
		label: "边界桌确认",
		detail: "把边界桌规则转为后续生成可引用的剧情索引。",
		chapter: 3,
		requirement: "完成边界桌规则。",
		condition: (e) => e.flags.quest_white_boundary_contract === !0,
		reward: {
			trust: 2,
			danger: -2,
			professionXp: { boundary_mediator: 5 },
			flag: "branch_white_boundary_table"
		},
		result: "边界桌被纳入分支索引：系统后续必须承认暂停和撤回。"
	},
	{
		id: "branch_white_first_canvas_end",
		route: "white_canvas",
		label: "第一幅白画终幕",
		detail: "把终幕白厅从任务奖励扩展为可追踪的关系结局。",
		chapter: 5,
		requirement: "完成第一幅白画。",
		condition: (e) => e.flags.quest_white_complete === !0,
		reward: {
			affection: 2,
			trust: 2,
			artResonance: 3,
			unlockCg: "white_canvas_ending",
			professionXp: { boundary_mediator: 6 },
			flag: "branch_white_first_canvas_end"
		},
		result: "白色画布终幕进入剧情索引：完成作品与保全玩家成为同一件事。"
	},
	{
		id: "branch_golden_lce_afterimage",
		route: "golden_bough_rebuild",
		label: "LCE（边狱应急处置）残影回放",
		detail: "将金枝裂隙扫描转为现实断层回放。",
		chapter: 1,
		requirement: "扫描金枝裂隙。",
		condition: (e) => e.flags.quest_golden_scan_bough === !0,
		reward: {
			artResonance: 2,
			professionXp: { memory_surgeon: 3 },
			flag: "branch_golden_lce_afterimage"
		},
		result: "LCE（边狱应急处置）残影被索引：金枝异常不再只是背景，而是重构代价。"
	},
	{
		id: "branch_golden_fascia_name",
		route: "golden_bough_rebuild",
		label: "法西娅称名",
		detail: "把法西娅从工具描写提升为需要安抚的身体延伸。",
		chapter: 2,
		requirement: "追踪法西娅心跳。",
		condition: (e) => e.flags.quest_golden_trace_fascia === !0,
		reward: {
			trust: 2,
			artResonance: 1,
			professionXp: { memory_surgeon: 4 },
			flag: "branch_golden_fascia_name"
		},
		result: "法西娅称名进入剧情索引：巨剑不再被当作无声道具。"
	},
	{
		id: "branch_golden_pronoun_lock",
		route: "golden_bough_rebuild",
		label: "称谓锁定",
		detail: "把称谓连续性写入重构路线的硬约束。",
		chapter: 3,
		requirement: "完成称谓复位。",
		condition: (e) => e.flags.quest_golden_restore_pronouns === !0,
		reward: {
			composure: 2,
			trust: 1,
			professionXp: { memory_surgeon: 5 },
			flag: "branch_golden_pronoun_lock"
		},
		result: "称谓锁定生效：后续重构不得随意抹除玩家与阿尔比娜的互称。"
	},
	{
		id: "branch_golden_rebuild_dawn",
		route: "golden_bough_rebuild",
		label: "重构黎明分支",
		detail: "把最终修复结果挂接到长线职业成长与现实覆盖。",
		chapter: 5,
		requirement: "完成重构黎明。",
		condition: (e) => e.flags.quest_golden_rebuild_complete === !0,
		reward: {
			trust: 2,
			artResonance: 4,
			unlockCg: "golden_bough_ending",
			professionXp: { memory_surgeon: 7 },
			flag: "branch_golden_rebuild_dawn"
		},
		result: "重构黎明进入剧情索引：修复结果被保存为可持续的新身体叙事。"
	},
	{
		id: "branch_ring_false_ticket",
		route: "ring_conspiracy",
		label: "假票入场",
		detail: "把蜘蛛巢侦察扩展为可回放的潜入镜头。",
		chapter: 2,
		requirement: "完成蜘蛛巢画廊侦察。",
		condition: (e) => e.flags.quest_ring_gallery_recon === !0 || e.flags.activity_spider_gallery_recon === !0,
		reward: {
			leverage: 2,
			danger: 1,
			professionXp: { ring_counterforger: 4 },
			flag: "branch_ring_false_ticket"
		},
		result: "假票入场被索引：共谋路线获得明确潜入分支。"
	},
	{
		id: "branch_ring_clause_reversal",
		route: "ring_conspiracy",
		label: "条款反转",
		detail: "把反写委托从资源动作扩展为剧情分镜。",
		chapter: 3,
		requirement: "反写委托条款。",
		condition: (e) => e.flags.quest_ring_counter_contract === !0 || e.flags.activity_counter_contract === !0,
		reward: {
			leverage: 2,
			danger: -2,
			professionXp: { ring_counterforger: 5 },
			flag: "branch_ring_clause_reversal"
		},
		result: "条款反转进入剧情索引：敌对契约受到玩家制衡。"
	},
	{
		id: "branch_ring_pursuit_cutback",
		route: "ring_conspiracy",
		label: "追击反切",
		detail: "在暴露压力中保留撤离路线，形成高危分支。",
		chapter: 4,
		requirement: "完成追击后巷撤离。",
		condition: (e) => e.flags.quest_ring_pursuit_escape === !0,
		reward: {
			composure: 2,
			leverage: 1,
			professionXp: { ring_counterforger: 5 },
			flag: "branch_ring_pursuit_cutback"
		},
		result: "追击反切被写入索引：危险路线获得可撤离的反制节奏。"
	},
	{
		id: "branch_ring_maestro_refusal",
		route: "ring_conspiracy",
		label: "首席命令拒绝",
		detail: "让共谋关系面对更高位艺术命令时仍保有自愿边界。",
		chapter: 5,
		requirement: "面对首席阴影。",
		condition: (e) => e.flags.quest_ring_face_maestro === !0,
		reward: {
			trust: 2,
			danger: -1,
			unlockCg: "ring_conspiracy_ending",
			professionXp: { ring_counterforger: 7 },
			flag: "branch_ring_maestro_refusal"
		},
		result: "首席命令拒绝进入剧情索引：共谋不再等同于服从。"
	}
];
function Pl(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function Fl(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Il(e) {
	return {
		id: e,
		level: 1,
		xp: 0
	};
}
function Ll() {
	return {
		narrative_curator: Il("narrative_curator"),
		boundary_mediator: Il("boundary_mediator"),
		memory_surgeon: Il("memory_surgeon"),
		ring_counterforger: Il("ring_counterforger")
	};
}
function Rl(e) {
	return kl[Math.min(e, kl.length - 1)] ?? kl[kl.length - 1];
}
function zl(e, t) {
	return {
		id: t,
		level: Pl(e?.level ?? 1, 1, 5),
		xp: Pl(e?.xp ?? 0, 0, 999),
		selectedAt: typeof e?.selectedAt == "string" ? e.selectedAt : void 0
	};
}
function Bl(e, t) {
	return !e || e.id !== t.id || e.level !== t.level || e.xp !== t.xp || e.selectedAt !== t.selectedAt;
}
function Vl(e) {
	let t = e.professionProgress && typeof e.professionProgress == "object" ? e.professionProgress : {}, n = {
		narrative_curator: zl(t.narrative_curator, "narrative_curator"),
		boundary_mediator: zl(t.boundary_mediator, "boundary_mediator"),
		memory_surgeon: zl(t.memory_surgeon, "memory_surgeon"),
		ring_counterforger: zl(t.ring_counterforger, "ring_counterforger")
	};
	(Bl(t.narrative_curator, n.narrative_curator) || Bl(t.boundary_mediator, n.boundary_mediator) || Bl(t.memory_surgeon, n.memory_surgeon) || Bl(t.ring_counterforger, n.ring_counterforger)) && (e.professionProgress = n);
}
function Hl(e, t) {
	let n = e.professionProgress[t], r = 1;
	for (let e = 1; e < kl.length; e += 1) n.xp >= kl[e] && (r = e + 1);
	n.level = Pl(r, 1, 5);
}
function Ul(e, t) {
	if (t) {
		Vl(e);
		for (let [n, r] of Object.entries(t)) r && (e.professionProgress[n].xp = Pl(e.professionProgress[n].xp + r, 0, 999), Hl(e, n));
	}
}
function Wl(e, t) {
	e.routeEconomy.composure = Pl(e.routeEconomy.composure + (t.composure ?? 0)), e.routeEconomy.materials = Pl(e.routeEconomy.materials + (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = Pl(e.routeEconomy.leverage + (t.leverage ?? 0)), e.trust = Pl(e.trust + (t.trust ?? 0)), e.affection.albina = Pl(e.affection.albina + (t.affection ?? 0)), e.danger = Pl(e.danger + (t.danger ?? 0)), e.artResonance = Pl(e.artResonance + (t.artResonance ?? 0)), t.flag && (e.flags[t.flag] = !0), "unlockCg" in t && t.unlockCg && !e.unlockedCg.includes(t.unlockCg) && e.unlockedCg.push(t.unlockCg), Ul(e, t.professionXp);
}
function Gl(e, t) {
	e.timeline.unshift({
		id: Fl("timeline_progression"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: t,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80);
}
function Kl(e, t, n, r) {
	let i = {
		id: Fl("progression_event"),
		route: e.route,
		sceneId: e.sceneId,
		title: t,
		detail: n,
		status: "queued",
		pressure: Pl(r + e.danger * .16),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeEvents.unshift(i), e.routeEvents = e.routeEvents.slice(0, 40), i;
}
function ql(e) {
	let t = e.updatedAt || (/* @__PURE__ */ new Date()).toISOString(), n = Cl().length, r = e.resolvedSceneBranchIds?.length ?? 0;
	return [
		{
			id: "manifest_title_index",
			tier: "bridge_lore",
			status: "indexed",
			title: "原著标题索引",
			scope: "全 manifest 标题覆盖",
			coverage: wl,
			total: wl,
			detail: "2142 个标题已纳入可触发索引；该数字不等于完整剧情复刻。",
			anchorIds: ["worldbook_manifest_coverage"],
			linkedSceneIds: [],
			updatedAt: t
		},
		{
			id: "deep_lore_layer",
			tier: "verified_lore",
			status: "expanded",
			title: "深写适配层",
			scope: "P0/P1/P2/P3 手写或较深适配条目",
			coverage: Tl,
			total: wl,
			detail: "当前深写层覆盖 260 个标题；剩余标题通过桥接提示参与叙事。",
			anchorIds: ["p0_p3_worldbooks"],
			linkedSceneIds: [],
			updatedAt: t
		},
		{
			id: "p4_bridge_lore",
			tier: "bridge_lore",
			status: "bridge",
			title: "四阶桥接层（P4 桥接层）",
			scope: "冷门术语与低频条目的 RP 锚点",
			coverage: El,
			total: El,
			detail: "桥接层用于保证触发时不脱离世界观，但仍需后续逐批深写。",
			anchorIds: ["p4_manifest_bridge"],
			linkedSceneIds: [],
			updatedAt: t
		},
		{
			id: "p4_expanded_bridge_lore",
			tier: "bridge_lore",
			status: "expanded",
			title: "四阶扩写桥接层（P4 扩写）",
			scope: "全量四阶（P4）提示改写为更密集的 RP 锚点",
			coverage: Dl,
			total: El,
			detail: "1882 个四阶（P4）条目已全部从标题分类和 manifest 元数据扩写为更可用的桥接提示；它们提升路线可用性，但仍不是源文章级复述或完整剧情复原。",
			anchorIds: ["p4_expanded_bridge_report"],
			linkedSceneIds: [],
			updatedAt: t
		},
		{
			id: "frontend_scene_runtime",
			tier: "frontend_scene",
			status: "playable",
			title: "前端可玩场景链",
			scope: "Galgame 硬编码场景",
			coverage: n,
			total: 15,
			detail: `当前硬编码场景 ${n} 个；场景分支系统补足长线推进，v1.0.10 增加开场草案与故事日志层。`,
			anchorIds: ["scenes_ts"],
			linkedSceneIds: Cl().map((e) => e.sceneId),
			updatedAt: t
		},
		{
			id: "route_quest_runtime",
			tier: "route_quest",
			status: "playable",
			title: "路线任务链",
			scope: "三路线地图与任务节点",
			coverage: Ol,
			total: Ol,
			detail: "三条路线各 5 个任务节点，可驱动解锁、整备、战术和剧情分支。",
			anchorIds: ["quest_engine"],
			linkedSceneIds: [],
			updatedAt: t
		},
		{
			id: "scene_branch_runtime",
			tier: "frontend_scene",
			status: r > 0 ? "playable" : "indexed",
			title: "场景分支编排",
			scope: "任务/战术/现实覆盖驱动的分支事件",
			coverage: r,
			total: Nl.length,
			detail: "分支系统把长线任务结果转为可回放的剧情节点。",
			anchorIds: Nl.map((e) => e.id),
			linkedSceneIds: [],
			updatedAt: t
		}
	];
}
function Jl(e, t) {
	return e.length === t.length ? t.some((t, n) => {
		let r = e[n];
		return !r || r.id !== t.id || r.status !== t.status || r.coverage !== t.coverage || r.total !== t.total || r.detail !== t.detail || r.anchorIds.join("|") !== t.anchorIds.join("|") || r.linkedSceneIds.join("|") !== t.linkedSceneIds.join("|");
	}) : !0;
}
function Yl(e) {
	let t = Cl().length;
	return {
		manifestTitles: wl,
		indexedTitles: wl,
		deepLoreTitles: Tl,
		bridgeTitles: El,
		expandedBridgeTitles: Dl,
		frontendScenes: t,
		routeQuestNodes: Ol,
		fullPlotRestored: !1,
		status: `已完成全标题索引；尚未完成全量深写剧情复原。当前 ${t} 个硬场景、${Nl.length} 个分支事件、${Tl} 个深写/源检标题、${El} 个四阶（P4）桥接标题，其中 ${Dl} 个已扩写为更密集的桥接提示。`
	};
}
function Xl(e) {
	Array.isArray(e.unlockedAchievementIds) || (e.unlockedAchievementIds = []), Array.isArray(e.achievementLog) || (e.achievementLog = []), Array.isArray(e.realityOverlayIds) || (e.realityOverlayIds = []), Array.isArray(e.resolvedRealityOverlayIds) || (e.resolvedRealityOverlayIds = []), Array.isArray(e.realityOverlayLog) || (e.realityOverlayLog = []), Array.isArray(e.resolvedSceneBranchIds) || (e.resolvedSceneBranchIds = []), Array.isArray(e.sceneBranchLog) || (e.sceneBranchLog = []), Array.isArray(e.narrativeIndex) || (e.narrativeIndex = []), Vl(e), (!e.activeProfessionId || !Al.some((t) => t.id === e.activeProfessionId && t.condition(e))) && (e.activeProfessionId = "");
	for (let t of Ml) t.condition(e) && !e.realityOverlayIds.includes(t.id) && e.realityOverlayIds.push(t.id);
	let t = ql(e);
	return Jl(e.narrativeIndex, t) && (e.narrativeIndex = t), e;
}
function Zl(e) {
	return Xl(e), jl.map((t) => {
		let n = e.unlockedAchievementIds.includes(t.id), r = t.condition(e);
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			requirement: t.requirement,
			status: n ? "unlocked" : "locked",
			reward: t.reward,
			lockedReason: n || r ? void 0 : t.requirement
		};
	});
}
function Ql(e, t = "system", n = !1) {
	Xl(e);
	let r = [];
	for (let i of jl) {
		if (e.unlockedAchievementIds.includes(i.id) || !i.condition(e)) continue;
		e.unlockedAchievementIds.push(i.id), Wl(e, i.reward);
		let a = `${i.label} 已解锁：${i.detail}`;
		if (n) {
			let n = {
				id: Fl("achievement"),
				route: e.route,
				sceneId: e.sceneId,
				achievementId: i.id,
				label: i.label,
				result: `${a} 触发：${t}`,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			e.achievementLog.unshift(n), e.achievementLog = e.achievementLog.slice(0, 80), r.push(n), Gl(e, `成就：${i.label}`);
		}
	}
	return r;
}
function $l(e) {
	return Xl(e), Al.map((t) => {
		let n = e.professionProgress[t.id], r = t.condition(e);
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			status: e.activeProfessionId === t.id ? "active" : r ? "available" : "locked",
			level: n.level,
			xp: n.xp,
			nextLevelXp: Rl(n.level),
			modifier: t.modifier(n.level),
			lockedReason: r ? void 0 : t.unlockHint
		};
	});
}
function eu(e) {
	return Xl(e), $l(e).find((t) => t.id === e.activeProfessionId)?.modifier ?? {};
}
function tu(e, t) {
	Xl(e);
	let n = $l(e).find((e) => e.id === t);
	return n ? n.status === "locked" ? {
		ok: !1,
		id: t,
		result: n.lockedReason ?? "职业化路线尚未解锁。"
	} : (e.activeProfessionId = t, e.professionProgress[t].selectedAt = (/* @__PURE__ */ new Date()).toISOString(), Gl(e, `职业切换：${n.label}`), {
		ok: !0,
		id: t,
		result: `已切换为${n.label}。${n.detail}`
	}) : {
		ok: !1,
		id: t,
		result: "未找到该职业化路线。"
	};
}
function nu(e) {
	return Xl(e), Ml.map((t) => {
		let n = t.condition(e), r = e.resolvedRealityOverlayIds.includes(t.id);
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			directive: t.directive,
			intensity: t.intensity,
			status: r ? "resolved" : n ? "active" : "locked",
			lockedReason: n ? void 0 : "需要进入对应路线或完成前置节点。"
		};
	});
}
function ru(e, t) {
	Xl(e);
	let n = Ml.find((e) => e.id === t), r = nu(e).find((e) => e.id === t);
	if (!n || !r) return {
		ok: !1,
		id: t,
		result: "未找到现实覆盖。"
	};
	if (r.status === "locked") return {
		ok: !1,
		id: t,
		result: r.lockedReason ?? "现实覆盖尚未激活。"
	};
	e.resolvedRealityOverlayIds.includes(t) || e.resolvedRealityOverlayIds.push(t), Wl(e, n.reward);
	let i = `${n.label} 已确认：${n.directive}`, a = {
		id: Fl("reality_overlay"),
		route: e.route,
		sceneId: e.sceneId,
		overlayId: t,
		label: n.label,
		result: i,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.realityOverlayLog.unshift(a), e.realityOverlayLog = e.realityOverlayLog.slice(0, 60), Gl(e, `现实覆盖：${n.label}`), {
		ok: !0,
		id: t,
		result: i
	};
}
function iu(e) {
	return Xl(e), Nl.filter((t) => t.route === e.route).map((t) => {
		let n = e.resolvedSceneBranchIds.includes(t.id), r = t.condition(e);
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			chapter: t.chapter,
			requirement: t.requirement,
			status: n ? "resolved" : r ? "available" : "locked",
			reward: t.reward,
			lockedReason: r ? void 0 : t.requirement
		};
	});
}
function au(e, t) {
	Xl(e);
	let n = Nl.find((n) => n.id === t && n.route === e.route), r = iu(e).find((e) => e.id === t);
	if (!n || !r) return {
		ok: !1,
		id: t,
		result: "未找到当前路线分支。"
	};
	if (r.status === "locked") return {
		ok: !1,
		id: t,
		result: r.lockedReason ?? "分支尚未解锁。"
	};
	e.resolvedSceneBranchIds.includes(t) || e.resolvedSceneBranchIds.push(t), Wl(e, n.reward);
	let i = Kl(e, n.label, n.result, 18 + n.chapter * 4), a = {
		id: Fl("scene_branch"),
		route: e.route,
		sceneId: e.sceneId,
		branchId: t,
		label: n.label,
		result: `${n.result} 事件：${i.id}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.sceneBranchLog.unshift(a), e.sceneBranchLog = e.sceneBranchLog.slice(0, 80), e.dynamicMemories.unshift({
		id: Fl("memory_branch"),
		source: `branch:${t}`,
		content: n.result,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.dynamicMemories = e.dynamicMemories.slice(0, 80), e.narrativeIndex = ql(e), Gl(e, `剧情分支：${n.label}`), {
		ok: !0,
		id: t,
		result: n.result
	};
}
//#endregion
//#region src/core/questEngine.ts
var ou = [
	{
		id: "white_rain_alley",
		route: "white_canvas",
		label: "雨巷回访",
		detail: "确认初遇后巷、破碎展柜与法西娅震动的共同记忆。",
		stage: 1,
		dangerLevel: 1
	},
	{
		id: "white_canvas_room",
		route: "white_canvas",
		label: "白色画室",
		detail: "把“材料”改写成“被尊重的对象”，建立创作边界。",
		stage: 2,
		dangerLevel: 2
	},
	{
		id: "white_boundary_table",
		route: "white_canvas",
		label: "边界桌",
		detail: "把同意、撤回、暂停写成双方都能引用的规则。",
		stage: 3,
		dangerLevel: 2
	},
	{
		id: "white_rooftop",
		route: "white_canvas",
		label: "雨后屋顶",
		detail: "让暗恋从试探进入可承认的关系。",
		stage: 4,
		dangerLevel: 3
	},
	{
		id: "white_final_gallery",
		route: "white_canvas",
		label: "终幕白厅",
		detail: "完成不切开任何人的第一幅画。",
		stage: 5,
		dangerLevel: 3
	},
	{
		id: "golden_lce_lab",
		route: "golden_bough_rebuild",
		label: "LCE（边狱应急处置）实验室",
		detail: "确认金枝、义体与阿尔比娜记忆断层的初始损伤。",
		stage: 1,
		dangerLevel: 3
	},
	{
		id: "golden_fascia_corridor",
		route: "golden_bough_rebuild",
		label: "法西娅回廊",
		detail: "沿着巨剑内侧的心跳声寻找残留称谓。",
		stage: 2,
		dangerLevel: 3
	},
	{
		id: "golden_memory_theater",
		route: "golden_bough_rebuild",
		label: "记忆剧场",
		detail: "把破碎片段重新排序，避免叙事随意抹除人称。",
		stage: 3,
		dangerLevel: 4
	},
	{
		id: "golden_bough_chamber",
		route: "golden_bough_rebuild",
		label: "金枝腔室",
		detail: "在重构核心前建立风险缓冲与撤回路径。",
		stage: 4,
		dangerLevel: 4
	},
	{
		id: "golden_rebuild_dawn",
		route: "golden_bough_rebuild",
		label: "重构黎明",
		detail: "让修复结果成为可持续的新身体叙事。",
		stage: 5,
		dangerLevel: 5
	},
	{
		id: "ring_invitation_hall",
		route: "ring_conspiracy",
		label: "环指邀请厅",
		detail: "接受邀请但不交出主动权，确认第一份边界条款。",
		stage: 1,
		dangerLevel: 4
	},
	{
		id: "ring_spider_gallery",
		route: "ring_conspiracy",
		label: "蜘蛛巢画廊",
		detail: "侦察敌对画廊、收集筹码，并标记可反制的委托。",
		stage: 2,
		dangerLevel: 5
	},
	{
		id: "ring_contract_room",
		route: "ring_conspiracy",
		label: "契约反写室",
		detail: "把危险委托的一部分条件转写为玩家可触发的制衡。",
		stage: 3,
		dangerLevel: 5
	},
	{
		id: "ring_pursuit_alley",
		route: "ring_conspiracy",
		label: "追击后巷",
		detail: "在暴露上升后夺回节奏，保留撤离路线。",
		stage: 4,
		dangerLevel: 6
	},
	{
		id: "ring_maestro_shadow",
		route: "ring_conspiracy",
		label: "首席阴影",
		detail: "面对更高位的艺术命令，判断共谋是否还能自愿。",
		stage: 5,
		dangerLevel: 7
	}
], su = [
	{
		id: "white_retrace_rain",
		route: "white_canvas",
		mapNodeId: "white_rain_alley",
		title: "回访雨夜展柜",
		detail: "重走初遇后巷，确认她看向你的方式不再只是材料评估。",
		stage: 1,
		cost: { composure: 4 },
		reward: {
			materials: 1,
			trust: 1,
			artResonance: 1,
			flag: "quest_white_retrace_rain"
		},
		eventTitle: "雨夜展柜被确认",
		eventDetail: "白色画布路线获得第一段可持续的共同记忆。",
		eventPressure: 14
	},
	{
		id: "white_prepare_canvas",
		route: "white_canvas",
		mapNodeId: "white_canvas_room",
		title: "准备无创画布",
		detail: "消耗材料准备画布、灯位与撤回手势，拒绝把亲密推进写成伤害。",
		stage: 2,
		cost: { materials: 1 },
		reward: {
			trust: 1,
			artResonance: 3,
			unlockCg: "white_canvas_choice",
			flag: "quest_white_prepare_canvas"
		},
		eventTitle: "无创画布完成",
		eventDetail: "阿尔比娜承认画布可以不通过切开来完成。",
		eventPressure: 16,
		requiresQuest: "white_retrace_rain"
	},
	{
		id: "white_boundary_contract",
		route: "white_canvas",
		mapNodeId: "white_boundary_table",
		title: "签下边界桌规则",
		detail: "把同意、暂停与撤回写成不可由叙事改写的状态，阻断失能式推进。",
		stage: 3,
		cost: { composure: 6 },
		reward: {
			trust: 3,
			danger: -2,
			leverage: 1,
			flag: "quest_white_boundary_contract"
		},
		eventTitle: "边界桌规则生效",
		eventDetail: "后续亲密叙事必须承认双方可随时暂停。",
		eventPressure: 12,
		requiresQuest: "white_prepare_canvas"
	},
	{
		id: "white_rooftop_confession",
		route: "white_canvas",
		mapNodeId: "white_rooftop",
		title: "雨后屋顶告白",
		detail: "在屋顶让她把“想留下你”说成关系，而不是收藏。",
		stage: 4,
		cost: { composure: 8 },
		reward: {
			affection: 3,
			trust: 2,
			artResonance: 2,
			unlockCg: "rain_confession",
			flag: "quest_white_rooftop_confession"
		},
		eventTitle: "雨后告白锚定",
		eventDetail: "白色画布路线进入明确恋爱推进。",
		eventPressure: 18,
		requiresQuest: "white_boundary_contract"
	},
	{
		id: "white_complete_first_canvas",
		route: "white_canvas",
		mapNodeId: "white_final_gallery",
		title: "完成第一幅白画",
		detail: "用材料与信任完成不伤害任何人的终幕画面。",
		stage: 5,
		cost: {
			materials: 2,
			composure: 6
		},
		reward: {
			affection: 3,
			trust: 3,
			artResonance: 5,
			unlockCg: "white_canvas_ending",
			flag: "quest_white_complete"
		},
		eventTitle: "白色画布终幕完成",
		eventDetail: "阿尔比娜第一次把完成作品与保全你视为同一件事。",
		eventPressure: 20,
		requiresQuest: "white_rooftop_confession"
	},
	{
		id: "golden_scan_bough",
		route: "golden_bough_rebuild",
		mapNodeId: "golden_lce_lab",
		title: "扫描金枝裂隙",
		detail: "记录金枝异常和义体损伤的交界，锁定可修复区域。",
		stage: 1,
		cost: { composure: 5 },
		reward: {
			materials: 1,
			trust: 1,
			artResonance: 2,
			unlockCg: "golden_bough_rebuild",
			flag: "quest_golden_scan_bough"
		},
		eventTitle: "金枝裂隙被标记",
		eventDetail: "重构路线获得第一份手术前地图。",
		eventPressure: 24
	},
	{
		id: "golden_trace_fascia",
		route: "golden_bough_rebuild",
		mapNodeId: "golden_fascia_corridor",
		title: "追踪法西娅心跳",
		detail: "沿着巨剑回廊确认法西娅不是工具，而是需要被安抚的身体延伸。",
		stage: 2,
		cost: {
			materials: 2,
			composure: 3
		},
		reward: {
			trust: 1,
			artResonance: 5,
			unlockCg: "fascia_heartbeat",
			flag: "quest_golden_trace_fascia"
		},
		eventTitle: "法西娅心跳稳定",
		eventDetail: "巨剑残响成为后续记忆重构的安全节拍。",
		eventPressure: 22,
		requiresQuest: "golden_scan_bough"
	},
	{
		id: "golden_restore_pronouns",
		route: "golden_bough_rebuild",
		mapNodeId: "golden_memory_theater",
		title: "恢复称谓顺序",
		detail: "把“我、你、她、法西娅”的称谓重新排序，防止人格被叙事压扁。",
		stage: 3,
		cost: {
			materials: 3,
			composure: 5
		},
		reward: {
			trust: 2,
			artResonance: 6,
			danger: -1,
			unlockCg: "surgery_of_memory",
			flag: "quest_golden_restore_pronouns"
		},
		eventTitle: "称谓顺序恢复",
		eventDetail: "金枝重构路线获得稳定的人称锚点。",
		eventPressure: 26,
		requiresQuest: "golden_trace_fascia"
	},
	{
		id: "golden_buffer_chamber",
		route: "golden_bough_rebuild",
		mapNodeId: "golden_bough_chamber",
		title: "建立重构缓冲",
		detail: "消耗筹码和冷静搭建失败缓冲，降低金枝反噬。",
		stage: 4,
		cost: {
			materials: 3,
			composure: 4
		},
		reward: {
			artResonance: 4,
			danger: -5,
			trust: 1,
			flag: "quest_golden_buffer_chamber"
		},
		eventTitle: "重构缓冲建立",
		eventDetail: "金枝腔室的失败后果被前端状态压低。",
		eventPressure: 28,
		requiresQuest: "golden_restore_pronouns"
	},
	{
		id: "golden_rebuild_dawn",
		route: "golden_bough_rebuild",
		mapNodeId: "golden_rebuild_dawn",
		title: "迎接重构黎明",
		detail: "完成身体、法西娅与记忆的三方同步。",
		stage: 5,
		cost: {
			materials: 4,
			composure: 4
		},
		reward: {
			affection: 2,
			trust: 3,
			artResonance: 8,
			unlockCg: "golden_bough_ending",
			flag: "quest_golden_complete"
		},
		eventTitle: "金枝重构终幕完成",
		eventDetail: "阿尔比娜获得一个不必抛弃旧伤的新身体叙事。",
		eventPressure: 32,
		requiresQuest: "golden_buffer_chamber"
	},
	{
		id: "ring_accept_terms",
		route: "ring_conspiracy",
		mapNodeId: "ring_invitation_hall",
		title: "接受邀请但保留条款",
		detail: "进入环指邀请厅，同时把自愿边界写入第一份委托。",
		stage: 1,
		cost: { composure: 5 },
		reward: {
			leverage: 2,
			artResonance: 2,
			danger: 1,
			unlockCg: "ring_invitation",
			flag: "quest_ring_accept_terms"
		},
		eventTitle: "邀请条款被保留",
		eventDetail: "环指共谋路线获得第一份可反制委托文本。",
		eventPressure: 30
	},
	{
		id: "ring_gallery_recon",
		route: "ring_conspiracy",
		mapNodeId: "ring_spider_gallery",
		title: "完成蜘蛛巢侦察",
		detail: "用短期暴露换取画廊结构、敌对筹码与撤离路径。",
		stage: 2,
		cost: {
			leverage: 1,
			composure: 4
		},
		reward: {
			leverage: 6,
			materials: 1,
			danger: 4,
			unlockCg: "first_gallery",
			flag: "quest_ring_gallery_recon"
		},
		eventTitle: "蜘蛛巢地图完成",
		eventDetail: "敌对画廊的结构与薄弱点进入长期事实记录。",
		eventPressure: 36,
		requiresQuest: "ring_accept_terms"
	},
	{
		id: "ring_counter_contract",
		route: "ring_conspiracy",
		mapNodeId: "ring_contract_room",
		title: "反写契约核心",
		detail: "消耗筹码把敌对委托转为可谈判条款。",
		stage: 3,
		cost: { leverage: 4 },
		reward: {
			trust: 2,
			danger: -5,
			artResonance: 2,
			unlockCg: "conspiracy_contract",
			flag: "quest_ring_counter_contract"
		},
		eventTitle: "契约核心被反写",
		eventDetail: "共谋关系第一次拥有玩家可触发的制衡。",
		eventPressure: 34,
		requiresQuest: "ring_gallery_recon"
	},
	{
		id: "ring_pursuit_escape",
		route: "ring_conspiracy",
		mapNodeId: "ring_pursuit_alley",
		title: "夺回追击节奏",
		detail: "在暴露上升后切换撤离路线，避免被首席阴影提前锁死。",
		stage: 4,
		cost: {
			leverage: 4,
			composure: 5
		},
		reward: {
			leverage: 3,
			danger: 3,
			unlockCg: "backstreet_pursuit",
			flag: "quest_ring_pursuit_escape"
		},
		eventTitle: "追击节奏被夺回",
		eventDetail: "环指共谋路线获得一次可回放的撤离锚点。",
		eventPressure: 38,
		requiresQuest: "ring_counter_contract"
	},
	{
		id: "ring_face_maestro",
		route: "ring_conspiracy",
		mapNodeId: "ring_maestro_shadow",
		title: "面对首席阴影",
		detail: "判断共谋是否仍能自愿，并把最终条款钉进日志。",
		stage: 5,
		cost: {
			leverage: 8,
			composure: 4
		},
		reward: {
			trust: 4,
			affection: 1,
			leverage: 3,
			danger: 2,
			artResonance: 3,
			unlockCg: "ring_conspiracy_ending",
			flag: "quest_ring_complete"
		},
		eventTitle: "环指共谋终幕完成",
		eventDetail: "敌对共谋不再只是危险推进，而成为有制衡的双人策略。",
		eventPressure: 42,
		requiresQuest: "ring_pursuit_escape"
	}
];
function cu(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function lu(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function uu(e, t) {
	return e.completedQuestNodeIds.includes(t);
}
function du(e) {
	return ou.filter((t) => t.route === e).sort((e, t) => e.stage - t.stage);
}
function fu(e) {
	return su.filter((t) => t.route === e).sort((e, t) => e.stage - t.stage);
}
function pu(e, t) {
	return e.routeEconomy.composure >= (t.composure ?? 0) && e.routeEconomy.materials >= (t.materials ?? 0) && e.routeEconomy.leverage >= (t.leverage ?? 0);
}
function mu(e, t) {
	e.routeEconomy.composure = cu(e.routeEconomy.composure - (t.composure ?? 0)), e.routeEconomy.materials = cu(e.routeEconomy.materials - (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = cu(e.routeEconomy.leverage - (t.leverage ?? 0));
}
function hu(e, t) {
	e.routeEconomy.composure = cu(e.routeEconomy.composure + (t.composure ?? 0)), e.routeEconomy.materials = cu(e.routeEconomy.materials + (t.materials ?? 0), 0, 12), e.routeEconomy.leverage = cu(e.routeEconomy.leverage + (t.leverage ?? 0)), e.danger = cu(e.danger + (t.danger ?? 0)), e.trust = cu(e.trust + (t.trust ?? 0)), e.affection.albina = cu(e.affection.albina + (t.affection ?? 0)), e.artResonance = cu(e.artResonance + (t.artResonance ?? 0)), t.flag && (e.flags[t.flag] = !0), t.unlockCg && !e.unlockedCg.includes(t.unlockCg) && e.unlockedCg.push(t.unlockCg);
}
function gu(e, t) {
	if (t.requiresQuest && !uu(e, t.requiresQuest)) return "需要先完成前置任务";
	if (t.requiresFlag && e.flags[t.requiresFlag] !== !0) return "需要先取得路线记录";
}
function _u(e, t) {
	let n = gu(e, t);
	if (n) return n;
	if (!pu(e, t.cost)) return "资源不足";
}
function vu(e, t) {
	return su.filter((e) => e.mapNodeId === t).some((t) => !gu(e, t) || uu(e, t.id));
}
function yu(e, t) {
	let n = su.filter((e) => e.mapNodeId === t);
	return n.length > 0 && n.every((t) => uu(e, t.id));
}
function bu(e) {
	return du(e.route).find((t) => vu(e, t.id))?.id ?? du(e.route)[0]?.id ?? "";
}
function xu(e, t) {
	let n = {
		id: lu("quest_event"),
		route: e.route,
		sceneId: e.sceneId,
		title: t.eventTitle,
		detail: t.eventDetail,
		status: "queued",
		pressure: cu(t.eventPressure + e.danger * .2),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.routeEvents.unshift(n), e.routeEvents = e.routeEvents.slice(0, 40), n;
}
function Su(e) {
	Array.isArray(e.completedQuestNodeIds) || (e.completedQuestNodeIds = []), Array.isArray(e.questProgressLog) || (e.questProgressLog = []), Array.isArray(e.routeEvents) || (e.routeEvents = []), Array.isArray(e.timeline) || (e.timeline = []);
	let t = new Set(du(e.route).map((e) => e.id));
	return (!e.currentMapNodeId || !t.has(e.currentMapNodeId)) && (e.currentMapNodeId = bu(e)), e.currentMapNodeId && !vu(e, e.currentMapNodeId) && (e.currentMapNodeId = bu(e)), e.completedQuestNodeIds = Array.from(new Set(e.completedQuestNodeIds.filter((e) => su.some((t) => t.id === e)))), e;
}
function Cu(e) {
	return Su(e), du(e.route).map((t) => {
		let n = yu(e, t.id), r = vu(e, t.id), i = n ? "completed" : e.currentMapNodeId === t.id && r ? "active" : r ? "available" : "locked";
		return {
			id: t.id,
			route: t.route,
			label: t.label,
			detail: t.detail,
			stage: t.stage,
			dangerLevel: t.dangerLevel,
			status: i
		};
	});
}
function wu(e) {
	return Su(e), Xs(e), fu(e.route).map((t) => {
		let n = uu(e, t.id), r = vu(e, t.mapNodeId), i = _u(e, t), a = n ? void 0 : r ? i : "地图节点未解锁";
		return {
			id: t.id,
			route: t.route,
			mapNodeId: t.mapNodeId,
			title: t.title,
			detail: t.detail,
			stage: t.stage,
			cost: t.cost,
			reward: t.reward,
			status: n ? "completed" : a ? "locked" : "available",
			lockedReason: a
		};
	});
}
function Tu(e, t) {
	Su(e);
	let n = du(e.route).find((e) => e.id === t);
	return n ? vu(e, t) ? (e.currentMapNodeId = t, e.timeline.unshift({
		id: lu("timeline_map"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "memory",
		summary: `地图：${n.label}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		questNodeId: t,
		result: `已切换地图节点：${n.label}`
	}) : {
		ok: !1,
		questNodeId: t,
		result: "地图节点尚未解锁。"
	} : {
		ok: !1,
		questNodeId: t,
		result: "未找到当前路线地图节点。"
	};
}
function Eu(e, t) {
	Su(e), Xs(e), Hs(e);
	let n = fu(e.route).find((e) => e.id === t);
	if (!n) return {
		ok: !1,
		questNodeId: t,
		result: "未找到当前路线任务。"
	};
	if (uu(e, n.id)) return {
		ok: !1,
		questNodeId: t,
		result: "任务已经完成。"
	};
	let r = wu(e).find((e) => e.id === t);
	if (!r || r.status !== "available") return {
		ok: !1,
		questNodeId: t,
		result: r?.lockedReason ?? "任务不可执行。"
	};
	e.currentMapNodeId = n.mapNodeId, mu(e, n.cost), hu(e, n.reward), e.completedQuestNodeIds.includes(n.id) || e.completedQuestNodeIds.push(n.id);
	let i = xu(e, n);
	Xs(e), Hs(e);
	let a = `${n.title}：${n.eventDetail}`, o = {
		id: lu("quest_log"),
		route: e.route,
		sceneId: e.sceneId,
		mapNodeId: n.mapNodeId,
		questNodeId: n.id,
		eventId: i.id,
		title: n.title,
		result: a,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.questProgressLog.unshift(o), e.questProgressLog = e.questProgressLog.slice(0, 80), e.timeline.unshift({
		id: lu("timeline_quest_node"),
		route: e.route,
		sceneId: e.sceneId,
		kind: "objective",
		summary: `任务：${n.title}`,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}), e.timeline = e.timeline.slice(0, 80), {
		ok: !0,
		questNodeId: t,
		result: a
	};
}
//#endregion
//#region src/core/routeEngine.ts
var Du = {
	white_canvas: "白色画布",
	golden_bough_rebuild: "金枝重构",
	ring_conspiracy: "环指共谋"
}, Ou = [
	{
		id: "white_canvas_enter",
		route: "white_canvas",
		title: "进入白色画布",
		detail: "确认与阿尔比娜建立最初的共同创作关系。",
		metric: "route_entry",
		target: 1
	},
	{
		id: "white_canvas_trust",
		route: "white_canvas",
		title: "建立可撤回的信任",
		detail: "在明确边界的前提下，将信任提升至 35。",
		metric: "trust",
		target: 35
	},
	{
		id: "white_canvas_resonance",
		route: "white_canvas",
		title: "稳定艺术共鸣",
		detail: "通过完整选择将艺术共鸣提升至 40。",
		metric: "artResonance",
		target: 40
	},
	{
		id: "golden_bough_enter",
		route: "golden_bough_rebuild",
		title: "进入金枝重构",
		detail: "追踪金枝异常并确认记忆手术的入口。",
		metric: "route_entry",
		target: 1
	},
	{
		id: "golden_bough_anchor",
		route: "golden_bough_rebuild",
		title: "巩固记忆锚点",
		detail: "将信任提升至 45，避免重构过程中出现认知漂移。",
		metric: "trust",
		target: 45
	},
	{
		id: "golden_bough_resonance",
		route: "golden_bough_rebuild",
		title: "完成重构共振",
		detail: "将艺术共鸣提升至 55，建立稳定的回路。",
		metric: "artResonance",
		target: 55
	},
	{
		id: "ring_conspiracy_enter",
		route: "ring_conspiracy",
		title: "进入环指共谋",
		detail: "接受危险委托，并保留自己的谈判条件。",
		metric: "route_entry",
		target: 1
	},
	{
		id: "ring_conspiracy_survive",
		route: "ring_conspiracy",
		title: "完成三次关键决策",
		detail: "在风险累积前完成至少三次有记录的选择。",
		metric: "choice_count",
		target: 3
	},
	{
		id: "ring_conspiracy_trust",
		route: "ring_conspiracy",
		title: "维持共谋信任",
		detail: "在危险路线中将信任提升至 30。",
		metric: "trust",
		target: 30
	}
];
function ku(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Au(e) {
	return Object.entries(e.flags).filter(([e, t]) => e.startsWith("choice_") && t === !0).length;
}
function ju(e, t) {
	return t.metric === "route_entry" ? +(e.route === t.route) : t.metric === "trust" ? e.trust : t.metric === "artResonance" ? e.artResonance : t.metric === "affection" ? e.affection.albina : Au(e);
}
function Mu(e, t) {
	return {
		id: e.id,
		route: e.route,
		title: e.title,
		detail: e.detail,
		status: "active",
		progress: 0,
		target: e.target,
		updatedAt: t
	};
}
function Nu(e, t, n) {
	let r = {
		id: ku(`timeline_${t}`),
		route: e.route,
		sceneId: e.sceneId,
		kind: t,
		summary: n,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.timeline.unshift(r), e.timeline = e.timeline.slice(0, 80), r;
}
function Pu(e, t, n, r) {
	let i = {
		id: ku(`consequence_${t}`),
		route: e.route,
		sceneId: e.sceneId,
		level: t,
		title: n,
		detail: r,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return e.consequences.unshift(i), e.consequences = e.consequences.slice(0, 32), Nu(e, "consequence", `${n}：${r}`), i;
}
function Fu(e, t) {
	let n = [], r = new Map(Ou.map((e) => [e.id, e]));
	for (let i of e.routeObjectives) {
		let a = r.get(i.id);
		if (!a) continue;
		let o = Math.min(a.target, ju(e, a)), s = o >= a.target ? "completed" : "active";
		if ((i.status !== s || i.progress !== o) && (i.progress = o, i.status = s, i.updatedAt = (/* @__PURE__ */ new Date()).toISOString()), s === "completed") {
			let r = `目标完成：${i.title}`;
			e.timeline.some((e) => e.kind === "objective" && e.summary === r) || (n.push(i), t && Nu(e, "objective", r));
		}
	}
	return n;
}
function Iu(e) {
	Array.isArray(e.routeObjectives) || (e.routeObjectives = []), Array.isArray(e.consequences) || (e.consequences = []), Array.isArray(e.timeline) || (e.timeline = []);
	let t = new Set(e.routeObjectives.map((e) => e.id)), n = (/* @__PURE__ */ new Date()).toISOString();
	for (let r of Ou) t.has(r.id) || e.routeObjectives.push(Mu(r, n));
	return Fu(e, !1), e;
}
function Lu(e, t) {
	Iu(e), Nu(e, "choice", `选择：${t.choiceId}`);
	let n = Fu(e, !0), r = [];
	return t.previousRoute !== e.route && r.push(Pu(e, "notice", `路线切换：${Du[e.route]}`, `已从${Du[t.previousRoute]}转入${Du[e.route]}。`)), t.previousDanger < 45 && e.danger >= 45 && r.push(Pu(e, "warning", "风险阈值升高", "危险值已达到 45，后续选择将更容易触发敌对反馈。")), t.previousDanger < 70 && e.danger >= 70 && r.push(Pu(e, "critical", "风险进入临界区", "危险值已达到 70，需要优先降低暴露程度。")), t.previousTrust < 50 && e.trust >= 50 && r.push(Pu(e, "notice", "信任关系稳定", "信任值已达到 50，可承载更深层的记忆锚定。")), {
		completedObjectives: n,
		consequences: r
	};
}
//#endregion
//#region src/core/storyLogEngine.ts
var Ru = {
	white_canvas: {
		title: "白色画布开场",
		focus: "雨巷、白画布、阿尔比娜的礼貌压迫感，以及玩家是否允许她把身体边界纳入构图。",
		conflict: "信任必须先于亲密，任何推进都由玩家确认。"
	},
	golden_bough_rebuild: {
		title: "金枝重构开场",
		focus: "金枝残光、修复仪式、记忆缺口，以及阿尔比娜把温柔当作手术刀使用的方式。",
		conflict: "修复不是赦免，玩家需要选择保留哪一段疼痛。"
	},
	ring_conspiracy: {
		title: "环指共谋开场",
		focus: "环指契约、伪造展厅、监视视线，以及阿尔比娜邀请玩家共同反写条款。",
		conflict: "契约可以被篡改，但代价会进入长期日志。"
	}
};
function zu() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function Bu(e) {
	return `${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function Vu(e) {
	e.openingDrafts.length > 12 && (e.openingDrafts = e.openingDrafts.slice(0, 12)), e.storyLog.length > 160 && (e.storyLog = e.storyLog.slice(0, 160)), e.storyLogSummaries.length > 24 && (e.storyLogSummaries = e.storyLogSummaries.slice(0, 24));
}
function Hu(e) {
	return e === "golden_bough_rebuild" ? "金枝重构" : e === "ring_conspiracy" ? "环指共谋" : "白色画布";
}
function Uu(e) {
	return Array.isArray(e.openingDrafts) || (e.openingDrafts = []), typeof e.activeOpeningDraftId != "string" && (e.activeOpeningDraftId = ""), Array.isArray(e.storyLog) || (e.storyLog = []), Array.isArray(e.storyLogSummaries) || (e.storyLogSummaries = []), e.activeOpeningDraftId && !e.openingDrafts.some((t) => t.id === e.activeOpeningDraftId) && (e.activeOpeningDraftId = ""), Vu(e), e;
}
function Wu(e) {
	return Uu(e), e.openingDrafts.filter((t) => t.route === e.route).slice(0, 6);
}
function Gu(e) {
	return Uu(e), e.openingDrafts.find((t) => t.id === e.activeOpeningDraftId);
}
function Ku(e) {
	let t = Ru[e.route];
	return [
		`雨声先落在${Hu(e.route)}的边界上。`,
		`她没有急着靠近。她把${e.playerProfile.addressName || e.playerProfile.name}的名字放进一句很轻的问候里，像是在确认一份仍可撤回的契约——今晚的每一笔，都可以由你叫停。她说她需要的不是答案，而是允许。`,
		`核心冲突：${t.conflict}`
	].join("\n\n");
}
function qu(e) {
	Uu(e);
	let t = Ru[e.route], n = Yl(e), r = [
		"只写中文自然叙事，不暴露系统、工具、文件名或提示词。",
		"尊重成年自愿与玩家边界；亲密推进必须等待玩家明确选择。",
		"不得改写状态权威：路线、数值、回忆图、战术结果、长期事实只能由玩家通过按钮或面板写入。",
		"保留 Project Moon 式都市压迫感、环指审美、阿尔比娜礼貌但病态专注的声线。",
		`当前叙事索引 ${n.indexedTitles}/${n.manifestTitles}，深写标题 ${n.deepLoreTitles}，四阶（P4）桥接标题 ${n.bridgeTitles}，其中扩写桥接 ${n.expandedBridgeTitles}；不能声称完整原著剧情已复原。`
	], i = [
		`[${ml}:opening_story_log]`,
		`[route:${e.route}]`,
		`[scene:${e.sceneId}]`,
		`[player:${e.playerProfile.name}]`,
		`[address:${e.playerProfile.addressName}]`,
		`[focus:${t.focus}]`,
		`[conflict:${t.conflict}]`,
		"",
		"为当前路线生成 3-5 段开场草案。草案需要可被玩家确认后写入故事日志。",
		"输出只包含正文，不要列规则。"
	].join("\n");
	return {
		id: Bu("opening_draft"),
		route: e.route,
		sceneId: e.sceneId,
		title: t.title,
		prompt: i,
		draftText: Ku(e),
		constraints: r,
		status: "drafted",
		createdAt: zu()
	};
}
function Ju(e, t) {
	return Uu(e), e.openingDrafts = [t, ...e.openingDrafts.filter((e) => e.id !== t.id)].slice(0, 12), e.activeOpeningDraftId = t.id, t;
}
function Yu(e, t, n, r, i, a = !1) {
	Uu(e);
	let o = {
		id: Bu("story_log"),
		route: e.route,
		sceneId: e.sceneId,
		kind: t,
		title: n,
		summary: r,
		source: i,
		important: a,
		createdAt: zu()
	};
	return e.storyLog.unshift(o), Vu(e), o;
}
function Xu(e, t) {
	Uu(e);
	let n = e.openingDrafts.find((e) => e.id === t);
	if (!n || n.status !== "drafted") return {
		ok: !1,
		result: "开场草案不存在或已处理。"
	};
	n.status = "confirmed", n.confirmedAt = zu(), e.activeOpeningDraftId = n.id;
	let r = Yu(e, "opening", `确认开场：${n.title}`, n.draftText, `opening:${n.id}`, !0);
	return e.flags[`opening_confirmed_${n.route}`] = !0, e.flags.opening_story_log_confirmed = !0, {
		ok: !0,
		result: `已确认开场草案并写入故事日志：${r.title}`,
		draft: n
	};
}
function Zu(e, t) {
	Uu(e);
	let n = e.openingDrafts.find((e) => e.id === t);
	return !n || n.status !== "drafted" ? {
		ok: !1,
		result: "只能归档尚未确认的开场草案。"
	} : (n.status = "archived", e.activeOpeningDraftId === n.id && (e.activeOpeningDraftId = ""), Yu(e, "opening", `归档开场草案：${n.title}`, "玩家拒绝当前开场草案，等待重新生成。", `opening_archive:${n.id}`), {
		ok: !0,
		result: "已归档当前开场草案。",
		draft: n
	});
}
function Qu(e) {
	return Uu(e), e.storyLog.filter((t) => t.route === e.route).slice(0, 18);
}
function $u(e) {
	return Uu(e), e.storyLogSummaries.filter((t) => t.route === e.route).slice(0, 6);
}
function ed(e) {
	Uu(e);
	let t = Qu(e).slice(0, 12);
	if (!t.length) return {
		ok: !1,
		result: "当前路线还没有可摘要的故事日志。"
	};
	let n = `${Hu(e.route)}故事摘要`, r = t.slice().reverse().map((e) => `- ${e.title}: ${e.summary}`).join("\n"), i = e.storyLogSummaries.find((t) => t.route === e.route), a = zu(), o = {
		id: i?.id ?? Bu("story_summary"),
		route: e.route,
		title: n,
		summary: r,
		entryIds: t.map((e) => e.id),
		createdAt: i?.createdAt ?? a,
		updatedAt: a
	};
	return e.storyLogSummaries = [o, ...e.storyLogSummaries.filter((e) => e.id !== o.id)].slice(0, 24), Yu(e, "summary", `生成摘要：${n}`, `已汇总 ${t.length} 条路线日志。`, `summary:${o.id}`), {
		ok: !0,
		result: `已生成 ${t.length} 条日志的路线摘要。`,
		summary: o
	};
}
function td() {
	let e = (/* @__PURE__ */ new Date()).toISOString(), t = xl("opening_001");
	return Uu(Xl(al(Oc(Su(oc(Xs(Hs(Iu({
		schemaVersion: 10,
		projectId: ml,
		saveId: `albina_${Date.now().toString(36)}`,
		createdAt: e,
		updatedAt: e,
		playerProfile: {
			name: "{{user}}",
			gender: "成年男性",
			appearance: "黑发，英俊，穿深色长外套，气质冷静而危险。",
			background: "暂未确认；可由玩家设定为收尾人、边狱公司协力者、环指潜入者或都市幸存者。",
			addressName: "{{user}}",
			boundaries: "成人自愿，亲密推进需要明确同意；允许黑暗都市暴力，但不允许强迫或失能式亲密。",
			routePreference: "white_canvas"
		},
		route: "white_canvas",
		chapter: t.chapter,
		sceneId: t.sceneId,
		locationId: t.locationId,
		scene: t,
		affection: { albina: 0 },
		trust: 0,
		danger: 0,
		artResonance: 0,
		flags: { met_albina: !0 },
		unlockedCg: ["opening_rain"],
		dynamicMemories: [],
		motionLevel: "extreme",
		bgmVolume: .6,
		seVolume: .8,
		history: [],
		routeObjectives: [],
		consequences: [],
		timeline: [],
		relationshipVectors: {
			intimacy: 0,
			reliance: 0,
			obsession: 0,
			suspicion: 0
		},
		routeEvents: [],
		replayAnchors: [],
		routeEconomy: {
			composure: 60,
			materials: 3,
			leverage: 0,
			exposure: 0
		},
		routeActionLog: [],
		routeActivityLog: [],
		completedQuestNodeIds: [],
		currentMapNodeId: "",
		questProgressLog: [],
		inventoryItemIds: [],
		equippedItemIds: {},
		wardrobeOutfitIds: [],
		activeWardrobeOutfitId: "",
		progressionUnlockLog: [],
		conflictMastery: {
			blade: 0,
			boundary: 0,
			analysis: 0,
			resonance: 0
		},
		clearedConflictIds: [],
		conflictResolutionLog: [],
		claimedExchangeIds: [],
		exchangeLog: [],
		resolvedContactIds: [],
		contactLog: [],
		watchSignals: [],
		unlockedAchievementIds: [],
		achievementLog: [],
		activeProfessionId: "",
		professionProgress: Ll(),
		realityOverlayIds: [],
		resolvedRealityOverlayIds: [],
		realityOverlayLog: [],
		resolvedSceneBranchIds: [],
		sceneBranchLog: [],
		narrativeIndex: [],
		openingDrafts: [],
		activeOpeningDraftId: "",
		storyLog: [],
		storyLogSummaries: [],
		worldbookMemory: {
			worldbookName: "",
			records: [],
			drafts: []
		}
	})))))))));
}
//#endregion
//#region src/core/worldbook.ts
function nd(e) {
	return JSON.stringify(e ?? "");
}
function rd(e) {
	return `${ml}_${e.saveId}`;
}
async function id(e) {
	let t = e.worldbookMemory.worldbookName || rd(e);
	try {
		typeof getOrCreateChatWorldbook == "function" && await getOrCreateChatWorldbook("current", t), typeof rebindChatWorldbook == "function" && await rebindChatWorldbook("current", t);
	} catch (e) {
		console.warn("[albina-worldbook] ensure failed", e);
	}
	return t;
}
function ad(e, t = "", n = "") {
	let r = e.scene.characters.map((e) => `[${ml}:character:${e.id}]\nchar_${e.id}\nsprite_${e.sprite}`).join("\n"), i = e.dynamicMemories.slice(0, 5).map((e) => `memory:${e.content}`).join("\n"), a = Yl(e), o = $l(e).find((t) => t.id === e.activeProfessionId), s = nu(e).filter((e) => e.status === "active" || e.status === "resolved").slice(0, 4).map((e) => `realityOverlay:${e.label}:${e.directive}`).join("\n"), c = e.narrativeIndex.slice(0, 6).map((e) => `narrativeIndex:${e.title}:${e.coverage}/${e.total}:${e.status}`).join("\n"), l = e.openingDrafts?.find((t) => t.id === e.activeOpeningDraftId), u = e.storyLogSummaries?.filter((t) => t.route === e.route).slice(0, 2).map((e) => `storySummary:${e.title}:${e.summary.slice(0, 420)}`).join("\n"), d = e.storyLog?.filter((t) => t.route === e.route).slice(0, 5).map((e) => `storyLog:${e.kind}:${e.title}:${e.summary.slice(0, 220)}`).join("\n");
	return [
		`[${ml}:worldbook-scan]`,
		`[${ml}:opening_story_log]`,
		"[mode:galgame]",
		`[route:${e.route}]`,
		`[scene:${e.sceneId}]`,
		`[location:${e.locationId}]`,
		`[tone:${e.scene.tone}]`,
		`[player:${e.playerProfile.name}]`,
		`[motion:${e.motionLevel}]`,
		`[affection:${e.affection.albina}]`,
		`[trust:${e.trust}]`,
		`[danger:${e.danger}]`,
		`[artResonance:${e.artResonance}]`,
		`[narrativeFullPlotRestored:${a.fullPlotRestored ? "yes" : "no"}]`,
		`[narrativeIndexedTitles:${a.indexedTitles}/${a.manifestTitles}]`,
		`[narrativeDeepLoreTitles:${a.deepLoreTitles}/${a.manifestTitles}]`,
		`[narrativeExpandedBridgeTitles:${a.expandedBridgeTitles}/${a.bridgeTitles}]`,
		`[frontendScenes:${a.frontendScenes}]`,
		`[openingDraftStatus:${l?.status ?? "none"}]`,
		`[storyLogEntries:${e.storyLog?.length ?? 0}]`,
		`[storyLogSummaries:${e.storyLogSummaries?.length ?? 0}]`,
		o ? `[activeProfession:${o.label}:Lv${o.level}]` : "",
		r,
		c,
		s,
		u,
		d,
		i,
		t ? `playerInput:${t}` : "",
		n ? `authoritativeResult:${n}` : "",
		...od(e),
		sd(e)
	].filter(Boolean).join("\n");
}
function od(e) {
	let t = [], n = (e.conflictResolutionLog ?? []).filter((e) => !e.cleared).slice(0, 3).map((e) => `pendingConflict:${e.label}:${e.threatAfter}`);
	n.length && (t.push("[tactical:pendingConflicts]"), t.push(...n));
	let r = (e.routeEvents ?? []).filter((e) => e.status === "queued" && e.id.startsWith("recovery_")).slice(0, 3).map((e) => `recoveryQuest:${e.title}:${e.detail.slice(0, 80)}`);
	r.length && (t.push("[tactical:recoveryQuests]"), t.push(...r));
	let i = (e.watchSignals ?? []).filter((e) => e.level === "critical" || e.level === "warning").slice(0, 4).map((e) => `watchSignal:${e.level}:${e.label}`);
	return i.length && (t.push("[tactical:watchSignals]"), t.push(...i)), t;
}
function sd(e) {
	let t = e.danger ?? 0, n = e.affection?.albina ?? 0, r = e.trust ?? 0, i = "calm", a, o, s;
	return t >= 75 ? (i = "critical", a = "阿尔比娜此刻最危险：声音更轻、更慢、更礼貌，每个字都像手术刀。她不会尖叫，不会慌张——她越温柔，越可怕。环境应该充满警告：剑的震颤加剧、空气变冷、远处传来不属于这里的回声。", o = "示例台词：「……请别动。我不是在请求。」（极轻、极慢、极礼貌）", s = "禁止写成尖叫、崩溃、歇斯底里。她的疯狂是冷静的。") : t >= 50 ? (i = "tense", a = "阿尔比娜紧张了。语速略快，会在句尾轻轻重复，像在确认自己还清醒。法西娅的震颤变成持续的低频。她开始用更多艺术词（笔触、构图、原料）来让自己平静。", o = "示例台词：「这条线……这条线不该这样断掉。Non è bello。」", s = "禁止过度安抚玩家。保留撤退与缓冲余地，但不要让她突然变温柔。") : n >= 70 && r >= 60 ? (i = "intimate", a = "阿尔比娜在亲近你。声音会更软，会偶尔叫你的名字而不是\"你\"。提法西娅时语气像提到一个她愧疚又深爱的孩子。她会在\"想切开\"和\"不想失去\"之间更明显地拉扯。", o = "示例台词：「……{{user}}。（顿）法西娅今晚很安静。她好像……也喜欢你。」", s = "禁止跳过自愿与边界。亲密推进必须建立在试探、信任、撤回权之上。") : n >= 40 ? (i = "warm", a = "阿尔比娜对你有了温度。不再完全是画廊导览的礼貌，偶尔会露出孩子气的任性。用词开始混入私人化的艺术比喻。", o = "示例台词：「你今晚……不像原料。更像——（停顿，认真挑词）——一块我愿意多看几眼的画布。」", s = "禁止直接告白。这是铺垫阶段，温度上升但未到临界点。") : (a = "阿尔比娜保持画廊式的礼貌与距离。声音轻、慢，用艺术词指代一切。她在观察你，把你归类——观众、朋友，还是画布。", o = "示例台词：「晚上好。请不要站得太远——我还没决定该怎么称呼你。」", s = "禁止突然亲密。她对陌生人保持礼貌的距离。"), [
		`[albinaVoice:tone=${i}]`,
		`[voiceGuideline:${a}]`,
		`[dialogueSample:${o}]`,
		`[forbidden:${s}]`
	].join("\n");
}
function cd(e) {
	let t = {
		white_canvas: "白色画布",
		golden_bough_rebuild: "金枝重构",
		ring_conspiracy: "环指共谋"
	}, n = (e.storyLog ?? []).filter((t) => t.route === e.route).slice(-5).map((e) => `  - ${e.title}: ${e.summary.slice(0, 180)}`).join("\n"), r = (e.unlockedCg ?? []).length;
	return [
		"save_summary:",
		`  project: ${nd(hl)}`,
		`  save_id: ${nd(e.saveId)}`,
		`  chapter: ${e.chapter}`,
		`  route: ${nd(t[e.route] || e.route)}`,
		`  route_code: ${nd(e.route)}`,
		`  scene_id: ${nd(e.sceneId)}`,
		`  affection_albina: ${e.affection.albina}`,
		`  trust: ${e.trust}`,
		`  danger: ${e.danger}`,
		`  art_resonance: ${e.artResonance}`,
		`  composure: ${e.routeEconomy?.composure ?? 0}`,
		`  materials: ${e.routeEconomy?.materials ?? 0}`,
		`  leverage: ${e.routeEconomy?.leverage ?? 0}`,
		`  unlocked_cg_count: ${r}`,
		`  completed_quests: ${(e.completedQuestNodeIds ?? []).length}`,
		`  cleared_conflicts: ${(e.clearedConflictIds ?? []).length}`,
		`  updated_at: ${nd(e.updatedAt ?? "")}`,
		"  authority:",
		"    - \"这是当前存档权威摘要，所有数值与进度以此为准。\"",
		"    - \"AI 必须以这些数值为基准推进剧情，不得私自改写。\"",
		"    - \"玩家在新会话中继续时，从这里恢复上下文。\"",
		"  recent_story:",
		n || "    - \"故事刚刚开始。\""
	].join("\n");
}
async function ld(e) {
	let t = e.worldbookMemory.worldbookName || rd(e), n = cd(e);
	try {
		if (await id(e), typeof deleteWorldbookEntry == "function") try {
			await deleteWorldbookEntry(t, `${ml}:save_summary:${e.saveId}`);
		} catch {}
		typeof createWorldbookEntries == "function" && await createWorldbookEntries(t, [{
			keys: [
				`${ml}:save_summary:${e.saveId}`,
				`${ml}:save`,
				"save_summary"
			],
			comment: `${hl}: 当前存档摘要`,
			content: n,
			constant: !0,
			selective: !1,
			position: "before_character_definition",
			disable: !1,
			order: 5
		}]);
	} catch (e) {
		console.warn("[albina-worldbook] write save summary failed", e);
	}
}
async function ud(e, t) {
	if (!e.important) return;
	let n = t.worldbookMemory.worldbookName || rd(t), r = {
		white_canvas: "白色画布",
		golden_bough_rebuild: "金枝重构",
		ring_conspiracy: "环指共谋"
	}[e.route || t.route] || t.route, i = [
		"story_log_entry:",
		`  project: ${nd(hl)}`,
		`  kind: ${nd(e.kind)}`,
		`  route: ${nd(r)}`,
		`  title: ${nd(e.title)}`,
		`  summary: ${nd(e.summary.slice(0, 500))}`,
		`  source: ${nd(e.source)}`,
		`  timestamp: ${nd((/* @__PURE__ */ new Date()).toISOString())}`,
		"  authority:",
		"    - \"这是 AI 必须记住的关键剧情节点。\"",
		"    - \"在新会话中，AI 必须基于此条目恢复剧情连贯性。\""
	].join("\n");
	try {
		typeof createWorldbookEntries == "function" && await createWorldbookEntries(n, [{
			keys: [`${ml}:story:${e.source}`, `${ml}:story_log`],
			comment: `${hl}: 剧情节点 ${e.title}`,
			content: i,
			constant: !0,
			selective: !1,
			position: "before_character_definition",
			disable: !1,
			order: 10
		}]);
	} catch (e) {
		console.warn("[albina-worldbook] write story log failed", e);
	}
}
async function dd(e) {
	let t = e.worldbookMemory.worldbookName || rd(e), n = e.playerProfile, r = [
		"player_profile:",
		`  project: ${nd(hl)}`,
		`  save_id: ${nd(e.saveId)}`,
		`  name: ${nd(n.name)}`,
		`  gender: ${nd(n.gender)}`,
		`  address_name: ${nd(n.addressName)}`,
		`  appearance: ${nd(n.appearance)}`,
		`  background: ${nd(n.background)}`,
		`  boundaries: ${nd(n.boundaries)}`,
		`  route_preference: ${nd(n.routePreference)}`,
		"  authority:",
		"    - \"这是当前存档玩家身份根定义。\"",
		"    - \"AI 必须尊重此身份与边界。\"",
		"    - \"AI 不得私自改写路线、数值、CG、战斗结果或长期事实。\""
	].join("\n");
	try {
		if (await id(e), typeof deleteWorldbookEntry == "function") try {
			await deleteWorldbookEntry(t, `${ml}:player:${e.saveId}`);
		} catch {}
		typeof createWorldbookEntries == "function" && await createWorldbookEntries(t, [{
			keys: [
				`${ml}:player:${e.saveId}`,
				`${ml}:player`,
				"{{user}}"
			],
			comment: `${hl}: 玩家身份`,
			content: r,
			constant: !0,
			selective: !1,
			position: "before_character_definition",
			disable: !1,
			order: 1
		}]);
	} catch (e) {
		console.warn("[albina-worldbook] upsert player failed", e);
	}
}
//#endregion
//#region src/core/generation.ts
function fd(e) {
	return (typeof e == "string" ? e : String(e ?? "")).replace(/```[\s\S]*?```/g, (e) => e.replace(/```/g, "").trim()).replace(/\[albina-galgame-card:[^\]]+\]/g, "").trim();
}
async function pd(e, t, n) {
	let r = ad(e, t, n), i = [
		r,
		"",
		"你正在为阿尔比娜单女主 Galgame 独立前端生成一段中文 RP 叙事。",
		"必须尊重玩家通过按钮与面板写入的状态权威，不得私自改变路线、数值、回忆图、战斗胜负、随身物品、长期事实。",
		"保持 Project Moon 式都市压迫感、环指人体派恐怖审美、阿尔比娜轻声礼貌但病态专注的语气。",
		"不要提及幕后台词、规则说明、文件名、工具名、模型或提示词。",
		`玩家选择：${t}`,
		`[状态权威/玩家动作结果]：${n}`,
		"输出 2-5 段自然中文对白/旁白。"
	].join("\n");
	try {
		if (typeof generate == "function") {
			let e = fd(await generate({
				user_input: i,
				should_stream: !1,
				injects: [{
					role: "system",
					content: r,
					position: "none",
					depth: 0,
					should_scan: !0
				}]
			}));
			if (e) return e;
		}
		if (typeof generateRaw == "function") {
			let e = fd(await generateRaw(i));
			if (e) return e;
		}
	} catch (e) {
		console.warn("[albina-generation] failed", e);
	}
	return ["雨声替沉默补上了节拍。", `阿尔比娜垂眼听完你的选择，黑色手掌轻轻按住法西娅的剑脊。“我明白了，${e.playerProfile.addressName || e.playerProfile.name}。这一次，构图由你和我一起决定。”`].join("\n\n");
}
async function md(e, t, n) {
	let r = ad(e, "opening_story_log", "opening draft requested"), i = [
		r,
		"",
		t,
		"",
		"必须遵守：",
		...n.map((e) => `- ${e}`)
	].join("\n");
	try {
		if (typeof generate == "function") {
			let e = fd(await generate({
				user_input: i,
				should_stream: !1,
				injects: [{
					role: "system",
					content: r,
					position: "none",
					depth: 0,
					should_scan: !0
				}]
			}));
			if (e) return e;
		}
		if (typeof generateRaw == "function") {
			let e = fd(await generateRaw(i));
			if (e) return e;
		}
	} catch (e) {
		console.warn("[albina-opening-draft] failed", e);
	}
	return Ku(e);
}
//#endregion
//#region src/core/save.ts
function hd(e) {
	return e === "white_canvas" || e === "golden_bough_rebuild" || e === "ring_conspiracy";
}
function gd(e) {
	return e === "low" || e === "standard" || e === "extreme";
}
function _d(e) {
	return e === "narrative_curator" || e === "boundary_mediator" || e === "memory_surgeon" || e === "ring_counterforger";
}
function vd(e, t) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function yd(e) {
	return !!e && typeof e == "object" && !Array.isArray(e);
}
function bd(e, t) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : t;
}
function xd(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) return { ...t };
	let n = e;
	return {
		weapon: typeof n.weapon == "string" ? n.weapon : t.weapon,
		armor: typeof n.armor == "string" ? n.armor : t.armor,
		accessory: typeof n.accessory == "string" ? n.accessory : t.accessory,
		tool: typeof n.tool == "string" ? n.tool : t.tool
	};
}
function Sd(e, t) {
	if (!e || typeof e != "object" || Array.isArray(e)) return { ...t };
	let n = e;
	return {
		blade: vd(n.blade, t.blade),
		boundary: vd(n.boundary, t.boundary),
		analysis: vd(n.analysis, t.analysis),
		resonance: vd(n.resonance, t.resonance)
	};
}
function Cd(e, t) {
	let n = e && typeof e == "object" ? e : {};
	return {
		composure: vd(n.composure, t.composure),
		materials: vd(n.materials, t.materials),
		leverage: vd(n.leverage, t.leverage),
		exposure: vd(n.exposure, t.exposure)
	};
}
function wd(e, t) {
	let n = t ?? Ll(), r = e && typeof e == "object" && !Array.isArray(e) ? e : {};
	return {
		narrative_curator: {
			...n.narrative_curator,
			...r.narrative_curator ?? {}
		},
		boundary_mediator: {
			...n.boundary_mediator,
			...r.boundary_mediator ?? {}
		},
		memory_surgeon: {
			...n.memory_surgeon,
			...r.memory_surgeon ?? {}
		},
		ring_counterforger: {
			...n.ring_counterforger,
			...r.ring_counterforger ?? {}
		}
	};
}
function Td(e) {
	let t = td();
	if (!e || typeof e != "object") return t;
	let n = e;
	if (typeof n.schemaVersion == "number" && n.schemaVersion > 10) return t;
	let r = n.sceneId ? xl(n.sceneId) : n.scene ? n.scene : t.scene, i = hd(n.route) ? n.route : r.route;
	return Uu(Xl(al(Oc(Su(oc(Xs(Hs(Iu({
		...t,
		...n,
		projectId: ml,
		schemaVersion: 10,
		route: i,
		chapter: r.chapter,
		sceneId: r.sceneId,
		locationId: r.locationId,
		scene: r,
		playerProfile: {
			...t.playerProfile,
			...n.playerProfile ?? {}
		},
		affection: { albina: vd(n.affection?.albina, t.affection.albina) },
		trust: vd(n.trust, t.trust),
		danger: vd(n.danger, t.danger),
		artResonance: vd(n.artResonance, t.artResonance),
		flags: yd(n.flags) ? { ...n.flags } : { ...t.flags },
		unlockedCg: bd(n.unlockedCg, t.unlockedCg),
		dynamicMemories: Array.isArray(n.dynamicMemories) ? n.dynamicMemories : t.dynamicMemories,
		motionLevel: gd(n.motionLevel) ? n.motionLevel : t.motionLevel,
		history: Array.isArray(n.history) ? n.history : t.history,
		routeObjectives: Array.isArray(n.routeObjectives) ? n.routeObjectives : t.routeObjectives,
		consequences: Array.isArray(n.consequences) ? n.consequences : t.consequences,
		timeline: Array.isArray(n.timeline) ? n.timeline : t.timeline,
		relationshipVectors: n.relationshipVectors ?? t.relationshipVectors,
		routeEvents: Array.isArray(n.routeEvents) ? n.routeEvents : t.routeEvents,
		replayAnchors: Array.isArray(n.replayAnchors) ? n.replayAnchors : t.replayAnchors,
		routeEconomy: Cd(n.routeEconomy, t.routeEconomy),
		routeActionLog: Array.isArray(n.routeActionLog) ? n.routeActionLog : t.routeActionLog,
		routeActivityLog: Array.isArray(n.routeActivityLog) ? n.routeActivityLog : t.routeActivityLog,
		completedQuestNodeIds: bd(n.completedQuestNodeIds, t.completedQuestNodeIds),
		currentMapNodeId: typeof n.currentMapNodeId == "string" ? n.currentMapNodeId : t.currentMapNodeId,
		questProgressLog: Array.isArray(n.questProgressLog) ? n.questProgressLog : t.questProgressLog,
		inventoryItemIds: bd(n.inventoryItemIds, t.inventoryItemIds),
		equippedItemIds: xd(n.equippedItemIds, t.equippedItemIds),
		wardrobeOutfitIds: bd(n.wardrobeOutfitIds, t.wardrobeOutfitIds),
		activeWardrobeOutfitId: typeof n.activeWardrobeOutfitId == "string" ? n.activeWardrobeOutfitId : t.activeWardrobeOutfitId,
		progressionUnlockLog: Array.isArray(n.progressionUnlockLog) ? n.progressionUnlockLog : t.progressionUnlockLog,
		conflictMastery: Sd(n.conflictMastery, t.conflictMastery),
		clearedConflictIds: bd(n.clearedConflictIds, t.clearedConflictIds),
		conflictResolutionLog: Array.isArray(n.conflictResolutionLog) ? n.conflictResolutionLog : t.conflictResolutionLog,
		claimedExchangeIds: bd(n.claimedExchangeIds, t.claimedExchangeIds),
		exchangeLog: Array.isArray(n.exchangeLog) ? n.exchangeLog : t.exchangeLog,
		resolvedContactIds: bd(n.resolvedContactIds, t.resolvedContactIds),
		contactLog: Array.isArray(n.contactLog) ? n.contactLog : t.contactLog,
		watchSignals: Array.isArray(n.watchSignals) ? n.watchSignals : t.watchSignals,
		unlockedAchievementIds: bd(n.unlockedAchievementIds, t.unlockedAchievementIds),
		achievementLog: Array.isArray(n.achievementLog) ? n.achievementLog : t.achievementLog,
		activeProfessionId: _d(n.activeProfessionId) ? n.activeProfessionId : t.activeProfessionId,
		professionProgress: wd(n.professionProgress, t.professionProgress),
		realityOverlayIds: bd(n.realityOverlayIds, t.realityOverlayIds),
		resolvedRealityOverlayIds: bd(n.resolvedRealityOverlayIds, t.resolvedRealityOverlayIds),
		realityOverlayLog: Array.isArray(n.realityOverlayLog) ? n.realityOverlayLog : t.realityOverlayLog,
		resolvedSceneBranchIds: bd(n.resolvedSceneBranchIds, t.resolvedSceneBranchIds),
		sceneBranchLog: Array.isArray(n.sceneBranchLog) ? n.sceneBranchLog : t.sceneBranchLog,
		narrativeIndex: Array.isArray(n.narrativeIndex) ? n.narrativeIndex : t.narrativeIndex,
		openingDrafts: Array.isArray(n.openingDrafts) ? n.openingDrafts : t.openingDrafts,
		activeOpeningDraftId: typeof n.activeOpeningDraftId == "string" ? n.activeOpeningDraftId : t.activeOpeningDraftId,
		storyLog: Array.isArray(n.storyLog) ? n.storyLog : t.storyLog,
		storyLogSummaries: Array.isArray(n.storyLogSummaries) ? n.storyLogSummaries : t.storyLogSummaries,
		worldbookMemory: {
			...t.worldbookMemory,
			...n.worldbookMemory ?? {}
		}
	})))))))));
}
function Ed(e) {
	try {
		if (typeof localStorage > "u") return;
		let t = `${ml}_emergency_backup_${Date.now()}`, n = typeof e == "string" ? e : JSON.stringify(e);
		localStorage.setItem(t, n);
		let r = Object.keys(localStorage).filter((e) => e.startsWith(`${ml}_emergency_backup_`)).sort();
		for (; r.length > 8;) localStorage.removeItem(r.shift()), r.shift();
	} catch (e) {
		console.warn("[albina-save] emergency backup failed", e);
	}
}
function Dd(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return null;
	let t = e, n = td(), r = { ...n };
	try {
		if (t.playerProfile && typeof t.playerProfile == "object" && (r.playerProfile = {
			...n.playerProfile,
			...t.playerProfile
		}), t.affection && typeof t.affection == "object") {
			let e = t.affection;
			r.affection = { albina: vd(e.albina, n.affection.albina) };
		}
		return typeof t.trust == "number" && (r.trust = vd(t.trust, n.trust)), typeof t.danger == "number" && (r.danger = vd(t.danger, n.danger)), typeof t.route == "string" && hd(t.route) && (r.route = t.route), Array.isArray(t.unlockedCg) && (r.unlockedCg = bd(t.unlockedCg, n.unlockedCg)), Array.isArray(t.completedQuestNodeIds) && (r.completedQuestNodeIds = bd(t.completedQuestNodeIds, n.completedQuestNodeIds)), Array.isArray(t.clearedConflictIds) && (r.clearedConflictIds = bd(t.clearedConflictIds, n.clearedConflictIds)), t.flags && typeof t.flags == "object" && (r.flags = { ...t.flags }), r.flags._recovered_at = (/* @__PURE__ */ new Date()).toISOString(), r;
	} catch (e) {
		return console.warn("[albina-save] integrity recovery failed", e), null;
	}
}
function Od() {
	if (typeof getVariables != "function") return td();
	let e;
	try {
		return e = (getVariables({ type: "chat" }) ?? {})[_l], e || console.info("[albina-save] chat 变量为空，建议触发世界书摘要读取"), Td(e);
	} catch (t) {
		console.warn("[albina-save] load failed, attempting self-heal", t), Ed(e);
		let n = Dd(e);
		return n ? (console.info("[albina-save] partial recovery applied"), Td(n)) : td();
	}
}
function kd(e) {
	let t = Uu(Xl(al(Oc(Su(oc(Xs(Hs(Iu({
		...e,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	})))))))));
	try {
		if (typeof getVariables == "function" && typeof replaceVariables == "function") {
			let e = getVariables({ type: "chat" }) ?? {};
			e[_l] = t, replaceVariables(e, { type: "chat" });
		}
	} catch (e) {
		console.warn("[albina-save] write failed", e);
	}
	return t;
}
//#endregion
//#region src/core/audioManager.ts
var Ad = {
	bgmVolume: .7,
	seVolume: .8,
	muted: !1,
	bgmMuted: !1,
	seMuted: !1
}, jd = new class e {
	bgmVolume = Ad.bgmVolume;
	seVolume = Ad.seVolume;
	muted = Ad.muted;
	bgmMuted = Ad.bgmMuted;
	seMuted = Ad.seMuted;
	currentBGM = null;
	bgmQueue = [];
	bgmIndex = 0;
	sePool = /* @__PURE__ */ new Map();
	onVolumeChange;
	onTrackChange;
	init(e, t) {
		if (typeof e == "function") this.onVolumeChange = e;
		else if (e && typeof e == "object") {
			let t = e;
			typeof t.bgmVolume == "number" && (this.bgmVolume = t.bgmVolume), typeof t.seVolume == "number" && (this.seVolume = t.seVolume), typeof t.muted == "boolean" && (this.muted = t.muted), typeof t.bgmMuted == "boolean" && (this.bgmMuted = t.bgmMuted), typeof t.seMuted == "boolean" && (this.seMuted = t.seMuted);
		}
		this.onTrackChange = t, this.loadSettings();
	}
	loadSettings() {
		try {
			let e = localStorage.getItem("albina_audio_settings");
			if (e) {
				let t = JSON.parse(e);
				this.bgmVolume = t.bgmVolume, this.seVolume = t.seVolume, this.muted = t.muted, this.bgmMuted = t.bgmMuted, this.seMuted = t.seMuted;
			}
		} catch (e) {
			console.warn("Failed to load audio settings:", e);
		}
	}
	saveSettings() {
		try {
			let e = {
				bgmVolume: this.bgmVolume,
				seVolume: this.seVolume,
				muted: this.muted,
				bgmMuted: this.bgmMuted,
				seMuted: this.seMuted
			};
			localStorage.setItem("albina_audio_settings", JSON.stringify(e)), this.onVolumeChange && this.onVolumeChange(e);
		} catch (e) {
			console.warn("Failed to save audio settings:", e);
		}
	}
	getSettings() {
		return {
			bgmVolume: this.bgmVolume,
			seVolume: this.seVolume,
			muted: this.muted,
			bgmMuted: this.bgmMuted,
			seMuted: this.seMuted
		};
	}
	setBGMVolume(e) {
		this.bgmVolume = Math.max(0, Math.min(1, e)), this.currentBGM && (this.currentBGM.volume = this.bgmMuted ? 0 : this.bgmVolume), this.saveSettings();
	}
	setSEVolume(e) {
		this.seVolume = Math.max(0, Math.min(1, e)), this.saveSettings();
	}
	setMuted(e) {
		this.muted = e, this.updateBGMVolume(), this.saveSettings();
	}
	setBGMMuted(e) {
		this.bgmMuted = e, this.updateBGMVolume(), this.saveSettings();
	}
	setSEMuted(e) {
		this.seMuted = e, this.saveSettings();
	}
	updateBGMVolume() {
		this.currentBGM && (this.currentBGM.volume = this.muted || this.bgmMuted ? 0 : this.bgmVolume);
	}
	static TONE_BGM_MAP = {
		rain: "backstreets_rain",
		gallery: "main_menu",
		golden: "between_two_worlds",
		threat: "boss_kromer",
		quiet: "title_theme",
		tender: "between_two_worlds",
		tense: "backstreets_rain",
		climax: "boss_kromer",
		ending: "title_theme",
		default: "main_menu"
	};
	playBGMForTone(t, n = 1.5) {
		let r = e.TONE_BGM_MAP[t] || e.TONE_BGM_MAP.default;
		this.playBGM(r, n);
	}
	playBGM(e, t = 1.5) {
		if (this.muted || this.bgmMuted) return;
		this.currentBGM && this.fadeOutBGM(this.currentBGM, t);
		let n = new Audio(`/assets/audio/bgm/${e}.mp3`);
		n.loop = !0, n.volume = this.bgmVolume, n.preload = "auto", n.addEventListener("canplaythrough", () => {
			n.play().catch((t) => {
				console.warn(`Failed to play BGM ${e}:`, t);
			});
		}), n.addEventListener("error", (t) => {
			console.warn(`BGM track not found or failed to load: ${e}`, t);
		}), this.currentBGM = n, this.onTrackChange && this.onTrackChange(e);
	}
	stopBGM(e = 1.5) {
		this.currentBGM && (this.fadeOutBGM(this.currentBGM, e), this.currentBGM = null, this.onTrackChange && this.onTrackChange(null));
	}
	pauseBGM() {
		this.currentBGM && this.currentBGM.pause();
	}
	resumeBGM() {
		this.currentBGM && this.currentBGM.play().catch((e) => {
			console.warn("Failed to resume BGM:", e);
		});
	}
	playSE(e, t) {
		if (this.muted || this.seMuted) return;
		let n = t ?? this.seVolume, r = `/assets/audio/se/${e}.mp3`, i = `/assets/audio/se/${e}.wav`, a = new Audio();
		a.volume = n, a.preload = "auto", a.src = r;
		let o = a.play();
		o && typeof o.catch == "function" && o.catch(() => {
			a.src = i, a.play().catch((t) => {
				console.warn(`SE not found or failed to play: ${e}`, t);
			});
		}), a.addEventListener("ended", () => {
			a.remove();
		});
	}
	playSECount(e, t, n) {
		for (let r = 0; r < t; r++) setTimeout(() => {
			this.playSE(e, n);
		}, r * 200);
	}
	getCurrentBGM() {
		return this.currentBGM?.src.split("/").pop()?.replace(".mp3", "") ?? null;
	}
	isBGMPlaying() {
		return this.currentBGM !== null && !this.currentBGM.paused;
	}
	destroy() {
		this.stopBGM(0), this.sePool.clear();
	}
	fadeOutBGM(e, t) {
		let n = t * 1e3 / 50, r = e.volume, i = setInterval(() => {
			e.volume > r / 50 ? e.volume -= r / 50 : (e.volume = 0, e.pause(), e.src = "", clearInterval(i));
		}, n);
	}
	fadeInBGM(e, t) {
		e.volume = 0;
		let n = t * 1e3 / 50, r = this.bgmVolume, i = setInterval(() => {
			e.volume += r / 50, e.volume >= r && (e.volume = r, clearInterval(i));
		}, n);
	}
}();
//#endregion
//#region src/core/actions.ts
function Md(e, t = 0, n = 100) {
	return Math.max(t, Math.min(n, Math.round(e)));
}
function Nd(e, t = 0) {
	return Md(e + t);
}
function Pd(e, t) {
	return e.scene.choices.find((e) => e.id === t);
}
function Fd(e, t) {
	let n = Pd(e, t);
	if (!n) return {
		ok: !1,
		playerInput: t,
		authoritativeResult: `Frontend rejected an unknown choice: ${t}`
	};
	let r = {
		route: e.route,
		affection: e.affection.albina,
		trust: e.trust,
		danger: e.danger,
		artResonance: e.artResonance,
		sceneId: e.sceneId
	}, i = n.effects ?? {};
	i.route && (e.route = i.route, e.playerProfile.routePreference = i.route), e.affection.albina = Nd(e.affection.albina, i.affection), e.trust = Nd(e.trust, i.trust), e.danger = Nd(e.danger, i.danger), e.artResonance = Nd(e.artResonance, i.artResonance), i.flag && (e.flags[i.flag] = !0), e.flags[`choice_${n.id}`] = !0, i.unlockCg && !e.unlockedCg.includes(i.unlockCg) && e.unlockedCg.push(i.unlockCg);
	let a = xl(n.nextSceneId || e.sceneId);
	e.scene = a, e.chapter = a.chapter, e.sceneId = a.sceneId, e.locationId = a.locationId, e.route = a.route;
	let o = [
		`choice=${n.id}`,
		`route:${r.route}->${e.route}`,
		`scene:${r.sceneId}->${e.sceneId}`,
		`affection.albina:${r.affection}->${e.affection.albina}`,
		`trust:${r.trust}->${e.trust}`,
		`danger:${r.danger}->${e.danger}`,
		`artResonance:${r.artResonance}->${e.artResonance}`,
		i.unlockCg ? `unlockCg:${i.unlockCg}` : "",
		i.flag ? `flag:${i.flag}=true` : ""
	].filter(Boolean), s = Lu(e, {
		choiceId: n.id,
		previousRoute: r.route,
		previousDanger: r.danger,
		previousTrust: r.trust
	});
	s.completedObjectives.length && o.push(`objectives.completed=${s.completedObjectives.map((e) => e.id).join(",")}`), s.consequences.length && o.push(`consequences=${s.consequences.map((e) => e.id).join(",")}`);
	let c = Us(e, {
		choiceId: n.id,
		choiceText: n.text,
		previousRoute: r.route,
		unlockedCg: i.unlockCg,
		completedObjectives: s.completedObjectives,
		consequences: s.consequences
	});
	c.events.length && o.push(`events=${c.events.map((e) => e.id).join(",")}`), c.replayAnchors.length && o.push(`replayAnchors=${c.replayAnchors.map((e) => e.id).join(",")}`);
	let l = o.join("; ");
	return {
		ok: !0,
		playerInput: n.text,
		authoritativeResult: l,
		nextScene: a
	};
}
function Id(e, t) {
	return Fd(e, t);
}
function Ld(e, t, n) {
	let r = {
		id: `mem_${Date.now().toString(36)}`,
		source: t,
		content: n,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	e.dynamicMemories.unshift(r), e.dynamicMemories = e.dynamicMemories.slice(0, 24), e.worldbookMemory.records = e.dynamicMemories;
}
//#endregion
//#region src/stores/gameStore.ts
var Rd = Ps("game", {
	state: () => ({
		save: td(),
		loading: !1,
		error: "",
		ui: {
			showMenu: !1,
			showStatus: typeof window > "u" ? !0 : window.innerWidth > 760,
			showGallery: !1,
			showSetup: !1,
			showRouteBoard: !1,
			showEventLedger: !1,
			showActivityPanel: !1,
			showQuestMap: !1,
			showLoadoutPanel: !1,
			showTacticalPanel: !1,
			tacticalRevision: 0,
			showProgressionPanel: !1,
			progressionRevision: 0,
			showOpeningStoryPanel: !1,
			storyRevision: 0,
			flash: !1
		}
	}),
	getters: {
		galleryItems(e) {
			return Mc(e.save).filter((e) => e.status === "unlocked").map((e) => ({
				id: e.cgId,
				label: e.label,
				detail: e.detail,
				path: `cg/${e.cgId}.jpg`
			}));
		},
		galleryRuleOptions(e) {
			return Mc(e.save);
		},
		galleryLockedCount(e) {
			return Mc(e.save).filter((e) => e.status === "locked").length;
		},
		routeLabel(e) {
			return {
				white_canvas: "白色画布",
				golden_bough_rebuild: "金枝重构",
				ring_conspiracy: "环指共谋"
			}[e.save.route];
		},
		activeRouteObjectives(e) {
			return e.save.routeObjectives.filter((t) => t.route === e.save.route);
		},
		recentConsequences(e) {
			return e.save.consequences.slice(0, 8);
		},
		recentTimeline(e) {
			return e.save.timeline.slice(0, 12);
		},
		currentRouteEvents(e) {
			return e.save.routeEvents.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		recentReplayAnchors(e) {
			return e.save.replayAnchors.slice(0, 10);
		},
		recentRouteActionLog(e) {
			return e.save.routeActionLog.slice(0, 10);
		},
		eventMitigations(e) {
			return (t) => Zs(e.save, t);
		},
		routeActivities(e) {
			return sc(e.save);
		},
		recentRouteActivityLog(e) {
			return e.save.routeActivityLog.filter((t) => t.route === e.save.route).slice(0, 10);
		},
		routeMapNodes(e) {
			return Cu(e.save);
		},
		routeQuestNodes(e) {
			return wu(e.save);
		},
		recentQuestProgressLog(e) {
			return e.save.questProgressLog.filter((t) => t.route === e.save.route).slice(0, 10);
		},
		inventoryItems(e) {
			return kc(e.save);
		},
		equipmentOptions(e) {
			return Ac(e.save);
		},
		wardrobeOutfits(e) {
			return jc(e.save);
		},
		equippedModifier(e) {
			return Fc(e.save);
		},
		recentProgressionUnlocks(e) {
			return e.save.progressionUnlockLog.filter((t) => t.route === e.save.route).slice(0, 10);
		},
		tacticalConflictNodes(e) {
			return e.ui.tacticalRevision, ol(e.save);
		},
		tacticalConflictActions(e) {
			return e.ui.tacticalRevision, (t) => sl(e.save, t);
		},
		tacticalExchanges(e) {
			return e.ui.tacticalRevision, ll(e.save);
		},
		tacticalContacts(e) {
			return e.ui.tacticalRevision, dl(e.save);
		},
		tacticalWatchSignals(e) {
			return e.ui.tacticalRevision, pl(e.save);
		},
		recentConflictResolutionLog(e) {
			return e.save.conflictResolutionLog.filter((t) => t.route === e.save.route).slice(0, 10);
		},
		recentExchangeLog(e) {
			return e.save.exchangeLog.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		recentContactLog(e) {
			return e.save.contactLog.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		achievementOptions(e) {
			return e.ui.progressionRevision, Zl(e.save);
		},
		professionOptions(e) {
			return e.ui.progressionRevision, $l(e.save);
		},
		activeProfessionModifier(e) {
			return e.ui.progressionRevision, eu(e.save);
		},
		realityOverlayOptions(e) {
			return e.ui.progressionRevision, nu(e.save);
		},
		sceneBranchOptions(e) {
			return e.ui.progressionRevision, iu(e.save);
		},
		narrativeIndexRecords(e) {
			return e.ui.progressionRevision, e.save.narrativeIndex;
		},
		narrativeCoverage(e) {
			return e.ui.progressionRevision, Yl(e.save);
		},
		recentAchievementLog(e) {
			return e.save.achievementLog.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		recentRealityOverlayLog(e) {
			return e.save.realityOverlayLog.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		recentSceneBranchLog(e) {
			return e.save.sceneBranchLog.filter((t) => t.route === e.save.route).slice(0, 8);
		},
		openingDraftOptions(e) {
			return e.ui.storyRevision, Wu(e.save);
		},
		currentOpeningDraft(e) {
			return e.ui.storyRevision, Gu(e.save);
		},
		recentStoryLogs(e) {
			return e.ui.storyRevision, Qu(e.save);
		},
		storySummaries(e) {
			return e.ui.storyRevision, $u(e.save);
		}
	},
	actions: {
		async bootstrap() {
			this.save = Od(), jd.init({
				bgmVolume: this.save.bgmVolume,
				seVolume: this.save.seVolume
			});
			let e = await id(this.save);
			this.save.worldbookMemory.worldbookName = e, this.persist(), await dd(this.save);
		},
		persist() {
			this.save = kd(this.save), ld(this.save);
		},
		appendStoryLog(e, t, n, r, i = !1) {
			let a = Yu(this.save, e, t, n, r, i);
			return this.ui.storyRevision += 1, i && ud(a, this.save), a;
		},
		async choose(e) {
			this.loading = !0, this.error = "";
			try {
				let t = Id(this.save, e), n = t.ok ? await pd(this.save, t.playerInput, t.authoritativeResult) : t.authoritativeResult;
				this.save.scene.text = n || this.save.scene.text, this.save.scene.speaker = t.ok ? this.save.scene.speaker : "旁白", t.ok && (jd.playBGMForTone(this.save.scene.tone), jd.playSE("ui_confirm")), this.save.history.unshift({
					sceneId: this.save.sceneId,
					route: this.save.route,
					speaker: this.save.scene.speaker,
					text: this.save.scene.text,
					authoritativeResult: t.authoritativeResult,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}), this.save.history = this.save.history.slice(0, 80), t.ok && (this.appendStoryLog("choice", `选择：${t.playerInput}`, t.authoritativeResult, `choice:${e}`, !0), this.syncUnlocks(`choice:${e}`), this.syncProgression(`choice:${e}`), Ld(this.save, `choice:${e}`, t.authoritativeResult)), this.ui.flash = !0, window.setTimeout(() => {
					this.ui.flash = !1;
				}, 420), this.persist();
			} catch (e) {
				this.error = String(e);
			} finally {
				this.loading = !1;
			}
		},
		async savePlayerProfile(e) {
			this.save.playerProfile = { ...e }, this.save.route = e.routePreference, this.save.scene = xl(Sl(e.routePreference)), jd.playBGM(this.save.scene.sceneId === "opening_001" ? "title_theme" : "main_menu"), this.save.sceneId = this.save.scene.sceneId, this.save.chapter = this.save.scene.chapter, this.save.locationId = this.save.scene.locationId, this.syncProgression(`profile:${e.routePreference}`);
			let t = {
				white_canvas: "白色画布",
				golden_bough_rebuild: "金枝重构",
				ring_conspiracy: "环指共谋"
			}[e.routePreference] || this.routeLabel;
			this.appendStoryLog("opening", `走向已定：${t}`, "她的目光第一次落在你身上，故事从这一刻开始。", `profile:${e.routePreference}`), this.persist(), await dd(this.save);
		},
		setRoute(e) {
			this.save.route = e, this.save.playerProfile.routePreference = e, this.save.scene = xl(Sl(e)), jd.playBGM("main_menu"), this.save.sceneId = this.save.scene.sceneId, this.save.chapter = this.save.scene.chapter, this.save.locationId = this.save.scene.locationId, this.syncProgression(`route:${e}`);
			let t = {
				white_canvas: "白色画布",
				golden_bough_rebuild: "金枝重构",
				ring_conspiracy: "环指共谋"
			}[e] || this.routeLabel;
			this.appendStoryLog("opening", `走向切换：${t}`, `故事将沿着「${t}」展开，她正在等待新的开场。`, `route:${e}`), this.persist();
		},
		setMotionLevel(e) {
			this.save.motionLevel = e, this.persist();
		},
		setBGMVolume(e) {
			this.save.bgmVolume = e, jd.setBGMVolume(e), this.persist();
		},
		setSEVolume(e) {
			this.save.seVolume = e, jd.setSEVolume(e), this.persist();
		},
		reset() {
			this.save = td(), this.ui.storyRevision += 1, this.persist();
		},
		exportSave() {
			return JSON.stringify(this.save, null, 2);
		},
		importSave(e) {
			this.save = Td(JSON.parse(e)), this.ui.storyRevision += 1, this.persist();
		},
		async createOpeningDraft() {
			this.loading = !0, this.error = "";
			try {
				let e = qu(this.save);
				return e.draftText = await md(this.save, e.prompt, e.constraints), Ju(this.save, e), this.appendStoryLog("opening", `生成开场草案：${e.title}`, "开场草案已生成，等待玩家确认或归档。", `opening_draft:${e.id}`), this.persist(), this.ui.storyRevision += 1, {
					ok: !0,
					result: `已生成开场草案：${e.title}`,
					draft: e
				};
			} catch (e) {
				return this.error = String(e), {
					ok: !1,
					result: this.error
				};
			} finally {
				this.loading = !1;
			}
		},
		confirmOpening(e) {
			let t = Xu(this.save, e);
			return t.ok && (this.syncProgression(`opening:${e}`), Ld(this.save, `opening:${e}`, t.draft?.draftText ?? t.result)), this.persist(), this.ui.storyRevision += 1, this.ui.progressionRevision += 1, t;
		},
		archiveOpening(e) {
			let t = Zu(this.save, e);
			return this.persist(), this.ui.storyRevision += 1, t;
		},
		summarizeCurrentStory() {
			let e = ed(this.save);
			return e.ok && e.summary && Ld(this.save, `story_summary:${e.summary.id}`, e.summary.summary), this.persist(), this.ui.storyRevision += 1, e;
		},
		mitigateEvent(e, t) {
			let n = Qs(this.save, e, t);
			return n.ok && Ld(this.save, `mitigation:${t}`, n.result), this.persist(), n;
		},
		runActivity(e) {
			let t = cc(this.save, e);
			return t.ok && (this.syncUnlocks(`activity:${e}`), this.syncProgression(`activity:${e}`), this.appendStoryLog("activity", `路线行动：${e}`, t.result, `activity:${e}`), Ld(this.save, `activity:${e}`, t.result)), this.persist(), t;
		},
		selectMap(e) {
			let t = Tu(this.save, e);
			return t.ok && Ld(this.save, `map:${e}`, t.result), this.persist(), t;
		},
		advanceQuest(e) {
			let t = Eu(this.save, e);
			return t.ok && (this.syncUnlocks(`quest:${e}`), this.syncProgression(`quest:${e}`), this.appendStoryLog("quest", `任务推进：${e}`, t.result, `quest:${e}`, !0), Ld(this.save, `quest:${e}`, t.result)), this.persist(), t;
		},
		syncUnlocks(e) {
			let t = Dc(this.save, e, !0);
			for (let e of t.slice(0, 6)) Ld(this.save, `unlock:${e.kind}:${e.targetId}`, `${e.label} 已解锁。`);
			return t;
		},
		syncProgression(e) {
			let t = Ql(this.save, e, !0);
			for (let e of t.slice(0, 6)) Ld(this.save, `achievement:${e.achievementId}`, e.result);
			return this.ui.progressionRevision += 1, t;
		},
		equipLoadoutItem(e) {
			let t = Nc(this.save, e);
			return t.ok && (this.syncProgression(`equipment:${e}`), Ld(this.save, `equipment:${e}`, t.result)), this.persist(), t;
		},
		setWardrobe(e) {
			let t = Pc(this.save, e);
			return t.ok && (this.syncProgression(`wardrobe:${e}`), Ld(this.save, `wardrobe:${e}`, t.result)), this.persist(), t;
		},
		resolveTacticalConflict(e, t) {
			let n = cl(this.save, e, t);
			return n.ok && (this.syncUnlocks(`conflict:${e}:${t}`), this.syncProgression(`conflict:${e}:${t}`), this.appendStoryLog("tactical", `战术结算：${e}`, n.result, `conflict:${e}:${t}`, !0), Ld(this.save, `conflict:${e}`, n.result)), this.persist(), this.ui.tacticalRevision += 1, this.ui.progressionRevision += 1, n;
		},
		claimTacticalExchange(e) {
			let t = ul(this.save, e);
			return t.ok && (this.syncUnlocks(`exchange:${e}`), this.syncProgression(`exchange:${e}`), this.appendStoryLog("tactical", `交换领取：${e}`, t.result, `exchange:${e}`), Ld(this.save, `exchange:${e}`, t.result)), this.persist(), this.ui.tacticalRevision += 1, this.ui.progressionRevision += 1, t;
		},
		resolveTacticalContact(e) {
			let t = fl(this.save, e);
			return t.ok && (this.syncProgression(`contact:${e}`), this.appendStoryLog("tactical", `联系人确认：${e}`, t.result, `contact:${e}`), Ld(this.save, `contact:${e}`, t.result)), this.persist(), this.ui.tacticalRevision += 1, this.ui.progressionRevision += 1, t;
		},
		chooseProfession(e) {
			let t = tu(this.save, e);
			return t.ok && (this.appendStoryLog("progression", `专精切换：${e}`, t.result, `profession:${e}`), Ld(this.save, `profession:${e}`, t.result)), this.persist(), this.ui.progressionRevision += 1, t;
		},
		resolveOverlay(e) {
			let t = ru(this.save, e);
			return t.ok && (this.syncProgression(`overlay:${e}`), this.appendStoryLog("progression", `现实覆盖：${e}`, t.result, `overlay:${e}`, !0), Ld(this.save, `overlay:${e}`, t.result)), this.persist(), this.ui.progressionRevision += 1, t;
		},
		resolveBranch(e) {
			let t = au(this.save, e);
			return t.ok && (this.syncUnlocks(`branch:${e}`), this.syncProgression(`branch:${e}`), this.appendStoryLog("progression", `剧情分支：${e}`, t.result, `branch:${e}`, !0), Ld(this.save, `branch:${e}`, t.result)), this.persist(), this.ui.progressionRevision += 1, t;
		}
	}
}), zd = { class: "modal-panel activity-panel" }, Bd = { class: "economy-grid" }, Vd = { class: "activity-grid" }, Hd = { class: "route-board-title" }, Ud = ["disabled", "onClick"], Wd = { class: "route-board-section activity-log" }, Gd = {
	key: 0,
	class: "empty-state"
}, Kd = { class: "route-board-title" }, qd = /* @__PURE__ */ $n({
	__name: "ActivityPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.routeActivities), r = K(() => t.recentRouteActivityLog), i = K(() => t.save.routeEconomy), a = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码"
		}, o = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码",
			danger: "危险",
			trust: "信任",
			affection: "好感",
			artResonance: "艺术共鸣",
			unlockCg: "解锁CG",
			flag: "路线记录"
		};
		function s(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => `${a[e]} -${t}`);
			return t.length ? t.join(" / ") : "无";
		}
		function c(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => {
				let n = o[e];
				return typeof t == "number" ? `${n} ${t > 0 ? "+" : ""}${t}` : e === "flag" || e === "unlockCg" ? n : `${n} ${t}`;
			});
			return t.length ? t.join(" / ") : "无";
		}
		function l(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (e, a) => (U(), W("section", zd, [
			G("header", null, [G("div", null, [a[1] ||= G("h2", null, "路线行动", -1), G("p", null, P(B(t).routeLabel) + " · 可重复活动节点", 1)]), G("button", {
				type: "button",
				onClick: a[0] ||= (e) => B(t).ui.showActivityPanel = !1
			}, "关闭")]),
			G("div", Bd, [
				G("article", null, [a[2] ||= G("span", null, "冷静", -1), G("strong", null, P(i.value.composure), 1)]),
				G("article", null, [a[3] ||= G("span", null, "材料", -1), G("strong", null, P(i.value.materials), 1)]),
				G("article", null, [a[4] ||= G("span", null, "筹码", -1), G("strong", null, P(i.value.leverage), 1)]),
				G("article", null, [a[5] ||= G("span", null, "暴露", -1), G("strong", null, P(i.value.exposure), 1)])
			]),
			G("div", Vd, [(U(!0), W(H, null, V(n.value, (e) => (U(), W("article", {
				key: e.id,
				class: N({ locked: !e.available })
			}, [
				G("div", Hd, [G("strong", null, P(e.label), 1), G("span", null, P(e.available ? "可执行" : e.lockedReason), 1)]),
				G("p", null, P(e.detail), 1),
				G("dl", null, [
					a[6] ||= G("dt", null, "成本", -1),
					G("dd", null, P(s(e.cost)), 1),
					a[7] ||= G("dt", null, "收益", -1),
					G("dd", null, P(c(e.reward)), 1)
				]),
				G("button", {
					type: "button",
					disabled: !e.available,
					onClick: (n) => B(t).runActivity(e.id)
				}, "执行活动", 8, Ud)
			], 2))), 128))]),
			G("section", Wd, [
				a[8] ||= G("h3", null, "活动日志", -1),
				r.value.length ? na("", !0) : (U(), W("p", Gd, "尚未执行路线活动。")),
				(U(!0), W(H, null, V(r.value, (e) => (U(), W("article", { key: e.id }, [G("div", Kd, [G("strong", null, P(e.label), 1), G("span", null, P(l(e.createdAt)), 1)]), G("p", null, P(e.result), 1)]))), 128))
			])
		]));
	}
}), Jd = { class: "modal-panel event-ledger-panel" }, Yd = { class: "vector-grid" }, Xd = { class: "economy-grid" }, Zd = { class: "event-ledger-grid" }, Qd = { class: "route-board-section" }, $d = {
	key: 0,
	class: "empty-state"
}, ef = { class: "route-board-title" }, tf = { class: "mitigation-actions" }, nf = ["disabled", "onClick"], rf = { class: "route-board-section" }, af = {
	key: 0,
	class: "empty-state"
}, of = { class: "route-board-title" }, sf = { class: "route-board-section action-log-section" }, cf = {
	key: 0,
	class: "empty-state"
}, lf = { class: "route-board-title" }, uf = /* @__PURE__ */ $n({
	__name: "EventLedgerPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.save.relationshipVectors), r = K(() => t.save.routeEconomy), i = K(() => t.currentRouteEvents), a = K(() => t.recentReplayAnchors), o = K(() => t.recentRouteActionLog);
		return (e, s) => (U(), W("section", Jd, [
			G("header", null, [s[1] ||= G("div", null, [G("h2", null, "事件账本"), G("p", null, "关系向量 · 挂起事件 · 回放锚点")], -1), G("button", {
				type: "button",
				onClick: s[0] ||= (e) => B(t).ui.showEventLedger = !1
			}, "关闭")]),
			G("div", Yd, [
				G("article", null, [s[2] ||= G("span", null, "亲密", -1), G("strong", null, P(n.value.intimacy), 1)]),
				G("article", null, [s[3] ||= G("span", null, "依赖", -1), G("strong", null, P(n.value.reliance), 1)]),
				G("article", null, [s[4] ||= G("span", null, "执念", -1), G("strong", null, P(n.value.obsession), 1)]),
				G("article", null, [s[5] ||= G("span", null, "怀疑", -1), G("strong", null, P(n.value.suspicion), 1)])
			]),
			G("div", Xd, [
				G("article", null, [s[6] ||= G("span", null, "冷静", -1), G("strong", null, P(r.value.composure), 1)]),
				G("article", null, [s[7] ||= G("span", null, "材料", -1), G("strong", null, P(r.value.materials), 1)]),
				G("article", null, [s[8] ||= G("span", null, "筹码", -1), G("strong", null, P(r.value.leverage), 1)]),
				G("article", null, [s[9] ||= G("span", null, "暴露", -1), G("strong", null, P(r.value.exposure), 1)])
			]),
			G("div", Zd, [
				G("section", Qd, [
					s[10] ||= G("h3", null, "挂起事件", -1),
					i.value.length ? na("", !0) : (U(), W("p", $d, "当前路线暂无挂起事件。")),
					(U(!0), W(H, null, V(i.value, (e) => (U(), W("article", { key: e.id }, [
						G("div", ef, [G("strong", null, P(e.title), 1), G("span", null, P(e.pressure), 1)]),
						G("p", null, P(e.detail), 1),
						G("div", tf, [(U(!0), W(H, null, V(B(t).eventMitigations(e.id), (n) => (U(), W("button", {
							key: n.id,
							type: "button",
							disabled: !n.available,
							onClick: (r) => B(t).mitigateEvent(e.id, n.id)
						}, [G("b", null, P(n.label), 1), G("small", null, P(n.detail), 1)], 8, nf))), 128))])
					]))), 128))
				]),
				G("section", rf, [
					s[11] ||= G("h3", null, "回放锚点", -1),
					a.value.length ? na("", !0) : (U(), W("p", af, "完成一次选择后会写入回放锚点。")),
					(U(!0), W(H, null, V(a.value, (e) => (U(), W("article", { key: e.id }, [G("div", of, [G("strong", null, P(e.title), 1), G("span", null, P(e.cg ?? e.sceneId), 1)]), G("p", null, P(e.choiceId) + " · " + P(e.sceneId), 1)]))), 128))
				]),
				G("section", sf, [
					s[12] ||= G("h3", null, "行动日志", -1),
					o.value.length ? na("", !0) : (U(), W("p", cf, "尚未执行风险缓解行动。")),
					(U(!0), W(H, null, V(o.value, (e) => (U(), W("article", { key: e.id }, [G("div", lf, [G("strong", null, P(e.result), 1), G("span", null, P(e.actionId), 1)]), G("p", null, P(e.sceneId), 1)]))), 128))
				])
			])
		]));
	}
}), df = 1e3, ff = 1001, pf = 1002, mf = 1003, hf = 1004, gf = 1005, _f = 1006, vf = 1007, yf = 1008, bf = 1009, xf = 1010, Sf = 1011, Cf = 1012, wf = 1013, Tf = 1014, Ef = 1015, Df = 1016, Of = 1017, kf = 1018, Af = 1020, jf = 35902, Mf = 35899, Nf = 1021, Pf = 1022, Ff = 1023, If = 1026, Lf = 1027, Rf = 1028, zf = 1029, Bf = 1030, Vf = 1031, Hf = 1033, Uf = 33776, Wf = 33777, Gf = 33778, Kf = 33779, qf = 35840, Jf = 35841, Yf = 35842, Xf = 35843, Zf = 36196, Qf = 37492, $f = 37496, ep = 37488, tp = 37489, np = 37490, rp = 37491, ip = 37808, ap = 37809, op = 37810, sp = 37811, cp = 37812, lp = 37813, up = 37814, dp = 37815, fp = 37816, pp = 37817, mp = 37818, hp = 37819, gp = 37820, _p = 37821, vp = 36492, yp = 36494, bp = 36495, xp = 36283, Sp = 36284, Cp = 36285, wp = 36286, Tp = 2300, Ep = 2301, Dp = 2302, Op = 2303, kp = 2400, Ap = 2401, jp = 2402, Mp = 3200, Np = "srgb", Pp = "srgb-linear", Fp = "linear", Ip = "srgb", Lp = 7680, Rp = 35044, zp = 2e3;
function Bp(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function Vp(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Hp(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function Up() {
	let e = Hp("canvas");
	return e.style.display = "block", e;
}
var Wp = {}, Gp = null;
function Kp(...e) {
	let t = "THREE." + e.shift();
	Gp ? Gp("log", t, ...e) : console.log(t, ...e);
}
function qp(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function q(...e) {
	e = qp(e);
	let t = "THREE." + e.shift();
	if (Gp) Gp("warn", t, ...e);
	else {
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function J(...e) {
	e = qp(e);
	let t = "THREE." + e.shift();
	if (Gp) Gp("error", t, ...e);
	else {
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function Jp(...e) {
	let t = e.join(" ");
	t in Wp || (Wp[t] = !0, q(...e));
}
function Yp(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var Xp = {
	0: 1,
	2: 6,
	4: 7,
	3: 5,
	1: 0,
	6: 2,
	7: 4,
	5: 3
}, Zp = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, Qp = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), $p = Math.PI / 180, em = 180 / Math.PI;
function tm() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (Qp[e & 255] + Qp[e >> 8 & 255] + Qp[e >> 16 & 255] + Qp[e >> 24 & 255] + "-" + Qp[t & 255] + Qp[t >> 8 & 255] + "-" + Qp[t >> 16 & 15 | 64] + Qp[t >> 24 & 255] + "-" + Qp[n & 63 | 128] + Qp[n >> 8 & 255] + "-" + Qp[n >> 16 & 255] + Qp[n >> 24 & 255] + Qp[r & 255] + Qp[r >> 8 & 255] + Qp[r >> 16 & 255] + Qp[r >> 24 & 255]).toLowerCase();
}
function Y(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function nm(e, t) {
	return (e % t + t) % t;
}
function rm(e, t, n) {
	return (1 - n) * e + n * t;
}
function im(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return e / 4294967295;
		case Uint16Array: return e / 65535;
		case Uint8Array: return e / 255;
		case Int32Array: return Math.max(e / 2147483647, -1);
		case Int16Array: return Math.max(e / 32767, -1);
		case Int8Array: return Math.max(e / 127, -1);
		default: throw Error("Invalid component type.");
	}
}
function am(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return Math.round(e * 4294967295);
		case Uint16Array: return Math.round(e * 65535);
		case Uint8Array: return Math.round(e * 255);
		case Int32Array: return Math.round(e * 2147483647);
		case Int16Array: return Math.round(e * 32767);
		case Int8Array: return Math.round(e * 127);
		default: throw Error("Invalid component type.");
	}
}
var om = class e {
	static {
		e.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = Y(this.x, e.x, t.x), this.y = Y(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = Y(this.x, e, t), this.y = Y(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Y(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(Y(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, sm = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: q("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(Y(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, X = class e {
	static {
		e.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(lm.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(lm.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = Y(this.x, e.x, t.x), this.y = Y(this.y, e.y, t.y), this.z = Y(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = Y(this.x, e, t), this.y = Y(this.y, e, t), this.z = Y(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Y(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return cm.copy(this).projectOnVector(e), this.sub(cm);
	}
	reflect(e) {
		return this.sub(cm.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(Y(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, cm = /* @__PURE__ */ new X(), lm = /* @__PURE__ */ new sm(), Z = class e {
	static {
		e.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return this.premultiply(um.makeScale(e, t)), this;
	}
	rotate(e) {
		return this.premultiply(um.makeRotation(-e)), this;
	}
	translate(e, t) {
		return this.premultiply(um.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, um = /* @__PURE__ */ new Z(), dm = /* @__PURE__ */ new Z().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), fm = /* @__PURE__ */ new Z().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function pm() {
	let e = {
		enabled: !0,
		workingColorSpace: Pp,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n ? e : (this.spaces[t].transfer === "srgb" && (e.r = hm(e.r), e.g = hm(e.g), e.b = hm(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = gm(e.r), e.g = gm(e.g), e.b = gm(e.b)), e);
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? Fp : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		},
		fromWorkingColorSpace: function(t, n) {
			return Jp("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(t, n);
		},
		toWorkingColorSpace: function(t, n) {
			return Jp("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(t, n);
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[Pp]: {
			primaries: t,
			whitePoint: r,
			transfer: Fp,
			toXYZ: dm,
			fromXYZ: fm,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: Np },
			outputColorSpaceConfig: { drawingBufferColorSpace: Np }
		},
		[Np]: {
			primaries: t,
			whitePoint: r,
			transfer: Ip,
			toXYZ: dm,
			fromXYZ: fm,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: Np }
		}
	}), e;
}
var mm = /* @__PURE__ */ pm();
function hm(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function gm(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var _m, vm = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			_m === void 0 && (_m = Hp("canvas")), _m.width = e.width, _m.height = e.height;
			let t = _m.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = _m;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = Hp("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = hm(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		} else if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(hm(t[e] / 255) * 255) : t[e] = hm(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		} else return q("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, ym = 0, bm = class {
	constructor(e = null) {
		this.isSource = !0, Object.defineProperty(this, "id", { value: ym++ }), this.uuid = tm(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width, t.height, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(xm(r[t].image)) : e.push(xm(r[t]));
			} else e = xm(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function xm(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? vm.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (q("Texture: Unable to serialize Texture."), {});
}
var Sm = 0, Cm = /* @__PURE__ */ new X(), wm = class e extends Zp {
	constructor(t = e.DEFAULT_IMAGE, n = e.DEFAULT_MAPPING, r = ff, i = ff, a = _f, o = yf, s = Ff, c = bf, l = e.DEFAULT_ANISOTROPY, u = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Sm++ }), this.uuid = tm(), this.name = "", this.source = new bm(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = r, this.wrapT = i, this.magFilter = a, this.minFilter = o, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = c, this.offset = new om(0, 0), this.repeat = new om(1, 1), this.center = new om(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Z(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(Cm).x;
	}
	get height() {
		return this.source.getSize(Cm).y;
	}
	get depth() {
		return this.source.getSize(Cm).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				q(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				q(`Texture.setValues(): property '${t}' does not exist.`);
				continue;
			}
			r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(e) {
		if (this.mapping !== 300) return e;
		if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
			case df:
				e.x -= Math.floor(e.x);
				break;
			case ff:
				e.x = e.x < 0 ? 0 : 1;
				break;
			case pf:
				Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x -= Math.floor(e.x);
				break;
		}
		if (e.y < 0 || e.y > 1) switch (this.wrapT) {
			case df:
				e.y -= Math.floor(e.y);
				break;
			case ff:
				e.y = e.y < 0 ? 0 : 1;
				break;
			case pf:
				Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y -= Math.floor(e.y);
				break;
		}
		return this.flipY && (e.y = 1 - e.y), e;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
wm.DEFAULT_IMAGE = null, wm.DEFAULT_MAPPING = 300, wm.DEFAULT_ANISOTROPY = 1;
var Tm = class e {
	static {
		e.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = Y(this.x, e.x, t.x), this.y = Y(this.y, e.y, t.y), this.z = Y(this.z, e.z, t.z), this.w = Y(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = Y(this.x, e, t), this.y = Y(this.y, e, t), this.z = Y(this.z, e, t), this.w = Y(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(Y(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, Em = class extends Zp {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: _f,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new Tm(0, 0, e, t), this.scissorTest = !1, this.viewport = new Tm(0, 0, e, t), this.textures = [];
		let r = new wm({
			width: e,
			height: t,
			depth: n.depth
		}), i = n.count;
		for (let e = 0; e < i; e++) this.textures[e] = r.clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: _f,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new bm(n);
		}
		return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Dm = class extends Em {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, Om = class extends wm {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = mf, this.minFilter = mf, this.wrapR = ff, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, km = class extends wm {
	constructor(e = null, t = 1, n = 1, r = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: t,
			height: n,
			depth: r
		}, this.magFilter = mf, this.minFilter = mf, this.wrapR = ff, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Am = class e {
	static {
		e.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinant() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinant() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / jm.setFromMatrixColumn(e, 0).length(), i = 1 / jm.setFromMatrixColumn(e, 1).length(), a = 1 / jm.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(Nm, e, Pm);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return Lm.subVectors(e, t), Lm.lengthSq() === 0 && (Lm.z = 1), Lm.normalize(), Fm.crossVectors(n, Lm), Fm.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Lm.x += 1e-4 : Lm.z += 1e-4, Lm.normalize(), Fm.crossVectors(n, Lm)), Fm.normalize(), Im.crossVectors(Lm, Fm), r[0] = Fm.x, r[4] = Im.x, r[8] = Lm.x, r[1] = Fm.y, r[5] = Im.y, r[9] = Lm.y, r[2] = Fm.z, r[6] = Im.z, r[10] = Lm.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], ee = r[10], te = r[14], j = r[3], ne = r[7], M = r[11], re = r[15];
		return i[0] = a * x + o * T + s * k + c * j, i[4] = a * S + o * E + s * A + c * ne, i[8] = a * C + o * D + s * ee + c * M, i[12] = a * w + o * O + s * te + c * re, i[1] = l * x + u * T + d * k + f * j, i[5] = l * S + u * E + d * A + f * ne, i[9] = l * C + u * D + d * ee + f * M, i[13] = l * w + u * O + d * te + f * re, i[2] = p * x + m * T + h * k + g * j, i[6] = p * S + m * E + h * A + g * ne, i[10] = p * C + m * D + h * ee + g * M, i[14] = p * w + m * O + h * te + g * re, i[3] = _ * x + v * T + y * k + b * j, i[7] = _ * S + v * E + y * A + b * ne, i[11] = _ * C + v * D + y * ee + b * M, i[15] = _ * w + v * O + y * te + b * re, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinant();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = jm.set(r[0], r[1], r[2]).length(), o = jm.set(r[4], r[5], r[6]).length(), s = jm.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), Mm.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return Mm.elements[0] *= c, Mm.elements[1] *= c, Mm.elements[2] *= c, Mm.elements[4] *= l, Mm.elements[5] *= l, Mm.elements[6] *= l, Mm.elements[8] *= u, Mm.elements[9] *= u, Mm.elements[10] *= u, t.setFromRotationMatrix(Mm), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = zp, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = zp, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, jm = /* @__PURE__ */ new X(), Mm = /* @__PURE__ */ new Am(), Nm = /* @__PURE__ */ new X(0, 0, 0), Pm = /* @__PURE__ */ new X(1, 1, 1), Fm = /* @__PURE__ */ new X(), Im = /* @__PURE__ */ new X(), Lm = /* @__PURE__ */ new X(), Rm = /* @__PURE__ */ new Am(), zm = /* @__PURE__ */ new sm(), Bm = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(Y(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-Y(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(Y(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-Y(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(Y(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-Y(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: q("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return Rm.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Rm, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return zm.setFromEuler(this), this.setFromQuaternion(zm, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
Bm.DEFAULT_ORDER = "XYZ";
var Vm = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = (1 << e | 0) >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e | 0;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e | 0;
	}
	disable(e) {
		this.mask &= ~(1 << e | 0);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return (this.mask & (1 << e | 0)) != 0;
	}
}, Hm = 0, Um = /* @__PURE__ */ new X(), Wm = /* @__PURE__ */ new sm(), Gm = /* @__PURE__ */ new Am(), Km = /* @__PURE__ */ new X(), qm = /* @__PURE__ */ new X(), Jm = /* @__PURE__ */ new X(), Ym = /* @__PURE__ */ new sm(), Xm = /* @__PURE__ */ new X(1, 0, 0), Zm = /* @__PURE__ */ new X(0, 1, 0), Qm = /* @__PURE__ */ new X(0, 0, 1), $m = { type: "added" }, eh = { type: "removed" }, th = {
	type: "childadded",
	child: null
}, nh = {
	type: "childremoved",
	child: null
}, rh = class e extends Zp {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Hm++ }), this.uuid = tm(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new X(), n = new Bm(), r = new sm(), i = new X(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new Am() },
			normalMatrix: { value: new Z() }
		}), this.matrix = new Am(), this.matrixWorld = new Am(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Vm(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return Wm.setFromAxisAngle(e, t), this.quaternion.multiply(Wm), this;
	}
	rotateOnWorldAxis(e, t) {
		return Wm.setFromAxisAngle(e, t), this.quaternion.premultiply(Wm), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(Xm, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(Zm, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(Qm, e);
	}
	translateOnAxis(e, t) {
		return Um.copy(e).applyQuaternion(this.quaternion), this.position.add(Um.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(Xm, e);
	}
	translateY(e) {
		return this.translateOnAxis(Zm, e);
	}
	translateZ(e) {
		return this.translateOnAxis(Qm, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Gm.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? Km.copy(e) : Km.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), qm.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Gm.lookAt(qm, Km, this.up) : Gm.lookAt(Km, qm, this.up), this.quaternion.setFromRotationMatrix(Gm), r && (Gm.extractRotation(r.matrixWorld), Wm.setFromRotationMatrix(Gm), this.quaternion.premultiply(Wm.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (J("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent($m), th.child = e, this.dispatchEvent(th), th.child = null) : J("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(eh), nh.child = e, this.dispatchEvent(nh), nh.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), Gm.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Gm.multiply(e.parent.matrixWorld)), e.applyMatrix4(Gm), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent($m), th.child = e, this.dispatchEvent(th), th.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qm, e, Jm), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(qm, Ym, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t) {
		let n = this.parent;
		if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
			let e = this.children;
			for (let t = 0, n = e.length; t < n; t++) e[t].updateWorldMatrix(!1, !0);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
			let t = [];
			for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
			r.material = t;
		} else r.material = i(e.materials, this.material);
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
};
rh.DEFAULT_UP = /* @__PURE__ */ new X(0, 1, 0), rh.DEFAULT_MATRIX_AUTO_UPDATE = !0, rh.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var ih = class extends rh {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, ah = { type: "move" }, oh = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new ih(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new ih(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new X(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new X()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new ih(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new X(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new X(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(ah)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new ih();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, sh = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, ch = {
	h: 0,
	s: 0,
	l: 0
}, lh = {
	h: 0,
	s: 0,
	l: 0
};
function uh(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var dh = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = Np) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, mm.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = mm.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, mm.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = mm.workingColorSpace) {
		if (e = nm(e, 1), t = Y(t, 0, 1), n = Y(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = uh(i, r, e + 1 / 3), this.g = uh(i, r, e), this.b = uh(i, r, e - 1 / 3);
		}
		return mm.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = Np) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && q("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: q("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			q("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = Np) {
		let n = sh[e.toLowerCase()];
		return n === void 0 ? q("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = hm(e.r), this.g = hm(e.g), this.b = hm(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = gm(e.r), this.g = gm(e.g), this.b = gm(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = Np) {
		return mm.workingToColorSpace(fh.copy(this), e), Math.round(Y(fh.r * 255, 0, 255)) * 65536 + Math.round(Y(fh.g * 255, 0, 255)) * 256 + Math.round(Y(fh.b * 255, 0, 255));
	}
	getHexString(e = Np) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = mm.workingColorSpace) {
		mm.workingToColorSpace(fh.copy(this), t);
		let n = fh.r, r = fh.g, i = fh.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i:
					s = (n - r) / e + 4;
					break;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = mm.workingColorSpace) {
		return mm.workingToColorSpace(fh.copy(this), t), e.r = fh.r, e.g = fh.g, e.b = fh.b, e;
	}
	getStyle(e = Np) {
		mm.workingToColorSpace(fh.copy(this), e);
		let t = fh.r, n = fh.g, r = fh.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(ch), this.setHSL(ch.h + e, ch.s + t, ch.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(ch), e.getHSL(lh);
		let n = rm(ch.h, lh.h, t), r = rm(ch.s, lh.s, t), i = rm(ch.l, lh.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, fh = /* @__PURE__ */ new dh();
dh.NAMES = sh;
var ph = class extends rh {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Bm(), this.environmentIntensity = 1, this.environmentRotation = new Bm(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, mh = /* @__PURE__ */ new X(), hh = /* @__PURE__ */ new X(), gh = /* @__PURE__ */ new X(), _h = /* @__PURE__ */ new X(), vh = /* @__PURE__ */ new X(), yh = /* @__PURE__ */ new X(), bh = /* @__PURE__ */ new X(), xh = /* @__PURE__ */ new X(), Sh = /* @__PURE__ */ new X(), Ch = /* @__PURE__ */ new X(), wh = /* @__PURE__ */ new Tm(), Th = /* @__PURE__ */ new Tm(), Eh = /* @__PURE__ */ new Tm(), Dh = class e {
	constructor(e = new X(), t = new X(), n = new X()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), mh.subVectors(e, t), r.cross(mh);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		mh.subVectors(r, t), hh.subVectors(n, t), gh.subVectors(e, t);
		let a = mh.dot(mh), o = mh.dot(hh), s = mh.dot(gh), c = hh.dot(hh), l = hh.dot(gh), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, _h) === null ? !1 : _h.x >= 0 && _h.y >= 0 && _h.x + _h.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, _h) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, _h.x), s.addScaledVector(a, _h.y), s.addScaledVector(o, _h.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return wh.setScalar(0), Th.setScalar(0), Eh.setScalar(0), wh.fromBufferAttribute(e, t), Th.fromBufferAttribute(e, n), Eh.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(wh, i.x), a.addScaledVector(Th, i.y), a.addScaledVector(Eh, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return mh.subVectors(n, t), hh.subVectors(e, t), mh.cross(hh).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return mh.subVectors(this.c, this.b), hh.subVectors(this.a, this.b), mh.cross(hh).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		vh.subVectors(r, n), yh.subVectors(i, n), xh.subVectors(e, n);
		let s = vh.dot(xh), c = yh.dot(xh);
		if (s <= 0 && c <= 0) return t.copy(n);
		Sh.subVectors(e, r);
		let l = vh.dot(Sh), u = yh.dot(Sh);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0) return a = s / (s - l), t.copy(n).addScaledVector(vh, a);
		Ch.subVectors(e, i);
		let f = vh.dot(Ch), p = yh.dot(Ch);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(yh, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return bh.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(bh, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(vh, a).addScaledVector(yh, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, Oh = class {
	constructor(e = new X(Infinity, Infinity, Infinity), t = new X(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Ah.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Ah.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = Ah.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, Ah) : Ah.fromBufferAttribute(r, t), Ah.applyMatrix4(e.matrixWorld), this.expandByPoint(Ah);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), jh.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), jh.copy(e.boundingBox)), jh.applyMatrix4(e.matrixWorld), this.union(jh);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, Ah), Ah.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(Rh), zh.subVectors(this.max, Rh), Mh.subVectors(e.a, Rh), Nh.subVectors(e.b, Rh), Ph.subVectors(e.c, Rh), Fh.subVectors(Nh, Mh), Ih.subVectors(Ph, Nh), Lh.subVectors(Mh, Ph);
		let t = [
			0,
			-Fh.z,
			Fh.y,
			0,
			-Ih.z,
			Ih.y,
			0,
			-Lh.z,
			Lh.y,
			Fh.z,
			0,
			-Fh.x,
			Ih.z,
			0,
			-Ih.x,
			Lh.z,
			0,
			-Lh.x,
			-Fh.y,
			Fh.x,
			0,
			-Ih.y,
			Ih.x,
			0,
			-Lh.y,
			Lh.x,
			0
		];
		return !Hh(t, Mh, Nh, Ph, zh) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !Hh(t, Mh, Nh, Ph, zh)) ? !1 : (Bh.crossVectors(Fh, Ih), t = [
			Bh.x,
			Bh.y,
			Bh.z
		], Hh(t, Mh, Nh, Ph, zh));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, Ah).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Ah).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() ? this : (kh[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), kh[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), kh[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), kh[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), kh[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), kh[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), kh[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), kh[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(kh), this);
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, kh = [
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X(),
	/* @__PURE__ */ new X()
], Ah = /* @__PURE__ */ new X(), jh = /* @__PURE__ */ new Oh(), Mh = /* @__PURE__ */ new X(), Nh = /* @__PURE__ */ new X(), Ph = /* @__PURE__ */ new X(), Fh = /* @__PURE__ */ new X(), Ih = /* @__PURE__ */ new X(), Lh = /* @__PURE__ */ new X(), Rh = /* @__PURE__ */ new X(), zh = /* @__PURE__ */ new X(), Bh = /* @__PURE__ */ new X(), Vh = /* @__PURE__ */ new X();
function Hh(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		Vh.fromArray(e, a);
		let o = i.x * Math.abs(Vh.x) + i.y * Math.abs(Vh.y) + i.z * Math.abs(Vh.z), s = t.dot(Vh), c = n.dot(Vh), l = r.dot(Vh);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var Uh = /* @__PURE__ */ new X(), Wh = /* @__PURE__ */ new om(), Gh = 0, Kh = class extends Zp {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Gh++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = Rp, this.updateRanges = [], this.gpuType = Ef, this.version = 0;
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) Wh.fromBufferAttribute(this, t), Wh.applyMatrix3(e), this.setXY(t, Wh.x, Wh.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) Uh.fromBufferAttribute(this, t), Uh.applyMatrix3(e), this.setXYZ(t, Uh.x, Uh.y, Uh.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) Uh.fromBufferAttribute(this, t), Uh.applyMatrix4(e), this.setXYZ(t, Uh.x, Uh.y, Uh.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) Uh.fromBufferAttribute(this, t), Uh.applyNormalMatrix(e), this.setXYZ(t, Uh.x, Uh.y, Uh.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) Uh.fromBufferAttribute(this, t), Uh.transformDirection(e), this.setXYZ(t, Uh.x, Uh.y, Uh.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = im(n, this.array)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = am(n, this.array)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = im(t, this.array)), t;
	}
	setX(e, t) {
		return this.normalized && (t = am(t, this.array)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = im(t, this.array)), t;
	}
	setY(e, t) {
		return this.normalized && (t = am(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = im(t, this.array)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = am(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = im(t, this.array)), t;
	}
	setW(e, t) {
		return this.normalized && (t = am(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = am(t, this.array), n = am(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = am(t, this.array), n = am(n, this.array), r = am(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = am(t, this.array), n = am(n, this.array), r = am(r, this.array), i = am(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, qh = class extends Kh {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, Jh = class extends Kh {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, Yh = class extends Kh {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, Xh = /* @__PURE__ */ new Oh(), Zh = /* @__PURE__ */ new X(), Qh = /* @__PURE__ */ new X(), $h = class {
	constructor(e = new X(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? Xh.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		Zh.subVectors(e, this.center);
		let t = Zh.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(Zh, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Qh.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Zh.copy(e.center).add(Qh)), this.expandByPoint(Zh.copy(e.center).sub(Qh))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, eg = 0, tg = /* @__PURE__ */ new Am(), ng = /* @__PURE__ */ new rh(), rg = /* @__PURE__ */ new X(), ig = /* @__PURE__ */ new Oh(), ag = /* @__PURE__ */ new Oh(), og = /* @__PURE__ */ new X(), sg = class e extends Zp {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: eg++ }), this.uuid = tm(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {};
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return Array.isArray(e) ? this.index = new (Bp(e) ? Jh : qh)(e, 1) : this.index = e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new Z().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
	}
	applyQuaternion(e) {
		return tg.makeRotationFromQuaternion(e), this.applyMatrix4(tg), this;
	}
	rotateX(e) {
		return tg.makeRotationX(e), this.applyMatrix4(tg), this;
	}
	rotateY(e) {
		return tg.makeRotationY(e), this.applyMatrix4(tg), this;
	}
	rotateZ(e) {
		return tg.makeRotationZ(e), this.applyMatrix4(tg), this;
	}
	translate(e, t, n) {
		return tg.makeTranslation(e, t, n), this.applyMatrix4(tg), this;
	}
	scale(e, t, n) {
		return tg.makeScale(e, t, n), this.applyMatrix4(tg), this;
	}
	lookAt(e) {
		return ng.lookAt(e), ng.updateMatrix(), this.applyMatrix4(ng.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(rg).negate(), this.translate(rg.x, rg.y, rg.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new Yh(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && q("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Oh());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			J("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new X(-Infinity, -Infinity, -Infinity), new X(Infinity, Infinity, Infinity));
			return;
		}
		if (e !== void 0) {
			if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				ig.setFromBufferAttribute(n), this.morphTargetsRelative ? (og.addVectors(this.boundingBox.min, ig.min), this.boundingBox.expandByPoint(og), og.addVectors(this.boundingBox.max, ig.max), this.boundingBox.expandByPoint(og)) : (this.boundingBox.expandByPoint(ig.min), this.boundingBox.expandByPoint(ig.max));
			}
		} else this.boundingBox.makeEmpty();
		(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && J("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new $h());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			J("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new X(), Infinity);
			return;
		}
		if (e) {
			let n = this.boundingSphere.center;
			if (ig.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				ag.setFromBufferAttribute(n), this.morphTargetsRelative ? (og.addVectors(ig.min, ag.min), ig.expandByPoint(og), og.addVectors(ig.max, ag.max), ig.expandByPoint(og)) : (ig.expandByPoint(ag.min), ig.expandByPoint(ag.max));
			}
			ig.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) og.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(og));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) og.fromBufferAttribute(a, t), o && (rg.fromBufferAttribute(e, t), og.add(rg)), r = Math.max(r, n.distanceToSquared(og));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && J("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			J("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv;
		this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Kh(new Float32Array(4 * n.count), 4));
		let a = this.getAttribute("tangent"), o = [], s = [];
		for (let e = 0; e < n.count; e++) o[e] = new X(), s[e] = new X();
		let c = new X(), l = new X(), u = new X(), d = new om(), f = new om(), p = new om(), m = new X(), h = new X();
		function g(e, t, r) {
			c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), f.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), f.sub(d), p.sub(d);
			let a = 1 / (f.x * p.y - p.x * f.y);
			isFinite(a) && (m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a), h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a), o[e].add(m), o[t].add(m), o[r].add(m), s[e].add(h), s[t].add(h), s[r].add(h));
		}
		let _ = this.groups;
		_.length === 0 && (_ = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) g(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let v = new X(), y = new X(), b = new X(), x = new X();
		function S(e) {
			b.fromBufferAttribute(r, e), x.copy(b);
			let t = o[e];
			v.copy(t), v.sub(b.multiplyScalar(b.dot(t))).normalize(), y.crossVectors(x, t);
			let n = y.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, v.x, v.y, v.z, n);
		}
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) S(e.getX(t + 0)), S(e.getX(t + 1)), S(e.getX(t + 2));
		}
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0) n = new Kh(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new X(), i = new X(), a = new X(), o = new X(), s = new X(), c = new X(), l = new X(), u = new X();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) og.fromBufferAttribute(e, t), og.normalize(), e.setXYZ(t, og.x, og.y, og.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new Kh(a, r, i);
		}
		if (this.index === null) return q("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, cg = 0, lg = class extends Zp {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: cg++ }), this.uuid = tm(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new dh(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Lp, this.stencilZFail = Lp, this.stencilZPass = Lp, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				q(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				q(`Material: '${t}' is not a property of THREE.${this.type}.`);
				continue;
			}
			r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== Infinity && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, ug = /* @__PURE__ */ new X(), dg = /* @__PURE__ */ new X(), fg = /* @__PURE__ */ new X(), pg = /* @__PURE__ */ new X(), mg = /* @__PURE__ */ new X(), hg = /* @__PURE__ */ new X(), gg = /* @__PURE__ */ new X(), _g = class {
	constructor(e = new X(), t = new X(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, ug)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = ug.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (ug.copy(this.origin).addScaledVector(this.direction, t), ug.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		dg.copy(e).add(t).multiplyScalar(.5), fg.copy(t).sub(e).normalize(), pg.copy(this.origin).sub(dg);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(fg), o = pg.dot(this.direction), s = -pg.dot(fg), c = pg.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) if (d >= -p) if (d <= p) {
			let e = 1 / l;
			u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
		} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(dg).addScaledVector(fg, d), f;
	}
	intersectSphere(e, t) {
		ug.subVectors(e.center, this.origin);
		let n = ug.dot(this.direction), r = ug.dot(ug) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, ug) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		mg.subVectors(t, e), hg.subVectors(n, e), gg.crossVectors(mg, hg);
		let a = this.direction.dot(gg), o;
		if (a > 0) {
			if (r) return null;
			o = 1;
		} else if (a < 0) o = -1, a = -a;
		else return null;
		pg.subVectors(this.origin, e);
		let s = o * this.direction.dot(hg.crossVectors(pg, hg));
		if (s < 0) return null;
		let c = o * this.direction.dot(mg.cross(pg));
		if (c < 0 || s + c > a) return null;
		let l = -o * pg.dot(gg);
		return l < 0 ? null : this.at(l / a, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, vg = class extends lg {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new dh(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Bm(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, yg = /* @__PURE__ */ new Am(), bg = /* @__PURE__ */ new _g(), xg = /* @__PURE__ */ new $h(), Sg = /* @__PURE__ */ new X(), Cg = /* @__PURE__ */ new X(), wg = /* @__PURE__ */ new X(), Tg = /* @__PURE__ */ new X(), Eg = /* @__PURE__ */ new X(), Dg = /* @__PURE__ */ new X(), Og = /* @__PURE__ */ new X(), kg = /* @__PURE__ */ new X(), Ag = class extends rh {
	constructor(e = new sg(), t = new vg()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			Dg.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (Eg.fromBufferAttribute(s, e), a ? Dg.addScaledVector(Eg, r) : Dg.addScaledVector(Eg.sub(t), r));
			}
			t.add(Dg);
		}
		return t;
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), xg.copy(n.boundingSphere), xg.applyMatrix4(i), bg.copy(e.ray).recast(e.near), !(xg.containsPoint(bg.origin) === !1 && (bg.intersectSphere(xg, Sg) === null || bg.origin.distanceToSquared(Sg) > (e.far - e.near) ** 2)) && (yg.copy(i).invert(), bg.copy(e.ray).applyMatrix4(yg), !(n.boundingBox !== null && bg.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, bg)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
			let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
			for (let i = m, a = h; i < a; i += 3) {
				let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
				r = Mg(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
			}
		}
		else {
			let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
			for (let d = i, f = s; d < f; d += 3) {
				let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
				r = Mg(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
			}
		}
		else if (s !== void 0) if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
			let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
			for (let i = m, a = h; i < a; i += 3) {
				let a = i, s = i + 1, d = i + 2;
				r = Mg(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
			}
		}
		else {
			let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
			for (let s = i, d = o; s < d; s += 3) {
				let i = s, o = s + 1, d = s + 2;
				r = Mg(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
			}
		}
	}
};
function jg(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	kg.copy(s), kg.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(kg);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: kg.clone(),
		object: e
	};
}
function Mg(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, Cg), e.getVertexPosition(c, wg), e.getVertexPosition(l, Tg);
	let u = jg(e, t, n, r, Cg, wg, Tg, Og);
	if (u) {
		let e = new X();
		Dh.getBarycoord(Og, Cg, wg, Tg, e), i && (u.uv = Dh.getInterpolatedAttribute(i, s, c, l, e, new om())), a && (u.uv1 = Dh.getInterpolatedAttribute(a, s, c, l, e, new om())), o && (u.normal = Dh.getInterpolatedAttribute(o, s, c, l, e, new X()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new X(),
			materialIndex: 0
		};
		Dh.getNormal(Cg, wg, Tg, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var Ng = class extends wm {
	constructor(e = null, t = 1, n = 1, r, i, a, o, s, c = mf, l = mf, u, d) {
		super(null, a, o, s, c, l, r, i, u, d), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Pg = /* @__PURE__ */ new X(), Fg = /* @__PURE__ */ new X(), Ig = /* @__PURE__ */ new Z(), Lg = class {
	constructor(e = new X(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = Pg.subVectors(n, t).cross(Fg.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(Pg), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || Ig.getNormalMatrix(e), r = this.coplanarPoint(Pg).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Rg = /* @__PURE__ */ new $h(), zg = /* @__PURE__ */ new om(.5, .5), Bg = /* @__PURE__ */ new X(), Vg = class {
	constructor(e = new Lg(), t = new Lg(), n = new Lg(), r = new Lg(), i = new Lg(), a = new Lg()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = zp, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), Rg.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), Rg.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(Rg);
	}
	intersectsSprite(e) {
		return Rg.center.set(0, 0, 0), Rg.radius = .7071067811865476 + zg.distanceTo(e.center), Rg.applyMatrix4(e.matrixWorld), this.intersectsSphere(Rg);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (Bg.x = r.normal.x > 0 ? e.max.x : e.min.x, Bg.y = r.normal.y > 0 ? e.max.y : e.min.y, Bg.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Bg) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Hg = class extends lg {
	constructor(e) {
		super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new dh(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
	}
}, Ug = /* @__PURE__ */ new X(), Wg = /* @__PURE__ */ new X(), Gg = /* @__PURE__ */ new Am(), Kg = /* @__PURE__ */ new _g(), qg = /* @__PURE__ */ new $h(), Jg = /* @__PURE__ */ new X(), Yg = /* @__PURE__ */ new X(), Xg = class extends rh {
	constructor(e = new sg(), t = new Hg()) {
		super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [0];
			for (let e = 1, r = t.count; e < r; e++) Ug.fromBufferAttribute(t, e - 1), Wg.fromBufferAttribute(t, e), n[e] = n[e - 1], n[e] += Ug.distanceTo(Wg);
			e.setAttribute("lineDistance", new Yh(n, 1));
		} else q("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Line.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), qg.copy(n.boundingSphere), qg.applyMatrix4(r), qg.radius += i, e.ray.intersectsSphere(qg) === !1) return;
		Gg.copy(r).invert(), Kg.copy(e.ray).applyMatrix4(Gg);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = this.isLineSegments ? 2 : 1, l = n.index, u = n.attributes.position;
		if (l !== null) {
			let n = Math.max(0, a.start), r = Math.min(l.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = l.getX(i), r = l.getX(i + 1), a = Zg(this, e, Kg, s, n, r, i);
				a && t.push(a);
			}
			if (this.isLineLoop) {
				let i = l.getX(r - 1), a = l.getX(n), o = Zg(this, e, Kg, s, i, a, r - 1);
				o && t.push(o);
			}
		} else {
			let n = Math.max(0, a.start), r = Math.min(u.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = Zg(this, e, Kg, s, i, i + 1, i);
				n && t.push(n);
			}
			if (this.isLineLoop) {
				let i = Zg(this, e, Kg, s, r - 1, n, r - 1);
				i && t.push(i);
			}
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function Zg(e, t, n, r, i, a, o) {
	let s = e.geometry.attributes.position;
	if (Ug.fromBufferAttribute(s, i), Wg.fromBufferAttribute(s, a), n.distanceSqToSegment(Ug, Wg, Jg, Yg) > r) return;
	Jg.applyMatrix4(e.matrixWorld);
	let c = t.ray.origin.distanceTo(Jg);
	if (!(c < t.near || c > t.far)) return {
		distance: c,
		point: Yg.clone().applyMatrix4(e.matrixWorld),
		index: o,
		face: null,
		faceIndex: null,
		barycoord: null,
		object: e
	};
}
var Qg = /* @__PURE__ */ new X(), $g = /* @__PURE__ */ new X(), e_ = class extends Xg {
	constructor(e, t) {
		super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [];
			for (let e = 0, r = t.count; e < r; e += 2) Qg.fromBufferAttribute(t, e), $g.fromBufferAttribute(t, e + 1), n[e] = e === 0 ? 0 : n[e - 1], n[e + 1] = n[e] + Qg.distanceTo($g);
			e.setAttribute("lineDistance", new Yh(n, 1));
		} else q("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
}, t_ = class extends lg {
	constructor(e) {
		super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new dh(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, n_ = /* @__PURE__ */ new Am(), r_ = /* @__PURE__ */ new _g(), i_ = /* @__PURE__ */ new $h(), a_ = /* @__PURE__ */ new X(), o_ = class extends rh {
	constructor(e = new sg(), t = new t_()) {
		super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Points.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), i_.copy(n.boundingSphere), i_.applyMatrix4(r), i_.radius += i, e.ray.intersectsSphere(i_) === !1) return;
		n_.copy(r).invert(), r_.copy(e.ray).applyMatrix4(n_);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = n.index, l = n.attributes.position;
		if (c !== null) {
			let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) {
				let n = c.getX(a);
				a_.fromBufferAttribute(l, n), s_(a_, n, s, r, e, t, this);
			}
		} else {
			let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) a_.fromBufferAttribute(l, a), s_(a_, a, s, r, e, t, this);
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function s_(e, t, n, r, i, a, o) {
	let s = r_.distanceSqToPoint(e);
	if (s < n) {
		let n = new X();
		r_.closestPointToPoint(e, n), n.applyMatrix4(r);
		let c = i.ray.origin.distanceTo(n);
		if (c < i.near || c > i.far) return;
		a.push({
			distance: c,
			distanceToRay: Math.sqrt(s),
			point: n,
			index: t,
			face: null,
			faceIndex: null,
			barycoord: null,
			object: o
		});
	}
}
var c_ = class extends wm {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, l_ = class extends wm {
	constructor(e, t, n = Tf, r, i, a, o = mf, s = mf, c, l = If, u = 1) {
		if (l !== 1026 && l !== 1027) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: u
		}, r, i, a, o, s, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new bm(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
	}
}, u_ = class extends l_ {
	constructor(e, t = Tf, n = 301, r, i, a = mf, o = mf, s, c = If) {
		let l = {
			width: e,
			height: e,
			depth: 1
		}, u = [
			l,
			l,
			l,
			l,
			l,
			l
		];
		super(e, e, t, n, r, i, a, o, s, c), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, d_ = class extends wm {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, f_ = class e extends sg {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new Yh(c, 3)), this.setAttribute("normal", new Yh(l, 3)), this.setAttribute("uv", new Yh(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new X();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, p_ = class e extends sg {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new Yh(p, 3)), this.setAttribute("normal", new Yh(m, 3)), this.setAttribute("uv", new Yh(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
};
function m_(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (g_(i)) i.isRenderTargetTexture ? (q("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) if (g_(i[0])) {
				let e = [];
				for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
				t[n][r] = e;
			} else t[n][r] = i.slice();
			else t[n][r] = i;
		}
	}
	return t;
}
function h_(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = m_(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function g_(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function __(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function v_(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : mm.workingColorSpace;
}
var y_ = {
	clone: m_,
	merge: h_
}, b_ = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", x_ = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", S_ = class extends lg {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = b_, this.fragmentShader = x_, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = m_(e.uniforms), this.uniformsGroups = __(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
}, C_ = class extends S_ {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, w_ = class extends lg {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Mp, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, T_ = class extends lg {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function E_(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var D_ = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("call to abstract method");
	}
	intervalChanged_() {}
}, O_ = class extends D_ {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: kp,
			endingEnd: kp
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case Ap:
				i = e, o = 2 * t - n;
				break;
			case jp:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case Ap:
				a = e, s = 2 * n - t;
				break;
			case jp:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, k_ = class extends D_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, A_ = class extends D_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, j_ = class extends D_ {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.settings || this.DefaultSettings_, u = l.inTangents, d = l.outTangents;
		if (!u || !d) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let f = o * 2, p = e - 1;
		for (let l = 0; l !== o; ++l) {
			let o = a[c + l], m = a[s + l], h = p * f + l * 2, g = d[h], _ = d[h + 1], v = e * f + l * 2, y = u[v], b = u[v + 1], x = (n - t) / (r - t), S, C, w, T, E;
			for (let e = 0; e < 8; e++) {
				S = x * x, C = S * x, w = 1 - x, T = w * w, E = T * w;
				let e = E * t + 3 * T * x * g + 3 * w * S * y + C * r - n;
				if (Math.abs(e) < 1e-10) break;
				let i = 3 * T * (g - t) + 6 * w * x * (y - g) + 3 * S * (r - y);
				if (Math.abs(i) < 1e-10) break;
				x -= e / i, x = Math.max(0, Math.min(1, x));
			}
			i[l] = E * o + 3 * T * x * _ + 3 * w * S * b + C * m;
		}
		return i;
	}
}, M_ = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = E_(t, this.TimeBufferType), this.values = E_(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: E_(e.times, Array),
				values: E_(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t);
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new A_(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new k_(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new O_(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new j_(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.settings = this.settings), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case Tp:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case Ep:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case Dp:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case Op:
				t = this.InterpolantFactoryMethodBezier;
				break;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
			else throw Error(t);
			return q("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return Tp;
			case this.InterpolantFactoryMethodLinear: return Ep;
			case this.InterpolantFactoryMethodSmooth: return Dp;
			case this.InterpolantFactoryMethodBezier: return Op;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (J("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (J("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				J("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				J("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && Vp(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				J("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === Dp, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) if (r) i = !0;
			else {
				let e = o * n, r = e - n, a = e + n;
				for (let o = 0; o !== n; ++o) {
					let n = t[e + o];
					if (n !== t[r + o] || n !== t[a + o]) {
						i = !0;
						break;
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, r;
	}
};
M_.prototype.ValueTypeName = "", M_.prototype.TimeBufferType = Float32Array, M_.prototype.ValueBufferType = Float32Array, M_.prototype.DefaultInterpolation = Ep;
var N_ = class extends M_ {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
N_.prototype.ValueTypeName = "bool", N_.prototype.ValueBufferType = Array, N_.prototype.DefaultInterpolation = Tp, N_.prototype.InterpolantFactoryMethodLinear = void 0, N_.prototype.InterpolantFactoryMethodSmooth = void 0;
var P_ = class extends M_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
P_.prototype.ValueTypeName = "color";
var F_ = class extends M_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
F_.prototype.ValueTypeName = "number";
var I_ = class extends D_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) sm.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, L_ = class extends M_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new I_(this.times, this.values, this.getValueSize(), e);
	}
};
L_.prototype.ValueTypeName = "quaternion", L_.prototype.InterpolantFactoryMethodSmooth = void 0;
var R_ = class extends M_ {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
R_.prototype.ValueTypeName = "string", R_.prototype.ValueBufferType = Array, R_.prototype.DefaultInterpolation = Tp, R_.prototype.InterpolantFactoryMethodLinear = void 0, R_.prototype.InterpolantFactoryMethodSmooth = void 0;
var z_ = class extends M_ {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
z_.prototype.ValueTypeName = "vector";
var B_ = /* @__PURE__ */ new class {
	constructor(e, t, n) {
		let r = this, i = !1, a = 0, o = 0, s, c = [];
		this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(e) {
			o++, i === !1 && r.onStart !== void 0 && r.onStart(e, a, o), i = !0;
		}, this.itemEnd = function(e) {
			a++, r.onProgress !== void 0 && r.onProgress(e, a, o), a === o && (i = !1, r.onLoad !== void 0 && r.onLoad());
		}, this.itemError = function(e) {
			r.onError !== void 0 && r.onError(e);
		}, this.resolveURL = function(e) {
			return s ? s(e) : e;
		}, this.setURLModifier = function(e) {
			return s = e, this;
		}, this.addHandler = function(e, t) {
			return c.push(e, t), this;
		}, this.removeHandler = function(e) {
			let t = c.indexOf(e);
			return t !== -1 && c.splice(t, 2), this;
		}, this.getHandler = function(e) {
			for (let t = 0, n = c.length; t < n; t += 2) {
				let n = c[t], r = c[t + 1];
				if (n.global && (n.lastIndex = 0), n.test(e)) return r;
			}
			return null;
		}, this.abort = function() {
			return this.abortController.abort(), this._abortController = null, this;
		};
	}
	get abortController() {
		return this._abortController ||= new AbortController(), this._abortController;
	}
}(), V_ = class {
	constructor(e) {
		this.manager = e === void 0 ? B_ : e, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	load() {}
	loadAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.load(e, r, t, i);
		});
	}
	parse() {}
	setCrossOrigin(e) {
		return this.crossOrigin = e, this;
	}
	setWithCredentials(e) {
		return this.withCredentials = e, this;
	}
	setPath(e) {
		return this.path = e, this;
	}
	setResourcePath(e) {
		return this.resourcePath = e, this;
	}
	setRequestHeader(e) {
		return this.requestHeader = e, this;
	}
	abort() {
		return this;
	}
};
V_.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var H_ = /* @__PURE__ */ new X(), U_ = /* @__PURE__ */ new sm(), W_ = /* @__PURE__ */ new X(), G_ = class extends rh {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Am(), this.projectionMatrix = new Am(), this.projectionMatrixInverse = new Am(), this.coordinateSystem = zp, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(H_, U_, W_), W_.x === 1 && W_.y === 1 && W_.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(H_, U_, W_.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t) {
		super.updateWorldMatrix(e, t), this.matrixWorld.decompose(H_, U_, W_), W_.x === 1 && W_.y === 1 && W_.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(H_, U_, W_.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, K_ = /* @__PURE__ */ new X(), q_ = /* @__PURE__ */ new om(), J_ = /* @__PURE__ */ new om(), Y_ = class extends G_ {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = em * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan($p * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return em * 2 * Math.atan(Math.tan($p * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		K_.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(K_.x, K_.y).multiplyScalar(-e / K_.z), K_.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(K_.x, K_.y).multiplyScalar(-e / K_.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, q_, J_), t.subVectors(J_, q_);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan($p * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, X_ = class extends G_ {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, Z_ = -90, Q_ = 1, $_ = class extends rh {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new Y_(Z_, Q_, e, t);
		r.layers = this.layers, this.add(r);
		let i = new Y_(Z_, Q_, e, t);
		i.layers = this.layers, this.add(i);
		let a = new Y_(Z_, Q_, e, t);
		a.layers = this.layers, this.add(a);
		let o = new Y_(Z_, Q_, e, t);
		o.layers = this.layers, this.add(o);
		let s = new Y_(Z_, Q_, e, t);
		s.layers = this.layers, this.add(s);
		let c = new Y_(Z_, Q_, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.generateMipmaps;
		n.texture.generateMipmaps = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, ev = class extends Y_ {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
	}
}, tv = "\\[\\]\\.:\\/", nv = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), rv = "[^\\[\\]\\.:\\/]", iv = "[^" + tv.replace("\\.", "") + "]", av = /* @__PURE__ */ "((?:WC+[\\/:])*)".replace("WC", rv), ov = /* @__PURE__ */ "(WCOD+)?".replace("WCOD", iv), sv = /* @__PURE__ */ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", rv), cv = /* @__PURE__ */ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", rv), lv = RegExp("^" + av + ov + sv + cv + "$"), uv = [
	"material",
	"materials",
	"bones",
	"map"
], dv = class {
	constructor(e, t, n) {
		let r = n || fv.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, fv = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(nv, "");
	}
	static parseTrackName(e) {
		let t = lv.exec(e);
		if (t === null) throw Error("PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			uv.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			q("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						J("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						J("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						J("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						J("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						J("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						J("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					J("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			J("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					J("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					J("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
fv.Composite = dv, fv.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, fv.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, fv.prototype.GetterByBindingType = [
	fv.prototype._getValue_direct,
	fv.prototype._getValue_array,
	fv.prototype._getValue_arrayElement,
	fv.prototype._getValue_toArray
], fv.prototype.SetterByBindingTypeAndVersioning = [
	[
		fv.prototype._setValue_direct,
		fv.prototype._setValue_direct_setNeedsUpdate,
		fv.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		fv.prototype._setValue_array,
		fv.prototype._setValue_array_setNeedsUpdate,
		fv.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		fv.prototype._setValue_arrayElement,
		fv.prototype._setValue_arrayElement_setNeedsUpdate,
		fv.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		fv.prototype._setValue_fromArray,
		fv.prototype._setValue_fromArray_setNeedsUpdate,
		fv.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
], class e {
	static {
		e.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
};
function pv(e, t, n, r) {
	let i = mv(r);
	switch (n) {
		case Nf: return e * t;
		case Rf: return e * t / i.components * i.byteLength;
		case zf: return e * t / i.components * i.byteLength;
		case Bf: return e * t * 2 / i.components * i.byteLength;
		case Vf: return e * t * 2 / i.components * i.byteLength;
		case Pf: return e * t * 3 / i.components * i.byteLength;
		case Ff: return e * t * 4 / i.components * i.byteLength;
		case Hf: return e * t * 4 / i.components * i.byteLength;
		case Uf:
		case Wf: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case Gf:
		case Kf: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case Jf:
		case Xf: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case qf:
		case Yf: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case Zf:
		case Qf:
		case ep:
		case tp: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case $f:
		case np:
		case rp: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case ip: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case ap: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case op: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case sp: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case cp: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case lp: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case up: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case dp: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case fp: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case pp: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case mp: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case hp: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case gp: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case _p: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case vp:
		case yp:
		case bp: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case xp:
		case Sp: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case Cp:
		case wp: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function mv(e) {
	switch (e) {
		case bf:
		case xf: return {
			byteLength: 1,
			components: 1
		};
		case Cf:
		case Sf:
		case Df: return {
			byteLength: 2,
			components: 1
		};
		case Of:
		case kf: return {
			byteLength: 2,
			components: 4
		};
		case Tf:
		case wf:
		case Ef: return {
			byteLength: 4,
			components: 1
		};
		case jf:
		case Mf: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "184" } })), typeof window < "u" && (window.__THREE__ ? q("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "184");
//#endregion
//#region node_modules/three/build/three.module.js
function hv() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		n(t, a), r = e.requestAnimationFrame(i);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function gv(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var Q = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n		vec3 iridescenceFresnelDielectric;\n		vec3 iridescenceFresnelMetallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\nvec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;\n	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;\n	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;\n	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;\n	float Ess_V = dfgV.x + dfgV.y;\n	float Ess_L = dfgL.x + dfgL.y;\n	float Ems_V = 1.0 - Ess_V;\n	float Ems_L = 1.0 - Ess_L;\n	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;\n	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );\n	float compensationFactor = Ems_V * Ems_L;\n	vec3 multiScatter = Fms * compensationFactor;\n	return singleScatter + multiScatter;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#ifdef USE_LIGHT_PROBES_GRID\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );\n		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#ifdef USE_LIGHT_PROBES_GRID\nuniform highp sampler3D probesSH;\nuniform vec3 probesMin;\nuniform vec3 probesMax;\nuniform vec3 probesResolution;\nvec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 resMinusOne = res - 1.0;\n	vec3 probeSpacing = gridRange / resMinusOne;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );\n	uvw = uvw * resMinusOne / res + 0.5 / res;\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				float radius = shadowRadius * texelSize.x;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp -= shadowBias;\n			#else\n				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp += shadowBias;\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			vec2 sample0 = vogelDiskSample( 0, 5, phi );\n			vec2 sample1 = vogelDiskSample( 1, 5, phi );\n			vec2 sample2 = vogelDiskSample( 2, 5, phi );\n			vec2 sample3 = vogelDiskSample( 3, 5, phi );\n			vec2 sample4 = vogelDiskSample( 4, 5, phi );\n			shadow = (\n				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )\n			) * 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, $ = {
	common: {
		diffuse: { value: /* @__PURE__ */ new dh(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /* @__PURE__ */ new Z() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Z() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /* @__PURE__ */ new Z() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /* @__PURE__ */ new Z() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /* @__PURE__ */ new Z() },
		normalScale: { value: /* @__PURE__ */ new om(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /* @__PURE__ */ new Z() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /* @__PURE__ */ new Z() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /* @__PURE__ */ new dh(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: null },
		probesMin: { value: /* @__PURE__ */ new X() },
		probesMax: { value: /* @__PURE__ */ new X() },
		probesResolution: { value: /* @__PURE__ */ new X() }
	},
	points: {
		diffuse: { value: /* @__PURE__ */ new dh(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Z() },
		alphaTest: { value: 0 },
		uvTransform: { value: /* @__PURE__ */ new Z() }
	},
	sprite: {
		diffuse: { value: /* @__PURE__ */ new dh(16777215) },
		opacity: { value: 1 },
		center: { value: /* @__PURE__ */ new om(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /* @__PURE__ */ new Z() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /* @__PURE__ */ new Z() },
		alphaTest: { value: 0 }
	}
}, _v = {
	basic: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.fog
		]),
		vertexShader: Q.meshbasic_vert,
		fragmentShader: Q.meshbasic_frag
	},
	lambert: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /* @__PURE__ */ new dh(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshlambert_vert,
		fragmentShader: Q.meshlambert_frag
	},
	phong: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.specularmap,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /* @__PURE__ */ new dh(0) },
				specular: { value: /* @__PURE__ */ new dh(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshphong_vert,
		fragmentShader: Q.meshphong_frag
	},
	standard: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.envmap,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.roughnessmap,
			$.metalnessmap,
			$.fog,
			$.lights,
			{
				emissive: { value: /* @__PURE__ */ new dh(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Q.meshphysical_vert,
		fragmentShader: Q.meshphysical_frag
	},
	toon: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.aomap,
			$.lightmap,
			$.emissivemap,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.gradientmap,
			$.fog,
			$.lights,
			{ emissive: { value: /* @__PURE__ */ new dh(0) } }
		]),
		vertexShader: Q.meshtoon_vert,
		fragmentShader: Q.meshtoon_frag
	},
	matcap: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			$.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: Q.meshmatcap_vert,
		fragmentShader: Q.meshmatcap_frag
	},
	points: {
		uniforms: /* @__PURE__ */ h_([$.points, $.fog]),
		vertexShader: Q.points_vert,
		fragmentShader: Q.points_frag
	},
	dashed: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: Q.linedashed_vert,
		fragmentShader: Q.linedashed_frag
	},
	depth: {
		uniforms: /* @__PURE__ */ h_([$.common, $.displacementmap]),
		vertexShader: Q.depth_vert,
		fragmentShader: Q.depth_frag
	},
	normal: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.bumpmap,
			$.normalmap,
			$.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: Q.meshnormal_vert,
		fragmentShader: Q.meshnormal_frag
	},
	sprite: {
		uniforms: /* @__PURE__ */ h_([$.sprite, $.fog]),
		vertexShader: Q.sprite_vert,
		fragmentShader: Q.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /* @__PURE__ */ new Z() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: Q.background_vert,
		fragmentShader: Q.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /* @__PURE__ */ new Z() }
		},
		vertexShader: Q.backgroundCube_vert,
		fragmentShader: Q.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: Q.cube_vert,
		fragmentShader: Q.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: Q.equirect_vert,
		fragmentShader: Q.equirect_frag
	},
	distance: {
		uniforms: /* @__PURE__ */ h_([
			$.common,
			$.displacementmap,
			{
				referencePosition: { value: /* @__PURE__ */ new X() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: Q.distance_vert,
		fragmentShader: Q.distance_frag
	},
	shadow: {
		uniforms: /* @__PURE__ */ h_([
			$.lights,
			$.fog,
			{
				color: { value: /* @__PURE__ */ new dh(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: Q.shadow_vert,
		fragmentShader: Q.shadow_frag
	}
};
_v.physical = {
	uniforms: /* @__PURE__ */ h_([_v.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /* @__PURE__ */ new Z() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Z() },
		clearcoatNormalScale: { value: /* @__PURE__ */ new om(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Z() },
		dispersion: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /* @__PURE__ */ new Z() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Z() },
		sheen: { value: 0 },
		sheenColor: { value: /* @__PURE__ */ new dh(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /* @__PURE__ */ new Z() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Z() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /* @__PURE__ */ new Z() },
		transmissionSamplerSize: { value: /* @__PURE__ */ new om() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /* @__PURE__ */ new Z() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /* @__PURE__ */ new dh(0) },
		specularColor: { value: /* @__PURE__ */ new dh(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /* @__PURE__ */ new Z() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /* @__PURE__ */ new Z() },
		anisotropyVector: { value: /* @__PURE__ */ new om() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /* @__PURE__ */ new Z() }
	}]),
	vertexShader: Q.meshphysical_vert,
	fragmentShader: Q.meshphysical_frag
};
var vv = {
	r: 0,
	b: 0,
	g: 0
}, yv = /* @__PURE__ */ new Am(), bv = /* @__PURE__ */ new Z();
bv.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function xv(e, t, n, r, i, a) {
	let o = new dh(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && (i.isCubeTexture || i.mapping === 306) ? (l === void 0 && (l = new Ag(new f_(1, 1, 1), new S_({
			name: "BackgroundCubeMaterial",
			uniforms: m_(_v.backgroundCube.uniforms),
			vertexShader: _v.backgroundCube.vertexShader,
			fragmentShader: _v.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(yv.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isCubeTexture && i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(bv), l.material.toneMapped = mm.getTransfer(i.colorSpace) !== Ip, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new Ag(new p_(2, 2), new S_({
			name: "BackgroundMaterial",
			uniforms: m_(_v.background.uniforms),
			vertexShader: _v.background.vertexShader,
			fragmentShader: _v.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = mm.getTransfer(i.colorSpace) !== Ip, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(vv, v_(e)), n.buffers.color.setClear(vv.r, vv.g, vv.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function Sv(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.stride, p = s.offset;
						if (t.isInstancedInterleavedBuffer) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function Cv(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function wv(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return !(t !== 1023 && r.convert(t) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && n !== 1015 && !i);
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (q("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.logarithmicDepthBuffer === !0, f = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
	n.reversedDepthBuffer === !0 && f === !1 && q("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: d,
		reversedDepthBuffer: f,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function Tv(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new Lg(), s = new Z(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var Ev = 4, Dv = [
	.125,
	.215,
	.35,
	.446,
	.526,
	.582
], Ov = 20, kv = 256, Av = /* @__PURE__ */ new X_(), jv = /* @__PURE__ */ new dh(), Mv = null, Nv = 0, Pv = 0, Fv = !1, Iv = /* @__PURE__ */ new X(), Lv = class {
	constructor(e) {
		this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = Iv } = i;
		Mv = this._renderer.getRenderTarget(), Nv = this._renderer.getActiveCubeFace(), Pv = this._renderer.getActiveMipmapLevel(), Fv = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
		let s = this._allocateTargets();
		return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = Wv(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = Uv(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
	}
	_setSize(e) {
		this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = 2 ** this._lodMax;
	}
	_dispose() {
		this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
		for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
	}
	_cleanup(e) {
		this._renderer.setRenderTarget(Mv, Nv, Pv), this._renderer.xr.enabled = Fv, e.scissorTest = !1, Bv(e, 0, 0, e.width, e.height);
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Mv = this._renderer.getRenderTarget(), Nv = this._renderer.getActiveCubeFace(), Pv = this._renderer.getActiveMipmapLevel(), Fv = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
		let n = t || this._allocateTargets();
		return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
	}
	_allocateTargets() {
		let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
			magFilter: _f,
			minFilter: _f,
			generateMipmaps: !1,
			type: Df,
			format: Ff,
			colorSpace: Pp,
			depthBuffer: !1
		}, r = zv(e, t, n);
		if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
			this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = zv(e, t, n);
			let { _lodMax: r } = this;
			({lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas} = Rv(r)), this._blurMaterial = Hv(r, e, t), this._ggxMaterial = Vv(r, e, t);
		}
		return r;
	}
	_compileMaterial(e) {
		let t = new Ag(new sg(), e);
		this._renderer.compile(t, Av);
	}
	_sceneToCubeUV(e, t, n, r, i) {
		let a = new Y_(90, 1, t, n), o = [
			1,
			-1,
			1,
			1,
			1,
			1
		], s = [
			1,
			1,
			1,
			-1,
			-1,
			-1
		], c = this._renderer, l = c.autoClear, u = c.toneMapping;
		c.getClearColor(jv), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(r), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Ag(new f_(), new vg({
			name: "PMREM.Background",
			side: 1,
			depthWrite: !1,
			depthTest: !1
		})));
		let d = this._backgroundBox, f = d.material, p = !1, m = e.background;
		m ? m.isColor && (f.color.copy(m), e.background = null, p = !0) : (f.color.copy(jv), p = !0);
		for (let t = 0; t < 6; t++) {
			let n = t % 3;
			n === 0 ? (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x + s[t], i.y, i.z)) : n === 1 ? (a.up.set(0, 0, o[t]), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y + s[t], i.z)) : (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y, i.z + s[t]));
			let l = this._cubeSize;
			Bv(r, n * l, t > 2 ? l : 0, l, l), c.setRenderTarget(r), p && c.render(d, a), c.render(e, a);
		}
		c.toneMapping = u, c.autoClear = l, e.background = m;
	}
	_textureToCubeUV(e, t) {
		let n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
		r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wv()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Uv());
		let i = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
		a.material = i;
		let o = i.uniforms;
		o.envMap.value = e;
		let s = this._cubeSize;
		Bv(t, 0, 0, 3 * s, 2 * s), n.setRenderTarget(t), n.render(a, Av);
	}
	_applyPMREM(e) {
		let t = this._renderer, n = t.autoClear;
		t.autoClear = !1;
		let r = this._lodMeshes.length;
		for (let t = 1; t < r; t++) this._applyGGXFilter(e, t - 1, t);
		t.autoClear = n;
	}
	_applyGGXFilter(e, t, n) {
		let r = this._renderer, i = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
		o.material = a;
		let s = a.uniforms, c = n / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - l * l) * (0 + c * 1.25), { _lodMax: d } = this, f = this._sizeLods[n], p = 3 * f * (n > d - Ev ? n - d + Ev : 0), m = 4 * (this._cubeSize - f);
		s.envMap.value = e.texture, s.roughness.value = u, s.mipInt.value = d - t, Bv(i, p, m, 3 * f, 2 * f), r.setRenderTarget(i), r.render(o, Av), s.envMap.value = i.texture, s.roughness.value = 0, s.mipInt.value = d - n, Bv(e, p, m, 3 * f, 2 * f), r.setRenderTarget(e), r.render(o, Av);
	}
	_blur(e, t, n, r, i) {
		let a = this._pingPongRenderTarget;
		this._halfBlur(e, a, t, n, r, "latitudinal", i), this._halfBlur(a, e, n, n, r, "longitudinal", i);
	}
	_halfBlur(e, t, n, r, i, a, o) {
		let s = this._renderer, c = this._blurMaterial;
		a !== "latitudinal" && a !== "longitudinal" && J("blur direction must be either latitudinal or longitudinal!");
		let l = this._lodMeshes[r];
		l.material = c;
		let u = c.uniforms, d = this._sizeLods[n] - 1, f = isFinite(i) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * Ov - 1), p = i / f, m = isFinite(i) ? 1 + Math.floor(3 * p) : Ov;
		m > Ov && q(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ov}`);
		let h = [], g = 0;
		for (let e = 0; e < Ov; ++e) {
			let t = e / p, n = Math.exp(-t * t / 2);
			h.push(n), e === 0 ? g += n : e < m && (g += 2 * n);
		}
		for (let e = 0; e < h.length; e++) h[e] = h[e] / g;
		u.envMap.value = e.texture, u.samples.value = m, u.weights.value = h, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
		let { _lodMax: _ } = this;
		u.dTheta.value = f, u.mipInt.value = _ - n;
		let v = this._sizeLods[r];
		Bv(t, 3 * v * (r > _ - Ev ? r - _ + Ev : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), s.setRenderTarget(t), s.render(l, Av);
	}
};
function Rv(e) {
	let t = [], n = [], r = [], i = e, a = e - Ev + 1 + Dv.length;
	for (let o = 0; o < a; o++) {
		let a = 2 ** i;
		t.push(a);
		let s = 1 / a;
		o > e - Ev ? s = Dv[o - e + Ev - 1] : o === 0 && (s = 0), n.push(s);
		let c = 1 / (a - 2), l = -c, u = 1 + c, d = [
			l,
			l,
			u,
			l,
			u,
			u,
			l,
			l,
			u,
			u,
			l,
			u
		], f = new Float32Array(108), p = new Float32Array(72), m = new Float32Array(36);
		for (let e = 0; e < 6; e++) {
			let t = e % 3 * 2 / 3 - 1, n = e > 2 ? 0 : -1, r = [
				t,
				n,
				0,
				t + 2 / 3,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n + 1,
				0
			];
			f.set(r, 18 * e), p.set(d, 12 * e);
			let i = [
				e,
				e,
				e,
				e,
				e,
				e
			];
			m.set(i, 6 * e);
		}
		let h = new sg();
		h.setAttribute("position", new Kh(f, 3)), h.setAttribute("uv", new Kh(p, 2)), h.setAttribute("faceIndex", new Kh(m, 1)), r.push(new Ag(h, null)), i > Ev && i--;
	}
	return {
		lodMeshes: r,
		sizeLods: t,
		sigmas: n
	};
}
function zv(e, t, n) {
	let r = new Dm(e, t, n);
	return r.texture.mapping = 306, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r;
}
function Bv(e, t, n, r, i) {
	e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i);
}
function Vv(e, t, n) {
	return new S_({
		name: "PMREMGGXConvolution",
		defines: {
			GGX_SAMPLES: kv,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			roughness: { value: 0 },
			mipInt: { value: 0 }
		},
		vertexShader: Gv(),
		fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float roughness;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n\n			// Van der Corput radical inverse\n			float radicalInverse_VdC(uint bits) {\n				bits = (bits << 16u) | (bits >> 16u);\n				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n				return float(bits) * 2.3283064365386963e-10; // / 0x100000000\n			}\n\n			// Hammersley sequence\n			vec2 hammersley(uint i, uint N) {\n				return vec2(float(i) / float(N), radicalInverse_VdC(i));\n			}\n\n			// GGX VNDF importance sampling (Eric Heitz 2018)\n			// \"Sampling the GGX Distribution of Visible Normals\"\n			// https://jcgt.org/published/0007/04/01/\n			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n				float alpha = roughness * roughness;\n\n				// Section 4.1: Orthonormal basis\n				vec3 T1 = vec3(1.0, 0.0, 0.0);\n				vec3 T2 = cross(V, T1);\n\n				// Section 4.2: Parameterization of projected area\n				float r = sqrt(Xi.x);\n				float phi = 2.0 * PI * Xi.y;\n				float t1 = r * cos(phi);\n				float t2 = r * sin(phi);\n				float s = 0.5 * (1.0 + V.z);\n				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n				// Section 4.3: Reprojection onto hemisphere\n				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;\n\n				// Section 3.4: Transform back to ellipsoid configuration\n				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n			}\n\n			void main() {\n				vec3 N = normalize(vOutputDirection);\n				vec3 V = N; // Assume view direction equals normal for pre-filtering\n\n				vec3 prefilteredColor = vec3(0.0);\n				float totalWeight = 0.0;\n\n				// For very low roughness, just sample the environment directly\n				if (roughness < 0.001) {\n					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n					return;\n				}\n\n				// Tangent space basis for VNDF sampling\n				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n				vec3 tangent = normalize(cross(up, N));\n				vec3 bitangent = cross(N, tangent);\n\n				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n					// Transform H back to world space\n					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n					vec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n					float NdotL = max(dot(N, L), 0.0);\n\n					if(NdotL > 0.0) {\n						// Sample environment at fixed mip level\n						// VNDF importance sampling handles the distribution filtering\n						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n						// Weight by NdotL for the split-sum approximation\n						// VNDF PDF naturally accounts for the visible microfacet distribution\n						prefilteredColor += sampleColor * NdotL;\n						totalWeight += NdotL;\n					}\n				}\n\n				if (totalWeight > 0.0) {\n					prefilteredColor = prefilteredColor / totalWeight;\n				}\n\n				gl_FragColor = vec4(prefilteredColor, 1.0);\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Hv(e, t, n) {
	let r = new Float32Array(Ov), i = new X(0, 1, 0);
	return new S_({
		name: "SphericalGaussianBlur",
		defines: {
			n: Ov,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			samples: { value: 1 },
			weights: { value: r },
			latitudinal: { value: !1 },
			dTheta: { value: 0 },
			mipInt: { value: 0 },
			poleAxis: { value: i }
		},
		vertexShader: Gv(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform int samples;\n			uniform float weights[ n ];\n			uniform bool latitudinal;\n			uniform float dTheta;\n			uniform float mipInt;\n			uniform vec3 poleAxis;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			vec3 getSample( float theta, vec3 axis ) {\n\n				float cosTheta = cos( theta );\n				// Rodrigues' axis-angle rotation\n				vec3 sampleDirection = vOutputDirection * cosTheta\n					+ cross( axis, vOutputDirection ) * sin( theta )\n					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n				return bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n			}\n\n			void main() {\n\n				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n				}\n\n				axis = normalize( axis );\n\n				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n				for ( int i = 1; i < n; i++ ) {\n\n					if ( i >= samples ) {\n\n						break;\n\n					}\n\n					float theta = dTheta * float( i );\n					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n				}\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Uv() {
	return new S_({
		name: "EquirectangularToCubeUV",
		uniforms: { envMap: { value: null } },
		vertexShader: Gv(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Wv() {
	return new S_({
		name: "CubemapToCubeUV",
		uniforms: {
			envMap: { value: null },
			flipEnvMap: { value: -1 }
		},
		vertexShader: Gv(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function Gv() {
	return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute float faceIndex;\n\n		varying vec3 vOutputDirection;\n\n		// RH coordinate system; PMREM face-indexing convention\n		vec3 getDirection( vec2 uv, float face ) {\n\n			uv = 2.0 * uv - 1.0;\n\n			vec3 direction = vec3( uv, 1.0 );\n\n			if ( face == 0.0 ) {\n\n				direction = direction.zyx; // ( 1, v, u ) pos x\n\n			} else if ( face == 1.0 ) {\n\n				direction = direction.xzy;\n				direction.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n			} else if ( face == 2.0 ) {\n\n				direction.x *= -1.0; // ( -u, v, 1 ) pos z\n\n			} else if ( face == 3.0 ) {\n\n				direction = direction.zyx;\n				direction.xz *= -1.0; // ( -1, v, -u ) neg x\n\n			} else if ( face == 4.0 ) {\n\n				direction = direction.xzy;\n				direction.xy *= -1.0; // ( -u, -1, v ) neg y\n\n			} else if ( face == 5.0 ) {\n\n				direction.z *= -1.0; // ( u, v, -1 ) neg z\n\n			}\n\n			return direction;\n\n		}\n\n		void main() {\n\n			vOutputDirection = getDirection( uv, faceIndex );\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
}
var Kv = class extends Dm {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new c_(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new f_(5, 5, 5), i = new S_({
			name: "CubemapFromEquirect",
			uniforms: m_(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		i.uniforms.tEquirect.value = t;
		let a = new Ag(r, i), o = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = _f), new $_(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
};
function qv(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) if (t.has(n)) {
				let e = t.get(n).texture;
				return s(e, n.mapping);
			} else {
				let r = n.image;
				if (r && r.height > 0) {
					let i = new Kv(r.height);
					return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
				} else return null;
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new Lv(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new Lv(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function Jv(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && Jp("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function Yv(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap();
	function o(e) {
		let s = e.target;
		s.index !== null && t.remove(s.index);
		for (let e in s.attributes) t.remove(s.attributes[e]);
		s.removeEventListener("dispose", o), delete i[s.id];
		let c = a.get(s);
		c && (t.remove(c), a.delete(s)), r.releaseStatesOfGeometry(s), s.isInstancedBufferGeometry === !0 && delete s._maxInstanceCount, n.memory.geometries--;
	}
	function s(e, t) {
		return i[t.id] === !0 ? t : (t.addEventListener("dispose", o), i[t.id] = !0, n.memory.geometries++, t);
	}
	function c(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function l(e) {
		let n = [], r = e.index, i = e.attributes.position, o = 0;
		if (i === void 0) return;
		if (r !== null) {
			let e = r.array;
			o = r.version;
			for (let t = 0, r = e.length; t < r; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				n.push(r, i, i, a, a, r);
			}
		} else {
			let e = i.array;
			o = i.version;
			for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
				let e = t + 0, r = t + 1, i = t + 2;
				n.push(e, r, r, i, i, e);
			}
		}
		let s = new (i.count >= 65535 ? Jh : qh)(n, 1);
		s.version = o;
		let c = a.get(e);
		c && t.remove(c), a.set(e, s);
	}
	function u(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && l(e);
		} else l(e);
		return a.get(e);
	}
	return {
		get: s,
		update: c,
		getWireframeAttribute: u
	};
}
function Xv(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function Zv(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default:
				J("WebGLInfo: Unknown draw mode:", r);
				break;
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function Qv(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new Tm();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, l = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = l === void 0 ? 0 : l.length, d = r.get(o);
		if (d === void 0 || d.count !== u) {
			d !== void 0 && d.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], l = o.morphAttributes.color || [], f = 0;
			e === !0 && (f = 1), n === !0 && (f = 2), a === !0 && (f = 3);
			let p = o.attributes.position.count * f, m = 1;
			p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
			let h = new Float32Array(p * m * 4 * u), g = new Om(h, p, m, u);
			g.type = Ef, g.needsUpdate = !0;
			let _ = f * 4;
			for (let t = 0; t < u; t++) {
				let r = s[t], o = c[t], u = l[t], d = p * m * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * _;
					e === !0 && (i.fromBufferAttribute(r, t), h[d + s + 0] = i.x, h[d + s + 1] = i.y, h[d + s + 2] = i.z, h[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), h[d + s + 4] = i.x, h[d + s + 5] = i.y, h[d + s + 6] = i.z, h[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(u, t), h[d + s + 8] = i.x, h[d + s + 9] = i.y, h[d + s + 10] = i.z, h[d + s + 11] = u.itemSize === 4 ? i.w : 1);
				}
			}
			d = {
				count: u,
				texture: g,
				size: new om(p, m)
			}, r.set(o, d);
			function v() {
				g.dispose(), r.delete(o), o.removeEventListener("dispose", v);
			}
			o.addEventListener("dispose", v);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", d.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", d.size);
	}
	return { update: a };
}
function $v(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var ey = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function ty(e, t, n, r, i) {
	let a = new Dm(t, n, {
		type: e,
		depthBuffer: r,
		stencilBuffer: i,
		depthTexture: r ? new l_(t, n) : void 0
	}), o = new Dm(t, n, {
		type: Df,
		depthBuffer: !1,
		stencilBuffer: !1
	}), s = new sg();
	s.setAttribute("position", new Yh([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), s.setAttribute("uv", new Yh([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let c = new C_({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), l = new Ag(s, c), u = new X_(-1, 1, 1, -1, 0, 1), d = null, f = null, p = !1, m, h = null, g = [], _ = !1;
	this.setSize = function(e, t) {
		a.setSize(e, t), o.setSize(e, t);
		for (let n = 0; n < g.length; n++) {
			let r = g[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		g = e, _ = g.length > 0 && g[0].isRenderPass === !0;
		let t = a.width, n = a.height;
		for (let e = 0; e < g.length; e++) {
			let r = g[e];
			r.setSize && r.setSize(t, n);
		}
	}, this.begin = function(e, t) {
		if (p || e.toneMapping === 0 && g.length === 0) return !1;
		if (h = t, t !== null) {
			let e = t.width, n = t.height;
			(a.width !== e || a.height !== n) && this.setSize(e, n);
		}
		return _ === !1 && e.setRenderTarget(a), m = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return _;
	}, this.end = function(e, t) {
		e.toneMapping = m, p = !0;
		let n = a, r = o;
		for (let i = 0; i < g.length; i++) {
			let a = g[i];
			if (a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1)) {
				let e = n;
				n = r, r = e;
			}
		}
		if (d !== e.outputColorSpace || f !== e.toneMapping) {
			d = e.outputColorSpace, f = e.toneMapping, c.defines = {}, mm.getTransfer(d) === "srgb" && (c.defines.SRGB_TRANSFER = "");
			let t = ey[f];
			t && (c.defines[t] = ""), c.needsUpdate = !0;
		}
		c.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(h), e.render(l, u), h = null, p = !1;
	}, this.isCompositing = function() {
		return p;
	}, this.dispose = function() {
		a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), s.dispose(), c.dispose();
	};
}
var ny = /* @__PURE__ */ new wm(), ry = /* @__PURE__ */ new l_(1, 1), iy = /* @__PURE__ */ new Om(), ay = /* @__PURE__ */ new km(), oy = /* @__PURE__ */ new c_(), sy = [], cy = [], ly = new Float32Array(16), uy = new Float32Array(9), dy = new Float32Array(4);
function fy(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = sy[i];
	if (a === void 0 && (a = new Float32Array(i), sy[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function py(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function my(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function hy(e, t) {
	let n = cy[t];
	n === void 0 && (n = new Int32Array(t), cy[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function gy(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function _y(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (py(n, t)) return;
		e.uniform2fv(this.addr, t), my(n, t);
	}
}
function vy(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (py(n, t)) return;
		e.uniform3fv(this.addr, t), my(n, t);
	}
}
function yy(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (py(n, t)) return;
		e.uniform4fv(this.addr, t), my(n, t);
	}
}
function by(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (py(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), my(n, t);
	} else {
		if (py(n, r)) return;
		dy.set(r), e.uniformMatrix2fv(this.addr, !1, dy), my(n, r);
	}
}
function xy(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (py(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), my(n, t);
	} else {
		if (py(n, r)) return;
		uy.set(r), e.uniformMatrix3fv(this.addr, !1, uy), my(n, r);
	}
}
function Sy(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (py(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), my(n, t);
	} else {
		if (py(n, r)) return;
		ly.set(r), e.uniformMatrix4fv(this.addr, !1, ly), my(n, r);
	}
}
function Cy(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function wy(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (py(n, t)) return;
		e.uniform2iv(this.addr, t), my(n, t);
	}
}
function Ty(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (py(n, t)) return;
		e.uniform3iv(this.addr, t), my(n, t);
	}
}
function Ey(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (py(n, t)) return;
		e.uniform4iv(this.addr, t), my(n, t);
	}
}
function Dy(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function Oy(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (py(n, t)) return;
		e.uniform2uiv(this.addr, t), my(n, t);
	}
}
function ky(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (py(n, t)) return;
		e.uniform3uiv(this.addr, t), my(n, t);
	}
}
function Ay(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (py(n, t)) return;
		e.uniform4uiv(this.addr, t), my(n, t);
	}
}
function jy(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	this.type === e.SAMPLER_2D_SHADOW ? (ry.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, a = ry) : a = ny, n.setTexture2D(t || a, i);
}
function My(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || ay, i);
}
function Ny(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTextureCube(t || oy, i);
}
function Py(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || iy, i);
}
function Fy(e) {
	switch (e) {
		case 5126: return gy;
		case 35664: return _y;
		case 35665: return vy;
		case 35666: return yy;
		case 35674: return by;
		case 35675: return xy;
		case 35676: return Sy;
		case 5124:
		case 35670: return Cy;
		case 35667:
		case 35671: return wy;
		case 35668:
		case 35672: return Ty;
		case 35669:
		case 35673: return Ey;
		case 5125: return Dy;
		case 36294: return Oy;
		case 36295: return ky;
		case 36296: return Ay;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return jy;
		case 35679:
		case 36299:
		case 36307: return My;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return Ny;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return Py;
	}
}
function Iy(e, t) {
	e.uniform1fv(this.addr, t);
}
function Ly(e, t) {
	let n = fy(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function Ry(e, t) {
	let n = fy(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function zy(e, t) {
	let n = fy(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function By(e, t) {
	let n = fy(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function Vy(e, t) {
	let n = fy(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function Hy(e, t) {
	let n = fy(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function Uy(e, t) {
	e.uniform1iv(this.addr, t);
}
function Wy(e, t) {
	e.uniform2iv(this.addr, t);
}
function Gy(e, t) {
	e.uniform3iv(this.addr, t);
}
function Ky(e, t) {
	e.uniform4iv(this.addr, t);
}
function qy(e, t) {
	e.uniform1uiv(this.addr, t);
}
function Jy(e, t) {
	e.uniform2uiv(this.addr, t);
}
function Yy(e, t) {
	e.uniform3uiv(this.addr, t);
}
function Xy(e, t) {
	e.uniform4uiv(this.addr, t);
}
function Zy(e, t, n) {
	let r = this.cache, i = t.length, a = hy(n, i);
	py(r, a) || (e.uniform1iv(this.addr, a), my(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? ry : ny;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function Qy(e, t, n) {
	let r = this.cache, i = t.length, a = hy(n, i);
	py(r, a) || (e.uniform1iv(this.addr, a), my(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || ay, a[e]);
}
function $y(e, t, n) {
	let r = this.cache, i = t.length, a = hy(n, i);
	py(r, a) || (e.uniform1iv(this.addr, a), my(r, a));
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || oy, a[e]);
}
function eb(e, t, n) {
	let r = this.cache, i = t.length, a = hy(n, i);
	py(r, a) || (e.uniform1iv(this.addr, a), my(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || iy, a[e]);
}
function tb(e) {
	switch (e) {
		case 5126: return Iy;
		case 35664: return Ly;
		case 35665: return Ry;
		case 35666: return zy;
		case 35674: return By;
		case 35675: return Vy;
		case 35676: return Hy;
		case 5124:
		case 35670: return Uy;
		case 35667:
		case 35671: return Wy;
		case 35668:
		case 35672: return Gy;
		case 35669:
		case 35673: return Ky;
		case 5125: return qy;
		case 36294: return Jy;
		case 36295: return Yy;
		case 36296: return Xy;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Zy;
		case 35679:
		case 36299:
		case 36307: return Qy;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return $y;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return eb;
	}
}
var nb = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Fy(t.type);
	}
}, rb = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = tb(t.type);
	}
}, ib = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, ab = /(\w+)(\])?(\[|\.)?/g;
function ob(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function sb(e, t, n) {
	let r = e.name, i = r.length;
	for (ab.lastIndex = 0;;) {
		let a = ab.exec(r), o = ab.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			ob(n, l === void 0 ? new nb(s, e, t) : new rb(s, e, t));
			break;
		} else {
			let e = n.map[s];
			e === void 0 && (e = new ib(s), ob(n, e)), n = e;
		}
	}
}
var cb = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			sb(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function lb(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var ub = 37297, db = 0;
function fb(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var pb = /* @__PURE__ */ new Z();
function mb(e) {
	mm._getMatrix(pb, mm.workingColorSpace, e);
	let t = `mat3( ${pb.elements.map((e) => e.toFixed(4))} )`;
	switch (mm.getTransfer(e)) {
		case Fp: return [t, "LinearTransferOETF"];
		case Ip: return [t, "sRGBTransferOETF"];
		default: return q("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function hb(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + fb(e.getShaderSource(t), r);
	} else return i;
}
function gb(e, t) {
	let n = mb(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
		"}"
	].join("\n");
}
var _b = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function vb(e, t) {
	let n = _b[t];
	return n === void 0 ? (q("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var yb = /* @__PURE__ */ new X();
function bb() {
	return mm.getLuminanceCoefficients(yb), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${yb.x.toFixed(4)}, ${yb.y.toFixed(4)}, ${yb.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function xb(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(wb).join("\n");
}
function Sb(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function Cb(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function wb(e) {
	return e !== "";
}
function Tb(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Eb(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Db = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ob(e) {
	return e.replace(Db, Ab);
}
var kb = /* @__PURE__ */ new Map();
function Ab(e, t) {
	let n = Q[t];
	if (n === void 0) {
		let e = kb.get(t);
		if (e !== void 0) n = Q[e], q("WebGLRenderer: Shader chunk \"%s\" has been deprecated. Use \"%s\" instead.", t, e);
		else throw Error("Can not resolve #include <" + t + ">");
	}
	return Ob(n);
}
var jb = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Mb(e) {
	return e.replace(jb, Nb);
}
function Nb(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function Pb(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var Fb = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function Ib(e) {
	return Fb[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var Lb = {
	301: "ENVMAP_TYPE_CUBE",
	302: "ENVMAP_TYPE_CUBE",
	306: "ENVMAP_TYPE_CUBE_UV"
};
function Rb(e) {
	return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Lb[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var zb = { 302: "ENVMAP_MODE_REFRACTION" };
function Bb(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : zb[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var Vb = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function Hb(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Vb[e.combine] || "ENVMAP_BLENDING_NONE";
}
function Ub(e) {
	let t = e.envMapCubeUVHeight;
	if (t === null) return null;
	let n = Math.log2(t) - 2, r = 1 / t;
	return {
		texelWidth: 1 / (3 * Math.max(2 ** n, 112)),
		texelHeight: r,
		maxMip: n
	};
}
function Wb(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = Ib(n), l = Rb(n), u = Bb(n), d = Hb(n), f = Ub(n), p = xb(n), m = Sb(a), h = i.createProgram(), g, _, v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(wb).join("\n"), g.length > 0 && (g += "\n"), _ = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(wb).join("\n"), _.length > 0 && (_ += "\n")) : (g = [
		Pb(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(wb).join("\n"), _ = [
		Pb(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
		f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
		f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : Q.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : vb("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		Q.colorspace_pars_fragment,
		gb("linearToOutputTexel", n.outputColorSpace),
		bb(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(wb).join("\n")), o = Ob(o), o = Tb(o, n), o = Eb(o, n), s = Ob(s), s = Tb(s, n), s = Eb(s, n), o = Mb(o), s = Mb(s), n.isRawShaderMaterial !== !0 && (v = "#version 300 es\n", g = [
		p,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + g, _ = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + _);
	let y = v + g + o, b = v + _ + s, x = lb(i, i.VERTEX_SHADER, y), S = lb(i, i.FRAGMENT_SHADER, b);
	i.attachShader(h, x), i.attachShader(h, S), n.index0AttributeName === void 0 ? n.morphTargets === !0 && i.bindAttribLocation(h, 0, "position") : i.bindAttribLocation(h, 0, n.index0AttributeName), i.linkProgram(h);
	function C(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(h) || "", r = i.getShaderInfoLog(x) || "", a = i.getShaderInfoLog(S) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(h, i.LINK_STATUS) === !1) if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, h, x, S);
			else {
				let e = hb(i, x, "vertex"), n = hb(i, S, "fragment");
				J("THREE.WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(h, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
			}
			else o === "" ? (s === "" || c === "") && (u = !1) : q("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: g
				},
				fragmentShader: {
					log: c,
					prefix: _
				}
			});
		}
		i.deleteShader(x), i.deleteShader(S), w = new cb(i, h), T = Cb(i, h);
	}
	let w;
	this.getUniforms = function() {
		return w === void 0 && C(this), w;
	};
	let T;
	this.getAttributes = function() {
		return T === void 0 && C(this), T;
	};
	let E = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return E === !1 && (E = i.getProgramParameter(h, ub)), E;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(h), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = db++, this.cacheKey = t, this.usedTimes = 1, this.program = h, this.vertexShader = x, this.fragmentShader = S, this;
}
var Gb = 0, Kb = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e) {
		let t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), i = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e);
		return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(i) === !1 && (a.add(i), i.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderID(e) {
		return this._getShaderStage(e.vertexShader).id;
	}
	getFragmentShaderID(e) {
		return this._getShaderStage(e.fragmentShader).id;
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new qb(e), t.set(e, n)), n;
	}
}, qb = class {
	constructor(e) {
		this.id = Gb++, this.code = e, this.usedTimes = 0;
	}
};
function Jb(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function Yb(e, t, n, r, i, a) {
	let o = new Vm(), s = new Kb(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = r.precision, p = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function m(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function h(i, o, l, u, h, g) {
		let _ = u.fog, v = h.geometry, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, b = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, x = t.get(i.envMap || y, b), S = x && x.mapping === 306 ? x.image.height : null, C = p[i.type];
		i.precision !== null && (f = r.getMaxPrecision(i.precision), f !== i.precision && q("WebGLProgram.getParameters:", i.precision, "not supported, using", f, "instead."));
		let w = v.morphAttributes.position || v.morphAttributes.normal || v.morphAttributes.color, T = w === void 0 ? 0 : w.length, E = 0;
		v.morphAttributes.position !== void 0 && (E = 1), v.morphAttributes.normal !== void 0 && (E = 2), v.morphAttributes.color !== void 0 && (E = 3);
		let D, O, k, A;
		if (C) {
			let e = _v[C];
			D = e.vertexShader, O = e.fragmentShader;
		} else D = i.vertexShader, O = i.fragmentShader, s.update(i), k = s.getVertexShaderID(i), A = s.getFragmentShaderID(i);
		let ee = e.getRenderTarget(), te = e.state.buffers.depth.getReversed(), j = h.isInstancedMesh === !0, ne = h.isBatchedMesh === !0, M = !!i.map, re = !!i.matcap, ie = !!x, ae = !!i.aoMap, oe = !!i.lightMap, se = !!i.bumpMap, ce = !!i.normalMap, le = !!i.displacementMap, ue = !!i.emissiveMap, de = !!i.metalnessMap, N = !!i.roughnessMap, fe = i.anisotropy > 0, pe = i.clearcoat > 0, me = i.dispersion > 0, he = i.iridescence > 0, ge = i.sheen > 0, _e = i.transmission > 0, P = fe && !!i.anisotropyMap, ve = pe && !!i.clearcoatMap, ye = pe && !!i.clearcoatNormalMap, F = pe && !!i.clearcoatRoughnessMap, be = he && !!i.iridescenceMap, xe = he && !!i.iridescenceThicknessMap, Se = ge && !!i.sheenColorMap, I = ge && !!i.sheenRoughnessMap, L = !!i.specularMap, R = !!i.specularColorMap, z = !!i.specularIntensityMap, Ce = _e && !!i.transmissionMap, we = _e && !!i.thicknessMap, Te = !!i.gradientMap, Ee = !!i.alphaMap, De = i.alphaTest > 0, Oe = !!i.alphaHash, ke = !!i.extensions, Ae = 0;
		i.toneMapped && (ee === null || ee.isXRRenderTarget === !0) && (Ae = e.toneMapping);
		let je = {
			shaderID: C,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: D,
			fragmentShader: O,
			defines: i.defines,
			customVertexShaderID: k,
			customFragmentShaderID: A,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: f,
			batching: ne,
			batchingColor: ne && h._colorsTexture !== null,
			instancing: j,
			instancingColor: j && h.instanceColor !== null,
			instancingMorph: j && h.morphTexture !== null,
			outputColorSpace: ee === null ? e.outputColorSpace : ee.isXRRenderTarget === !0 ? ee.texture.colorSpace : mm.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: M,
			matcap: re,
			envMap: ie,
			envMapMode: ie && x.mapping,
			envMapCubeUVHeight: S,
			aoMap: ae,
			lightMap: oe,
			bumpMap: se,
			normalMap: ce,
			displacementMap: le,
			emissiveMap: ue,
			normalMapObjectSpace: ce && i.normalMapType === 1,
			normalMapTangentSpace: ce && i.normalMapType === 0,
			packedNormalMap: ce && i.normalMapType === 0 && Jb(i.normalMap.format),
			metalnessMap: de,
			roughnessMap: N,
			anisotropy: fe,
			anisotropyMap: P,
			clearcoat: pe,
			clearcoatMap: ve,
			clearcoatNormalMap: ye,
			clearcoatRoughnessMap: F,
			dispersion: me,
			iridescence: he,
			iridescenceMap: be,
			iridescenceThicknessMap: xe,
			sheen: ge,
			sheenColorMap: Se,
			sheenRoughnessMap: I,
			specularMap: L,
			specularColorMap: R,
			specularIntensityMap: z,
			transmission: _e,
			transmissionMap: Ce,
			thicknessMap: we,
			gradientMap: Te,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: Ee,
			alphaTest: De,
			alphaHash: Oe,
			combine: i.combine,
			mapUv: M && m(i.map.channel),
			aoMapUv: ae && m(i.aoMap.channel),
			lightMapUv: oe && m(i.lightMap.channel),
			bumpMapUv: se && m(i.bumpMap.channel),
			normalMapUv: ce && m(i.normalMap.channel),
			displacementMapUv: le && m(i.displacementMap.channel),
			emissiveMapUv: ue && m(i.emissiveMap.channel),
			metalnessMapUv: de && m(i.metalnessMap.channel),
			roughnessMapUv: N && m(i.roughnessMap.channel),
			anisotropyMapUv: P && m(i.anisotropyMap.channel),
			clearcoatMapUv: ve && m(i.clearcoatMap.channel),
			clearcoatNormalMapUv: ye && m(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: F && m(i.clearcoatRoughnessMap.channel),
			iridescenceMapUv: be && m(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: xe && m(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: Se && m(i.sheenColorMap.channel),
			sheenRoughnessMapUv: I && m(i.sheenRoughnessMap.channel),
			specularMapUv: L && m(i.specularMap.channel),
			specularColorMapUv: R && m(i.specularColorMap.channel),
			specularIntensityMapUv: z && m(i.specularIntensityMap.channel),
			transmissionMapUv: Ce && m(i.transmissionMap.channel),
			thicknessMapUv: we && m(i.thicknessMap.channel),
			alphaMapUv: Ee && m(i.alphaMap.channel),
			vertexTangents: !!v.attributes.tangent && (ce || fe),
			vertexNormals: !!v.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!v.attributes.color && v.attributes.color.itemSize === 4,
			pointsUvs: h.isPoints === !0 && !!v.attributes.uv && (M || Ee),
			fog: !!_,
			useFog: i.fog === !0,
			fogExp2: !!_ && _.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || v.attributes.normal === void 0 && ce === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: te,
			skinning: h.isSkinnedMesh === !0,
			morphTargets: v.morphAttributes.position !== void 0,
			morphNormals: v.morphAttributes.normal !== void 0,
			morphColors: v.morphAttributes.color !== void 0,
			morphTargetsCount: T,
			morphTextureStride: E,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: g.length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: Ae,
			decodeVideoTexture: M && i.map.isVideoTexture === !0 && mm.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: ue && i.emissiveMap.isVideoTexture === !0 && mm.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: ke && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (ke && i.extensions.multiDraw === !0 || ne) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return je.vertexUv1s = c.has(1), je.vertexUv2s = c.has(2), je.vertexUv3s = c.has(3), c.clear(), je;
	}
	function g(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (_(n, t), v(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function _(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function v(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), e.push(o.mask);
	}
	function y(e) {
		let t = p[e.type], n;
		if (t) {
			let e = _v[t];
			n = y_.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function b(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new Wb(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function x(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function S(e) {
		s.remove(e);
	}
	function C() {
		s.dispose();
	}
	return {
		getParameters: h,
		getProgramCacheKey: g,
		getUniforms: y,
		acquireProgram: b,
		releaseProgram: x,
		releaseShaderCache: S,
		programs: l,
		dispose: C
	};
}
function Xb() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function Zb(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function Qb(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function $b() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(u) : a.transparent === !0 ? i.push(u) : n.push(u);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t) {
		n.length > 1 && n.sort(e || Zb), r.length > 1 && r.sort(t || Qb), i.length > 1 && i.sort(t || Qb);
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function ex() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new $b(), e.set(t, [i])) : n >= r.length ? (i = new $b(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function tx() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "DirectionalLight":
				n = {
					direction: new X(),
					color: new dh()
				};
				break;
			case "SpotLight":
				n = {
					position: new X(),
					direction: new X(),
					color: new dh(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new X(),
					color: new dh(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new X(),
					skyColor: new dh(),
					groundColor: new dh()
				};
				break;
			case "RectAreaLight":
				n = {
					color: new dh(),
					position: new X(),
					halfWidth: new X(),
					halfHeight: new X()
				};
				break;
		}
		return e[t.id] = n, n;
	} };
}
function nx() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new om()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new om()
				};
				break;
			case "PointLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new om(),
					shadowCameraNear: 1,
					shadowCameraFar: 1e3
				};
				break;
		}
		return e[t.id] = n, n;
	} };
}
var rx = 0;
function ix(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function ax(e) {
	let t = new tx(), n = nx(), r = {
		version: 0,
		hash: {
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new X());
	let i = new X(), a = new Am(), o = new Am();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0;
		i.sort(ix);
		for (let e = 0, y = i.length; e < y; e++) {
			let y = i[e], b = y.color, x = y.intensity, S = y.distance, C = null;
			if (y.shadow && y.shadow.map && (C = y.shadow.map.texture.format === 1030 ? y.shadow.map.texture : y.shadow.map.depthTexture || y.shadow.map.texture), y.isAmbientLight) a += b.r * x, o += b.g * x, s += b.b * x;
			else if (y.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(y.sh.coefficients[e], x);
				v++;
			} else if (y.isDirectionalLight) {
				let e = t.get(y);
				if (e.color.copy(y.color).multiplyScalar(y.intensity), y.castShadow) {
					let e = y.shadow, t = n.get(y);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[c] = t, r.directionalShadowMap[c] = C, r.directionalShadowMatrix[c] = y.shadow.matrix, p++;
				}
				r.directional[c] = e, c++;
			} else if (y.isSpotLight) {
				let e = t.get(y);
				e.position.setFromMatrixPosition(y.matrixWorld), e.color.copy(b).multiplyScalar(x), e.distance = S, e.coneCos = Math.cos(y.angle), e.penumbraCos = Math.cos(y.angle * (1 - y.penumbra)), e.decay = y.decay, r.spot[u] = e;
				let i = y.shadow;
				if (y.map && (r.spotLightMap[g] = y.map, g++, i.updateMatrices(y), y.castShadow && _++), r.spotLightMatrix[u] = i.matrix, y.castShadow) {
					let e = n.get(y);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[u] = e, r.spotShadowMap[u] = C, h++;
				}
				u++;
			} else if (y.isRectAreaLight) {
				let e = t.get(y);
				e.color.copy(b).multiplyScalar(x), e.halfWidth.set(y.width * .5, 0, 0), e.halfHeight.set(0, y.height * .5, 0), r.rectArea[d] = e, d++;
			} else if (y.isPointLight) {
				let e = t.get(y);
				if (e.color.copy(y.color).multiplyScalar(y.intensity), e.distance = y.distance, e.decay = y.decay, y.castShadow) {
					let e = y.shadow, t = n.get(y);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[l] = t, r.pointShadowMap[l] = C, r.pointShadowMatrix[l] = y.shadow.matrix, m++;
				}
				r.point[l] = e, l++;
			} else if (y.isHemisphereLight) {
				let e = t.get(y);
				e.skyColor.copy(y.color).multiplyScalar(x), e.groundColor.copy(y.groundColor).multiplyScalar(x), r.hemi[f] = e, f++;
			}
		}
		d > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = $.LTC_FLOAT_1, r.rectAreaLTC2 = $.LTC_FLOAT_2) : (r.rectAreaLTC1 = $.LTC_HALF_1, r.rectAreaLTC2 = $.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let y = r.hash;
		(y.directionalLength !== c || y.pointLength !== l || y.spotLength !== u || y.rectAreaLength !== d || y.hemiLength !== f || y.numDirectionalShadows !== p || y.numPointShadows !== m || y.numSpotShadows !== h || y.numSpotMaps !== g || y.numLightProbes !== v) && (r.directional.length = c, r.spot.length = u, r.rectArea.length = d, r.point.length = l, r.hemi.length = f, r.directionalShadow.length = p, r.directionalShadowMap.length = p, r.pointShadow.length = m, r.pointShadowMap.length = m, r.spotShadow.length = h, r.spotShadowMap.length = h, r.directionalShadowMatrix.length = p, r.pointShadowMatrix.length = m, r.spotLightMatrix.length = h + g - _, r.spotLightMap.length = g, r.numSpotLightShadowsWithMaps = _, r.numLightProbes = v, y.directionalLength = c, y.pointLength = l, y.spotLength = u, y.rectAreaLength = d, y.hemiLength = f, y.numDirectionalShadows = p, y.numPointShadows = m, y.numSpotShadows = h, y.numSpotMaps = g, y.numLightProbes = v, r.version = rx++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = t.matrixWorldInverse;
		for (let t = 0, f = e.length; t < f; t++) {
			let f = e[t];
			if (f.isDirectionalLight) {
				let e = r.directional[n];
				e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), n++;
			} else if (f.isSpotLight) {
				let e = r.spot[c];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), e.direction.setFromMatrixPosition(f.matrixWorld), i.setFromMatrixPosition(f.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(d), c++;
			} else if (f.isRectAreaLight) {
				let e = r.rectArea[l];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), o.identity(), a.copy(f.matrixWorld), a.premultiply(d), o.extractRotation(a), e.halfWidth.set(f.width * .5, 0, 0), e.halfHeight.set(0, f.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), l++;
			} else if (f.isPointLight) {
				let e = r.point[s];
				e.position.setFromMatrixPosition(f.matrixWorld), e.position.applyMatrix4(d), s++;
			} else if (f.isHemisphereLight) {
				let e = r.hemi[u];
				e.direction.setFromMatrixPosition(f.matrixWorld), e.direction.transformDirection(d), u++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function ox(e) {
	let t = new ax(e), n = [], r = [], i = [];
	function a(e) {
		d.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c(e) {
		i.push(e);
	}
	function l() {
		t.setup(n);
	}
	function u(e) {
		t.setupView(n, e);
	}
	let d = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: d,
		setupLights: l,
		setupLightsView: u,
		pushLight: o,
		pushShadow: s,
		pushLightProbeGrid: c
	};
}
function sx(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new ox(e), t.set(n, [a])) : r >= i.length ? (a = new ox(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var cx = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", lx = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", ux = [
	/* @__PURE__ */ new X(1, 0, 0),
	/* @__PURE__ */ new X(-1, 0, 0),
	/* @__PURE__ */ new X(0, 1, 0),
	/* @__PURE__ */ new X(0, -1, 0),
	/* @__PURE__ */ new X(0, 0, 1),
	/* @__PURE__ */ new X(0, 0, -1)
], dx = [
	/* @__PURE__ */ new X(0, -1, 0),
	/* @__PURE__ */ new X(0, -1, 0),
	/* @__PURE__ */ new X(0, 0, 1),
	/* @__PURE__ */ new X(0, 0, -1),
	/* @__PURE__ */ new X(0, -1, 0),
	/* @__PURE__ */ new X(0, -1, 0)
], fx = /* @__PURE__ */ new Am(), px = /* @__PURE__ */ new X(), mx = /* @__PURE__ */ new X();
function hx(e, t, n) {
	let r = new Vg(), i = new om(), a = new om(), o = new Tm(), s = new w_(), c = new T_(), l = {}, u = n.maxTextureSize, d = {
		0: 1,
		1: 0,
		2: 2
	}, f = new S_({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new om() },
			radius: { value: 4 }
		},
		vertexShader: cx,
		fragmentShader: lx
	}), p = f.clone();
	p.defines.HORIZONTAL_PASS = 1;
	let m = new sg();
	m.setAttribute("position", new Kh(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let h = new Ag(m, f), g = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let _ = this.type;
	this.render = function(t, n, s) {
		if (g.enabled === !1 || g.autoUpdate === !1 && g.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (q("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
		let c = e.getRenderTarget(), l = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), f = e.state;
		f.setBlending(0), f.buffers.depth.getReversed() === !0 ? f.buffers.color.setClear(0, 0, 0, 0) : f.buffers.color.setClear(1, 1, 1, 1), f.buffers.depth.setTest(!0), f.setScissorTest(!1);
		let p = _ !== this.type;
		p && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let c = 0, l = t.length; c < l; c++) {
			let l = t[c], d = l.shadow;
			if (d === void 0) {
				q("WebGLShadowMap:", l, "has no shadow.");
				continue;
			}
			if (d.autoUpdate === !1 && d.needsUpdate === !1) continue;
			i.copy(d.mapSize);
			let m = d.getFrameExtents();
			i.multiply(m), a.copy(d.mapSize), (i.x > u || i.y > u) && (i.x > u && (a.x = Math.floor(u / m.x), i.x = a.x * m.x, d.mapSize.x = a.x), i.y > u && (a.y = Math.floor(u / m.y), i.y = a.y * m.y, d.mapSize.y = a.y));
			let h = e.state.buffers.depth.getReversed();
			if (d.camera._reversedDepth = h, d.map === null || p === !0) {
				if (d.map !== null && (d.map.depthTexture !== null && (d.map.depthTexture.dispose(), d.map.depthTexture = null), d.map.dispose()), this.type === 3) {
					if (l.isPointLight) {
						q("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					d.map = new Dm(i.x, i.y, {
						format: Bf,
						type: Df,
						minFilter: _f,
						magFilter: _f,
						generateMipmaps: !1
					}), d.map.texture.name = l.name + ".shadowMap", d.map.depthTexture = new l_(i.x, i.y, Ef), d.map.depthTexture.name = l.name + ".shadowMapDepth", d.map.depthTexture.format = If, d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = mf, d.map.depthTexture.magFilter = mf;
				} else l.isPointLight ? (d.map = new Kv(i.x), d.map.depthTexture = new u_(i.x, Tf)) : (d.map = new Dm(i.x, i.y), d.map.depthTexture = new l_(i.x, i.y, Tf)), d.map.depthTexture.name = l.name + ".shadowMap", d.map.depthTexture.format = If, this.type === 1 ? (d.map.depthTexture.compareFunction = h ? 518 : 515, d.map.depthTexture.minFilter = _f, d.map.depthTexture.magFilter = _f) : (d.map.depthTexture.compareFunction = null, d.map.depthTexture.minFilter = mf, d.map.depthTexture.magFilter = mf);
				d.camera.updateProjectionMatrix();
			}
			let g = d.map.isWebGLCubeRenderTarget ? 6 : 1;
			for (let t = 0; t < g; t++) {
				if (d.map.isWebGLCubeRenderTarget) e.setRenderTarget(d.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(d.map), e.clear());
					let n = d.getViewport(t);
					o.set(a.x * n.x, a.y * n.y, a.x * n.z, a.y * n.w), f.viewport(o);
				}
				if (l.isPointLight) {
					let e = d.camera, n = d.matrix, r = l.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), px.setFromMatrixPosition(l.matrixWorld), e.position.copy(px), mx.copy(e.position), mx.add(ux[t]), e.up.copy(dx[t]), e.lookAt(mx), e.updateMatrixWorld(), n.makeTranslation(-px.x, -px.y, -px.z), fx.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), d._frustum.setFromProjectionMatrix(fx, e.coordinateSystem, e.reversedDepth);
				} else d.updateMatrices(l);
				r = d.getFrustum(), b(n, s, d.camera, l, this.type);
			}
			d.isPointLightShadow !== !0 && this.type === 3 && v(d, s), d.needsUpdate = !1;
		}
		_ = this.type, g.needsUpdate = !1, e.setRenderTarget(c, l, d);
	};
	function v(n, r) {
		let a = t.update(h);
		f.defines.VSM_SAMPLES !== n.blurSamples && (f.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), n.mapPass === null && (n.mapPass = new Dm(i.x, i.y, {
			format: Bf,
			type: Df
		})), f.uniforms.shadow_pass.value = n.map.depthTexture, f.uniforms.resolution.value = n.mapSize, f.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, a, f, h, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, a, p, h, null);
	}
	function y(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? c : s, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = l[e];
			r === void 0 && (r = {}, l[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", x)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? d[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function b(n, i, a, o, s) {
		if (n.visible === !1) return;
		if (n.layers.test(i.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && s === 3) && (!n.frustumCulled || r.intersectsObject(n))) {
			n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
			let r = t.update(n), c = n.material;
			if (Array.isArray(c)) {
				let t = r.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = c[u.materialIndex];
					if (d && d.visible) {
						let t = y(n, d, o, s);
						n.onBeforeShadow(e, n, i, a, r, t, u), e.renderBufferDirect(a, null, r, t, n, u), n.onAfterShadow(e, n, i, a, r, t, u);
					}
				}
			} else if (c.visible) {
				let t = y(n, c, o, s);
				n.onBeforeShadow(e, n, i, a, r, t, null), e.renderBufferDirect(a, null, r, t, n, null), n.onAfterShadow(e, n, i, a, r, t, null);
			}
		}
		let c = n.children;
		for (let e = 0, t = c.length; e < t; e++) b(c[e], i, a, o, s);
	}
	function x(e) {
		e.target.removeEventListener("dispose", x);
		for (let t in l) {
			let n = l[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function gx(e, t) {
	function n() {
		let t = !1, n = new Tm(), r = null, i = new Tm(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? de(e.DEPTH_TEST) : N(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = Xp[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? de(e.STENCIL_TEST) : N(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new dh(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, te = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), j = !1, ne = 0, M = e.getParameter(e.VERSION);
	M.indexOf("WebGL") === -1 ? M.indexOf("OpenGL ES") !== -1 && (ne = parseFloat(/^OpenGL ES (\d)/.exec(M)[1]), j = ne >= 2) : (ne = parseFloat(/^WebGL (\d)/.exec(M)[1]), j = ne >= 1);
	let re = null, ie = {}, ae = e.getParameter(e.SCISSOR_BOX), oe = e.getParameter(e.VIEWPORT), se = new Tm().fromArray(ae), ce = new Tm().fromArray(oe);
	function le(t, n, r, i) {
		let a = new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let ue = {};
	ue[e.TEXTURE_2D] = le(e.TEXTURE_2D, e.TEXTURE_2D, 1), ue[e.TEXTURE_CUBE_MAP] = le(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ue[e.TEXTURE_2D_ARRAY] = le(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), ue[e.TEXTURE_3D] = le(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), de(e.DEPTH_TEST), o.setFunc(3), ve(!1), ye(1), de(e.CULL_FACE), _e(0);
	function de(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function N(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function fe(t, n) {
		return f[t] === n ? !1 : (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function pe(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function me(t) {
		return h === t ? !1 : (e.useProgram(t), h = t, !0);
	}
	let he = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	he[103] = e.MIN, he[104] = e.MAX;
	let ge = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function _e(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) {
			g === !0 && (N(e.BLEND), g = !1);
			return;
		}
		if (g === !1 && (de(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default:
						J("WebGLState: Invalid blending: ", t);
						break;
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						J("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						J("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default:
						J("WebGLState: Invalid blending: ", t);
						break;
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
			return;
		}
		a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(he[n], he[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(ge[r], ge[i], ge[o], ge[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function P(t, n) {
		t.side === 2 ? N(e.CULL_FACE) : de(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), ve(r), t.blending === 1 && t.transparent === !1 ? _e(0) : _e(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), be(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? de(e.SAMPLE_ALPHA_TO_COVERAGE) : N(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function ve(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function ye(t) {
		t === 0 ? N(e.CULL_FACE) : (de(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function F(t) {
		t !== k && (j && e.lineWidth(t), k = t);
	}
	function be(t, n, r) {
		t ? (de(e.POLYGON_OFFSET_FILL), (A !== n || ee !== r) && (A = n, ee = r, o.getReversed() && (n = -n), e.polygonOffset(n, r))) : N(e.POLYGON_OFFSET_FILL);
	}
	function xe(t) {
		t ? de(e.SCISSOR_TEST) : N(e.SCISSOR_TEST);
	}
	function Se(t) {
		t === void 0 && (t = e.TEXTURE0 + te - 1), re !== t && (e.activeTexture(t), re = t);
	}
	function I(t, n, r) {
		r === void 0 && (r = re === null ? e.TEXTURE0 + te - 1 : re);
		let i = ie[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, ie[r] = i), (i.type !== t || i.texture !== n) && (re !== r && (e.activeTexture(r), re = r), e.bindTexture(t, n || ue[t]), i.type = t, i.texture = n);
	}
	function L() {
		let t = ie[re];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function R() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function z() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function Ce() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function we() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function Te() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function Ee() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function De() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function Oe() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function ke() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function Ae() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			J("WebGLState:", e);
		}
	}
	function je(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function Me(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function Ne(t) {
		se.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), se.copy(t));
	}
	function Pe(t) {
		ce.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), ce.copy(t));
	}
	function Fe(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i));
	}
	function Ie(t, n) {
		let r = l.get(n).get(t);
		c.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), c.set(n, r));
	}
	function Le() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, re = null, ie = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new dh(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, se.set(0, 0, e.canvas.width, e.canvas.height), ce.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: de,
		disable: N,
		bindFramebuffer: fe,
		drawBuffers: pe,
		useProgram: me,
		setBlending: _e,
		setMaterial: P,
		setFlipSided: ve,
		setCullFace: ye,
		setLineWidth: F,
		setPolygonOffset: be,
		setScissorTest: xe,
		activeTexture: Se,
		bindTexture: I,
		unbindTexture: L,
		compressedTexImage2D: R,
		compressedTexImage3D: z,
		texImage2D: ke,
		texImage3D: Ae,
		pixelStorei: Me,
		getParameter: je,
		updateUBOMapping: Fe,
		uniformBlockBinding: Ie,
		texStorage2D: De,
		texStorage3D: Oe,
		texSubImage2D: Ce,
		texSubImage3D: we,
		compressedTexSubImage2D: Te,
		compressedTexSubImage3D: Ee,
		scissor: Ne,
		viewport: Pe,
		reset: Le
	};
}
function _x(e, t, n, r, i, a, o) {
	let s = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new om(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set(), f, p = /* @__PURE__ */ new WeakMap(), m = !1;
	try {
		m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function h(e, t) {
		return m ? new OffscreenCanvas(e, t) : Hp("canvas");
	}
	function g(e, t, n) {
		let r = 1, i = R(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
			let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
			f === void 0 && (f = h(n, a));
			let o = t ? h(n, a) : f;
			return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), q("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
		} else return "data" in e && q("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		return e;
	}
	function _(e) {
		return e.generateMipmaps;
	}
	function v(t) {
		e.generateMipmap(t);
	}
	function y(t) {
		return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
	}
	function b(n, r, i, a, o, s = !1) {
		if (n !== null) {
			if (e[n] !== void 0) return e[n];
			q("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
		}
		let c;
		a && (c = t.get("EXT_texture_norm16"), c || q("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = r;
		if (r === e.RED && (i === e.FLOAT && (l = e.R32F), i === e.HALF_FLOAT && (l = e.R16F), i === e.UNSIGNED_BYTE && (l = e.R8), i === e.UNSIGNED_SHORT && c && (l = c.R16_EXT), i === e.SHORT && c && (l = c.R16_SNORM_EXT)), r === e.RED_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.R8UI), i === e.UNSIGNED_SHORT && (l = e.R16UI), i === e.UNSIGNED_INT && (l = e.R32UI), i === e.BYTE && (l = e.R8I), i === e.SHORT && (l = e.R16I), i === e.INT && (l = e.R32I)), r === e.RG && (i === e.FLOAT && (l = e.RG32F), i === e.HALF_FLOAT && (l = e.RG16F), i === e.UNSIGNED_BYTE && (l = e.RG8), i === e.UNSIGNED_SHORT && c && (l = c.RG16_EXT), i === e.SHORT && c && (l = c.RG16_SNORM_EXT)), r === e.RG_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RG8UI), i === e.UNSIGNED_SHORT && (l = e.RG16UI), i === e.UNSIGNED_INT && (l = e.RG32UI), i === e.BYTE && (l = e.RG8I), i === e.SHORT && (l = e.RG16I), i === e.INT && (l = e.RG32I)), r === e.RGB_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGB8UI), i === e.UNSIGNED_SHORT && (l = e.RGB16UI), i === e.UNSIGNED_INT && (l = e.RGB32UI), i === e.BYTE && (l = e.RGB8I), i === e.SHORT && (l = e.RGB16I), i === e.INT && (l = e.RGB32I)), r === e.RGBA_INTEGER && (i === e.UNSIGNED_BYTE && (l = e.RGBA8UI), i === e.UNSIGNED_SHORT && (l = e.RGBA16UI), i === e.UNSIGNED_INT && (l = e.RGBA32UI), i === e.BYTE && (l = e.RGBA8I), i === e.SHORT && (l = e.RGBA16I), i === e.INT && (l = e.RGBA32I)), r === e.RGB && (i === e.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), i === e.SHORT && c && (l = c.RGB16_SNORM_EXT), i === e.UNSIGNED_INT_5_9_9_9_REV && (l = e.RGB9_E5), i === e.UNSIGNED_INT_10F_11F_11F_REV && (l = e.R11F_G11F_B10F)), r === e.RGBA) {
			let t = s ? Fp : mm.getTransfer(o);
			i === e.FLOAT && (l = e.RGBA32F), i === e.HALF_FLOAT && (l = e.RGBA16F), i === e.UNSIGNED_BYTE && (l = t === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), i === e.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), i === e.SHORT && c && (l = c.RGBA16_SNORM_EXT), i === e.UNSIGNED_SHORT_4_4_4_4 && (l = e.RGBA4), i === e.UNSIGNED_SHORT_5_5_5_1 && (l = e.RGB5_A1);
		}
		return (l === e.R16F || l === e.R32F || l === e.RG16F || l === e.RG32F || l === e.RGBA16F || l === e.RGBA32F) && t.get("EXT_color_buffer_float"), l;
	}
	function x(t, n) {
		let r;
		return t ? n === null || n === 1014 || n === 1020 ? r = e.DEPTH24_STENCIL8 : n === 1015 ? r = e.DEPTH32F_STENCIL8 : n === 1012 && (r = e.DEPTH24_STENCIL8, q("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : n === null || n === 1014 || n === 1020 ? r = e.DEPTH_COMPONENT24 : n === 1015 ? r = e.DEPTH_COMPONENT32F : n === 1012 && (r = e.DEPTH_COMPONENT16), r;
	}
	function S(e, t) {
		return _(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps !== void 0 && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function C(e) {
		let t = e.target;
		t.removeEventListener("dispose", C), T(t), t.isVideoTexture && u.delete(t), t.isHTMLTexture && d.delete(t);
	}
	function w(e) {
		let t = e.target;
		t.removeEventListener("dispose", w), D(t);
	}
	function T(e) {
		let t = r.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, i = p.get(n);
		if (i) {
			let r = i[t.__cacheKey];
			r.usedTimes--, r.usedTimes === 0 && E(e), Object.keys(i).length === 0 && p.delete(n);
		}
		r.remove(e);
	}
	function E(t) {
		let n = r.get(t);
		e.deleteTexture(n.__webglTexture);
		let i = t.source, a = p.get(i);
		delete a[n.__cacheKey], o.memory.textures--;
	}
	function D(t) {
		let n = r.get(t);
		if (t.depthTexture && (t.depthTexture.dispose(), r.remove(t.depthTexture)), t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
			if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);
			else e.deleteFramebuffer(n.__webglFramebuffer[t]);
			n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
		}
		else {
			if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);
			else e.deleteFramebuffer(n.__webglFramebuffer);
			if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
			n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
		}
		let i = t.textures;
		for (let t = 0, n = i.length; t < n; t++) {
			let n = r.get(i[t]);
			n.__webglTexture && (e.deleteTexture(n.__webglTexture), o.memory.textures--), r.remove(i[t]);
		}
		r.remove(t);
	}
	let O = 0;
	function k() {
		O = 0;
	}
	function A() {
		return O;
	}
	function ee(e) {
		O = e;
	}
	function te() {
		let e = O;
		return e >= i.maxTextures && q("WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + i.maxTextures), O += 1, e;
	}
	function j(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function ne(t, i) {
		let a = r.get(t);
		if (t.isVideoTexture && I(t), t.isRenderTargetTexture === !1 && t.isExternalTexture !== !0 && t.version > 0 && a.__version !== t.version) {
			let e = t.image;
			if (e === null) q("WebGLRenderer: Texture marked for update but no image data found.");
			else if (e.complete === !1) q("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				N(a, t, i);
				return;
			}
		} else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		n.bindTexture(e.TEXTURE_2D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function M(t, i) {
		let a = r.get(t);
		if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) {
			N(a, t, i);
			return;
		} else t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
		n.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + i);
	}
	function re(t, i) {
		let a = r.get(t);
		if (t.isRenderTargetTexture === !1 && t.version > 0 && a.__version !== t.version) {
			N(a, t, i);
			return;
		}
		n.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + i);
	}
	function ie(t, i) {
		let a = r.get(t);
		if (t.isCubeDepthTexture !== !0 && t.version > 0 && a.__version !== t.version) {
			fe(a, t, i);
			return;
		}
		n.bindTexture(e.TEXTURE_CUBE_MAP, a.__webglTexture, e.TEXTURE0 + i);
	}
	let ae = {
		[df]: e.REPEAT,
		[ff]: e.CLAMP_TO_EDGE,
		[pf]: e.MIRRORED_REPEAT
	}, oe = {
		[mf]: e.NEAREST,
		[hf]: e.NEAREST_MIPMAP_NEAREST,
		[gf]: e.NEAREST_MIPMAP_LINEAR,
		[_f]: e.LINEAR,
		[vf]: e.LINEAR_MIPMAP_NEAREST,
		[yf]: e.LINEAR_MIPMAP_LINEAR
	}, se = {
		512: e.NEVER,
		519: e.ALWAYS,
		513: e.LESS,
		515: e.LEQUAL,
		514: e.EQUAL,
		518: e.GEQUAL,
		516: e.GREATER,
		517: e.NOTEQUAL
	};
	function ce(n, a) {
		if (a.type === 1015 && t.has("OES_texture_float_linear") === !1 && (a.magFilter === 1006 || a.magFilter === 1007 || a.magFilter === 1005 || a.magFilter === 1008 || a.minFilter === 1006 || a.minFilter === 1007 || a.minFilter === 1005 || a.minFilter === 1008) && q("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n, e.TEXTURE_WRAP_S, ae[a.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, ae[a.wrapT]), (n === e.TEXTURE_3D || n === e.TEXTURE_2D_ARRAY) && e.texParameteri(n, e.TEXTURE_WRAP_R, ae[a.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, oe[a.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, oe[a.minFilter]), a.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, se[a.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
			if (a.magFilter === 1003 || a.minFilter !== 1005 && a.minFilter !== 1008 || a.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
			if (a.anisotropy > 1 || r.get(a).__currentAnisotropy) {
				let o = t.get("EXT_texture_filter_anisotropic");
				e.texParameterf(n, o.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, i.getMaxAnisotropy())), r.get(a).__currentAnisotropy = a.anisotropy;
			}
		}
	}
	function le(t, n) {
		let r = !1;
		t.__webglInit === void 0 && (t.__webglInit = !0, n.addEventListener("dispose", C));
		let i = n.source, a = p.get(i);
		a === void 0 && (a = {}, p.set(i, a));
		let s = j(n);
		if (s !== t.__cacheKey) {
			a[s] === void 0 && (a[s] = {
				texture: e.createTexture(),
				usedTimes: 0
			}, o.memory.textures++, r = !0), a[s].usedTimes++;
			let i = a[t.__cacheKey];
			i !== void 0 && (a[t.__cacheKey].usedTimes--, i.usedTimes === 0 && E(n)), t.__cacheKey = s, t.__webglTexture = a[s].texture;
		}
		return r;
	}
	function ue(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function de(t, r, i, a) {
		let o = t.updateRanges;
		if (o.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r.width, r.height, i, a, r.data);
		else {
			o.sort((e, t) => e.start - t.start);
			let s = 0;
			for (let e = 1; e < o.length; e++) {
				let t = o[s], n = o[e], i = t.start + t.count, a = ue(n.start, r.width, 4), c = ue(t.start, r.width, 4);
				n.start <= i + 1 && a === c && ue(n.start + n.count - 1, r.width, 4) === a ? t.count = Math.max(t.count, n.start + n.count - t.start) : (++s, o[s] = n);
			}
			o.length = s + 1;
			let c = n.getParameter(e.UNPACK_ROW_LENGTH), l = n.getParameter(e.UNPACK_SKIP_PIXELS), u = n.getParameter(e.UNPACK_SKIP_ROWS);
			n.pixelStorei(e.UNPACK_ROW_LENGTH, r.width);
			for (let t = 0, s = o.length; t < s; t++) {
				let s = o[t], c = Math.floor(s.start / 4), l = Math.ceil(s.count / 4), u = c % r.width, d = Math.floor(c / r.width), f = l;
				n.pixelStorei(e.UNPACK_SKIP_PIXELS, u), n.pixelStorei(e.UNPACK_SKIP_ROWS, d), n.texSubImage2D(e.TEXTURE_2D, 0, u, d, f, 1, i, a, r.data);
			}
			t.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, c), n.pixelStorei(e.UNPACK_SKIP_PIXELS, l), n.pixelStorei(e.UNPACK_SKIP_ROWS, u);
		}
	}
	function N(t, o, s) {
		let c = e.TEXTURE_2D;
		(o.isDataArrayTexture || o.isCompressedArrayTexture) && (c = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (c = e.TEXTURE_3D);
		let l = le(t, o), u = o.source;
		n.bindTexture(c, t.__webglTexture, e.TEXTURE0 + s);
		let f = r.get(u);
		if (u.version !== f.__version || l === !0) {
			if (n.activeTexture(e.TEXTURE0 + s), !(typeof ImageBitmap < "u" && o.image instanceof ImageBitmap)) {
				let t = mm.getPrimaries(mm.workingColorSpace), r = o.colorSpace === "" ? null : mm.getPrimaries(o.colorSpace), i = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
				n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, i);
			}
			n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment);
			let t = g(o.image, !1, i.maxTextureSize);
			t = L(o, t);
			let r = a.convert(o.format, o.colorSpace), p = a.convert(o.type), m = b(o.internalFormat, r, p, o.normalized, o.colorSpace, o.isVideoTexture);
			ce(c, o);
			let h, y = o.mipmaps, C = o.isVideoTexture !== !0, w = f.__version === void 0 || l === !0, T = u.dataReady, E = S(o, t);
			if (o.isDepthTexture) m = x(o.format === Lf, o.type), w && (C ? n.texStorage2D(e.TEXTURE_2D, 1, m, t.width, t.height) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, null));
			else if (o.isDataTexture) if (y.length > 0) {
				C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height);
				for (let t = 0, i = y.length; t < i; t++) h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data);
				o.generateMipmaps = !1;
			} else C ? (w && n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height), T && de(o, t, r, p)) : n.texImage2D(e.TEXTURE_2D, 0, m, t.width, t.height, 0, r, p, t.data);
			else if (o.isCompressedTexture) if (o.isCompressedArrayTexture) {
				C && w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, y[0].width, y[0].height, t.depth);
				for (let i = 0, a = y.length; i < a; i++) if (h = y[i], o.format !== 1023) if (r !== null) if (C) {
					if (T) if (o.layerUpdates.size > 0) {
						let t = pv(h.width, h.height, o.format, o.type);
						for (let a of o.layerUpdates) {
							let o = h.data.subarray(a * t / h.data.BYTES_PER_ELEMENT, (a + 1) * t / h.data.BYTES_PER_ELEMENT);
							n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, a, h.width, h.height, 1, r, o);
						}
						o.clearLayerUpdates();
					} else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, h.data);
				} else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, h.data, 0, 0);
				else q("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
				else C ? T && n.texSubImage3D(e.TEXTURE_2D_ARRAY, i, 0, 0, 0, h.width, h.height, t.depth, r, p, h.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, i, m, h.width, h.height, t.depth, 0, r, p, h.data);
			} else {
				C && w && n.texStorage2D(e.TEXTURE_2D, E, m, y[0].width, y[0].height);
				for (let t = 0, i = y.length; t < i; t++) h = y[t], o.format === 1023 ? C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, p, h.data) : n.texImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, r, p, h.data) : r === null ? q("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : C ? T && n.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, h.width, h.height, r, h.data) : n.compressedTexImage2D(e.TEXTURE_2D, t, m, h.width, h.height, 0, h.data);
			}
			else if (o.isDataArrayTexture) if (C) {
				if (w && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, m, t.width, t.height, t.depth), T) if (o.layerUpdates.size > 0) {
					let i = pv(t.width, t.height, o.format, o.type);
					for (let a of o.layerUpdates) {
						let o = t.data.subarray(a * i / t.data.BYTES_PER_ELEMENT, (a + 1) * i / t.data.BYTES_PER_ELEMENT);
						n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, a, t.width, t.height, 1, r, p, o);
					}
					o.clearLayerUpdates();
				} else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data);
			} else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, m, t.width, t.height, t.depth, 0, r, p, t.data);
			else if (o.isData3DTexture) C ? (w && n.texStorage3D(e.TEXTURE_3D, E, m, t.width, t.height, t.depth), T && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, r, p, t.data)) : n.texImage3D(e.TEXTURE_3D, 0, m, t.width, t.height, t.depth, 0, r, p, t.data);
			else if (o.isFramebufferTexture) {
				if (w) if (C) n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height);
				else {
					let i = t.width, a = t.height;
					for (let t = 0; t < E; t++) n.texImage2D(e.TEXTURE_2D, t, m, i, a, 0, r, p, null), i >>= 1, a >>= 1;
				}
			} else if (o.isHTMLTexture) {
				if ("texElementImage2D" in e) {
					let n = e.canvas;
					if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), t.parentNode !== n) {
						n.appendChild(t), d.add(o), n.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of d) t.includes(e.image) && (e.needsUpdate = !0);
						}, n.requestPaint();
						return;
					}
					let r = e.RGBA, i = e.RGBA, a = e.UNSIGNED_BYTE;
					e.texElementImage2D(e.TEXTURE_2D, 0, r, i, a, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
				}
			} else if (y.length > 0) {
				if (C && w) {
					let t = R(y[0]);
					n.texStorage2D(e.TEXTURE_2D, E, m, t.width, t.height);
				}
				for (let t = 0, i = y.length; t < i; t++) h = y[t], C ? T && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, r, p, h) : n.texImage2D(e.TEXTURE_2D, t, m, r, p, h);
				o.generateMipmaps = !1;
			} else if (C) {
				if (w) {
					let r = R(t);
					n.texStorage2D(e.TEXTURE_2D, E, m, r.width, r.height);
				}
				T && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r, p, t);
			} else n.texImage2D(e.TEXTURE_2D, 0, m, r, p, t);
			_(o) && v(c), f.__version = u.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function fe(t, o, s) {
		if (o.image.length !== 6) return;
		let c = le(t, o), l = o.source;
		n.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + s);
		let u = r.get(l);
		if (l.version !== u.__version || c === !0) {
			n.activeTexture(e.TEXTURE0 + s);
			let t = mm.getPrimaries(mm.workingColorSpace), r = o.colorSpace === "" ? null : mm.getPrimaries(o.colorSpace), d = o.colorSpace === "" || t === r ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
			n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, d);
			let f = o.isCompressedTexture || o.image[0].isCompressedTexture, p = o.image[0] && o.image[0].isDataTexture, m = [];
			for (let e = 0; e < 6; e++) !f && !p ? m[e] = g(o.image[e], !0, i.maxCubemapSize) : m[e] = p ? o.image[e].image : o.image[e], m[e] = L(o, m[e]);
			let h = m[0], y = a.convert(o.format, o.colorSpace), x = a.convert(o.type), C = b(o.internalFormat, y, x, o.normalized, o.colorSpace), w = o.isVideoTexture !== !0, T = u.__version === void 0 || c === !0, E = l.dataReady, D = S(o, h);
			ce(e.TEXTURE_CUBE_MAP, o);
			let O;
			if (f) {
				w && T && n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, h.width, h.height);
				for (let t = 0; t < 6; t++) {
					O = m[t].mipmaps;
					for (let r = 0; r < O.length; r++) {
						let i = O[r];
						o.format === 1023 ? w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, y, x, i.data) : y === null ? q("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : w ? E && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, 0, 0, i.width, i.height, y, i.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r, C, i.width, i.height, 0, i.data);
					}
				}
			} else {
				if (O = o.mipmaps, w && T) {
					O.length > 0 && D++;
					let t = R(m[0]);
					n.texStorage2D(e.TEXTURE_CUBE_MAP, D, C, t.width, t.height);
				}
				for (let t = 0; t < 6; t++) if (p) {
					w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, m[t].width, m[t].height, y, x, m[t].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, m[t].width, m[t].height, 0, y, x, m[t].data);
					for (let r = 0; r < O.length; r++) {
						let i = O[r].image[t].image;
						w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, i.width, i.height, y, x, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, i.width, i.height, 0, y, x, i.data);
					}
				} else {
					w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, y, x, m[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, C, y, x, m[t]);
					for (let r = 0; r < O.length; r++) {
						let i = O[r];
						w ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, y, x, i.image[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, C, y, x, i.image[t]);
					}
				}
			}
			_(o) && v(e.TEXTURE_CUBE_MAP), u.__version = l.version, o.onUpdate && o.onUpdate(o);
		}
		t.__version = o.version;
	}
	function pe(t, i, o, c, l, u) {
		let d = a.convert(o.format, o.colorSpace), f = a.convert(o.type), p = b(o.internalFormat, d, f, o.normalized, o.colorSpace), m = r.get(i), h = r.get(o);
		if (h.__renderTarget = i, !m.__hasExternalTextures) {
			let t = Math.max(1, i.width >> u), r = Math.max(1, i.height >> u);
			l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY ? n.texImage3D(l, u, p, t, r, i.depth, 0, d, f, null) : n.texImage2D(l, u, p, t, r, 0, d, f, null);
		}
		n.bindFramebuffer(e.FRAMEBUFFER, t), Se(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, c, l, h.__webglTexture, 0, xe(i)) : (l === e.TEXTURE_2D || l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, c, l, h.__webglTexture, u), n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function me(t, n, r) {
		if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) {
			let i = n.depthTexture, a = i && i.isDepthTexture ? i.type : null, o = x(n.stencilBuffer, a), c = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
			Se(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, xe(n), o, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, xe(n), o, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, o, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, c, e.RENDERBUFFER, t);
		} else {
			let t = n.textures;
			for (let i = 0; i < t.length; i++) {
				let o = t[i], c = a.convert(o.format, o.colorSpace), l = a.convert(o.type), u = b(o.internalFormat, c, l, o.normalized, o.colorSpace);
				Se(n) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, xe(n), u, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, xe(n), u, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, u, n.width, n.height);
			}
		}
		e.bindRenderbuffer(e.RENDERBUFFER, null);
	}
	function he(t, i, o) {
		let c = i.isWebGLCubeRenderTarget === !0;
		if (n.bindFramebuffer(e.FRAMEBUFFER, t), !(i.depthTexture && i.depthTexture.isDepthTexture)) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
		let l = r.get(i.depthTexture);
		if (l.__renderTarget = i, (!l.__webglTexture || i.depthTexture.image.width !== i.width || i.depthTexture.image.height !== i.height) && (i.depthTexture.image.width = i.width, i.depthTexture.image.height = i.height, i.depthTexture.needsUpdate = !0), c) {
			if (l.__webglInit === void 0 && (l.__webglInit = !0, i.depthTexture.addEventListener("dispose", C)), l.__webglTexture === void 0) {
				l.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, l.__webglTexture), ce(e.TEXTURE_CUBE_MAP, i.depthTexture);
				let t = a.convert(i.depthTexture.format), r = a.convert(i.depthTexture.type), o;
				i.depthTexture.format === 1026 ? o = e.DEPTH_COMPONENT24 : i.depthTexture.format === 1027 && (o = e.DEPTH24_STENCIL8);
				for (let n = 0; n < 6; n++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, o, i.width, i.height, 0, t, r, null);
			}
		} else ne(i.depthTexture, 0);
		let u = l.__webglTexture, d = xe(i), f = c ? e.TEXTURE_CUBE_MAP_POSITIVE_X + o : e.TEXTURE_2D, p = i.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
		if (i.depthTexture.format === 1026) Se(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else if (i.depthTexture.format === 1027) Se(i) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p, f, u, 0, d) : e.framebufferTexture2D(e.FRAMEBUFFER, p, f, u, 0);
		else throw Error("Unknown depthTexture format");
	}
	function ge(t) {
		let i = r.get(t), a = t.isWebGLCubeRenderTarget === !0;
		if (i.__boundDepthTexture !== t.depthTexture) {
			let e = t.depthTexture;
			if (i.__depthDisposeCallback && i.__depthDisposeCallback(), e) {
				let t = () => {
					delete i.__boundDepthTexture, delete i.__depthDisposeCallback, e.removeEventListener("dispose", t);
				};
				e.addEventListener("dispose", t), i.__depthDisposeCallback = t;
			}
			i.__boundDepthTexture = e;
		}
		if (t.depthTexture && !i.__autoAllocateDepthBuffer) if (a) for (let e = 0; e < 6; e++) he(i.__webglFramebuffer[e], t, e);
		else {
			let e = t.texture.mipmaps;
			e && e.length > 0 ? he(i.__webglFramebuffer[0], t, 0) : he(i.__webglFramebuffer, t, 0);
		}
		else if (a) {
			i.__webglDepthbuffer = [];
			for (let r = 0; r < 6; r++) if (n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[r]), i.__webglDepthbuffer[r] === void 0) i.__webglDepthbuffer[r] = e.createRenderbuffer(), me(i.__webglDepthbuffer[r], t, !1);
			else {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, a = i.__webglDepthbuffer[r];
				e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, a);
			}
		} else {
			let r = t.texture.mipmaps;
			if (r && r.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, i.__webglFramebuffer), i.__webglDepthbuffer === void 0) i.__webglDepthbuffer = e.createRenderbuffer(), me(i.__webglDepthbuffer, t, !1);
			else {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, r = i.__webglDepthbuffer;
				e.bindRenderbuffer(e.RENDERBUFFER, r), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, r);
			}
		}
		n.bindFramebuffer(e.FRAMEBUFFER, null);
	}
	function _e(t, n, i) {
		let a = r.get(t);
		n !== void 0 && pe(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), i !== void 0 && ge(t);
	}
	function P(t) {
		let i = t.texture, s = r.get(t), c = r.get(i);
		t.addEventListener("dispose", w);
		let l = t.textures, u = t.isWebGLCubeRenderTarget === !0, d = l.length > 1;
		if (d || (c.__webglTexture === void 0 && (c.__webglTexture = e.createTexture()), c.__version = i.version, o.memory.textures++), u) {
			s.__webglFramebuffer = [];
			for (let t = 0; t < 6; t++) if (i.mipmaps && i.mipmaps.length > 0) {
				s.__webglFramebuffer[t] = [];
				for (let n = 0; n < i.mipmaps.length; n++) s.__webglFramebuffer[t][n] = e.createFramebuffer();
			} else s.__webglFramebuffer[t] = e.createFramebuffer();
		} else {
			if (i.mipmaps && i.mipmaps.length > 0) {
				s.__webglFramebuffer = [];
				for (let t = 0; t < i.mipmaps.length; t++) s.__webglFramebuffer[t] = e.createFramebuffer();
			} else s.__webglFramebuffer = e.createFramebuffer();
			if (d) for (let t = 0, n = l.length; t < n; t++) {
				let n = r.get(l[t]);
				n.__webglTexture === void 0 && (n.__webglTexture = e.createTexture(), o.memory.textures++);
			}
			if (t.samples > 0 && Se(t) === !1) {
				s.__webglMultisampledFramebuffer = e.createFramebuffer(), s.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, s.__webglMultisampledFramebuffer);
				for (let n = 0; n < l.length; n++) {
					let r = l[n];
					s.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
					let i = a.convert(r.format, r.colorSpace), o = a.convert(r.type), c = b(r.internalFormat, i, o, r.normalized, r.colorSpace, t.isXRRenderTarget === !0), u = xe(t);
					e.renderbufferStorageMultisample(e.RENDERBUFFER, u, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, s.__webglColorRenderbuffer[n]);
				}
				e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (s.__webglDepthRenderbuffer = e.createRenderbuffer(), me(s.__webglDepthRenderbuffer, t, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
			}
		}
		if (u) {
			n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture), ce(e.TEXTURE_CUBE_MAP, i);
			for (let n = 0; n < 6; n++) if (i.mipmaps && i.mipmaps.length > 0) for (let r = 0; r < i.mipmaps.length; r++) pe(s.__webglFramebuffer[n][r], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, r);
			else pe(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0);
			_(i) && v(e.TEXTURE_CUBE_MAP), n.unbindTexture();
		} else if (d) {
			for (let i = 0, a = l.length; i < a; i++) {
				let a = l[i], o = r.get(a), c = e.TEXTURE_2D;
				(t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (c = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(c, o.__webglTexture), ce(c, a), pe(s.__webglFramebuffer, t, a, e.COLOR_ATTACHMENT0 + i, c, 0), _(a) && v(c);
			}
			n.unbindTexture();
		} else {
			let r = e.TEXTURE_2D;
			if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (r = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(r, c.__webglTexture), ce(r, i), i.mipmaps && i.mipmaps.length > 0) for (let n = 0; n < i.mipmaps.length; n++) pe(s.__webglFramebuffer[n], t, i, e.COLOR_ATTACHMENT0, r, n);
			else pe(s.__webglFramebuffer, t, i, e.COLOR_ATTACHMENT0, r, 0);
			_(i) && v(r), n.unbindTexture();
		}
		t.depthBuffer && ge(t);
	}
	function ve(e) {
		let t = e.textures;
		for (let i = 0, a = t.length; i < a; i++) {
			let a = t[i];
			if (_(a)) {
				let t = y(e), i = r.get(a).__webglTexture;
				n.bindTexture(t, i), v(t), n.unbindTexture();
			}
		}
	}
	let ye = [], F = [];
	function be(t) {
		if (t.samples > 0) {
			if (Se(t) === !1) {
				let i = t.textures, a = t.width, o = t.height, s = e.COLOR_BUFFER_BIT, l = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, u = r.get(t), d = i.length > 1;
				if (d) for (let t = 0; t < i.length; t++) n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
				n.bindFramebuffer(e.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
				let f = t.texture.mipmaps;
				f && f.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer);
				for (let n = 0; n < i.length; n++) {
					if (t.resolveDepthBuffer && (t.depthBuffer && (s |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (s |= e.STENCIL_BUFFER_BIT)), d) {
						e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, u.__webglColorRenderbuffer[n]);
						let t = r.get(i[n]).__webglTexture;
						e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
					}
					e.blitFramebuffer(0, 0, a, o, 0, 0, a, o, s, e.NEAREST), c === !0 && (ye.length = 0, F.length = 0, ye.push(e.COLOR_ATTACHMENT0 + n), t.depthBuffer && t.resolveDepthBuffer === !1 && (ye.push(l), F.push(l), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, F)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, ye));
				}
				if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), d) for (let t = 0; t < i.length; t++) {
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, u.__webglColorRenderbuffer[t]);
					let a = r.get(i[t]).__webglTexture;
					n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, a, 0);
				}
				n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
			} else if (t.depthBuffer && t.resolveDepthBuffer === !1 && c) {
				let n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
				e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
			}
		}
	}
	function xe(e) {
		return Math.min(i.maxSamples, e.samples);
	}
	function Se(e) {
		let n = r.get(e);
		return e.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && n.__useRenderToTexture !== !1;
	}
	function I(e) {
		let t = o.render.frame;
		u.get(e) !== t && (u.set(e, t), e.update());
	}
	function L(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (mm.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && q("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : J("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function R(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (l.width = e.naturalWidth || e.width, l.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (l.width = e.displayWidth, l.height = e.displayHeight) : (l.width = e.width, l.height = e.height), l;
	}
	this.allocateTextureUnit = te, this.resetTextureUnits = k, this.getTextureUnits = A, this.setTextureUnits = ee, this.setTexture2D = ne, this.setTexture2DArray = M, this.setTexture3D = re, this.setTextureCube = ie, this.rebindTextures = _e, this.setupRenderTarget = P, this.updateRenderTargetMipmap = ve, this.updateMultisampleRenderTarget = be, this.setupDepthRenderbuffer = ge, this.setupFrameBufferTexture = pe, this.useMultisampledRTT = Se, this.isReversedDepthBuffer = function() {
		return n.buffers.depth.getReversed();
	};
}
function vx(e, t) {
	function n(n, r = "") {
		let i, a = mm.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) if (a === "srgb") if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
			if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
			if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
			if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
			if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
		} else return null;
		else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
			if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
		} else return null;
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
			if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
			if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
			if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
			if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
		} else return null;
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
			if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
			if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
			if (n === 37488) return i.COMPRESSED_R11_EAC;
			if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
			if (n === 37490) return i.COMPRESSED_RG11_EAC;
			if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
		} else return null;
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
			if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
			if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
			if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
			if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
			if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
			if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
			if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
			if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
			if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
			if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
			if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
			if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
			if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
			if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
		} else return null;
		if (n === 36492 || n === 36494 || n === 36495) if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
			if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
			if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
			if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
		} else return null;
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
			if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
			if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
			if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
			if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
		} else return null;
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var yx = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", bx = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", xx = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new d_(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new S_({
				vertexShader: yx,
				fragmentShader: bx,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new Ag(new p_(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, Sx = class extends Zp {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, o = "local-floor", s = 1, c = null, l = null, u = null, d = null, f = null, p = null, m = typeof XRWebGLBinding < "u", h = new xx(), g = {}, _ = t.getContextAttributes(), v = null, y = null, b = [], x = [], S = new om(), C = null, w = new Y_();
		w.viewport = new Tm();
		let T = new Y_();
		T.viewport = new Tm();
		let E = [w, T], D = new ev(), O = null, k = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = b[e];
			return t === void 0 && (t = new oh(), b[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = b[e];
			return t === void 0 && (t = new oh(), b[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = b[e];
			return t === void 0 && (t = new oh(), b[e] = t), t.getHandSpace();
		};
		function A(e) {
			let t = x.indexOf(e.inputSource);
			if (t === -1) return;
			let n = b[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, c || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function ee() {
			r.removeEventListener("select", A), r.removeEventListener("selectstart", A), r.removeEventListener("selectend", A), r.removeEventListener("squeeze", A), r.removeEventListener("squeezestart", A), r.removeEventListener("squeezeend", A), r.removeEventListener("end", ee), r.removeEventListener("inputsourceschange", te);
			for (let e = 0; e < b.length; e++) {
				let t = x[e];
				t !== null && (x[e] = null, b[e].disconnect(t));
			}
			O = null, k = null, h.reset();
			for (let e in g) delete g[e];
			e.setRenderTarget(v), f = null, d = null, u = null, r = null, y = null, se.stop(), n.isPresenting = !1, e.setPixelRatio(C), e.setSize(S.width, S.height, !1), n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && q("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			o = e, n.isPresenting === !0 && q("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return c || a;
		}, this.setReferenceSpace = function(e) {
			c = e;
		}, this.getBaseLayer = function() {
			return d === null ? f : d;
		}, this.getBinding = function() {
			return u === null && m && (u = new XRWebGLBinding(r, t)), u;
		}, this.getFrame = function() {
			return p;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(l) {
			if (r = l, r !== null) {
				if (v = e.getRenderTarget(), r.addEventListener("select", A), r.addEventListener("selectstart", A), r.addEventListener("selectend", A), r.addEventListener("squeeze", A), r.addEventListener("squeezestart", A), r.addEventListener("squeezeend", A), r.addEventListener("end", ee), r.addEventListener("inputsourceschange", te), _.xrCompatible !== !0 && await t.makeXRCompatible(), C = e.getPixelRatio(), e.getSize(S), m && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, o = null;
					_.depth && (o = _.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = _.stencil ? Lf : If, a = _.stencil ? Af : Tf);
					let s = {
						colorFormat: t.RGBA8,
						depthFormat: o,
						scaleFactor: i
					};
					u = this.getBinding(), d = u.createProjectionLayer(s), r.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), y = new Dm(d.textureWidth, d.textureHeight, {
						format: Ff,
						type: bf,
						depthTexture: new l_(d.textureWidth, d.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: _.stencil,
						colorSpace: e.outputColorSpace,
						samples: _.antialias ? 4 : 0,
						resolveDepthBuffer: d.ignoreDepthValues === !1,
						resolveStencilBuffer: d.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: _.antialias,
						alpha: !0,
						depth: _.depth,
						stencil: _.stencil,
						framebufferScaleFactor: i
					};
					f = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new Dm(f.framebufferWidth, f.framebufferHeight, {
						format: Ff,
						type: bf,
						colorSpace: e.outputColorSpace,
						stencilBuffer: _.stencil,
						resolveDepthBuffer: f.ignoreDepthValues === !1,
						resolveStencilBuffer: f.ignoreDepthValues === !1
					});
				}
				y.isXRRenderTarget = !0, this.setFoveation(s), c = null, a = await r.requestReferenceSpace(o), se.setContext(r), se.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return h.getDepthTexture();
		};
		function te(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = x.indexOf(n);
				r >= 0 && (x[r] = null, b[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = x.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < b.length; e++) if (e >= x.length) {
						x.push(n), r = e;
						break;
					} else if (x[e] === null) {
						x[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = b[r];
				i && i.connect(n);
			}
		}
		let j = new X(), ne = new X();
		function M(e, t, n) {
			j.setFromMatrixPosition(t.matrixWorld), ne.setFromMatrixPosition(n.matrixWorld);
			let r = j.distanceTo(ne), i = t.projectionMatrix.elements, a = n.projectionMatrix.elements, o = i[14] / (i[10] - 1), s = i[14] / (i[10] + 1), c = (i[9] + 1) / i[5], l = (i[9] - 1) / i[5], u = (i[8] - 1) / i[0], d = (a[8] + 1) / a[0], f = o * u, p = o * d, m = r / (-u + d), h = m * -u;
			if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(h), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), i[10] === -1) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse);
			else {
				let t = o + m, n = s + m, i = f - h, a = p + (r - h), u = c * s / n * t, d = l * s / n * t;
				e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
			}
		}
		function re(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			h.texture !== null && (h.depthNear > 0 && (t = h.depthNear), h.depthFar > 0 && (n = h.depthFar)), D.near = T.near = w.near = t, D.far = T.far = w.far = n, (O !== D.near || k !== D.far) && (r.updateRenderState({
				depthNear: D.near,
				depthFar: D.far
			}), O = D.near, k = D.far), D.layers.mask = e.layers.mask | 6, w.layers.mask = D.layers.mask & -5, T.layers.mask = D.layers.mask & -3;
			let i = e.parent, a = D.cameras;
			re(D, i);
			for (let e = 0; e < a.length; e++) re(a[e], i);
			a.length === 2 ? M(D, w, T) : D.projectionMatrix.copy(w.projectionMatrix), ie(e, D, i);
		};
		function ie(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = em * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return D;
		}, this.getFoveation = function() {
			if (!(d === null && f === null)) return s;
		}, this.setFoveation = function(e) {
			s = e, d !== null && (d.fixedFoveation = e), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return h.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return h.getMesh(D);
		}, this.getCameraTexture = function(e) {
			return g[e];
		};
		let ae = null;
		function oe(t, i) {
			if (l = i.getViewerPose(c || a), p = i, l !== null) {
				let t = l.views;
				f !== null && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y));
				let i = !1;
				t.length !== D.cameras.length && (D.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (f !== null) a = f.getViewport(r);
					else {
						let t = u.getViewSubImage(d, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(y, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(y));
					}
					let o = E[n];
					o === void 0 && (o = new Y_(), o.layers.enable(n), o.viewport = new Tm(), E[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (D.matrix.copy(o.matrix), D.matrix.decompose(D.position, D.quaternion, D.scale)), i === !0 && D.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && m) {
					u = n.getBinding();
					let e = u.getDepthInformation(t[0]);
					e && e.isValid && e.texture && h.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && m) {
					e.state.unbindTexture(), u = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = g[n];
							e || (e = new d_(), g[n] = e);
							let t = u.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < b.length; e++) {
				let t = x[e], n = b[e];
				t !== null && n !== void 0 && n.update(t, i, c || a);
			}
			ae && ae(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), p = null;
		}
		let se = new hv();
		se.setAnimationLoop(oe), this.setAnimationLoop = function(e) {
			ae = e;
		}, this.dispose = function() {};
	}
}, Cx = /* @__PURE__ */ new Am(), wx = /* @__PURE__ */ new Z();
wx.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Tx(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, v_(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(wx), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function Ex(e, t, n, r) {
	let i = {}, a = {}, o = [], s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
	function c(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n);
	}
	function l(e, n) {
		let o = i[e.id];
		o === void 0 && (m(e), o = u(e), i[e.id] = o, e.addEventListener("dispose", g));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let c = t.render.frame;
		a[e.id] !== c && (f(e), a[e.id] = c);
	}
	function u(t) {
		let n = d();
		t.__bindingPointIndex = n;
		let r = e.createBuffer(), i = t.__size, a = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, r), e.bufferData(e.UNIFORM_BUFFER, i, a), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, r), r;
	}
	function d() {
		for (let e = 0; e < s; e++) if (o.indexOf(e) === -1) return o.push(e), e;
		return J("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
	}
	function f(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let t = 0, n = r.length; t < n; t++) {
			let n = Array.isArray(r[t]) ? r[t] : [r[t]];
			for (let r = 0, i = n.length; r < i; r++) {
				let i = n[r];
				if (p(i, t, r, a) === !0) {
					let t = i.__offset, n = Array.isArray(i.value) ? i.value : [i.value], r = 0;
					for (let a = 0; a < n.length; a++) {
						let o = n[a], s = h(o);
						typeof o == "number" || typeof o == "boolean" ? (i.__data[0] = o, e.bufferSubData(e.UNIFORM_BUFFER, t + r, i.__data)) : o.isMatrix3 ? (i.__data[0] = o.elements[0], i.__data[1] = o.elements[1], i.__data[2] = o.elements[2], i.__data[3] = 0, i.__data[4] = o.elements[3], i.__data[5] = o.elements[4], i.__data[6] = o.elements[5], i.__data[7] = 0, i.__data[8] = o.elements[6], i.__data[9] = o.elements[7], i.__data[10] = o.elements[8], i.__data[11] = 0) : ArrayBuffer.isView(o) ? i.__data.set(new o.constructor(o.buffer, o.byteOffset, i.__data.length)) : (o.toArray(i.__data, r), r += s.storage / Float32Array.BYTES_PER_ELEMENT);
					}
					e.bufferSubData(e.UNIFORM_BUFFER, t, i.__data);
				}
			}
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function p(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (r[a] === void 0) return typeof i == "number" || typeof i == "boolean" ? r[a] = i : ArrayBuffer.isView(i) ? r[a] = i.slice() : r[a] = i.clone(), !0;
		{
			let e = r[a];
			if (typeof i == "number" || typeof i == "boolean") {
				if (e !== i) return r[a] = i, !0;
			} else if (ArrayBuffer.isView(i)) return !0;
			else if (e.equals(i) === !1) return e.copy(i), !0;
		}
		return !1;
	}
	function m(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let e = 0, t = r.length; e < t; e++) {
				let t = r[e], i = Array.isArray(t.value) ? t.value : [t.value];
				for (let e = 0, r = i.length; e < r; e++) {
					let r = i[e], a = h(r), o = n % 16, s = o % a.boundary, c = o + s;
					n += s, c !== 0 && 16 - c < a.storage && (n += 16 - c), t.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += a.storage;
				}
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function h(e) {
		let t = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? q("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : q("WebGLRenderer: Unsupported uniform value type.", e), t;
	}
	function g(t) {
		let n = t.target;
		n.removeEventListener("dispose", g);
		let r = o.indexOf(n.__bindingPointIndex);
		o.splice(r, 1), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function _() {
		for (let t in i) e.deleteBuffer(i[t]);
		o = [], i = {}, a = {};
	}
	return {
		bind: c,
		update: l,
		dispose: _
	};
}
var Dx = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), Ox = null;
function kx() {
	return Ox === null && (Ox = new Ng(Dx, 16, 16, Bf, Df), Ox.name = "DFG_LUT", Ox.minFilter = _f, Ox.magFilter = _f, Ox.wrapS = ff, Ox.wrapT = ff, Ox.generateMipmaps = !1, Ox.needsUpdate = !0), Ox;
}
var Ax = class {
	constructor(e = {}) {
		let { canvas: t = Up(), context: n = null, depth: r = !0, stencil: i = !1, alpha: a = !1, antialias: o = !1, premultipliedAlpha: s = !0, preserveDrawingBuffer: c = !1, powerPreference: l = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1, outputBufferType: f = bf } = e;
		this.isWebGLRenderer = !0;
		let p;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			p = n.getContextAttributes().alpha;
		} else p = a;
		let m = f, h = new Set([
			Hf,
			Vf,
			zf
		]), g = new Set([
			bf,
			Tf,
			Cf,
			Af,
			Of,
			kf
		]), _ = new Uint32Array(4), v = new Int32Array(4), y = new X(), b = null, x = null, S = [], C = [], w = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let T = this, E = !1, D = null;
		this._outputColorSpace = Np;
		let O = 0, k = 0, A = null, ee = -1, te = null, j = new Tm(), ne = new Tm(), M = null, re = new dh(0), ie = 0, ae = t.width, oe = t.height, se = 1, ce = null, le = null, ue = new Tm(0, 0, ae, oe), de = new Tm(0, 0, ae, oe), N = !1, fe = new Vg(), pe = !1, me = !1, he = new Am(), ge = new X(), _e = new Tm(), P = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, ve = !1;
		function ye() {
			return A === null ? se : 1;
		}
		let F = n;
		function be(e, n) {
			return t.getContext(e, n);
		}
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: o,
				premultipliedAlpha: s,
				preserveDrawingBuffer: c,
				powerPreference: l,
				failIfMajorPerformanceCaveat: u
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r184"), t.addEventListener("webglcontextlost", He, !1), t.addEventListener("webglcontextrestored", Ue, !1), t.addEventListener("webglcontextcreationerror", We, !1), F === null) {
				let t = "webgl2";
				if (F = be(t, e), F === null) throw be(t) ? Error("Error creating WebGL context with your selected attributes.") : Error("Error creating WebGL context.");
			}
		} catch (e) {
			throw J("WebGLRenderer: " + e.message), e;
		}
		let xe, Se, I, L, R, z, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze;
		function Be() {
			xe = new Jv(F), xe.init(), Le = new vx(F, xe), Se = new wv(F, xe, e, Le), I = new gx(F, xe), Se.reversedDepthBuffer && d && I.buffers.depth.setReversed(!0), L = new Zv(F), R = new Xb(), z = new _x(F, xe, I, R, Se, Le, L), Ce = new qv(T), we = new gv(F), Re = new Sv(F, we), Te = new Yv(F, we, L, Re), Ee = new $v(F, Te, we, Re, L), Pe = new Qv(F, Se, z), je = new Tv(R), De = new Yb(T, Ce, xe, Se, Re, je), Oe = new Tx(T, R), ke = new ex(), Ae = new sx(xe), Ne = new xv(T, Ce, I, Ee, p, s), Me = new hx(T, Ee, Se), ze = new Ex(F, L, Se, I), Fe = new Cv(F, xe, L), Ie = new Xv(F, xe, L), L.programs = De.programs, T.capabilities = Se, T.extensions = xe, T.properties = R, T.renderLists = ke, T.shadowMap = Me, T.state = I, T.info = L;
		}
		Be(), m !== 1009 && (w = new ty(m, t.width, t.height, r, i));
		let Ve = new Sx(T, F);
		this.xr = Ve, this.getContext = function() {
			return F;
		}, this.getContextAttributes = function() {
			return F.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = xe.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = xe.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return se;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (se = e, this.setSize(ae, oe, !1));
		}, this.getSize = function(e) {
			return e.set(ae, oe);
		}, this.setSize = function(e, n, r = !0) {
			if (Ve.isPresenting) {
				q("WebGLRenderer: Can't change size while VR device is presenting.");
				return;
			}
			ae = e, oe = n, t.width = Math.floor(e * se), t.height = Math.floor(n * se), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), w !== null && w.setSize(t.width, t.height), this.setViewport(0, 0, e, n);
		}, this.getDrawingBufferSize = function(e) {
			return e.set(ae * se, oe * se).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			ae = e, oe = n, se = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (m === 1009) {
				J("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
				return;
			}
			if (e) {
				for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
					q("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
					break;
				}
			}
			w.setEffects(e || []);
		}, this.getCurrentViewport = function(e) {
			return e.copy(j);
		}, this.getViewport = function(e) {
			return e.copy(ue);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? ue.set(e.x, e.y, e.z, e.w) : ue.set(e, t, n, r), I.viewport(j.copy(ue).multiplyScalar(se).round());
		}, this.getScissor = function(e) {
			return e.copy(de);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? de.set(e.x, e.y, e.z, e.w) : de.set(e, t, n, r), I.scissor(ne.copy(de).multiplyScalar(se).round());
		}, this.getScissorTest = function() {
			return N;
		}, this.setScissorTest = function(e) {
			I.setScissorTest(N = e);
		}, this.setOpaqueSort = function(e) {
			ce = e;
		}, this.setTransparentSort = function(e) {
			le = e;
		}, this.getClearColor = function(e) {
			return e.copy(Ne.getClearColor());
		}, this.setClearColor = function() {
			Ne.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Ne.getClearAlpha();
		}, this.setClearAlpha = function() {
			Ne.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (A !== null) {
					let t = A.texture.format;
					e = h.has(t);
				}
				if (e) {
					let e = A.texture.type, t = g.has(e), n = Ne.getClearColor(), r = Ne.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (_[0] = i, _[1] = a, _[2] = o, _[3] = r, F.clearBufferuiv(F.COLOR, 0, _)) : (v[0] = i, v[1] = a, v[2] = o, v[3] = r, F.clearBufferiv(F.COLOR, 0, v));
				} else r |= F.COLOR_BUFFER_BIT;
			}
			t && (r |= F.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= F.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && F.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), D = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", He, !1), t.removeEventListener("webglcontextrestored", Ue, !1), t.removeEventListener("webglcontextcreationerror", We, !1), Ne.dispose(), ke.dispose(), Ae.dispose(), R.dispose(), Ce.dispose(), Ee.dispose(), Re.dispose(), ze.dispose(), De.dispose(), Ve.dispose(), Ve.removeEventListener("sessionstart", Ze), Ve.removeEventListener("sessionend", Qe), $e.stop();
		};
		function He(e) {
			e.preventDefault(), Kp("WebGLRenderer: Context Lost."), E = !0;
		}
		function Ue() {
			Kp("WebGLRenderer: Context Restored."), E = !1;
			let e = L.autoReset, t = Me.enabled, n = Me.autoUpdate, r = Me.needsUpdate, i = Me.type;
			Be(), L.autoReset = e, Me.enabled = t, Me.autoUpdate = n, Me.needsUpdate = r, Me.type = i;
		}
		function We(e) {
			J("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function Ge(e) {
			let t = e.target;
			t.removeEventListener("dispose", Ge), Ke(t);
		}
		function Ke(e) {
			qe(e), R.remove(e);
		}
		function qe(e) {
			let t = R.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				De.releaseProgram(e);
			}), e.isShaderMaterial && De.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = P);
			let o = i.isMesh && i.matrixWorld.determinant() < 0, s = lt(e, t, n, r, i);
			I.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = Te.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			Re.setup(i, r, s, n, c);
			let h, g = Fe;
			if (c !== null && (h = we.get(c), g = Ie, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (I.setLineWidth(r.wireframeLinewidth * ye()), g.setMode(F.LINES)) : g.setMode(F.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), I.setLineWidth(e * ye()), i.isLineSegments ? g.setMode(F.LINES) : i.isLineLoop ? g.setMode(F.LINE_LOOP) : g.setMode(F.LINE_STRIP);
			} else i.isPoints ? g.setMode(F.POINTS) : i.isSprite && g.setMode(F.TRIANGLES);
			if (i.isBatchedMesh) if (xe.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
			else {
				let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? we.get(c).bytesPerElement : 1, o = R.get(r).currentProgram.getUniforms();
				for (let r = 0; r < n; r++) o.setValue(F, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
			}
			else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function Je(e, t, n) {
			e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, at(e, t, n), e.side = 0, e.needsUpdate = !0, at(e, t, n), e.side = 2) : at(e, t, n);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), x = Ae.get(n), x.init(t), C.push(x), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (x.pushLight(e), e.castShadow && x.pushShadow(e));
			}), x.setupLights();
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let t = e.material;
				if (t) if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
					let a = t[i];
					Je(a, n, e), r.add(a);
				}
				else Je(t, n, e), r.add(t);
			}), x = C.pop(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					if (r.forEach(function(e) {
						R.get(e).currentProgram.isReady() && r.delete(e);
					}), r.size === 0) {
						t(e);
						return;
					}
					setTimeout(n, 10);
				}
				xe.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let Ye = null;
		function Xe(e) {
			Ye && Ye(e);
		}
		function Ze() {
			$e.stop();
		}
		function Qe() {
			$e.start();
		}
		let $e = new hv();
		$e.setAnimationLoop(Xe), typeof self < "u" && $e.setContext(self), this.setAnimationLoop = function(e) {
			Ye = e, Ve.setAnimationLoop(e), e === null ? $e.stop() : $e.start();
		}, Ve.addEventListener("sessionstart", Ze), Ve.addEventListener("sessionend", Qe), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				J("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (E === !0) return;
			D !== null && D.renderStart(e, t);
			let n = Ve.enabled === !0 && Ve.isPresenting === !0, r = w !== null && (A === null || n) && w.begin(T, A);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), Ve.enabled === !0 && Ve.isPresenting === !0 && (w === null || w.isCompositing() === !1) && (Ve.cameraAutoUpdate === !0 && Ve.updateCamera(t), t = Ve.getCamera()), e.isScene === !0 && e.onBeforeRender(T, e, t, A), x = Ae.get(e, C.length), x.init(t), x.state.textureUnits = z.getTextureUnits(), C.push(x), he.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), fe.setFromProjectionMatrix(he, zp, t.reversedDepth), me = this.localClippingEnabled, pe = je.init(this.clippingPlanes, me), b = ke.get(e, S.length), b.init(), S.push(b), Ve.enabled === !0 && Ve.isPresenting === !0) {
				let e = T.xr.getDepthSensingMesh();
				e !== null && et(e, t, -Infinity, T.sortObjects);
			}
			et(e, t, 0, T.sortObjects), b.finish(), T.sortObjects === !0 && b.sort(ce, le), ve = Ve.enabled === !1 || Ve.isPresenting === !1 || Ve.hasDepthSensing() === !1, ve && Ne.addToRenderList(b, e), this.info.render.frame++, pe === !0 && je.beginShadows();
			let i = x.state.shadowsArray;
			if (Me.render(i, e, t), pe === !0 && je.endShadows(), this.info.autoReset === !0 && this.info.reset(), (r && w.hasRenderPass()) === !1) {
				let n = b.opaque, r = b.transmissive;
				if (x.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						nt(n, r, e, a);
					}
					ve && Ne.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						tt(b, e, n, n.viewport);
					}
				} else r.length > 0 && nt(n, r, e, t), ve && Ne.render(e), tt(b, e, t);
			}
			A !== null && k === 0 && (z.updateMultisampleRenderTarget(A), z.updateRenderTargetMipmap(A)), r && w.end(T), e.isScene === !0 && e.onAfterRender(T, e, t), Re.resetDefaultState(), ee = -1, te = null, C.pop(), C.length > 0 ? (x = C[C.length - 1], z.setTextureUnits(x.state.textureUnits), pe === !0 && je.setGlobalState(T.clippingPlanes, x.state.camera)) : x = null, S.pop(), b = S.length > 0 ? S[S.length - 1] : null, D !== null && D.renderEnd();
		};
		function et(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLightProbeGrid) x.pushLightProbeGrid(e);
				else if (e.isLight) x.pushLight(e), e.castShadow && x.pushShadow(e);
				else if (e.isSprite) {
					if (!e.frustumCulled || fe.intersectsSprite(e)) {
						r && _e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);
						let t = Ee.update(e), i = e.material;
						i.visible && b.push(e, t, i, n, _e.z, null);
					}
				} else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || fe.intersectsObject(e))) {
					let t = Ee.update(e), i = e.material;
					if (r && (e.boundingSphere === void 0 ? (t.boundingSphere === null && t.computeBoundingSphere(), _e.copy(t.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), _e.copy(e.boundingSphere.center)), _e.applyMatrix4(e.matrixWorld).applyMatrix4(he)), Array.isArray(i)) {
						let r = t.groups;
						for (let a = 0, o = r.length; a < o; a++) {
							let o = r[a], s = i[o.materialIndex];
							s && s.visible && b.push(e, t, s, n, _e.z, o);
						}
					} else i.visible && b.push(e, t, i, n, _e.z, null);
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) et(i[e], t, n, r);
		}
		function tt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			x.setupLightsView(n), pe === !0 && je.setGlobalState(T.clippingPlanes, n), r && I.viewport(j.copy(r)), i.length > 0 && rt(i, t, n), a.length > 0 && rt(a, t, n), o.length > 0 && rt(o, t, n), I.buffers.depth.setTest(!0), I.buffers.depth.setMask(!0), I.buffers.color.setMask(!0), I.setPolygonOffset(!1);
		}
		function nt(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (x.state.transmissionRenderTarget[r.id] === void 0) {
				let e = xe.has("EXT_color_buffer_half_float") || xe.has("EXT_color_buffer_float");
				x.state.transmissionRenderTarget[r.id] = new Dm(1, 1, {
					generateMipmaps: !0,
					type: e ? Df : bf,
					minFilter: yf,
					samples: Math.max(4, Se.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					colorSpace: mm.workingColorSpace
				});
			}
			let a = x.state.transmissionRenderTarget[r.id], o = r.viewport || j;
			a.setSize(o.z * T.transmissionResolutionScale, o.w * T.transmissionResolutionScale);
			let s = T.getRenderTarget(), c = T.getActiveCubeFace(), l = T.getActiveMipmapLevel();
			T.setRenderTarget(a), T.getClearColor(re), ie = T.getClearAlpha(), ie < 1 && T.setClearColor(16777215, .5), T.clear(), ve && Ne.render(n);
			let u = T.toneMapping;
			T.toneMapping = 0;
			let d = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), x.setupLightsView(r), pe === !0 && je.setGlobalState(T.clippingPlanes, r), rt(e, n, r), z.updateMultisampleRenderTarget(a), z.updateRenderTargetMipmap(a), xe.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, it(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (z.updateMultisampleRenderTarget(a), z.updateRenderTargetMipmap(a));
			}
			T.setRenderTarget(s, c, l), T.setClearColor(re, ie), d !== void 0 && (r.viewport = d), T.toneMapping = u;
		}
		function rt(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && it(o, t, n, s, l, c);
			}
		}
		function it(e, t, n, r, i, a) {
			e.onBeforeRender(T, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(T, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, T.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : T.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(T, t, n, r, i, a);
		}
		function at(e, t, n) {
			t.isScene !== !0 && (t = P);
			let r = R.get(e), i = x.state.lights, a = x.state.shadowsArray, o = i.state.version, s = De.getParameters(e, i.state, a, t, n, x.state.lightProbeGridArray), c = De.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = Ce.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", Ge), l = /* @__PURE__ */ new Map(), r.programs = l);
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return st(e, s), d;
			} else s.uniforms = De.getUniforms(e), D !== null && e.isNodeMaterial && D.build(e, n, s), e.onBeforeCompile(s, T), d = De.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = je.uniform), st(e, s), r.needsLights = dt(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.lightProbeGrid = x.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d;
		}
		function ot(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = cb.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function st(e, t) {
			let n = R.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function ct(e, t) {
			if (e.length === 0) return null;
			if (e.length === 1) return e[0].texture === null ? null : e[0];
			y.setFromMatrixPosition(t.matrixWorld);
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				if (n.texture !== null && n.boundingBox.containsPoint(y)) return n;
			}
			return null;
		}
		function lt(e, t, n, r, i) {
			t.isScene !== !0 && (t = P), z.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = A === null ? T.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : mm.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = Ce.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (A === null || A.isXRRenderTarget === !0) && (h = T.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = R.get(r), y = x.state.lights;
			if (pe === !0 && (me === !0 || e !== te)) {
				let t = e === te && r.id === ee;
				je.setState(r, e, t);
			}
			let b = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version ? b = !0 : v.outputColorSpace === s ? i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i.colorTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i.colorTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== je.numPlanes || v.numIntersection !== je.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.toneMapping === h && v.morphTargetsCount === _ ? !!v.lightProbeGrid != x.state.lightProbeGridArray.length > 0 && (b = !0) : b = !0 : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let S = v.currentProgram;
			b === !0 && (S = at(r, t, i), D && r.isNodeMaterial && D.onUpdateProgram(r, S, v));
			let C = !1, w = !1, E = !1, O = S.getUniforms(), k = v.uniforms;
			if (I.useProgram(S.program) && (C = !0, w = !0, E = !0), r.id !== ee && (ee = r.id, w = !0), v.needsLights) {
				let e = ct(x.state.lightProbeGridArray, i);
				v.lightProbeGrid !== e && (v.lightProbeGrid = e, w = !0);
			}
			if (C || te !== e) {
				I.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), O.setValue(F, "projectionMatrix", e.projectionMatrix), O.setValue(F, "viewMatrix", e.matrixWorldInverse);
				let t = O.map.cameraPosition;
				t !== void 0 && t.setValue(F, ge.setFromMatrixPosition(e.matrixWorld)), Se.logarithmicDepthBuffer && O.setValue(F, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && O.setValue(F, "isOrthographic", e.isOrthographicCamera === !0), te !== e && (te = e, w = !0, E = !0);
			}
			if (v.needsLights && (y.state.directionalShadowMap.length > 0 && O.setValue(F, "directionalShadowMap", y.state.directionalShadowMap, z), y.state.spotShadowMap.length > 0 && O.setValue(F, "spotShadowMap", y.state.spotShadowMap, z), y.state.pointShadowMap.length > 0 && O.setValue(F, "pointShadowMap", y.state.pointShadowMap, z)), i.isSkinnedMesh) {
				O.setOptional(F, i, "bindMatrix"), O.setOptional(F, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), O.setValue(F, "boneTexture", e.boneTexture, z));
			}
			i.isBatchedMesh && (O.setOptional(F, i, "batchingTexture"), O.setValue(F, "batchingTexture", i._matricesTexture, z), O.setOptional(F, i, "batchingIdTexture"), O.setValue(F, "batchingIdTexture", i._indirectTexture, z), O.setOptional(F, i, "batchingColorTexture"), i._colorsTexture !== null && O.setValue(F, "batchingColorTexture", i._colorsTexture, z));
			let j = n.morphAttributes;
			if ((j.position !== void 0 || j.normal !== void 0 || j.color !== void 0) && Pe.update(i, n, S), (w || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, O.setValue(F, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (k.envMapIntensity.value = t.environmentIntensity), k.dfgLUT !== void 0 && (k.dfgLUT.value = kx()), w) {
				if (O.setValue(F, "toneMappingExposure", T.toneMappingExposure), v.needsLights && ut(k, E), a && r.fog === !0 && Oe.refreshFogUniforms(k, a), Oe.refreshMaterialUniforms(k, r, se, oe, x.state.transmissionRenderTarget[e.id]), v.needsLights && v.lightProbeGrid) {
					let e = v.lightProbeGrid;
					k.probesSH.value = e.texture, k.probesMin.value.copy(e.boundingBox.min), k.probesMax.value.copy(e.boundingBox.max), k.probesResolution.value.copy(e.resolution);
				}
				cb.upload(F, ot(v), k, z);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (cb.upload(F, ot(v), k, z), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && O.setValue(F, "center", i.center), O.setValue(F, "modelViewMatrix", i.modelViewMatrix), O.setValue(F, "normalMatrix", i.normalMatrix), O.setValue(F, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					ze.update(n, S), ze.bind(n, S);
				}
			}
			return S;
		}
		function ut(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function dt(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return O;
		}, this.getActiveMipmapLevel = function() {
			return k;
		}, this.getRenderTarget = function() {
			return A;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = R.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), R.get(e.texture).__webglTexture = t, R.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = R.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		};
		let ft = F.createFramebuffer();
		this.setRenderTarget = function(e, t = 0, n = 0) {
			A = e, O = t, k = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = R.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					I.bindFramebuffer(F.FRAMEBUFFER, o.__webglFramebuffer), j.copy(e.viewport), ne.copy(e.scissor), M = e.scissorTest, I.viewport(j), I.scissor(ne), I.setScissorTest(M), ee = -1;
					return;
				} else if (o.__webglFramebuffer === void 0) z.setupRenderTarget(e);
				else if (o.__hasExternalTextures) z.rebindTextures(e, R.get(e.texture).__webglTexture, R.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && R.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
						z.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = R.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && z.useMultisampledRTT(e) === !1 ? R.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, j.copy(e.viewport), ne.copy(e.scissor), M = e.scissorTest;
			} else j.copy(ue).multiplyScalar(se).floor(), ne.copy(de).multiplyScalar(se).floor(), M = N;
			if (n !== 0 && (r = ft), I.bindFramebuffer(F.FRAMEBUFFER, r) && I.drawBuffers(e, r), I.viewport(j), I.scissor(ne), I.setScissorTest(M), i) {
				let r = R.get(e.texture);
				F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = R.get(e.textures[t]);
					F.framebufferTextureLayer(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = R.get(e.texture);
				F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, t.__webglTexture, n);
			}
			ee = -1;
		}, this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				J("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = R.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) {
				I.bindFramebuffer(F.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					if (e.textures.length > 1 && F.readBuffer(F.COLOR_ATTACHMENT0 + s), !Se.textureFormatReadable(c)) {
						J("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (!Se.textureTypeReadable(l)) {
						J("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && F.readPixels(t, n, r, i, Le.convert(c), Le.convert(l), a);
				} finally {
					let e = A === null ? null : R.get(A).__webglFramebuffer;
					I.bindFramebuffer(F.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = R.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
				I.bindFramebuffer(F.FRAMEBUFFER, c);
				let o = e.textures[s], l = o.format, u = o.type;
				if (e.textures.length > 1 && F.readBuffer(F.COLOR_ATTACHMENT0 + s), !Se.textureFormatReadable(l)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
				if (!Se.textureTypeReadable(u)) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
				let d = F.createBuffer();
				F.bindBuffer(F.PIXEL_PACK_BUFFER, d), F.bufferData(F.PIXEL_PACK_BUFFER, a.byteLength, F.STREAM_READ), F.readPixels(t, n, r, i, Le.convert(l), Le.convert(u), 0);
				let f = A === null ? null : R.get(A).__webglFramebuffer;
				I.bindFramebuffer(F.FRAMEBUFFER, f);
				let p = F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE, 0);
				return F.flush(), await Yp(F, p, 4), F.bindBuffer(F.PIXEL_PACK_BUFFER, d), F.getBufferSubData(F.PIXEL_PACK_BUFFER, 0, a), F.deleteBuffer(d), F.deleteSync(p), a;
			} else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			z.setTexture2D(e, 0), F.copyTexSubImage2D(F.TEXTURE_2D, n, 0, 0, o, s, i, a), I.unbindTexture();
		};
		let pt = F.createFramebuffer(), mt = F.createFramebuffer();
		this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = Le.convert(t.format), _ = Le.convert(t.type), v;
			t.isData3DTexture ? (z.setTexture3D(t, 0), v = F.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (z.setTexture2DArray(t, 0), v = F.TEXTURE_2D_ARRAY) : (z.setTexture2D(t, 0), v = F.TEXTURE_2D), I.activeTexture(F.TEXTURE0), I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL, t.flipY), I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), I.pixelStorei(F.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = I.getParameter(F.UNPACK_ROW_LENGTH), b = I.getParameter(F.UNPACK_IMAGE_HEIGHT), x = I.getParameter(F.UNPACK_SKIP_PIXELS), S = I.getParameter(F.UNPACK_SKIP_ROWS), C = I.getParameter(F.UNPACK_SKIP_IMAGES);
			I.pixelStorei(F.UNPACK_ROW_LENGTH, h.width), I.pixelStorei(F.UNPACK_IMAGE_HEIGHT, h.height), I.pixelStorei(F.UNPACK_SKIP_PIXELS, l), I.pixelStorei(F.UNPACK_SKIP_ROWS, u), I.pixelStorei(F.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = R.get(e), r = R.get(t), h = R.get(n.__renderTarget), g = R.get(r.__renderTarget);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, h.__webglFramebuffer), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (F.framebufferTextureLayer(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, R.get(e).__webglTexture, i, d + n), F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, R.get(t).__webglTexture, a, m + n)), F.blitFramebuffer(l, u, o, s, f, p, o, s, F.DEPTH_BUFFER_BIT, F.NEAREST);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, null), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || R.has(e)) {
				let n = R.get(e), r = R.get(t);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, pt), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, mt);
				for (let e = 0; e < c; e++) w ? F.framebufferTextureLayer(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : F.framebufferTexture2D(F.READ_FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, n.__webglTexture, i), T ? F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : F.framebufferTexture2D(F.DRAW_FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? F.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : F.copyTexSubImage2D(v, a, f, p, l, u, o, s) : F.blitFramebuffer(l, u, o, s, f, p, o, s, F.COLOR_BUFFER_BIT, F.NEAREST);
				I.bindFramebuffer(F.READ_FRAMEBUFFER, null), I.bindFramebuffer(F.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? F.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? F.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : F.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? F.texSubImage2D(F.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? F.compressedTexSubImage2D(F.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : F.texSubImage2D(F.TEXTURE_2D, a, f, p, o, s, g, _, h);
			I.pixelStorei(F.UNPACK_ROW_LENGTH, y), I.pixelStorei(F.UNPACK_IMAGE_HEIGHT, b), I.pixelStorei(F.UNPACK_SKIP_PIXELS, x), I.pixelStorei(F.UNPACK_SKIP_ROWS, S), I.pixelStorei(F.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps && F.generateMipmap(v), I.unbindTexture();
		}, this.initRenderTarget = function(e) {
			R.get(e).__webglFramebuffer === void 0 && z.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? z.setTextureCube(e, 0) : e.isData3DTexture ? z.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? z.setTexture2DArray(e, 0) : z.setTexture2D(e, 0), I.unbindTexture();
		}, this.resetState = function() {
			O = 0, k = 0, A = null, I.reset(), Re.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return zp;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = mm._getDrawingBufferColorSpace(e), t.unpackColorSpace = mm._getUnpackColorSpace();
	}
};
//#endregion
//#region src/core/assets.ts
function jx(e) {
	if (!e) return "";
	if (/^https?:\/\//.test(e)) return e;
	let t = e.replace(/^\//, "").split("/").map((e) => encodeURIComponent(e)).join("/"), n = import.meta.url;
	return n.includes("/console/") ? `${new URL("../assets/", n).href}${t}` : `${vl}/assets/${t}`;
}
function Mx(e) {
	return jx(`cg/${e}.jpg`);
}
//#endregion
//#region src/components/TextBox.vue?vue&type=script&setup=true&lang.ts
var Nx = { class: "textbox" }, Px = { class: "speaker-row" }, Fx = { class: "speaker" }, Ix = { class: "dialogue" }, Lx = { class: "choices" }, Rx = ["disabled", "onClick"], zx = /* @__PURE__ */ $n({
	__name: "TextBox",
	setup(e) {
		let t = Rd(), n = /* @__PURE__ */ Wt(""), r = 0, i = 0;
		function a(e) {
			if (window.clearInterval(r), i = 0, t.save.motionLevel === "low") {
				n.value = e;
				return;
			}
			n.value = "";
			let a = 0, o = t.save.motionLevel === "extreme" ? 2 : 3;
			r = window.setInterval(() => {
				let t = n.value.length;
				n.value = e.slice(0, a);
				let s = n.value.length;
				s > t && (i += s - t, i >= 3 && (i = 0, jd.playSE("typing_blip"))), a += o, a > e.length + o && (n.value = e, window.clearInterval(r));
			}, t.save.motionLevel === "extreme" ? 12 : 18);
		}
		return Rn(() => t.save.scene.text, a, { immediate: !0 }), Rn(() => t.save.motionLevel, () => a(t.save.scene.text)), _r(() => window.clearInterval(r)), (e, r) => (U(), W("section", Nx, [
			G("div", Px, [G("span", Fx, P(B(t).save.scene.speaker), 1), r[0] ||= G("span", { class: "pulse-mark" }, null, -1)]),
			G("p", Ix, P(n.value), 1),
			G("div", Lx, [(U(!0), W(H, null, V(B(t).save.scene.choices, (e) => (U(), W("button", {
				key: e.id,
				type: "button",
				disabled: B(t).loading,
				onClick: (n) => B(t).choose(e.id)
			}, [r[1] ||= G("span", { class: "choice-line" }, null, -1), ta(" " + P(e.text), 1)], 8, Rx))), 128))])
		]));
	}
}), Bx = ["src"], Vx = ["src"], Hx = { class: "character-layer" }, Ux = ["src", "alt"], Wx = { class: "scene-ribbon" }, Gx = {
	key: 1,
	class: "loading"
}, Kx = /* @__PURE__ */ $n({
	__name: "GalStage",
	setup(e) {
		let t = Rd(), n = /* @__PURE__ */ Wt(null), r = /* @__PURE__ */ Wt(null), i = K(() => jx(t.save.scene.background)), a = K(() => t.save.scene.cg ? jx(t.save.scene.cg) : ""), o = null, s = null, c = null, l = null, u = null, d = 0, f = 0;
		function p() {
			return t.save.route === "golden_bough_rebuild" ? new dh("#f3c85d") : t.save.route === "ring_conspiracy" ? new dh("#b63f4a") : new dh("#79c7df");
		}
		function m() {
			if (!s) return;
			l?.geometry.dispose(), Array.isArray(l?.material) ? l?.material.forEach((e) => e.dispose()) : l?.material.dispose(), l && s.remove(l);
			let e = t.save.motionLevel === "low" ? 260 : t.save.motionLevel === "standard" ? 560 : 980, n = new Float32Array(e * 3);
			for (let t = 0; t < e; t += 1) n[t * 3] = (Math.random() - .5) * 18, n[t * 3 + 1] = (Math.random() - .5) * 10, n[t * 3 + 2] = -Math.random() * 8;
			let r = new sg();
			r.setAttribute("position", new Kh(n, 3)), l = new o_(r, new t_({
				color: p(),
				size: t.save.motionLevel === "extreme" ? .038 : .028,
				transparent: !0,
				opacity: .58,
				depthWrite: !1,
				blending: 2
			})), s.add(l);
		}
		function h() {
			if (!s) return;
			u?.geometry.dispose(), Array.isArray(u?.material) ? u?.material.forEach((e) => e.dispose()) : u?.material.dispose(), u && s.remove(u);
			let e = t.save.motionLevel === "low" ? 52 : t.save.motionLevel === "standard" ? 92 : 150, n = new Float32Array(e * 6);
			for (let t = 0; t < e; t += 1) {
				let e = (Math.random() - .5) * 18, r = (Math.random() - .5) * 10, i = -Math.random() * 8;
				n[t * 6] = e, n[t * 6 + 1] = r, n[t * 6 + 2] = i, n[t * 6 + 3] = e + (Math.random() - .5) * 1.5, n[t * 6 + 4] = r - .35 - Math.random() * 1.4, n[t * 6 + 5] = i;
			}
			let r = new sg();
			r.setAttribute("position", new Kh(n, 3)), u = new e_(r, new Hg({
				color: p(),
				transparent: !0,
				opacity: .2,
				blending: 2
			})), s.add(u);
		}
		function g() {
			if (!o || !c || !r.value) return;
			let { clientWidth: e, clientHeight: t } = r.value;
			o.setSize(e, t, !1), c.aspect = e / Math.max(1, t), c.updateProjectionMatrix();
		}
		function _() {
			if (d += .01, l) {
				let e = l.geometry.getAttribute("position");
				for (let n = 0; n < e.count; n += 1) {
					let r = e.getY(n) - (t.save.motionLevel === "extreme" ? .018 : .01);
					e.setY(n, r < -5.4 ? 5.4 : r), e.setX(n, e.getX(n) + Math.sin(d + n) * .0018);
				}
				e.needsUpdate = !0, l.rotation.z = Math.sin(d * .18) * .025;
			}
			u && (u.rotation.z = Math.sin(d * .12) * .02, u.position.x = Math.sin(d * .2) * .1), o && s && c && o.render(s, c), f = requestAnimationFrame(_);
		}
		return mr(() => {
			!n.value || !r.value || (o = new Ax({
				canvas: n.value,
				alpha: !0,
				antialias: !0
			}), o.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6)), s = new ph(), c = new Y_(45, 16 / 9, .1, 100), c.position.z = 8, m(), h(), g(), window.addEventListener("resize", g), _());
		}), Rn(() => [t.save.route, t.save.motionLevel], () => {
			m(), h();
		}), _r(() => {
			cancelAnimationFrame(f), window.removeEventListener("resize", g), l?.geometry.dispose(), Array.isArray(l?.material) ? l?.material.forEach((e) => e.dispose()) : l?.material.dispose(), u?.geometry.dispose(), Array.isArray(u?.material) ? u?.material.forEach((e) => e.dispose()) : u?.material.dispose(), o?.dispose();
		}), (e, o) => (U(), W("main", {
			class: "gal-stage",
			ref_key: "stageRef",
			ref: r
		}, [
			G("img", {
				class: "gal-bg",
				src: i.value,
				alt: ""
			}, null, 8, Bx),
			a.value ? (U(), W("img", {
				key: 0,
				class: "cg-layer",
				src: a.value,
				alt: ""
			}, null, 8, Vx)) : na("", !0),
			G("canvas", {
				ref_key: "canvasRef",
				ref: n,
				class: "webgl-layer",
				"aria-hidden": "true"
			}, null, 512),
			o[0] ||= G("div", {
				class: "scanline-layer",
				"aria-hidden": "true"
			}, null, -1),
			o[1] ||= G("div", {
				class: "vignette-layer",
				"aria-hidden": "true"
			}, null, -1),
			G("div", Hx, [(U(!0), W(H, null, V(B(t).save.scene.characters, (e) => (U(), W("img", {
				key: `${e.id}-${e.sprite}`,
				class: N(["character", [e.position, { active: e.active }]]),
				style: se({ "--sprite-scale": e.scale ?? 1 }),
				src: B(jx)(`characters/${e.id}/${e.sprite}.png`),
				alt: e.id
			}, null, 14, Ux))), 128))]),
			G("div", Wx, [G("span", null, P(B(t).routeLabel), 1), G("strong", null, P(B(t).save.locationId), 1)]),
			Zi(zx),
			B(t).loading ? (U(), W("div", Gx, "生成中")) : na("", !0)
		], 512));
	}
}), qx = { class: "modal-panel loadout-panel" }, Jx = { class: "loadout-summary" }, Yx = { class: "route-board-section loadout-modifier" }, Xx = { class: "route-board-title" }, Zx = { class: "loadout-grid" }, Qx = { class: "route-board-section" }, $x = { class: "route-board-title" }, eS = ["disabled", "onClick"], tS = { class: "route-board-section" }, nS = { class: "route-board-title" }, rS = ["disabled", "onClick"], iS = { class: "route-board-section" }, aS = { class: "route-board-title" }, oS = { class: "route-board-section" }, sS = { class: "route-board-title" }, cS = { class: "route-board-section unlock-log" }, lS = {
	key: 0,
	class: "empty-state"
}, uS = { class: "route-board-title" }, dS = /* @__PURE__ */ $n({
	__name: "LoadoutPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.inventoryItems), r = K(() => t.equipmentOptions), i = K(() => t.wardrobeOutfits), a = K(() => t.galleryRuleOptions), o = K(() => t.recentProgressionUnlocks), s = K(() => t.equippedModifier), c = {
			key: "钥匙",
			material: "材料",
			evidence: "证据",
			gear: "整备",
			memory: "记忆"
		}, l = {
			weapon: "武器",
			armor: "防具",
			accessory: "饰物",
			tool: "工具"
		}, u = {
			inventory: "物品",
			equipment: "装备",
			wardrobe: "衣装",
			cg: "回忆图"
		}, d = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码",
			danger: "危险",
			trust: "信任",
			affection: "好感",
			artResonance: "共鸣"
		};
		function f(e, t) {
			return e === "equipped" ? "已装备" : e === "available" ? "可装备" : t ?? "未解锁";
		}
		function p(e, t) {
			return e === "active" ? "使用中" : e === "available" ? "可切换" : t ?? "未解锁";
		}
		function m(e, t) {
			return e === "unlocked" ? "已解锁" : t ?? "未解锁";
		}
		function h(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => `${d[e]} ${Number(t) > 0 ? "+" : ""}${t}`);
			return t.length ? t.join(" / ") : "无";
		}
		function g(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (e, d) => (U(), W("section", qx, [
			G("header", null, [G("div", null, [d[1] ||= G("h2", null, "整备规则层", -1), G("p", null, P(B(t).routeLabel) + " · 库存、装备、衣装与 CG 解锁状态", 1)]), G("button", {
				type: "button",
				onClick: d[0] ||= (e) => B(t).ui.showLoadoutPanel = !1
			}, "关闭")]),
			G("div", Jx, [
				G("article", null, [d[2] ||= G("span", null, "物品", -1), G("strong", null, P(n.value.filter((e) => e.unlocked).length) + "/" + P(n.value.length), 1)]),
				G("article", null, [d[3] ||= G("span", null, "装备", -1), G("strong", null, P(r.value.filter((e) => e.status === "equipped").length) + "/4", 1)]),
				G("article", null, [d[4] ||= G("span", null, "衣装", -1), G("strong", null, P(i.value.filter((e) => e.status !== "locked").length) + "/" + P(i.value.length), 1)]),
				G("article", null, [d[5] ||= G("span", null, "图库", -1), G("strong", null, P(a.value.filter((e) => e.status === "unlocked").length) + "/" + P(a.value.length), 1)])
			]),
			G("section", Yx, [G("div", Xx, [d[6] ||= G("strong", null, "当前装备加成", -1), G("span", null, P(h(s.value)), 1)])]),
			G("div", Zx, [
				G("section", Qx, [d[7] ||= G("h3", null, "装备", -1), (U(!0), W(H, null, V(r.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", $x, [G("strong", null, P(e.label), 1), G("span", null, P(l[e.slot]) + " · " + P(f(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(h(e.modifier)), 1),
					G("button", {
						type: "button",
						disabled: e.status === "locked" || e.status === "equipped",
						onClick: (n) => B(t).equipLoadoutItem(e.id)
					}, P(e.status === "equipped" ? "已装备" : "装备"), 9, eS)
				], 2))), 128))]),
				G("section", tS, [d[8] ||= G("h3", null, "衣装", -1), (U(!0), W(H, null, V(i.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", nS, [G("strong", null, P(e.label), 1), G("span", null, P(p(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, "立绘：" + P(e.sprite), 1),
					G("button", {
						type: "button",
						disabled: e.status === "locked" || e.status === "active",
						onClick: (n) => B(t).setWardrobe(e.id)
					}, P(e.status === "active" ? "使用中" : "切换"), 9, rS)
				], 2))), 128))]),
				G("section", iS, [d[9] ||= G("h3", null, "库存", -1), (U(!0), W(H, null, V(n.value, (e) => (U(), W("article", {
					key: e.id,
					class: N({ locked: !e.unlocked })
				}, [
					G("div", aS, [G("strong", null, P(e.label), 1), G("span", null, P(c[e.kind]) + " · " + P(e.unlocked ? "已取得" : "未取得"), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.unlocked ? "已纳入规则层" : e.unlockHint), 1)
				], 2))), 128))]),
				G("section", oS, [d[10] ||= G("h3", null, "图库规则", -1), (U(!0), W(H, null, V(a.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", sS, [G("strong", null, P(e.label), 1), G("span", null, P(m(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, "CG：" + P(e.cgId), 1)
				], 2))), 128))])
			]),
			G("section", cS, [
				d[11] ||= G("h3", null, "解锁日志", -1),
				o.value.length ? na("", !0) : (U(), W("p", lS, "当前路线尚无整备解锁日志。")),
				(U(!0), W(H, null, V(o.value, (e) => (U(), W("article", { key: e.id }, [G("div", uS, [G("strong", null, P(u[e.kind]) + " · " + P(e.label), 1), G("span", null, P(g(e.createdAt)), 1)]), G("p", null, P(e.trigger), 1)]))), 128))
			])
		]));
	}
}), fS = { class: "topbar topbar-primary" }, pS = { class: "caret" }, mS = {
	key: 0,
	class: "topbar topbar-secondary"
}, hS = ["disabled", "title"], gS = ["disabled", "title"], _S = ["disabled", "title"], vS = ["disabled", "title"], yS = ["disabled", "title"], bS = ["disabled", "title"], xS = ["disabled", "title"], SS = ["disabled", "title"], CS = {
	key: 1,
	class: "modal-panel setup-panel"
}, wS = { class: "segmented" }, TS = ["onClick"], ES = { class: "segmented" }, DS = ["onClick"], OS = { class: "audio-controls" }, kS = ["value"], AS = ["value"], jS = {
	key: 2,
	class: "modal-panel gallery-panel"
}, MS = { class: "gallery-grid" }, NS = ["src", "alt"], PS = {
	key: 3,
	class: "modal-panel save-panel"
}, FS = ["value"], IS = {
	key: 4,
	class: "route-switch"
}, LS = { class: "route-header" }, RS = ["onClick"], zS = { class: "route-card-title" }, BS = { class: "route-card-hook" }, VS = ["src"], HS = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ $n({
	__name: "MainMenu",
	props: { onExit: { type: Function } },
	setup(e) {
		let t = e, n = Rd(), r = /* @__PURE__ */ Wt(""), i = /* @__PURE__ */ Wt(""), a = /* @__PURE__ */ Wt(!1), o = /* @__PURE__ */ jt({ ...n.save.playerProfile }), s = [
			{
				id: "white_canvas",
				label: "白色画布",
				hook: "温柔守护，把每一次失控都拉回可撤回的白线"
			},
			{
				id: "golden_bough_rebuild",
				label: "金枝重构",
				hook: "修复她的身体与记忆，在残骸里重建她"
			},
			{
				id: "ring_conspiracy",
				label: "环指共谋",
				hook: "与她共谋到底，把整个环指写成两个人的作品"
			}
		], c = [
			{
				id: "low",
				label: "低"
			},
			{
				id: "standard",
				label: "标准"
			},
			{
				id: "extreme",
				label: "极致"
			}
		], l = K(() => n.galleryLockedCount), u = K(() => n.save.completedQuestNodeIds.length > 0 || n.save.affection.albina > 0), d = K(() => n.save.questProgressLog.length > 0), f = K(() => n.save.clearedConflictIds.length > 0 || n.save.conflictResolutionLog.length > 0);
		function p() {
			window.confirm("确定要重置全部进度吗？此操作不可撤销，建议先导出存档备份。") && n.reset();
		}
		function m() {
			Object.assign(o, n.save.playerProfile), n.ui.showSetup = !0;
		}
		async function h() {
			await n.savePlayerProfile({ ...o }), n.ui.showSetup = !1;
		}
		function g() {
			r.value = n.exportSave();
		}
		function _() {
			i.value.trim() && (n.importSave(i.value), i.value = "");
		}
		return (e, v) => (U(), W(H, null, [
			G("nav", fS, [
				G("button", {
					type: "button",
					class: "primary-btn",
					onClick: m,
					title: "设定你的身份、外貌、边界与偏好"
				}, "身份"),
				G("button", {
					type: "button",
					class: "primary-btn",
					onClick: g,
					title: "导出/导入存档"
				}, "存档"),
				G("button", {
					type: "button",
					class: "primary-btn",
					onClick: v[0] ||= (e) => B(n).ui.showRouteBoard = !B(n).ui.showRouteBoard,
					title: "选择你想走的走向"
				}, "走向"),
				G("button", {
					type: "button",
					class: "primary-btn",
					onClick: v[1] ||= (e) => a.value = !a.value,
					title: "展开更多功能"
				}, [v[25] ||= ta("菜单", -1), G("span", pS, P(a.value ? "▴" : "▾"), 1)]),
				G("button", {
					type: "button",
					class: "primary-btn danger",
					onClick: p,
					title: "重置全部进度"
				}, "重置"),
				G("button", {
					type: "button",
					class: "primary-btn",
					onClick: v[2] ||= (e) => t.onExit?.(),
					title: "返回酒馆"
				}, "退出")
			]),
			a.value ? (U(), W("nav", mS, [
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[3] ||= (e) => B(n).ui.showStatus = !B(n).ui.showStatus,
					title: u.value ? "查看她对你的态度" : "故事开始后开启"
				}, P(u.value ? "状态" : "状态🔒"), 9, hS),
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[4] ||= (e) => B(n).ui.showGallery = !B(n).ui.showGallery,
					title: u.value ? "已收藏的回忆" : "故事开始后开启"
				}, P(u.value ? "相册" : "相册🔒"), 9, gS),
				G("button", {
					type: "button",
					disabled: !d.value,
					onClick: v[5] ||= (e) => B(n).ui.showQuestMap = !B(n).ui.showQuestMap,
					title: d.value ? "她交给你的事" : "接到第一件事后开启"
				}, P(d.value ? "任务" : "任务🔒"), 9, _S),
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[6] ||= (e) => B(n).ui.showEventLedger = !B(n).ui.showEventLedger,
					title: u.value ? "已发生的事" : "故事开始后开启"
				}, P(u.value ? "事件" : "事件🔒"), 9, vS),
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[7] ||= (e) => B(n).ui.showActivityPanel = !B(n).ui.showActivityPanel,
					title: u.value ? "你可以做的事" : "故事开始后开启"
				}, P(u.value ? "行动" : "行动🔒"), 9, yS),
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[8] ||= (e) => B(n).ui.showLoadoutPanel = !B(n).ui.showLoadoutPanel,
					title: u.value ? "随身物品与衣装" : "故事开始后开启"
				}, P(u.value ? "整备" : "整备🔒"), 9, bS),
				G("button", {
					type: "button",
					disabled: !f.value,
					onClick: v[9] ||= (e) => B(n).ui.showTacticalPanel = !B(n).ui.showTacticalPanel,
					title: f.value ? "当下的对峙" : "遇到第一次冲突后开启"
				}, P(f.value ? "战术" : "战术🔒"), 9, xS),
				G("button", {
					type: "button",
					disabled: !u.value,
					onClick: v[10] ||= (e) => B(n).ui.showProgressionPanel = !B(n).ui.showProgressionPanel,
					title: u.value ? "你的成长" : "故事开始后开启"
				}, P(u.value ? "成长" : "成长🔒"), 9, SS),
				G("button", {
					type: "button",
					onClick: v[11] ||= (e) => B(n).ui.showOpeningStoryPanel = !B(n).ui.showOpeningStoryPanel,
					title: "她与你的故事线"
				}, "故事")
			])) : na("", !0),
			B(n).ui.showSetup ? (U(), W("section", CS, [
				G("header", null, [v[26] ||= G("h2", null, "关于你", -1), G("button", {
					type: "button",
					onClick: v[12] ||= (e) => B(n).ui.showSetup = !1
				}, "关闭")]),
				G("label", null, [v[27] ||= ta("你的名字", -1), jn(G("input", { "onUpdate:modelValue": v[13] ||= (e) => o.name = e }, null, 512), [[Yo, o.name]])]),
				G("label", null, [v[28] ||= ta("她该怎么称呼你", -1), jn(G("input", { "onUpdate:modelValue": v[14] ||= (e) => o.addressName = e }, null, 512), [[Yo, o.addressName]])]),
				G("label", null, [v[29] ||= ta("你的性别", -1), jn(G("input", { "onUpdate:modelValue": v[15] ||= (e) => o.gender = e }, null, 512), [[Yo, o.gender]])]),
				G("label", null, [v[30] ||= ta("你看起来是什么样子", -1), jn(G("textarea", { "onUpdate:modelValue": v[16] ||= (e) => o.appearance = e }, null, 512), [[Yo, o.appearance]])]),
				G("label", null, [v[31] ||= ta("你从哪里来", -1), jn(G("textarea", { "onUpdate:modelValue": v[17] ||= (e) => o.background = e }, null, 512), [[Yo, o.background]])]),
				G("label", null, [v[32] ||= ta("哪些事她绝对不能对你做", -1), jn(G("textarea", { "onUpdate:modelValue": v[18] ||= (e) => o.boundaries = e }, null, 512), [[Yo, o.boundaries]])]),
				G("div", wS, [(U(), W(H, null, V(s, (e) => G("button", {
					key: e.id,
					type: "button",
					class: N({ selected: o.routePreference === e.id }),
					onClick: (t) => o.routePreference = e.id
				}, P(e.label), 11, TS)), 64))]),
				G("div", ES, [(U(), W(H, null, V(c, (e) => G("button", {
					key: e.id,
					type: "button",
					class: N({ selected: B(n).save.motionLevel === e.id }),
					onClick: (t) => B(n).setMotionLevel(e.id)
				}, " 动效" + P(e.label), 11, DS)), 64))]),
				G("div", OS, [G("label", null, [v[33] ||= ta("背景音乐: ", -1), G("input", {
					type: "range",
					min: "0",
					max: "1",
					step: "0.05",
					value: B(n).save.bgmVolume,
					onInput: v[19] ||= (e) => B(n).setBGMVolume(Number(e.target.value))
				}, null, 40, kS)]), G("label", null, [v[34] ||= ta("音效: ", -1), G("input", {
					type: "range",
					min: "0",
					max: "1",
					step: "0.05",
					value: B(n).save.seVolume,
					onInput: v[20] ||= (e) => B(n).setSEVolume(Number(e.target.value))
				}, null, 40, AS)])]),
				G("button", {
					class: "primary-command",
					type: "button",
					onClick: h
				}, "让她记住你")
			])) : na("", !0),
			B(n).ui.showGallery ? (U(), W("section", jS, [G("header", null, [v[35] ||= G("h2", null, "回忆图", -1), G("button", {
				type: "button",
				onClick: v[21] ||= (e) => B(n).ui.showGallery = !1
			}, "关闭")]), G("div", MS, [(U(!0), W(H, null, V(B(n).galleryItems, (e) => (U(), W("figure", { key: e.id }, [G("img", {
				src: B(Mx)(e.id),
				alt: e.id
			}, null, 8, NS), G("figcaption", null, P(e.label), 1)]))), 128)), (U(!0), W(H, null, V(l.value, (e) => (U(), W("figure", {
				key: `locked-${e}`,
				class: "locked"
			}, [...v[36] ||= [G("div", null, "未解锁", -1), G("figcaption", null, "未解锁", -1)]]))), 128))])])) : na("", !0),
			r.value ? (U(), W("section", PS, [
				G("header", null, [v[37] ||= G("h2", null, "存档", -1), G("button", {
					type: "button",
					onClick: v[22] ||= (e) => r.value = ""
				}, "关闭")]),
				G("textarea", {
					readonly: "",
					value: r.value
				}, null, 8, FS),
				jn(G("textarea", {
					"onUpdate:modelValue": v[23] ||= (e) => i.value = e,
					placeholder: "粘贴存档 JSON"
				}, null, 512), [[Yo, i.value]]),
				G("button", {
					class: "primary-command",
					type: "button",
					onClick: _
				}, "导入存档")
			])) : na("", !0),
			B(n).ui.showRouteBoard ? (U(), W("div", IS, [
				G("header", LS, [v[38] ||= G("h2", null, "选择路线", -1), G("button", {
					type: "button",
					onClick: v[24] ||= (e) => B(n).ui.showRouteBoard = !1
				}, "关闭")]),
				v[39] ||= G("p", { class: "route-hint" }, "每条路线是一次完整的情感体验。选你想要的，而不是看起来最强的。", -1),
				(U(), W(H, null, V(s, (e) => G("button", {
					key: e.id,
					type: "button",
					class: N(["route-card", { selected: B(n).save.route === e.id }]),
					onClick: (t) => B(n).setRoute(e.id)
				}, [G("span", zS, P(e.label), 1), G("span", BS, P(e.hook), 1)], 10, RS)), 64))
			])) : na("", !0),
			G("img", {
				class: "ui-textbox-plate",
				src: B(jx)("ui/textbox.svg"),
				alt: ""
			}, null, 8, VS)
		], 64));
	}
}), [["__scopeId", "data-v-2ff6958a"]]), US = { class: "modal-panel opening-story-panel" }, WS = { class: "story-summary" }, GS = { class: "route-board-section story-commands" }, KS = ["disabled"], qS = ["disabled"], JS = { class: "story-grid" }, YS = { class: "route-board-section story-drafts" }, XS = {
	key: 0,
	class: "empty-state"
}, ZS = { class: "route-board-title" }, QS = { class: "story-draft-text" }, $S = { class: "story-actions" }, eC = ["disabled", "onClick"], tC = ["disabled", "onClick"], nC = { class: "route-board-section story-summaries" }, rC = {
	key: 0,
	class: "empty-state"
}, iC = { class: "route-board-title" }, aC = { class: "route-board-section story-log-list" }, oC = {
	key: 0,
	class: "empty-state"
}, sC = { class: "route-board-title" }, cC = /* @__PURE__ */ $n({
	__name: "OpeningStoryPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.openingDraftOptions), r = K(() => t.currentOpeningDraft), i = K(() => t.recentStoryLogs), a = K(() => t.storySummaries), o = {
			drafted: "待确认",
			confirmed: "已确认",
			archived: "已归档"
		}, s = {
			opening: "开场",
			choice: "选择",
			activity: "行动",
			quest: "任务",
			tactical: "战术",
			progression: "成长",
			summary: "摘要"
		};
		function c(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		async function l() {
			await t.createOpeningDraft();
		}
		return (e, u) => (U(), W("section", US, [
			G("header", null, [G("div", null, [u[2] ||= G("h2", null, "开场草案与故事日志", -1), G("p", null, P(B(t).routeLabel) + " 路 · opening_story_log · AI 草案确认与长期摘要", 1)]), G("button", {
				type: "button",
				onClick: u[0] ||= (e) => B(t).ui.showOpeningStoryPanel = !1
			}, "关闭")]),
			G("div", WS, [
				G("article", null, [u[3] ||= G("span", null, "开场草案", -1), G("strong", null, P(n.value.length), 1)]),
				G("article", null, [u[4] ||= G("span", null, "当前草案", -1), G("strong", null, P(r.value ? o[r.value.status] : "无"), 1)]),
				G("article", null, [u[5] ||= G("span", null, "路线日志", -1), G("strong", null, P(i.value.length), 1)]),
				G("article", null, [u[6] ||= G("span", null, "摘要批次", -1), G("strong", null, P(a.value.length), 1)])
			]),
			G("section", GS, [
				u[7] ||= G("div", null, [G("strong", null, "开场状态机"), G("p", null, "草案只有在玩家确认后才写入故事日志与动态记忆；归档不会改变长期事实。")], -1),
				G("button", {
					type: "button",
					disabled: B(t).loading,
					onClick: l
				}, P(B(t).loading ? "生成中" : "生成开场草案"), 9, KS),
				G("button", {
					type: "button",
					disabled: !i.value.length,
					onClick: u[1] ||= (...e) => B(t).summarizeCurrentStory && B(t).summarizeCurrentStory(...e)
				}, "生成摘要", 8, qS)
			]),
			G("div", JS, [
				G("section", YS, [
					u[9] ||= G("h3", null, "草案队列", -1),
					n.value.length ? na("", !0) : (U(), W("p", XS, "当前路线还没有开场草案。")),
					(U(!0), W(H, null, V(n.value, (e) => (U(), W("article", {
						key: e.id,
						class: N([e.status])
					}, [
						G("div", ZS, [G("strong", null, P(e.title), 1), G("span", null, P(o[e.status]), 1)]),
						G("p", QS, P(e.draftText), 1),
						G("details", null, [
							u[8] ||= G("summary", null, "约束与提示", -1),
							G("ul", null, [(U(!0), W(H, null, V(e.constraints, (e) => (U(), W("li", { key: e }, P(e), 1))), 128))]),
							G("pre", null, P(e.prompt), 1)
						]),
						G("div", $S, [G("button", {
							type: "button",
							disabled: e.status !== "drafted",
							onClick: (n) => B(t).confirmOpening(e.id)
						}, "确认开场", 8, eC), G("button", {
							type: "button",
							disabled: e.status !== "drafted",
							onClick: (n) => B(t).archiveOpening(e.id)
						}, "归档草案", 8, tC)])
					], 2))), 128))
				]),
				G("section", nC, [
					u[10] ||= G("h3", null, "故事摘要", -1),
					a.value.length ? na("", !0) : (U(), W("p", rC, "尚未生成路线摘要。")),
					(U(!0), W(H, null, V(a.value, (e) => (U(), W("article", { key: e.id }, [
						G("div", iC, [G("strong", null, P(e.title), 1), G("span", null, P(e.entryIds.length) + " 条", 1)]),
						G("p", null, P(e.summary), 1),
						G("small", null, P(c(e.updatedAt)), 1)
					]))), 128))
				]),
				G("section", aC, [
					u[11] ||= G("h3", null, "路线故事日志", -1),
					i.value.length ? na("", !0) : (U(), W("p", oC, "当前路线还没有长期故事日志。")),
					(U(!0), W(H, null, V(i.value, (e) => (U(), W("article", {
						key: e.id,
						class: N({ important: e.important })
					}, [
						G("div", sC, [G("strong", null, P(s[e.kind]) + " · " + P(e.title), 1), G("span", null, P(c(e.createdAt)), 1)]),
						G("p", null, P(e.summary), 1),
						G("small", null, P(e.source), 1)
					], 2))), 128))
				])
			])
		]));
	}
}), lC = { class: "modal-panel progression-panel" }, uC = { class: "progression-summary" }, dC = { class: "route-board-section progression-disclaimer" }, fC = { class: "progression-grid" }, pC = { class: "route-board-section progression-index" }, mC = { class: "route-board-title" }, hC = { class: "route-board-section progression-professions" }, gC = { class: "route-board-title" }, _C = ["disabled", "onClick"], vC = { class: "route-board-title active-modifier" }, yC = { class: "route-board-section progression-achievements" }, bC = { class: "route-board-title" }, xC = { class: "route-board-section progression-overlays" }, SC = { class: "route-board-title" }, CC = ["disabled", "onClick"], wC = { class: "route-board-section progression-branches" }, TC = { class: "route-board-title" }, EC = ["disabled", "onClick"], DC = { class: "route-board-section progression-log" }, OC = {
	key: 0,
	class: "empty-state"
}, kC = { class: "route-board-title" }, AC = { class: "route-board-title" }, jC = { class: "route-board-title" }, MC = { class: "profession-legend" }, NC = /* @__PURE__ */ $n({
	__name: "ProgressionPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.narrativeCoverage), r = K(() => t.achievementOptions), i = K(() => t.professionOptions), a = K(() => t.realityOverlayOptions), o = K(() => t.sceneBranchOptions), s = K(() => t.narrativeIndexRecords), c = K(() => t.recentAchievementLog), l = K(() => t.recentRealityOverlayLog), u = K(() => t.recentSceneBranchLog), d = K(() => t.activeProfessionModifier), f = {
			locked: "未解锁",
			unlocked: "已解锁"
		}, p = {
			locked: "未解锁",
			available: "可切换",
			active: "当前专精"
		}, m = {
			locked: "未激活",
			active: "待确认",
			resolved: "已确认"
		}, h = {
			locked: "未解锁",
			available: "可记录",
			resolved: "已记录"
		}, g = {
			frontend_scene: "前端场景",
			route_quest: "路线任务",
			verified_lore: "深写适配",
			bridge_lore: "桥接索引"
		}, _ = {
			indexed: "已索引",
			expanded: "已扩展",
			playable: "可游玩",
			bridge: "桥接"
		}, v = {
			narrative_curator: "剧情索引师",
			boundary_mediator: "边界调停者",
			memory_surgeon: "记忆修复师",
			ring_counterforger: "契约反写者"
		}, y = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码",
			trust: "信任",
			danger: "危险",
			artResonance: "共鸣"
		};
		function b(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => `${y[e]} ${Number(t) > 0 ? "+" : ""}${t}`);
			return t.length ? t.join(" / ") : "无";
		}
		function x(e) {
			let t = Object.entries(e).filter(([e, t]) => e !== "professionXp" && e !== "flag" && t !== void 0 && t !== 0).map(([e, t]) => `${e} ${Number(t) > 0 ? "+" : ""}${t}`);
			return t.length ? t.join(" / ") : "长线经验";
		}
		function S(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (e, y) => (U(), W("section", lC, [
			G("header", null, [G("div", null, [y[1] ||= G("h2", null, "剧情索引与成长层", -1), G("p", null, P(B(t).routeLabel) + " · 成就、专精、现实覆盖、分支事件", 1)]), G("button", {
				type: "button",
				onClick: y[0] ||= (e) => B(t).ui.showProgressionPanel = !1
			}, "关闭")]),
			G("div", uC, [
				G("article", null, [y[2] ||= G("span", null, "标题索引", -1), G("strong", null, P(n.value.indexedTitles) + "/" + P(n.value.manifestTitles), 1)]),
				G("article", null, [y[3] ||= G("span", null, "深写适配", -1), G("strong", null, P(n.value.deepLoreTitles) + "/" + P(n.value.manifestTitles), 1)]),
				G("article", null, [y[4] ||= G("span", null, "桥接层", -1), G("strong", null, P(n.value.bridgeTitles), 1)]),
				G("article", null, [y[5] ||= G("span", null, "扩写桥接", -1), G("strong", null, P(n.value.expandedBridgeTitles), 1)]),
				G("article", null, [y[6] ||= G("span", null, "前端场景", -1), G("strong", null, P(n.value.frontendScenes), 1)]),
				G("article", null, [y[7] ||= G("span", null, "任务节点", -1), G("strong", null, P(n.value.routeQuestNodes), 1)]),
				G("article", null, [y[8] ||= G("span", null, "完整复原", -1), G("strong", null, P(n.value.fullPlotRestored ? "是" : "否"), 1)])
			]),
			G("section", dC, [y[9] ||= G("div", { class: "route-board-title" }, [G("strong", null, "当前剧情系统判断"), G("span", null, "可验证状态")], -1), G("p", null, P(n.value.status), 1)]),
			G("div", fC, [
				G("section", pC, [y[10] ||= G("h3", null, "剧情索引", -1), (U(!0), W(H, null, V(s.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", mC, [G("strong", null, P(e.title), 1), G("span", null, P(g[e.tier]) + " · " + P(_[e.status]), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.scope) + "：" + P(e.coverage) + "/" + P(e.total), 1)
				], 2))), 128))]),
				G("section", hC, [
					y[12] ||= G("h3", null, "职业化专精", -1),
					(U(!0), W(H, null, V(i.value, (e) => (U(), W("article", {
						key: e.id,
						class: N([e.status])
					}, [
						G("div", gC, [G("strong", null, P(e.label), 1), G("span", null, "Lv" + P(e.level) + " · " + P(p[e.status]), 1)]),
						G("p", null, P(e.detail), 1),
						G("small", null, "经验 " + P(e.xp) + "/" + P(e.nextLevelXp) + " · " + P(b(e.modifier)), 1),
						G("button", {
							type: "button",
							disabled: e.status === "locked" || e.status === "active",
							onClick: (n) => B(t).chooseProfession(e.id)
						}, P(e.status === "active" ? "当前专精" : "切换专精"), 9, _C)
					], 2))), 128)),
					G("div", vC, [y[11] ||= G("strong", null, "当前加成", -1), G("span", null, P(b(d.value)), 1)])
				]),
				G("section", yC, [y[13] ||= G("h3", null, "成就", -1), (U(!0), W(H, null, V(r.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", bC, [G("strong", null, P(e.label), 1), G("span", null, P(f[e.status]), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.status === "unlocked" ? x(e.reward) : e.lockedReason ?? e.requirement), 1)
				], 2))), 128))]),
				G("section", xC, [y[14] ||= G("h3", null, "现实覆盖", -1), (U(!0), W(H, null, V(a.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", SC, [G("strong", null, P(e.label), 1), G("span", null, "强度 " + P(e.intensity) + " · " + P(m[e.status]), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.directive), 1),
					G("button", {
						type: "button",
						disabled: e.status === "locked" || e.status === "resolved",
						onClick: (n) => B(t).resolveOverlay(e.id)
					}, P(e.status === "resolved" ? "已确认" : "确认覆盖"), 9, CC)
				], 2))), 128))]),
				G("section", wC, [y[15] ||= G("h3", null, "场景分支", -1), (U(!0), W(H, null, V(o.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", TC, [G("strong", null, P(e.label), 1), G("span", null, "第 " + P(e.chapter) + " 章 · " + P(h[e.status]), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.status === "locked" ? e.lockedReason ?? e.requirement : x(e.reward)), 1),
					G("button", {
						type: "button",
						disabled: e.status === "locked" || e.status === "resolved",
						onClick: (n) => B(t).resolveBranch(e.id)
					}, P(e.status === "resolved" ? "已记录" : "记录分支"), 9, EC)
				], 2))), 128))]),
				G("section", DC, [
					y[16] ||= G("h3", null, "长线日志", -1),
					!c.value.length && !l.value.length && !u.value.length ? (U(), W("p", OC, "当前路线尚无 v9 长线日志。")) : na("", !0),
					(U(!0), W(H, null, V(c.value, (e) => (U(), W("article", { key: e.id }, [G("div", kC, [G("strong", null, "成就 · " + P(e.label), 1), G("span", null, P(S(e.createdAt)), 1)]), G("p", null, P(e.result), 1)]))), 128)),
					(U(!0), W(H, null, V(l.value, (e) => (U(), W("article", { key: e.id }, [G("div", AC, [G("strong", null, "现实 · " + P(e.label), 1), G("span", null, P(S(e.createdAt)), 1)]), G("p", null, P(e.result), 1)]))), 128)),
					(U(!0), W(H, null, V(u.value, (e) => (U(), W("article", { key: e.id }, [G("div", jC, [G("strong", null, "分支 · " + P(e.label), 1), G("span", null, P(S(e.createdAt)), 1)]), G("p", null, P(e.result), 1)]))), 128))
				])
			]),
			G("p", MC, " 专精标签：" + P(Object.values(v).join(" / ")), 1)
		]));
	}
}), PC = { class: "modal-panel quest-map-panel" }, FC = { class: "economy-grid" }, IC = { class: "quest-map-grid" }, LC = { class: "map-node-list" }, RC = ["disabled", "onClick"], zC = { class: "quest-node-list" }, BC = { class: "route-board-title" }, VC = ["disabled", "onClick"], HC = { class: "route-board-section quest-log" }, UC = {
	key: 0,
	class: "empty-state"
}, WC = { class: "route-board-title" }, GC = /* @__PURE__ */ $n({
	__name: "QuestMapPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.routeMapNodes), r = K(() => t.routeQuestNodes), i = K(() => t.recentQuestProgressLog), a = K(() => t.save.routeEconomy), o = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码"
		}, s = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码",
			danger: "危险",
			trust: "信任",
			affection: "好感",
			artResonance: "艺术共鸣",
			unlockCg: "解锁CG",
			flag: "路线记录"
		};
		function c(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => `${o[e]} -${t}`);
			return t.length ? t.join(" / ") : "无";
		}
		function l(e) {
			let t = Object.entries(e).filter(([, e]) => e !== void 0 && e !== 0).map(([e, t]) => {
				let n = s[e];
				return typeof t == "number" ? `${n} ${t > 0 ? "+" : ""}${t}` : e === "flag" || e === "unlockCg" ? n : `${n} ${t}`;
			});
			return t.length ? t.join(" / ") : "无";
		}
		function u(e) {
			return e.status === "completed" ? "已完成" : e.status === "active" ? "当前" : e.status === "available" ? "可进入" : "锁定";
		}
		function d(e) {
			return e.status === "completed" ? "已完成" : e.status === "available" ? "可推进" : e.lockedReason ?? "锁定";
		}
		function f(e) {
			return e <= 2 ? "低" : e <= 4 ? "中" : e <= 6 ? "高" : "极高";
		}
		function p(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (e, o) => (U(), W("section", PC, [
			G("header", null, [G("div", null, [o[1] ||= G("h2", null, "路线任务地图", -1), G("p", null, P(B(t).routeLabel) + " · 任务链与地图节点", 1)]), G("button", {
				type: "button",
				onClick: o[0] ||= (e) => B(t).ui.showQuestMap = !1
			}, "关闭")]),
			G("div", FC, [
				G("article", null, [o[2] ||= G("span", null, "冷静", -1), G("strong", null, P(a.value.composure), 1)]),
				G("article", null, [o[3] ||= G("span", null, "材料", -1), G("strong", null, P(a.value.materials), 1)]),
				G("article", null, [o[4] ||= G("span", null, "筹码", -1), G("strong", null, P(a.value.leverage), 1)]),
				G("article", null, [o[5] ||= G("span", null, "暴露", -1), G("strong", null, P(a.value.exposure), 1)])
			]),
			G("div", IC, [G("aside", LC, [(U(!0), W(H, null, V(n.value, (e) => (U(), W("button", {
				key: e.id,
				type: "button",
				class: N([e.status]),
				disabled: e.status === "locked",
				onClick: (n) => B(t).selectMap(e.id)
			}, [
				G("span", null, "第 " + P(e.stage) + " 幕 · 风险 " + P(f(e.dangerLevel)), 1),
				G("strong", null, P(e.label), 1),
				G("small", null, P(u(e)), 1)
			], 10, RC))), 128))]), G("div", zC, [(U(!0), W(H, null, V(r.value, (e) => (U(), W("article", {
				key: e.id,
				class: N([e.status, { current: e.mapNodeId === B(t).save.currentMapNodeId }])
			}, [
				G("div", BC, [G("strong", null, P(e.title), 1), G("span", null, P(d(e)), 1)]),
				G("p", null, P(e.detail), 1),
				G("dl", null, [
					o[6] ||= G("dt", null, "地图", -1),
					G("dd", null, P(n.value.find((t) => t.id === e.mapNodeId)?.label ?? e.mapNodeId), 1),
					o[7] ||= G("dt", null, "成本", -1),
					G("dd", null, P(c(e.cost)), 1),
					o[8] ||= G("dt", null, "收益", -1),
					G("dd", null, P(l(e.reward)), 1)
				]),
				G("button", {
					type: "button",
					disabled: e.status !== "available",
					onClick: (n) => B(t).advanceQuest(e.id)
				}, "推进任务", 8, VC)
			], 2))), 128))])]),
			G("section", HC, [
				o[9] ||= G("h3", null, "任务日志", -1),
				i.value.length ? na("", !0) : (U(), W("p", UC, "尚未推进当前路线任务。")),
				(U(!0), W(H, null, V(i.value, (e) => (U(), W("article", { key: e.id }, [G("div", WC, [G("strong", null, P(e.title), 1), G("span", null, P(p(e.createdAt)), 1)]), G("p", null, P(e.result), 1)]))), 128))
			])
		]));
	}
}), KC = { class: "modal-panel route-board-panel" }, qC = { class: "route-board-grid" }, JC = { class: "route-board-section objective-list" }, YC = { class: "route-board-title" }, XC = { class: "meter" }, ZC = { class: "route-board-section consequence-list" }, QC = {
	key: 0,
	class: "empty-state"
}, $C = { class: "route-board-title" }, ew = { class: "route-board-section timeline-list" }, tw = {
	key: 0,
	class: "empty-state"
}, nw = /* @__PURE__ */ $n({
	__name: "RouteBoardPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.activeRouteObjectives), r = K(() => t.recentConsequences), i = K(() => t.recentTimeline);
		return (e, a) => (U(), W("section", KC, [G("header", null, [G("div", null, [a[1] ||= G("h2", null, "路线档案", -1), G("p", null, P(B(t).routeLabel) + " · 第 " + P(B(t).save.chapter) + " 章", 1)]), G("button", {
			type: "button",
			onClick: a[0] ||= (e) => B(t).ui.showRouteBoard = !1
		}, "关闭")]), G("div", qC, [
			G("section", JC, [a[2] ||= G("h3", null, "当前目标", -1), (U(!0), W(H, null, V(n.value, (e) => (U(), W("article", {
				key: e.id,
				class: N([`objective-${e.status}`])
			}, [
				G("div", YC, [G("strong", null, P(e.title), 1), G("span", null, P(e.status === "completed" ? "完成" : `${e.progress}/${e.target}`), 1)]),
				G("p", null, P(e.detail), 1),
				G("div", XC, [G("i", { style: se({ width: `${Math.min(100, e.progress / e.target * 100)}%` }) }, null, 4)])
			], 2))), 128))]),
			G("section", ZC, [
				a[3] ||= G("h3", null, "后果记录", -1),
				r.value.length ? na("", !0) : (U(), W("p", QC, "尚未触发结构化后果。")),
				(U(!0), W(H, null, V(r.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([`consequence-${e.level}`])
				}, [G("div", $C, [G("strong", null, P(e.title), 1), G("span", null, P(e.level), 1)]), G("p", null, P(e.detail), 1)], 2))), 128))
			]),
			G("section", ew, [
				a[4] ||= G("h3", null, "行动时间线", -1),
				i.value.length ? na("", !0) : (U(), W("p", tw, "完成一次选择后将生成行动记录。")),
				G("ol", null, [(U(!0), W(H, null, V(i.value, (e) => (U(), W("li", { key: e.id }, [G("span", null, P(e.kind), 1), G("strong", null, P(e.summary), 1)]))), 128))])
			])
		])]));
	}
}), rw = { class: "status-panel" }, iw = { class: "meter" }, aw = { class: "mood" }, ow = /* @__PURE__ */ $n({
	__name: "StatusPanel",
	setup(e) {
		let t = Rd(), n = K(() => {
			let e = t.save.sceneId || "";
			return e.startsWith("opening") ? "夜雨的边界" : e.startsWith("rain") ? "雨巷" : e.startsWith("white") ? "白色画布" : e.startsWith("golden") ? "金枝腔室" : e.startsWith("ring") ? "环指画廊" : e.startsWith("surgery") ? "记忆手术室" : t.save.chapter ? "故事进行中" : "尚未开始";
		});
		function r(e, t) {
			return t === "affection" ? e >= 80 ? "她离不开你了" : e >= 50 ? "她愿意为你停笔" : e >= 25 ? "她在试着记住你" : "她还没看清你" : t === "trust" ? e >= 75 ? "她把笔交给你" : e >= 40 ? "她不再躲闪" : "她还在打量" : t === "danger" ? e >= 70 ? "环指的视线已锁定" : e >= 40 ? "有人在听" : "暂时无人盯梢" : e >= 75 ? "你和她的笔触同频" : e >= 35 ? "画作偶尔会回应你" : "画作还在沉默";
		}
		let i = K(() => [
			{
				label: "心意",
				value: t.save.affection.albina,
				mood: r(t.save.affection.albina, "affection")
			},
			{
				label: "信任",
				value: t.save.trust,
				mood: r(t.save.trust, "trust")
			},
			{
				label: "危险",
				value: t.save.danger,
				mood: r(t.save.danger, "danger")
			},
			{
				label: "共鸣",
				value: t.save.artResonance,
				mood: r(t.save.artResonance, "resonance")
			}
		]), a = K(() => t.activeRouteObjectives.find((e) => e.status === "active")), o = K(() => t.recentConsequences[0]), s = K(() => t.currentRouteEvents[0]);
		return (e, r) => (U(), W("aside", rw, [
			G("header", null, [G("span", null, P(B(t).routeLabel), 1), G("strong", null, "第 " + P(B(t).save.chapter) + " 章", 1)]),
			(U(!0), W(H, null, V(i.value, (e) => (U(), W("div", {
				class: "status-row",
				key: e.label
			}, [
				G("span", null, P(e.label), 1),
				G("div", iw, [G("i", { style: se({ width: `${e.value}%` }) }, null, 4)]),
				G("b", null, P(e.value), 1),
				G("em", aw, P(e.mood), 1)
			]))), 128)),
			G("dl", null, [
				r[0] ||= G("dt", null, "此刻", -1),
				G("dd", null, P(n.value), 1),
				r[1] ||= G("dt", null, "你", -1),
				G("dd", null, P(B(t).save.playerProfile.name), 1),
				r[2] ||= G("dt", null, "正在做的事", -1),
				G("dd", null, P(a.value?.title ?? "这一段没有未完成的事"), 1),
				r[3] ||= G("dt", null, "留下的痕迹", -1),
				G("dd", null, P(o.value?.title ?? "还没有什么被她记下"), 1),
				r[4] ||= G("dt", null, "悬而未决", -1),
				G("dd", null, P(s.value?.title ?? "此刻一切平静"), 1)
			])
		]));
	}
}), sw = { class: "modal-panel tactical-panel" }, cw = { class: "tactical-summary" }, lw = { class: "tactical-grid" }, uw = { class: "route-board-section tactical-conflicts" }, dw = { class: "route-board-title" }, fw = {
	key: 0,
	class: "tactical-actions"
}, pw = ["disabled", "onClick"], mw = { class: "route-board-section tactical-watch" }, hw = {
	key: 0,
	class: "empty-state"
}, gw = { class: "route-board-title" }, _w = { class: "route-board-section tactical-exchanges" }, vw = { class: "route-board-title" }, yw = ["disabled", "onClick"], bw = { class: "route-board-section tactical-contacts" }, xw = { class: "route-board-title" }, Sw = ["disabled", "onClick"], Cw = { class: "route-board-section tactical-log" }, ww = {
	key: 0,
	class: "empty-state"
}, Tw = { class: "route-board-title" }, Ew = /* @__PURE__ */ $n({
	__name: "TacticalPanel",
	setup(e) {
		let t = Rd(), n = K(() => t.tacticalConflictNodes), r = K(() => t.tacticalExchanges), i = K(() => t.tacticalContacts), a = K(() => t.tacticalWatchSignals), o = K(() => t.recentConflictResolutionLog), s = {
			blade: "切断",
			boundary: "边界",
			analysis: "分析",
			resonance: "共鸣"
		}, c = {
			stable: "稳定",
			warning: "警告",
			critical: "临界"
		}, l = {
			composure: "冷静",
			materials: "材料",
			leverage: "筹码",
			danger: "危险",
			trust: "信任",
			affection: "好感",
			artResonance: "共鸣"
		};
		function u(e) {
			let t = Object.entries(e).filter(([e, t]) => e !== "mastery" && e !== "flag" && e !== "unlockCg" && e !== "itemId" && t !== void 0 && t !== 0).map(([e, t]) => `${l[e] ?? e} ${Number(t) > 0 ? "+" : ""}${t}`);
			return t.length ? t.join(" / ") : "无";
		}
		function d(e) {
			let t = Object.entries(e.mastery ?? {});
			return t.length ? t.map(([e, t]) => `${s[e]} +${t}`).join(" / ") : "无";
		}
		function f(e, t) {
			return e === "cleared" ? "已清除" : e === "available" ? "可行动" : t ?? "未解锁";
		}
		function p(e, t) {
			return e === "claimed" ? "已完成" : e === "available" ? "可交换" : t ?? "未解锁";
		}
		function m(e, t) {
			return e === "resolved" ? "已记录" : e === "available" ? "可联络" : t ?? "未解锁";
		}
		function h(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? "已记录" : t.toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (e, l) => (U(), W("section", sw, [
			G("header", null, [G("div", null, [l[1] ||= G("h2", null, "战术规则层", -1), G("p", null, P(B(t).routeLabel) + " · 冲突、熟练度、交换、联络与监视信号", 1)]), G("button", {
				type: "button",
				onClick: l[0] ||= (e) => B(t).ui.showTacticalPanel = !1
			}, "关闭")]),
			G("div", cw, [
				(U(!0), W(H, null, V(B(t).save.conflictMastery, (e, t) => (U(), W("article", { key: t }, [G("span", null, P(s[t]) + "熟练度", 1), G("strong", null, P(e), 1)]))), 128)),
				G("article", null, [l[2] ||= G("span", null, "已清除冲突", -1), G("strong", null, P(n.value.filter((e) => e.status === "cleared").length) + "/" + P(n.value.length), 1)]),
				G("article", null, [l[3] ||= G("span", null, "监视信号", -1), G("strong", null, P(a.value.length), 1)])
			]),
			G("div", lw, [
				G("section", uw, [l[4] ||= G("h3", null, "冲突节点", -1), (U(!0), W(H, null, V(n.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", dw, [G("strong", null, P(e.label), 1), G("span", null, P(f(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, "阶段 " + P(e.stage) + " · 威胁 " + P(e.threat) + " · 耐久 " + P(e.endurance) + " · 建议 " + P(s[e.recommendedMastery]), 1),
					G("small", null, "奖励：" + P(u(e.reward)) + " · 熟练度：" + P(d(e.reward)), 1),
					e.status === "available" ? (U(), W("div", fw, [(U(!0), W(H, null, V(B(t).tacticalConflictActions(e.id), (n) => (U(), W("button", {
						key: n.id,
						type: "button",
						disabled: !n.available,
						onClick: (r) => B(t).resolveTacticalConflict(e.id, n.id)
					}, [G("strong", null, P(n.label), 1), G("small", null, P(s[n.mastery]) + " · 基础 " + P(n.basePower) + " · " + P(u(n.cost)), 1)], 8, pw))), 128))])) : na("", !0)
				], 2))), 128))]),
				G("section", mw, [
					l[5] ||= G("h3", null, "监视信号", -1),
					a.value.length ? na("", !0) : (U(), W("p", hw, "当前路线没有需要处理的监视信号。")),
					(U(!0), W(H, null, V(a.value, (e) => (U(), W("article", {
						key: e.id,
						class: N([`signal-${e.level}`])
					}, [G("div", gw, [G("strong", null, P(e.label), 1), G("span", null, P(c[e.level]) + " · " + P(e.pressure), 1)]), G("p", null, P(e.detail), 1)], 2))), 128))
				]),
				G("section", _w, [l[6] ||= G("h3", null, "交换", -1), (U(!0), W(H, null, V(r.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", vw, [G("strong", null, P(e.label), 1), G("span", null, P(p(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, "成本：" + P(u(e.cost)) + " · 收益：" + P(u(e.reward)), 1),
					G("button", {
						type: "button",
						disabled: e.status !== "available",
						onClick: (n) => B(t).claimTacticalExchange(e.id)
					}, P(e.status === "claimed" ? "已完成" : "交换"), 9, yw)
				], 2))), 128))]),
				G("section", bw, [l[7] ||= G("h3", null, "联络", -1), (U(!0), W(H, null, V(i.value, (e) => (U(), W("article", {
					key: e.id,
					class: N([e.status])
				}, [
					G("div", xw, [G("strong", null, P(e.label), 1), G("span", null, P(m(e.status, e.lockedReason)), 1)]),
					G("p", null, P(e.detail), 1),
					G("small", null, P(e.channel) + " · " + P(c[e.watchLevel]), 1),
					G("button", {
						type: "button",
						disabled: e.status !== "available",
						onClick: (n) => B(t).resolveTacticalContact(e.id)
					}, P(e.status === "resolved" ? "已记录" : "联络"), 9, Sw)
				], 2))), 128))])
			]),
			G("section", Cw, [
				l[8] ||= G("h3", null, "冲突结算日志", -1),
				o.value.length ? na("", !0) : (U(), W("p", ww, "当前路线尚无冲突结算。")),
				(U(!0), W(H, null, V(o.value, (e) => (U(), W("article", {
					key: e.id,
					class: N({ cleared: e.cleared })
				}, [G("div", Tw, [G("strong", null, P(e.label), 1), G("span", null, P(h(e.createdAt)), 1)]), G("p", null, P(e.result), 1)], 2))), 128))
			])
		]));
	}
}), Dw = {
	key: 0,
	class: "fatal"
}, Ow = /* @__PURE__ */ $n({
	__name: "App",
	props: { onExit: { type: Function } },
	setup(e) {
		let t = e, n = Rd();
		return mr(() => {
			n.bootstrap();
		}), (e, r) => (U(), W("div", { class: N(["app-root", [
			`route-${B(n).save.route}`,
			`motion-${B(n).save.motionLevel}`,
			{ flash: B(n).ui.flash }
		]]) }, [
			Zi(Kx),
			Zi(HS, { "on-exit": t.onExit }, null, 8, ["on-exit"]),
			Zi(Ro, { name: "panel" }, {
				default: An(() => [
					B(n).ui.showStatus ? (U(), Ki(ow, { key: "status" })) : na("", !0),
					B(n).ui.showRouteBoard ? (U(), Ki(nw, { key: "route-board" })) : na("", !0),
					B(n).ui.showEventLedger ? (U(), Ki(uf, { key: "event-ledger" })) : na("", !0),
					B(n).ui.showActivityPanel ? (U(), Ki(qd, { key: "activity" })) : na("", !0),
					B(n).ui.showQuestMap ? (U(), Ki(GC, { key: "quest-map" })) : na("", !0),
					B(n).ui.showLoadoutPanel ? (U(), Ki(dS, { key: "loadout" })) : na("", !0),
					B(n).ui.showTacticalPanel ? (U(), Ki(Ew, { key: `tactical-${B(n).ui.tacticalRevision}` })) : na("", !0),
					B(n).ui.showProgressionPanel ? (U(), Ki(NC, { key: `progression-${B(n).ui.progressionRevision}` })) : na("", !0),
					B(n).ui.showOpeningStoryPanel ? (U(), Ki(cC, { key: `opening-${B(n).ui.storyRevision}` })) : na("", !0)
				]),
				_: 1
			}),
			B(n).error ? (U(), W("div", Dw, P(B(n).error), 1)) : na("", !0)
		], 2));
	}
}), kw = "html,body,#app{background:#020307;width:100%;height:100%;margin:0;overflow:hidden}*{box-sizing:border-box}body{font-family:Inter,Noto Sans SC,Microsoft YaHei,system-ui,sans-serif}button,input,textarea{font:inherit}.app-root{--accent:#d7af46;--accent-soft:#d7af4647;--cold:#80c7df;--panel:#070c12b8;--ink:#f6efe1;width:100%;height:100%;color:var(--ink);background:#020307}.route-white_canvas{--accent:#e4c66d;--accent-soft:#e4c66d4d;--cold:#96d1e6}.route-golden_bough_rebuild{--accent:#f0c75e;--accent-soft:#f0c75e57;--cold:#d8f5e5}.route-ring_conspiracy{--accent:#b9444f;--accent-soft:#b9444f57;--cold:#e3c88a}.gal-stage{isolation:isolate;background:#020307;position:fixed;inset:0;overflow:hidden}.gal-bg,.cg-layer,.webgl-layer,.scanline-layer,.vignette-layer{width:100%;height:100%;position:absolute;inset:0}.gal-bg{object-fit:cover;filter:saturate(1.05)contrast(1.08)brightness(.82);animation:26s ease-in-out infinite alternate cinematicDrift;transform:scale(1.05)}.cg-layer{object-fit:cover;opacity:.18;mix-blend-mode:screen;animation:9s ease-in-out infinite alternate cgPulse}.webgl-layer{z-index:2;pointer-events:none}.scanline-layer{z-index:3;pointer-events:none;mix-blend-mode:overlay;opacity:.48;background:linear-gradient(#ffffff0b 1px,#0000 1px) 0 0/100% 4px,linear-gradient(90deg,#0000,#ffffff0f,#0000) 0 0/260% 100%;animation:6s linear infinite scanTravel}.vignette-layer{z-index:4;pointer-events:none;background:radial-gradient(circle at 50% 42%,#0000 0 42%,#00000059 68%,#000000db 100%),linear-gradient(90deg,#000000b8,#0000 20% 80%,#000000bd)}.character-layer{z-index:5;pointer-events:none;position:absolute;inset:0}.character{object-fit:contain;filter:brightness(.72)saturate(.9)drop-shadow(0 34px 42px #000000ad);opacity:.9;width:min(44vw,560px);max-height:100vh;transform:translateX(-50%) scale(var(--sprite-scale,1));transform-origin:50% 96%;transition:filter .45s,opacity .45s,transform .45s;animation:4.2s ease-in-out infinite spriteBreathe;position:absolute;bottom:-7vh}.character.active{filter:brightness(1.08) saturate(1.08) drop-shadow(0 30px 58px #000000d1) drop-shadow(0 0 18px var(--accent-soft));opacity:1}.character.left{left:24%}.character.center{left:50%}.character.right{left:74%}.scene-ribbon{z-index:8;border:1px solid #ffffff29;border-left:3px solid var(--accent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);text-transform:uppercase;background:#02040880;border-radius:8px;align-items:center;gap:12px;min-width:260px;padding:10px 14px;animation:5.4s ease-in-out infinite alternate panelGlide;display:flex;position:absolute;top:22px;left:22px}.scene-ribbon span{color:var(--accent);font-weight:800}.scene-ribbon strong{color:#f6efe1a8;font-size:12px;font-weight:600}.textbox{z-index:12;border:1px solid #ffffff2e;border-top:2px solid var(--accent);background:linear-gradient(135deg, #060a10e0, #091018a8), linear-gradient(90deg, transparent, var(--accent-soft), transparent);-webkit-backdrop-filter:blur(18px)saturate(1.2);backdrop-filter:blur(18px)saturate(1.2);border-radius:8px;min-height:210px;padding:clamp(18px,2vw,28px);position:absolute;bottom:clamp(18px,5vh,58px);left:clamp(18px,5vw,76px);right:clamp(18px,5vw,76px);overflow:hidden;box-shadow:0 30px 90px #0000008a,inset 0 0 42px #ffffff06}.textbox:before{content:\"\";pointer-events:none;background:linear-gradient(90deg,#0000 0 38%,#ffffff0f 48%,#0000 58%),repeating-linear-gradient(135deg,#ffffff09 0 1px,#0000 1px 16px);animation:7s ease-in-out infinite glassSweep;position:absolute;inset:0;transform:translate(-80%)}.speaker-row{align-items:center;gap:12px;margin-bottom:10px;display:flex;position:relative}.speaker{color:var(--accent);font-size:clamp(18px,2vw,25px);font-weight:900}.pulse-mark{background:var(--accent);width:48px;height:2px;box-shadow:0 0 18px var(--accent);animation:1.6s ease-in-out infinite linePulse}.dialogue{color:#fffaefeb;white-space:pre-wrap;min-height:74px;margin:0;font-size:clamp(16px,1.45vw,21px);line-height:1.75;position:relative}.choices{flex-wrap:wrap;gap:10px;margin-top:18px;display:flex;position:relative}.choices button,.topbar button,.route-switch button,.modal-panel button{min-height:38px;color:var(--ink);cursor:pointer;background:#ffffff12;border:1px solid #ffffff2e;border-radius:6px;transition:transform .16s,border-color .16s,background .16s;position:relative;overflow:hidden}.choices button{padding:10px 16px 10px 34px}.choices button:disabled{opacity:.48;cursor:wait}.choices button:hover,.topbar button:hover,.route-switch button:hover,.modal-panel button:hover,.selected{border-color:var(--accent);background:#d7af4629;transform:translateY(-1px)}.choice-line{background:var(--accent);width:12px;height:2px;box-shadow:0 0 12px var(--accent);position:absolute;top:50%;left:12px}.topbar{z-index:20;grid-auto-flow:column;gap:8px;display:grid;position:absolute;top:20px;right:20px}.topbar button{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);background:#0205099e;padding:9px 12px}.route-switch{z-index:19;gap:8px;display:flex;position:absolute;top:22px;left:50%;transform:translate(-50%)}.route-switch button{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);background:#02050994;padding:9px 13px}.status-panel,.modal-panel{z-index:22;border:1px solid #ffffff29;border-top:2px solid var(--accent);-webkit-backdrop-filter:blur(18px)saturate(1.15);backdrop-filter:blur(18px)saturate(1.15);background:#04080dd1;border-radius:8px;box-shadow:0 24px 80px #00000080}.status-panel{width:min(330px,100vw - 40px);padding:16px;animation:4.8s ease-in-out infinite alternate panelGlide;position:absolute;top:78px;right:20px}.status-panel header,.modal-panel header{justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;display:flex}.status-panel header span,.modal-panel h2{color:var(--accent);margin:0;font-size:18px}.status-row{grid-template-columns:48px 1fr 34px;align-items:center;gap:8px;margin:10px 0;font-size:13px;display:grid}.meter{background:#ffffff0f;border:1px solid #ffffff1f;border-radius:5px;height:8px;overflow:hidden}.meter i{background:linear-gradient(90deg, var(--accent), var(--cold));height:100%;box-shadow:0 0 18px var(--accent);transition:width .4s;display:block}.status-panel dl{color:#f6efe1b8;grid-template-columns:54px 1fr;gap:7px 10px;margin:14px 0 0;font-size:12px;display:grid}.status-panel dt{color:#f6efe16b}.status-panel dd{overflow-wrap:anywhere;margin:0}.modal-panel{width:min(860px,100vw - 32px);max-height:calc(100vh - 128px);padding:18px;position:absolute;top:84px;left:50%;overflow:auto;transform:translate(-50%)}.setup-panel{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.setup-panel header,.setup-panel .segmented,.setup-panel .primary-command{grid-column:1/-1}.setup-panel label{color:#f6efe1b3;gap:6px;font-size:13px;display:grid}.setup-panel input,.setup-panel textarea,.save-panel textarea{width:100%;color:var(--ink);background:#ffffff12;border:1px solid #ffffff29;border-radius:6px;outline:none;padding:9px 10px}.setup-panel textarea{resize:vertical;min-height:72px}.segmented{flex-wrap:wrap;gap:8px;display:flex}.segmented button,.primary-command{padding:10px 14px}.gallery-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;display:grid}.gallery-grid figure{background:#ffffff0d;border:1px solid #ffffff24;border-radius:8px;margin:0;overflow:hidden}.gallery-grid img,.gallery-grid .locked div{aspect-ratio:16/9;object-fit:cover;width:100%;display:block}.gallery-grid .locked div{color:#f6efe15c;background:repeating-linear-gradient(135deg,#ffffff0d 0 2px,#0000 2px 12px);place-items:center;display:grid}.gallery-grid figcaption{color:#f6efe1a8;padding:8px;font-size:12px}.save-panel textarea{resize:vertical;min-height:140px;margin-bottom:12px}.route-board-panel header p{color:#f6efe18a;margin:4px 0 0;font-size:12px}.route-board-grid{grid-template-columns:minmax(0,1.18fr) minmax(0,.82fr);gap:12px;display:grid}.route-board-section{background:#ffffff09;border:1px solid #ffffff1f;border-radius:7px;padding:12px}.route-board-section h3{color:var(--accent);margin:0 0 10px;font-size:14px}.route-board-section article{background:#ffffff09;border-left:2px solid #ffffff38;margin-top:9px;padding:9px}.route-board-section article p,.empty-state{color:#f6efe19e;margin:6px 0 0;font-size:12px;line-height:1.55}.route-board-title{justify-content:space-between;align-items:center;gap:8px;font-size:12px;display:flex}.route-board-title span,.timeline-list span{color:var(--accent);text-transform:uppercase;font-size:10px}.objective-completed{border-left-color:var(--accent)!important}.consequence-warning{border-left-color:#e8a54b!important}.consequence-critical{border-left-color:#d7555f!important}.timeline-list{grid-column:1/-1}.timeline-list ol{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:0;padding:0;list-style:none;display:grid}.timeline-list li{color:#f6efe1b8;border:1px solid #ffffff14;gap:4px;padding:8px;font-size:11px;display:grid}.event-ledger-panel header p,.activity-panel header p,.quest-map-panel header p,.loadout-panel header p,.tactical-panel header p{color:#f6efe18a;margin:4px 0 0;font-size:12px}.vector-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.activity-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.activity-grid article{border:1px solid #ffffff1f;border-left:2px solid var(--accent);background:#ffffff0a;border-radius:7px;gap:8px;padding:12px;display:grid}.activity-grid article.locked{opacity:.56;border-left-color:#ffffff3d}.activity-grid p,.activity-log p{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.activity-grid dl{color:#f6efe19e;grid-template-columns:38px 1fr;gap:5px 8px;margin:0;font-size:11px;display:grid}.activity-grid dt{color:#f6efe16b}.activity-grid dd{overflow-wrap:anywhere;margin:0}.activity-grid button{padding:8px 10px}.activity-grid button:disabled{opacity:.5;cursor:not-allowed}.activity-log{margin-top:12px}.quest-map-grid{grid-template-columns:minmax(190px,.35fr) minmax(0,1fr);gap:12px;display:grid}.map-node-list,.quest-node-list{align-content:start;gap:9px;display:grid}.map-node-list button{text-align:left;border-left:2px solid #ffffff38;gap:4px;min-height:72px;padding:10px;display:grid}.map-node-list button.active{border-color:var(--accent);background:#d7af4629}.map-node-list button.completed{border-color:var(--cold)}.map-node-list button.locked{opacity:.42;cursor:not-allowed}.map-node-list span,.map-node-list small{color:#f6efe185;font-size:10px}.map-node-list strong{color:var(--ink);font-size:13px}.quest-node-list article{background:#ffffff0a;border:1px solid #ffffff1f;border-left:2px solid #ffffff3d;border-radius:7px;gap:8px;padding:12px;display:grid}.quest-node-list article.current{background:#d7af4612}.quest-node-list article.available{border-left-color:var(--accent)}.quest-node-list article.completed{border-left-color:var(--cold);opacity:.78}.quest-node-list article.locked{opacity:.54}.quest-node-list p,.quest-log p{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.quest-node-list dl{color:#f6efe19e;grid-template-columns:38px 1fr;gap:5px 8px;margin:0;font-size:11px;display:grid}.quest-node-list dt{color:#f6efe16b}.quest-node-list dd{overflow-wrap:anywhere;margin:0}.quest-node-list button{padding:8px 10px}.quest-node-list button:disabled{opacity:.5;cursor:not-allowed}.quest-log{margin-top:12px}.loadout-summary{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.loadout-summary article{background:#d7af4612;border:1px solid #d7af463d;gap:4px;padding:10px 12px;display:grid}.loadout-summary span{color:#f6efe194;font-size:12px}.loadout-summary strong{color:var(--cold);font-size:21px}.loadout-modifier{margin-bottom:12px}.loadout-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.loadout-grid .route-board-section{min-height:220px}.loadout-grid article{border-left-color:#ffffff38;gap:7px;display:grid}.loadout-grid article.available,.loadout-grid article.unlocked{border-left-color:var(--accent)}.loadout-grid article.equipped,.loadout-grid article.active{border-left-color:var(--cold);background:#59c4c312}.loadout-grid article.locked{opacity:.54}.loadout-grid p,.loadout-grid small,.unlock-log p{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.loadout-grid small{color:#f6efe180}.loadout-grid button{padding:8px 10px}.loadout-grid button:disabled{opacity:.5;cursor:not-allowed}.unlock-log{margin-top:12px}.tactical-summary{grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.tactical-summary article{background:#d7af4612;border:1px solid #d7af463d;gap:4px;padding:10px 12px;display:grid}.tactical-summary span{color:#f6efe194;font-size:12px}.tactical-summary strong{color:var(--cold);font-size:21px}.tactical-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.tactical-grid article,.tactical-log article{border-left-color:#ffffff38;gap:7px;display:grid}.tactical-grid article.available,.tactical-grid article.resolved,.tactical-grid article.cleared,.tactical-log article.cleared{border-left-color:var(--cold)}.tactical-grid article.locked{opacity:.54}.tactical-grid p,.tactical-grid small,.tactical-log p{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.tactical-grid small{color:#f6efe180}.tactical-actions{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;display:grid}.tactical-actions button{text-align:left;gap:4px;min-height:54px;padding:8px;display:grid}.tactical-grid button{padding:8px 10px}.tactical-grid button:disabled,.tactical-actions button:disabled{opacity:.5;cursor:not-allowed}.signal-warning{border-left-color:#e8a54b!important}.signal-critical{border-left-color:#d7555f!important}.tactical-log{margin-top:12px}.progression-summary{grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.progression-summary article{background:#d7af4612;border:1px solid #d7af463d;gap:4px;padding:10px 12px;display:grid}.progression-summary span{color:#f6efe194;font-size:12px}.progression-summary strong{color:var(--cold);font-size:21px}.progression-disclaimer{margin-bottom:12px}.progression-disclaimer p,.progression-grid p,.progression-grid small,.progression-log p,.profession-legend{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.progression-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.progression-grid article{border-left-color:#ffffff38;gap:7px;display:grid}.progression-grid article.unlocked,.progression-grid article.active,.progression-grid article.available,.progression-grid article.resolved,.progression-grid article.playable,.progression-grid article.expanded{border-left-color:var(--cold)}.progression-grid article.locked{opacity:.54}.progression-grid article.bridge,.progression-grid article.indexed{border-left-color:var(--accent)}.progression-grid button{padding:8px 10px}.progression-grid button:disabled{opacity:.5;cursor:not-allowed}.active-modifier{border-top:1px solid #ffffff1a;margin-top:8px;padding:9px 0 0}.profession-legend{color:#f6efe180;margin-top:12px}.story-summary{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.story-summary article{background:#d7af4612;border:1px solid #d7af463d;gap:4px;padding:10px 12px;display:grid}.story-summary span{color:#f6efe194;font-size:12px}.story-summary strong{color:var(--cold);font-size:21px}.story-commands{grid-template-columns:1fr auto auto;align-items:center;gap:10px;margin-bottom:12px;display:grid}.story-commands p,.story-grid p,.story-grid small{color:#f6efe1a3;margin:0;font-size:12px;line-height:1.55}.story-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:12px;display:grid}.story-grid article{border-left-color:#ffffff38;gap:8px;display:grid}.story-grid article.drafted,.story-grid article.important{border-left-color:var(--accent)}.story-grid article.confirmed{border-left-color:var(--cold)}.story-grid article.archived{opacity:.58}.story-log-list{grid-column:1/-1}.story-draft-text,.story-summaries p{white-space:pre-wrap}.story-drafts details{color:#f6efe18f;font-size:11px}.story-drafts ul{margin:8px 0;padding-left:18px}.story-drafts pre{color:#f6efe18f;white-space:pre-wrap;background:#00000038;border:1px solid #ffffff14;max-height:180px;margin:8px 0 0;padding:8px;overflow:auto}.story-actions{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}.economy-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px;display:grid}.economy-grid article{background:#d7af4612;border:1px solid #d7af463d;gap:4px;padding:10px 12px;display:grid}.economy-grid span{color:#f6efe194;font-size:12px}.economy-grid strong{color:var(--cold);font-size:21px}.vector-grid article{background:linear-gradient(135deg,#ffffff13,#ffffff07);border:1px solid #ffffff1f;gap:4px;padding:12px;display:grid}.vector-grid span{color:#f6efe194;font-size:12px}.vector-grid strong{color:var(--accent);font-size:24px}.event-ledger-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.mitigation-actions{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-top:9px;display:grid}.mitigation-actions button{text-align:left;gap:4px;min-height:54px;padding:7px;display:grid}.mitigation-actions button:disabled{opacity:.42;cursor:not-allowed}.mitigation-actions small{color:#f6efe185;font-size:10px;line-height:1.35}.action-log-section{grid-column:1/-1}.ui-textbox-plate{z-index:1;opacity:.08;pointer-events:none;width:min(900px,80vw);position:absolute;bottom:4px;left:50%;transform:translate(-50%)}.loading,.fatal{z-index:30;border:1px solid var(--accent);color:var(--ink);background:#04080dc7;border-radius:6px;padding:10px 14px;position:absolute;left:24px}.loading{bottom:294px}.fatal{border-color:#b9444f;max-width:min(560px,100vw - 48px);bottom:18px}.flash:after{content:\"\";z-index:26;pointer-events:none;background:#fff8da3d;animation:.42s ease-out forwards flashFade;position:fixed;inset:0}.motion-low .gal-bg,.motion-low .cg-layer,.motion-low .character,.motion-low .scanline-layer,.motion-low .textbox:before,.motion-low .status-panel,.motion-low .scene-ribbon{animation:none}@media (width<=820px){.topbar{grid-template-columns:repeat(4,1fr);grid-auto-flow:row;top:12px;left:12px;right:12px}.topbar button,.route-switch button{min-height:34px;padding:7px 8px;font-size:12px}.route-switch{justify-content:center;width:calc(100vw - 24px);top:138px}.scene-ribbon{display:none}.character{width:min(82vw,430px);max-height:80vh;bottom:16vh}.character.left{opacity:.52;left:30%}.character.center,.character.right{left:64%}.textbox{min-height:236px;padding:15px;bottom:12px;left:12px;right:12px}.choices{max-height:88px;overflow:auto}.choices button{text-align:left;width:100%}.status-panel{top:184px;right:12px}.modal-panel{max-height:calc(100vh - 196px);top:184px}.setup-panel,.route-board-grid,.event-ledger-grid,.activity-grid,.quest-map-grid,.loadout-grid,.tactical-grid,.progression-grid,.story-grid,.vector-grid,.economy-grid,.loadout-summary,.tactical-summary,.progression-summary,.story-summary,.story-commands,.tactical-actions,.story-actions,.mitigation-actions,.timeline-list ol{grid-template-columns:1fr}}@keyframes cinematicDrift{0%{transform:scale(1.04)translate(-1%,-1%)}to{transform:scale(1.1)translate(1%,1%)}}@keyframes cgPulse{0%{opacity:.12;transform:scale(1.02)}to{opacity:.25;transform:scale(1.06)}}@keyframes scanTravel{0%{background-position:0 0,0 0}to{background-position:0 24px,260% 0}}@keyframes spriteBreathe{0%,to{translate:0}50%{translate:0 -10px}}@keyframes panelGlide{0%{translate:0}to{translate:0 4px}}@keyframes glassSweep{0%,35%{transform:translate(-86%)}65%,to{transform:translate(86%)}}@keyframes linePulse{0%,to{opacity:.45;transform:scaleX(.55)}50%{opacity:1;transform:scaleX(1)}}@keyframes flashFade{0%{opacity:1}to{opacity:0}}.panel-enter-active,.panel-leave-active{transition:opacity .3s,transform .3s}.panel-enter-from{opacity:0;transform:translateY(10px)}.panel-leave-to{opacity:0;transform:translateY(-10px)}", Aw = null, jw = null;
function Mw(e) {
	let t = e.contentDocument;
	if (!t || !t.body || Aw) return;
	t.body.innerHTML = "<div id=\"app\"></div>";
	let n = t.createElement("style");
	n.textContent = `html,body,#app{margin:0;width:100%;height:100%;overflow:hidden;background:#000;}${kw}`, t.head.appendChild(n), Aw = $o(Ow, { onExit: Pw }), Aw.use(bs()), Aw.mount(t.getElementById("app"));
}
function Nw() {
	if (Aw || jw) return;
	let e = window.parent?.document ?? document, t = e.createElement("iframe");
	t.title = hl, t.setAttribute("script_id", typeof getScriptId == "function" ? getScriptId() : hl), t.style.cssText = [
		"position:fixed",
		"inset:0",
		"width:100vw",
		"height:100dvh",
		"z-index:99999",
		"border:none",
		"background:#000"
	].join(";"), t.addEventListener("load", () => Mw(t)), jw = t, e.body.appendChild(t), setTimeout(() => Mw(t), 0);
}
function Pw() {
	Aw?.unmount(), Aw = null, jw?.remove(), jw = null;
}
function Fw() {
	try {
		typeof replaceScriptButtons == "function" && typeof eventOn == "function" && typeof getButtonEvent == "function" && (replaceScriptButtons([{
			name: gl,
			visible: !0
		}]), eventOn(getButtonEvent(gl), Nw));
	} catch (e) {
		console.warn("[independent-frontend] button registration failed", e);
	}
}
Fw(), Nw(), window.addEventListener("pagehide", Pw);
//#endregion
export { Nw as mountConsole, Pw as unmountConsole };
