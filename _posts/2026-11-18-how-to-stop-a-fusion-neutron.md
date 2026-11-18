---
title: How to stop a fusion neutron
subtitle: Shielding a D-D reactor, from the physics up
date: 2026-11-18
tags: fusion, shielding, nuclear physics, tools
kind: long
---

Half of all D-D fusion reactions make a neutron with 2.45 MeV of kinetic energy. It has no charge, so magnetic fields do not touch it and electrons barely notice it. It leaves the plasma in a straight line and keeps going until it hits a nucleus. A reactor shield has one job: make sure that happens inside the shield.

The trick is that you do not stop a fast neutron. You slow it down first, and then you catch it.

## Where the neutrons come from

A D-D plasma fuses along two branches with almost equal odds:

```
        D(d,n)³He   about 50%                 D(d,p)T   about 50%

             ³He  0.82 MeV                     T  1.01 MeV
               ●                                 ●
                ╲                                 ╲
       D ●━━━━━━▶╳◀━━━━━━● D             D ●━━━━━━▶╳◀━━━━━━● D
                  ╲                                 ╲
                   ○  n  2.45 MeV                    ●  p  3.02 MeV

        the neutron leaves the plasma        both products are charged:
        and heads for the wall               the field holds them
```

The charged products stay in the magnetic field and heat the plasma. The neutron does not. It leaves in a random direction:

```
                  ↖ n            ↑ n            ↗ n
                    ╲            │            ╱
          n ↖        ╭───────────┴──────────╮        ↗ n
             ╲   ╭───╯  ·    ·    ·    ·    ╰───╮   ╱
              ╲──┤   ·    ·    ·    ·    ·    · ├──╱
     n ←─────────┤  ·   hot deuterium plasma  · ├─────────→ n
              ╱──┤   ·    ·    ·    ·    ·    · ├──╲
             ╱   ╰───╮  ·    ·    ·    ·    ╭───╯   ╲
          n ↙        ╰───────────┬──────────╯        ↘ n
                    ╱            │            ╲
                  ↙ n            ↓ n            ↘ n

          every direction, no charge, no magnetic grip
```

Not every neutron has exactly 2.45 MeV. The deuterons that fuse are moving, so the neutron's energy carries their motion, and the line spreads with temperature. Pick an ion temperature:

```{=html}
<div id="bs">
  <p>Ion temperature: <button type="button" data-t="2">2 keV</button> <button type="button" data-t="10">10 keV</button> <button type="button" data-t="30">30 keV</button> <button type="button" data-t="100">100 keV</button></p>
  <pre id="bs-plot"></pre>
  <p id="bs-stat"></p>
</div>
<script src="/assets/boxplot.js"></script>
<script src="/assets/birth-spectrum.js"></script>
```

The spectra come from a Monte Carlo over pairs of deuterons drawn from a Maxwellian, weighted by the Bosch-Hale cross section. They agree with the published fit of [Ballabio, Källne and Gorini (1998)](https://doi.org/10.1088/0029-5515/38/11/310) to within a few keV, though 100 keV is past that fit's range. At 100 keV the peak is almost a full MeV wide and its center moves up, because the pairs that fuse are the fast ones.

## Billiard balls

A neutron loses energy by bouncing off nuclei. The physics is a two-body collision, and the result depends only on the target's mass number *A*. In a head-on hit the neutron keeps a fraction

α = ((A − 1) / (A + 1))²

of its energy. A hydrogen nucleus has almost the neutron's mass, so α = 0 and one head-on hit can stop the neutron dead. A lead nucleus is 208 times heavier, and the neutron bounces off it like a ball off a wall, keeping more than 98% of its energy.

```
        HYDROGEN, A = 1                       LEAD, A = 208

   before                                before
                                                  ┌──────┐
     n ●━━━━▶  ○ p                       n ●━━━━▶ │  Pb  │
                                                  └──────┘
   after                                 after
                                                  ┌──────┐
       n ●      ○━━━━▶ p                 n ◀━━━━● │  Pb  │
       stops      takes it all                    └──────┘
                                         bounces back, keeps 98%
```

Averaged over all angles, the useful number is ξ, the mean drop in the logarithm of the energy per collision. To go from 2.45 MeV to thermal speed (0.025 eV) takes ln(E₀/E_th)/ξ collisions. Pick a nucleus and watch four neutrons slow down:

```{=html}
<div id="ns-sim">
  <p><label>Target nucleus <select id="ns-A"></select></label> <button id="ns-run" type="button">Run again</button></p>
  <pre id="ns-plot"></pre>
  <p id="ns-stat"></p>
  <table>
    <thead><tr><th class="width-auto">Nucleus</th><th class="width-min">A</th><th class="width-min">Max loss per hit</th><th class="width-min">ξ</th><th class="width-min">Hits to thermal</th></tr></thead>
    <tbody id="ns-table"></tbody>
  </table>
</div>
<script src="/assets/neutron-slowing.js"></script>
```

Hydrogen needs about 18 collisions. Iron needs about 500, and lead nearly 2,000. That is the first rule of neutron shielding: **put hydrogen in the wall.** Water, polyethylene, concrete, and metal hydrides all work for this reason.

## Catch it slow

A slow neutron is easy to catch, because capture cross sections grow roughly as 1/v as the neutron slows. Boron-10 is the classic absorber: at thermal energy its capture cross section is about 3,840 barns, more than ten thousand times hydrogen's 0.33 barns. Lithium-6 is the other good choice, and it has a bonus for a fusion machine: each capture makes a triton.

## Then the gammas

Every capture releases energy, usually as a gamma ray. Hydrogen capture emits a 2.22 MeV gamma. Boron-10 capture emits an alpha particle, which stops within microns, and in most captures a 0.48 MeV gamma. Gammas have no use for hydrogen. They are stopped by electrons, so the best gamma shield is the densest material you can afford: lead, tungsten, steel.

So a shield is a sequence, and the order matters:

```
           MODERATE               ABSORB       STOP THE GAMMAS
         ┌──────────────────────┬────────────┬──────────────────┐
         │░░░░░░░░░░░░░░░░░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░░•░░░░░░░░░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░╱░╲░░░░░░░░░•░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░╱░░░╲░░░░░░░╱░╲░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
 n ━━━━━▶│░───•░░░░░•░░░░░•░░░•░│────●∿∿∿∿∿∿∿│∿∿∿∿∿∿×▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░░░░░░╲░░░╱░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░░░░░░░╲░╱░░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░░░░░░░░•░░░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         │░░░░░░░░░░░░░░░░░░░░░░│▒▒▒▒▒▒▒▒▒▒▒▒│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
         └──────────────────────┴────────────┴──────────────────┘
           hydrogen-rich          ¹⁰B or ⁶Li   steel, tungsten, lead

   ━ fast neutron    • collision    ● capture    ∿ gamma    × absorbed
```

Put the dense layer first and two things go wrong. Iron and lead barely slow the neutrons, so they pass through still fast. And heavy nuclei that do capture neutrons emit high-energy gammas of their own, right where you have the least material left to stop them.

In practice real shields mix the layers, because a 2.45 MeV neutron does not slow down in one place and gammas are born all through the wall. Sizing a real shield takes Monte Carlo transport codes and evaluated nuclear data. This page shows the reason the layers sit where they do.

The simulation uses exact elastic-scattering kinematics, isotropic in the center-of-mass frame, and no cross-section data, so it shows how many collisions each nucleus needs. How far a neutron travels between collisions depends on cross sections and density, and this page leaves that out.
