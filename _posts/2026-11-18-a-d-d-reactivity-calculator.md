---
title: A D-D reactivity calculator
subtitle: How often deuterium fuses, at any temperature, in your browser
date: 2026-11-18
tags: fusion, plasma physics, tools
kind: short
---

Laurelin burns deuterium alone. Two deuterons fuse along two branches with almost equal odds: one makes a triton and a proton, the other makes helium-3 and a 2.45 MeV neutron. The rate of both depends steeply on temperature, through the thermal reactivity ⟨σv⟩.

This calculator uses the Bosch and Hale parametrization ([Nuclear Fusion 32, 611, 1992](https://doi.org/10.1088/0029-5515/32/4/I07)), the standard fit, valid from 0.5 to 190 keV. The code is a port of the module we use at Laurelin to check every reactivity number, and it agrees with that module to better than one part in a million. Set the ion temperature and the deuterium density.

```{=html}
<div id="dd-calc">
  <p>
    <label>Ion temperature T (keV) <input id="dd-T" type="number" value="50" min="0.5" max="190" step="any"></label><br>
    <label>Deuterium density n (m⁻³) <input id="dd-n" type="number" value="1e20" min="0" step="any"></label>
  </p>
  <table><tbody id="dd-out"></tbody></table>
  <pre id="dd-plot"></pre>
</div>
<script src="/assets/boxplot.js"></script>
<script src="/assets/dd-reactivity.js"></script>
```

Two things to see. The reactivity rises by about five orders of magnitude between 1 and 50 keV, which is why D-D needs a hotter plasma than D-T. And the branch fractions move with temperature: the neutron branch carries a little more than half of the reactions, and its share grows as the plasma gets hotter. A yield estimate has to use the fraction at the operating temperature.

The power figure counts only the primary reactions. The tritium and helium-3 they make can burn again, which this page leaves out.
