---
title: Collisions belong in the Hamiltonian
subtitle: Notes on a unified Hamiltonian formulation for fusion plasmas
date: 2024-12-10
tags: plasma physics, fusion, gyrokinetics
kind: long
---

Standard gyrokinetic theory treats a fusion plasma as almost collisionless. The turbulence lives in a clean Hamiltonian system, and collisions come in afterwards as a small correction.

That split makes the hard question hard to ask. A reactor cares about energy confinement and fusion yield. Those depend on how fast turbulence turns ordered energy into heat, and that conversion is exactly the irreversible part the clean picture leaves out.

In [A Unified Hamiltonian Formulation for Energy Loss, Entropy Evolution, and Fusion Performance in Plasmas](https://arxiv.org/abs/2412.07725) I put the collision operator inside the Hamiltonian structure from the start. The framework then tracks free energy and entropy as the plasma moves from a Maxwellian to a non-Maxwellian distribution, with dissipation and entropy production as part of the dynamics.

The result is a set of quantitative relations between four things:

- turbulence intensity
- entropy production
- energy confinement time
- fusion yield

These link the microscopic kinetics to the numbers a reactor designer uses. The work builds on the energetic bounds and optimal-mode analyses of Helander and Plunk, and on Zhdankin's generalized entropy-production framework.

The later Lynden-Bell series takes the non-Maxwellian side further, with the relaxation physics that decides which distributions a turbulent plasma settles into.
