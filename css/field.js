// Faint ASCII flux surfaces of a field-reversed configuration, one centered in each side margin.
// Lines are contours of psi drawn with - | / \ along the local direction of the curve.
// The body is opaque, so nothing shows behind the text. Static when reduced motion is on.
(function () {
  var pre = document.createElement("pre");
  pre.id = "field";
  pre.setAttribute("aria-hidden", "true");
  document.body.appendChild(pre);

  var probe = document.createElement("span");
  probe.textContent = "M";
  probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
  pre.appendChild(probe);
  var cw = probe.getBoundingClientRect().width || 9.6;
  var ch = parseFloat(getComputedStyle(pre).lineHeight) || 19.2;
  pre.removeChild(probe);

  var cols, rows, centers, halfW, halfH;
  function size() {
    cols = Math.ceil(innerWidth / cw);
    rows = Math.ceil(innerHeight / ch);
    var bodyW = document.body.getBoundingClientRect().width;
    var marginPx = (innerWidth - bodyW) / 2;
    if (marginPx < 14 * cw) { centers = []; return; }
    var m = marginPx / cw;
    centers = [m / 2, cols - m / 2];
    halfW = (m / 2) * cw * 0.85;                  // separatrix radius, px
    halfH = Math.min(rows * ch * 0.42, halfW * 4); // separatrix half-length, px
  }

  // Normalized flux: closed surfaces inside the separatrix (psi > 0), open lines outside (psi < 0).
  function psiAt(px, py, cx) {
    var r = (px - cx) / halfW, z = py / halfH;
    var r2 = r * r;
    return r2 * (1 - r2 - z * z);
  }

  function level(p, t) {
    return p * 16 + t;
  }

  function glyph(gx, gy) {
    var a = Math.atan2(gy, gx);          // gradient direction; the line runs perpendicular to it
    var d = ((a * 180 / Math.PI) + 360) % 180;
    if (d < 22.5 || d >= 157.5) return "|";
    if (d < 67.5) return "/";
    if (d < 112.5) return "-";
    return "\\";
  }

  function draw(t) {
    var lines = [];
    for (var y = 0; y < rows; y++) {
      var row = "";
      var py = (y + 0.5) * ch - innerHeight / 2;
      for (var x = 0; x < cols; x++) {
        var c = " ";
        for (var k = 0; k < centers.length; k++) {
          var cx = centers[k] * cw, px = (x + 0.5) * cw;
          if (Math.abs(px - cx) > halfW * 1.35) continue;
          var p = psiAt(px, py, cx);
          if (p <= 0) continue; // closed surfaces only
          var l0 = Math.floor(level(p, t));
          var lr = Math.floor(level(psiAt(px + cw, py, cx), t));
          var ld = Math.floor(level(psiAt(px, py + ch, cx), t));
          if (l0 !== lr || l0 !== ld) {
            var gx = (psiAt(px + 1, py, cx) - psiAt(px - 1, py, cx));
            var gy = (psiAt(px, py + 1, cx) - psiAt(px, py - 1, cx));
            c = glyph(gx, gy);
          }
        }
        row += c;
      }
      lines.push(row);
    }
    pre.textContent = lines.join("\n");
  }

  var t = 0;
  function redraw() { size(); draw(t); }
  redraw();
  addEventListener("resize", redraw);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () { t = (t + 0.04) % 1; draw(t); }, 140);
  }
})();
