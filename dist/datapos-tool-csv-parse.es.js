var ie = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {}, P = [], F = [], Qt = typeof Uint8Array < "u" ? Uint8Array : Array, je = !1;
function lt() {
  je = !0;
  for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0, r = t.length; e < r; ++e)
    P[e] = t[e], F[t.charCodeAt(e)] = e;
  F[45] = 62, F[95] = 63;
}
function Ht(t) {
  je || lt();
  var e, r, n, i, o, s, f = t.length;
  if (f % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  o = t[f - 2] === "=" ? 2 : t[f - 1] === "=" ? 1 : 0, s = new Qt(f * 3 / 4 - o), n = o > 0 ? f - 4 : f;
  var l = 0;
  for (e = 0, r = 0; e < n; e += 4, r += 3)
    i = F[t.charCodeAt(e)] << 18 | F[t.charCodeAt(e + 1)] << 12 | F[t.charCodeAt(e + 2)] << 6 | F[t.charCodeAt(e + 3)], s[l++] = i >> 16 & 255, s[l++] = i >> 8 & 255, s[l++] = i & 255;
  return o === 2 ? (i = F[t.charCodeAt(e)] << 2 | F[t.charCodeAt(e + 1)] >> 4, s[l++] = i & 255) : o === 1 && (i = F[t.charCodeAt(e)] << 10 | F[t.charCodeAt(e + 1)] << 4 | F[t.charCodeAt(e + 2)] >> 2, s[l++] = i >> 8 & 255, s[l++] = i & 255), s;
}
function Gt(t) {
  return P[t >> 18 & 63] + P[t >> 12 & 63] + P[t >> 6 & 63] + P[t & 63];
}
function Zt(t, e, r) {
  for (var n, i = [], o = e; o < r; o += 3)
    n = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(Gt(n));
  return i.join("");
}
function He(t) {
  je || lt();
  for (var e, r = t.length, n = r % 3, i = "", o = [], s = 16383, f = 0, l = r - n; f < l; f += s)
    o.push(Zt(t, f, f + s > l ? l : f + s));
  return n === 1 ? (e = t[r - 1], i += P[e >> 2], i += P[e << 4 & 63], i += "==") : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], i += P[e >> 10], i += P[e >> 4 & 63], i += P[e << 2 & 63], i += "="), o.push(i), o.join("");
}
function ve(t, e, r, n, i) {
  var o, s, f = i * 8 - n - 1, l = (1 << f) - 1, u = l >> 1, h = -7, c = r ? i - 1 : 0, g = r ? -1 : 1, v = t[e + c];
  for (c += g, o = v & (1 << -h) - 1, v >>= -h, h += f; h > 0; o = o * 256 + t[e + c], c += g, h -= 8)
    ;
  for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = s * 256 + t[e + c], c += g, h -= 8)
    ;
  if (o === 0)
    o = 1 - u;
  else {
    if (o === l)
      return s ? NaN : (v ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, n), o = o - u;
  }
  return (v ? -1 : 1) * s * Math.pow(2, o - n);
}
function ut(t, e, r, n, i, o) {
  var s, f, l, u = o * 8 - i - 1, h = (1 << u) - 1, c = h >> 1, g = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, v = n ? 0 : o - 1, A = n ? 1 : -1, x = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (f = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), s + c >= 1 ? e += g / l : e += g * Math.pow(2, 1 - c), e * l >= 2 && (s++, l /= 2), s + c >= h ? (f = 0, s = h) : s + c >= 1 ? (f = (e * l - 1) * Math.pow(2, i), s = s + c) : (f = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + v] = f & 255, v += A, f /= 256, i -= 8)
    ;
  for (s = s << i | f, u += i; u > 0; t[r + v] = s & 255, v += A, s /= 256, u -= 8)
    ;
  t[r + v - A] |= x * 128;
}
var Xt = {}.toString, ht = Array.isArray || function(t) {
  return Xt.call(t) == "[object Array]";
}, Kt = 50;
a.TYPED_ARRAY_SUPPORT = ie.TYPED_ARRAY_SUPPORT !== void 0 ? ie.TYPED_ARRAY_SUPPORT : !0;
_e();
function _e() {
  return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function q(t, e) {
  if (_e() < e)
    throw new RangeError("Invalid typed array length");
  return a.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = a.prototype) : (t === null && (t = new a(e)), t.length = e), t;
}
function a(t, e, r) {
  if (!a.TYPED_ARRAY_SUPPORT && !(this instanceof a))
    return new a(t, e, r);
  if (typeof t == "number") {
    if (typeof e == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return $e(this, t);
  }
  return ct(this, t, e, r);
}
a.poolSize = 8192;
a._augment = function(t) {
  return t.__proto__ = a.prototype, t;
};
function ct(t, e, r, n) {
  if (typeof e == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer ? rr(t, e, r, n) : typeof e == "string" ? tr(t, e, r) : nr(t, e);
}
a.from = function(t, e, r) {
  return ct(null, t, e, r);
};
a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && a[Symbol.species]);
function dt(t) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be a number');
  if (t < 0)
    throw new RangeError('"size" argument must not be negative');
}
function er(t, e, r, n) {
  return dt(e), e <= 0 ? q(t, e) : r !== void 0 ? typeof n == "string" ? q(t, e).fill(r, n) : q(t, e).fill(r) : q(t, e);
}
a.alloc = function(t, e, r) {
  return er(null, t, e, r);
};
function $e(t, e) {
  if (dt(e), t = q(t, e < 0 ? 0 : qe(e) | 0), !a.TYPED_ARRAY_SUPPORT)
    for (var r = 0; r < e; ++r)
      t[r] = 0;
  return t;
}
a.allocUnsafe = function(t) {
  return $e(null, t);
};
a.allocUnsafeSlow = function(t) {
  return $e(null, t);
};
function tr(t, e, r) {
  if ((typeof r != "string" || r === "") && (r = "utf8"), !a.isEncoding(r))
    throw new TypeError('"encoding" must be a valid string encoding');
  var n = pt(e, r) | 0;
  t = q(t, n);
  var i = t.write(e, r);
  return i !== n && (t = t.slice(0, i)), t;
}
function Be(t, e) {
  var r = e.length < 0 ? 0 : qe(e.length) | 0;
  t = q(t, r);
  for (var n = 0; n < r; n += 1)
    t[n] = e[n] & 255;
  return t;
}
function rr(t, e, r, n) {
  if (e.byteLength, r < 0 || e.byteLength < r)
    throw new RangeError("'offset' is out of bounds");
  if (e.byteLength < r + (n || 0))
    throw new RangeError("'length' is out of bounds");
  return r === void 0 && n === void 0 ? e = new Uint8Array(e) : n === void 0 ? e = new Uint8Array(e, r) : e = new Uint8Array(e, r, n), a.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = a.prototype) : t = Be(t, e), t;
}
function nr(t, e) {
  if (j(e)) {
    var r = qe(e.length) | 0;
    return t = q(t, r), t.length === 0 || e.copy(t, 0, 0, r), t;
  }
  if (e) {
    if (typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer || "length" in e)
      return typeof e.length != "number" || xr(e.length) ? q(t, 0) : Be(t, e);
    if (e.type === "Buffer" && ht(e.data))
      return Be(t, e.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function qe(t) {
  if (t >= _e())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + _e().toString(16) + " bytes");
  return t | 0;
}
a.isBuffer = L;
function j(t) {
  return !!(t != null && t._isBuffer);
}
a.compare = function(e, r) {
  if (!j(e) || !j(r))
    throw new TypeError("Arguments must be Buffers");
  if (e === r) return 0;
  for (var n = e.length, i = r.length, o = 0, s = Math.min(n, i); o < s; ++o)
    if (e[o] !== r[o]) {
      n = e[o], i = r[o];
      break;
    }
  return n < i ? -1 : i < n ? 1 : 0;
};
a.isEncoding = function(e) {
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
a.concat = function(e, r) {
  if (!ht(e))
    throw new TypeError('"list" argument must be an Array of Buffers');
  if (e.length === 0)
    return a.alloc(0);
  var n;
  if (r === void 0)
    for (r = 0, n = 0; n < e.length; ++n)
      r += e[n].length;
  var i = a.allocUnsafe(r), o = 0;
  for (n = 0; n < e.length; ++n) {
    var s = e[n];
    if (!j(s))
      throw new TypeError('"list" argument must be an Array of Buffers');
    s.copy(i, o), o += s.length;
  }
  return i;
};
function pt(t, e) {
  if (j(t))
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
        return bt(t).length;
      default:
        if (n) return we(t).length;
        e = ("" + e).toLowerCase(), n = !0;
    }
}
a.byteLength = pt;
function ir(t, e, r) {
  var n = !1;
  if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e))
    return "";
  for (t || (t = "utf8"); ; )
    switch (t) {
      case "hex":
        return pr(this, e, r);
      case "utf8":
      case "utf-8":
        return _t(this, e, r);
      case "ascii":
        return cr(this, e, r);
      case "latin1":
      case "binary":
        return dr(this, e, r);
      case "base64":
        return ur(this, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return mr(this, e, r);
      default:
        if (n) throw new TypeError("Unknown encoding: " + t);
        t = (t + "").toLowerCase(), n = !0;
    }
}
a.prototype._isBuffer = !0;
function K(t, e, r) {
  var n = t[e];
  t[e] = t[r], t[r] = n;
}
a.prototype.swap16 = function() {
  var e = this.length;
  if (e % 2 !== 0)
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  for (var r = 0; r < e; r += 2)
    K(this, r, r + 1);
  return this;
};
a.prototype.swap32 = function() {
  var e = this.length;
  if (e % 4 !== 0)
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (var r = 0; r < e; r += 4)
    K(this, r, r + 3), K(this, r + 1, r + 2);
  return this;
};
a.prototype.swap64 = function() {
  var e = this.length;
  if (e % 8 !== 0)
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  for (var r = 0; r < e; r += 8)
    K(this, r, r + 7), K(this, r + 1, r + 6), K(this, r + 2, r + 5), K(this, r + 3, r + 4);
  return this;
};
a.prototype.toString = function() {
  var e = this.length | 0;
  return e === 0 ? "" : arguments.length === 0 ? _t(this, 0, e) : ir.apply(this, arguments);
};
a.prototype.equals = function(e) {
  if (!j(e)) throw new TypeError("Argument must be a Buffer");
  return this === e ? !0 : a.compare(this, e) === 0;
};
a.prototype.inspect = function() {
  var e = "", r = Kt;
  return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">";
};
a.prototype.compare = function(e, r, n, i, o) {
  if (!j(e))
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
  for (var s = o - i, f = n - r, l = Math.min(s, f), u = this.slice(i, o), h = e.slice(r, n), c = 0; c < l; ++c)
    if (u[c] !== h[c]) {
      s = u[c], f = h[c];
      break;
    }
  return s < f ? -1 : f < s ? 1 : 0;
};
function mt(t, e, r, n, i) {
  if (t.length === 0) return -1;
  if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
    if (i) return -1;
    r = t.length - 1;
  } else if (r < 0)
    if (i) r = 0;
    else return -1;
  if (typeof e == "string" && (e = a.from(e, n)), j(e))
    return e.length === 0 ? -1 : Ge(t, e, r, n, i);
  if (typeof e == "number")
    return e = e & 255, a.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Ge(t, [e], r, n, i);
  throw new TypeError("val must be string, number or Buffer");
}
function Ge(t, e, r, n, i) {
  var o = 1, s = t.length, f = e.length;
  if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
    if (t.length < 2 || e.length < 2)
      return -1;
    o = 2, s /= 2, f /= 2, r /= 2;
  }
  function l(v, A) {
    return o === 1 ? v[A] : v.readUInt16BE(A * o);
  }
  var u;
  if (i) {
    var h = -1;
    for (u = r; u < s; u++)
      if (l(t, u) === l(e, h === -1 ? 0 : u - h)) {
        if (h === -1 && (h = u), u - h + 1 === f) return h * o;
      } else
        h !== -1 && (u -= u - h), h = -1;
  } else
    for (r + f > s && (r = s - f), u = r; u >= 0; u--) {
      for (var c = !0, g = 0; g < f; g++)
        if (l(t, u + g) !== l(e, g)) {
          c = !1;
          break;
        }
      if (c) return u;
    }
  return -1;
}
a.prototype.includes = function(e, r, n) {
  return this.indexOf(e, r, n) !== -1;
};
a.prototype.indexOf = function(e, r, n) {
  return mt(this, e, r, n, !0);
};
a.prototype.lastIndexOf = function(e, r, n) {
  return mt(this, e, r, n, !1);
};
function or(t, e, r, n) {
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
function sr(t, e, r, n) {
  return Ee(we(e, t.length - r), t, r, n);
}
function gt(t, e, r, n) {
  return Ee(vr(e), t, r, n);
}
function fr(t, e, r, n) {
  return gt(t, e, r, n);
}
function ar(t, e, r, n) {
  return Ee(bt(e), t, r, n);
}
function lr(t, e, r, n) {
  return Ee(br(e, t.length - r), t, r, n);
}
a.prototype.write = function(e, r, n, i) {
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
        return or(this, e, r, n);
      case "utf8":
      case "utf-8":
        return sr(this, e, r, n);
      case "ascii":
        return gt(this, e, r, n);
      case "latin1":
      case "binary":
        return fr(this, e, r, n);
      case "base64":
        return ar(this, e, r, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return lr(this, e, r, n);
      default:
        if (s) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), s = !0;
    }
};
a.prototype.toJSON = function() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function ur(t, e, r) {
  return e === 0 && r === t.length ? He(t) : He(t.slice(e, r));
}
function _t(t, e, r) {
  r = Math.min(t.length, r);
  for (var n = [], i = e; i < r; ) {
    var o = t[i], s = null, f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
    if (i + f <= r) {
      var l, u, h, c;
      switch (f) {
        case 1:
          o < 128 && (s = o);
          break;
        case 2:
          l = t[i + 1], (l & 192) === 128 && (c = (o & 31) << 6 | l & 63, c > 127 && (s = c));
          break;
        case 3:
          l = t[i + 1], u = t[i + 2], (l & 192) === 128 && (u & 192) === 128 && (c = (o & 15) << 12 | (l & 63) << 6 | u & 63, c > 2047 && (c < 55296 || c > 57343) && (s = c));
          break;
        case 4:
          l = t[i + 1], u = t[i + 2], h = t[i + 3], (l & 192) === 128 && (u & 192) === 128 && (h & 192) === 128 && (c = (o & 15) << 18 | (l & 63) << 12 | (u & 63) << 6 | h & 63, c > 65535 && c < 1114112 && (s = c));
      }
    }
    s === null ? (s = 65533, f = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), i += f;
  }
  return hr(n);
}
var Ze = 4096;
function hr(t) {
  var e = t.length;
  if (e <= Ze)
    return String.fromCharCode.apply(String, t);
  for (var r = "", n = 0; n < e; )
    r += String.fromCharCode.apply(
      String,
      t.slice(n, n += Ze)
    );
  return r;
}
function cr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i] & 127);
  return n;
}
function dr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i]);
  return n;
}
function pr(t, e, r) {
  var n = t.length;
  (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
  for (var i = "", o = e; o < r; ++o)
    i += yr(t[o]);
  return i;
}
function mr(t, e, r) {
  for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
    i += String.fromCharCode(n[o] + n[o + 1] * 256);
  return i;
}
a.prototype.slice = function(e, r) {
  var n = this.length;
  e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
  var i;
  if (a.TYPED_ARRAY_SUPPORT)
    i = this.subarray(e, r), i.__proto__ = a.prototype;
  else {
    var o = r - e;
    i = new a(o, void 0);
    for (var s = 0; s < o; ++s)
      i[s] = this[s + e];
  }
  return i;
};
function O(t, e, r) {
  if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
  if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
}
a.prototype.readUIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return i;
};
a.prototype.readUIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e + --r], o = 1; r > 0 && (o *= 256); )
    i += this[e + --r] * o;
  return i;
};
a.prototype.readUInt8 = function(e, r) {
  return r || O(e, 1, this.length), this[e];
};
a.prototype.readUInt16LE = function(e, r) {
  return r || O(e, 2, this.length), this[e] | this[e + 1] << 8;
};
a.prototype.readUInt16BE = function(e, r) {
  return r || O(e, 2, this.length), this[e] << 8 | this[e + 1];
};
a.prototype.readUInt32LE = function(e, r) {
  return r || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
};
a.prototype.readUInt32BE = function(e, r) {
  return r || O(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
a.prototype.readIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return o *= 128, i >= o && (i -= Math.pow(2, 8 * r)), i;
};
a.prototype.readIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = r, o = 1, s = this[e + --i]; i > 0 && (o *= 256); )
    s += this[e + --i] * o;
  return o *= 128, s >= o && (s -= Math.pow(2, 8 * r)), s;
};
a.prototype.readInt8 = function(e, r) {
  return r || O(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
};
a.prototype.readInt16LE = function(e, r) {
  r || O(e, 2, this.length);
  var n = this[e] | this[e + 1] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
a.prototype.readInt16BE = function(e, r) {
  r || O(e, 2, this.length);
  var n = this[e + 1] | this[e] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
a.prototype.readInt32LE = function(e, r) {
  return r || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
a.prototype.readInt32BE = function(e, r) {
  return r || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
a.prototype.readFloatLE = function(e, r) {
  return r || O(e, 4, this.length), ve(this, e, !0, 23, 4);
};
a.prototype.readFloatBE = function(e, r) {
  return r || O(e, 4, this.length), ve(this, e, !1, 23, 4);
};
a.prototype.readDoubleLE = function(e, r) {
  return r || O(e, 8, this.length), ve(this, e, !0, 52, 8);
};
a.prototype.readDoubleBE = function(e, r) {
  return r || O(e, 8, this.length), ve(this, e, !1, 52, 8);
};
function N(t, e, r, n, i, o) {
  if (!j(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
  if (r + n > t.length) throw new RangeError("Index out of range");
}
a.prototype.writeUIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = 1, f = 0;
  for (this[r] = e & 255; ++f < n && (s *= 256); )
    this[r + f] = e / s & 255;
  return r + n;
};
a.prototype.writeUIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = n - 1, f = 1;
  for (this[r + s] = e & 255; --s >= 0 && (f *= 256); )
    this[r + s] = e / f & 255;
  return r + n;
};
a.prototype.writeUInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[r] = e & 255, r + 1;
};
function be(t, e, r, n) {
  e < 0 && (e = 65535 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
    t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8;
}
a.prototype.writeUInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : be(this, e, r, !0), r + 2;
};
a.prototype.writeUInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : be(this, e, r, !1), r + 2;
};
function xe(t, e, r, n) {
  e < 0 && (e = 4294967295 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
    t[r + i] = e >>> (n ? i : 3 - i) * 8 & 255;
}
a.prototype.writeUInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255) : xe(this, e, r, !0), r + 4;
};
a.prototype.writeUInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : xe(this, e, r, !1), r + 4;
};
a.prototype.writeIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = 0, f = 1, l = 0;
  for (this[r] = e & 255; ++s < n && (f *= 256); )
    e < 0 && l === 0 && this[r + s - 1] !== 0 && (l = 1), this[r + s] = (e / f >> 0) - l & 255;
  return r + n;
};
a.prototype.writeIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = n - 1, f = 1, l = 0;
  for (this[r + s] = e & 255; --s >= 0 && (f *= 256); )
    e < 0 && l === 0 && this[r + s + 1] !== 0 && (l = 1), this[r + s] = (e / f >> 0) - l & 255;
  return r + n;
};
a.prototype.writeInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1;
};
a.prototype.writeInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : be(this, e, r, !0), r + 2;
};
a.prototype.writeInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : be(this, e, r, !1), r + 2;
};
a.prototype.writeInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24) : xe(this, e, r, !0), r + 4;
};
a.prototype.writeInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : xe(this, e, r, !1), r + 4;
};
function wt(t, e, r, n, i, o) {
  if (r + n > t.length) throw new RangeError("Index out of range");
  if (r < 0) throw new RangeError("Index out of range");
}
function yt(t, e, r, n, i) {
  return i || wt(t, e, r, 4), ut(t, e, r, n, 23, 4), r + 4;
}
a.prototype.writeFloatLE = function(e, r, n) {
  return yt(this, e, r, !0, n);
};
a.prototype.writeFloatBE = function(e, r, n) {
  return yt(this, e, r, !1, n);
};
function vt(t, e, r, n, i) {
  return i || wt(t, e, r, 8), ut(t, e, r, n, 52, 8), r + 8;
}
a.prototype.writeDoubleLE = function(e, r, n) {
  return vt(this, e, r, !0, n);
};
a.prototype.writeDoubleBE = function(e, r, n) {
  return vt(this, e, r, !1, n);
};
a.prototype.copy = function(e, r, n, i) {
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
  else if (o < 1e3 || !a.TYPED_ARRAY_SUPPORT)
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
a.prototype.fill = function(e, r, n, i) {
  if (typeof e == "string") {
    if (typeof r == "string" ? (i = r, r = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), e.length === 1) {
      var o = e.charCodeAt(0);
      o < 256 && (e = o);
    }
    if (i !== void 0 && typeof i != "string")
      throw new TypeError("encoding must be a string");
    if (typeof i == "string" && !a.isEncoding(i))
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
    var f = j(e) ? e : we(new a(e, i).toString()), l = f.length;
    for (s = 0; s < n - r; ++s)
      this[s + r] = f[s % l];
  }
  return this;
};
var gr = /[^+\/0-9A-Za-z-_]/g;
function _r(t) {
  if (t = wr(t).replace(gr, ""), t.length < 2) return "";
  for (; t.length % 4 !== 0; )
    t = t + "=";
  return t;
}
function wr(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function yr(t) {
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
function vr(t) {
  for (var e = [], r = 0; r < t.length; ++r)
    e.push(t.charCodeAt(r) & 255);
  return e;
}
function br(t, e) {
  for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
    r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
  return o;
}
function bt(t) {
  return Ht(_r(t));
}
function Ee(t, e, r, n) {
  for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
    e[i + r] = t[i];
  return i;
}
function xr(t) {
  return t !== t;
}
function L(t) {
  return t != null && (!!t._isBuffer || xt(t) || Er(t));
}
function xt(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function Er(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && xt(t.slice(0, 0));
}
var Oe;
function H() {
}
H.prototype = /* @__PURE__ */ Object.create(null);
function p() {
  p.init.call(this);
}
p.EventEmitter = p;
p.usingDomains = !1;
p.prototype.domain = void 0;
p.prototype._events = void 0;
p.prototype._maxListeners = void 0;
p.defaultMaxListeners = 10;
p.init = function() {
  this.domain = null, p.usingDomains && Oe.active && !(this instanceof Oe.Domain) && (this.domain = Oe.active), (!this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = new H(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
p.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || isNaN(e))
    throw new TypeError('"n" argument must be a positive number');
  return this._maxListeners = e, this;
};
function Et(t) {
  return t._maxListeners === void 0 ? p.defaultMaxListeners : t._maxListeners;
}
p.prototype.getMaxListeners = function() {
  return Et(this);
};
function Sr(t, e, r) {
  if (e)
    t.call(r);
  else
    for (var n = t.length, i = ae(t, n), o = 0; o < n; ++o)
      i[o].call(r);
}
function Rr(t, e, r, n) {
  if (e)
    t.call(r, n);
  else
    for (var i = t.length, o = ae(t, i), s = 0; s < i; ++s)
      o[s].call(r, n);
}
function Ir(t, e, r, n, i) {
  if (e)
    t.call(r, n, i);
  else
    for (var o = t.length, s = ae(t, o), f = 0; f < o; ++f)
      s[f].call(r, n, i);
}
function Or(t, e, r, n, i, o) {
  if (e)
    t.call(r, n, i, o);
  else
    for (var s = t.length, f = ae(t, s), l = 0; l < s; ++l)
      f[l].call(r, n, i, o);
}
function Cr(t, e, r, n) {
  if (e)
    t.apply(r, n);
  else
    for (var i = t.length, o = ae(t, i), s = 0; s < i; ++s)
      o[s].apply(r, n);
}
p.prototype.emit = function(e) {
  var r, n, i, o, s, f, l, u = e === "error";
  if (f = this._events, f)
    u = u && f.error == null;
  else if (!u)
    return !1;
  if (l = this.domain, u) {
    if (r = arguments[1], l)
      r || (r = new Error('Uncaught, unspecified "error" event')), r.domainEmitter = this, r.domain = l, r.domainThrown = !1, l.emit("error", r);
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
      Sr(n, c, this);
      break;
    case 2:
      Rr(n, c, this, arguments[1]);
      break;
    case 3:
      Ir(n, c, this, arguments[1], arguments[2]);
      break;
    case 4:
      Or(n, c, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      for (o = new Array(i - 1), s = 1; s < i; s++)
        o[s - 1] = arguments[s];
      Cr(n, c, this, o);
  }
  return !0;
};
function St(t, e, r, n) {
  var i, o, s;
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  if (o = t._events, o ? (o.newListener && (t.emit(
    "newListener",
    e,
    r.listener ? r.listener : r
  ), o = t._events), s = o[e]) : (o = t._events = new H(), t._eventsCount = 0), !s)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), !s.warned && (i = Et(t), i && i > 0 && s.length > i)) {
    s.warned = !0;
    var f = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + e + " listeners added. Use emitter.setMaxListeners() to increase limit");
    f.name = "MaxListenersExceededWarning", f.emitter = t, f.type = e, f.count = s.length, Ar(f);
  }
  return t;
}
function Ar(t) {
  typeof console.warn == "function" ? console.warn(t) : console.log(t);
}
p.prototype.addListener = function(e, r) {
  return St(this, e, r, !1);
};
p.prototype.on = p.prototype.addListener;
p.prototype.prependListener = function(e, r) {
  return St(this, e, r, !0);
};
function Rt(t, e, r) {
  var n = !1;
  function i() {
    t.removeListener(e, i), n || (n = !0, r.apply(t, arguments));
  }
  return i.listener = r, i;
}
p.prototype.once = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.on(e, Rt(this, e, r)), this;
};
p.prototype.prependOnceListener = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.prependListener(e, Rt(this, e, r)), this;
};
p.prototype.removeListener = function(e, r) {
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
      Tr(n, o);
    i.removeListener && this.emit("removeListener", e, f || r);
  }
  return this;
};
p.prototype.removeAllListeners = function(e) {
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
p.prototype.listeners = function(e) {
  var r, n, i = this._events;
  return i ? (r = i[e], r ? typeof r == "function" ? n = [r.listener || r] : n = Lr(r) : n = []) : n = [], n;
};
p.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : It.call(t, e);
};
p.prototype.listenerCount = It;
function It(t) {
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
p.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function Tr(t, e) {
  for (var r = e, n = r + 1, i = t.length; n < i; r += 1, n += 1)
    t[r] = t[n];
  t.pop();
}
function ae(t, e) {
  for (var r = new Array(e); e--; )
    r[e] = t[e];
  return r;
}
function Lr(t) {
  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
    e[r] = t[r].listener || t[r];
  return e;
}
function Ot() {
  throw new Error("setTimeout has not been defined");
}
function Ct() {
  throw new Error("clearTimeout has not been defined");
}
var Y = Ot, W = Ct;
typeof ie.setTimeout == "function" && (Y = setTimeout);
typeof ie.clearTimeout == "function" && (W = clearTimeout);
function At(t) {
  if (Y === setTimeout)
    return setTimeout(t, 0);
  if ((Y === Ot || !Y) && setTimeout)
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
function Nr(t) {
  if (W === clearTimeout)
    return clearTimeout(t);
  if ((W === Ct || !W) && clearTimeout)
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
var z = [], ne = !1, ee, me = -1;
function Dr() {
  !ne || !ee || (ne = !1, ee.length ? z = ee.concat(z) : me = -1, z.length && Tt());
}
function Tt() {
  if (!ne) {
    var t = At(Dr);
    ne = !0;
    for (var e = z.length; e; ) {
      for (ee = z, z = []; ++me < e; )
        ee && ee[me].run();
      me = -1, e = z.length;
    }
    ee = null, ne = !1, Nr(t);
  }
}
function B(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  z.push(new Lt(t, e)), z.length === 1 && !ne && At(Tt);
}
function Lt(t, e) {
  this.fun = t, this.array = e;
}
Lt.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var Fr = {}, se = ie.performance || {};
se.now || se.mozNow || se.msNow || se.oNow || se.webkitNow;
var ge = {
  env: Fr
}, Ue;
typeof Object.create == "function" ? Ue = function(e, r) {
  e.super_ = r, e.prototype = Object.create(r.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
} : Ue = function(e, r) {
  e.super_ = r;
  var n = function() {
  };
  n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
};
var oe = Ue, Mr = /%[sdj%]/g;
function Br(t) {
  if (!Ve(t)) {
    for (var e = [], r = 0; r < arguments.length; r++)
      e.push(G(arguments[r]));
    return e.join(" ");
  }
  for (var r = 1, n = arguments, i = n.length, o = String(t).replace(Mr, function(f) {
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
    ze(s) || !le(s) ? o += " " + s : o += " " + G(s);
  return o;
}
function Nt(t, e) {
  if (Q(ie.process))
    return function() {
      return Nt(t, e).apply(this, arguments);
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
var pe = {}, Ce;
function Ur(t) {
  if (Q(Ce) && (Ce = ge.env.NODE_DEBUG || ""), t = t.toUpperCase(), !pe[t])
    if (new RegExp("\\b" + t + "\\b", "i").test(Ce)) {
      var e = 0;
      pe[t] = function() {
        var r = Br.apply(null, arguments);
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
    stylize: Pr
  };
  return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), Dt(e) ? r.showHidden = e : e && Yr(r, e), Q(r.showHidden) && (r.showHidden = !1), Q(r.depth) && (r.depth = 2), Q(r.colors) && (r.colors = !1), Q(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = kr), ye(r, t, r.depth);
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
function kr(t, e) {
  var r = G.styles[e];
  return r ? "\x1B[" + G.colors[r][0] + "m" + t + "\x1B[" + G.colors[r][1] + "m" : t;
}
function Pr(t, e) {
  return t;
}
function jr(t) {
  var e = {};
  return t.forEach(function(r, n) {
    e[r] = !0;
  }), e;
}
function ye(t, e, r) {
  if (t.customInspect && e && Ne(e.inspect) && // Filter out the util module, it's inspect function is special
  e.inspect !== G && // Also filter out any prototype objects using the circular check.
  !(e.constructor && e.constructor.prototype === e)) {
    var n = e.inspect(r, t);
    return Ve(n) || (n = ye(t, n, r)), n;
  }
  var i = $r(t, e);
  if (i)
    return i;
  var o = Object.keys(e), s = jr(o);
  if (t.showHidden && (o = Object.getOwnPropertyNames(e)), Le(e) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
    return Ae(e);
  if (o.length === 0) {
    if (Ne(e)) {
      var f = e.name ? ": " + e.name : "";
      return t.stylize("[Function" + f + "]", "special");
    }
    if (Te(e))
      return t.stylize(RegExp.prototype.toString.call(e), "regexp");
    if (Xe(e))
      return t.stylize(Date.prototype.toString.call(e), "date");
    if (Le(e))
      return Ae(e);
  }
  var l = "", u = !1, h = ["{", "}"];
  if (Vr(e) && (u = !0, h = ["[", "]"]), Ne(e)) {
    var c = e.name ? ": " + e.name : "";
    l = " [Function" + c + "]";
  }
  if (Te(e) && (l = " " + RegExp.prototype.toString.call(e)), Xe(e) && (l = " " + Date.prototype.toUTCString.call(e)), Le(e) && (l = " " + Ae(e)), o.length === 0 && (!u || e.length == 0))
    return h[0] + l + h[1];
  if (r < 0)
    return Te(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
  t.seen.push(e);
  var g;
  return u ? g = qr(t, e, r, s, o) : g = o.map(function(v) {
    return ke(t, e, r, s, v, u);
  }), t.seen.pop(), zr(g, l, h);
}
function $r(t, e) {
  if (Q(e))
    return t.stylize("undefined", "undefined");
  if (Ve(e)) {
    var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return t.stylize(r, "string");
  }
  if (Jr(e))
    return t.stylize("" + e, "number");
  if (Dt(e))
    return t.stylize("" + e, "boolean");
  if (ze(e))
    return t.stylize("null", "null");
}
function Ae(t) {
  return "[" + Error.prototype.toString.call(t) + "]";
}
function qr(t, e, r, n, i) {
  for (var o = [], s = 0, f = e.length; s < f; ++s)
    Ft(e, String(s)) ? o.push(ke(
      t,
      e,
      r,
      n,
      String(s),
      !0
    )) : o.push("");
  return i.forEach(function(l) {
    l.match(/^\d+$/) || o.push(ke(
      t,
      e,
      r,
      n,
      l,
      !0
    ));
  }), o;
}
function ke(t, e, r, n, i, o) {
  var s, f, l;
  if (l = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }, l.get ? l.set ? f = t.stylize("[Getter/Setter]", "special") : f = t.stylize("[Getter]", "special") : l.set && (f = t.stylize("[Setter]", "special")), Ft(n, i) || (s = "[" + i + "]"), f || (t.seen.indexOf(l.value) < 0 ? (ze(r) ? f = ye(t, l.value, null) : f = ye(t, l.value, r - 1), f.indexOf(`
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
function zr(t, e, r) {
  var n = t.reduce(function(i, o) {
    return o.indexOf(`
`) >= 0, i + o.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return n > 60 ? r[0] + (e === "" ? "" : e + `
 `) + " " + t.join(`,
  `) + " " + r[1] : r[0] + e + " " + t.join(", ") + " " + r[1];
}
function Vr(t) {
  return Array.isArray(t);
}
function Dt(t) {
  return typeof t == "boolean";
}
function ze(t) {
  return t === null;
}
function Jr(t) {
  return typeof t == "number";
}
function Ve(t) {
  return typeof t == "string";
}
function Q(t) {
  return t === void 0;
}
function Te(t) {
  return le(t) && Je(t) === "[object RegExp]";
}
function le(t) {
  return typeof t == "object" && t !== null;
}
function Xe(t) {
  return le(t) && Je(t) === "[object Date]";
}
function Le(t) {
  return le(t) && (Je(t) === "[object Error]" || t instanceof Error);
}
function Ne(t) {
  return typeof t == "function";
}
function Je(t) {
  return Object.prototype.toString.call(t);
}
function Yr(t, e) {
  if (!e || !le(e)) return t;
  for (var r = Object.keys(e), n = r.length; n--; )
    t[r[n]] = e[r[n]];
  return t;
}
function Ft(t, e) {
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
  if (this.length === 0) return a.alloc(0);
  if (this.length === 1) return this.head.data;
  for (var e = a.allocUnsafe(t >>> 0), r = this.head, n = 0; r; )
    r.data.copy(e, n), n += r.data.length, r = r.next;
  return e;
};
var Wr = a.isEncoding || function(t) {
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
function Qr(t) {
  if (t && !Wr(t))
    throw new Error("Unknown encoding: " + t);
}
function ue(t) {
  switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), Qr(t), this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2, this.detectIncompleteChar = Gr;
      break;
    case "base64":
      this.surrogateSize = 3, this.detectIncompleteChar = Zr;
      break;
    default:
      this.write = Hr;
      return;
  }
  this.charBuffer = new a(6), this.charReceived = 0, this.charLength = 0;
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
function Hr(t) {
  return t.toString(this.encoding);
}
function Gr(t) {
  this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0;
}
function Zr(t) {
  this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0;
}
E.ReadableState = Mt;
var y = Ur("stream");
oe(E, p);
function Xr(t, e, r) {
  if (typeof t.prependListener == "function")
    return t.prependListener(e, r);
  !t._events || !t._events[e] ? t.on(e, r) : Array.isArray(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]];
}
function Kr(t, e) {
  return t.listeners(e).length;
}
function Mt(t, e) {
  t = t || {}, this.objectMode = !!t.objectMode, e instanceof M && (this.objectMode = this.objectMode || !!t.readableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.buffer = new te(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (this.decoder = new ue(t.encoding), this.encoding = t.encoding);
}
function E(t) {
  if (!(this instanceof E)) return new E(t);
  this._readableState = new Mt(t, this), this.readable = !0, t && typeof t.read == "function" && (this._read = t.read), p.call(this);
}
E.prototype.push = function(t, e) {
  var r = this._readableState;
  return !r.objectMode && typeof t == "string" && (e = e || r.defaultEncoding, e !== r.encoding && (t = a.from(t, e), e = "")), Bt(this, r, t, e, !1);
};
E.prototype.unshift = function(t) {
  var e = this._readableState;
  return Bt(this, e, t, "", !0);
};
E.prototype.isPaused = function() {
  return this._readableState.flowing === !1;
};
function Bt(t, e, r, n, i) {
  var o = rn(e, r);
  if (o)
    t.emit("error", o);
  else if (r === null)
    e.reading = !1, nn(t, e);
  else if (e.objectMode || r && r.length > 0)
    if (e.ended && !i) {
      var s = new Error("stream.push() after EOF");
      t.emit("error", s);
    } else if (e.endEmitted && i) {
      var f = new Error("stream.unshift() after end event");
      t.emit("error", f);
    } else {
      var l;
      e.decoder && !i && !n && (r = e.decoder.write(r), l = !e.objectMode && r.length === 0), i || (e.reading = !1), l || (e.flowing && e.length === 0 && !e.sync ? (t.emit("data", r), t.read(0)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && Se(t))), on(t, e);
    }
  else i || (e.reading = !1);
  return en(e);
}
function en(t) {
  return !t.ended && (t.needReadable || t.length < t.highWaterMark || t.length === 0);
}
E.prototype.setEncoding = function(t) {
  return this._readableState.decoder = new ue(t), this._readableState.encoding = t, this;
};
var Ke = 8388608;
function tn(t) {
  return t >= Ke ? t = Ke : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t;
}
function et(t, e) {
  return t <= 0 || e.length === 0 && e.ended ? 0 : e.objectMode ? 1 : t !== t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = tn(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0));
}
E.prototype.read = function(t) {
  y("read", t), t = parseInt(t, 10);
  var e = this._readableState, r = t;
  if (t !== 0 && (e.emittedReadable = !1), t === 0 && e.needReadable && (e.length >= e.highWaterMark || e.ended))
    return y("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? De(this) : Se(this), null;
  if (t = et(t, e), t === 0 && e.ended)
    return e.length === 0 && De(this), null;
  var n = e.needReadable;
  y("need readable", n), (e.length === 0 || e.length - t < e.highWaterMark) && (n = !0, y("length less than watermark", n)), e.ended || e.reading ? (n = !1, y("reading or ended", n)) : n && (y("do read"), e.reading = !0, e.sync = !0, e.length === 0 && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = et(r, e)));
  var i;
  return t > 0 ? i = Ut(t, e) : i = null, i === null ? (e.needReadable = !0, t = 0) : e.length -= t, e.length === 0 && (e.ended || (e.needReadable = !0), r !== t && e.ended && De(this)), i !== null && this.emit("data", i), i;
};
function rn(t, e) {
  var r = null;
  return !L(e) && typeof e != "string" && e !== null && e !== void 0 && !t.objectMode && (r = new TypeError("Invalid non-string/buffer chunk")), r;
}
function nn(t, e) {
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
  e.needReadable = !1, e.emittedReadable || (y("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? B(tt, t) : tt(t));
}
function tt(t) {
  y("emit readable"), t.emit("readable"), Ye(t);
}
function on(t, e) {
  e.readingMore || (e.readingMore = !0, B(sn, t, e));
}
function sn(t, e) {
  for (var r = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (y("maybeReadMore read 0"), t.read(0), r !== e.length); )
    r = e.length;
  e.readingMore = !1;
}
E.prototype._read = function(t) {
  this.emit("error", new Error("not implemented"));
};
E.prototype.pipe = function(t, e) {
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
  n.pipesCount += 1, y("pipe count=%d opts=%j", n.pipesCount, e);
  var i = !e || e.end !== !1, o = i ? f : h;
  n.endEmitted ? B(o) : r.once("end", o), t.on("unpipe", s);
  function s(S) {
    y("onunpipe"), S === r && h();
  }
  function f() {
    y("onend"), t.end();
  }
  var l = fn(r);
  t.on("drain", l);
  var u = !1;
  function h() {
    y("cleanup"), t.removeListener("close", A), t.removeListener("finish", x), t.removeListener("drain", l), t.removeListener("error", v), t.removeListener("unpipe", s), r.removeListener("end", f), r.removeListener("end", h), r.removeListener("data", g), u = !0, n.awaitDrain && (!t._writableState || t._writableState.needDrain) && l();
  }
  var c = !1;
  r.on("data", g);
  function g(S) {
    y("ondata"), c = !1;
    var b = t.write(S);
    b === !1 && !c && ((n.pipesCount === 1 && n.pipes === t || n.pipesCount > 1 && kt(n.pipes, t) !== -1) && !u && (y("false write response, pause", r._readableState.awaitDrain), r._readableState.awaitDrain++, c = !0), r.pause());
  }
  function v(S) {
    y("onerror", S), D(), t.removeListener("error", v), Kr(t, "error") === 0 && t.emit("error", S);
  }
  Xr(t, "error", v);
  function A() {
    t.removeListener("finish", x), D();
  }
  t.once("close", A);
  function x() {
    y("onfinish"), t.removeListener("close", A), D();
  }
  t.once("finish", x);
  function D() {
    y("unpipe"), r.unpipe(t);
  }
  return t.emit("pipe", r), n.flowing || (y("pipe resume"), r.resume()), t;
};
function fn(t) {
  return function() {
    var e = t._readableState;
    y("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, e.awaitDrain === 0 && t.listeners("data").length && (e.flowing = !0, Ye(t));
  };
}
E.prototype.unpipe = function(t) {
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
  var o = kt(e.pipes, t);
  return o === -1 ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, e.pipesCount === 1 && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this);
};
E.prototype.on = function(t, e) {
  var r = p.prototype.on.call(this, t, e);
  if (t === "data")
    this._readableState.flowing !== !1 && this.resume();
  else if (t === "readable") {
    var n = this._readableState;
    !n.endEmitted && !n.readableListening && (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && Se(this) : B(an, this));
  }
  return r;
};
E.prototype.addListener = E.prototype.on;
function an(t) {
  y("readable nexttick read 0"), t.read(0);
}
E.prototype.resume = function() {
  var t = this._readableState;
  return t.flowing || (y("resume"), t.flowing = !0, ln(this, t)), this;
};
function ln(t, e) {
  e.resumeScheduled || (e.resumeScheduled = !0, B(un, t, e));
}
function un(t, e) {
  e.reading || (y("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), Ye(t), e.flowing && !e.reading && t.read(0);
}
E.prototype.pause = function() {
  return y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (y("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
};
function Ye(t) {
  var e = t._readableState;
  for (y("flow", e.flowing); e.flowing && t.read() !== null; )
    ;
}
E.prototype.wrap = function(t) {
  var e = this._readableState, r = !1, n = this;
  t.on("end", function() {
    if (y("wrapped end"), e.decoder && !e.ended) {
      var s = e.decoder.end();
      s && s.length && n.push(s);
    }
    n.push(null);
  }), t.on("data", function(s) {
    if (y("wrapped data"), e.decoder && (s = e.decoder.write(s)), !(e.objectMode && s == null) && !(!e.objectMode && (!s || !s.length))) {
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
  return mn(o, function(s) {
    t.on(s, n.emit.bind(n, s));
  }), n._read = function(s) {
    y("wrapped _read", s), r && (r = !1, t.resume());
  }, n;
};
E._fromList = Ut;
function Ut(t, e) {
  if (e.length === 0) return null;
  var r;
  return e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (e.decoder ? r = e.buffer.join("") : e.buffer.length === 1 ? r = e.buffer.head.data : r = e.buffer.concat(e.length), e.buffer.clear()) : r = hn(t, e.buffer, e.decoder), r;
}
function hn(t, e, r) {
  var n;
  return t < e.head.data.length ? (n = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : t === e.head.data.length ? n = e.shift() : n = r ? cn(t, e) : dn(t, e), n;
}
function cn(t, e) {
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
function dn(t, e) {
  var r = a.allocUnsafe(t), n = e.head, i = 1;
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
function De(t) {
  var e = t._readableState;
  if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
  e.endEmitted || (e.ended = !0, B(pn, e, t));
}
function pn(t, e) {
  !t.endEmitted && t.length === 0 && (t.endEmitted = !0, e.readable = !1, e.emit("end"));
}
function mn(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    e(t[r], r);
}
function kt(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e) return r;
  return -1;
}
C.WritableState = We;
oe(C, p);
function gn() {
}
function _n(t, e, r) {
  this.chunk = t, this.encoding = e, this.callback = r, this.next = null;
}
function We(t, e) {
  Object.defineProperty(this, "buffer", {
    get: Nt(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  }), t = t || {}, this.objectMode = !!t.objectMode, e instanceof M && (this.objectMode = this.objectMode || !!t.writableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
  var i = t.decodeStrings === !1;
  this.decodeStrings = !i, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(o) {
    Sn(e, o);
  }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new qt(this);
}
We.prototype.getBuffer = function() {
  for (var e = this.bufferedRequest, r = []; e; )
    r.push(e), e = e.next;
  return r;
};
function C(t) {
  if (!(this instanceof C) && !(this instanceof M)) return new C(t);
  this._writableState = new We(t, this), this.writable = !0, t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev)), p.call(this);
}
C.prototype.pipe = function() {
  this.emit("error", new Error("Cannot pipe, not readable"));
};
function wn(t, e) {
  var r = new Error("write after end");
  t.emit("error", r), B(e, r);
}
function yn(t, e, r, n) {
  var i = !0, o = !1;
  return r === null ? o = new TypeError("May not write null values to stream") : !a.isBuffer(r) && typeof r != "string" && r !== void 0 && !e.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), B(n, o), i = !1), i;
}
C.prototype.write = function(t, e, r) {
  var n = this._writableState, i = !1;
  return typeof e == "function" && (r = e, e = null), a.isBuffer(t) ? e = "buffer" : e || (e = n.defaultEncoding), typeof r != "function" && (r = gn), n.ended ? wn(this, r) : yn(this, n, t, r) && (n.pendingcb++, i = bn(this, n, t, e, r)), i;
};
C.prototype.cork = function() {
  var t = this._writableState;
  t.corked++;
};
C.prototype.uncork = function() {
  var t = this._writableState;
  t.corked && (t.corked--, !t.writing && !t.corked && !t.finished && !t.bufferProcessing && t.bufferedRequest && Pt(this, t));
};
C.prototype.setDefaultEncoding = function(e) {
  if (typeof e == "string" && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
  return this._writableState.defaultEncoding = e, this;
};
function vn(t, e, r) {
  return !t.objectMode && t.decodeStrings !== !1 && typeof e == "string" && (e = a.from(e, r)), e;
}
function bn(t, e, r, n, i) {
  r = vn(e, r, n), a.isBuffer(r) && (n = "buffer");
  var o = e.objectMode ? 1 : r.length;
  e.length += o;
  var s = e.length < e.highWaterMark;
  if (s || (e.needDrain = !0), e.writing || e.corked) {
    var f = e.lastBufferedRequest;
    e.lastBufferedRequest = new _n(r, n, i), f ? f.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1;
  } else
    Pe(t, e, !1, o, r, n, i);
  return s;
}
function Pe(t, e, r, n, i, o, s) {
  e.writelen = n, e.writecb = s, e.writing = !0, e.sync = !0, r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1;
}
function xn(t, e, r, n, i) {
  --e.pendingcb, r ? B(i, n) : i(n), t._writableState.errorEmitted = !0, t.emit("error", n);
}
function En(t) {
  t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0;
}
function Sn(t, e) {
  var r = t._writableState, n = r.sync, i = r.writecb;
  if (En(r), e) xn(t, r, n, e, i);
  else {
    var o = jt(r);
    !o && !r.corked && !r.bufferProcessing && r.bufferedRequest && Pt(t, r), n ? B(rt, t, r, o, i) : rt(t, r, o, i);
  }
}
function rt(t, e, r, n) {
  r || Rn(t, e), e.pendingcb--, n(), $t(t, e);
}
function Rn(t, e) {
  e.length === 0 && e.needDrain && (e.needDrain = !1, t.emit("drain"));
}
function Pt(t, e) {
  e.bufferProcessing = !0;
  var r = e.bufferedRequest;
  if (t._writev && r && r.next) {
    var n = e.bufferedRequestCount, i = new Array(n), o = e.corkedRequestsFree;
    o.entry = r;
    for (var s = 0; r; )
      i[s] = r, r = r.next, s += 1;
    Pe(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new qt(e);
  } else {
    for (; r; ) {
      var f = r.chunk, l = r.encoding, u = r.callback, h = e.objectMode ? 1 : f.length;
      if (Pe(t, e, !1, h, f, l, u), r = r.next, e.writing)
        break;
    }
    r === null && (e.lastBufferedRequest = null);
  }
  e.bufferedRequestCount = 0, e.bufferedRequest = r, e.bufferProcessing = !1;
}
C.prototype._write = function(t, e, r) {
  r(new Error("not implemented"));
};
C.prototype._writev = null;
C.prototype.end = function(t, e, r) {
  var n = this._writableState;
  typeof t == "function" ? (r = t, t = null, e = null) : typeof e == "function" && (r = e, e = null), t != null && this.write(t, e), n.corked && (n.corked = 1, this.uncork()), !n.ending && !n.finished && In(this, n, r);
};
function jt(t) {
  return t.ending && t.length === 0 && t.bufferedRequest === null && !t.finished && !t.writing;
}
function nt(t, e) {
  e.prefinished || (e.prefinished = !0, t.emit("prefinish"));
}
function $t(t, e) {
  var r = jt(e);
  return r && (e.pendingcb === 0 ? (nt(t, e), e.finished = !0, t.emit("finish")) : nt(t, e)), r;
}
function In(t, e, r) {
  e.ending = !0, $t(t, e), r && (e.finished ? B(r) : t.once("finish", r)), e.ended = !0, t.writable = !1;
}
function qt(t) {
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
oe(M, E);
var it = Object.keys(C.prototype);
for (var Fe = 0; Fe < it.length; Fe++) {
  var Me = it[Fe];
  M.prototype[Me] || (M.prototype[Me] = C.prototype[Me]);
}
function M(t) {
  if (!(this instanceof M)) return new M(t);
  E.call(this, t), C.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", On);
}
function On() {
  this.allowHalfOpen || this._writableState.ended || B(Cn, this);
}
function Cn(t) {
  t.end();
}
oe(k, M);
function An(t) {
  this.afterTransform = function(e, r) {
    return Tn(t, e, r);
  }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
}
function Tn(t, e, r) {
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
  M.call(this, t), this._transformState = new An(this);
  var e = this;
  this._readableState.needReadable = !0, this._readableState.sync = !1, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.once("prefinish", function() {
    typeof this._flush == "function" ? this._flush(function(r) {
      ot(e, r);
    }) : ot(e);
  });
}
k.prototype.push = function(t, e) {
  return this._transformState.needTransform = !1, M.prototype.push.call(this, t, e);
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
function ot(t, e) {
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
oe(V, p);
V.Readable = E;
V.Writable = C;
V.Duplex = M;
V.Transform = k;
V.PassThrough = fe;
V.Stream = V;
function V() {
  p.call(this);
}
V.prototype.pipe = function(t, e) {
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
  function l(h) {
    if (u(), p.listenerCount(this, "error") === 0)
      throw h;
  }
  r.on("error", l), t.on("error", l);
  function u() {
    r.removeListener("data", n), t.removeListener("drain", i), r.removeListener("end", s), r.removeListener("close", f), r.removeListener("error", l), t.removeListener("error", l), r.removeListener("end", u), r.removeListener("close", u), t.removeListener("close", u);
  }
  return r.on("end", u), r.on("close", u), t.on("close", u), t.emit("pipe", r), t;
};
const zt = function(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
};
class m extends Error {
  constructor(e, r, n, ...i) {
    Array.isArray(r) && (r = r.join(" ").trim()), super(r), Error.captureStackTrace !== void 0 && Error.captureStackTrace(this, m), this.code = e;
    for (const o of i)
      for (const s in o) {
        const f = o[s];
        this[s] = L(f) ? f.toString(n.encoding) : f == null ? f : JSON.parse(JSON.stringify(f));
      }
  }
}
const Vt = function(t) {
  const e = [];
  for (let r = 0, n = t.length; r < n; r++) {
    const i = t[r];
    if (i == null || i === !1)
      e[r] = { disabled: !0 };
    else if (typeof i == "string")
      e[r] = { name: i };
    else if (zt(i)) {
      if (typeof i.name != "string")
        throw new m("CSV_OPTION_COLUMNS_MISSING_NAME", [
          "Option columns missing name:",
          `property "name" is required at position ${r}`,
          "when column is an object literal"
        ]);
      e[r] = i;
    } else
      throw new m("CSV_INVALID_COLUMN_DEFINITION", [
        "Invalid column definition:",
        "expect a string or a literal object,",
        `got ${JSON.stringify(i)} at position ${r}`
      ]);
  }
  return e;
};
class st {
  constructor(e = 100) {
    this.size = e, this.length = 0, this.buf = a.allocUnsafe(e);
  }
  prepend(e) {
    if (L(e)) {
      const r = this.length + e.length;
      if (r >= this.size && (this.resize(), r >= this.size))
        throw Error("INVALID_BUFFER_STATE");
      const n = this.buf;
      this.buf = a.allocUnsafe(this.size), e.copy(this.buf, 0), n.copy(this.buf, e.length), this.length += e.length;
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
    return a.from(this.buf.slice(0, this.length));
  }
  resize() {
    const e = this.length;
    this.size = this.size * 2;
    const r = a.allocUnsafe(this.size);
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
const Ln = 12, Nn = 13, Dn = 10, Fn = 32, Mn = 9, Bn = function(t) {
  return {
    bomSkipped: !1,
    bufBytesStart: 0,
    castField: t.cast_function,
    commenting: !1,
    // Current error encountered by a record
    error: void 0,
    enabled: t.from_line === 1,
    escaping: !1,
    escapeIsQuote: L(t.escape) && L(t.quote) && a.compare(t.escape, t.quote) === 0,
    // columns can be `false`, `true`, `Array`
    expectedRecordLength: Array.isArray(t.columns) ? t.columns.length : void 0,
    field: new st(20),
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
    rawBuffer: new st(100),
    record: [],
    recordHasError: !1,
    record_length: 0,
    recordDelimiterMaxLength: t.record_delimiter.length === 0 ? 0 : Math.max(...t.record_delimiter.map((e) => e.length)),
    trimChars: [
      a.from(" ", t.encoding)[0],
      a.from("	", t.encoding)[0]
    ],
    wasQuoting: !1,
    wasRowDelimiter: !1,
    timchars: [
      a.from(a.from([Nn], "utf8").toString(), t.encoding),
      a.from(a.from([Dn], "utf8").toString(), t.encoding),
      a.from(a.from([Ln], "utf8").toString(), t.encoding),
      a.from(a.from([Fn], "utf8").toString(), t.encoding),
      a.from(a.from([Mn], "utf8").toString(), t.encoding)
    ]
  };
}, Un = function(t) {
  return t.replace(/([A-Z])/g, function(e, r) {
    return "_" + r.toLowerCase();
  });
}, ft = function(t) {
  const e = {};
  for (const n in t)
    e[Un(n)] = t[n];
  if (e.encoding === void 0 || e.encoding === !0)
    e.encoding = "utf8";
  else if (e.encoding === null || e.encoding === !1)
    e.encoding = null;
  else if (typeof e.encoding != "string" && e.encoding !== null)
    throw new m(
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
    throw new m(
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
    throw new m(
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
    throw new m(
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
    e.columns = Vt(e.columns);
  else if (e.columns === void 0 || e.columns === null || e.columns === !1)
    e.columns = !1;
  else
    throw new m(
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
      throw new m(
        "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
        [
          "Invalid option group_columns_by_name:",
          "expect an boolean,",
          `got ${JSON.stringify(e.group_columns_by_name)}`
        ],
        e
      );
    if (e.columns === !1)
      throw new m(
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
  else if (typeof e.comment == "string" && (e.comment = a.from(e.comment, e.encoding)), !L(e.comment))
    throw new m(
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
    throw new m(
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
    throw new m(
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
      return a.from(",", e.encoding);
    if (typeof n == "string" && (n = a.from(n, e.encoding)), !L(n) || n.length === 0)
      throw new m(
        "CSV_INVALID_OPTION_DELIMITER",
        [
          "Invalid option delimiter:",
          "delimiter must be a non empty string or buffer or array of string|buffer,",
          `got ${r}`
        ],
        e
      );
    return n;
  }), e.escape === void 0 || e.escape === !0 ? e.escape = a.from('"', e.encoding) : typeof e.escape == "string" ? e.escape = a.from(e.escape, e.encoding) : (e.escape === null || e.escape === !1) && (e.escape = null), e.escape !== null && !L(e.escape))
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
    throw new m(
      "CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS",
      [
        "Invalid option `ignore_last_delimiters`:",
        "the value must be a boolean value or an integer,",
        `got ${JSON.stringify(e.ignore_last_delimiters)}`
      ],
      e
    );
  if (e.ignore_last_delimiters === !0 && e.columns === !1)
    throw new m(
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
  else if (L(e.objname)) {
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
    throw new m(
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
  else if (e.quote === void 0 || e.quote === !0 ? e.quote = a.from('"', e.encoding) : typeof e.quote == "string" && (e.quote = a.from(e.quote, e.encoding)), !L(e.quote))
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
  else if (typeof e.record_delimiter == "string" || L(e.record_delimiter)) {
    if (e.record_delimiter.length === 0)
      throw new m(
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
    throw new m(
      "CSV_INVALID_OPTION_RECORD_DELIMITER",
      [
        "Invalid option `record_delimiter`:",
        "value must be a string, a buffer or array of string|buffer,",
        `got ${JSON.stringify(e.record_delimiter)}`
      ],
      e
    );
  if (e.record_delimiter = e.record_delimiter.map(function(n, i) {
    if (typeof n != "string" && !L(n))
      throw new m(
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
      throw new m(
        "CSV_INVALID_OPTION_RECORD_DELIMITER",
        [
          "Invalid option `record_delimiter`:",
          "value must be a non empty string or buffer",
          `at index ${i},`,
          `got ${JSON.stringify(n)}`
        ],
        e
      );
    return typeof n == "string" && (n = a.from(n, e.encoding)), n;
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
}, at = function(t) {
  return t.every(
    (e) => e == null || e.toString && e.toString().trim() === ""
  );
}, kn = 13, Pn = 10, re = {
  // Note, the following are equals:
  // Buffer.from("\ufeff")
  // Buffer.from([239, 187, 191])
  // Buffer.from('EFBBBF', 'hex')
  utf8: a.from([239, 187, 191]),
  // Note, the following are equals:
  // Buffer.from "\ufeff", 'utf16le
  // Buffer.from([255, 254])
  utf16le: a.from([255, 254])
}, jn = function(t = {}) {
  const e = {
    bytes: 0,
    comment_lines: 0,
    empty_lines: 0,
    invalid_field_length: 0,
    lines: 1,
    records: 0
  }, r = ft(t);
  return {
    info: e,
    original_options: t,
    options: r,
    state: Bn(r),
    __needMoreData: function(n, i, o) {
      if (o) return !1;
      const { encoding: s, escape: f, quote: l } = this.options, { quoting: u, needMoreDataSize: h, recordDelimiterMaxLength: c } = this.state, g = i - n - 1, v = Math.max(
        h,
        // Skip if the remaining buffer smaller than record delimiter
        // If "record_delimiter" is yet to be discovered:
        // 1. It is equals to `[]` and "recordDelimiterMaxLength" equals `0`
        // 2. We set the length to windows line ending in the current encoding
        // Note, that encoding is known from user or bom discovery at that point
        // recordDelimiterMaxLength,
        c === 0 ? a.from(`\r
`, s).length : c,
        // Skip if remaining buffer can be an escaped quote
        u ? (f === null ? 0 : f.length) + l.length : 0,
        // Skip if remaining buffer can be record delimiter following the closing quote
        u ? l.length + c : 0
      );
      return g < v;
    },
    // Central parser implementation
    parse: function(n, i, o, s) {
      const {
        bom: f,
        comment_no_infix: l,
        encoding: u,
        from_line: h,
        ltrim: c,
        max_record_size: g,
        raw: v,
        relax_quotes: A,
        rtrim: x,
        skip_empty_lines: D,
        to: S,
        to_line: b
      } = this.options;
      let { comment: _, escape: T, quote: U, record_delimiter: Re } = this.options;
      const { bomSkipped: Jt, previousBuf: he, rawBuffer: Yt, escapeIsQuote: Wt } = this.state;
      let w;
      if (he === void 0)
        if (n === void 0) {
          s();
          return;
        } else
          w = n;
      else he !== void 0 && n === void 0 ? w = he : w = a.concat([he, n]);
      if (Jt === !1)
        if (f === !1)
          this.state.bomSkipped = !0;
        else if (w.length < 3) {
          if (i === !1) {
            this.state.previousBuf = w;
            return;
          }
        } else {
          for (const R in re)
            if (re[R].compare(w, 0, re[R].length) === 0) {
              const J = re[R].length;
              this.state.bufBytesStart += J, w = w.slice(J);
              const ce = ft({
                ...this.original_options,
                encoding: R
              });
              for (const I in ce)
                this.options[I] = ce[I];
              ({ comment: _, escape: T, quote: U } = this.options);
              break;
            }
          this.state.bomSkipped = !0;
        }
      const Ie = w.length;
      let d;
      for (d = 0; d < Ie && !this.__needMoreData(d, Ie, i); d++) {
        if (this.state.wasRowDelimiter === !0 && (this.info.lines++, this.state.wasRowDelimiter = !1), b !== -1 && this.info.lines > b) {
          this.state.stop = !0, s();
          return;
        }
        this.state.quoting === !1 && Re.length === 0 && this.__autoDiscoverRecordDelimiter(
          w,
          d
        ) && (Re = this.options.record_delimiter);
        const R = w[d];
        if (v === !0 && Yt.append(R), (R === kn || R === Pn) && this.state.wasRowDelimiter === !1 && (this.state.wasRowDelimiter = !0), this.state.escaping === !0)
          this.state.escaping = !1;
        else {
          if (T !== null && this.state.quoting === !0 && this.__isEscape(w, d, R) && d + T.length < Ie)
            if (Wt) {
              if (this.__isQuote(w, d + T.length)) {
                this.state.escaping = !0, d += T.length - 1;
                continue;
              }
            } else {
              this.state.escaping = !0, d += T.length - 1;
              continue;
            }
          if (this.state.commenting === !1 && this.__isQuote(w, d))
            if (this.state.quoting === !0) {
              const I = w[d + U.length], Z = x && this.__isCharTrimable(w, d + U.length), $ = _ !== null && this.__compareBytes(_, w, d + U.length, I), X = this.__isDelimiter(
                w,
                d + U.length,
                I
              ), de = Re.length === 0 ? this.__autoDiscoverRecordDelimiter(w, d + U.length) : this.__isRecordDelimiter(I, w, d + U.length);
              if (T !== null && this.__isEscape(w, d, R) && this.__isQuote(w, d + T.length))
                d += T.length - 1;
              else if (!I || X || de || $ || Z) {
                this.state.quoting = !1, this.state.wasQuoting = !0, d += U.length - 1;
                continue;
              } else if (A === !1) {
                const Qe = this.__error(
                  new m(
                    "CSV_INVALID_CLOSING_QUOTE",
                    [
                      "Invalid Closing Quote:",
                      `got "${String.fromCharCode(I)}"`,
                      `at line ${this.info.lines}`,
                      "instead of delimiter, record delimiter, trimable character",
                      "(if activated) or comment"
                    ],
                    this.options,
                    this.__infoField()
                  )
                );
                if (Qe !== void 0) return Qe;
              } else
                this.state.quoting = !1, this.state.wasQuoting = !0, this.state.field.prepend(U), d += U.length - 1;
            } else if (this.state.field.length !== 0) {
              if (A === !1) {
                const I = this.__infoField(), Z = Object.keys(re).map(
                  (X) => re[X].equals(this.state.field.toString()) ? X : !1
                ).filter(Boolean)[0], $ = this.__error(
                  new m(
                    "INVALID_OPENING_QUOTE",
                    [
                      "Invalid Opening Quote:",
                      `a quote is found on field ${JSON.stringify(I.column)} at line ${I.lines}, value is ${JSON.stringify(this.state.field.toString(u))}`,
                      Z ? `(${Z} bom)` : void 0
                    ],
                    this.options,
                    I,
                    {
                      field: this.state.field
                    }
                  )
                );
                if ($ !== void 0) return $;
              }
            } else {
              this.state.quoting = !0, d += U.length - 1;
              continue;
            }
          if (this.state.quoting === !1) {
            const I = this.__isRecordDelimiter(
              R,
              w,
              d
            );
            if (I !== 0) {
              if (this.state.commenting && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0)
                this.info.comment_lines++;
              else {
                if (this.state.enabled === !1 && this.info.lines + (this.state.wasRowDelimiter === !0 ? 1 : 0) >= h) {
                  this.state.enabled = !0, this.__resetField(), this.__resetRecord(), d += I - 1;
                  continue;
                }
                if (D === !0 && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0) {
                  this.info.empty_lines++, d += I - 1;
                  continue;
                }
                this.info.bytes = this.state.bufBytesStart + d;
                const X = this.__onField();
                if (X !== void 0) return X;
                this.info.bytes = this.state.bufBytesStart + d + I;
                const de = this.__onRecord(o);
                if (de !== void 0) return de;
                if (S !== -1 && this.info.records >= S) {
                  this.state.stop = !0, s();
                  return;
                }
              }
              this.state.commenting = !1, d += I - 1;
              continue;
            }
            if (this.state.commenting)
              continue;
            if (_ !== null && (l === !1 || this.state.record.length === 0 && this.state.field.length === 0) && this.__compareBytes(_, w, d, R) !== 0) {
              this.state.commenting = !0;
              continue;
            }
            const Z = this.__isDelimiter(w, d, R);
            if (Z !== 0) {
              this.info.bytes = this.state.bufBytesStart + d;
              const $ = this.__onField();
              if ($ !== void 0) return $;
              d += Z - 1;
              continue;
            }
          }
        }
        if (this.state.commenting === !1 && g !== 0 && this.state.record_length + this.state.field.length > g)
          return this.__error(
            new m(
              "CSV_MAX_RECORD_SIZE",
              [
                "Max Record Size:",
                "record exceed the maximum number of tolerated bytes",
                `of ${g}`,
                `at line ${this.info.lines}`
              ],
              this.options,
              this.__infoField()
            )
          );
        const J = c === !1 || this.state.quoting === !0 || this.state.field.length !== 0 || !this.__isCharTrimable(w, d), ce = x === !1 || this.state.wasQuoting === !1;
        if (J === !0 && ce === !0)
          this.state.field.append(R);
        else {
          if (x === !0 && !this.__isCharTrimable(w, d))
            return this.__error(
              new m(
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
          J === !1 && (d += this.__isCharTrimable(w, d) - 1);
          continue;
        }
      }
      if (i === !0)
        if (this.state.quoting === !0) {
          const R = this.__error(
            new m(
              "CSV_QUOTE_NOT_CLOSED",
              [
                "Quote Not Closed:",
                `the parsing is finished with an opening quote at line ${this.info.lines}`
              ],
              this.options,
              this.__infoField()
            )
          );
          if (R !== void 0) return R;
        } else if (this.state.wasQuoting === !0 || this.state.record.length !== 0 || this.state.field.length !== 0) {
          this.info.bytes = this.state.bufBytesStart + d;
          const R = this.__onField();
          if (R !== void 0) return R;
          const J = this.__onRecord(o);
          if (J !== void 0) return J;
        } else this.state.wasRowDelimiter === !0 ? this.info.empty_lines++ : this.state.commenting === !0 && this.info.comment_lines++;
      else
        this.state.bufBytesStart += d, this.state.previousBuf = w.slice(d);
      this.state.wasRowDelimiter === !0 && (this.info.lines++, this.state.wasRowDelimiter = !1);
    },
    __onRecord: function(n) {
      const {
        columns: i,
        group_columns_by_name: o,
        encoding: s,
        info: f,
        from: l,
        relax_column_count: u,
        relax_column_count_less: h,
        relax_column_count_more: c,
        raw: g,
        skip_records_with_empty_values: v
      } = this.options, { enabled: A, record: x } = this.state;
      if (A === !1)
        return this.__resetRecord();
      const D = x.length;
      if (i === !0) {
        if (v === !0 && at(x)) {
          this.__resetRecord();
          return;
        }
        return this.__firstLineToColumns(x);
      }
      if (i === !1 && this.info.records === 0 && (this.state.expectedRecordLength = D), D !== this.state.expectedRecordLength) {
        const S = i === !1 ? new m(
          "CSV_RECORD_INCONSISTENT_FIELDS_LENGTH",
          [
            "Invalid Record Length:",
            `expect ${this.state.expectedRecordLength},`,
            `got ${D} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: x
          }
        ) : new m(
          "CSV_RECORD_INCONSISTENT_COLUMNS",
          [
            "Invalid Record Length:",
            `columns length is ${i.length},`,
            // rename columns
            `got ${D} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: x
          }
        );
        if (u === !0 || h === !0 && D < this.state.expectedRecordLength || c === !0 && D > this.state.expectedRecordLength)
          this.info.invalid_field_length++, this.state.error = S;
        else {
          const b = this.__error(S);
          if (b) return b;
        }
      }
      if (v === !0 && at(x)) {
        this.__resetRecord();
        return;
      }
      if (this.state.recordHasError === !0) {
        this.__resetRecord(), this.state.recordHasError = !1;
        return;
      }
      if (this.info.records++, l === 1 || this.info.records >= l) {
        const { objname: S } = this.options;
        if (i !== !1) {
          const b = {};
          for (let _ = 0, T = x.length; _ < T; _++)
            i[_] === void 0 || i[_].disabled || (o === !0 && b[i[_].name] !== void 0 ? Array.isArray(b[i[_].name]) ? b[i[_].name] = b[i[_].name].concat(x[_]) : b[i[_].name] = [b[i[_].name], x[_]] : b[i[_].name] = x[_]);
          if (g === !0 || f === !0) {
            const _ = Object.assign(
              { record: b },
              g === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
              f === !0 ? { info: this.__infoRecord() } : {}
            ), T = this.__push(
              S === void 0 ? _ : [b[S], _],
              n
            );
            if (T)
              return T;
          } else {
            const _ = this.__push(
              S === void 0 ? b : [b[S], b],
              n
            );
            if (_)
              return _;
          }
        } else if (g === !0 || f === !0) {
          const b = Object.assign(
            { record: x },
            g === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
            f === !0 ? { info: this.__infoRecord() } : {}
          ), _ = this.__push(
            S === void 0 ? b : [x[S], b],
            n
          );
          if (_)
            return _;
        } else {
          const b = this.__push(
            S === void 0 ? x : [x[S], x],
            n
          );
          if (b)
            return b;
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
            new m(
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
        const s = Vt(o);
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
      const { cast: n, encoding: i, rtrim: o, max_record_size: s } = this.options, { enabled: f, wasQuoting: l } = this.state;
      if (f === !1)
        return this.__resetField();
      let u = this.state.field.toString(i);
      if (o === !0 && l === !1 && (u = u.trimRight()), n === !0) {
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
        const { timchars: l } = this.state;
        e: for (let u = 0; u < l.length; u++) {
          const h = l[u];
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
      for (let l = 1; l < f; l++)
        if (n[l] !== i[o + l]) return 0;
      return f;
    },
    __isDelimiter: function(n, i, o) {
      const { delimiter: s, ignore_last_delimiters: f } = this.options;
      if (f === !0 && this.state.record.length === this.options.columns.length - 1)
        return 0;
      if (f !== !1 && typeof f == "number" && this.state.record.length === f - 1)
        return 0;
      e: for (let l = 0; l < s.length; l++) {
        const u = s[l];
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
      e: for (let l = 0; l < f; l++) {
        const u = s[l], h = u.length;
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
        for (let l = 0; l < f; l++)
          if (s[l] !== n[i + l])
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
        a.from(`\r
`, o),
        a.from(`
`, o),
        a.from("\r", o)
      ];
      e: for (let f = 0; f < s.length; f++) {
        const l = s[f].length;
        for (let u = 0; u < l; u++)
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
          } catch (l) {
            return l;
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
class $n extends k {
  constructor(e = {}) {
    super({ readableObjectMode: !0, ...e, encoding: null }), this.api = jn({
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
const qn = function() {
  let t, e, r;
  for (const i in arguments) {
    const o = arguments[i], s = typeof o;
    if (t === void 0 && (typeof o == "string" || L(o)))
      t = o;
    else if (e === void 0 && zt(o))
      e = o;
    else if (r === void 0 && s === "function")
      r = o;
    else
      throw new m(
        "CSV_INVALID_ARGUMENT",
        ["Invalid argument:", `got ${JSON.stringify(o)} at index ${i}`],
        e || {}
      );
  }
  const n = new $n(e);
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
class zn {
  /** Operations - Build parser. */
  buildParser(e) {
    const r = void 0;
    return console.log(r), qn(e);
  }
}
export {
  zn as Tool
};
