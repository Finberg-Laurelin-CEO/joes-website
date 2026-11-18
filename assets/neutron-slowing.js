// Neutron slowing-down by elastic scattering. Exact two-body kinematics, isotropic in the CM frame.
// No cross-section data: every number here follows from the target mass number A.
(function () {
  var E0 = 2.45e6, ETH = 0.025;                      // eV: D-D neutron, thermal
  var NUCLEI = [
    ["Hydrogen (¹H)", 1, 1], ["Deuterium (²H)", 2, 2], ["Lithium-6", 6, 6],
    ["Boron-10", 10, 10], ["Carbon", 12, 12], ["Oxygen", 16, 16], ["Iron", 56, 56],
    ["Tungsten", 184, 184], ["Lead", 208, 208]
  ];
  function alpha(A) { return Math.pow((A - 1) / (A + 1), 2); }
  function xi(A) { return A === 1 ? 1 : 1 + alpha(A) / (1 - alpha(A)) * Math.log(alpha(A)); }
  function collisions(A) { return Math.log(E0 / ETH) / xi(A); }
  function walk(A) {                                  // one neutron history: energies after each collision
    var a = alpha(A), E = E0, out = [E];
    while (E > ETH && out.length < 20000) {
      var mu = 2 * Math.random() - 1;
      E = E * ((1 + a) + (1 - a) * mu) / 2;
      out.push(E);
    }
    return out;
  }
  window.neutronSlowing = { alpha: alpha, xi: xi, collisions: collisions, walk: walk };

  var root = document.getElementById("ns-sim");
  if (!root) return;
  var sel = root.querySelector("#ns-A"), plot = root.querySelector("#ns-plot"),
      stat = root.querySelector("#ns-stat"), btn = root.querySelector("#ns-run"), tbl = root.querySelector("#ns-table");
  NUCLEI.forEach(function (n, i) {
    var o = document.createElement("option"); o.value = i; o.textContent = n[0]; sel.appendChild(o);
  });
  tbl.innerHTML = NUCLEI.map(function (n) {
    var A = n[2];
    return "<tr><td>" + n[0] + "</td><td>" + A + "</td><td>" + (100 * (1 - alpha(A))).toFixed(1) +
      "%</td><td>" + xi(A).toFixed(4) + "</td><td>" + Math.round(collisions(A)) + "</td></tr>";
  }).join("");

  var COLS = 56, ROWS = 14;
  function run() {
    var A = NUCLEI[sel.value][2], runs = [], maxN = 0, total = 0;
    for (var k = 0; k < 4; k++) { var w = walk(A); runs.push(w); maxN = Math.max(maxN, w.length - 1); }
    for (var j = 0; j < 400; j++) total += walk(A).length - 1;
    var cv = BoxPlot(COLS, ROWS), lo = Math.log10(ETH), hi = Math.log10(E0);
    function X(i) { return Math.round(i / maxN * (COLS - 1)); }
    function Y(E) { return Math.round((ROWS - 1) * (1 - (Math.log10(Math.max(E, ETH)) - lo) / (hi - lo))); }
    runs.forEach(function (r) {
      for (var i = 1; i < r.length; i++) cv.step(X(i - 1), Y(r[i - 1]), X(i), Y(r[i]));
      cv.mark(X(r.length - 1), Y(r[r.length - 1]), "●");
    });
    plot.textContent = BoxPlot.frame("Neutron energy (log) vs collisions: 4 neutrons in " + NUCLEI[sel.value][0] +
      ". ● = thermal", cv.rows(), { 0: "2.45 MeV", 5: "  1 keV", 9: "   1 eV", 13: "thermal" }, "0", maxN + " collisions");
    stat.textContent = "Mean over 400 simulated neutrons: " + (total / 400).toFixed(0) +
      " collisions to reach thermal. Theory, ln(E0/Eth)/ξ: " + collisions(A).toFixed(0) + ".";
  }
  sel.addEventListener("change", run); btn.addEventListener("click", run);
  run();
})();
