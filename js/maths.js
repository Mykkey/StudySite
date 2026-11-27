/* Paper-style maths, drawn with the browser's own MathML (no libraries, works offline).
   tex(src)   : a small TeX subset, used for the formula boxes (src/<CODE>/maths.js)
   auto(text) : finds maths written in ordinary text, e.g. "TP/(TP+FP)", and stacks it
   Loads in the browser (window.Maths) and in node (require) so it can be tested. */
(function (root) {
  'use strict';
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function mi(s, upright) { return '<mi' + (upright || s.length > 1 ? ' mathvariant="normal"' : '') + '>' + esc(s) + '</mi>'; }
  function mn(s) { return '<mn>' + esc(s) + '</mn>'; }
  function mo(s, attr) { return '<mo' + (attr || '') + '>' + esc(s) + '</mo>'; }
  function mt(s) { return '<mtext>' + esc(s.replace(/^ | $/g, ' ')) + '</mtext>'; }
  function row(a) { return a.length === 1 ? a[0] : '<mrow>' + a.join('') + '</mrow>'; }
  function frac(a, b) { return '<mfrac>' + a + b + '</mfrac>'; }
  function math(body, block) { return '<math' + (block ? ' display="block"' : '') + '><mrow>' + body + '</mrow></math>'; }
  function tall(h) { return h.indexOf('<mfrac') >= 0; }   /* brackets only grow around something tall */
  function fence(open, inner, close) { var a = ' stretchy="' + tall(inner) + '"'; return '<mrow>' + mo(open, a) + inner + mo(close, a) + '</mrow>'; }

  var GREEK = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', eta: 'η', theta: 'θ', lambda: 'λ', mu: 'μ', phi: 'φ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', omega: 'ω', Omega: 'Ω' };
  var BIG = { sum: '∑', prod: '∏' };
  var FUNCS = { log: 1, ln: 1, exp: 1, max: 1, min: 1, argmax: 1, argmin: 1, tanh: 1, softmax: 1, cos: 1, sin: 1 };
  var CMD = { partial: '∂', times: '×', cdot: '·', le: '≤', ge: '≥', ne: '≠', approx: '≈', propto: '∝', cap: '∩', cup: '∪', 'in': '∈', notin: '∉', setminus: '∖', to: '→', leftarrow: '←', pm: '±', infty: '∞', triangleright: '▷', mid: '∣', dots: '…', Vert: '‖' };

  /* ---------- tex(): TeX subset ---------- */
  function tex(src, block) {
    var i = 0;
    function group() {                         /* {...} or a single token */
      while (src[i] === ' ') i++;
      if (src[i] === '{') { i++; var r = seq('}'); i++; return row(r); }
      return atom();
    }
    function raw() { while (src[i] === ' ') i++; if (src[i] !== '{') throw new Error('expected { in ' + src); var d = 0, s = i + 1; for (; i < src.length; i++) { if (src[i] === '{') d++; else if (src[i] === '}' && --d === 0) break; } return src.slice(s, i++); }
    function atom() {
      var c = src[i], m;
      if (c === '\\') {
        m = /^\\([A-Za-z]+|.)/.exec(src.slice(i)); i += m[0].length; var n = m[1];
        if (n === 'frac') { var a = group(), b = group(); return frac(a, b); }
        if (n === 'sqrt') return '<msqrt>' + group() + '</msqrt>';
        if (n === 'text') return mt(raw());
        if (n === 'var') return mi(raw(), true);
        if (n === 'bar') return '<mover accent="true">' + group() + mo('¯') + '</mover>';
        if (n === 'hat') return '<mover accent="true">' + group() + mo('^') + '</mover>';
        if (n === 'quad') return '<mspace width="1.2em"/>';
        if (n === ',' || n === ';') return '<mspace width="0.3em"/>';
        if (n === '{' || n === '}') return mo(n);
        if (n === '|') return mo('‖');
        if (n === '%') return mo('%');
        if (n === '#') return mo('#');
        if (BIG[n]) return mo(BIG[n], ' largeop="true" movablelimits="false"');
        if (FUNCS[n]) return mi(n, true);
        if (GREEK[n]) return mi(GREEK[n]);
        if (CMD[n]) return mo(CMD[n]);
        throw new Error('unknown command \\' + n + ' in ' + src);
      }
      if ((m = /^\d+(,\d{3})*(\.\d+)?/.exec(src.slice(i)))) { i += m[0].length; return mn(m[0]); }
      if ((m = /^[A-Za-z]+/.exec(src.slice(i)))) { i += m[0].length; return mi(m[0]); }
      i++;
      if (c === '-') return mo('−');
      if (c === '|') return mo(c, ' stretchy="false" lspace="0.08em" rspace="0.08em"');
      if (c === '(' || c === ')' || c === '[' || c === ']') return mo(c, ' stretchy="false"');
      if (c === '@') return mo(c, ' lspace="0" rspace="0"');
      if (c === "'") return mo('′');
      return /[Ͱ-Ͽ]/.test(c) ? mi(c) : mo(c);
    }
    function seq(end) {
      var out = [];
      while (i < src.length && src[i] !== end) {
        var c = src[i];
        if (c === ' ') { i++; continue; }
        if (c === '_' || c === '^') {
          var base = out.pop() || '<mrow></mrow>', big = base.indexOf('<mrow') !== 0 && /largeop|>(max|min|argmax|argmin)</.test(base), sub = null, sup = null;
          while (src[i] === '_' || src[i] === '^') { var k = src[i++]; if (k === '_') sub = group(); else sup = group(); while (src[i] === ' ') i++; }
          var tag = sub && sup ? (big ? 'munderover' : 'msubsup') : sub ? (big ? 'munder' : 'msub') : (big ? 'mover' : 'msup');
          out.push('<' + tag + '>' + base + (sub || '') + (sup || '') + '</' + tag + '>');
          continue;
        }
        if (c === ')' || c === ']') {                      /* gather "( ... )" so a power sits on the whole group */
          var k2 = -1, open = c === ')' ? '(' : '[';
          for (var j = out.length - 1; j >= 0; j--) if (out[j] === mo(open, ' stretchy="false"')) { k2 = j; break; }
          if (k2 >= 0) { i++; var inner = out.splice(k2).slice(1).join(''); out.push(fence(open, inner, c)); continue; }
        }
        var prev = out[out.length - 1] || '';
        if (/>(log|ln|max|min|exp|tanh)<\/mi>/.test(prev) && !/<mo|<mfrac|<mspace/.test(prev) && c !== '(' && c !== '[') out.push('<mspace width="0.17em"/>');
        if ((c === '-' || c === '+') && (!out.length || /^<mo[^>]*>[^<)\]|]<\/mo>$/.test(out[out.length - 1]))) { i++; out.push(mo(c === '-' ? '−' : '+', ' form="prefix" lspace="0" rspace="0"')); continue; }
        out.push(atom());
      }
      return out;
    }
    return math(seq(null).join(''), block);
  }

  /* ---------- auto(): maths inside prose ---------- */
  var WORDS = { DCG: 1, IDCG: 1, nDCG: 1, MAP: 1, MRR: 1, RMSE: 1, MAE: 1, MSE: 1, SSE: 1, SST: 1, PMI: 1, SCQ: 1, NQC: 1, TAM: 1, SLI: 1, SLO: 1, HIT: 1, ILD: 1, RBP: 1, IQR: 1, Net: 1, Hire: 1, Adjustment: 1, Anchor: 1, Quits: 1, Staff: 1, TP: 1, TN: 1, FP: 1, FN: 1, FPR: 1, mean: 1, precision: 1, recall: 1, accuracy: 1, avgdl: 1, idf: 1, gain: 1, score: 1, loss: 1, odds: 1, Stock: 1, Desired: 1, Outflow: 1, Inflow: 1, Gini: 1, Bias: 1 };
  var STOP = { a: 0, an: 1, is: 1, as: 1, of: 1, or: 1, to: 1, in: 1, on: 1, at: 1, by: 1, if: 1, so: 1, it: 1, be: 1, we: 1, do: 1, no: 1, up: 1, us: 1, the: 1, and: 1, for: 1, are: 1, not: 1, one: 1, two: 1, its: 1, was: 1, has: 1, but: 1, can: 1, may: 1, per: 1, how: 1, all: 1, any: 1, use: 1, new: 1, old: 1, add: 1, get: 1, set: 1, see: 1, out: 1, off: 1, now: 1, key: 1, app: 1, day: 1, API: 1, CI: 1, CD: 1, vs: 1, see: 1, Q: 0 };

  function lex(s) {
    var re = /(\s+)|(\d+(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)|(sqrt(?=\s*\()|√)|((?:Σ|∑|Π)(?:_(?:\{[^}]*\}|\([^)]*\)|[A-Za-z0-9]+(?::[^\s()]+)?))?|(?:sum|SUM)_\{[^}]*\})|([A-Za-zͰ-Ͽ](?:[A-Za-z0-9Ͱ-Ͽ]|_(?=[A-Za-z0-9]))*(?:@(?:\d+|k))?)|(<-|<=|>=|->|[=+\-*\/^×·≤≥≈<>∩∪−±∝←→])|([()\[\]|{},])|([\s\S])/g, m, out = [], sp = false;
    while ((m = re.exec(s))) {
      if (m[1]) { sp = true; continue; }
      var type = m[2] ? 'num' : m[3] ? 'sqrt' : m[4] ? 'sum' : m[5] ? 'id' : m[6] ? 'op' : m[7] ? 'br' : 'other';
      if (type === 'id' && /^(sum|SUM)(_[A-Za-z0-9]+)?$/.test(m[0])) type = 'sum';
      out.push({ t: type, v: m[0], s: m.index, e: re.lastIndex, sp: sp }); sp = false;
    }
    /* "x" between two values means multiply */
    for (var i = 1; i < out.length - 1; i++) if (out[i].v === 'x' && out[i].sp && out[i + 1].sp && (out[i - 1].t === 'num' || /[)\]|%]$/.test(out[i - 1].v) || mathWord(out[i - 1].v)) && (out[i + 1].t !== 'other')) { out[i].t = 'op'; out[i].v = '×'; }
    return out;
  }
  function mathWord(v) {
    if (STOP[v]) return false;
    return v.length <= 2 || v.indexOf('@') > 0 || /[_0-9Ͱ-Ͽ]/.test(v) || !!WORDS[v] || !!GREEK[v] || !!FUNCS[v.toLowerCase()] || (v.length <= 3 && /^[A-Z]+$|^(df|tf|cf|dl)/.test(v));
  }

  function ident(v) {
    if (v.indexOf('@') > 0) return mi(v, true);
    var bar = function (x) { return '<mover accent="true">' + x + mo('¯') + '</mover>'; };
    var av = /^mean_([a-z])$/.exec(v); if (av) return '<msub>' + bar(mi('r')) + mi(av[1]) + '</msub>';
    av = /^([a-z])_mean$/.exec(v); if (av) return bar(mi(av[1]));
    var m = /^([^_]+)_(.+)$/.exec(v);
    if (m) { var sub = m[2]; if (sub === 'hat') return '<mover accent="true">' + ident(m[1]) + mo('^') + '</mover>'; return '<msub>' + ident(m[1]) + (/^\d+$/.test(sub) ? mn(sub) : mi(sub.replace(/_/g, ' '))) + '</msub>'; }
    if (GREEK[v]) return mi(GREEK[v]);
    m = /^([A-Za-z])(\d+)$/.exec(v);
    if (m) return '<msub>' + mi(m[1]) + mn(m[2]) + '</msub>';
    return mi(v, !!FUNCS[v]);
  }

  var REL = /^(=|≤|≥|≈|<|>|<=|>=|<-|->|←|→|∝)$/, ADD = /^(\+|-|−|±|∪|∩)$/, MUL = /^(×|\*|·)$/;
  var GLYPH = { '-': '−', '*': '×', '<=': '≤', '>=': '≥', '<-': '←', '->': '→' };

  /* recursive descent over tokens from position p; returns null if no value starts there */
  function parser(tk) {
    var p = 0, flags;
    function peek(k) { return tk[p + (k || 0)]; }
    function is(v) { return tk[p] && tk[p].v === v; }
    function value() {
      var t = tk[p], out, group = false;
      if (!t) return null;
      if (t.t === 'num') { p++; out = mn(t.v); if (peek() && peek().v === '%' && !peek().sp) { p++; out = row([out, mo('%')]); } }
      else if (t.t === 'sqrt') { p++; var g = value(); if (!g) return null; out = '<msqrt>' + (g.inner || g.h) + '</msqrt>'; flags.mark = true; }
      else if (t.t === 'sum') {
        var nx = tk[p + 1];
        if (t.v.indexOf('_') < 0 && !(nx && (nx.t === 'num' || nx.t === 'sqrt' || nx.v === '(' || nx.v === '[' || nx.v === '|' || nx.v === '_' || (nx.t === 'id' && (mathWord(nx.v) || (tk[p + 2] && tk[p + 2].v === '(' && !tk[p + 2].sp)))) && !(nx.v === '(' && tk[p + 2] && tk[p + 2].v === ')'))) return null;
        p++; var big = mo(t.v[0] === 'Π' ? '∏' : '∑', ' largeop="true" movablelimits="false"'), lim = /^(?:Σ|∑|Π|sum|SUM)_(.+)$/.exec(t.v), sub = null;
        if (lim) { var st = lim[1].replace(/^[{(]|[})]$/g, ''); sub = /^[A-Za-z0-9]$/.test(st) ? mi(st) : mt(st.replace(/ not in /g, ' ∉ ').replace(/ in /g, ' ∈ ')); }
        out = sub ? '<munder>' + big + sub + '</munder>' : big; flags.mark = true;
        return { h: out, big: true, kind: 'sum' };
      }
      else if (t.t === 'id') {
        if (!mathWord(t.v) && !(peek(1) && peek(1).v === '(' && !peek(1).sp)) return null;
        p++; out = ident(t.v); if (/_/.test(t.v)) { flags.sub = true; if (/^(mean_[a-z]|[a-z]_(mean|hat)|[A-Za-z]{1,2}_[A-Za-z0-9]{1,2})$/.test(t.v)) flags.mark = true; }
        if (peek() && peek().v === '(' && !peek().sp) { var a = bracket(); if (!a) { p--; return null; } out = row([out, a.h]); return post({ h: out, kind: 'call' }); }
        return post({ h: out, kind: 'id', word: t.v });
      }
      else if (t.v === '(' || t.v === '[' || t.v === '|') { var b = bracket(); if (!b) return null; return post(b); }
      else if (t.t === 'op' && (t.v === '-' || t.v === '−') && peek(1) && !peek(1).sp) { p++; var n = value(); if (!n) { p--; return null; } n.h = row([mo('−'), n.h]); return n; }
      else return null;
      return post({ h: out, kind: t.t, group: group });
    }
    function bracket() {
      var start = p, open = tk[p].v, close = open === '(' ? ')' : open === '[' ? ']' : '|', parts = [];
      p++;
      for (;;) {
        var e = expr();
        if (!e) { p = start; return null; }
        parts.push(e);
        if (is(',')) { p++; parts.push(mo(',')); continue; }
        break;
      }
      if (!is(close)) { p = start; return null; }
      p++;
      var inner = parts.map(function (x) { return x.h || x; }).join('');
      return { h: fence(open, inner, close), inner: open === '|' ? null : '<mrow>' + inner + '</mrow>', kind: 'group' };
    }
    function post(v) {
      while (peek() && ((peek().v === '^' && !peek().sp) || (peek().t === 'other' && peek().v === '_' && !peek().sp))) {
        var op = tk[p].v; p++;
        var x = value(); if (!x) { p--; break; }
        v = { h: '<' + (op === '^' ? 'msup' : 'msub') + '>' + v.h + (x.inner || x.h) + '</' + (op === '^' ? 'msup' : 'msub') + '>', kind: v.kind === 'group' ? 'pow' : v.kind };
        flags.mark = true;
      }
      return v;
    }
    /* a product: factors side by side or joined by x; a spaced "/" divides whole products */
    function term() {
      var fs = [], last;
      for (;;) {
        var save = p;
        if (peek() && MUL.test(peek().v) && fs.length) { p++; var m = value(); if (!m) { p = save; break; } fs.push({ h: mo(GLYPH[tk[save].v] || tk[save].v), op: true }, m); flags.times = true; continue; }
        if (peek() && peek().v === '/' && fs.length) {
          var spaced = peek().sp; p++;
          var d = value(); if (!d) { p = save; break; }
          if (spaced) { var more; while (peek() && !(peek().v === '/') && (MUL.test(peek().v) || startsFactor())) { var q = p, sym = null; if (MUL.test(peek().v)) { sym = peek().v; p++; } more = value(); if (!more) { p = q; break; } d = { h: (d.parts || d.h) + (sym ? mo(GLYPH[sym] || sym) : '') + more.h, kind: 'prod' }; d.parts = d.h; } if (d.parts) d.h = '<mrow>' + d.parts + '</mrow>'; }
          var num = spaced ? fs.splice(0) : [fs.pop()];
          var nOne = num.length === 1 ? num[0] : null;
          if (!okFraction(nOne, d)) { fs = fs.concat(num, [{ h: mo('/'), op: true }, d]); flags.slash = true; continue; }
          var top = nOne && nOne.inner ? nOne.inner : row(num.map(function (x) { return x.h; }));
          fs.push({ h: frac(top, d.inner || d.h), kind: 'frac' }); flags.mark = true; continue;
        }
        if (fs.length && !startsFactor()) break;
        var v = value(); if (!v) { p = save; break; }
        fs.push(v); last = v;
      }
      if (!fs.length) return null;
      return fs.length === 1 ? fs[0] : { h: fs.map(function (x) { return x.h; }).join(''), kind: 'prod' };
    }
    /* juxtaposition: only brackets, sums, roots, calls and symbols continue a product */
    function startsFactor() {
      var t = peek(); if (!t) return false;
      if (t.t === 'sum' || t.t === 'sqrt' || t.v === '(' || t.v === '[') return true;
      if (t.t === 'id') return mathWord(t.v) || !!(peek(1) && peek(1).v === '(' && !peek(1).sp);
      if (t.t === 'num') return !t.sp;
      return t.v === '|' && !!peek(1) && !peek(1).sp;
    }
    function okFraction(a, b) {
      var complex = function (x) { return !x || x.kind === 'group' || x.kind === 'prod' || x.kind === 'call' || x.kind === 'sum' || x.kind === 'pow' || x.kind === 'sqrt'; };
      if (complex(a) || complex(b)) return true;
      flags.plain = true;          /* two bare values: decided by the surrounding run */
      return flags.context;
    }
    function expr() {
      var parts = [], t = term();
      if (!t) return null;
      parts.push(t.h);
      while (peek() && (REL.test(peek().v) || ADD.test(peek().v))) {
        var save = p, o = peek().v; p++;
        var n = term(); if (!n) { p = save; break; }
        parts.push(mo(GLYPH[o] || o), n.h); if (REL.test(o)) flags.rel = true;
      }
      return { h: parts.join('') };
    }
    return function (start, context) {
      p = start; flags = { context: context };
      var e = expr();
      return e && p > start ? { h: e.h, end: p, flags: flags } : null;
    };
  }

  /* split text into [{text}] and [{math, src}] pieces */
  function find(s) {
    var tk = lex(s), parse = parser(tk), out = [], done = 0, i = 0;
    while (i < tk.length) {
      var r = parse(i, false);
      if (!r) { i++; continue; }
      /* "170/200 = 0.85" is a sum; "JDK 11/17" is not. Re-read with that knowledge. */
      if (r.flags.plain && (r.flags.rel || r.flags.times)) r = parse(i, true);
      var a = tk[i].s, b = tk[r.end - 1].e, src = s.slice(a, b);
      var wanted = r.flags.mark || (r.flags.sub && (r.flags.rel || r.flags.times));
      /* paths and lists such as src/main/java are never maths */
      if (/[A-Za-z]{3,}\/[A-Za-z]{3,}\/|:\/\/|\w\.[a-z]{2,4}\b.*\//.test(src) || s[a - 1] === '/' || s[b] === '/') wanted = false;
      if (src.indexOf('(AND)') >= 0 || src.indexOf('(OR)') >= 0) wanted = false;
      if (src.indexOf('PUT') >= 0 || /^0\d|\) \/ \(\d+,/.test(src)) wanted = false;
      if (wanted) { if (a > done) out.push({ text: s.slice(done, a) }); out.push({ math: math(r.h), src: src }); done = b; }
      i = r.end;
    }
    if (done < s.length) out.push({ text: s.slice(done) });
    return out;
  }
  /* HTML for a string: **bold**, `code`, and maths */
  function html(s) {
    var keep = [];
    function hold(h) { keep.push(h); return '\u0001' + (keep.length - 1) + '\u0001'; }
    var t = String(s == null ? '' : s)
      .replace(/`([^`]+)`/g, function (_, c) { return hold('<code>' + esc(c) + '</code>'); })
      .replace(/\*\*/g, '\u0002');
    t = find(t).map(function (x) { return x.math ? hold(x.src.length > 22 ? '<span class="im">' + x.math + '</span>' : x.math) : esc(x.text); }).join('');
    return t.replace(/\u0002([^\u0002]+)\u0002/g, '<b>$1</b>').replace(/\u0002/g, '**').replace(/\u0001(\d+)\u0001/g, function (_, n) { return keep[+n]; });
  }

  var api = { tex: tex, find: find, html: html };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Maths = api;
})(this);
