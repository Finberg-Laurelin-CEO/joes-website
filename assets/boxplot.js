// Character-cell plot drawn with box-drawing lines. Crossing lines join into proper junctions.
window.BoxPlot = function (cols, rows) {
  var U = 1, D = 2, L = 4, R = 8, cell = new Uint8Array(cols * rows), marks = {};
  var CH = { 0: " ", 1: "╵", 2: "╷", 3: "│", 4: "╴", 5: "┘", 6: "┐", 7: "┤", 8: "╶", 9: "└", 10: "┌", 11: "├",
             12: "─", 13: "┴", 14: "┬", 15: "┼" };
  function or(x, y, b) { if (x >= 0 && x < cols && y >= 0 && y < rows) cell[y * cols + x] |= b; }
  function h(x0, x1, y) { if (x1 < x0) { var t = x0; x0 = x1; x1 = t; }
    for (var x = x0; x <= x1; x++) { if (x > x0) or(x, y, L); if (x < x1) or(x, y, R); } }
  function v(x, y0, y1) { if (y1 < y0) { var t = y0; y0 = y1; y1 = t; }
    for (var y = y0; y <= y1; y++) { if (y > y0) or(x, y, U); if (y < y1) or(x, y, D); } }
  function step(x0, y0, x1, y1) { h(x0, x1, y0); v(x1, y0, y1); }   // across, then down/up
  function mark(x, y, ch) { marks[y * cols + x] = ch; }
  function rows_() {
    var out = [];
    for (var y = 0; y < rows; y++) {
      var s = "";
      for (var x = 0; x < cols; x++) s += marks[y * cols + x] || CH[cell[y * cols + x]];
      out.push(s);
    }
    return out;
  }
  return { cols: cols, rows: rows, h: h, v: v, step: step, mark: mark, rows: rows_ };
};
window.BoxPlot.frame = function (title, lines, labels, xl, xr, pad) {
  pad = pad || 9;
  var w = lines[0].length, sp = function (n) { return new Array(n + 1).join(" "); };
  var out = [title, sp(pad) + " ┌" + new Array(w + 3).join("─") + "┐"];
  lines.forEach(function (l, i) { out.push((sp(pad) + (labels[i] || "")).slice(-pad) + " │ " + l + " │"); });
  out.push(sp(pad) + " └" + new Array(w + 3).join("─") + "┘");
  out.push(sp(pad) + "   " + xl + sp(Math.max(1, w - xl.length - xr.length)) + xr);
  return out.join("\n");
};
