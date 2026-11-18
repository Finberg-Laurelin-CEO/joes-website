// D-D neutron birth spectra at several ion temperatures. Data: Monte Carlo over Maxwellian deuteron pairs
// with the Bosch-Hale D(d,n)3He cross section; agrees with the Ballabio et al. (1998) fit.
(function () {
  var root = document.getElementById("bs"); if (!root) return;
  var plot = root.querySelector("#bs-plot"), stat = root.querySelector("#bs-stat"), btns = root.querySelectorAll("button");
  var STATS = { "2": [2459, 117], "10": [2482, 264], "30": [2531, 467], "100": [2682, 900] };   // mean, FWHM keV
  fetch("/assets/dd-birth-spectra.json").then(function (r) { return r.json(); }).then(function (data) {
    function show(T) {
      var COLS = 56, ROWS = 12, cv = BoxPlot(COLS, ROWS), d = data[T], E = d.E, h = d.h;
      var lo = 1.5, hi = 4.0, ymax = 0;
      Object.keys(data).forEach(function (k) { ymax = Math.max(ymax, Math.max.apply(null, data[k].h)); });
      function col(e) { return Math.round((e - lo) / (hi - lo) * (COLS - 1)); }
      var bins = new Array(COLS).fill(0);
      for (var i = 0; i < E.length; i++) { var c = col(E[i]); if (c >= 0 && c < COLS) bins[c] = Math.max(bins[c], h[i]); }
      function Y(v) { return Math.round((ROWS - 1) * (1 - v / ymax)); }
      for (var x = 1; x < COLS; x++) cv.step(x - 1, Y(bins[x - 1]), x, Y(bins[x]));
      var c0 = col(2.449);
      for (var y = 0; y < ROWS; y++) if (y !== Y(bins[c0])) cv.mark(c0, y, "┊");
      plot.textContent = BoxPlot.frame("Neutron energy spectrum at T = " + T + " keV (┊ = 2.45 MeV)", cv.rows(),
        { 0: "peak", 11: "0" }, "1.5 MeV", "4.0 MeV", 6);
      stat.textContent = "Mean " + (STATS[T][0] / 1000).toFixed(3) + " MeV, full width at half maximum " + STATS[T][1] + " keV.";
      btns.forEach(function (b) { b.style.fontWeight = b.dataset.t === T ? "800" : ""; });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(b.dataset.t); }); });
    show("10");
  });
})();
