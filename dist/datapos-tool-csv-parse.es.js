var ie = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {}, P = [], M = [], Zt = typeof Uint8Array < "u" ? Uint8Array : Array, qe = !1;
function ct() {
  qe = !0;
  for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0, r = t.length; e < r; ++e)
    P[e] = t[e], M[t.charCodeAt(e)] = e;
  M[45] = 62, M[95] = 63;
}
function Xt(t) {
  qe || ct();
  var e, r, n, i, o, s, f = t.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  o = t[f - 2] === "=" ? 2 : t[f - 1] === "=" ? 1 : 0, s = new Zt(f * 3 / 4 - o), n = o > 0 ? f - 4 : f;
  var a = 0;
  for (e = 0, r = 0; e < n; e += 4, r += 3)
    i = M[t.charCodeAt(e)] << 18 | M[t.charCodeAt(e + 1)] << 12 | M[t.charCodeAt(e + 2)] << 6 | M[t.charCodeAt(e + 3)], s[a++] = i >> 16 & 255, s[a++] = i >> 8 & 255, s[a++] = i & 255;
  return o === 2 ? (i = M[t.charCodeAt(e)] << 2 | M[t.charCodeAt(e + 1)] >> 4, s[a++] = i & 255) : o === 1 && (i = M[t.charCodeAt(e)] << 10 | M[t.charCodeAt(e + 1)] << 4 | M[t.charCodeAt(e + 2)] >> 2, s[a++] = i >> 8 & 255, s[a++] = i & 255), s;
}
function Kt(t) {
  return P[t >> 18 & 63] + P[t >> 12 & 63] + P[t >> 6 & 63] + P[t & 63];
}
function er(t, e, r) {
  for (var n, i = [], o = e; o < r; o += 3)
    n = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(Kt(n));
  return i.join("");
}
function Ze(t) {
  qe || ct();
  for (var e, r = t.length, n = r % 3, i = "", o = [], s = 16383, f = 0, a = r - n; f < a; f += s)
    o.push(er(t, f, f + s > a ? a : f + s));
  return n === 1 ? (e = t[r - 1], i += P[e >> 2], i += P[e << 4 & 63], i += "==") : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], i += P[e >> 10], i += P[e >> 4 & 63], i += P[e << 2 & 63], i += "="), o.push(i), o.join("");
}
function ve(t, e, r, n, i) {
  var o, s, f = i * 8 - n - 1, a = (1 << f) - 1, u = a >> 1, h = -7, c = r ? i - 1 : 0, d = r ? -1 : 1, p = t[e + c];
  for (c += d, o = p & (1 << -h) - 1, p >>= -h, h += f; h > 0; o = o * 256 + t[e + c], c += d, h -= 8)
    ;
  for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = s * 256 + t[e + c], c += d, h -= 8)
    ;
  if (o === 0)
    o = 1 - u;
  else {
    if (o === a)
      return s ? NaN : (p ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, n), o = o - u;
  }
  return (p ? -1 : 1) * s * Math.pow(2, o - n);
}
function ht(t, e, r, n, i, o) {
  var s, f, a, u = o * 8 - i - 1, h = (1 << u) - 1, c = h >> 1, d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : o - 1, x = n ? 1 : -1, _ = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (f = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -s)) < 1 && (s--, a *= 2), s + c >= 1 ? e += d / a : e += d * Math.pow(2, 1 - c), e * a >= 2 && (s++, a /= 2), s + c >= h ? (f = 0, s = h) : s + c >= 1 ? (f = (e * a - 1) * Math.pow(2, i), s = s + c) : (f = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + p] = f & 255, p += x, f /= 256, i -= 8)
    ;
  for (s = s << i | f, u += i; u > 0; t[r + p] = s & 255, p += x, s /= 256, u -= 8)
    ;
  t[r + p - x] |= _ * 128;
}
var tr = {}.toString, dt = Array.isArray || function(t) {
  return tr.call(t) == "[object Array]";
}, rr = 50;
l.TYPED_ARRAY_SUPPORT = ie.TYPED_ARRAY_SUPPORT !== void 0 ? ie.TYPED_ARRAY_SUPPORT : !0;
_e();
function _e() {
  return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function q(t, e) {
  if (_e() < e)
    throw new RangeError("Invalid typed array length");
  return l.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = l.prototype) : (t === null && (t = new l(e)), t.length = e), t;
}
function l(t, e, r) {
  if (!l.TYPED_ARRAY_SUPPORT && !(this instanceof l))
    return new l(t, e, r);
  if (typeof t == "number") {
    if (typeof e == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return Ve(this, t);
  }
  return pt(this, t, e, r);
}
l.poolSize = 8192;
l._augment = function(t) {
  return t.__proto__ = l.prototype, t;
};
function pt(t, e, r, n) {
  if (typeof e == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer ? or(t, e, r, n) : typeof e == "string" ? ir(t, e, r) : sr(t, e);
}
l.from = function(t, e, r) {
  return pt(null, t, e, r);
};
l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && l[Symbol.species]);
function mt(t) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be a number');
  if (t < 0)
    throw new RangeError('"size" argument must not be negative');
}
function nr(t, e, r, n) {
  return mt(e), e <= 0 ? q(t, e) : r !== void 0 ? typeof n == "string" ? q(t, e).fill(r, n) : q(t, e).fill(r) : q(t, e);
}
l.alloc = function(t, e, r) {
  return nr(null, t, e, r);
};
function Ve(t, e) {
  if (mt(e), t = q(t, e < 0 ? 0 : ze(e) | 0), !l.TYPED_ARRAY_SUPPORT)
    for (var r = 0; r < e; ++r)
      t[r] = 0;
  return t;
}
l.allocUnsafe = function(t) {
  return Ve(null, t);
};
l.allocUnsafeSlow = function(t) {
  return Ve(null, t);
};
function ir(t, e, r) {
  if ((typeof r != "string" || r === "") && (r = "utf8"), !l.isEncoding(r))
    throw new TypeError('"encoding" must be a valid string encoding');
  var n = gt(e, r) | 0;
  t = q(t, n);
  var i = t.write(e, r);
  return i !== n && (t = t.slice(0, i)), t;
}
function Ue(t, e) {
  var r = e.length < 0 ? 0 : ze(e.length) | 0;
  t = q(t, r);
  for (var n = 0; n < r; n += 1)
    t[n] = e[n] & 255;
  return t;
}
function or(t, e, r, n) {
  if (e.byteLength, r < 0 || e.byteLength < r)
    throw new RangeError("'offset' is out of bounds");
  if (e.byteLength < r + (n || 0))
    throw new RangeError("'length' is out of bounds");
  return r === void 0 && n === void 0 ? e = new Uint8Array(e) : n === void 0 ? e = new Uint8Array(e, r) : e = new Uint8Array(e, r, n), l.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = l.prototype) : t = Ue(t, e), t;
}
function sr(t, e) {
  if ($(e)) {
    var r = ze(e.length) | 0;
    return t = q(t, r), t.length === 0 || e.copy(t, 0, 0, r), t;
  }
  if (e) {
    if (typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer || "length" in e)
      return typeof e.length != "number" || Rr(e.length) ? q(t, 0) : Ue(t, e);
    if (e.type === "Buffer" && dt(e.data))
      return Ue(t, e.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function ze(t) {
  if (t >= _e())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + _e().toString(16) + " bytes");
  return t | 0;
}
l.isBuffer = D;
function $(t) {
  return !!(t != null && t._isBuffer);
}
l.compare = function(e, r) {
  if (!$(e) || !$(r))
    throw new TypeError("Arguments must be Buffers");
  if (e === r) return 0;
  for (var n = e.length, i = r.length, o = 0, s = Math.min(n, i); o < s; ++o)
    if (e[o] !== r[o]) {
      n = e[o], i = r[o];
      break;
    }
  return n < i ? -1 : i < n ? 1 : 0;
};
l.isEncoding = function(e) {
  switch (String(e).toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "latin1":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return !0;
    default:
      return !1;
  }
};
l.concat = function(e, r) {
  if (!dt(e))
    throw new TypeError('"list" argument must be an Array of Buffers');
  if (e.length === 0)
    return l.alloc(0);
  var n;
  if (r === void 0)
    for (r = 0, n = 0; n < e.length; ++n)
      r += e[n].length;
  var i = l.allocUnsafe(r), o = 0;
  for (n = 0; n < e.length; ++n) {
    var s = e[n];
    if (!$(s))
      throw new TypeError('"list" argument must be an Array of Buffers');
    s.copy(i, o), o += s.length;
  }
  return i;
};
function gt(t, e) {
  if ($(t))
    return t.length;
  if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
    return t.byteLength;
  typeof t != "string" && (t = "" + t);
  var r = t.length;
  if (r === 0) return 0;
  for (var n = !1; ; )
    switch (e) {
      case "ascii":
      case "latin1":
      case "binary":
        return r;
      case "utf8":
      case "utf-8":
      case void 0:
        return we(t).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return r * 2;
      case "hex":
        return r >>> 1;
      case "base64":
        return xt(t).length;
      default:
        if (n) return we(t).length;
        e = ("" + e).toLowerCase(), n = !0;
    }
}
l.byteLength = gt;
function fr(t, e, r) {
  var n = !1;
  if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e))
    return "";
  for (t || (t = "utf8"); ; )
    switch (t) {
      case "hex":
        return _r(this, e, r);
      case "utf8":
      case "utf-8":
        return yt(this, e, r);
      case "ascii":
        return mr(this, e, r);
      case "latin1":
      case "binary":
        return gr(this, e, r);
      case "base64":
        return dr(this, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return wr(this, e, r);
      default:
        if (n) throw new TypeError("Unknown encoding: " + t);
        t = (t + "").toLowerCase(), n = !0;
    }
}
l.prototype._isBuffer = !0;
function K(t, e, r) {
  var n = t[e];
  t[e] = t[r], t[r] = n;
}
l.prototype.swap16 = function() {
  var e = this.length;
  if (e % 2 !== 0)
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  for (var r = 0; r < e; r += 2)
    K(this, r, r + 1);
  return this;
};
l.prototype.swap32 = function() {
  var e = this.length;
  if (e % 4 !== 0)
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (var r = 0; r < e; r += 4)
    K(this, r, r + 3), K(this, r + 1, r + 2);
  return this;
};
l.prototype.swap64 = function() {
  var e = this.length;
  if (e % 8 !== 0)
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  for (var r = 0; r < e; r += 8)
    K(this, r, r + 7), K(this, r + 1, r + 6), K(this, r + 2, r + 5), K(this, r + 3, r + 4);
  return this;
};
l.prototype.toString = function() {
  var e = this.length | 0;
  return e === 0 ? "" : arguments.length === 0 ? yt(this, 0, e) : fr.apply(this, arguments);
};
l.prototype.equals = function(e) {
  if (!$(e)) throw new TypeError("Argument must be a Buffer");
  return this === e ? !0 : l.compare(this, e) === 0;
};
l.prototype.inspect = function() {
  var e = "", r = rr;
  return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">";
};
l.prototype.compare = function(e, r, n, i, o) {
  if (!$(e))
    throw new TypeError("Argument must be a Buffer");
  if (r === void 0 && (r = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), o === void 0 && (o = this.length), r < 0 || n > e.length || i < 0 || o > this.length)
    throw new RangeError("out of range index");
  if (i >= o && r >= n)
    return 0;
  if (i >= o)
    return -1;
  if (r >= n)
    return 1;
  if (r >>>= 0, n >>>= 0, i >>>= 0, o >>>= 0, this === e) return 0;
  for (var s = o - i, f = n - r, a = Math.min(s, f), u = this.slice(i, o), h = e.slice(r, n), c = 0; c < a; ++c)
    if (u[c] !== h[c]) {
      s = u[c], f = h[c];
      break;
    }
  return s < f ? -1 : f < s ? 1 : 0;
};
function _t(t, e, r, n, i) {
  if (t.length === 0) return -1;
  if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
    if (i) return -1;
    r = t.length - 1;
  } else if (r < 0)
    if (i) r = 0;
    else return -1;
  if (typeof e == "string" && (e = l.from(e, n)), $(e))
    return e.length === 0 ? -1 : Xe(t, e, r, n, i);
  if (typeof e == "number")
    return e = e & 255, l.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Xe(t, [e], r, n, i);
  throw new TypeError("val must be string, number or Buffer");
}
function Xe(t, e, r, n, i) {
  var o = 1, s = t.length, f = e.length;
  if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
    if (t.length < 2 || e.length < 2)
      return -1;
    o = 2, s /= 2, f /= 2, r /= 2;
  }
  function a(p, x) {
    return o === 1 ? p[x] : p.readUInt16BE(x * o);
  }
  var u;
  if (i) {
    var h = -1;
    for (u = r; u < s; u++)
      if (a(t, u) === a(e, h === -1 ? 0 : u - h)) {
        if (h === -1 && (h = u), u - h + 1 === f) return h * o;
      } else
        h !== -1 && (u -= u - h), h = -1;
  } else
    for (r + f > s && (r = s - f), u = r; u >= 0; u--) {
      for (var c = !0, d = 0; d < f; d++)
        if (a(t, u + d) !== a(e, d)) {
          c = !1;
          break;
        }
      if (c) return u;
    }
  return -1;
}
l.prototype.includes = function(e, r, n) {
  return this.indexOf(e, r, n) !== -1;
};
l.prototype.indexOf = function(e, r, n) {
  return _t(this, e, r, n, !0);
};
l.prototype.lastIndexOf = function(e, r, n) {
  return _t(this, e, r, n, !1);
};
function ar(t, e, r, n) {
  r = Number(r) || 0;
  var i = t.length - r;
  n ? (n = Number(n), n > i && (n = i)) : n = i;
  var o = e.length;
  if (o % 2 !== 0) throw new TypeError("Invalid hex string");
  n > o / 2 && (n = o / 2);
  for (var s = 0; s < n; ++s) {
    var f = parseInt(e.substr(s * 2, 2), 16);
    if (isNaN(f)) return s;
    t[r + s] = f;
  }
  return s;
}
function lr(t, e, r, n) {
  return xe(we(e, t.length - r), t, r, n);
}
function wt(t, e, r, n) {
  return xe(xr(e), t, r, n);
}
function ur(t, e, r, n) {
  return wt(t, e, r, n);
}
function cr(t, e, r, n) {
  return xe(xt(e), t, r, n);
}
function hr(t, e, r, n) {
  return xe(Sr(e, t.length - r), t, r, n);
}
l.prototype.write = function(e, r, n, i) {
  if (r === void 0)
    i = "utf8", n = this.length, r = 0;
  else if (n === void 0 && typeof r == "string")
    i = r, n = this.length, r = 0;
  else if (isFinite(r))
    r = r | 0, isFinite(n) ? (n = n | 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
  else
    throw new Error(
      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
    );
  var o = this.length - r;
  if ((n === void 0 || n > o) && (n = o), e.length > 0 && (n < 0 || r < 0) || r > this.length)
    throw new RangeError("Attempt to write outside buffer bounds");
  i || (i = "utf8");
  for (var s = !1; ; )
    switch (i) {
      case "hex":
        return ar(this, e, r, n);
      case "utf8":
      case "utf-8":
        return lr(this, e, r, n);
      case "ascii":
        return wt(this, e, r, n);
      case "latin1":
      case "binary":
        return ur(this, e, r, n);
      case "base64":
        return cr(this, e, r, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return hr(this, e, r, n);
      default:
        if (s) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), s = !0;
    }
};
l.prototype.toJSON = function() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function dr(t, e, r) {
  return e === 0 && r === t.length ? Ze(t) : Ze(t.slice(e, r));
}
function yt(t, e, r) {
  r = Math.min(t.length, r);
  for (var n = [], i = e; i < r; ) {
    var o = t[i], s = null, f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
    if (i + f <= r) {
      var a, u, h, c;
      switch (f) {
        case 1:
          o < 128 && (s = o);
          break;
        case 2:
          a = t[i + 1], (a & 192) === 128 && (c = (o & 31) << 6 | a & 63, c > 127 && (s = c));
          break;
        case 3:
          a = t[i + 1], u = t[i + 2], (a & 192) === 128 && (u & 192) === 128 && (c = (o & 15) << 12 | (a & 63) << 6 | u & 63, c > 2047 && (c < 55296 || c > 57343) && (s = c));
          break;
        case 4:
          a = t[i + 1], u = t[i + 2], h = t[i + 3], (a & 192) === 128 && (u & 192) === 128 && (h & 192) === 128 && (c = (o & 15) << 18 | (a & 63) << 12 | (u & 63) << 6 | h & 63, c > 65535 && c < 1114112 && (s = c));
      }
    }
    s === null ? (s = 65533, f = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), i += f;
  }
  return pr(n);
}
var Ke = 4096;
function pr(t) {
  var e = t.length;
  if (e <= Ke)
    return String.fromCharCode.apply(String, t);
  for (var r = "", n = 0; n < e; )
    r += String.fromCharCode.apply(
      String,
      t.slice(n, n += Ke)
    );
  return r;
}
function mr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i] & 127);
  return n;
}
function gr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i]);
  return n;
}
function _r(t, e, r) {
  var n = t.length;
  (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
  for (var i = "", o = e; o < r; ++o)
    i += Er(t[o]);
  return i;
}
function wr(t, e, r) {
  for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
    i += String.fromCharCode(n[o] + n[o + 1] * 256);
  return i;
}
l.prototype.slice = function(e, r) {
  var n = this.length;
  e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
  var i;
  if (l.TYPED_ARRAY_SUPPORT)
    i = this.subarray(e, r), i.__proto__ = l.prototype;
  else {
    var o = r - e;
    i = new l(o, void 0);
    for (var s = 0; s < o; ++s)
      i[s] = this[s + e];
  }
  return i;
};
function T(t, e, r) {
  if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
  if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
}
l.prototype.readUIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || T(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return i;
};
l.prototype.readUIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || T(e, r, this.length);
  for (var i = this[e + --r], o = 1; r > 0 && (o *= 256); )
    i += this[e + --r] * o;
  return i;
};
l.prototype.readUInt8 = function(e, r) {
  return r || T(e, 1, this.length), this[e];
};
l.prototype.readUInt16LE = function(e, r) {
  return r || T(e, 2, this.length), this[e] | this[e + 1] << 8;
};
l.prototype.readUInt16BE = function(e, r) {
  return r || T(e, 2, this.length), this[e] << 8 | this[e + 1];
};
l.prototype.readUInt32LE = function(e, r) {
  return r || T(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
};
l.prototype.readUInt32BE = function(e, r) {
  return r || T(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
l.prototype.readIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || T(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return o *= 128, i >= o && (i -= Math.pow(2, 8 * r)), i;
};
l.prototype.readIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || T(e, r, this.length);
  for (var i = r, o = 1, s = this[e + --i]; i > 0 && (o *= 256); )
    s += this[e + --i] * o;
  return o *= 128, s >= o && (s -= Math.pow(2, 8 * r)), s;
};
l.prototype.readInt8 = function(e, r) {
  return r || T(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
};
l.prototype.readInt16LE = function(e, r) {
  r || T(e, 2, this.length);
  var n = this[e] | this[e + 1] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
l.prototype.readInt16BE = function(e, r) {
  r || T(e, 2, this.length);
  var n = this[e + 1] | this[e] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
l.prototype.readInt32LE = function(e, r) {
  return r || T(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
l.prototype.readInt32BE = function(e, r) {
  return r || T(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
l.prototype.readFloatLE = function(e, r) {
  return r || T(e, 4, this.length), ve(this, e, !0, 23, 4);
};
l.prototype.readFloatBE = function(e, r) {
  return r || T(e, 4, this.length), ve(this, e, !1, 23, 4);
};
l.prototype.readDoubleLE = function(e, r) {
  return r || T(e, 8, this.length), ve(this, e, !0, 52, 8);
};
l.prototype.readDoubleBE = function(e, r) {
  return r || T(e, 8, this.length), ve(this, e, !1, 52, 8);
};
function N(t, e, r, n, i, o) {
  if (!$(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
  if (r + n > t.length) throw new RangeError("Index out of range");
}
l.prototype.writeUIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = 1, f = 0;
  for (this[r] = e & 255; ++f < n && (s *= 256); )
    this[r + f] = e / s & 255;
  return r + n;
};
l.prototype.writeUIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = n - 1, f = 1;
  for (this[r + s] = e & 255; --s >= 0 && (f *= 256); )
    this[r + s] = e / f & 255;
  return r + n;
};
l.prototype.writeUInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 255, 0), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[r] = e & 255, r + 1;
};
function be(t, e, r, n) {
  e < 0 && (e = 65535 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
    t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8;
}
l.prototype.writeUInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : be(this, e, r, !0), r + 2;
};
l.prototype.writeUInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : be(this, e, r, !1), r + 2;
};
function Ee(t, e, r, n) {
  e < 0 && (e = 4294967295 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
    t[r + i] = e >>> (n ? i : 3 - i) * 8 & 255;
}
l.prototype.writeUInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255) : Ee(this, e, r, !0), r + 4;
};
l.prototype.writeUInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : Ee(this, e, r, !1), r + 4;
};
l.prototype.writeIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = 0, f = 1, a = 0;
  for (this[r] = e & 255; ++s < n && (f *= 256); )
    e < 0 && a === 0 && this[r + s - 1] !== 0 && (a = 1), this[r + s] = (e / f >> 0) - a & 255;
  return r + n;
};
l.prototype.writeIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = n - 1, f = 1, a = 0;
  for (this[r + s] = e & 255; --s >= 0 && (f *= 256); )
    e < 0 && a === 0 && this[r + s + 1] !== 0 && (a = 1), this[r + s] = (e / f >> 0) - a & 255;
  return r + n;
};
l.prototype.writeInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 127, -128), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1;
};
l.prototype.writeInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : be(this, e, r, !0), r + 2;
};
l.prototype.writeInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : be(this, e, r, !1), r + 2;
};
l.prototype.writeInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), l.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24) : Ee(this, e, r, !0), r + 4;
};
l.prototype.writeInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), l.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : Ee(this, e, r, !1), r + 4;
};
function vt(t, e, r, n, i, o) {
  if (r + n > t.length) throw new RangeError("Index out of range");
  if (r < 0) throw new RangeError("Index out of range");
}
function bt(t, e, r, n, i) {
  return i || vt(t, e, r, 4), ht(t, e, r, n, 23, 4), r + 4;
}
l.prototype.writeFloatLE = function(e, r, n) {
  return bt(this, e, r, !0, n);
};
l.prototype.writeFloatBE = function(e, r, n) {
  return bt(this, e, r, !1, n);
};
function Et(t, e, r, n, i) {
  return i || vt(t, e, r, 8), ht(t, e, r, n, 52, 8), r + 8;
}
l.prototype.writeDoubleLE = function(e, r, n) {
  return Et(this, e, r, !0, n);
};
l.prototype.writeDoubleBE = function(e, r, n) {
  return Et(this, e, r, !1, n);
};
l.prototype.copy = function(e, r, n, i) {
  if (n || (n = 0), !i && i !== 0 && (i = this.length), r >= e.length && (r = e.length), r || (r = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0) return 0;
  if (r < 0)
    throw new RangeError("targetStart out of bounds");
  if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
  if (i < 0) throw new RangeError("sourceEnd out of bounds");
  i > this.length && (i = this.length), e.length - r < i - n && (i = e.length - r + n);
  var o = i - n, s;
  if (this === e && n < r && r < i)
    for (s = o - 1; s >= 0; --s)
      e[s + r] = this[s + n];
  else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
    for (s = 0; s < o; ++s)
      e[s + r] = this[s + n];
  else
    Uint8Array.prototype.set.call(
      e,
      this.subarray(n, n + o),
      r
    );
  return o;
};
l.prototype.fill = function(e, r, n, i) {
  if (typeof e == "string") {
    if (typeof r == "string" ? (i = r, r = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), e.length === 1) {
      var o = e.charCodeAt(0);
      o < 256 && (e = o);
    }
    if (i !== void 0 && typeof i != "string")
      throw new TypeError("encoding must be a string");
    if (typeof i == "string" && !l.isEncoding(i))
      throw new TypeError("Unknown encoding: " + i);
  } else typeof e == "number" && (e = e & 255);
  if (r < 0 || this.length < r || this.length < n)
    throw new RangeError("Out of range index");
  if (n <= r)
    return this;
  r = r >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
  var s;
  if (typeof e == "number")
    for (s = r; s < n; ++s)
      this[s] = e;
  else {
    var f = $(e) ? e : we(new l(e, i).toString()), a = f.length;
    for (s = 0; s < n - r; ++s)
      this[s + r] = f[s % a];
  }
  return this;
};
var yr = /[^+\/0-9A-Za-z-_]/g;
function vr(t) {
  if (t = br(t).replace(yr, ""), t.length < 2) return "";
  for (; t.length % 4 !== 0; )
    t = t + "=";
  return t;
}
function br(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function Er(t) {
  return t < 16 ? "0" + t.toString(16) : t.toString(16);
}
function we(t, e) {
  e = e || 1 / 0;
  for (var r, n = t.length, i = null, o = [], s = 0; s < n; ++s) {
    if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
      if (!i) {
        if (r > 56319) {
          (e -= 3) > -1 && o.push(239, 191, 189);
          continue;
        } else if (s + 1 === n) {
          (e -= 3) > -1 && o.push(239, 191, 189);
          continue;
        }
        i = r;
        continue;
      }
      if (r < 56320) {
        (e -= 3) > -1 && o.push(239, 191, 189), i = r;
        continue;
      }
      r = (i - 55296 << 10 | r - 56320) + 65536;
    } else i && (e -= 3) > -1 && o.push(239, 191, 189);
    if (i = null, r < 128) {
      if ((e -= 1) < 0) break;
      o.push(r);
    } else if (r < 2048) {
      if ((e -= 2) < 0) break;
      o.push(
        r >> 6 | 192,
        r & 63 | 128
      );
    } else if (r < 65536) {
      if ((e -= 3) < 0) break;
      o.push(
        r >> 12 | 224,
        r >> 6 & 63 | 128,
        r & 63 | 128
      );
    } else if (r < 1114112) {
      if ((e -= 4) < 0) break;
      o.push(
        r >> 18 | 240,
        r >> 12 & 63 | 128,
        r >> 6 & 63 | 128,
        r & 63 | 128
      );
    } else
      throw new Error("Invalid code point");
  }
  return o;
}
function xr(t) {
  for (var e = [], r = 0; r < t.length; ++r)
    e.push(t.charCodeAt(r) & 255);
  return e;
}
function Sr(t, e) {
  for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
    r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
  return o;
}
function xt(t) {
  return Xt(vr(t));
}
function xe(t, e, r, n) {
  for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
    e[i + r] = t[i];
  return i;
}
function Rr(t) {
  return t !== t;
}
function D(t) {
  return t != null && (!!t._isBuffer || St(t) || Ir(t));
}
function St(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function Ir(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && St(t.slice(0, 0));
}
var Ce;
function H() {
}
H.prototype = /* @__PURE__ */ Object.create(null);
function g() {
  g.init.call(this);
}
g.EventEmitter = g;
g.usingDomains = !1;
g.prototype.domain = void 0;
g.prototype._events = void 0;
g.prototype._maxListeners = void 0;
g.defaultMaxListeners = 10;
g.init = function() {
  this.domain = null, g.usingDomains && Ce.active && !(this instanceof Ce.Domain) && (this.domain = Ce.active), (!this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = new H(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
g.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || isNaN(e))
    throw new TypeError('"n" argument must be a positive number');
  return this._maxListeners = e, this;
};
function Rt(t) {
  return t._maxListeners === void 0 ? g.defaultMaxListeners : t._maxListeners;
}
g.prototype.getMaxListeners = function() {
  return Rt(this);
};
function Cr(t, e, r) {
  if (e)
    t.call(r);
  else
    for (var n = t.length, i = ae(t, n), o = 0; o < n; ++o)
      i[o].call(r);
}
function Or(t, e, r, n) {
  if (e)
    t.call(r, n);
  else
    for (var i = t.length, o = ae(t, i), s = 0; s < i; ++s)
      o[s].call(r, n);
}
function Ar(t, e, r, n, i) {
  if (e)
    t.call(r, n, i);
  else
    for (var o = t.length, s = ae(t, o), f = 0; f < o; ++f)
      s[f].call(r, n, i);
}
function Tr(t, e, r, n, i, o) {
  if (e)
    t.call(r, n, i, o);
  else
    for (var s = t.length, f = ae(t, s), a = 0; a < s; ++a)
      f[a].call(r, n, i, o);
}
function Lr(t, e, r, n) {
  if (e)
    t.apply(r, n);
  else
    for (var i = t.length, o = ae(t, i), s = 0; s < i; ++s)
      o[s].apply(r, n);
}
g.prototype.emit = function(e) {
  var r, n, i, o, s, f, a, u = e === "error";
  if (f = this._events, f)
    u = u && f.error == null;
  else if (!u)
    return !1;
  if (a = this.domain, u) {
    if (r = arguments[1], a)
      r || (r = new Error('Uncaught, unspecified "error" event')), r.domainEmitter = this, r.domain = a, r.domainThrown = !1, a.emit("error", r);
    else {
      if (r instanceof Error)
        throw r;
      var h = new Error('Uncaught, unspecified "error" event. (' + r + ")");
      throw h.context = r, h;
    }
    return !1;
  }
  if (n = f[e], !n)
    return !1;
  var c = typeof n == "function";
  switch (i = arguments.length, i) {
    // fast cases
    case 1:
      Cr(n, c, this);
      break;
    case 2:
      Or(n, c, this, arguments[1]);
      break;
    case 3:
      Ar(n, c, this, arguments[1], arguments[2]);
      break;
    case 4:
      Tr(n, c, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      for (o = new Array(i - 1), s = 1; s < i; s++)
        o[s - 1] = arguments[s];
      Lr(n, c, this, o);
  }
  return !0;
};
function It(t, e, r, n) {
  var i, o, s;
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  if (o = t._events, o ? (o.newListener && (t.emit(
    "newListener",
    e,
    r.listener ? r.listener : r
  ), o = t._events), s = o[e]) : (o = t._events = new H(), t._eventsCount = 0), !s)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), !s.warned && (i = Rt(t), i && i > 0 && s.length > i)) {
    s.warned = !0;
    var f = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + e + " listeners added. Use emitter.setMaxListeners() to increase limit");
    f.name = "MaxListenersExceededWarning", f.emitter = t, f.type = e, f.count = s.length, Dr(f);
  }
  return t;
}
function Dr(t) {
  typeof console.warn == "function" ? console.warn(t) : console.log(t);
}
g.prototype.addListener = function(e, r) {
  return It(this, e, r, !1);
};
g.prototype.on = g.prototype.addListener;
g.prototype.prependListener = function(e, r) {
  return It(this, e, r, !0);
};
function Ct(t, e, r) {
  var n = !1;
  function i() {
    t.removeListener(e, i), n || (n = !0, r.apply(t, arguments));
  }
  return i.listener = r, i;
}
g.prototype.once = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.on(e, Ct(this, e, r)), this;
};
g.prototype.prependOnceListener = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.prependListener(e, Ct(this, e, r)), this;
};
g.prototype.removeListener = function(e, r) {
  var n, i, o, s, f;
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  if (i = this._events, !i)
    return this;
  if (n = i[e], !n)
    return this;
  if (n === r || n.listener && n.listener === r)
    --this._eventsCount === 0 ? this._events = new H() : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
  else if (typeof n != "function") {
    for (o = -1, s = n.length; s-- > 0; )
      if (n[s] === r || n[s].listener && n[s].listener === r) {
        f = n[s].listener, o = s;
        break;
      }
    if (o < 0)
      return this;
    if (n.length === 1) {
      if (n[0] = void 0, --this._eventsCount === 0)
        return this._events = new H(), this;
      delete i[e];
    } else
      Nr(n, o);
    i.removeListener && this.emit("removeListener", e, f || r);
  }
  return this;
};
g.prototype.removeAllListeners = function(e) {
  var r, n;
  if (n = this._events, !n)
    return this;
  if (!n.removeListener)
    return arguments.length === 0 ? (this._events = new H(), this._eventsCount = 0) : n[e] && (--this._eventsCount === 0 ? this._events = new H() : delete n[e]), this;
  if (arguments.length === 0) {
    for (var i = Object.keys(n), o = 0, s; o < i.length; ++o)
      s = i[o], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = new H(), this._eventsCount = 0, this;
  }
  if (r = n[e], typeof r == "function")
    this.removeListener(e, r);
  else if (r)
    do
      this.removeListener(e, r[r.length - 1]);
    while (r[0]);
  return this;
};
g.prototype.listeners = function(e) {
  var r, n, i = this._events;
  return i ? (r = i[e], r ? typeof r == "function" ? n = [r.listener || r] : n = Fr(r) : n = []) : n = [], n;
};
g.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : Ot.call(t, e);
};
g.prototype.listenerCount = Ot;
function Ot(t) {
  var e = this._events;
  if (e) {
    var r = e[t];
    if (typeof r == "function")
      return 1;
    if (r)
      return r.length;
  }
  return 0;
}
g.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function Nr(t, e) {
  for (var r = e, n = r + 1, i = t.length; n < i; r += 1, n += 1)
    t[r] = t[n];
  t.pop();
}
function ae(t, e) {
  for (var r = new Array(e); e--; )
    r[e] = t[e];
  return r;
}
function Fr(t) {
  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
    e[r] = t[r].listener || t[r];
  return e;
}
function At() {
  throw new Error("setTimeout has not been defined");
}
function Tt() {
  throw new Error("clearTimeout has not been defined");
}
var Y = At, W = Tt;
typeof ie.setTimeout == "function" && (Y = setTimeout);
typeof ie.clearTimeout == "function" && (W = clearTimeout);
function Lt(t) {
  if (Y === setTimeout)
    return setTimeout(t, 0);
  if ((Y === At || !Y) && setTimeout)
    return Y = setTimeout, setTimeout(t, 0);
  try {
    return Y(t, 0);
  } catch {
    try {
      return Y.call(null, t, 0);
    } catch {
      return Y.call(this, t, 0);
    }
  }
}
function Mr(t) {
  if (W === clearTimeout)
    return clearTimeout(t);
  if ((W === Tt || !W) && clearTimeout)
    return W = clearTimeout, clearTimeout(t);
  try {
    return W(t);
  } catch {
    try {
      return W.call(null, t);
    } catch {
      return W.call(this, t);
    }
  }
}
var V = [], ne = !1, ee, me = -1;
function Br() {
  !ne || !ee || (ne = !1, ee.length ? V = ee.concat(V) : me = -1, V.length && Dt());
}
function Dt() {
  if (!ne) {
    var t = Lt(Br);
    ne = !0;
    for (var e = V.length; e; ) {
      for (ee = V, V = []; ++me < e; )
        ee && ee[me].run();
      me = -1, e = V.length;
    }
    ee = null, ne = !1, Mr(t);
  }
}
function U(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  V.push(new Nt(t, e)), V.length === 1 && !ne && Lt(Dt);
}
function Nt(t, e) {
  this.fun = t, this.array = e;
}
Nt.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var Ur = {}, se = ie.performance || {};
se.now || se.mozNow || se.msNow || se.oNow || se.webkitNow;
var ge = {
  env: Ur
}, ke;
typeof Object.create == "function" ? ke = function(e, r) {
  e.super_ = r, e.prototype = Object.create(r.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
} : ke = function(e, r) {
  e.super_ = r;
  var n = function() {
  };
  n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
};
var oe = ke, kr = /%[sdj%]/g;
function Pr(t) {
  if (!Ye(t)) {
    for (var e = [], r = 0; r < arguments.length; r++)
      e.push(G(arguments[r]));
    return e.join(" ");
  }
  for (var r = 1, n = arguments, i = n.length, o = String(t).replace(kr, function(f) {
    if (f === "%%") return "%";
    if (r >= i) return f;
    switch (f) {
      case "%s":
        return String(n[r++]);
      case "%d":
        return Number(n[r++]);
      case "%j":
        try {
          return JSON.stringify(n[r++]);
        } catch {
          return "[Circular]";
        }
      default:
        return f;
    }
  }), s = n[r]; r < i; s = n[++r])
    Je(s) || !le(s) ? o += " " + s : o += " " + G(s);
  return o;
}
function Ft(t, e) {
  if (Q(ie.process))
    return function() {
      return Ft(t, e).apply(this, arguments);
    };
  if (ge.noDeprecation === !0)
    return t;
  var r = !1;
  function n() {
    if (!r) {
      if (ge.throwDeprecation)
        throw new Error(e);
      ge.traceDeprecation ? console.trace(e) : console.error(e), r = !0;
    }
    return t.apply(this, arguments);
  }
  return n;
}
var pe = {}, Oe;
function $r(t) {
  if (Q(Oe) && (Oe = ge.env.NODE_DEBUG || ""), t = t.toUpperCase(), !pe[t])
    if (new RegExp("\\b" + t + "\\b", "i").test(Oe)) {
      var e = 0;
      pe[t] = function() {
        var r = Pr.apply(null, arguments);
        console.error("%s %d: %s", t, e, r);
      };
    } else
      pe[t] = function() {
      };
  return pe[t];
}
function G(t, e) {
  var r = {
    seen: [],
    stylize: qr
  };
  return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), Mt(e) ? r.showHidden = e : e && Hr(r, e), Q(r.showHidden) && (r.showHidden = !1), Q(r.depth) && (r.depth = 2), Q(r.colors) && (r.colors = !1), Q(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = jr), ye(r, t, r.depth);
}
G.colors = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39]
};
G.styles = {
  special: "cyan",
  number: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  date: "magenta",
  // "name": intentionally not styling
  regexp: "red"
};
function jr(t, e) {
  var r = G.styles[e];
  return r ? "\x1B[" + G.colors[r][0] + "m" + t + "\x1B[" + G.colors[r][1] + "m" : t;
}
function qr(t, e) {
  return t;
}
function Vr(t) {
  var e = {};
  return t.forEach(function(r, n) {
    e[r] = !0;
  }), e;
}
function ye(t, e, r) {
  if (t.customInspect && e && De(e.inspect) && // Filter out the util module, it's inspect function is special
  e.inspect !== G && // Also filter out any prototype objects using the circular check.
  !(e.constructor && e.constructor.prototype === e)) {
    var n = e.inspect(r, t);
    return Ye(n) || (n = ye(t, n, r)), n;
  }
  var i = zr(t, e);
  if (i)
    return i;
  var o = Object.keys(e), s = Vr(o);
  if (t.showHidden && (o = Object.getOwnPropertyNames(e)), Le(e) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
    return Ae(e);
  if (o.length === 0) {
    if (De(e)) {
      var f = e.name ? ": " + e.name : "";
      return t.stylize("[Function" + f + "]", "special");
    }
    if (Te(e))
      return t.stylize(RegExp.prototype.toString.call(e), "regexp");
    if (et(e))
      return t.stylize(Date.prototype.toString.call(e), "date");
    if (Le(e))
      return Ae(e);
  }
  var a = "", u = !1, h = ["{", "}"];
  if (Wr(e) && (u = !0, h = ["[", "]"]), De(e)) {
    var c = e.name ? ": " + e.name : "";
    a = " [Function" + c + "]";
  }
  if (Te(e) && (a = " " + RegExp.prototype.toString.call(e)), et(e) && (a = " " + Date.prototype.toUTCString.call(e)), Le(e) && (a = " " + Ae(e)), o.length === 0 && (!u || e.length == 0))
    return h[0] + a + h[1];
  if (r < 0)
    return Te(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
  t.seen.push(e);
  var d;
  return u ? d = Jr(t, e, r, s, o) : d = o.map(function(p) {
    return Pe(t, e, r, s, p, u);
  }), t.seen.pop(), Yr(d, a, h);
}
function zr(t, e) {
  if (Q(e))
    return t.stylize("undefined", "undefined");
  if (Ye(e)) {
    var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return t.stylize(r, "string");
  }
  if (Qr(e))
    return t.stylize("" + e, "number");
  if (Mt(e))
    return t.stylize("" + e, "boolean");
  if (Je(e))
    return t.stylize("null", "null");
}
function Ae(t) {
  return "[" + Error.prototype.toString.call(t) + "]";
}
function Jr(t, e, r, n, i) {
  for (var o = [], s = 0, f = e.length; s < f; ++s)
    Bt(e, String(s)) ? o.push(Pe(
      t,
      e,
      r,
      n,
      String(s),
      !0
    )) : o.push("");
  return i.forEach(function(a) {
    a.match(/^\d+$/) || o.push(Pe(
      t,
      e,
      r,
      n,
      a,
      !0
    ));
  }), o;
}
function Pe(t, e, r, n, i, o) {
  var s, f, a;
  if (a = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }, a.get ? a.set ? f = t.stylize("[Getter/Setter]", "special") : f = t.stylize("[Getter]", "special") : a.set && (f = t.stylize("[Setter]", "special")), Bt(n, i) || (s = "[" + i + "]"), f || (t.seen.indexOf(a.value) < 0 ? (Je(r) ? f = ye(t, a.value, null) : f = ye(t, a.value, r - 1), f.indexOf(`
`) > -1 && (o ? f = f.split(`
`).map(function(u) {
    return "  " + u;
  }).join(`
`).substr(2) : f = `
` + f.split(`
`).map(function(u) {
    return "   " + u;
  }).join(`
`))) : f = t.stylize("[Circular]", "special")), Q(s)) {
    if (o && i.match(/^\d+$/))
      return f;
    s = JSON.stringify("" + i), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = t.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = t.stylize(s, "string"));
  }
  return s + ": " + f;
}
function Yr(t, e, r) {
  var n = t.reduce(function(i, o) {
    return o.indexOf(`
`) >= 0, i + o.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return n > 60 ? r[0] + (e === "" ? "" : e + `
 `) + " " + t.join(`,
  `) + " " + r[1] : r[0] + e + " " + t.join(", ") + " " + r[1];
}
function Wr(t) {
  return Array.isArray(t);
}
function Mt(t) {
  return typeof t == "boolean";
}
function Je(t) {
  return t === null;
}
function Qr(t) {
  return typeof t == "number";
}
function Ye(t) {
  return typeof t == "string";
}
function Q(t) {
  return t === void 0;
}
function Te(t) {
  return le(t) && We(t) === "[object RegExp]";
}
function le(t) {
  return typeof t == "object" && t !== null;
}
function et(t) {
  return le(t) && We(t) === "[object Date]";
}
function Le(t) {
  return le(t) && (We(t) === "[object Error]" || t instanceof Error);
}
function De(t) {
  return typeof t == "function";
}
function We(t) {
  return Object.prototype.toString.call(t);
}
function Hr(t, e) {
  if (!e || !le(e)) return t;
  for (var r = Object.keys(e), n = r.length; n--; )
    t[r[n]] = e[r[n]];
  return t;
}
function Bt(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function te() {
  this.head = null, this.tail = null, this.length = 0;
}
te.prototype.push = function(t) {
  var e = { data: t, next: null };
  this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length;
};
te.prototype.unshift = function(t) {
  var e = { data: t, next: this.head };
  this.length === 0 && (this.tail = e), this.head = e, ++this.length;
};
te.prototype.shift = function() {
  if (this.length !== 0) {
    var t = this.head.data;
    return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
  }
};
te.prototype.clear = function() {
  this.head = this.tail = null, this.length = 0;
};
te.prototype.join = function(t) {
  if (this.length === 0) return "";
  for (var e = this.head, r = "" + e.data; e = e.next; )
    r += t + e.data;
  return r;
};
te.prototype.concat = function(t) {
  if (this.length === 0) return l.alloc(0);
  if (this.length === 1) return this.head.data;
  for (var e = l.allocUnsafe(t >>> 0), r = this.head, n = 0; r; )
    r.data.copy(e, n), n += r.data.length, r = r.next;
  return e;
};
var Gr = l.isEncoding || function(t) {
  switch (t && t.toLowerCase()) {
    case "hex":
    case "utf8":
    case "utf-8":
    case "ascii":
    case "binary":
    case "base64":
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
    case "raw":
      return !0;
    default:
      return !1;
  }
};
function Zr(t) {
  if (t && !Gr(t))
    throw new Error("Unknown encoding: " + t);
}
function ue(t) {
  switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), Zr(t), this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2, this.detectIncompleteChar = Kr;
      break;
    case "base64":
      this.surrogateSize = 3, this.detectIncompleteChar = en;
      break;
    default:
      this.write = Xr;
      return;
  }
  this.charBuffer = new l(6), this.charReceived = 0, this.charLength = 0;
}
ue.prototype.write = function(t) {
  for (var e = ""; this.charLength; ) {
    var r = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
    if (t.copy(this.charBuffer, this.charReceived, 0, r), this.charReceived += r, this.charReceived < this.charLength)
      return "";
    t = t.slice(r, t.length), e = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
    var i = e.charCodeAt(e.length - 1);
    if (i >= 55296 && i <= 56319) {
      this.charLength += this.surrogateSize, e = "";
      continue;
    }
    if (this.charReceived = this.charLength = 0, t.length === 0)
      return e;
    break;
  }
  this.detectIncompleteChar(t);
  var n = t.length;
  this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, n), n -= this.charReceived), e += t.toString(this.encoding, 0, n);
  var n = e.length - 1, i = e.charCodeAt(n);
  if (i >= 55296 && i <= 56319) {
    var o = this.surrogateSize;
    return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), t.copy(this.charBuffer, 0, 0, o), e.substring(0, n);
  }
  return e;
};
ue.prototype.detectIncompleteChar = function(t) {
  for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
    var r = t[t.length - e];
    if (e == 1 && r >> 5 == 6) {
      this.charLength = 2;
      break;
    }
    if (e <= 2 && r >> 4 == 14) {
      this.charLength = 3;
      break;
    }
    if (e <= 3 && r >> 3 == 30) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = e;
};
ue.prototype.end = function(t) {
  var e = "";
  if (t && t.length && (e = this.write(t)), this.charReceived) {
    var r = this.charReceived, n = this.charBuffer, i = this.encoding;
    e += n.slice(0, r).toString(i);
  }
  return e;
};
function Xr(t) {
  return t.toString(this.encoding);
}
function Kr(t) {
  this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0;
}
function en(t) {
  this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0;
}
C.ReadableState = Ut;
var E = $r("stream");
oe(C, g);
function tn(t, e, r) {
  if (typeof t.prependListener == "function")
    return t.prependListener(e, r);
  !t._events || !t._events[e] ? t.on(e, r) : Array.isArray(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]];
}
function rn(t, e) {
  return t.listeners(e).length;
}
function Ut(t, e) {
  t = t || {}, this.objectMode = !!t.objectMode, e instanceof B && (this.objectMode = this.objectMode || !!t.readableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.buffer = new te(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (this.decoder = new ue(t.encoding), this.encoding = t.encoding);
}
function C(t) {
  if (!(this instanceof C)) return new C(t);
  this._readableState = new Ut(t, this), this.readable = !0, t && typeof t.read == "function" && (this._read = t.read), g.call(this);
}
C.prototype.push = function(t, e) {
  var r = this._readableState;
  return !r.objectMode && typeof t == "string" && (e = e || r.defaultEncoding, e !== r.encoding && (t = l.from(t, e), e = "")), kt(this, r, t, e, !1);
};
C.prototype.unshift = function(t) {
  var e = this._readableState;
  return kt(this, e, t, "", !0);
};
C.prototype.isPaused = function() {
  return this._readableState.flowing === !1;
};
function kt(t, e, r, n, i) {
  var o = sn(e, r);
  if (o)
    t.emit("error", o);
  else if (r === null)
    e.reading = !1, fn(t, e);
  else if (e.objectMode || r && r.length > 0)
    if (e.ended && !i) {
      var s = new Error("stream.push() after EOF");
      t.emit("error", s);
    } else if (e.endEmitted && i) {
      var f = new Error("stream.unshift() after end event");
      t.emit("error", f);
    } else {
      var a;
      e.decoder && !i && !n && (r = e.decoder.write(r), a = !e.objectMode && r.length === 0), i || (e.reading = !1), a || (e.flowing && e.length === 0 && !e.sync ? (t.emit("data", r), t.read(0)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && Se(t))), an(t, e);
    }
  else i || (e.reading = !1);
  return nn(e);
}
function nn(t) {
  return !t.ended && (t.needReadable || t.length < t.highWaterMark || t.length === 0);
}
C.prototype.setEncoding = function(t) {
  return this._readableState.decoder = new ue(t), this._readableState.encoding = t, this;
};
var tt = 8388608;
function on(t) {
  return t >= tt ? t = tt : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t;
}
function rt(t, e) {
  return t <= 0 || e.length === 0 && e.ended ? 0 : e.objectMode ? 1 : t !== t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = on(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0));
}
C.prototype.read = function(t) {
  E("read", t), t = parseInt(t, 10);
  var e = this._readableState, r = t;
  if (t !== 0 && (e.emittedReadable = !1), t === 0 && e.needReadable && (e.length >= e.highWaterMark || e.ended))
    return E("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? Ne(this) : Se(this), null;
  if (t = rt(t, e), t === 0 && e.ended)
    return e.length === 0 && Ne(this), null;
  var n = e.needReadable;
  E("need readable", n), (e.length === 0 || e.length - t < e.highWaterMark) && (n = !0, E("length less than watermark", n)), e.ended || e.reading ? (n = !1, E("reading or ended", n)) : n && (E("do read"), e.reading = !0, e.sync = !0, e.length === 0 && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = rt(r, e)));
  var i;
  return t > 0 ? i = Pt(t, e) : i = null, i === null ? (e.needReadable = !0, t = 0) : e.length -= t, e.length === 0 && (e.ended || (e.needReadable = !0), r !== t && e.ended && Ne(this)), i !== null && this.emit("data", i), i;
};
function sn(t, e) {
  var r = null;
  return !D(e) && typeof e != "string" && e !== null && e !== void 0 && !t.objectMode && (r = new TypeError("Invalid non-string/buffer chunk")), r;
}
function fn(t, e) {
  if (!e.ended) {
    if (e.decoder) {
      var r = e.decoder.end();
      r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length);
    }
    e.ended = !0, Se(t);
  }
}
function Se(t) {
  var e = t._readableState;
  e.needReadable = !1, e.emittedReadable || (E("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? U(nt, t) : nt(t));
}
function nt(t) {
  E("emit readable"), t.emit("readable"), Qe(t);
}
function an(t, e) {
  e.readingMore || (e.readingMore = !0, U(ln, t, e));
}
function ln(t, e) {
  for (var r = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (E("maybeReadMore read 0"), t.read(0), r !== e.length); )
    r = e.length;
  e.readingMore = !1;
}
C.prototype._read = function(t) {
  this.emit("error", new Error("not implemented"));
};
C.prototype.pipe = function(t, e) {
  var r = this, n = this._readableState;
  switch (n.pipesCount) {
    case 0:
      n.pipes = t;
      break;
    case 1:
      n.pipes = [n.pipes, t];
      break;
    default:
      n.pipes.push(t);
      break;
  }
  n.pipesCount += 1, E("pipe count=%d opts=%j", n.pipesCount, e);
  var i = !e || e.end !== !1, o = i ? f : h;
  n.endEmitted ? U(o) : r.once("end", o), t.on("unpipe", s);
  function s(I) {
    E("onunpipe"), I === r && h();
  }
  function f() {
    E("onend"), t.end();
  }
  var a = un(r);
  t.on("drain", a);
  var u = !1;
  function h() {
    E("cleanup"), t.removeListener("close", x), t.removeListener("finish", _), t.removeListener("drain", a), t.removeListener("error", p), t.removeListener("unpipe", s), r.removeListener("end", f), r.removeListener("end", h), r.removeListener("data", d), u = !0, n.awaitDrain && (!t._writableState || t._writableState.needDrain) && a();
  }
  var c = !1;
  r.on("data", d);
  function d(I) {
    E("ondata"), c = !1;
    var v = t.write(I);
    v === !1 && !c && ((n.pipesCount === 1 && n.pipes === t || n.pipesCount > 1 && $t(n.pipes, t) !== -1) && !u && (E("false write response, pause", r._readableState.awaitDrain), r._readableState.awaitDrain++, c = !0), r.pause());
  }
  function p(I) {
    E("onerror", I), S(), t.removeListener("error", p), rn(t, "error") === 0 && t.emit("error", I);
  }
  tn(t, "error", p);
  function x() {
    t.removeListener("finish", _), S();
  }
  t.once("close", x);
  function _() {
    E("onfinish"), t.removeListener("close", x), S();
  }
  t.once("finish", _);
  function S() {
    E("unpipe"), r.unpipe(t);
  }
  return t.emit("pipe", r), n.flowing || (E("pipe resume"), r.resume()), t;
};
function un(t) {
  return function() {
    var e = t._readableState;
    E("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, e.awaitDrain === 0 && t.listeners("data").length && (e.flowing = !0, Qe(t));
  };
}
C.prototype.unpipe = function(t) {
  var e = this._readableState;
  if (e.pipesCount === 0) return this;
  if (e.pipesCount === 1)
    return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this), this);
  if (!t) {
    var r = e.pipes, n = e.pipesCount;
    e.pipes = null, e.pipesCount = 0, e.flowing = !1;
    for (var i = 0; i < n; i++)
      r[i].emit("unpipe", this);
    return this;
  }
  var o = $t(e.pipes, t);
  return o === -1 ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, e.pipesCount === 1 && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this);
};
C.prototype.on = function(t, e) {
  var r = g.prototype.on.call(this, t, e);
  if (t === "data")
    this._readableState.flowing !== !1 && this.resume();
  else if (t === "readable") {
    var n = this._readableState;
    !n.endEmitted && !n.readableListening && (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && Se(this) : U(cn, this));
  }
  return r;
};
C.prototype.addListener = C.prototype.on;
function cn(t) {
  E("readable nexttick read 0"), t.read(0);
}
C.prototype.resume = function() {
  var t = this._readableState;
  return t.flowing || (E("resume"), t.flowing = !0, hn(this, t)), this;
};
function hn(t, e) {
  e.resumeScheduled || (e.resumeScheduled = !0, U(dn, t, e));
}
function dn(t, e) {
  e.reading || (E("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), Qe(t), e.flowing && !e.reading && t.read(0);
}
C.prototype.pause = function() {
  return E("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (E("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
};
function Qe(t) {
  var e = t._readableState;
  for (E("flow", e.flowing); e.flowing && t.read() !== null; )
    ;
}
C.prototype.wrap = function(t) {
  var e = this._readableState, r = !1, n = this;
  t.on("end", function() {
    if (E("wrapped end"), e.decoder && !e.ended) {
      var s = e.decoder.end();
      s && s.length && n.push(s);
    }
    n.push(null);
  }), t.on("data", function(s) {
    if (E("wrapped data"), e.decoder && (s = e.decoder.write(s)), !(e.objectMode && s == null) && !(!e.objectMode && (!s || !s.length))) {
      var f = n.push(s);
      f || (r = !0, t.pause());
    }
  });
  for (var i in t)
    this[i] === void 0 && typeof t[i] == "function" && (this[i] = /* @__PURE__ */ (function(s) {
      return function() {
        return t[s].apply(t, arguments);
      };
    })(i));
  var o = ["error", "close", "destroy", "pause", "resume"];
  return wn(o, function(s) {
    t.on(s, n.emit.bind(n, s));
  }), n._read = function(s) {
    E("wrapped _read", s), r && (r = !1, t.resume());
  }, n;
};
C._fromList = Pt;
function Pt(t, e) {
  if (e.length === 0) return null;
  var r;
  return e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (e.decoder ? r = e.buffer.join("") : e.buffer.length === 1 ? r = e.buffer.head.data : r = e.buffer.concat(e.length), e.buffer.clear()) : r = pn(t, e.buffer, e.decoder), r;
}
function pn(t, e, r) {
  var n;
  return t < e.head.data.length ? (n = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : t === e.head.data.length ? n = e.shift() : n = r ? mn(t, e) : gn(t, e), n;
}
function mn(t, e) {
  var r = e.head, n = 1, i = r.data;
  for (t -= i.length; r = r.next; ) {
    var o = r.data, s = t > o.length ? o.length : t;
    if (s === o.length ? i += o : i += o.slice(0, t), t -= s, t === 0) {
      s === o.length ? (++n, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = o.slice(s));
      break;
    }
    ++n;
  }
  return e.length -= n, i;
}
function gn(t, e) {
  var r = l.allocUnsafe(t), n = e.head, i = 1;
  for (n.data.copy(r), t -= n.data.length; n = n.next; ) {
    var o = n.data, s = t > o.length ? o.length : t;
    if (o.copy(r, r.length - t, 0, s), t -= s, t === 0) {
      s === o.length ? (++i, n.next ? e.head = n.next : e.head = e.tail = null) : (e.head = n, n.data = o.slice(s));
      break;
    }
    ++i;
  }
  return e.length -= i, r;
}
function Ne(t) {
  var e = t._readableState;
  if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
  e.endEmitted || (e.ended = !0, U(_n, e, t));
}
function _n(t, e) {
  !t.endEmitted && t.length === 0 && (t.endEmitted = !0, e.readable = !1, e.emit("end"));
}
function wn(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    e(t[r], r);
}
function $t(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e) return r;
  return -1;
}
L.WritableState = He;
oe(L, g);
function yn() {
}
function vn(t, e, r) {
  this.chunk = t, this.encoding = e, this.callback = r, this.next = null;
}
function He(t, e) {
  Object.defineProperty(this, "buffer", {
    get: Ft(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  }), t = t || {}, this.objectMode = !!t.objectMode, e instanceof B && (this.objectMode = this.objectMode || !!t.writableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
  var i = t.decodeStrings === !1;
  this.decodeStrings = !i, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(o) {
    Cn(e, o);
  }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new zt(this);
}
He.prototype.getBuffer = function() {
  for (var e = this.bufferedRequest, r = []; e; )
    r.push(e), e = e.next;
  return r;
};
function L(t) {
  if (!(this instanceof L) && !(this instanceof B)) return new L(t);
  this._writableState = new He(t, this), this.writable = !0, t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev)), g.call(this);
}
L.prototype.pipe = function() {
  this.emit("error", new Error("Cannot pipe, not readable"));
};
function bn(t, e) {
  var r = new Error("write after end");
  t.emit("error", r), U(e, r);
}
function En(t, e, r, n) {
  var i = !0, o = !1;
  return r === null ? o = new TypeError("May not write null values to stream") : !l.isBuffer(r) && typeof r != "string" && r !== void 0 && !e.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), U(n, o), i = !1), i;
}
L.prototype.write = function(t, e, r) {
  var n = this._writableState, i = !1;
  return typeof e == "function" && (r = e, e = null), l.isBuffer(t) ? e = "buffer" : e || (e = n.defaultEncoding), typeof r != "function" && (r = yn), n.ended ? bn(this, r) : En(this, n, t, r) && (n.pendingcb++, i = Sn(this, n, t, e, r)), i;
};
L.prototype.cork = function() {
  var t = this._writableState;
  t.corked++;
};
L.prototype.uncork = function() {
  var t = this._writableState;
  t.corked && (t.corked--, !t.writing && !t.corked && !t.finished && !t.bufferProcessing && t.bufferedRequest && jt(this, t));
};
L.prototype.setDefaultEncoding = function(e) {
  if (typeof e == "string" && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
  return this._writableState.defaultEncoding = e, this;
};
function xn(t, e, r) {
  return !t.objectMode && t.decodeStrings !== !1 && typeof e == "string" && (e = l.from(e, r)), e;
}
function Sn(t, e, r, n, i) {
  r = xn(e, r, n), l.isBuffer(r) && (n = "buffer");
  var o = e.objectMode ? 1 : r.length;
  e.length += o;
  var s = e.length < e.highWaterMark;
  if (s || (e.needDrain = !0), e.writing || e.corked) {
    var f = e.lastBufferedRequest;
    e.lastBufferedRequest = new vn(r, n, i), f ? f.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1;
  } else
    $e(t, e, !1, o, r, n, i);
  return s;
}
function $e(t, e, r, n, i, o, s) {
  e.writelen = n, e.writecb = s, e.writing = !0, e.sync = !0, r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1;
}
function Rn(t, e, r, n, i) {
  --e.pendingcb, r ? U(i, n) : i(n), t._writableState.errorEmitted = !0, t.emit("error", n);
}
function In(t) {
  t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0;
}
function Cn(t, e) {
  var r = t._writableState, n = r.sync, i = r.writecb;
  if (In(r), e) Rn(t, r, n, e, i);
  else {
    var o = qt(r);
    !o && !r.corked && !r.bufferProcessing && r.bufferedRequest && jt(t, r), n ? U(it, t, r, o, i) : it(t, r, o, i);
  }
}
function it(t, e, r, n) {
  r || On(t, e), e.pendingcb--, n(), Vt(t, e);
}
function On(t, e) {
  e.length === 0 && e.needDrain && (e.needDrain = !1, t.emit("drain"));
}
function jt(t, e) {
  e.bufferProcessing = !0;
  var r = e.bufferedRequest;
  if (t._writev && r && r.next) {
    var n = e.bufferedRequestCount, i = new Array(n), o = e.corkedRequestsFree;
    o.entry = r;
    for (var s = 0; r; )
      i[s] = r, r = r.next, s += 1;
    $e(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new zt(e);
  } else {
    for (; r; ) {
      var f = r.chunk, a = r.encoding, u = r.callback, h = e.objectMode ? 1 : f.length;
      if ($e(t, e, !1, h, f, a, u), r = r.next, e.writing)
        break;
    }
    r === null && (e.lastBufferedRequest = null);
  }
  e.bufferedRequestCount = 0, e.bufferedRequest = r, e.bufferProcessing = !1;
}
L.prototype._write = function(t, e, r) {
  r(new Error("not implemented"));
};
L.prototype._writev = null;
L.prototype.end = function(t, e, r) {
  var n = this._writableState;
  typeof t == "function" ? (r = t, t = null, e = null) : typeof e == "function" && (r = e, e = null), t != null && this.write(t, e), n.corked && (n.corked = 1, this.uncork()), !n.ending && !n.finished && An(this, n, r);
};
function qt(t) {
  return t.ending && t.length === 0 && t.bufferedRequest === null && !t.finished && !t.writing;
}
function ot(t, e) {
  e.prefinished || (e.prefinished = !0, t.emit("prefinish"));
}
function Vt(t, e) {
  var r = qt(e);
  return r && (e.pendingcb === 0 ? (ot(t, e), e.finished = !0, t.emit("finish")) : ot(t, e)), r;
}
function An(t, e, r) {
  e.ending = !0, Vt(t, e), r && (e.finished ? U(r) : t.once("finish", r)), e.ended = !0, t.writable = !1;
}
function zt(t) {
  var e = this;
  this.next = null, this.entry = null, this.finish = function(r) {
    var n = e.entry;
    for (e.entry = null; n; ) {
      var i = n.callback;
      t.pendingcb--, i(r), n = n.next;
    }
    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
  };
}
oe(B, C);
var st = Object.keys(L.prototype);
for (var Fe = 0; Fe < st.length; Fe++) {
  var Me = st[Fe];
  B.prototype[Me] || (B.prototype[Me] = L.prototype[Me]);
}
function B(t) {
  if (!(this instanceof B)) return new B(t);
  C.call(this, t), L.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", Tn);
}
function Tn() {
  this.allowHalfOpen || this._writableState.ended || U(Ln, this);
}
function Ln(t) {
  t.end();
}
oe(k, B);
function Dn(t) {
  this.afterTransform = function(e, r) {
    return Nn(t, e, r);
  }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
}
function Nn(t, e, r) {
  var n = t._transformState;
  n.transforming = !1;
  var i = n.writecb;
  if (!i) return t.emit("error", new Error("no writecb in Transform class"));
  n.writechunk = null, n.writecb = null, r != null && t.push(r), i(e);
  var o = t._readableState;
  o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark);
}
function k(t) {
  if (!(this instanceof k)) return new k(t);
  B.call(this, t), this._transformState = new Dn(this);
  var e = this;
  this._readableState.needReadable = !0, this._readableState.sync = !1, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.once("prefinish", function() {
    typeof this._flush == "function" ? this._flush(function(r) {
      ft(e, r);
    }) : ft(e);
  });
}
k.prototype.push = function(t, e) {
  return this._transformState.needTransform = !1, B.prototype.push.call(this, t, e);
};
k.prototype._transform = function(t, e, r) {
  throw new Error("Not implemented");
};
k.prototype._write = function(t, e, r) {
  var n = this._transformState;
  if (n.writecb = r, n.writechunk = t, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
k.prototype._read = function(t) {
  var e = this._transformState;
  e.writechunk !== null && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
function ft(t, e) {
  if (e) return t.emit("error", e);
  var r = t._writableState, n = t._transformState;
  if (r.length) throw new Error("Calling transform done when ws.length != 0");
  if (n.transforming) throw new Error("Calling transform done when still transforming");
  return t.push(null);
}
oe(fe, k);
function fe(t) {
  if (!(this instanceof fe)) return new fe(t);
  k.call(this, t);
}
fe.prototype._transform = function(t, e, r) {
  r(null, t);
};
oe(z, g);
z.Readable = C;
z.Writable = L;
z.Duplex = B;
z.Transform = k;
z.PassThrough = fe;
z.Stream = z;
function z() {
  g.call(this);
}
z.prototype.pipe = function(t, e) {
  var r = this;
  function n(h) {
    t.writable && t.write(h) === !1 && r.pause && r.pause();
  }
  r.on("data", n);
  function i() {
    r.readable && r.resume && r.resume();
  }
  t.on("drain", i), !t._isStdio && (!e || e.end !== !1) && (r.on("end", s), r.on("close", f));
  var o = !1;
  function s() {
    o || (o = !0, t.end());
  }
  function f() {
    o || (o = !0, typeof t.destroy == "function" && t.destroy());
  }
  function a(h) {
    if (u(), g.listenerCount(this, "error") === 0)
      throw h;
  }
  r.on("error", a), t.on("error", a);
  function u() {
    r.removeListener("data", n), t.removeListener("drain", i), r.removeListener("end", s), r.removeListener("close", f), r.removeListener("error", a), t.removeListener("error", a), r.removeListener("end", u), r.removeListener("close", u), t.removeListener("close", u);
  }
  return r.on("end", u), r.on("close", u), t.on("close", u), t.emit("pipe", r), t;
};
const Jt = function(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
};
class y extends Error {
  constructor(e, r, n, ...i) {
    Array.isArray(r) && (r = r.join(" ").trim()), super(r), Error.captureStackTrace !== void 0 && Error.captureStackTrace(this, y), this.code = e;
    for (const o of i)
      for (const s in o) {
        const f = o[s];
        this[s] = D(f) ? f.toString(n.encoding) : f == null ? f : JSON.parse(JSON.stringify(f));
      }
  }
}
const Yt = function(t) {
  const e = [];
  for (let r = 0, n = t.length; r < n; r++) {
    const i = t[r];
    if (i == null || i === !1)
      e[r] = { disabled: !0 };
    else if (typeof i == "string")
      e[r] = { name: i };
    else if (Jt(i)) {
      if (typeof i.name != "string")
        throw new y("CSV_OPTION_COLUMNS_MISSING_NAME", [
          "Option columns missing name:",
          `property "name" is required at position ${r}`,
          "when column is an object literal"
        ]);
      e[r] = i;
    } else
      throw new y("CSV_INVALID_COLUMN_DEFINITION", [
        "Invalid column definition:",
        "expect a string or a literal object,",
        `got ${JSON.stringify(i)} at position ${r}`
      ]);
  }
  return e;
};
class at {
  constructor(e = 100) {
    this.size = e, this.length = 0, this.buf = l.allocUnsafe(e);
  }
  prepend(e) {
    if (D(e)) {
      const r = this.length + e.length;
      if (r >= this.size && (this.resize(), r >= this.size))
        throw Error("INVALID_BUFFER_STATE");
      const n = this.buf;
      this.buf = l.allocUnsafe(this.size), e.copy(this.buf, 0), n.copy(this.buf, e.length), this.length += e.length;
    } else {
      const r = this.length++;
      r === this.size && this.resize();
      const n = this.clone();
      this.buf[0] = e, n.copy(this.buf, 1, 0, r);
    }
  }
  append(e) {
    const r = this.length++;
    r === this.size && this.resize(), this.buf[r] = e;
  }
  clone() {
    return l.from(this.buf.slice(0, this.length));
  }
  resize() {
    const e = this.length;
    this.size = this.size * 2;
    const r = l.allocUnsafe(this.size);
    this.buf.copy(r, 0, 0, e), this.buf = r;
  }
  toString(e) {
    return e ? this.buf.slice(0, this.length).toString(e) : Uint8Array.prototype.slice.call(this.buf.slice(0, this.length));
  }
  toJSON() {
    return this.toString("utf8");
  }
  reset() {
    this.length = 0;
  }
}
const Fn = 12, Mn = 13, Bn = 10, Un = 32, kn = 9, Pn = function(t) {
  return {
    bomSkipped: !1,
    bufBytesStart: 0,
    castField: t.cast_function,
    commenting: !1,
    // Current error encountered by a record
    error: void 0,
    enabled: t.from_line === 1,
    escaping: !1,
    escapeIsQuote: D(t.escape) && D(t.quote) && l.compare(t.escape, t.quote) === 0,
    // columns can be `false`, `true`, `Array`
    expectedRecordLength: Array.isArray(t.columns) ? t.columns.length : void 0,
    field: new at(20),
    firstLineToHeaders: t.cast_first_line_to_header,
    needMoreDataSize: Math.max(
      // Skip if the remaining buffer smaller than comment
      t.comment !== null ? t.comment.length : 0,
      ...t.delimiter.map((e) => e.length),
      // Skip if the remaining buffer can be escape sequence
      t.quote !== null ? t.quote.length : 0
    ),
    previousBuf: void 0,
    quoting: !1,
    stop: !1,
    rawBuffer: new at(100),
    record: [],
    recordHasError: !1,
    record_length: 0,
    recordDelimiterMaxLength: t.record_delimiter.length === 0 ? 0 : Math.max(...t.record_delimiter.map((e) => e.length)),
    trimChars: [
      l.from(" ", t.encoding)[0],
      l.from("	", t.encoding)[0]
    ],
    wasQuoting: !1,
    wasRowDelimiter: !1,
    timchars: [
      l.from(l.from([Mn], "utf8").toString(), t.encoding),
      l.from(l.from([Bn], "utf8").toString(), t.encoding),
      l.from(l.from([Fn], "utf8").toString(), t.encoding),
      l.from(l.from([Un], "utf8").toString(), t.encoding),
      l.from(l.from([kn], "utf8").toString(), t.encoding)
    ]
  };
}, $n = function(t) {
  return t.replace(/([A-Z])/g, function(e, r) {
    return "_" + r.toLowerCase();
  });
}, lt = function(t) {
  const e = {};
  for (const n in t)
    e[$n(n)] = t[n];
  if (e.encoding === void 0 || e.encoding === !0)
    e.encoding = "utf8";
  else if (e.encoding === null || e.encoding === !1)
    e.encoding = null;
  else if (typeof e.encoding != "string" && e.encoding !== null)
    throw new y(
      "CSV_INVALID_OPTION_ENCODING",
      [
        "Invalid option encoding:",
        "encoding must be a string or null to return a buffer,",
        `got ${JSON.stringify(e.encoding)}`
      ],
      e
    );
  if (e.bom === void 0 || e.bom === null || e.bom === !1)
    e.bom = !1;
  else if (e.bom !== !0)
    throw new y(
      "CSV_INVALID_OPTION_BOM",
      [
        "Invalid option bom:",
        "bom must be true,",
        `got ${JSON.stringify(e.bom)}`
      ],
      e
    );
  if (e.cast_function = null, e.cast === void 0 || e.cast === null || e.cast === !1 || e.cast === "")
    e.cast = void 0;
  else if (typeof e.cast == "function")
    e.cast_function = e.cast, e.cast = !0;
  else if (e.cast !== !0)
    throw new y(
      "CSV_INVALID_OPTION_CAST",
      [
        "Invalid option cast:",
        "cast must be true or a function,",
        `got ${JSON.stringify(e.cast)}`
      ],
      e
    );
  if (e.cast_date === void 0 || e.cast_date === null || e.cast_date === !1 || e.cast_date === "")
    e.cast_date = !1;
  else if (e.cast_date === !0)
    e.cast_date = function(n) {
      const i = Date.parse(n);
      return isNaN(i) ? n : new Date(i);
    };
  else if (typeof e.cast_date != "function")
    throw new y(
      "CSV_INVALID_OPTION_CAST_DATE",
      [
        "Invalid option cast_date:",
        "cast_date must be true or a function,",
        `got ${JSON.stringify(e.cast_date)}`
      ],
      e
    );
  if (e.cast_first_line_to_header = void 0, e.columns === !0)
    e.cast_first_line_to_header = void 0;
  else if (typeof e.columns == "function")
    e.cast_first_line_to_header = e.columns, e.columns = !0;
  else if (Array.isArray(e.columns))
    e.columns = Yt(e.columns);
  else if (e.columns === void 0 || e.columns === null || e.columns === !1)
    e.columns = !1;
  else
    throw new y(
      "CSV_INVALID_OPTION_COLUMNS",
      [
        "Invalid option columns:",
        "expect an array, a function or true,",
        `got ${JSON.stringify(e.columns)}`
      ],
      e
    );
  if (e.group_columns_by_name === void 0 || e.group_columns_by_name === null || e.group_columns_by_name === !1)
    e.group_columns_by_name = !1;
  else {
    if (e.group_columns_by_name !== !0)
      throw new y(
        "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
        [
          "Invalid option group_columns_by_name:",
          "expect an boolean,",
          `got ${JSON.stringify(e.group_columns_by_name)}`
        ],
        e
      );
    if (e.columns === !1)
      throw new y(
        "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
        [
          "Invalid option group_columns_by_name:",
          "the `columns` mode must be activated."
        ],
        e
      );
  }
  if (e.comment === void 0 || e.comment === null || e.comment === !1 || e.comment === "")
    e.comment = null;
  else if (typeof e.comment == "string" && (e.comment = l.from(e.comment, e.encoding)), !D(e.comment))
    throw new y(
      "CSV_INVALID_OPTION_COMMENT",
      [
        "Invalid option comment:",
        "comment must be a buffer or a string,",
        `got ${JSON.stringify(e.comment)}`
      ],
      e
    );
  if (e.comment_no_infix === void 0 || e.comment_no_infix === null || e.comment_no_infix === !1)
    e.comment_no_infix = !1;
  else if (e.comment_no_infix !== !0)
    throw new y(
      "CSV_INVALID_OPTION_COMMENT",
      [
        "Invalid option comment_no_infix:",
        "value must be a boolean,",
        `got ${JSON.stringify(e.comment_no_infix)}`
      ],
      e
    );
  const r = JSON.stringify(e.delimiter);
  if (Array.isArray(e.delimiter) || (e.delimiter = [e.delimiter]), e.delimiter.length === 0)
    throw new y(
      "CSV_INVALID_OPTION_DELIMITER",
      [
        "Invalid option delimiter:",
        "delimiter must be a non empty string or buffer or array of string|buffer,",
        `got ${r}`
      ],
      e
    );
  if (e.delimiter = e.delimiter.map(function(n) {
    if (n == null || n === !1)
      return l.from(",", e.encoding);
    if (typeof n == "string" && (n = l.from(n, e.encoding)), !D(n) || n.length === 0)
      throw new y(
        "CSV_INVALID_OPTION_DELIMITER",
        [
          "Invalid option delimiter:",
          "delimiter must be a non empty string or buffer or array of string|buffer,",
          `got ${r}`
        ],
        e
      );
    return n;
  }), e.escape === void 0 || e.escape === !0 ? e.escape = l.from('"', e.encoding) : typeof e.escape == "string" ? e.escape = l.from(e.escape, e.encoding) : (e.escape === null || e.escape === !1) && (e.escape = null), e.escape !== null && !D(e.escape))
    throw new Error(
      `Invalid Option: escape must be a buffer, a string or a boolean, got ${JSON.stringify(e.escape)}`
    );
  if (e.from === void 0 || e.from === null)
    e.from = 1;
  else if (typeof e.from == "string" && /\d+/.test(e.from) && (e.from = parseInt(e.from)), Number.isInteger(e.from)) {
    if (e.from < 0)
      throw new Error(
        `Invalid Option: from must be a positive integer, got ${JSON.stringify(t.from)}`
      );
  } else
    throw new Error(
      `Invalid Option: from must be an integer, got ${JSON.stringify(e.from)}`
    );
  if (e.from_line === void 0 || e.from_line === null)
    e.from_line = 1;
  else if (typeof e.from_line == "string" && /\d+/.test(e.from_line) && (e.from_line = parseInt(e.from_line)), Number.isInteger(e.from_line)) {
    if (e.from_line <= 0)
      throw new Error(
        `Invalid Option: from_line must be a positive integer greater than 0, got ${JSON.stringify(t.from_line)}`
      );
  } else
    throw new Error(
      `Invalid Option: from_line must be an integer, got ${JSON.stringify(t.from_line)}`
    );
  if (e.ignore_last_delimiters === void 0 || e.ignore_last_delimiters === null)
    e.ignore_last_delimiters = !1;
  else if (typeof e.ignore_last_delimiters == "number")
    e.ignore_last_delimiters = Math.floor(e.ignore_last_delimiters), e.ignore_last_delimiters === 0 && (e.ignore_last_delimiters = !1);
  else if (typeof e.ignore_last_delimiters != "boolean")
    throw new y(
      "CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS",
      [
        "Invalid option `ignore_last_delimiters`:",
        "the value must be a boolean value or an integer,",
        `got ${JSON.stringify(e.ignore_last_delimiters)}`
      ],
      e
    );
  if (e.ignore_last_delimiters === !0 && e.columns === !1)
    throw new y(
      "CSV_IGNORE_LAST_DELIMITERS_REQUIRES_COLUMNS",
      [
        "The option `ignore_last_delimiters`",
        "requires the activation of the `columns` option"
      ],
      e
    );
  if (e.info === void 0 || e.info === null || e.info === !1)
    e.info = !1;
  else if (e.info !== !0)
    throw new Error(
      `Invalid Option: info must be true, got ${JSON.stringify(e.info)}`
    );
  if (e.max_record_size === void 0 || e.max_record_size === null || e.max_record_size === !1)
    e.max_record_size = 0;
  else if (!(Number.isInteger(e.max_record_size) && e.max_record_size >= 0)) if (typeof e.max_record_size == "string" && /\d+/.test(e.max_record_size))
    e.max_record_size = parseInt(e.max_record_size);
  else
    throw new Error(
      `Invalid Option: max_record_size must be a positive integer, got ${JSON.stringify(e.max_record_size)}`
    );
  if (e.objname === void 0 || e.objname === null || e.objname === !1)
    e.objname = void 0;
  else if (D(e.objname)) {
    if (e.objname.length === 0)
      throw new Error("Invalid Option: objname must be a non empty buffer");
    e.encoding === null || (e.objname = e.objname.toString(e.encoding));
  } else if (typeof e.objname == "string") {
    if (e.objname.length === 0)
      throw new Error("Invalid Option: objname must be a non empty string");
  } else if (typeof e.objname != "number") throw new Error(
    `Invalid Option: objname must be a string or a buffer, got ${e.objname}`
  );
  if (e.objname !== void 0) {
    if (typeof e.objname == "number") {
      if (e.columns !== !1)
        throw Error(
          "Invalid Option: objname index cannot be combined with columns or be defined as a field"
        );
    } else if (e.columns === !1)
      throw Error(
        "Invalid Option: objname field must be combined with columns or be defined as an index"
      );
  }
  if (e.on_record === void 0 || e.on_record === null)
    e.on_record = void 0;
  else if (typeof e.on_record != "function")
    throw new y(
      "CSV_INVALID_OPTION_ON_RECORD",
      [
        "Invalid option `on_record`:",
        "expect a function,",
        `got ${JSON.stringify(e.on_record)}`
      ],
      e
    );
  if (e.on_skip !== void 0 && e.on_skip !== null && typeof e.on_skip != "function")
    throw new Error(
      `Invalid Option: on_skip must be a function, got ${JSON.stringify(e.on_skip)}`
    );
  if (e.quote === null || e.quote === !1 || e.quote === "")
    e.quote = null;
  else if (e.quote === void 0 || e.quote === !0 ? e.quote = l.from('"', e.encoding) : typeof e.quote == "string" && (e.quote = l.from(e.quote, e.encoding)), !D(e.quote))
    throw new Error(
      `Invalid Option: quote must be a buffer or a string, got ${JSON.stringify(e.quote)}`
    );
  if (e.raw === void 0 || e.raw === null || e.raw === !1)
    e.raw = !1;
  else if (e.raw !== !0)
    throw new Error(
      `Invalid Option: raw must be true, got ${JSON.stringify(e.raw)}`
    );
  if (e.record_delimiter === void 0)
    e.record_delimiter = [];
  else if (typeof e.record_delimiter == "string" || D(e.record_delimiter)) {
    if (e.record_delimiter.length === 0)
      throw new y(
        "CSV_INVALID_OPTION_RECORD_DELIMITER",
        [
          "Invalid option `record_delimiter`:",
          "value must be a non empty string or buffer,",
          `got ${JSON.stringify(e.record_delimiter)}`
        ],
        e
      );
    e.record_delimiter = [e.record_delimiter];
  } else if (!Array.isArray(e.record_delimiter))
    throw new y(
      "CSV_INVALID_OPTION_RECORD_DELIMITER",
      [
        "Invalid option `record_delimiter`:",
        "value must be a string, a buffer or array of string|buffer,",
        `got ${JSON.stringify(e.record_delimiter)}`
      ],
      e
    );
  if (e.record_delimiter = e.record_delimiter.map(function(n, i) {
    if (typeof n != "string" && !D(n))
      throw new y(
        "CSV_INVALID_OPTION_RECORD_DELIMITER",
        [
          "Invalid option `record_delimiter`:",
          "value must be a string, a buffer or array of string|buffer",
          `at index ${i},`,
          `got ${JSON.stringify(n)}`
        ],
        e
      );
    if (n.length === 0)
      throw new y(
        "CSV_INVALID_OPTION_RECORD_DELIMITER",
        [
          "Invalid option `record_delimiter`:",
          "value must be a non empty string or buffer",
          `at index ${i},`,
          `got ${JSON.stringify(n)}`
        ],
        e
      );
    return typeof n == "string" && (n = l.from(n, e.encoding)), n;
  }), typeof e.relax_column_count != "boolean") if (e.relax_column_count === void 0 || e.relax_column_count === null)
    e.relax_column_count = !1;
  else
    throw new Error(
      `Invalid Option: relax_column_count must be a boolean, got ${JSON.stringify(e.relax_column_count)}`
    );
  if (typeof e.relax_column_count_less != "boolean") if (e.relax_column_count_less === void 0 || e.relax_column_count_less === null)
    e.relax_column_count_less = !1;
  else
    throw new Error(
      `Invalid Option: relax_column_count_less must be a boolean, got ${JSON.stringify(e.relax_column_count_less)}`
    );
  if (typeof e.relax_column_count_more != "boolean") if (e.relax_column_count_more === void 0 || e.relax_column_count_more === null)
    e.relax_column_count_more = !1;
  else
    throw new Error(
      `Invalid Option: relax_column_count_more must be a boolean, got ${JSON.stringify(e.relax_column_count_more)}`
    );
  if (typeof e.relax_quotes != "boolean") if (e.relax_quotes === void 0 || e.relax_quotes === null)
    e.relax_quotes = !1;
  else
    throw new Error(
      `Invalid Option: relax_quotes must be a boolean, got ${JSON.stringify(e.relax_quotes)}`
    );
  if (typeof e.skip_empty_lines != "boolean") if (e.skip_empty_lines === void 0 || e.skip_empty_lines === null)
    e.skip_empty_lines = !1;
  else
    throw new Error(
      `Invalid Option: skip_empty_lines must be a boolean, got ${JSON.stringify(e.skip_empty_lines)}`
    );
  if (typeof e.skip_records_with_empty_values != "boolean") if (e.skip_records_with_empty_values === void 0 || e.skip_records_with_empty_values === null)
    e.skip_records_with_empty_values = !1;
  else
    throw new Error(
      `Invalid Option: skip_records_with_empty_values must be a boolean, got ${JSON.stringify(e.skip_records_with_empty_values)}`
    );
  if (typeof e.skip_records_with_error != "boolean") if (e.skip_records_with_error === void 0 || e.skip_records_with_error === null)
    e.skip_records_with_error = !1;
  else
    throw new Error(
      `Invalid Option: skip_records_with_error must be a boolean, got ${JSON.stringify(e.skip_records_with_error)}`
    );
  if (e.rtrim === void 0 || e.rtrim === null || e.rtrim === !1)
    e.rtrim = !1;
  else if (e.rtrim !== !0)
    throw new Error(
      `Invalid Option: rtrim must be a boolean, got ${JSON.stringify(e.rtrim)}`
    );
  if (e.ltrim === void 0 || e.ltrim === null || e.ltrim === !1)
    e.ltrim = !1;
  else if (e.ltrim !== !0)
    throw new Error(
      `Invalid Option: ltrim must be a boolean, got ${JSON.stringify(e.ltrim)}`
    );
  if (e.trim === void 0 || e.trim === null || e.trim === !1)
    e.trim = !1;
  else if (e.trim !== !0)
    throw new Error(
      `Invalid Option: trim must be a boolean, got ${JSON.stringify(e.trim)}`
    );
  if (e.trim === !0 && t.ltrim !== !1 ? e.ltrim = !0 : e.ltrim !== !0 && (e.ltrim = !1), e.trim === !0 && t.rtrim !== !1 ? e.rtrim = !0 : e.rtrim !== !0 && (e.rtrim = !1), e.to === void 0 || e.to === null)
    e.to = -1;
  else if (e.to !== -1)
    if (typeof e.to == "string" && /\d+/.test(e.to) && (e.to = parseInt(e.to)), Number.isInteger(e.to)) {
      if (e.to <= 0)
        throw new Error(
          `Invalid Option: to must be a positive integer greater than 0, got ${JSON.stringify(t.to)}`
        );
    } else
      throw new Error(
        `Invalid Option: to must be an integer, got ${JSON.stringify(t.to)}`
      );
  if (e.to_line === void 0 || e.to_line === null)
    e.to_line = -1;
  else if (e.to_line !== -1)
    if (typeof e.to_line == "string" && /\d+/.test(e.to_line) && (e.to_line = parseInt(e.to_line)), Number.isInteger(e.to_line)) {
      if (e.to_line <= 0)
        throw new Error(
          `Invalid Option: to_line must be a positive integer greater than 0, got ${JSON.stringify(t.to_line)}`
        );
    } else
      throw new Error(
        `Invalid Option: to_line must be an integer, got ${JSON.stringify(t.to_line)}`
      );
  return e;
}, ut = function(t) {
  return t.every(
    (e) => e == null || e.toString && e.toString().trim() === ""
  );
}, jn = 13, qn = 10, re = {
  // Note, the following are equals:
  // Buffer.from("\ufeff")
  // Buffer.from([239, 187, 191])
  // Buffer.from('EFBBBF', 'hex')
  utf8: l.from([239, 187, 191]),
  // Note, the following are equals:
  // Buffer.from "\ufeff", 'utf16le
  // Buffer.from([255, 254])
  utf16le: l.from([255, 254])
}, Vn = function(t = {}) {
  const e = {
    bytes: 0,
    comment_lines: 0,
    empty_lines: 0,
    invalid_field_length: 0,
    lines: 1,
    records: 0
  }, r = lt(t);
  return {
    info: e,
    original_options: t,
    options: r,
    state: Pn(r),
    __needMoreData: function(n, i, o) {
      if (o) return !1;
      const { encoding: s, escape: f, quote: a } = this.options, { quoting: u, needMoreDataSize: h, recordDelimiterMaxLength: c } = this.state, d = i - n - 1, p = Math.max(
        h,
        // Skip if the remaining buffer smaller than record delimiter
        // If "record_delimiter" is yet to be discovered:
        // 1. It is equals to `[]` and "recordDelimiterMaxLength" equals `0`
        // 2. We set the length to windows line ending in the current encoding
        // Note, that encoding is known from user or bom discovery at that point
        // recordDelimiterMaxLength,
        c === 0 ? l.from(`\r
`, s).length : c,
        // Skip if remaining buffer can be an escaped quote
        u ? (f === null ? 0 : f.length) + a.length : 0,
        // Skip if remaining buffer can be record delimiter following the closing quote
        u ? a.length + c : 0
      );
      return d < p;
    },
    // Central parser implementation
    parse: function(n, i, o, s) {
      const {
        bom: f,
        comment_no_infix: a,
        encoding: u,
        from_line: h,
        ltrim: c,
        max_record_size: d,
        raw: p,
        relax_quotes: x,
        rtrim: _,
        skip_empty_lines: S,
        to: I,
        to_line: v
      } = this.options;
      let { comment: w, escape: R, quote: F, record_delimiter: Re } = this.options;
      const { bomSkipped: Qt, previousBuf: ce, rawBuffer: Ht, escapeIsQuote: Gt } = this.state;
      let b;
      if (ce === void 0)
        if (n === void 0) {
          s();
          return;
        } else
          b = n;
      else ce !== void 0 && n === void 0 ? b = ce : b = l.concat([ce, n]);
      if (Qt === !1)
        if (f === !1)
          this.state.bomSkipped = !0;
        else if (b.length < 3) {
          if (i === !1) {
            this.state.previousBuf = b;
            return;
          }
        } else {
          for (const O in re)
            if (re[O].compare(b, 0, re[O].length) === 0) {
              const J = re[O].length;
              this.state.bufBytesStart += J, b = b.slice(J);
              const he = lt({
                ...this.original_options,
                encoding: O
              });
              for (const A in he)
                this.options[A] = he[A];
              ({ comment: w, escape: R, quote: F } = this.options);
              break;
            }
          this.state.bomSkipped = !0;
        }
      const Ie = b.length;
      let m;
      for (m = 0; m < Ie && !this.__needMoreData(m, Ie, i); m++) {
        if (this.state.wasRowDelimiter === !0 && (this.info.lines++, this.state.wasRowDelimiter = !1), v !== -1 && this.info.lines > v) {
          this.state.stop = !0, s();
          return;
        }
        this.state.quoting === !1 && Re.length === 0 && this.__autoDiscoverRecordDelimiter(
          b,
          m
        ) && (Re = this.options.record_delimiter);
        const O = b[m];
        if (p === !0 && Ht.append(O), (O === jn || O === qn) && this.state.wasRowDelimiter === !1 && (this.state.wasRowDelimiter = !0), this.state.escaping === !0)
          this.state.escaping = !1;
        else {
          if (R !== null && this.state.quoting === !0 && this.__isEscape(b, m, O) && m + R.length < Ie)
            if (Gt) {
              if (this.__isQuote(b, m + R.length)) {
                this.state.escaping = !0, m += R.length - 1;
                continue;
              }
            } else {
              this.state.escaping = !0, m += R.length - 1;
              continue;
            }
          if (this.state.commenting === !1 && this.__isQuote(b, m))
            if (this.state.quoting === !0) {
              const A = b[m + F.length], Z = _ && this.__isCharTrimable(b, m + F.length), j = w !== null && this.__compareBytes(w, b, m + F.length, A), X = this.__isDelimiter(
                b,
                m + F.length,
                A
              ), de = Re.length === 0 ? this.__autoDiscoverRecordDelimiter(b, m + F.length) : this.__isRecordDelimiter(A, b, m + F.length);
              if (R !== null && this.__isEscape(b, m, O) && this.__isQuote(b, m + R.length))
                m += R.length - 1;
              else if (!A || X || de || j || Z) {
                this.state.quoting = !1, this.state.wasQuoting = !0, m += F.length - 1;
                continue;
              } else if (x === !1) {
                const Ge = this.__error(
                  new y(
                    "CSV_INVALID_CLOSING_QUOTE",
                    [
                      "Invalid Closing Quote:",
                      `got "${String.fromCharCode(A)}"`,
                      `at line ${this.info.lines}`,
                      "instead of delimiter, record delimiter, trimable character",
                      "(if activated) or comment"
                    ],
                    this.options,
                    this.__infoField()
                  )
                );
                if (Ge !== void 0) return Ge;
              } else
                this.state.quoting = !1, this.state.wasQuoting = !0, this.state.field.prepend(F), m += F.length - 1;
            } else if (this.state.field.length !== 0) {
              if (x === !1) {
                const A = this.__infoField(), Z = Object.keys(re).map(
                  (X) => re[X].equals(this.state.field.toString()) ? X : !1
                ).filter(Boolean)[0], j = this.__error(
                  new y(
                    "INVALID_OPENING_QUOTE",
                    [
                      "Invalid Opening Quote:",
                      `a quote is found on field ${JSON.stringify(A.column)} at line ${A.lines}, value is ${JSON.stringify(this.state.field.toString(u))}`,
                      Z ? `(${Z} bom)` : void 0
                    ],
                    this.options,
                    A,
                    {
                      field: this.state.field
                    }
                  )
                );
                if (j !== void 0) return j;
              }
            } else {
              this.state.quoting = !0, m += F.length - 1;
              continue;
            }
          if (this.state.quoting === !1) {
            const A = this.__isRecordDelimiter(
              O,
              b,
              m
            );
            if (A !== 0) {
              if (this.state.commenting && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0)
                this.info.comment_lines++;
              else {
                if (this.state.enabled === !1 && this.info.lines + (this.state.wasRowDelimiter === !0 ? 1 : 0) >= h) {
                  this.state.enabled = !0, this.__resetField(), this.__resetRecord(), m += A - 1;
                  continue;
                }
                if (S === !0 && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0) {
                  this.info.empty_lines++, m += A - 1;
                  continue;
                }
                this.info.bytes = this.state.bufBytesStart + m;
                const X = this.__onField();
                if (X !== void 0) return X;
                this.info.bytes = this.state.bufBytesStart + m + A;
                const de = this.__onRecord(o);
                if (de !== void 0) return de;
                if (I !== -1 && this.info.records >= I) {
                  this.state.stop = !0, s();
                  return;
                }
              }
              this.state.commenting = !1, m += A - 1;
              continue;
            }
            if (this.state.commenting)
              continue;
            if (w !== null && (a === !1 || this.state.record.length === 0 && this.state.field.length === 0) && this.__compareBytes(w, b, m, O) !== 0) {
              this.state.commenting = !0;
              continue;
            }
            const Z = this.__isDelimiter(b, m, O);
            if (Z !== 0) {
              this.info.bytes = this.state.bufBytesStart + m;
              const j = this.__onField();
              if (j !== void 0) return j;
              m += Z - 1;
              continue;
            }
          }
        }
        if (this.state.commenting === !1 && d !== 0 && this.state.record_length + this.state.field.length > d)
          return this.__error(
            new y(
              "CSV_MAX_RECORD_SIZE",
              [
                "Max Record Size:",
                "record exceed the maximum number of tolerated bytes",
                `of ${d}`,
                `at line ${this.info.lines}`
              ],
              this.options,
              this.__infoField()
            )
          );
        const J = c === !1 || this.state.quoting === !0 || this.state.field.length !== 0 || !this.__isCharTrimable(b, m), he = _ === !1 || this.state.wasQuoting === !1;
        if (J === !0 && he === !0)
          this.state.field.append(O);
        else {
          if (_ === !0 && !this.__isCharTrimable(b, m))
            return this.__error(
              new y(
                "CSV_NON_TRIMABLE_CHAR_AFTER_CLOSING_QUOTE",
                [
                  "Invalid Closing Quote:",
                  "found non trimable byte after quote",
                  `at line ${this.info.lines}`
                ],
                this.options,
                this.__infoField()
              )
            );
          J === !1 && (m += this.__isCharTrimable(b, m) - 1);
          continue;
        }
      }
      if (i === !0)
        if (this.state.quoting === !0) {
          const O = this.__error(
            new y(
              "CSV_QUOTE_NOT_CLOSED",
              [
                "Quote Not Closed:",
                `the parsing is finished with an opening quote at line ${this.info.lines}`
              ],
              this.options,
              this.__infoField()
            )
          );
          if (O !== void 0) return O;
        } else if (this.state.wasQuoting === !0 || this.state.record.length !== 0 || this.state.field.length !== 0) {
          this.info.bytes = this.state.bufBytesStart + m;
          const O = this.__onField();
          if (O !== void 0) return O;
          const J = this.__onRecord(o);
          if (J !== void 0) return J;
        } else this.state.wasRowDelimiter === !0 ? this.info.empty_lines++ : this.state.commenting === !0 && this.info.comment_lines++;
      else
        this.state.bufBytesStart += m, this.state.previousBuf = b.slice(m);
      this.state.wasRowDelimiter === !0 && (this.info.lines++, this.state.wasRowDelimiter = !1);
    },
    __onRecord: function(n) {
      const {
        columns: i,
        group_columns_by_name: o,
        encoding: s,
        info: f,
        from: a,
        relax_column_count: u,
        relax_column_count_less: h,
        relax_column_count_more: c,
        raw: d,
        skip_records_with_empty_values: p
      } = this.options, { enabled: x, record: _ } = this.state;
      if (x === !1)
        return this.__resetRecord();
      const S = _.length;
      if (i === !0) {
        if (p === !0 && ut(_)) {
          this.__resetRecord();
          return;
        }
        return this.__firstLineToColumns(_);
      }
      if (i === !1 && this.info.records === 0 && (this.state.expectedRecordLength = S), S !== this.state.expectedRecordLength) {
        const I = i === !1 ? new y(
          "CSV_RECORD_INCONSISTENT_FIELDS_LENGTH",
          [
            "Invalid Record Length:",
            `expect ${this.state.expectedRecordLength},`,
            `got ${S} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: _
          }
        ) : new y(
          "CSV_RECORD_INCONSISTENT_COLUMNS",
          [
            "Invalid Record Length:",
            `columns length is ${i.length},`,
            // rename columns
            `got ${S} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: _
          }
        );
        if (u === !0 || h === !0 && S < this.state.expectedRecordLength || c === !0 && S > this.state.expectedRecordLength)
          this.info.invalid_field_length++, this.state.error = I;
        else {
          const v = this.__error(I);
          if (v) return v;
        }
      }
      if (p === !0 && ut(_)) {
        this.__resetRecord();
        return;
      }
      if (this.state.recordHasError === !0) {
        this.__resetRecord(), this.state.recordHasError = !1;
        return;
      }
      if (this.info.records++, a === 1 || this.info.records >= a) {
        const { objname: I } = this.options;
        if (i !== !1) {
          const v = {};
          for (let w = 0, R = _.length; w < R; w++)
            i[w] === void 0 || i[w].disabled || (o === !0 && v[i[w].name] !== void 0 ? Array.isArray(v[i[w].name]) ? v[i[w].name] = v[i[w].name].concat(_[w]) : v[i[w].name] = [v[i[w].name], _[w]] : v[i[w].name] = _[w]);
          if (d === !0 || f === !0) {
            const w = Object.assign(
              { record: v },
              d === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
              f === !0 ? { info: this.__infoRecord() } : {}
            ), R = this.__push(
              I === void 0 ? w : [v[I], w],
              n
            );
            if (R)
              return R;
          } else {
            const w = this.__push(
              I === void 0 ? v : [v[I], v],
              n
            );
            if (w)
              return w;
          }
        } else if (d === !0 || f === !0) {
          const v = Object.assign(
            { record: _ },
            d === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
            f === !0 ? { info: this.__infoRecord() } : {}
          ), w = this.__push(
            I === void 0 ? v : [_[I], v],
            n
          );
          if (w)
            return w;
        } else {
          const v = this.__push(
            I === void 0 ? _ : [_[I], _],
            n
          );
          if (v)
            return v;
        }
      }
      this.__resetRecord();
    },
    __firstLineToColumns: function(n) {
      const { firstLineToHeaders: i } = this.state;
      try {
        const o = i === void 0 ? n : i.call(null, n);
        if (!Array.isArray(o))
          return this.__error(
            new y(
              "CSV_INVALID_COLUMN_MAPPING",
              [
                "Invalid Column Mapping:",
                "expect an array from column function,",
                `got ${JSON.stringify(o)}`
              ],
              this.options,
              this.__infoField(),
              {
                headers: o
              }
            )
          );
        const s = Yt(o);
        this.state.expectedRecordLength = s.length, this.options.columns = s, this.__resetRecord();
        return;
      } catch (o) {
        return o;
      }
    },
    __resetRecord: function() {
      this.options.raw === !0 && this.state.rawBuffer.reset(), this.state.error = void 0, this.state.record = [], this.state.record_length = 0;
    },
    __onField: function() {
      const { cast: n, encoding: i, rtrim: o, max_record_size: s } = this.options, { enabled: f, wasQuoting: a } = this.state;
      if (f === !1)
        return this.__resetField();
      let u = this.state.field.toString(i);
      if (o === !0 && a === !1 && (u = u.trimRight()), n === !0) {
        const [h, c] = this.__cast(u);
        if (h !== void 0) return h;
        u = c;
      }
      this.state.record.push(u), s !== 0 && typeof u == "string" && (this.state.record_length += u.length), this.__resetField();
    },
    __resetField: function() {
      this.state.field.reset(), this.state.wasQuoting = !1;
    },
    __push: function(n, i) {
      const { on_record: o } = this.options;
      if (o !== void 0) {
        const s = this.__infoRecord();
        try {
          n = o.call(null, n, s);
        } catch (f) {
          return f;
        }
        if (n == null)
          return;
      }
      i(n);
    },
    // Return a tuple with the error and the casted value
    __cast: function(n) {
      const { columns: i, relax_column_count: o } = this.options;
      if (Array.isArray(i) === !0 && o && this.options.columns.length <= this.state.record.length)
        return [void 0, void 0];
      if (this.state.castField !== null)
        try {
          const f = this.__infoField();
          return [void 0, this.state.castField.call(null, n, f)];
        } catch (f) {
          return [f];
        }
      if (this.__isFloat(n))
        return [void 0, parseFloat(n)];
      if (this.options.cast_date !== !1) {
        const f = this.__infoField();
        return [void 0, this.options.cast_date.call(null, n, f)];
      }
      return [void 0, n];
    },
    // Helper to test if a character is a space or a line delimiter
    __isCharTrimable: function(n, i) {
      return ((s, f) => {
        const { timchars: a } = this.state;
        e: for (let u = 0; u < a.length; u++) {
          const h = a[u];
          for (let c = 0; c < h.length; c++)
            if (h[c] !== s[f + c]) continue e;
          return h.length;
        }
        return 0;
      })(n, i);
    },
    // Keep it in case we implement the `cast_int` option
    // __isInt(value){
    //   // return Number.isInteger(parseInt(value))
    //   // return !isNaN( parseInt( obj ) );
    //   return /^(\-|\+)?[1-9][0-9]*$/.test(value)
    // }
    __isFloat: function(n) {
      return n - parseFloat(n) + 1 >= 0;
    },
    __compareBytes: function(n, i, o, s) {
      if (n[0] !== s) return 0;
      const f = n.length;
      for (let a = 1; a < f; a++)
        if (n[a] !== i[o + a]) return 0;
      return f;
    },
    __isDelimiter: function(n, i, o) {
      const { delimiter: s, ignore_last_delimiters: f } = this.options;
      if (f === !0 && this.state.record.length === this.options.columns.length - 1)
        return 0;
      if (f !== !1 && typeof f == "number" && this.state.record.length === f - 1)
        return 0;
      e: for (let a = 0; a < s.length; a++) {
        const u = s[a];
        if (u[0] === o) {
          for (let h = 1; h < u.length; h++)
            if (u[h] !== n[i + h]) continue e;
          return u.length;
        }
      }
      return 0;
    },
    __isRecordDelimiter: function(n, i, o) {
      const { record_delimiter: s } = this.options, f = s.length;
      e: for (let a = 0; a < f; a++) {
        const u = s[a], h = u.length;
        if (u[0] === n) {
          for (let c = 1; c < h; c++)
            if (u[c] !== i[o + c])
              continue e;
          return u.length;
        }
      }
      return 0;
    },
    __isEscape: function(n, i, o) {
      const { escape: s } = this.options;
      if (s === null) return !1;
      const f = s.length;
      if (s[0] === o) {
        for (let a = 0; a < f; a++)
          if (s[a] !== n[i + a])
            return !1;
        return !0;
      }
      return !1;
    },
    __isQuote: function(n, i) {
      const { quote: o } = this.options;
      if (o === null) return !1;
      const s = o.length;
      for (let f = 0; f < s; f++)
        if (o[f] !== n[i + f])
          return !1;
      return !0;
    },
    __autoDiscoverRecordDelimiter: function(n, i) {
      const { encoding: o } = this.options, s = [
        // Important, the windows line ending must be before mac os 9
        l.from(`\r
`, o),
        l.from(`
`, o),
        l.from("\r", o)
      ];
      e: for (let f = 0; f < s.length; f++) {
        const a = s[f].length;
        for (let u = 0; u < a; u++)
          if (s[f][u] !== n[i + u])
            continue e;
        return this.options.record_delimiter.push(s[f]), this.state.recordDelimiterMaxLength = s[f].length, s[f].length;
      }
      return 0;
    },
    __error: function(n) {
      const { encoding: i, raw: o, skip_records_with_error: s } = this.options, f = typeof n == "string" ? new Error(n) : n;
      if (s) {
        if (this.state.recordHasError = !0, this.options.on_skip !== void 0)
          try {
            this.options.on_skip(
              f,
              o ? this.state.rawBuffer.toString(i) : void 0
            );
          } catch (a) {
            return a;
          }
        return;
      } else
        return f;
    },
    __infoDataSet: function() {
      return {
        ...this.info,
        columns: this.options.columns
      };
    },
    __infoRecord: function() {
      const { columns: n, raw: i, encoding: o } = this.options;
      return {
        ...this.__infoDataSet(),
        error: this.state.error,
        header: n === !0,
        index: this.state.record.length,
        raw: i ? this.state.rawBuffer.toString(o) : void 0
      };
    },
    __infoField: function() {
      const { columns: n } = this.options, i = Array.isArray(n);
      return {
        ...this.__infoRecord(),
        column: i === !0 ? n.length > this.state.record.length ? n[this.state.record.length].name : null : this.state.record.length,
        quoting: this.state.wasQuoting
      };
    }
  };
};
class zn extends k {
  constructor(e = {}) {
    super({ readableObjectMode: !0, ...e, encoding: null }), this.api = Vn({
      on_skip: (r, n) => {
        this.emit("skip", r, n);
      },
      ...e
    }), this.state = this.api.state, this.options = this.api.options, this.info = this.api.info;
  }
  // Implementation of `Transform._transform`
  _transform(e, r, n) {
    if (this.state.stop === !0)
      return;
    const i = this.api.parse(
      e,
      !1,
      (o) => {
        this.push(o);
      },
      () => {
        this.push(null), this.end(), this.on("end", this.destroy);
      }
    );
    i !== void 0 && (this.state.stop = !0), n(i);
  }
  // Implementation of `Transform._flush`
  _flush(e) {
    if (this.state.stop === !0)
      return;
    const r = this.api.parse(
      void 0,
      !0,
      (n) => {
        this.push(n);
      },
      () => {
        this.push(null), this.on("end", this.destroy);
      }
    );
    e(r);
  }
}
const je = function() {
  let t, e, r;
  for (const i in arguments) {
    const o = arguments[i], s = typeof o;
    if (t === void 0 && (typeof o == "string" || D(o)))
      t = o;
    else if (e === void 0 && Jt(o))
      e = o;
    else if (r === void 0 && s === "function")
      r = o;
    else
      throw new y(
        "CSV_INVALID_ARGUMENT",
        ["Invalid argument:", `got ${JSON.stringify(o)} at index ${i}`],
        e || {}
      );
  }
  const n = new zn(e);
  if (r) {
    const i = e === void 0 || e.objname === void 0 ? [] : {};
    n.on("readable", function() {
      let o;
      for (; (o = this.read()) !== null; )
        e === void 0 || e.objname === void 0 ? i.push(o) : i[o[0]] = o[1];
    }), n.on("error", function(o) {
      r(o, void 0, n.api.__infoDataSet());
    }), n.on("end", function() {
      r(void 0, i, n.api.__infoDataSet());
    });
  }
  if (t !== void 0) {
    const i = function() {
      n.write(t), n.end();
    };
    typeof setImmediate == "function" ? setImmediate(i) : setTimeout(i, 0);
  }
  return n;
};
class Jn extends Error {
  locator;
  /** Logical source of the error. */
  constructor(e, r, n) {
    super(e, n), this.name = new.target.name, this.locator = r;
  }
}
class Yn extends Jn {
}
class Wn extends Yn {
  body;
  /** Sanitized HTTP response body. */
  constructor(e, r, n, i) {
    super(e, r, i), this.name = new.target.name, this.body = Gn(n ?? void 0);
  }
}
async function Qn(t, e, r) {
  const n = ` - ${t.statusText}`, i = `${e} Response status '${t.status}${t.statusText ? n : ""}' received.`;
  let o;
  try {
    o = await t.text();
  } catch (s) {
    o = `<body unavailable: ${Hn(s).message}>`;
  }
  return new Wn(i, r, o);
}
function Be(t) {
  try {
    t();
  } catch {
  }
}
function Hn(t) {
  if (t instanceof Error) return t;
  if (typeof t == "string") return new Error(t);
  if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return new Error(String(t));
  if (typeof t == "symbol") return new Error(t.description ?? "Unknown error");
  if (t != null && typeof t == "object")
    try {
      return new Error(JSON.stringify(t));
    } catch {
      return new Error("Unknown error");
    }
  return new Error("Unknown error");
}
function Gn(t) {
  if (!(t == null || t === ""))
    return t.length > 2048 ? `${t.slice(0, 2048)}... [truncated]` : t;
}
const Wt = {
  bom: !1,
  cast: void 0,
  cast_date: !1,
  columns: !1,
  comment: "",
  comment_no_infix: !1,
  delimiter: ",",
  encoding: "utf8",
  escape: '"',
  // from: 1,
  from_line: 1,
  group_columns_by_name: !1,
  ignore_last_delimiters: !1,
  info: !1,
  ltrim: !1,
  max_record_size: 0,
  objname: void 0,
  on_record: void 0,
  on_skip: void 0,
  quote: '"',
  // raw: false,
  record_delimiter: [],
  relax_column_count: !1,
  relax_column_count_less: !1,
  relax_column_count_more: !1,
  relax_quotes: !1,
  rtrim: !1,
  skip_empty_lines: !1,
  skip_records_with_empty_values: !1,
  skip_records_with_error: !1,
  // to: 1,
  // to_line: -1,
  trim: !1
}, Zn = 1e4, Xn = 4;
class ni {
  /** Build parser. */
  buildParser(e) {
    return je(e);
  }
  /**
   * Infer schema.
   */
  async inferSchema(e, r, n) {
    const i = Kn(r), { parsingRecords: o, valueDelimiterId: s } = await ei(r, n), f = [], a = [];
    for (const c of o) {
      const d = e.inferValues(f, c, !0);
      a.push(d);
    }
    let u = 0;
    const h = a[0];
    if (h) {
      const c = h.length;
      for (let d = 0; d < c; d++) {
        const p = h[d]?.inferredValue, x = p == null ? `Column ${d}` : String(p), _ = f[d];
        _ != null && (_.label = { en: x });
      }
      u = 1;
    }
    for (let c = u; c < a.length; c++) {
      const d = a[c] ?? [];
      for (let p = 0; p < d.length; p++)
        f[p];
    }
    return { recordDelimiterId: i, valueDelimiterId: s, parsingRecords: o, inferenceRecords: a, columnConfigs: f };
  }
  /**
   * Parse stream.
   */
  async parseStream(e, r, n, i, o) {
    return new Promise((s, f) => {
      let a, u, h, c = !1, d = !1;
      const p = () => {
        if (d) return;
        d = !0;
        const S = a;
        a = void 0, h = void 0, S != null && (Be(() => S.removeAllListeners()), Be(() => S.end())), Be(() => {
          u?.cancel();
        }), u = void 0;
      };
      i.signal.addEventListener("abort", p, { once: !0 });
      const x = (S) => {
        c || (c = !0, p(), i.signal.aborted || i.abort(S), f(S));
      };
      (async () => {
        a = je({
          ...Wt,
          ...r,
          cast: (R, F) => ({ value: R, wasValueQuoted: F.quoting })
        }), h = ti({ chunk: o, chunkSize: e.chunkSize ?? Zn }), a.on("readable", () => {
          try {
            if (a == null || h == null) return;
            let R;
            for (; (R = a.read()) != null; ) {
              if (c) return;
              i.signal.throwIfAborted(), h.push(R);
            }
          } catch (R) {
            x(R);
          }
        }), a.on("error", (R) => x(R)), a.on("end", () => {
          c || (h?.flush(), s(ri(a)));
        });
        const S = await fetch(encodeURI(n), { signal: i.signal });
        if (!S.ok || S.body == null)
          throw await Qn(S, `Failed to fetch '${n}' file.`, "datapos-connector-file-store-emulator|Connector|retrieve");
        u = S.body.getReader();
        const I = new TextDecoder(e.encodingId);
        let v = await u.read();
        for (; !v.done; ) {
          if (c) return;
          i.signal.throwIfAborted();
          const R = I.decode(v.value, { stream: !0 });
          R.length > 0 && a.write(R), v = await u.read();
        }
        if (c) return;
        const w = I.decode();
        w.length > 0 && a.write(w), a.end();
      })().catch((S) => x(S));
    });
  }
}
function Kn(t) {
  const e = (t.match(/\r\n/g) ?? []).length, r = (t.match(/(?<!\r)\n/g) ?? []).length, n = (t.match(/\r(?!\n)/g) ?? []).length;
  return e >= r && e >= n ? `\r
` : r >= e && r >= n ? `
` : n >= e && n >= r ? "\r" : `
`;
}
async function ei(t, e) {
  let r, n, i, o = [];
  for (const s of e)
    try {
      let f = 0, a, u = 0, h = 0;
      const c = je({
        ...Wt,
        cast: (d, p) => ({ value: d, wasValueQuoted: p.quoting }),
        delimiter: s,
        relax_column_count: !0
      });
      await new Promise((d) => {
        try {
          const p = [];
          c.on("readable", () => {
            let x;
            for (; (x = c.read()) != null; ) {
              u++;
              const _ = x.length;
              a != null && (h += Math.abs(_ - a)), a = _, f += _, p.push(x);
            }
          }), c.on("error", () => d()), c.on("end", () => {
            const x = f / u;
            (!i || h <= i) && (!n || x > n) && (r = s, n = x, i = h, o = [...p]), d();
          }), c.write(t), c.end();
        } catch {
          d();
        }
      });
    } catch {
    }
  return { parsingRecords: o, valueDelimiterId: r ?? "," };
}
function ti(t) {
  const e = Math.max(1, Math.floor(t.chunkSize)), r = [];
  let n = f(), i = 0;
  const o = () => {
    if (i === 0) return;
    const a = n;
    a.length = i, n = f(), i = 0, t.chunk(a), r.length < Xn && r.push(a);
  };
  return { flush: o, push: (a) => {
    n[i++] = a, i >= e && o();
  } };
  function f() {
    const a = r.pop();
    if (a != null)
      return a.length = 0, a;
    const u = Array.from({ length: e });
    return u.length = 0, u;
  }
}
function ri(t) {
  return {
    byteCount: t?.info.bytes ?? -1,
    commentLineCount: t?.info.comment_lines ?? -1,
    emptyLineCount: t?.info.empty_lines ?? -1,
    nonUniformRecordCount: t?.info.invalid_field_length ?? -1,
    lineCount: t?.info.lines ?? -1,
    recordCount: t?.info.records ?? -1
  };
}
export {
  ni as Tool
};
