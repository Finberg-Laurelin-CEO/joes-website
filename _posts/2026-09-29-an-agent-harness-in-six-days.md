---
title: An agent harness in six days
subtitle: How Laurelin runs its AI workers
date: 2026-09-29
tags: ai, agents, tools
kind: short
---

Between 24 and 29 September 2026 I built Laurelin's agent harness, a `laurelin` terminal command. It is a fork of Prime Agent with about 10,000 lines of our own code on top: TypeScript extensions, Python, shell, and more than 30 tests. Claude Code sessions wrote most of the code from my briefs.

A coordinator model takes each task, and a router built on Jev, TypeSafe's judgment model, helps decide which worker gets it, mainly Claude Code or Codex. Around that loop sit the parts I care about most: a ladder of checks before a result counts as done, an approval gate that denies by default, a scrubber that keeps secrets out of prompts, and a loop that turns each correction I make into a standing rule.

Its first real job, on 27 September, was a batch of state fusion-policy documents spread across 88 subagents. The code is on [GitHub](https://github.com/Finberg-Laurelin-CEO/laurelin-harness).
