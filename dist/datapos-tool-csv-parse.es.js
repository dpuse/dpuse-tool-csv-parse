var ae = typeof global < "u" ? global : typeof self < "u" ? self : typeof window < "u" ? window : {}, $ = [], M = [], sr = typeof Uint8Array < "u" ? Uint8Array : Array, Ye = !1;
function _t() {
  Ye = !0;
  for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0, r = t.length; e < r; ++e)
    $[e] = t[e], M[t.charCodeAt(e)] = e;
  M[45] = 62, M[95] = 63;
}
function ar(t) {
  Ye || _t();
  var e, r, n, i, o, s, a = t.length;
  if (a % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  o = t[a - 2] === "=" ? 2 : t[a - 1] === "=" ? 1 : 0, s = new sr(a * 3 / 4 - o), n = o > 0 ? a - 4 : a;
  var l = 0;
  for (e = 0, r = 0; e < n; e += 4, r += 3)
    i = M[t.charCodeAt(e)] << 18 | M[t.charCodeAt(e + 1)] << 12 | M[t.charCodeAt(e + 2)] << 6 | M[t.charCodeAt(e + 3)], s[l++] = i >> 16 & 255, s[l++] = i >> 8 & 255, s[l++] = i & 255;
  return o === 2 ? (i = M[t.charCodeAt(e)] << 2 | M[t.charCodeAt(e + 1)] >> 4, s[l++] = i & 255) : o === 1 && (i = M[t.charCodeAt(e)] << 10 | M[t.charCodeAt(e + 1)] << 4 | M[t.charCodeAt(e + 2)] >> 2, s[l++] = i >> 8 & 255, s[l++] = i & 255), s;
}
function fr(t) {
  return $[t >> 18 & 63] + $[t >> 12 & 63] + $[t >> 6 & 63] + $[t & 63];
}
function lr(t, e, r) {
  for (var n, i = [], o = e; o < r; o += 3)
    n = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2], i.push(fr(n));
  return i.join("");
}
function tt(t) {
  Ye || _t();
  for (var e, r = t.length, n = r % 3, i = "", o = [], s = 16383, a = 0, l = r - n; a < l; a += s)
    o.push(lr(t, a, a + s > l ? l : a + s));
  return n === 1 ? (e = t[r - 1], i += $[e >> 2], i += $[e << 4 & 63], i += "==") : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], i += $[e >> 10], i += $[e >> 4 & 63], i += $[e << 2 & 63], i += "="), o.push(i), o.join("");
}
function Se(t, e, r, n, i) {
  var o, s, a = i * 8 - n - 1, l = (1 << a) - 1, u = l >> 1, c = -7, h = r ? i - 1 : 0, m = r ? -1 : 1, b = t[e + h];
  for (h += m, o = b & (1 << -c) - 1, b >>= -c, c += a; c > 0; o = o * 256 + t[e + h], h += m, c -= 8)
    ;
  for (s = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; s = s * 256 + t[e + h], h += m, c -= 8)
    ;
  if (o === 0)
    o = 1 - u;
  else {
    if (o === l)
      return s ? NaN : (b ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, n), o = o - u;
  }
  return (b ? -1 : 1) * s * Math.pow(2, o - n);
}
function wt(t, e, r, n, i, o) {
  var s, a, l, u = o * 8 - i - 1, c = (1 << u) - 1, h = c >> 1, m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, b = n ? 0 : o - 1, T = n ? 1 : -1, x = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), s + h >= 1 ? e += m / l : e += m * Math.pow(2, 1 - h), e * l >= 2 && (s++, l /= 2), s + h >= c ? (a = 0, s = c) : s + h >= 1 ? (a = (e * l - 1) * Math.pow(2, i), s = s + h) : (a = e * Math.pow(2, h - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + b] = a & 255, b += T, a /= 256, i -= 8)
    ;
  for (s = s << i | a, u += i; u > 0; t[r + b] = s & 255, b += T, s /= 256, u -= 8)
    ;
  t[r + b - T] |= x * 128;
}
var ur = {}.toString, yt = Array.isArray || function(t) {
  return ur.call(t) == "[object Array]";
}, cr = 50;
f.TYPED_ARRAY_SUPPORT = ae.TYPED_ARRAY_SUPPORT !== void 0 ? ae.TYPED_ARRAY_SUPPORT : !0;
ve();
function ve() {
  return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function J(t, e) {
  if (ve() < e)
    throw new RangeError("Invalid typed array length");
  return f.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = f.prototype) : (t === null && (t = new f(e)), t.length = e), t;
}
function f(t, e, r) {
  if (!f.TYPED_ARRAY_SUPPORT && !(this instanceof f))
    return new f(t, e, r);
  if (typeof t == "number") {
    if (typeof e == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return We(this, t);
  }
  return bt(this, t, e, r);
}
f.poolSize = 8192;
f._augment = function(t) {
  return t.__proto__ = f.prototype, t;
};
function bt(t, e, r, n) {
  if (typeof e == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer ? pr(t, e, r, n) : typeof e == "string" ? dr(t, e, r) : gr(t, e);
}
f.from = function(t, e, r) {
  return bt(null, t, e, r);
};
f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && f[Symbol.species]);
function vt(t) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be a number');
  if (t < 0)
    throw new RangeError('"size" argument must not be negative');
}
function hr(t, e, r, n) {
  return vt(e), e <= 0 ? J(t, e) : r !== void 0 ? typeof n == "string" ? J(t, e).fill(r, n) : J(t, e).fill(r) : J(t, e);
}
f.alloc = function(t, e, r) {
  return hr(null, t, e, r);
};
function We(t, e) {
  if (vt(e), t = J(t, e < 0 ? 0 : He(e) | 0), !f.TYPED_ARRAY_SUPPORT)
    for (var r = 0; r < e; ++r)
      t[r] = 0;
  return t;
}
f.allocUnsafe = function(t) {
  return We(null, t);
};
f.allocUnsafeSlow = function(t) {
  return We(null, t);
};
function dr(t, e, r) {
  if ((typeof r != "string" || r === "") && (r = "utf8"), !f.isEncoding(r))
    throw new TypeError('"encoding" must be a valid string encoding');
  var n = xt(e, r) | 0;
  t = J(t, n);
  var i = t.write(e, r);
  return i !== n && (t = t.slice(0, i)), t;
}
function je(t, e) {
  var r = e.length < 0 ? 0 : He(e.length) | 0;
  t = J(t, r);
  for (var n = 0; n < r; n += 1)
    t[n] = e[n] & 255;
  return t;
}
function pr(t, e, r, n) {
  if (e.byteLength, r < 0 || e.byteLength < r)
    throw new RangeError("'offset' is out of bounds");
  if (e.byteLength < r + (n || 0))
    throw new RangeError("'length' is out of bounds");
  return r === void 0 && n === void 0 ? e = new Uint8Array(e) : n === void 0 ? e = new Uint8Array(e, r) : e = new Uint8Array(e, r, n), f.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = f.prototype) : t = je(t, e), t;
}
function gr(t, e) {
  if (j(e)) {
    var r = He(e.length) | 0;
    return t = J(t, r), t.length === 0 || e.copy(t, 0, 0, r), t;
  }
  if (e) {
    if (typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer || "length" in e)
      return typeof e.length != "number" || Fr(e.length) ? J(t, 0) : je(t, e);
    if (e.type === "Buffer" && yt(e.data))
      return je(t, e.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function He(t) {
  if (t >= ve())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ve().toString(16) + " bytes");
  return t | 0;
}
f.isBuffer = D;
function j(t) {
  return !!(t != null && t._isBuffer);
}
f.compare = function(e, r) {
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
f.isEncoding = function(e) {
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
f.concat = function(e, r) {
  if (!yt(e))
    throw new TypeError('"list" argument must be an Array of Buffers');
  if (e.length === 0)
    return f.alloc(0);
  var n;
  if (r === void 0)
    for (r = 0, n = 0; n < e.length; ++n)
      r += e[n].length;
  var i = f.allocUnsafe(r), o = 0;
  for (n = 0; n < e.length; ++n) {
    var s = e[n];
    if (!j(s))
      throw new TypeError('"list" argument must be an Array of Buffers');
    s.copy(i, o), o += s.length;
  }
  return i;
};
function xt(t, e) {
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
        return xe(t).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return r * 2;
      case "hex":
        return r >>> 1;
      case "base64":
        return At(t).length;
      default:
        if (n) return xe(t).length;
        e = ("" + e).toLowerCase(), n = !0;
    }
}
f.byteLength = xt;
function mr(t, e, r) {
  var n = !1;
  if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e))
    return "";
  for (t || (t = "utf8"); ; )
    switch (t) {
      case "hex":
        return Ir(this, e, r);
      case "utf8":
      case "utf-8":
        return Rt(this, e, r);
      case "ascii":
        return Sr(this, e, r);
      case "latin1":
      case "binary":
        return Rr(this, e, r);
      case "base64":
        return xr(this, e, r);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return Cr(this, e, r);
      default:
        if (n) throw new TypeError("Unknown encoding: " + t);
        t = (t + "").toLowerCase(), n = !0;
    }
}
f.prototype._isBuffer = !0;
function re(t, e, r) {
  var n = t[e];
  t[e] = t[r], t[r] = n;
}
f.prototype.swap16 = function() {
  var e = this.length;
  if (e % 2 !== 0)
    throw new RangeError("Buffer size must be a multiple of 16-bits");
  for (var r = 0; r < e; r += 2)
    re(this, r, r + 1);
  return this;
};
f.prototype.swap32 = function() {
  var e = this.length;
  if (e % 4 !== 0)
    throw new RangeError("Buffer size must be a multiple of 32-bits");
  for (var r = 0; r < e; r += 4)
    re(this, r, r + 3), re(this, r + 1, r + 2);
  return this;
};
f.prototype.swap64 = function() {
  var e = this.length;
  if (e % 8 !== 0)
    throw new RangeError("Buffer size must be a multiple of 64-bits");
  for (var r = 0; r < e; r += 8)
    re(this, r, r + 7), re(this, r + 1, r + 6), re(this, r + 2, r + 5), re(this, r + 3, r + 4);
  return this;
};
f.prototype.toString = function() {
  var e = this.length | 0;
  return e === 0 ? "" : arguments.length === 0 ? Rt(this, 0, e) : mr.apply(this, arguments);
};
f.prototype.equals = function(e) {
  if (!j(e)) throw new TypeError("Argument must be a Buffer");
  return this === e ? !0 : f.compare(this, e) === 0;
};
f.prototype.inspect = function() {
  var e = "", r = cr;
  return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">";
};
f.prototype.compare = function(e, r, n, i, o) {
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
  for (var s = o - i, a = n - r, l = Math.min(s, a), u = this.slice(i, o), c = e.slice(r, n), h = 0; h < l; ++h)
    if (u[h] !== c[h]) {
      s = u[h], a = c[h];
      break;
    }
  return s < a ? -1 : a < s ? 1 : 0;
};
function Et(t, e, r, n, i) {
  if (t.length === 0) return -1;
  if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
    if (i) return -1;
    r = t.length - 1;
  } else if (r < 0)
    if (i) r = 0;
    else return -1;
  if (typeof e == "string" && (e = f.from(e, n)), j(e))
    return e.length === 0 ? -1 : rt(t, e, r, n, i);
  if (typeof e == "number")
    return e = e & 255, f.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : rt(t, [e], r, n, i);
  throw new TypeError("val must be string, number or Buffer");
}
function rt(t, e, r, n, i) {
  var o = 1, s = t.length, a = e.length;
  if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
    if (t.length < 2 || e.length < 2)
      return -1;
    o = 2, s /= 2, a /= 2, r /= 2;
  }
  function l(b, T) {
    return o === 1 ? b[T] : b.readUInt16BE(T * o);
  }
  var u;
  if (i) {
    var c = -1;
    for (u = r; u < s; u++)
      if (l(t, u) === l(e, c === -1 ? 0 : u - c)) {
        if (c === -1 && (c = u), u - c + 1 === a) return c * o;
      } else
        c !== -1 && (u -= u - c), c = -1;
  } else
    for (r + a > s && (r = s - a), u = r; u >= 0; u--) {
      for (var h = !0, m = 0; m < a; m++)
        if (l(t, u + m) !== l(e, m)) {
          h = !1;
          break;
        }
      if (h) return u;
    }
  return -1;
}
f.prototype.includes = function(e, r, n) {
  return this.indexOf(e, r, n) !== -1;
};
f.prototype.indexOf = function(e, r, n) {
  return Et(this, e, r, n, !0);
};
f.prototype.lastIndexOf = function(e, r, n) {
  return Et(this, e, r, n, !1);
};
function _r(t, e, r, n) {
  r = Number(r) || 0;
  var i = t.length - r;
  n ? (n = Number(n), n > i && (n = i)) : n = i;
  var o = e.length;
  if (o % 2 !== 0) throw new TypeError("Invalid hex string");
  n > o / 2 && (n = o / 2);
  for (var s = 0; s < n; ++s) {
    var a = parseInt(e.substr(s * 2, 2), 16);
    if (isNaN(a)) return s;
    t[r + s] = a;
  }
  return s;
}
function wr(t, e, r, n) {
  return Ce(xe(e, t.length - r), t, r, n);
}
function St(t, e, r, n) {
  return Ce(Dr(e), t, r, n);
}
function yr(t, e, r, n) {
  return St(t, e, r, n);
}
function br(t, e, r, n) {
  return Ce(At(e), t, r, n);
}
function vr(t, e, r, n) {
  return Ce(Nr(e, t.length - r), t, r, n);
}
f.prototype.write = function(e, r, n, i) {
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
        return _r(this, e, r, n);
      case "utf8":
      case "utf-8":
        return wr(this, e, r, n);
      case "ascii":
        return St(this, e, r, n);
      case "latin1":
      case "binary":
        return yr(this, e, r, n);
      case "base64":
        return br(this, e, r, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return vr(this, e, r, n);
      default:
        if (s) throw new TypeError("Unknown encoding: " + i);
        i = ("" + i).toLowerCase(), s = !0;
    }
};
f.prototype.toJSON = function() {
  return {
    type: "Buffer",
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};
function xr(t, e, r) {
  return e === 0 && r === t.length ? tt(t) : tt(t.slice(e, r));
}
function Rt(t, e, r) {
  r = Math.min(t.length, r);
  for (var n = [], i = e; i < r; ) {
    var o = t[i], s = null, a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
    if (i + a <= r) {
      var l, u, c, h;
      switch (a) {
        case 1:
          o < 128 && (s = o);
          break;
        case 2:
          l = t[i + 1], (l & 192) === 128 && (h = (o & 31) << 6 | l & 63, h > 127 && (s = h));
          break;
        case 3:
          l = t[i + 1], u = t[i + 2], (l & 192) === 128 && (u & 192) === 128 && (h = (o & 15) << 12 | (l & 63) << 6 | u & 63, h > 2047 && (h < 55296 || h > 57343) && (s = h));
          break;
        case 4:
          l = t[i + 1], u = t[i + 2], c = t[i + 3], (l & 192) === 128 && (u & 192) === 128 && (c & 192) === 128 && (h = (o & 15) << 18 | (l & 63) << 12 | (u & 63) << 6 | c & 63, h > 65535 && h < 1114112 && (s = h));
      }
    }
    s === null ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), i += a;
  }
  return Er(n);
}
var nt = 4096;
function Er(t) {
  var e = t.length;
  if (e <= nt)
    return String.fromCharCode.apply(String, t);
  for (var r = "", n = 0; n < e; )
    r += String.fromCharCode.apply(
      String,
      t.slice(n, n += nt)
    );
  return r;
}
function Sr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i] & 127);
  return n;
}
function Rr(t, e, r) {
  var n = "";
  r = Math.min(t.length, r);
  for (var i = e; i < r; ++i)
    n += String.fromCharCode(t[i]);
  return n;
}
function Ir(t, e, r) {
  var n = t.length;
  (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
  for (var i = "", o = e; o < r; ++o)
    i += Lr(t[o]);
  return i;
}
function Cr(t, e, r) {
  for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2)
    i += String.fromCharCode(n[o] + n[o + 1] * 256);
  return i;
}
f.prototype.slice = function(e, r) {
  var n = this.length;
  e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
  var i;
  if (f.TYPED_ARRAY_SUPPORT)
    i = this.subarray(e, r), i.__proto__ = f.prototype;
  else {
    var o = r - e;
    i = new f(o, void 0);
    for (var s = 0; s < o; ++s)
      i[s] = this[s + e];
  }
  return i;
};
function O(t, e, r) {
  if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
  if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
}
f.prototype.readUIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return i;
};
f.prototype.readUIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e + --r], o = 1; r > 0 && (o *= 256); )
    i += this[e + --r] * o;
  return i;
};
f.prototype.readUInt8 = function(e, r) {
  return r || O(e, 1, this.length), this[e];
};
f.prototype.readUInt16LE = function(e, r) {
  return r || O(e, 2, this.length), this[e] | this[e + 1] << 8;
};
f.prototype.readUInt16BE = function(e, r) {
  return r || O(e, 2, this.length), this[e] << 8 | this[e + 1];
};
f.prototype.readUInt32LE = function(e, r) {
  return r || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
};
f.prototype.readUInt32BE = function(e, r) {
  return r || O(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
f.prototype.readIntLE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = this[e], o = 1, s = 0; ++s < r && (o *= 256); )
    i += this[e + s] * o;
  return o *= 128, i >= o && (i -= Math.pow(2, 8 * r)), i;
};
f.prototype.readIntBE = function(e, r, n) {
  e = e | 0, r = r | 0, n || O(e, r, this.length);
  for (var i = r, o = 1, s = this[e + --i]; i > 0 && (o *= 256); )
    s += this[e + --i] * o;
  return o *= 128, s >= o && (s -= Math.pow(2, 8 * r)), s;
};
f.prototype.readInt8 = function(e, r) {
  return r || O(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
};
f.prototype.readInt16LE = function(e, r) {
  r || O(e, 2, this.length);
  var n = this[e] | this[e + 1] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
f.prototype.readInt16BE = function(e, r) {
  r || O(e, 2, this.length);
  var n = this[e + 1] | this[e] << 8;
  return n & 32768 ? n | 4294901760 : n;
};
f.prototype.readInt32LE = function(e, r) {
  return r || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
f.prototype.readInt32BE = function(e, r) {
  return r || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
f.prototype.readFloatLE = function(e, r) {
  return r || O(e, 4, this.length), Se(this, e, !0, 23, 4);
};
f.prototype.readFloatBE = function(e, r) {
  return r || O(e, 4, this.length), Se(this, e, !1, 23, 4);
};
f.prototype.readDoubleLE = function(e, r) {
  return r || O(e, 8, this.length), Se(this, e, !0, 52, 8);
};
f.prototype.readDoubleBE = function(e, r) {
  return r || O(e, 8, this.length), Se(this, e, !1, 52, 8);
};
function N(t, e, r, n, i, o) {
  if (!j(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
  if (r + n > t.length) throw new RangeError("Index out of range");
}
f.prototype.writeUIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = 1, a = 0;
  for (this[r] = e & 255; ++a < n && (s *= 256); )
    this[r + a] = e / s & 255;
  return r + n;
};
f.prototype.writeUIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, n = n | 0, !i) {
    var o = Math.pow(2, 8 * n) - 1;
    N(this, e, r, n, o, 0);
  }
  var s = n - 1, a = 1;
  for (this[r + s] = e & 255; --s >= 0 && (a *= 256); )
    this[r + s] = e / a & 255;
  return r + n;
};
f.prototype.writeUInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[r] = e & 255, r + 1;
};
function Re(t, e, r, n) {
  e < 0 && (e = 65535 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i)
    t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8;
}
f.prototype.writeUInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : Re(this, e, r, !0), r + 2;
};
f.prototype.writeUInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : Re(this, e, r, !1), r + 2;
};
function Ie(t, e, r, n) {
  e < 0 && (e = 4294967295 + e + 1);
  for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i)
    t[r + i] = e >>> (n ? i : 3 - i) * 8 & 255;
}
f.prototype.writeUInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255) : Ie(this, e, r, !0), r + 4;
};
f.prototype.writeUInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : Ie(this, e, r, !1), r + 4;
};
f.prototype.writeIntLE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = 0, a = 1, l = 0;
  for (this[r] = e & 255; ++s < n && (a *= 256); )
    e < 0 && l === 0 && this[r + s - 1] !== 0 && (l = 1), this[r + s] = (e / a >> 0) - l & 255;
  return r + n;
};
f.prototype.writeIntBE = function(e, r, n, i) {
  if (e = +e, r = r | 0, !i) {
    var o = Math.pow(2, 8 * n - 1);
    N(this, e, r, n, o - 1, -o);
  }
  var s = n - 1, a = 1, l = 0;
  for (this[r + s] = e & 255; --s >= 0 && (a *= 256); )
    e < 0 && l === 0 && this[r + s + 1] !== 0 && (l = 1), this[r + s] = (e / a >> 0) - l & 255;
  return r + n;
};
f.prototype.writeInt8 = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1;
};
f.prototype.writeInt16LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8) : Re(this, e, r, !0), r + 2;
};
f.prototype.writeInt16BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 8, this[r + 1] = e & 255) : Re(this, e, r, !1), r + 2;
};
f.prototype.writeInt32LE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24) : Ie(this, e, r, !0), r + 4;
};
f.prototype.writeInt32BE = function(e, r, n) {
  return e = +e, r = r | 0, n || N(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), f.TYPED_ARRAY_SUPPORT ? (this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255) : Ie(this, e, r, !1), r + 4;
};
function It(t, e, r, n, i, o) {
  if (r + n > t.length) throw new RangeError("Index out of range");
  if (r < 0) throw new RangeError("Index out of range");
}
function Ct(t, e, r, n, i) {
  return i || It(t, e, r, 4), wt(t, e, r, n, 23, 4), r + 4;
}
f.prototype.writeFloatLE = function(e, r, n) {
  return Ct(this, e, r, !0, n);
};
f.prototype.writeFloatBE = function(e, r, n) {
  return Ct(this, e, r, !1, n);
};
function Ot(t, e, r, n, i) {
  return i || It(t, e, r, 8), wt(t, e, r, n, 52, 8), r + 8;
}
f.prototype.writeDoubleLE = function(e, r, n) {
  return Ot(this, e, r, !0, n);
};
f.prototype.writeDoubleBE = function(e, r, n) {
  return Ot(this, e, r, !1, n);
};
f.prototype.copy = function(e, r, n, i) {
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
  else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT)
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
f.prototype.fill = function(e, r, n, i) {
  if (typeof e == "string") {
    if (typeof r == "string" ? (i = r, r = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), e.length === 1) {
      var o = e.charCodeAt(0);
      o < 256 && (e = o);
    }
    if (i !== void 0 && typeof i != "string")
      throw new TypeError("encoding must be a string");
    if (typeof i == "string" && !f.isEncoding(i))
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
    var a = j(e) ? e : xe(new f(e, i).toString()), l = a.length;
    for (s = 0; s < n - r; ++s)
      this[s + r] = a[s % l];
  }
  return this;
};
var Or = /[^+\/0-9A-Za-z-_]/g;
function Ar(t) {
  if (t = Tr(t).replace(Or, ""), t.length < 2) return "";
  for (; t.length % 4 !== 0; )
    t = t + "=";
  return t;
}
function Tr(t) {
  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
}
function Lr(t) {
  return t < 16 ? "0" + t.toString(16) : t.toString(16);
}
function xe(t, e) {
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
function Dr(t) {
  for (var e = [], r = 0; r < t.length; ++r)
    e.push(t.charCodeAt(r) & 255);
  return e;
}
function Nr(t, e) {
  for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
    r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
  return o;
}
function At(t) {
  return ar(Ar(t));
}
function Ce(t, e, r, n) {
  for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
    e[i + r] = t[i];
  return i;
}
function Fr(t) {
  return t !== t;
}
function D(t) {
  return t != null && (!!t._isBuffer || Tt(t) || Mr(t));
}
function Tt(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function Mr(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && Tt(t.slice(0, 0));
}
var Le;
function Z() {
}
Z.prototype = /* @__PURE__ */ Object.create(null);
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
  this.domain = null, p.usingDomains && Le.active && !(this instanceof Le.Domain) && (this.domain = Le.active), (!this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = new Z(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
p.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || isNaN(e))
    throw new TypeError('"n" argument must be a positive number');
  return this._maxListeners = e, this;
};
function Lt(t) {
  return t._maxListeners === void 0 ? p.defaultMaxListeners : t._maxListeners;
}
p.prototype.getMaxListeners = function() {
  return Lt(this);
};
function Br(t, e, r) {
  if (e)
    t.call(r);
  else
    for (var n = t.length, i = ce(t, n), o = 0; o < n; ++o)
      i[o].call(r);
}
function kr(t, e, r, n) {
  if (e)
    t.call(r, n);
  else
    for (var i = t.length, o = ce(t, i), s = 0; s < i; ++s)
      o[s].call(r, n);
}
function Ur(t, e, r, n, i) {
  if (e)
    t.call(r, n, i);
  else
    for (var o = t.length, s = ce(t, o), a = 0; a < o; ++a)
      s[a].call(r, n, i);
}
function Pr(t, e, r, n, i, o) {
  if (e)
    t.call(r, n, i, o);
  else
    for (var s = t.length, a = ce(t, s), l = 0; l < s; ++l)
      a[l].call(r, n, i, o);
}
function $r(t, e, r, n) {
  if (e)
    t.apply(r, n);
  else
    for (var i = t.length, o = ce(t, i), s = 0; s < i; ++s)
      o[s].apply(r, n);
}
p.prototype.emit = function(e) {
  var r, n, i, o, s, a, l, u = e === "error";
  if (a = this._events, a)
    u = u && a.error == null;
  else if (!u)
    return !1;
  if (l = this.domain, u) {
    if (r = arguments[1], l)
      r || (r = new Error('Uncaught, unspecified "error" event')), r.domainEmitter = this, r.domain = l, r.domainThrown = !1, l.emit("error", r);
    else {
      if (r instanceof Error)
        throw r;
      var c = new Error('Uncaught, unspecified "error" event. (' + r + ")");
      throw c.context = r, c;
    }
    return !1;
  }
  if (n = a[e], !n)
    return !1;
  var h = typeof n == "function";
  switch (i = arguments.length, i) {
    // fast cases
    case 1:
      Br(n, h, this);
      break;
    case 2:
      kr(n, h, this, arguments[1]);
      break;
    case 3:
      Ur(n, h, this, arguments[1], arguments[2]);
      break;
    case 4:
      Pr(n, h, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      for (o = new Array(i - 1), s = 1; s < i; s++)
        o[s - 1] = arguments[s];
      $r(n, h, this, o);
  }
  return !0;
};
function Dt(t, e, r, n) {
  var i, o, s;
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  if (o = t._events, o ? (o.newListener && (t.emit(
    "newListener",
    e,
    r.listener ? r.listener : r
  ), o = t._events), s = o[e]) : (o = t._events = new Z(), t._eventsCount = 0), !s)
    s = o[e] = r, ++t._eventsCount;
  else if (typeof s == "function" ? s = o[e] = n ? [r, s] : [s, r] : n ? s.unshift(r) : s.push(r), !s.warned && (i = Lt(t), i && i > 0 && s.length > i)) {
    s.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + e + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = t, a.type = e, a.count = s.length, jr(a);
  }
  return t;
}
function jr(t) {
  typeof console.warn == "function" ? console.warn(t) : console.log(t);
}
p.prototype.addListener = function(e, r) {
  return Dt(this, e, r, !1);
};
p.prototype.on = p.prototype.addListener;
p.prototype.prependListener = function(e, r) {
  return Dt(this, e, r, !0);
};
function Nt(t, e, r) {
  var n = !1;
  function i() {
    t.removeListener(e, i), n || (n = !0, r.apply(t, arguments));
  }
  return i.listener = r, i;
}
p.prototype.once = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.on(e, Nt(this, e, r)), this;
};
p.prototype.prependOnceListener = function(e, r) {
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  return this.prependListener(e, Nt(this, e, r)), this;
};
p.prototype.removeListener = function(e, r) {
  var n, i, o, s, a;
  if (typeof r != "function")
    throw new TypeError('"listener" argument must be a function');
  if (i = this._events, !i)
    return this;
  if (n = i[e], !n)
    return this;
  if (n === r || n.listener && n.listener === r)
    --this._eventsCount === 0 ? this._events = new Z() : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || r));
  else if (typeof n != "function") {
    for (o = -1, s = n.length; s-- > 0; )
      if (n[s] === r || n[s].listener && n[s].listener === r) {
        a = n[s].listener, o = s;
        break;
      }
    if (o < 0)
      return this;
    if (n.length === 1) {
      if (n[0] = void 0, --this._eventsCount === 0)
        return this._events = new Z(), this;
      delete i[e];
    } else
      qr(n, o);
    i.removeListener && this.emit("removeListener", e, a || r);
  }
  return this;
};
p.prototype.removeAllListeners = function(e) {
  var r, n;
  if (n = this._events, !n)
    return this;
  if (!n.removeListener)
    return arguments.length === 0 ? (this._events = new Z(), this._eventsCount = 0) : n[e] && (--this._eventsCount === 0 ? this._events = new Z() : delete n[e]), this;
  if (arguments.length === 0) {
    for (var i = Object.keys(n), o = 0, s; o < i.length; ++o)
      s = i[o], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = new Z(), this._eventsCount = 0, this;
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
  return i ? (r = i[e], r ? typeof r == "function" ? n = [r.listener || r] : n = zr(r) : n = []) : n = [], n;
};
p.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : Ft.call(t, e);
};
p.prototype.listenerCount = Ft;
function Ft(t) {
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
function qr(t, e) {
  for (var r = e, n = r + 1, i = t.length; n < i; r += 1, n += 1)
    t[r] = t[n];
  t.pop();
}
function ce(t, e) {
  for (var r = new Array(e); e--; )
    r[e] = t[e];
  return r;
}
function zr(t) {
  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
    e[r] = t[r].listener || t[r];
  return e;
}
function Mt() {
  throw new Error("setTimeout has not been defined");
}
function Bt() {
  throw new Error("clearTimeout has not been defined");
}
var Q = Mt, G = Bt;
typeof ae.setTimeout == "function" && (Q = setTimeout);
typeof ae.clearTimeout == "function" && (G = clearTimeout);
function kt(t) {
  if (Q === setTimeout)
    return setTimeout(t, 0);
  if ((Q === Mt || !Q) && setTimeout)
    return Q = setTimeout, setTimeout(t, 0);
  try {
    return Q(t, 0);
  } catch {
    try {
      return Q.call(null, t, 0);
    } catch {
      return Q.call(this, t, 0);
    }
  }
}
function Vr(t) {
  if (G === clearTimeout)
    return clearTimeout(t);
  if ((G === Bt || !G) && clearTimeout)
    return G = clearTimeout, clearTimeout(t);
  try {
    return G(t);
  } catch {
    try {
      return G.call(null, t);
    } catch {
      return G.call(this, t);
    }
  }
}
var Y = [], se = !1, ne, ye = -1;
function Jr() {
  !se || !ne || (se = !1, ne.length ? Y = ne.concat(Y) : ye = -1, Y.length && Ut());
}
function Ut() {
  if (!se) {
    var t = kt(Jr);
    se = !0;
    for (var e = Y.length; e; ) {
      for (ne = Y, Y = []; ++ye < e; )
        ne && ne[ye].run();
      ye = -1, e = Y.length;
    }
    ne = null, se = !1, Vr(t);
  }
}
function k(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++)
      e[r - 1] = arguments[r];
  Y.push(new Pt(t, e)), Y.length === 1 && !se && kt(Ut);
}
function Pt(t, e) {
  this.fun = t, this.array = e;
}
Pt.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var Yr = {}, le = ae.performance || {};
le.now || le.mozNow || le.msNow || le.oNow || le.webkitNow;
var be = {
  env: Yr
}, qe;
typeof Object.create == "function" ? qe = function(e, r) {
  e.super_ = r, e.prototype = Object.create(r.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  });
} : qe = function(e, r) {
  e.super_ = r;
  var n = function() {
  };
  n.prototype = r.prototype, e.prototype = new n(), e.prototype.constructor = e;
};
var fe = qe, Wr = /%[sdj%]/g;
function Hr(t) {
  if (!Ge(t)) {
    for (var e = [], r = 0; r < arguments.length; r++)
      e.push(K(arguments[r]));
    return e.join(" ");
  }
  for (var r = 1, n = arguments, i = n.length, o = String(t).replace(Wr, function(a) {
    if (a === "%%") return "%";
    if (r >= i) return a;
    switch (a) {
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
        return a;
    }
  }), s = n[r]; r < i; s = n[++r])
    Qe(s) || !he(s) ? o += " " + s : o += " " + K(s);
  return o;
}
function $t(t, e) {
  if (X(ae.process))
    return function() {
      return $t(t, e).apply(this, arguments);
    };
  if (be.noDeprecation === !0)
    return t;
  var r = !1;
  function n() {
    if (!r) {
      if (be.throwDeprecation)
        throw new Error(e);
      be.traceDeprecation ? console.trace(e) : console.error(e), r = !0;
    }
    return t.apply(this, arguments);
  }
  return n;
}
var _e = {}, De;
function Qr(t) {
  if (X(De) && (De = be.env.NODE_DEBUG || ""), t = t.toUpperCase(), !_e[t])
    if (new RegExp("\\b" + t + "\\b", "i").test(De)) {
      var e = 0;
      _e[t] = function() {
        var r = Hr.apply(null, arguments);
        console.error("%s %d: %s", t, e, r);
      };
    } else
      _e[t] = function() {
      };
  return _e[t];
}
function K(t, e) {
  var r = {
    seen: [],
    stylize: Xr
  };
  return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), jt(e) ? r.showHidden = e : e && on(r, e), X(r.showHidden) && (r.showHidden = !1), X(r.depth) && (r.depth = 2), X(r.colors) && (r.colors = !1), X(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = Gr), Ee(r, t, r.depth);
}
K.colors = {
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
K.styles = {
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
function Gr(t, e) {
  var r = K.styles[e];
  return r ? "\x1B[" + K.colors[r][0] + "m" + t + "\x1B[" + K.colors[r][1] + "m" : t;
}
function Xr(t, e) {
  return t;
}
function Zr(t) {
  var e = {};
  return t.forEach(function(r, n) {
    e[r] = !0;
  }), e;
}
function Ee(t, e, r) {
  if (t.customInspect && e && Be(e.inspect) && // Filter out the util module, it's inspect function is special
  e.inspect !== K && // Also filter out any prototype objects using the circular check.
  !(e.constructor && e.constructor.prototype === e)) {
    var n = e.inspect(r, t);
    return Ge(n) || (n = Ee(t, n, r)), n;
  }
  var i = Kr(t, e);
  if (i)
    return i;
  var o = Object.keys(e), s = Zr(o);
  if (t.showHidden && (o = Object.getOwnPropertyNames(e)), Me(e) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0))
    return Ne(e);
  if (o.length === 0) {
    if (Be(e)) {
      var a = e.name ? ": " + e.name : "";
      return t.stylize("[Function" + a + "]", "special");
    }
    if (Fe(e))
      return t.stylize(RegExp.prototype.toString.call(e), "regexp");
    if (it(e))
      return t.stylize(Date.prototype.toString.call(e), "date");
    if (Me(e))
      return Ne(e);
  }
  var l = "", u = !1, c = ["{", "}"];
  if (rn(e) && (u = !0, c = ["[", "]"]), Be(e)) {
    var h = e.name ? ": " + e.name : "";
    l = " [Function" + h + "]";
  }
  if (Fe(e) && (l = " " + RegExp.prototype.toString.call(e)), it(e) && (l = " " + Date.prototype.toUTCString.call(e)), Me(e) && (l = " " + Ne(e)), o.length === 0 && (!u || e.length == 0))
    return c[0] + l + c[1];
  if (r < 0)
    return Fe(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special");
  t.seen.push(e);
  var m;
  return u ? m = en(t, e, r, s, o) : m = o.map(function(b) {
    return ze(t, e, r, s, b, u);
  }), t.seen.pop(), tn(m, l, c);
}
function Kr(t, e) {
  if (X(e))
    return t.stylize("undefined", "undefined");
  if (Ge(e)) {
    var r = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return t.stylize(r, "string");
  }
  if (nn(e))
    return t.stylize("" + e, "number");
  if (jt(e))
    return t.stylize("" + e, "boolean");
  if (Qe(e))
    return t.stylize("null", "null");
}
function Ne(t) {
  return "[" + Error.prototype.toString.call(t) + "]";
}
function en(t, e, r, n, i) {
  for (var o = [], s = 0, a = e.length; s < a; ++s)
    qt(e, String(s)) ? o.push(ze(
      t,
      e,
      r,
      n,
      String(s),
      !0
    )) : o.push("");
  return i.forEach(function(l) {
    l.match(/^\d+$/) || o.push(ze(
      t,
      e,
      r,
      n,
      l,
      !0
    ));
  }), o;
}
function ze(t, e, r, n, i, o) {
  var s, a, l;
  if (l = Object.getOwnPropertyDescriptor(e, i) || { value: e[i] }, l.get ? l.set ? a = t.stylize("[Getter/Setter]", "special") : a = t.stylize("[Getter]", "special") : l.set && (a = t.stylize("[Setter]", "special")), qt(n, i) || (s = "[" + i + "]"), a || (t.seen.indexOf(l.value) < 0 ? (Qe(r) ? a = Ee(t, l.value, null) : a = Ee(t, l.value, r - 1), a.indexOf(`
`) > -1 && (o ? a = a.split(`
`).map(function(u) {
    return "  " + u;
  }).join(`
`).substr(2) : a = `
` + a.split(`
`).map(function(u) {
    return "   " + u;
  }).join(`
`))) : a = t.stylize("[Circular]", "special")), X(s)) {
    if (o && i.match(/^\d+$/))
      return a;
    s = JSON.stringify("" + i), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = t.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = t.stylize(s, "string"));
  }
  return s + ": " + a;
}
function tn(t, e, r) {
  var n = t.reduce(function(i, o) {
    return o.indexOf(`
`) >= 0, i + o.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return n > 60 ? r[0] + (e === "" ? "" : e + `
 `) + " " + t.join(`,
  `) + " " + r[1] : r[0] + e + " " + t.join(", ") + " " + r[1];
}
function rn(t) {
  return Array.isArray(t);
}
function jt(t) {
  return typeof t == "boolean";
}
function Qe(t) {
  return t === null;
}
function nn(t) {
  return typeof t == "number";
}
function Ge(t) {
  return typeof t == "string";
}
function X(t) {
  return t === void 0;
}
function Fe(t) {
  return he(t) && Xe(t) === "[object RegExp]";
}
function he(t) {
  return typeof t == "object" && t !== null;
}
function it(t) {
  return he(t) && Xe(t) === "[object Date]";
}
function Me(t) {
  return he(t) && (Xe(t) === "[object Error]" || t instanceof Error);
}
function Be(t) {
  return typeof t == "function";
}
function Xe(t) {
  return Object.prototype.toString.call(t);
}
function on(t, e) {
  if (!e || !he(e)) return t;
  for (var r = Object.keys(e), n = r.length; n--; )
    t[r[n]] = e[r[n]];
  return t;
}
function qt(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function ie() {
  this.head = null, this.tail = null, this.length = 0;
}
ie.prototype.push = function(t) {
  var e = { data: t, next: null };
  this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length;
};
ie.prototype.unshift = function(t) {
  var e = { data: t, next: this.head };
  this.length === 0 && (this.tail = e), this.head = e, ++this.length;
};
ie.prototype.shift = function() {
  if (this.length !== 0) {
    var t = this.head.data;
    return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
  }
};
ie.prototype.clear = function() {
  this.head = this.tail = null, this.length = 0;
};
ie.prototype.join = function(t) {
  if (this.length === 0) return "";
  for (var e = this.head, r = "" + e.data; e = e.next; )
    r += t + e.data;
  return r;
};
ie.prototype.concat = function(t) {
  if (this.length === 0) return f.alloc(0);
  if (this.length === 1) return this.head.data;
  for (var e = f.allocUnsafe(t >>> 0), r = this.head, n = 0; r; )
    r.data.copy(e, n), n += r.data.length, r = r.next;
  return e;
};
var sn = f.isEncoding || function(t) {
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
function an(t) {
  if (t && !sn(t))
    throw new Error("Unknown encoding: " + t);
}
function de(t) {
  switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), an(t), this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2, this.detectIncompleteChar = ln;
      break;
    case "base64":
      this.surrogateSize = 3, this.detectIncompleteChar = un;
      break;
    default:
      this.write = fn;
      return;
  }
  this.charBuffer = new f(6), this.charReceived = 0, this.charLength = 0;
}
de.prototype.write = function(t) {
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
de.prototype.detectIncompleteChar = function(t) {
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
de.prototype.end = function(t) {
  var e = "";
  if (t && t.length && (e = this.write(t)), this.charReceived) {
    var r = this.charReceived, n = this.charBuffer, i = this.encoding;
    e += n.slice(0, r).toString(i);
  }
  return e;
};
function fn(t) {
  return t.toString(this.encoding);
}
function ln(t) {
  this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0;
}
function un(t) {
  this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0;
}
E.ReadableState = zt;
var y = Qr("stream");
fe(E, p);
function cn(t, e, r) {
  if (typeof t.prependListener == "function")
    return t.prependListener(e, r);
  !t._events || !t._events[e] ? t.on(e, r) : Array.isArray(t._events[e]) ? t._events[e].unshift(r) : t._events[e] = [r, t._events[e]];
}
function hn(t, e) {
  return t.listeners(e).length;
}
function zt(t, e) {
  t = t || {}, this.objectMode = !!t.objectMode, e instanceof B && (this.objectMode = this.objectMode || !!t.readableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.buffer = new ie(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (this.decoder = new de(t.encoding), this.encoding = t.encoding);
}
function E(t) {
  if (!(this instanceof E)) return new E(t);
  this._readableState = new zt(t, this), this.readable = !0, t && typeof t.read == "function" && (this._read = t.read), p.call(this);
}
E.prototype.push = function(t, e) {
  var r = this._readableState;
  return !r.objectMode && typeof t == "string" && (e = e || r.defaultEncoding, e !== r.encoding && (t = f.from(t, e), e = "")), Vt(this, r, t, e, !1);
};
E.prototype.unshift = function(t) {
  var e = this._readableState;
  return Vt(this, e, t, "", !0);
};
E.prototype.isPaused = function() {
  return this._readableState.flowing === !1;
};
function Vt(t, e, r, n, i) {
  var o = gn(e, r);
  if (o)
    t.emit("error", o);
  else if (r === null)
    e.reading = !1, mn(t, e);
  else if (e.objectMode || r && r.length > 0)
    if (e.ended && !i) {
      var s = new Error("stream.push() after EOF");
      t.emit("error", s);
    } else if (e.endEmitted && i) {
      var a = new Error("stream.unshift() after end event");
      t.emit("error", a);
    } else {
      var l;
      e.decoder && !i && !n && (r = e.decoder.write(r), l = !e.objectMode && r.length === 0), i || (e.reading = !1), l || (e.flowing && e.length === 0 && !e.sync ? (t.emit("data", r), t.read(0)) : (e.length += e.objectMode ? 1 : r.length, i ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && Oe(t))), _n(t, e);
    }
  else i || (e.reading = !1);
  return dn(e);
}
function dn(t) {
  return !t.ended && (t.needReadable || t.length < t.highWaterMark || t.length === 0);
}
E.prototype.setEncoding = function(t) {
  return this._readableState.decoder = new de(t), this._readableState.encoding = t, this;
};
var ot = 8388608;
function pn(t) {
  return t >= ot ? t = ot : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t;
}
function st(t, e) {
  return t <= 0 || e.length === 0 && e.ended ? 0 : e.objectMode ? 1 : t !== t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = pn(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0));
}
E.prototype.read = function(t) {
  y("read", t), t = parseInt(t, 10);
  var e = this._readableState, r = t;
  if (t !== 0 && (e.emittedReadable = !1), t === 0 && e.needReadable && (e.length >= e.highWaterMark || e.ended))
    return y("read: emitReadable", e.length, e.ended), e.length === 0 && e.ended ? ke(this) : Oe(this), null;
  if (t = st(t, e), t === 0 && e.ended)
    return e.length === 0 && ke(this), null;
  var n = e.needReadable;
  y("need readable", n), (e.length === 0 || e.length - t < e.highWaterMark) && (n = !0, y("length less than watermark", n)), e.ended || e.reading ? (n = !1, y("reading or ended", n)) : n && (y("do read"), e.reading = !0, e.sync = !0, e.length === 0 && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = st(r, e)));
  var i;
  return t > 0 ? i = Jt(t, e) : i = null, i === null ? (e.needReadable = !0, t = 0) : e.length -= t, e.length === 0 && (e.ended || (e.needReadable = !0), r !== t && e.ended && ke(this)), i !== null && this.emit("data", i), i;
};
function gn(t, e) {
  var r = null;
  return !D(e) && typeof e != "string" && e !== null && e !== void 0 && !t.objectMode && (r = new TypeError("Invalid non-string/buffer chunk")), r;
}
function mn(t, e) {
  if (!e.ended) {
    if (e.decoder) {
      var r = e.decoder.end();
      r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length);
    }
    e.ended = !0, Oe(t);
  }
}
function Oe(t) {
  var e = t._readableState;
  e.needReadable = !1, e.emittedReadable || (y("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? k(at, t) : at(t));
}
function at(t) {
  y("emit readable"), t.emit("readable"), Ze(t);
}
function _n(t, e) {
  e.readingMore || (e.readingMore = !0, k(wn, t, e));
}
function wn(t, e) {
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
  var i = !e || e.end !== !1, o = i ? a : c;
  n.endEmitted ? k(o) : r.once("end", o), t.on("unpipe", s);
  function s(S) {
    y("onunpipe"), S === r && c();
  }
  function a() {
    y("onend"), t.end();
  }
  var l = yn(r);
  t.on("drain", l);
  var u = !1;
  function c() {
    y("cleanup"), t.removeListener("close", T), t.removeListener("finish", x), t.removeListener("drain", l), t.removeListener("error", b), t.removeListener("unpipe", s), r.removeListener("end", a), r.removeListener("end", c), r.removeListener("data", m), u = !0, n.awaitDrain && (!t._writableState || t._writableState.needDrain) && l();
  }
  var h = !1;
  r.on("data", m);
  function m(S) {
    y("ondata"), h = !1;
    var v = t.write(S);
    v === !1 && !h && ((n.pipesCount === 1 && n.pipes === t || n.pipesCount > 1 && Yt(n.pipes, t) !== -1) && !u && (y("false write response, pause", r._readableState.awaitDrain), r._readableState.awaitDrain++, h = !0), r.pause());
  }
  function b(S) {
    y("onerror", S), F(), t.removeListener("error", b), hn(t, "error") === 0 && t.emit("error", S);
  }
  cn(t, "error", b);
  function T() {
    t.removeListener("finish", x), F();
  }
  t.once("close", T);
  function x() {
    y("onfinish"), t.removeListener("close", T), F();
  }
  t.once("finish", x);
  function F() {
    y("unpipe"), r.unpipe(t);
  }
  return t.emit("pipe", r), n.flowing || (y("pipe resume"), r.resume()), t;
};
function yn(t) {
  return function() {
    var e = t._readableState;
    y("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, e.awaitDrain === 0 && t.listeners("data").length && (e.flowing = !0, Ze(t));
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
  var o = Yt(e.pipes, t);
  return o === -1 ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, e.pipesCount === 1 && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this);
};
E.prototype.on = function(t, e) {
  var r = p.prototype.on.call(this, t, e);
  if (t === "data")
    this._readableState.flowing !== !1 && this.resume();
  else if (t === "readable") {
    var n = this._readableState;
    !n.endEmitted && !n.readableListening && (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && Oe(this) : k(bn, this));
  }
  return r;
};
E.prototype.addListener = E.prototype.on;
function bn(t) {
  y("readable nexttick read 0"), t.read(0);
}
E.prototype.resume = function() {
  var t = this._readableState;
  return t.flowing || (y("resume"), t.flowing = !0, vn(this, t)), this;
};
function vn(t, e) {
  e.resumeScheduled || (e.resumeScheduled = !0, k(xn, t, e));
}
function xn(t, e) {
  e.reading || (y("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), Ze(t), e.flowing && !e.reading && t.read(0);
}
E.prototype.pause = function() {
  return y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (y("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
};
function Ze(t) {
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
      var a = n.push(s);
      a || (r = !0, t.pause());
    }
  });
  for (var i in t)
    this[i] === void 0 && typeof t[i] == "function" && (this[i] = /* @__PURE__ */ (function(s) {
      return function() {
        return t[s].apply(t, arguments);
      };
    })(i));
  var o = ["error", "close", "destroy", "pause", "resume"];
  return Cn(o, function(s) {
    t.on(s, n.emit.bind(n, s));
  }), n._read = function(s) {
    y("wrapped _read", s), r && (r = !1, t.resume());
  }, n;
};
E._fromList = Jt;
function Jt(t, e) {
  if (e.length === 0) return null;
  var r;
  return e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (e.decoder ? r = e.buffer.join("") : e.buffer.length === 1 ? r = e.buffer.head.data : r = e.buffer.concat(e.length), e.buffer.clear()) : r = En(t, e.buffer, e.decoder), r;
}
function En(t, e, r) {
  var n;
  return t < e.head.data.length ? (n = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : t === e.head.data.length ? n = e.shift() : n = r ? Sn(t, e) : Rn(t, e), n;
}
function Sn(t, e) {
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
function Rn(t, e) {
  var r = f.allocUnsafe(t), n = e.head, i = 1;
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
function ke(t) {
  var e = t._readableState;
  if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
  e.endEmitted || (e.ended = !0, k(In, e, t));
}
function In(t, e) {
  !t.endEmitted && t.length === 0 && (t.endEmitted = !0, e.readable = !1, e.emit("end"));
}
function Cn(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    e(t[r], r);
}
function Yt(t, e) {
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e) return r;
  return -1;
}
A.WritableState = Ke;
fe(A, p);
function On() {
}
function An(t, e, r) {
  this.chunk = t, this.encoding = e, this.callback = r, this.next = null;
}
function Ke(t, e) {
  Object.defineProperty(this, "buffer", {
    get: $t(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  }), t = t || {}, this.objectMode = !!t.objectMode, e instanceof B && (this.objectMode = this.objectMode || !!t.writableObjectMode);
  var r = t.highWaterMark, n = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = r || r === 0 ? r : n, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
  var i = t.decodeStrings === !1;
  this.decodeStrings = !i, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(o) {
    Bn(e, o);
  }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new Gt(this);
}
Ke.prototype.getBuffer = function() {
  for (var e = this.bufferedRequest, r = []; e; )
    r.push(e), e = e.next;
  return r;
};
function A(t) {
  if (!(this instanceof A) && !(this instanceof B)) return new A(t);
  this._writableState = new Ke(t, this), this.writable = !0, t && (typeof t.write == "function" && (this._write = t.write), typeof t.writev == "function" && (this._writev = t.writev)), p.call(this);
}
A.prototype.pipe = function() {
  this.emit("error", new Error("Cannot pipe, not readable"));
};
function Tn(t, e) {
  var r = new Error("write after end");
  t.emit("error", r), k(e, r);
}
function Ln(t, e, r, n) {
  var i = !0, o = !1;
  return r === null ? o = new TypeError("May not write null values to stream") : !f.isBuffer(r) && typeof r != "string" && r !== void 0 && !e.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), k(n, o), i = !1), i;
}
A.prototype.write = function(t, e, r) {
  var n = this._writableState, i = !1;
  return typeof e == "function" && (r = e, e = null), f.isBuffer(t) ? e = "buffer" : e || (e = n.defaultEncoding), typeof r != "function" && (r = On), n.ended ? Tn(this, r) : Ln(this, n, t, r) && (n.pendingcb++, i = Nn(this, n, t, e, r)), i;
};
A.prototype.cork = function() {
  var t = this._writableState;
  t.corked++;
};
A.prototype.uncork = function() {
  var t = this._writableState;
  t.corked && (t.corked--, !t.writing && !t.corked && !t.finished && !t.bufferProcessing && t.bufferedRequest && Wt(this, t));
};
A.prototype.setDefaultEncoding = function(e) {
  if (typeof e == "string" && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
  return this._writableState.defaultEncoding = e, this;
};
function Dn(t, e, r) {
  return !t.objectMode && t.decodeStrings !== !1 && typeof e == "string" && (e = f.from(e, r)), e;
}
function Nn(t, e, r, n, i) {
  r = Dn(e, r, n), f.isBuffer(r) && (n = "buffer");
  var o = e.objectMode ? 1 : r.length;
  e.length += o;
  var s = e.length < e.highWaterMark;
  if (s || (e.needDrain = !0), e.writing || e.corked) {
    var a = e.lastBufferedRequest;
    e.lastBufferedRequest = new An(r, n, i), a ? a.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1;
  } else
    Ve(t, e, !1, o, r, n, i);
  return s;
}
function Ve(t, e, r, n, i, o, s) {
  e.writelen = n, e.writecb = s, e.writing = !0, e.sync = !0, r ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1;
}
function Fn(t, e, r, n, i) {
  --e.pendingcb, r ? k(i, n) : i(n), t._writableState.errorEmitted = !0, t.emit("error", n);
}
function Mn(t) {
  t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0;
}
function Bn(t, e) {
  var r = t._writableState, n = r.sync, i = r.writecb;
  if (Mn(r), e) Fn(t, r, n, e, i);
  else {
    var o = Ht(r);
    !o && !r.corked && !r.bufferProcessing && r.bufferedRequest && Wt(t, r), n ? k(ft, t, r, o, i) : ft(t, r, o, i);
  }
}
function ft(t, e, r, n) {
  r || kn(t, e), e.pendingcb--, n(), Qt(t, e);
}
function kn(t, e) {
  e.length === 0 && e.needDrain && (e.needDrain = !1, t.emit("drain"));
}
function Wt(t, e) {
  e.bufferProcessing = !0;
  var r = e.bufferedRequest;
  if (t._writev && r && r.next) {
    var n = e.bufferedRequestCount, i = new Array(n), o = e.corkedRequestsFree;
    o.entry = r;
    for (var s = 0; r; )
      i[s] = r, r = r.next, s += 1;
    Ve(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new Gt(e);
  } else {
    for (; r; ) {
      var a = r.chunk, l = r.encoding, u = r.callback, c = e.objectMode ? 1 : a.length;
      if (Ve(t, e, !1, c, a, l, u), r = r.next, e.writing)
        break;
    }
    r === null && (e.lastBufferedRequest = null);
  }
  e.bufferedRequestCount = 0, e.bufferedRequest = r, e.bufferProcessing = !1;
}
A.prototype._write = function(t, e, r) {
  r(new Error("not implemented"));
};
A.prototype._writev = null;
A.prototype.end = function(t, e, r) {
  var n = this._writableState;
  typeof t == "function" ? (r = t, t = null, e = null) : typeof e == "function" && (r = e, e = null), t != null && this.write(t, e), n.corked && (n.corked = 1, this.uncork()), !n.ending && !n.finished && Un(this, n, r);
};
function Ht(t) {
  return t.ending && t.length === 0 && t.bufferedRequest === null && !t.finished && !t.writing;
}
function lt(t, e) {
  e.prefinished || (e.prefinished = !0, t.emit("prefinish"));
}
function Qt(t, e) {
  var r = Ht(e);
  return r && (e.pendingcb === 0 ? (lt(t, e), e.finished = !0, t.emit("finish")) : lt(t, e)), r;
}
function Un(t, e, r) {
  e.ending = !0, Qt(t, e), r && (e.finished ? k(r) : t.once("finish", r)), e.ended = !0, t.writable = !1;
}
function Gt(t) {
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
fe(B, E);
var ut = Object.keys(A.prototype);
for (var Ue = 0; Ue < ut.length; Ue++) {
  var Pe = ut[Ue];
  B.prototype[Pe] || (B.prototype[Pe] = A.prototype[Pe]);
}
function B(t) {
  if (!(this instanceof B)) return new B(t);
  E.call(this, t), A.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", Pn);
}
function Pn() {
  this.allowHalfOpen || this._writableState.ended || k($n, this);
}
function $n(t) {
  t.end();
}
fe(P, B);
function jn(t) {
  this.afterTransform = function(e, r) {
    return qn(t, e, r);
  }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
}
function qn(t, e, r) {
  var n = t._transformState;
  n.transforming = !1;
  var i = n.writecb;
  if (!i) return t.emit("error", new Error("no writecb in Transform class"));
  n.writechunk = null, n.writecb = null, r != null && t.push(r), i(e);
  var o = t._readableState;
  o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark);
}
function P(t) {
  if (!(this instanceof P)) return new P(t);
  B.call(this, t), this._transformState = new jn(this);
  var e = this;
  this._readableState.needReadable = !0, this._readableState.sync = !1, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.once("prefinish", function() {
    typeof this._flush == "function" ? this._flush(function(r) {
      ct(e, r);
    }) : ct(e);
  });
}
P.prototype.push = function(t, e) {
  return this._transformState.needTransform = !1, B.prototype.push.call(this, t, e);
};
P.prototype._transform = function(t, e, r) {
  throw new Error("Not implemented");
};
P.prototype._write = function(t, e, r) {
  var n = this._transformState;
  if (n.writecb = r, n.writechunk = t, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
P.prototype._read = function(t) {
  var e = this._transformState;
  e.writechunk !== null && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
function ct(t, e) {
  if (e) return t.emit("error", e);
  var r = t._writableState, n = t._transformState;
  if (r.length) throw new Error("Calling transform done when ws.length != 0");
  if (n.transforming) throw new Error("Calling transform done when still transforming");
  return t.push(null);
}
fe(ue, P);
function ue(t) {
  if (!(this instanceof ue)) return new ue(t);
  P.call(this, t);
}
ue.prototype._transform = function(t, e, r) {
  r(null, t);
};
fe(W, p);
W.Readable = E;
W.Writable = A;
W.Duplex = B;
W.Transform = P;
W.PassThrough = ue;
W.Stream = W;
function W() {
  p.call(this);
}
W.prototype.pipe = function(t, e) {
  var r = this;
  function n(c) {
    t.writable && t.write(c) === !1 && r.pause && r.pause();
  }
  r.on("data", n);
  function i() {
    r.readable && r.resume && r.resume();
  }
  t.on("drain", i), !t._isStdio && (!e || e.end !== !1) && (r.on("end", s), r.on("close", a));
  var o = !1;
  function s() {
    o || (o = !0, t.end());
  }
  function a() {
    o || (o = !0, typeof t.destroy == "function" && t.destroy());
  }
  function l(c) {
    if (u(), p.listenerCount(this, "error") === 0)
      throw c;
  }
  r.on("error", l), t.on("error", l);
  function u() {
    r.removeListener("data", n), t.removeListener("drain", i), r.removeListener("end", s), r.removeListener("close", a), r.removeListener("error", l), t.removeListener("error", l), r.removeListener("end", u), r.removeListener("close", u), t.removeListener("close", u);
  }
  return r.on("end", u), r.on("close", u), t.on("close", u), t.emit("pipe", r), t;
};
const Xt = function(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
};
class g extends Error {
  constructor(e, r, n, ...i) {
    Array.isArray(r) && (r = r.join(" ").trim()), super(r), Error.captureStackTrace !== void 0 && Error.captureStackTrace(this, g), this.code = e;
    for (const o of i)
      for (const s in o) {
        const a = o[s];
        this[s] = D(a) ? a.toString(n.encoding) : a == null ? a : JSON.parse(JSON.stringify(a));
      }
  }
}
const Zt = function(t) {
  const e = [];
  for (let r = 0, n = t.length; r < n; r++) {
    const i = t[r];
    if (i == null || i === !1)
      e[r] = { disabled: !0 };
    else if (typeof i == "string")
      e[r] = { name: i };
    else if (Xt(i)) {
      if (typeof i.name != "string")
        throw new g("CSV_OPTION_COLUMNS_MISSING_NAME", [
          "Option columns missing name:",
          `property "name" is required at position ${r}`,
          "when column is an object literal"
        ]);
      e[r] = i;
    } else
      throw new g("CSV_INVALID_COLUMN_DEFINITION", [
        "Invalid column definition:",
        "expect a string or a literal object,",
        `got ${JSON.stringify(i)} at position ${r}`
      ]);
  }
  return e;
};
class ht {
  constructor(e = 100) {
    this.size = e, this.length = 0, this.buf = f.allocUnsafe(e);
  }
  prepend(e) {
    if (D(e)) {
      const r = this.length + e.length;
      if (r >= this.size && (this.resize(), r >= this.size))
        throw Error("INVALID_BUFFER_STATE");
      const n = this.buf;
      this.buf = f.allocUnsafe(this.size), e.copy(this.buf, 0), n.copy(this.buf, e.length), this.length += e.length;
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
    return f.from(this.buf.slice(0, this.length));
  }
  resize() {
    const e = this.length;
    this.size = this.size * 2;
    const r = f.allocUnsafe(this.size);
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
const zn = 12, Vn = 13, Jn = 10, Yn = 32, Wn = 9, Hn = function(t) {
  return {
    bomSkipped: !1,
    bufBytesStart: 0,
    castField: t.cast_function,
    commenting: !1,
    // Current error encountered by a record
    error: void 0,
    enabled: t.from_line === 1,
    escaping: !1,
    escapeIsQuote: D(t.escape) && D(t.quote) && f.compare(t.escape, t.quote) === 0,
    // columns can be `false`, `true`, `Array`
    expectedRecordLength: Array.isArray(t.columns) ? t.columns.length : void 0,
    field: new ht(20),
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
    rawBuffer: new ht(100),
    record: [],
    recordHasError: !1,
    record_length: 0,
    recordDelimiterMaxLength: t.record_delimiter.length === 0 ? 0 : Math.max(...t.record_delimiter.map((e) => e.length)),
    trimChars: [
      f.from(" ", t.encoding)[0],
      f.from("	", t.encoding)[0]
    ],
    wasQuoting: !1,
    wasRowDelimiter: !1,
    timchars: [
      f.from(f.from([Vn], "utf8").toString(), t.encoding),
      f.from(f.from([Jn], "utf8").toString(), t.encoding),
      f.from(f.from([zn], "utf8").toString(), t.encoding),
      f.from(f.from([Yn], "utf8").toString(), t.encoding),
      f.from(f.from([Wn], "utf8").toString(), t.encoding)
    ]
  };
}, Qn = function(t) {
  return t.replace(/([A-Z])/g, function(e, r) {
    return "_" + r.toLowerCase();
  });
}, dt = function(t) {
  const e = {};
  for (const n in t)
    e[Qn(n)] = t[n];
  if (e.encoding === void 0 || e.encoding === !0)
    e.encoding = "utf8";
  else if (e.encoding === null || e.encoding === !1)
    e.encoding = null;
  else if (typeof e.encoding != "string" && e.encoding !== null)
    throw new g(
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
    throw new g(
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
    throw new g(
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
    throw new g(
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
    e.columns = Zt(e.columns);
  else if (e.columns === void 0 || e.columns === null || e.columns === !1)
    e.columns = !1;
  else
    throw new g(
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
      throw new g(
        "CSV_INVALID_OPTION_GROUP_COLUMNS_BY_NAME",
        [
          "Invalid option group_columns_by_name:",
          "expect an boolean,",
          `got ${JSON.stringify(e.group_columns_by_name)}`
        ],
        e
      );
    if (e.columns === !1)
      throw new g(
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
  else if (typeof e.comment == "string" && (e.comment = f.from(e.comment, e.encoding)), !D(e.comment))
    throw new g(
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
    throw new g(
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
    throw new g(
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
      return f.from(",", e.encoding);
    if (typeof n == "string" && (n = f.from(n, e.encoding)), !D(n) || n.length === 0)
      throw new g(
        "CSV_INVALID_OPTION_DELIMITER",
        [
          "Invalid option delimiter:",
          "delimiter must be a non empty string or buffer or array of string|buffer,",
          `got ${r}`
        ],
        e
      );
    return n;
  }), e.escape === void 0 || e.escape === !0 ? e.escape = f.from('"', e.encoding) : typeof e.escape == "string" ? e.escape = f.from(e.escape, e.encoding) : (e.escape === null || e.escape === !1) && (e.escape = null), e.escape !== null && !D(e.escape))
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
    throw new g(
      "CSV_INVALID_OPTION_IGNORE_LAST_DELIMITERS",
      [
        "Invalid option `ignore_last_delimiters`:",
        "the value must be a boolean value or an integer,",
        `got ${JSON.stringify(e.ignore_last_delimiters)}`
      ],
      e
    );
  if (e.ignore_last_delimiters === !0 && e.columns === !1)
    throw new g(
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
    throw new g(
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
  else if (e.quote === void 0 || e.quote === !0 ? e.quote = f.from('"', e.encoding) : typeof e.quote == "string" && (e.quote = f.from(e.quote, e.encoding)), !D(e.quote))
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
      throw new g(
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
    throw new g(
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
      throw new g(
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
      throw new g(
        "CSV_INVALID_OPTION_RECORD_DELIMITER",
        [
          "Invalid option `record_delimiter`:",
          "value must be a non empty string or buffer",
          `at index ${i},`,
          `got ${JSON.stringify(n)}`
        ],
        e
      );
    return typeof n == "string" && (n = f.from(n, e.encoding)), n;
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
}, pt = function(t) {
  return t.every(
    (e) => e == null || e.toString && e.toString().trim() === ""
  );
}, Gn = 13, Xn = 10, oe = {
  // Note, the following are equals:
  // Buffer.from("\ufeff")
  // Buffer.from([239, 187, 191])
  // Buffer.from('EFBBBF', 'hex')
  utf8: f.from([239, 187, 191]),
  // Note, the following are equals:
  // Buffer.from "\ufeff", 'utf16le
  // Buffer.from([255, 254])
  utf16le: f.from([255, 254])
}, Zn = function(t = {}) {
  const e = {
    bytes: 0,
    comment_lines: 0,
    empty_lines: 0,
    invalid_field_length: 0,
    lines: 1,
    records: 0
  }, r = dt(t);
  return {
    info: e,
    original_options: t,
    options: r,
    state: Hn(r),
    __needMoreData: function(n, i, o) {
      if (o) return !1;
      const { encoding: s, escape: a, quote: l } = this.options, { quoting: u, needMoreDataSize: c, recordDelimiterMaxLength: h } = this.state, m = i - n - 1, b = Math.max(
        c,
        // Skip if the remaining buffer smaller than record delimiter
        // If "record_delimiter" is yet to be discovered:
        // 1. It is equals to `[]` and "recordDelimiterMaxLength" equals `0`
        // 2. We set the length to windows line ending in the current encoding
        // Note, that encoding is known from user or bom discovery at that point
        // recordDelimiterMaxLength,
        h === 0 ? f.from(`\r
`, s).length : h,
        // Skip if remaining buffer can be an escaped quote
        u ? (a === null ? 0 : a.length) + l.length : 0,
        // Skip if remaining buffer can be record delimiter following the closing quote
        u ? l.length + h : 0
      );
      return m < b;
    },
    // Central parser implementation
    parse: function(n, i, o, s) {
      const {
        bom: a,
        comment_no_infix: l,
        encoding: u,
        from_line: c,
        ltrim: h,
        max_record_size: m,
        raw: b,
        relax_quotes: T,
        rtrim: x,
        skip_empty_lines: F,
        to: S,
        to_line: v
      } = this.options;
      let { comment: _, escape: L, quote: U, record_delimiter: Ae } = this.options;
      const { bomSkipped: nr, previousBuf: pe, rawBuffer: ir, escapeIsQuote: or } = this.state;
      let w;
      if (pe === void 0)
        if (n === void 0) {
          s();
          return;
        } else
          w = n;
      else pe !== void 0 && n === void 0 ? w = pe : w = f.concat([pe, n]);
      if (nr === !1)
        if (a === !1)
          this.state.bomSkipped = !0;
        else if (w.length < 3) {
          if (i === !1) {
            this.state.previousBuf = w;
            return;
          }
        } else {
          for (const R in oe)
            if (oe[R].compare(w, 0, oe[R].length) === 0) {
              const H = oe[R].length;
              this.state.bufBytesStart += H, w = w.slice(H);
              const ge = dt({
                ...this.original_options,
                encoding: R
              });
              for (const C in ge)
                this.options[C] = ge[C];
              ({ comment: _, escape: L, quote: U } = this.options);
              break;
            }
          this.state.bomSkipped = !0;
        }
      const Te = w.length;
      let d;
      for (d = 0; d < Te && !this.__needMoreData(d, Te, i); d++) {
        if (this.state.wasRowDelimiter === !0 && (this.info.lines++, this.state.wasRowDelimiter = !1), v !== -1 && this.info.lines > v) {
          this.state.stop = !0, s();
          return;
        }
        this.state.quoting === !1 && Ae.length === 0 && this.__autoDiscoverRecordDelimiter(
          w,
          d
        ) && (Ae = this.options.record_delimiter);
        const R = w[d];
        if (b === !0 && ir.append(R), (R === Gn || R === Xn) && this.state.wasRowDelimiter === !1 && (this.state.wasRowDelimiter = !0), this.state.escaping === !0)
          this.state.escaping = !1;
        else {
          if (L !== null && this.state.quoting === !0 && this.__isEscape(w, d, R) && d + L.length < Te)
            if (or) {
              if (this.__isQuote(w, d + L.length)) {
                this.state.escaping = !0, d += L.length - 1;
                continue;
              }
            } else {
              this.state.escaping = !0, d += L.length - 1;
              continue;
            }
          if (this.state.commenting === !1 && this.__isQuote(w, d))
            if (this.state.quoting === !0) {
              const C = w[d + U.length], ee = x && this.__isCharTrimable(w, d + U.length), z = _ !== null && this.__compareBytes(_, w, d + U.length, C), te = this.__isDelimiter(
                w,
                d + U.length,
                C
              ), me = Ae.length === 0 ? this.__autoDiscoverRecordDelimiter(w, d + U.length) : this.__isRecordDelimiter(C, w, d + U.length);
              if (L !== null && this.__isEscape(w, d, R) && this.__isQuote(w, d + L.length))
                d += L.length - 1;
              else if (!C || te || me || z || ee) {
                this.state.quoting = !1, this.state.wasQuoting = !0, d += U.length - 1;
                continue;
              } else if (T === !1) {
                const et = this.__error(
                  new g(
                    "CSV_INVALID_CLOSING_QUOTE",
                    [
                      "Invalid Closing Quote:",
                      `got "${String.fromCharCode(C)}"`,
                      `at line ${this.info.lines}`,
                      "instead of delimiter, record delimiter, trimable character",
                      "(if activated) or comment"
                    ],
                    this.options,
                    this.__infoField()
                  )
                );
                if (et !== void 0) return et;
              } else
                this.state.quoting = !1, this.state.wasQuoting = !0, this.state.field.prepend(U), d += U.length - 1;
            } else if (this.state.field.length !== 0) {
              if (T === !1) {
                const C = this.__infoField(), ee = Object.keys(oe).map(
                  (te) => oe[te].equals(this.state.field.toString()) ? te : !1
                ).filter(Boolean)[0], z = this.__error(
                  new g(
                    "INVALID_OPENING_QUOTE",
                    [
                      "Invalid Opening Quote:",
                      `a quote is found on field ${JSON.stringify(C.column)} at line ${C.lines}, value is ${JSON.stringify(this.state.field.toString(u))}`,
                      ee ? `(${ee} bom)` : void 0
                    ],
                    this.options,
                    C,
                    {
                      field: this.state.field
                    }
                  )
                );
                if (z !== void 0) return z;
              }
            } else {
              this.state.quoting = !0, d += U.length - 1;
              continue;
            }
          if (this.state.quoting === !1) {
            const C = this.__isRecordDelimiter(
              R,
              w,
              d
            );
            if (C !== 0) {
              if (this.state.commenting && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0)
                this.info.comment_lines++;
              else {
                if (this.state.enabled === !1 && this.info.lines + (this.state.wasRowDelimiter === !0 ? 1 : 0) >= c) {
                  this.state.enabled = !0, this.__resetField(), this.__resetRecord(), d += C - 1;
                  continue;
                }
                if (F === !0 && this.state.wasQuoting === !1 && this.state.record.length === 0 && this.state.field.length === 0) {
                  this.info.empty_lines++, d += C - 1;
                  continue;
                }
                this.info.bytes = this.state.bufBytesStart + d;
                const te = this.__onField();
                if (te !== void 0) return te;
                this.info.bytes = this.state.bufBytesStart + d + C;
                const me = this.__onRecord(o);
                if (me !== void 0) return me;
                if (S !== -1 && this.info.records >= S) {
                  this.state.stop = !0, s();
                  return;
                }
              }
              this.state.commenting = !1, d += C - 1;
              continue;
            }
            if (this.state.commenting)
              continue;
            if (_ !== null && (l === !1 || this.state.record.length === 0 && this.state.field.length === 0) && this.__compareBytes(_, w, d, R) !== 0) {
              this.state.commenting = !0;
              continue;
            }
            const ee = this.__isDelimiter(w, d, R);
            if (ee !== 0) {
              this.info.bytes = this.state.bufBytesStart + d;
              const z = this.__onField();
              if (z !== void 0) return z;
              d += ee - 1;
              continue;
            }
          }
        }
        if (this.state.commenting === !1 && m !== 0 && this.state.record_length + this.state.field.length > m)
          return this.__error(
            new g(
              "CSV_MAX_RECORD_SIZE",
              [
                "Max Record Size:",
                "record exceed the maximum number of tolerated bytes",
                `of ${m}`,
                `at line ${this.info.lines}`
              ],
              this.options,
              this.__infoField()
            )
          );
        const H = h === !1 || this.state.quoting === !0 || this.state.field.length !== 0 || !this.__isCharTrimable(w, d), ge = x === !1 || this.state.wasQuoting === !1;
        if (H === !0 && ge === !0)
          this.state.field.append(R);
        else {
          if (x === !0 && !this.__isCharTrimable(w, d))
            return this.__error(
              new g(
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
          H === !1 && (d += this.__isCharTrimable(w, d) - 1);
          continue;
        }
      }
      if (i === !0)
        if (this.state.quoting === !0) {
          const R = this.__error(
            new g(
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
          const H = this.__onRecord(o);
          if (H !== void 0) return H;
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
        info: a,
        from: l,
        relax_column_count: u,
        relax_column_count_less: c,
        relax_column_count_more: h,
        raw: m,
        skip_records_with_empty_values: b
      } = this.options, { enabled: T, record: x } = this.state;
      if (T === !1)
        return this.__resetRecord();
      const F = x.length;
      if (i === !0) {
        if (b === !0 && pt(x)) {
          this.__resetRecord();
          return;
        }
        return this.__firstLineToColumns(x);
      }
      if (i === !1 && this.info.records === 0 && (this.state.expectedRecordLength = F), F !== this.state.expectedRecordLength) {
        const S = i === !1 ? new g(
          "CSV_RECORD_INCONSISTENT_FIELDS_LENGTH",
          [
            "Invalid Record Length:",
            `expect ${this.state.expectedRecordLength},`,
            `got ${F} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: x
          }
        ) : new g(
          "CSV_RECORD_INCONSISTENT_COLUMNS",
          [
            "Invalid Record Length:",
            `columns length is ${i.length},`,
            // rename columns
            `got ${F} on line ${this.info.lines}`
          ],
          this.options,
          this.__infoField(),
          {
            record: x
          }
        );
        if (u === !0 || c === !0 && F < this.state.expectedRecordLength || h === !0 && F > this.state.expectedRecordLength)
          this.info.invalid_field_length++, this.state.error = S;
        else {
          const v = this.__error(S);
          if (v) return v;
        }
      }
      if (b === !0 && pt(x)) {
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
          const v = {};
          for (let _ = 0, L = x.length; _ < L; _++)
            i[_] === void 0 || i[_].disabled || (o === !0 && v[i[_].name] !== void 0 ? Array.isArray(v[i[_].name]) ? v[i[_].name] = v[i[_].name].concat(x[_]) : v[i[_].name] = [v[i[_].name], x[_]] : v[i[_].name] = x[_]);
          if (m === !0 || a === !0) {
            const _ = Object.assign(
              { record: v },
              m === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
              a === !0 ? { info: this.__infoRecord() } : {}
            ), L = this.__push(
              S === void 0 ? _ : [v[S], _],
              n
            );
            if (L)
              return L;
          } else {
            const _ = this.__push(
              S === void 0 ? v : [v[S], v],
              n
            );
            if (_)
              return _;
          }
        } else if (m === !0 || a === !0) {
          const v = Object.assign(
            { record: x },
            m === !0 ? { raw: this.state.rawBuffer.toString(s) } : {},
            a === !0 ? { info: this.__infoRecord() } : {}
          ), _ = this.__push(
            S === void 0 ? v : [x[S], v],
            n
          );
          if (_)
            return _;
        } else {
          const v = this.__push(
            S === void 0 ? x : [x[S], x],
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
            new g(
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
        const s = Zt(o);
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
      const { cast: n, encoding: i, rtrim: o, max_record_size: s } = this.options, { enabled: a, wasQuoting: l } = this.state;
      if (a === !1)
        return this.__resetField();
      let u = this.state.field.toString(i);
      if (o === !0 && l === !1 && (u = u.trimRight()), n === !0) {
        const [c, h] = this.__cast(u);
        if (c !== void 0) return c;
        u = h;
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
        } catch (a) {
          return a;
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
          const a = this.__infoField();
          return [void 0, this.state.castField.call(null, n, a)];
        } catch (a) {
          return [a];
        }
      if (this.__isFloat(n))
        return [void 0, parseFloat(n)];
      if (this.options.cast_date !== !1) {
        const a = this.__infoField();
        return [void 0, this.options.cast_date.call(null, n, a)];
      }
      return [void 0, n];
    },
    // Helper to test if a character is a space or a line delimiter
    __isCharTrimable: function(n, i) {
      return ((s, a) => {
        const { timchars: l } = this.state;
        e: for (let u = 0; u < l.length; u++) {
          const c = l[u];
          for (let h = 0; h < c.length; h++)
            if (c[h] !== s[a + h]) continue e;
          return c.length;
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
      const a = n.length;
      for (let l = 1; l < a; l++)
        if (n[l] !== i[o + l]) return 0;
      return a;
    },
    __isDelimiter: function(n, i, o) {
      const { delimiter: s, ignore_last_delimiters: a } = this.options;
      if (a === !0 && this.state.record.length === this.options.columns.length - 1)
        return 0;
      if (a !== !1 && typeof a == "number" && this.state.record.length === a - 1)
        return 0;
      e: for (let l = 0; l < s.length; l++) {
        const u = s[l];
        if (u[0] === o) {
          for (let c = 1; c < u.length; c++)
            if (u[c] !== n[i + c]) continue e;
          return u.length;
        }
      }
      return 0;
    },
    __isRecordDelimiter: function(n, i, o) {
      const { record_delimiter: s } = this.options, a = s.length;
      e: for (let l = 0; l < a; l++) {
        const u = s[l], c = u.length;
        if (u[0] === n) {
          for (let h = 1; h < c; h++)
            if (u[h] !== i[o + h])
              continue e;
          return u.length;
        }
      }
      return 0;
    },
    __isEscape: function(n, i, o) {
      const { escape: s } = this.options;
      if (s === null) return !1;
      const a = s.length;
      if (s[0] === o) {
        for (let l = 0; l < a; l++)
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
      for (let a = 0; a < s; a++)
        if (o[a] !== n[i + a])
          return !1;
      return !0;
    },
    __autoDiscoverRecordDelimiter: function(n, i) {
      const { encoding: o } = this.options, s = [
        // Important, the windows line ending must be before mac os 9
        f.from(`\r
`, o),
        f.from(`
`, o),
        f.from("\r", o)
      ];
      e: for (let a = 0; a < s.length; a++) {
        const l = s[a].length;
        for (let u = 0; u < l; u++)
          if (s[a][u] !== n[i + u])
            continue e;
        return this.options.record_delimiter.push(s[a]), this.state.recordDelimiterMaxLength = s[a].length, s[a].length;
      }
      return 0;
    },
    __error: function(n) {
      const { encoding: i, raw: o, skip_records_with_error: s } = this.options, a = typeof n == "string" ? new Error(n) : n;
      if (s) {
        if (this.state.recordHasError = !0, this.options.on_skip !== void 0)
          try {
            this.options.on_skip(
              a,
              o ? this.state.rawBuffer.toString(i) : void 0
            );
          } catch (l) {
            return l;
          }
        return;
      } else
        return a;
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
class Kn extends P {
  constructor(e = {}) {
    super({ readableObjectMode: !0, ...e, encoding: null }), this.api = Zn({
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
const gt = function() {
  let t, e, r;
  for (const i in arguments) {
    const o = arguments[i], s = typeof o;
    if (t === void 0 && (typeof o == "string" || D(o)))
      t = o;
    else if (e === void 0 && Xt(o))
      e = o;
    else if (r === void 0 && s === "function")
      r = o;
    else
      throw new g(
        "CSV_INVALID_ARGUMENT",
        ["Invalid argument:", `got ${JSON.stringify(o)} at index ${i}`],
        e || {}
      );
  }
  const n = new Kn(e);
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
let $e;
// @__NO_SIDE_EFFECTS__
function ei(t) {
  return {
    lang: t?.lang ?? $e?.lang,
    message: t?.message,
    abortEarly: t?.abortEarly ?? $e?.abortEarly,
    abortPipeEarly: t?.abortPipeEarly ?? $e?.abortPipeEarly
  };
}
let ti;
// @__NO_SIDE_EFFECTS__
function ri(t) {
  return ti?.get(t);
}
let ni;
// @__NO_SIDE_EFFECTS__
function ii(t) {
  return ni?.get(t);
}
let oi;
// @__NO_SIDE_EFFECTS__
function si(t, e) {
  return oi?.get(t)?.get(e);
}
// @__NO_SIDE_EFFECTS__
function Kt(t) {
  const e = typeof t;
  return e === "string" ? `"${t}"` : e === "number" || e === "bigint" || e === "boolean" ? `${t}` : e === "object" || e === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : e;
}
function Je(t, e, r, n, i) {
  const o = i && "input" in i ? i.input : r.value, s = i?.expected ?? t.expects ?? null, a = i?.received ?? /* @__PURE__ */ Kt(o), l = {
    kind: t.kind,
    type: t.type,
    input: o,
    expected: s,
    received: a,
    message: `Invalid ${e}: ${s ? `Expected ${s} but r` : "R"}eceived ${a}`,
    requirement: t.requirement,
    path: i?.path,
    issues: i?.issues,
    lang: n.lang,
    abortEarly: n.abortEarly,
    abortPipeEarly: n.abortPipeEarly
  }, u = t.kind === "schema", c = i?.message ?? t.message ?? /* @__PURE__ */ si(t.reference, l.lang) ?? (u ? /* @__PURE__ */ ii(l.lang) : null) ?? n.message ?? /* @__PURE__ */ ri(l.lang);
  c !== void 0 && (l.message = typeof c == "function" ? c(l) : c), u && (r.typed = !1), r.issues ? r.issues.push(l) : r.issues = [l];
}
// @__NO_SIDE_EFFECTS__
function er(t) {
  return {
    version: 1,
    vendor: "valibot",
    validate(e) {
      return t["~run"]({ value: e }, /* @__PURE__ */ ei());
    }
  };
}
// @__NO_SIDE_EFFECTS__
function ai(t, e) {
  const r = [...new Set(t)];
  return r.length > 1 ? `(${r.join(` ${e} `)})` : r[0] ?? "never";
}
// @__NO_SIDE_EFFECTS__
function tr(t, e) {
  return {
    kind: "schema",
    type: "literal",
    reference: tr,
    expects: /* @__PURE__ */ Kt(t),
    async: !1,
    literal: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ er(this);
    },
    "~run"(r, n) {
      return r.value === this.literal ? r.typed = !0 : Je(this, "type", r, n), r;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function mt(t) {
  let e;
  if (t) for (const r of t) e ? e.push(...r.issues) : e = r.issues;
  return e;
}
// @__NO_SIDE_EFFECTS__
function rr(t, e) {
  return {
    kind: "schema",
    type: "union",
    reference: rr,
    expects: /* @__PURE__ */ ai(t.map((r) => r.expects), "|"),
    async: !1,
    options: t,
    message: e,
    get "~standard"() {
      return /* @__PURE__ */ er(this);
    },
    "~run"(r, n) {
      let i, o, s;
      for (const a of this.options) {
        const l = a["~run"]({ value: r.value }, n);
        if (l.typed) if (l.issues) o ? o.push(l) : o = [l];
        else {
          i = l;
          break;
        }
        else s ? s.push(l) : s = [l];
      }
      if (i) return i;
      if (o) {
        if (o.length === 1) return o[0];
        Je(this, "type", r, n, { issues: /* @__PURE__ */ mt(o) }), r.typed = !0;
      } else {
        if (s?.length === 1) return s[0];
        Je(this, "type", r, n, { issues: /* @__PURE__ */ mt(s) });
      }
      return r;
    }
  };
}
const q = (t) => /* @__PURE__ */ rr(t.map((e) => /* @__PURE__ */ tr(e)));
q(["amber", "green", "red", "other"]);
q([
  "alpha",
  "beta",
  "generalAvailability",
  "notApplicable",
  "preAlpha",
  "proposed",
  "releaseCandidate",
  "unavailable",
  "underReview"
]);
q([
  "app",
  "connector",
  "connectorConnection",
  "context",
  "contextModelGroup",
  "contextModel",
  "contextModelDimensionGroup",
  "contextModelDimension",
  "contextModelDimensionHierarchy",
  "contextModelEntityGroup",
  "contextModelEntity",
  "contextModelEntityDataItem",
  "contextModelEntityEvent",
  "contextModelEntityPrimaryMeasure",
  "contextModelSecondaryMeasureGroup",
  "contextModelSecondaryMeasure",
  "dataView",
  "dimension",
  "engine",
  "eventQuery",
  "presenter",
  "presenterPresentation",
  "tool"
]);
q(["app", "engine", "connector", "context", "presenter", "tool"]);
const V = (t) => {
  const e = Object.entries(t).filter((r) => typeof r[1] == "string");
  return new Map(e);
};
V({ "en-gb": "alpha" }), V({ "en-gb": "beta" }), V({ "en-gb": "" }), V({ "en-gb": "not-applicable" }), V({ "en-gb": "pre-alpha" }), V({ "en-gb": "proposed" }), V({ "en-gb": "release-candidate" }), V({ "en-gb": "unavailable" }), V({ "en-gb": "under-review" });
q(["apiKey", "disabled", "oAuth2", "none"]);
q(["application", "curatedDataset", "database", "fileStore"]);
q([
  "abortOperation",
  "authenticateConnection",
  "createObject",
  "describeConnection",
  "dropObject",
  "findObject",
  "getReadableStream",
  "getRecord",
  "listNodes",
  "previewObject",
  "removeRecords",
  "retrieveChunks",
  "retrieveRecords",
  "upsertRecords"
]);
q(["bidirectional", "destination", "source", "unknown"]);
const we = (t) => {
  const e = Object.entries(t).filter((r) => typeof r[1] == "string");
  return new Map(e);
};
we({ "en-gb": "Application" }), we({ "en-gb": "Curated Dataset" }), we({ "en-gb": "Database" }), we({ "en-gb": "File Store" });
q(["list"]);
class fi extends Error {
  locator;
  constructor(e, r, n) {
    super(e, n), this.name = "DataPosError", this.locator = r;
  }
}
class li extends fi {
  constructor(e, r, n) {
    super(e, r, n), this.name = "ApplicationError";
  }
}
class ui extends li {
  body;
  constructor(e, r, n, i) {
    super(e, r, i), this.name = "FetchError", this.body = n;
  }
}
async function ci(t, e, r) {
  const n = ` - ${t.statusText}`, i = `${e} Response status '${t.status}${t.statusText ? n : ""}' received.`, o = await t.text();
  return new ui(i, r, o);
}
q(["list", "render", "setColorMode"]);
const I = (t) => new Map(Object.entries(t));
I({ "en-gb": "Delimited Text" }), I({ "en-gb": "Entity/Event" }), I({ "en-gb": "JSON Array" }), I({ "en-gb": "SPSS" }), I({ "en-gb": "XLS" }), I({ "en-gb": "XLSX" }), I({ "en-gb": "XML" });
I({ "en-gb": "Newline" }), I({ "en-gb": "Carriage Return" }), I({ "en-gb": "Carriage Return/Newline" });
I({ "en-gb": "Colon" }), I({ "en-gb": "Comma" }), I({ "en-gb": "Exclamation Mark" }), I({ "en-gb": "Record Separator" }), I({ "en-gb": "Semicolon" }), I({ "en-gb": "Space" }), I({ "en-gb": "Tab" }), I({ "en-gb": "Underscore" }), I({ "en-gb": "Unit Separator" }), I({ "en-gb": "Vertical Bar" });
const hi = 4096;
class di {
  parser = void 0;
  rowBuffer = void 0;
  /** Build parser. */
  buildParser(e) {
    return gt(e);
  }
  /** Parse stream. */
  async parseStream(e, r, n, i, o, s) {
    this.parser = gt(e), this.rowBuffer = this.constructRowBuffer({ chunk: () => {
    }, chunkSize: r.chunkSize ?? hi }), this.parser.on("readable", () => {
      try {
        let c;
        for (; (c = this.parser?.read()) != null; )
          i.throwIfAborted(), this.rowBuffer?.push(c);
      } catch (c) {
        o(c);
      }
    }), this.parser.on("error", (c) => o(c)), this.parser.on("end", () => s(this.constructSummary()));
    const a = await fetch(encodeURI(n), { signal: i });
    if (!a.ok || a.body == null)
      throw await ci(a, `Failed to fetch '${n}' file.`, "datapos-connector-file-store-emulator|Connector|retrieve");
    const l = a.body.pipeThrough(new TextDecoderStream(r.encodingId)).getReader();
    let u = await l.read();
    for (; !u.done; )
      i.throwIfAborted(), await this.writeToParser(u.value), u = await l.read();
    this.parser.end();
  }
  /** Parse string. */
  parseString() {
  }
  /** Construct row buffer. */
  constructRowBuffer(e) {
    let r = [];
    const n = () => {
      r.length !== 0 && (e.chunk(r), r = []);
    };
    return { flush: n, push: (o) => {
      r.push(o), r.length >= e.chunkSize && n();
    } };
  }
  /** Construct summary. */
  constructSummary() {
    return {
      byteCount: this.parser?.info.bytes ?? -1,
      commentLineCount: this.parser?.info.comment_lines ?? -1,
      emptyLineCount: this.parser?.info.empty_lines ?? -1,
      invalidFieldLengthCount: this.parser?.info.invalid_field_length ?? -1,
      lineCount: this.parser?.info.lines ?? -1,
      recordCount: this.parser?.info.records ?? -1
    };
  }
  /** Write to parser. */
  writeToParser(e) {
    return new Promise((r, n) => {
      this.parser?.write(e, (i) => {
        i ? n(i) : r();
      });
    });
  }
}
export {
  di as Tool
};
