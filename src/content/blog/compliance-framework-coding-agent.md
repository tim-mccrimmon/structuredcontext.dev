---
title: "The Compliance Framework Your Coding Agent Has Never Seen"
description: "Your coding agent is building systems that will be audited against standards it's never encountered. Here's what changes when you put governance in context."
date: 2026-02-10
tags: ["compliance", "context engineering", "Claude Code", "healthcare AI"]
draft: false
image: "/blog/compliance-framework.png"
imageAlt: "Isometric diagram showing standards documents and compliance frameworks connecting to AI systems"
---

If you're building an AI system in a regulated space, the compliance requirements for that space probably live in your head. You've read the frameworks. You know what "fairness across patient populations" means in practice. When you sit down with a coding agent to build a prior authorization tool, you carry that knowledge.

The coding agent doesn't.

It's making hundreds of decisions — data structures, edge case handling, what gets logged, how errors surface — with no awareness of the standards that govern systems like this. It builds what you ask it to build. If you don't ask about demographic parity, it won't raise it.

This is a structural gap, and it compounds in ways that are easy to miss until you're well into a project.

## How the standard gets to the developer (sort of)

Consider how a framework like the Coalition for Health AI (CHAI) Testing and Evaluation Framework for prior authorization typically reaches a development team.

CHAI publishes the framework. A compliance team at the health plan reads it, interprets it, and writes internal policy. That policy gets summarized into requirements for engineering. A developer gets a ticket — maybe a checklist — representing the third or fourth layer of reinterpretation from the original source. The developer builds, often with a coding agent accelerating the work.

The coding agent may have some general awareness of CHAI — it's in the training data. What it doesn't have is any knowledge of what your organization needs to demonstrate adherence: which version of the T&E Framework you're targeting, how you've interpreted its requirements for your specific use case, or the thresholds your team has committed to. It builds competently from the task at hand — and every decision is technically correct, logically coherent, and completely detached from the governance framework it should be operating within.

The standard and the system being built never actually meet. The developer is the only bridge.

## CHAI as a concrete case

In December 2025, CHAI published its Testing and Evaluation Framework v1.0 for AI-supported prior authorization criteria matching. Thirteen consensus metrics across four principles — accuracy, fairness, scope control, and transparency — developed by over 100 experts from health plans, clinical institutions, and technology organizations.

It is a serious framework. The requirements are specific: measurable benchmarks, defined thresholds, named protected characteristics, explicit trigger conditions. Unlike HIPAA or SOC2, CHAI carries no formal compliance certification — organizations claim adherence by demonstrating alignment with the framework's principles. That makes the standard rigorous but the gap harder to detect: there is no audit cycle forcing the question of whether the system actually reflects the requirements.

But in either case — compliance or adherence — the standard was written for humans to read, internalize, and enforce. A coding agent encounters none of it.

## The experiment

We wanted to see what would happen if that changed.

We transposed the CHAI T&E Framework into structured, machine-readable context using SCS (Structured Context Specification). The result: 24KB, 494 lines, 15 requirements organized into four documents — one per CHAI principle. Every requirement has an identifier, a measurable benchmark, a measurement phase, a responsible role, and implementation guidance.

Here's what the difference looks like.

**As prose** (from CHAI's T&E Framework):

> Prediction accuracy must be consistent across demographic subgroups. Positive Predictive Value must not vary significantly by race, sex, age, language, or disability status. A PPV difference greater than 0.05 across any demographic subgroup triggers mandatory review of training data or thresholding.

**As structured context:**

```yaml
- id: "CHAI-PA-FAIR-001"
  name: "Predictive Parity (PPV Parity)"
  benchmark: "PPV difference >0.05 triggers mandatory review"
  measurement_phase: "pre_and_post_implementation"
  responsible_role: "developer_and_implementer"
  protected_characteristics:
    - "Race/ethnicity"
    - "Sex/gender"
    - "Age"
    - "Primary language"
    - "Disability status"
```

The prose version is written for a human to read and internalize. The structured version is something a coding agent can operate within — a concrete threshold, a defined set of dimensions, a specific trigger condition.

## What we noticed

When the CHAI bundle was in the coding agent's context, it built differently.

It asked about demographic data availability before designing the criteria matching logic — not because we prompted it to, but because the fairness requirement was in its operating context. It flagged scope boundary enforcement as a first-class design constraint: CHAI requires the system to reject clinical judgment queries with 95% accuracy, and the agent surfaced that early, not as an afterthought. Audit trail requirements showed up in the initial architecture rather than as retrofits discovered in a compliance review.

None of this is magic. The agent was responding to explicit requirements that were present in its context. But without that context, those questions never surface. The system gets built without them. And by the time the gap gets found — in a compliance review, a test cycle, a conversation with a health plan — the architecture may already be the wrong shape.

One requirement stood out: CHAI-PA-TRANS-003, "Context Version Auditability" — the requirement that it be possible to determine which governance context an AI agent was operating under at the time of any specific decision. That's not a requirement about what the system does. It's a requirement about how governance context is delivered. Satisfying it means treating governance context as a versioned artifact, not as ambient knowledge in the developer's head.

## What else changes

Something shifts beyond how the system gets built.

When a standard is part of the system's operating context — not just referenced during development but present at runtime — the system can explain its behavior in the language of the standard itself.

Instead of:

> "The system denied this request."

You get:

> "This request was denied because the applicable governance rule requires predictive parity across demographic groups, and the current threshold would violate that constraint."

That's not a small improvement in transparency. Humans no longer need to reverse-engineer decisions or rely on the developer who built the feature to explain what it's doing. The system can be interrogated against declared governance directly.

This doesn't remove the need for human oversight. It gives it better footing. Expert knowledge becomes executable. Intent survives staff turnover. Adherence becomes something that can be continuously demonstrated rather than periodically attested.

## The gap is not specific to CHAI

CHAI is a well-constructed standard applied to a well-understood problem. If this gap exists there, it exists wherever similar standards are being written — for AI systems doing work that once required human professionals.

The structural issue is the same in each case: standards are written for humans to interpret and enforce, but the systems being governed are not human. They don't read policy documents. They don't attend training sessions. They don't carry institutional knowledge from one project to the next. What they respond to is context — and governance context is precisely what they rarely have.

SCS was designed with this in mind — and specifically with standards bodies as part of the picture. For compliance frameworks, a standards body or accreditation organization can publish an official SCS bundle alongside the specification — a versioned, machine-readable artifact that development teams and production systems can consume directly. Compliance checking becomes something that happens inside the system, not only in the audit.

For adherence frameworks like CHAI, the path is more flexible. The standards body can publish an SCS bundle, or the organization building the system can. Either way, the structured context does something the prose specification cannot: it makes your interpretation of the standard explicit — which version you're targeting, which thresholds you've adopted, how you've applied the requirements to your use case. That's not just context for the coding agent. It's a versioned declaration of your adherence posture, something you can point to when the question of "how does your system adhere to CHAI?" comes up.

The CHAI bundle in the [SCS repository](https://github.com/tim-mccrimmon/structured-context-spec) is an example of that second path — a transposition of CHAI's publicly available T&E Framework into structured context, built by a development team rather than CHAI itself. Not an endorsed partnership, not a comprehensive compliance solution, but a reference implementation of what a governance standard looks like when a coding agent can actually use it.

If you're building AI in a regulated space where a similar framework exists — and someone should probably build its structured equivalent — [open an issue](https://github.com/tim-mccrimmon/structured-context-spec/issues).
