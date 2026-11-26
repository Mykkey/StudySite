/* Data-driven diagram renderers. Every diagram is generated from data; no ASCII art.
   Kinds: line, scatter, bar, graph, tree, layers, flow.  Each returns an HTML string. */
(function () {
  var COLS = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c5)'];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function num(v) { return Math.round(v * 100) / 100; }

  function niceTicks(min, max, n) {
    if (min === max) { max = min + 1; }
    var span = max - min, step = Math.pow(10, Math.floor(Math.log10(span / n)));
    var err = (span / n) / step;
    if (err >= 7.5) step *= 10; else if (err >= 3.5) step *= 5; else if (err >= 1.5) step *= 2;
    var start = Math.floor(min / step) * step, out = [];
    for (var v = start; v <= max + step * 0.0001; v += step) out.push(Math.round(v / step) * step);
    return out;
  }
  function fmtTick(v) { return (Math.abs(v) >= 1000 || (Math.abs(v) < 0.01 && v !== 0)) ? v.toExponential(0) : String(Math.round(v * 1000) / 1000); }

  function wrap(svg, caption) { return '<figure class="diagram">' + svg + (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') + '</figure>'; }

  function frame(d, W, H, pad, xs, ys, xl, yl) {
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(d.title || 'chart') + '" xmlns="http://www.w3.org/2000/svg">';
    if (d.title) s += '<text class="svgtext" x="' + W / 2 + '" y="16" text-anchor="middle" font-weight="700">' + esc(d.title) + '</text>';
    var tx = niceTicks(xs.min, xs.max, 6), ty = niceTicks(ys.min, ys.max, 5);
    var X = function (v) { return pad.l + (v - xs.min) / (xs.max - xs.min) * (W - pad.l - pad.r); };
    var Y = function (v) { return H - pad.b - (v - ys.min) / (ys.max - ys.min) * (H - pad.t - pad.b); };
    ty.forEach(function (v) { if (v < ys.min - 1e-9 || v > ys.max + 1e-9) return; s += '<line class="gridline" x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="svgmuted" x="' + (pad.l - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + fmtTick(v) + '</text>'; });
    tx.forEach(function (v) { if (v < xs.min - 1e-9 || v > xs.max + 1e-9) return; s += '<text class="svgmuted" x="' + X(v) + '" y="' + (H - pad.b + 16) + '" text-anchor="middle">' + fmtTick(v) + '</text>'; });
    s += '<line class="axis" x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + (H - pad.b) + '" y2="' + (H - pad.b) + '"/><line class="axis" x1="' + pad.l + '" x2="' + pad.l + '" y1="' + pad.t + '" y2="' + (H - pad.b) + '"/>';
    if (xl) s += '<text class="svgmuted" x="' + (pad.l + (W - pad.l - pad.r) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(xl) + '</text>';
    if (yl) s += '<text class="svgmuted" transform="translate(12 ' + (pad.t + (H - pad.t - pad.b) / 2) + ') rotate(-90)" text-anchor="middle">' + esc(yl) + '</text>';
    return { s: s, X: X, Y: Y };
  }
  function range(series, k, forceMin) {
    var lo = Infinity, hi = -Infinity;
    series.forEach(function (se) { se.points.forEach(function (p) { lo = Math.min(lo, p[k]); hi = Math.max(hi, p[k]); }); });
    if (forceMin != null) lo = Math.min(lo, forceMin);
    if (lo === hi) hi = lo + 1;
    return { min: lo, max: hi };
  }
  function legend(series, W, pad) {
    if (series.length < 2) return '';
    var s = '', x = pad.l + 8;
    series.forEach(function (se, i) { s += '<rect x="' + x + '" y="' + (pad.t + 2) + '" width="10" height="10" rx="2" fill="' + COLS[i % COLS.length] + '"/><text class="svgmuted" x="' + (x + 14) + '" y="' + (pad.t + 11) + '">' + esc(se.name) + '</text>'; x += 24 + String(se.name).length * 6.5; });
    return s;
  }

  function lineScatter(d, scatter) {
    var W = 560, H = 320, pad = { l: 52, r: 16, t: 28, b: 42 };
    var xs = range(d.series, 0), ys = range(d.series, 1, d.yMin != null ? d.yMin : undefined);
    if (d.xMin != null) xs.min = d.xMin; if (d.xMax != null) xs.max = d.xMax; if (d.yMin != null) ys.min = d.yMin; if (d.yMax != null) ys.max = d.yMax;
    var f = frame(d, W, H, pad, xs, ys, d.xLabel, d.yLabel), s = f.s;
    d.series.forEach(function (se, i) {
      var c = COLS[i % COLS.length];
      if (!scatter) {
        s += '<polyline fill="none" stroke="' + c + '" stroke-width="2.5" points="' + se.points.map(function (p) { return num(f.X(p[0])) + ',' + num(f.Y(p[1])); }).join(' ') + '"/>';
        if (se.points.length <= 14) se.points.forEach(function (p) { s += '<circle cx="' + num(f.X(p[0])) + '" cy="' + num(f.Y(p[1])) + '" r="3" fill="' + c + '"/>'; });
      } else {
        se.points.forEach(function (p) { s += '<circle cx="' + num(f.X(p[0])) + '" cy="' + num(f.Y(p[1])) + '" r="5" fill="' + c + '" fill-opacity=".8" stroke="var(--panel)"/>'; });
      }
    });
    (d.hlines || []).forEach(function (h) { s += '<line x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + f.Y(h.y) + '" y2="' + f.Y(h.y) + '" stroke="var(--bad)" stroke-dasharray="5 4"/><text class="svgmuted" x="' + (W - pad.r - 2) + '" y="' + (f.Y(h.y) - 4) + '" text-anchor="end">' + esc(h.label || '') + '</text>'; });
    (d.points || []).forEach(function (p) { s += '<circle cx="' + f.X(p.x) + '" cy="' + f.Y(p.y) + '" r="5" fill="none" stroke="var(--text)" stroke-width="2"/><text class="svgtext" x="' + (f.X(p.x) + 8) + '" y="' + (f.Y(p.y) - 6) + '">' + esc(p.label) + '</text>'; });
    s += legend(d.series, W, pad) + '</svg>';
    return wrap(s, d.caption);
  }

  function bar(d) {
    var W = 560, H = 300, pad = { l: 52, r: 16, t: 28, b: 56 }, n = d.bars.length;
    var max = Math.max.apply(null, d.bars.map(function (b) { return b.value; })), min = Math.min(0, Math.min.apply(null, d.bars.map(function (b) { return b.value; })));
    var f = frame(d, W, H, pad, { min: 0, max: n }, { min: min, max: max }, null, d.yLabel), s = f.s, bw = (W - pad.l - pad.r) / n;
    d.bars.forEach(function (b, i) {
      var x = pad.l + i * bw + bw * 0.15, y = f.Y(Math.max(b.value, 0)), h = Math.abs(f.Y(b.value) - f.Y(0));
      s += '<rect x="' + num(x) + '" y="' + num(y) + '" width="' + num(bw * 0.7) + '" height="' + num(h) + '" rx="3" fill="' + COLS[(b.color != null ? b.color : 0) % COLS.length] + '"/>';
      s += '<text class="svgtext" x="' + num(x + bw * 0.35) + '" y="' + num(y - 4) + '" text-anchor="middle">' + esc(b.value) + '</text>';
      s += '<text class="svgmuted" x="' + num(x + bw * 0.35) + '" y="' + (H - pad.b + 28) + '" text-anchor="middle">' + esc(b.label) + '</text>';
    });
    return wrap(s + '</svg>', d.caption);
  }

  function graph(d) {
    var W = 600, H = d.height || 360, r = d.r || 22, byId = {};
    d.nodes.forEach(function (n) {
      var lab = String(n.label != null ? n.label : n.id), sub = n.sub ? String(n.sub) : '';
      n._hw = Math.max(r, (Math.max(lab.length * 7.2, sub.length * 5.8) + 16) / 2); n._hh = sub ? 22 : r; if (!sub && lab.length <= 3) n._hw = r;
      n._box = !!sub || lab.length > 3;
    });
    var maxHw = Math.max.apply(null, d.nodes.map(function (n) { return n._hw; }));
    for (var i = 0; i < d.nodes.length; i++) for (var j = i + 1; j < d.nodes.length; j++) {
      var A = d.nodes[i], B = d.nodes[j], dxp = Math.abs(A.x - B.x), dyp = Math.abs(A.y - B.y);
      if (dyp / 100 * H < A._hh + B._hh + 6 && dxp > 0) W = Math.max(W, Math.min(1500, (A._hw + B._hw + 30) / (dxp / 100) + 2 * maxHw));
      if (dxp / 100 * W < A._hw + B._hw + 6 && dyp > 0) H = Math.max(H, Math.min(1000, (A._hh + B._hh + 26) / (dyp / 100) + 70));
    }
    d.nodes.forEach(function (n) { n._x = n.x / 100 * (W - 2 * maxHw - 20) + maxHw + 10; n._y = n.y / 100 * (H - 2 * 24 - 20) + 24 + 10; byId[n.id] = n; });
    var byId0 = {}; d.nodes.forEach(function (n) { byId0[n.id] = n; });
    d.edges.forEach(function (e) {
      var A = byId0[e.from], B = byId0[e.to]; if (!A || !B || e.label == null) return;
      var dxp = Math.abs(A.x - B.x), dyp = Math.abs(A.y - B.y), lw = String(e.label).length * 5.6 + 14;
      if (dxp > 0 && dyp / 100 * H < A._hh + B._hh + 6) W = Math.max(W, Math.min(1700, (A._hw + B._hw + lw) / (dxp / 100) + 2 * maxHw + 20));
    });
    d.nodes.forEach(function (n) { n._x = n.x / 100 * (W - 2 * maxHw - 20) + maxHw + 10; });
    function clip(n, ux, uy, pad) { var tx = ux ? (n._hw + pad) / Math.abs(ux) : Infinity, ty = uy ? (n._hh + pad) / Math.abs(uy) : Infinity; if (!n._box) return r + pad; return Math.min(tx, ty); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(d.title || 'graph') + '" xmlns="http://www.w3.org/2000/svg"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>';
    if (d.title) s += '<text class="svgtext" x="' + W / 2 + '" y="14" text-anchor="middle" font-weight="700">' + esc(d.title) + '</text>';
    var labels = '';
    d.edges.forEach(function (e) {
      var a = byId[e.from], b = byId[e.to]; if (!a || !b) return;
      var dx = b._x - a._x, dy = b._y - a._y, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len, arrow = d.directed === false ? 0 : 3;
      var ca = clip(a, ux, uy, 2), cb = clip(b, ux, uy, 2 + arrow);
      var x1 = a._x + ux * ca, y1 = a._y + uy * ca, x2 = b._x - ux * cb, y2 = b._y - uy * cb, mk = d.directed === false ? '' : ' marker-end="url(#ah)"', lx, ly;
      if (e.curve) { var qx = (x1 + x2) / 2 - uy * e.curve, qy = (y1 + y2) / 2 + ux * e.curve; s += '<path class="edge" d="M' + x1 + ' ' + y1 + ' Q ' + qx + ' ' + qy + ' ' + x2 + ' ' + y2 + '"' + mk + '/>'; lx = (x1 + x2) / 4 + qx / 2; ly = (y1 + y2) / 4 + qy / 2; }
      else { s += '<line class="edge" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' + mk + '/>'; lx = (x1 + x2) / 2; ly = (y1 + y2) / 2; }
      if (e.label != null) labels += '<text class="svgmuted halo" x="' + lx + '" y="' + (ly - 4) + '" text-anchor="middle">' + esc(e.label) + '</text>';
    });
    d.nodes.forEach(function (n) {
      var c = n.color != null ? COLS[n.color % COLS.length] : 'var(--accent)';
      s += n._box ? '<rect class="node" x="' + (n._x - n._hw) + '" y="' + (n._y - n._hh) + '" width="' + 2 * n._hw + '" height="' + 2 * n._hh + '" rx="10" style="stroke:' + c + '"/>' : '<circle class="node" cx="' + n._x + '" cy="' + n._y + '" r="' + r + '" style="stroke:' + c + '"/>';
      s += '<text class="svgtext" x="' + n._x + '" y="' + (n._y + (n.sub ? -3 : 4)) + '" text-anchor="middle" font-weight="600">' + esc(n.label != null ? n.label : n.id) + '</text>';
      if (n.sub) s += '<text class="svgmuted" x="' + n._x + '" y="' + (n._y + 12) + '" text-anchor="middle">' + esc(n.sub) + '</text>';
    });
    if (W > 640) s = s.replace('<svg viewBox=','<svg style="width:' + Math.round(W * (W > 640 ? 0.8 : 1)) + 'px;max-width:none" viewBox=');
    return wrap(s + labels + '</svg>', d.caption);
  }

  function tree(d) {
    var leaves = 0, depth = 0;
    (function count(n, dp) { depth = Math.max(depth, dp); if (!n.children || !n.children.length) { n._i = leaves++; } else n.children.forEach(function (c) { count(c, dp + 1); }); })(d.root, 0);
    var W = Math.max(520, leaves * 120), H = 70 + depth * 90;
    (function place(n, dp) { n._y = 36 + dp * 90; if (!n.children || !n.children.length) n._x = 60 + n._i * ((W - 120) / Math.max(leaves - 1, 1)); else { n.children.forEach(function (c) { place(c, dp + 1); }); n._x = (n.children[0]._x + n.children[n.children.length - 1]._x) / 2; } })(d.root, 0);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(d.title || 'tree') + '" xmlns="http://www.w3.org/2000/svg">', nodes = '';
    (function draw(n) {
      var w = Math.max(70, String(n.label).length * 7.2 + 16), leaf = !n.children || !n.children.length;
      (n.children || []).forEach(function (c) {
        s += '<line class="edge" x1="' + n._x + '" y1="' + (n._y + 16) + '" x2="' + c._x + '" y2="' + (c._y - 16) + '"/>';
        if (c.edge) s += '<text class="svgmuted" x="' + ((n._x + c._x) / 2 + 4) + '" y="' + ((n._y + c._y) / 2) + '">' + esc(c.edge) + '</text>';
        draw(c);
      });
      nodes += '<rect class="node" x="' + (n._x - w / 2) + '" y="' + (n._y - 16) + '" width="' + w + '" height="32" rx="' + (leaf ? 16 : 6) + '" style="' + (leaf ? 'stroke:var(--c3)' : '') + '"/><text class="svgtext" x="' + n._x + '" y="' + (n._y + 4) + '" text-anchor="middle">' + esc(n.label) + '</text>';
    })(d.root);
    return wrap(s + nodes + '</svg>', d.caption);
  }

  function layers(d) {
    var L = d.layers, W = 560, H = 300, maxShow = 6, cx = function (i) { return 70 + i * ((W - 140) / Math.max(L.length - 1, 1)); };
    var pos = L.map(function (n, i) { var k = Math.min(n, maxShow), out = []; for (var j = 0; j < k; j++) out.push([cx(i), 40 + (j + 0.5) * ((H - 90) / k)]); return out; });
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(d.title || 'network') + '" xmlns="http://www.w3.org/2000/svg">';
    if (d.title) s += '<text class="svgtext" x="' + W / 2 + '" y="16" text-anchor="middle" font-weight="700">' + esc(d.title) + '</text>';
    for (var i = 0; i < L.length - 1; i++) pos[i].forEach(function (a) { pos[i + 1].forEach(function (b) { s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="var(--border)"/>'; }); });
    pos.forEach(function (col, i) {
      var c = i === 0 ? COLS[0] : i === L.length - 1 ? COLS[2] : COLS[1];
      col.forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="var(--panel)" stroke="' + c + '" stroke-width="2"/>'; });
      if (L[i] > maxShow) s += '<text class="svgmuted" x="' + col[0][0] + '" y="' + (H - 40) + '" text-anchor="middle">&#8942; (' + L[i] + ')</text>';
      s += '<text class="svgmuted" x="' + cx(i) + '" y="' + (H - 18) + '" text-anchor="middle">' + esc((d.labels && d.labels[i]) || (i === 0 ? 'Input' : i === L.length - 1 ? 'Output' : 'Hidden ' + i)) + '</text>';
    });
    return wrap(s + '</svg>', d.caption);
  }

  function flow(d) {
    var h = '<div class="flow">';
    d.steps.forEach(function (st, i) {
      var o = typeof st === 'string' ? { label: st } : st;
      if (i) h += '<span class="arr" aria-hidden="true">' + (d.direction === 'col' ? '&#8595;' : '&#8594;') + '</span>';
      h += '<div class="step"' + (o.color != null ? ' style="border-color:' + COLS[o.color % COLS.length] + '"' : '') + '><b>' + esc(o.label) + '</b>' + (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') + '</div>';
    });
    h += '</div>';
    if (d.direction === 'col') h = h.replace('class="flow"', 'class="flow" style="flex-direction:column;align-items:center"');
    if (d.loopBack) h += '<div class="svgmuted" style="text-align:center;margin-top:4px">&#8617; ' + esc(d.loopBack) + '</div>';
    return wrap(h, d.caption);
  }

  window.Diagrams = {
    kinds: ['line', 'scatter', 'bar', 'graph', 'tree', 'layers', 'flow'],
    render: function (kind, data, caption) {
      var d = Object.assign({}, data, { caption: caption || data.caption });
      try {
        switch (kind) {
          case 'line': return lineScatter(d, false);
          case 'scatter': return lineScatter(d, true);
          case 'bar': return bar(d);
          case 'graph': return graph(d);
          case 'tree': return tree(d);
          case 'layers': return layers(d);
          case 'flow': return flow(d);
        }
      } catch (e) { return '<div class="callout warn">Diagram error (' + esc(kind) + '): ' + esc(e.message) + '</div>'; }
      return '<div class="callout warn">Unknown diagram kind: ' + esc(kind) + '</div>';
    }
  };
})();
