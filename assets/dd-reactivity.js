// D-D fusion reactivity calculator. Bosch & Hale, Nucl. Fusion 32 (1992) 611, Table VII.
// Ported from Laurelin's verified calcs module (reactivity.py) and checked against it.
// Valid 0.5 to 190 keV.
(function () {
  var BG = 31.3970, MRC2 = 937814.0;
  var C = {
    pT: [5.65718e-12, 3.41267e-3, 1.99167e-3, 0.0, 1.05060e-5, 0.0, 0.0],
    nHe: [5.43360e-12, 5.85778e-3, 7.68222e-3, 0.0, -2.96400e-6, 0.0, 0.0]
  };
  var Q_PT = 4.032647, Q_NHE = 3.268873, E_N = 2.449408;   // MeV, from nuclear masses
  var MEV_J = 1.602176634e-13;

  function sv(c, T) {                                       // m^3/s
    var num = T * (c[1] + T * (c[3] + T * c[5]));
    var den = 1 + T * (c[2] + T * (c[4] + T * c[6]));
    var theta = T / (1 - num / den);
    var xi = Math.cbrt(BG * BG / (4 * theta));
    return c[0] * theta * Math.sqrt(xi / (MRC2 * T * T * T)) * Math.exp(-3 * xi) * 1e-6;
  }
  function calc(T, n) {
    var a = sv(C.pT, T), b = sv(C.nHe, T), tot = a + b;
    var R = 0.5 * n * n;                                    // identical particles
    return { pT: a, nHe: b, tot: tot, fpT: a / tot, fn: b / tot,
             rate: R * tot, nrate: R * b,
             power: R * (a * Q_PT + b * Q_NHE) * MEV_J };
  }
  window.ddReactivity = { sv: sv, calc: calc, C: C };

  var root = document.getElementById("dd-calc");
  if (!root) return;
  var tIn = root.querySelector("#dd-T"), nIn = root.querySelector("#dd-n");
  var out = root.querySelector("#dd-out"), plot = root.querySelector("#dd-plot");
  function e(x, d) { return x.toExponential(d === undefined ? 3 : d).replace("e+", "e"); }

  function drawPlot(T) {
    var COLS = 54, ROWS = 10, cv = BoxPlot(COLS, ROWS), lo = Math.log10(0.5), hi = Math.log10(190);
    function tot(t) { return Math.log10(sv(C.pT, t) + sv(C.nHe, t)); }
    var ymin = tot(0.5), ymax = tot(190);
    function tAt(x) { return Math.pow(10, lo + (hi - lo) * x / (COLS - 1)); }
    function Y(v) { return Math.round((ROWS - 1) * (1 - (v - ymin) / (ymax - ymin))); }
    for (var x = 1; x < COLS; x++) cv.step(x - 1, Y(tot(tAt(x - 1))), x, Y(tot(tAt(x))));
    var mx = Math.round((Math.log10(T) - lo) / (hi - lo) * (COLS - 1)), my = Y(tot(T));
    for (var y = my + 1; y < ROWS; y++) cv.mark(mx, y, "┊");
    cv.mark(mx, my, "●");
    plot.textContent = BoxPlot.frame("<σv> total, m³/s, log-log. ● = T = " + T + " keV", cv.rows(),
      { 0: e(Math.pow(10, ymax), 0), 9: e(Math.pow(10, ymin), 0) }, "0.5 keV", "190 keV");
  }

  function update() {
    var T = parseFloat(tIn.value), n = parseFloat(nIn.value);
    if (!(T >= 0.5 && T <= 190) || !(n > 0)) {
      out.innerHTML = "<tr><td colspan=2>Enter T from 0.5 to 190 keV and a positive density.</td></tr>";
      return;
    }
    var r = calc(T, n);
    var rows = [
      ["<σv> D(d,p)T", e(r.pT) + " m³/s"],
      ["<σv> D(d,n)³He", e(r.nHe) + " m³/s"],
      ["<σv> total", e(r.tot) + " m³/s"],
      ["Branch fractions p-T / n-³He", r.fpT.toFixed(4) + " / " + r.fn.toFixed(4)],
      ["Reaction rate density", e(r.rate) + " /m³/s"],
      ["Neutron rate density (" + E_N.toFixed(2) + " MeV)", e(r.nrate) + " /m³/s"],
      ["Fusion power density (primary)", e(r.power) + " W/m³"]
    ];
    out.innerHTML = rows.map(function (x) {
      return "<tr><th class=\"width-auto\">" + x[0] + "</th><td class=\"width-min\" style=\"white-space:nowrap\">" + x[1] + "</td></tr>";
    }).join("");
    drawPlot(T);
  }
  tIn.addEventListener("input", update);
  nIn.addEventListener("input", update);
  update();
})();
