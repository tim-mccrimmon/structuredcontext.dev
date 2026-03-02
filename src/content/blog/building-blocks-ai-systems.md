---
title: "The Building Blocks of AI Systems"
description: "What makes an AI system reliable isn't the model — it's the context. A look at how structured context functions as infrastructure."
date: 2025-12-01
tags: ["context engineering", "AI systems"]
draft: false
image: "/blog/buildingblocks.png"
imageAlt: "Isometric diagram showing interconnected components of an AI system"
---

Before discussing techniques, tools, or emerging architectures, it helps to separate the parts of an AI system from the ways those parts are used. Much of the confusion surrounding modern AI comes from collapsing distinct components — models, prompts, retrieval, context, and agents — into a single conceptual blur.

This article steps back and describes these elements plainly: what they are, how they relate to one another, and how they are typically combined in practice. By separating system components from the workflows built on top of them, it becomes easier to reason about behavior, risk, and governance without relying on hype or metaphor.

## The Large Language Model

A Large Language Model (LLM) is a machine learning model trained to predict the next token in a sequence based on the tokens that came before it.

While this definition may sound abstract, it is the most accurate place to begin. At inference time, an LLM does not reason, plan, or understand intent in the human sense. It evaluates probabilities and produces the most likely continuation of the input it receives.

This is not a limitation or a criticism — it is simply how the system functions.

An LLM is a statistical model of language trained on massive corpora of text. During training, internal parameters — known as weights — are adjusted through a controlled learning process. Once training is complete and the model is deployed, those parameters are fixed. Each request is evaluated independently, without awareness of prior interactions.

Because of this, an LLM has no inherent knowledge of your organization, your application, your data, or your previous conversations. If a model appears to "remember" something, that information was included again as part of the current input.

It is equally important to understand what an LLM is not. It is not an agent, not a system, not stateful across requests, and not capable of forming goals or acting as a source of truth. These distinctions are not philosophical — they are operational.

At inference time, LLMs are static by design. They do not learn, adapt, or evolve through use. Interacting with a model does not alter its internal behavior. Any change to the model itself occurs only when a provider releases a new version through retraining or fine-tuning. Until then, the model behaves identically regardless of how often it is used.

This static nature is intentional. It enables predictability, scalability, and controlled versioning — properties organizations already expect from critical infrastructure.

A useful mental model is to think of an LLM as a highly capable function:

```
output = f(input)
```

If important assumptions or constraints are missing from the input, the function still produces an output. It does not pause to ask what it should have been told.

Everything else discussed in this article — prompts, retrieval, context, and agents — exists to shape or constrain that input.

## Chat Windows and APIs

Confusion often arises from mistaking the interface for the model.

Chat windows and APIs are two very different interaction layers built on top of the same underlying LLM, and they create very different expectations around memory and persistence.

Chat interfaces maintain continuity by storing conversation history outside the model. Prior messages are replayed with each turn to create the illusion of memory. This continuity exists entirely in the application layer.

The model itself does not remember.

API interactions, by contrast, are stateless and transactional. Each request includes exactly what the caller provides. If continuity exists, it is because the calling system explicitly supplies it again.

This distinction is important for governance. The model behaves identically in both cases; any persistence or logging occurs in the surrounding system. Security, visibility, and retention are deployment decisions — not intrinsic properties of AI.

A common concern is whether a model is "listening" or accumulating knowledge about an organization over time. From a technical standpoint, this is not how standard large language models operate. At inference time, an LLM processes only the information explicitly included in a request. There is no ambient awareness, background monitoring, or passive listening.

Whether interaction data is logged or retained is a separate question governed by system design, deployment model, configuration settings, and contractual terms — not by the language model itself.

Model behavior and service behavior are often conflated, but they represent very different risk and governance considerations. The relevant questions are familiar ones: how the service is deployed, what data is retained or discarded, what contractual terms govern usage, and what controls exist around access, logging, and deletion.

## Prompts

A prompt is simply the input provided to the model. It defines what is being asked in a single interaction — nothing more.

Once a response is generated, the prompt has no lasting effect unless it is explicitly reintroduced. Prompts do not create memory, establish behavior, or define boundaries on their own.

They are effective for requesting action in the moment, but they are often burdened with responsibilities they were never designed to carry. Prompts can guide output, but they cannot replace system design or governance.

Prompts tell the system what to do now — not how it should operate overall.

## Retrieval-Augmented Generation (RAG)

RAG exists because language models have fixed knowledge, while organizational data is large, dynamic, and continuously changing.

At its core, RAG is a lookup mechanism. When an agent determines that additional information is required, it retrieves relevant material from an external source and includes that material in the model's input.

Architecturally, this is no different from a traditional application issuing a database query.

RAG scales access to information. It does not define behavior, intent, or policy. The retrieval step returns narrow, relevant material — documents, passages, records. Any interpretation or synthesis occurs later, inside the language model.

RAG does not change the model. It does not create memory. It does not establish constraints.

It supplies facts, not judgment.

## Context

Context defines the operating environment in which an AI system is allowed to function.

Unlike prompts or retrieval, context does not instruct execution. It establishes assumptions, boundaries, and constraints that apply consistently across interactions.

Context answers questions such as:

- What kind of system is this?
- What rules apply here?
- What is out of bounds, even if requested?

Context is not a task description, a procedure, or memory of prior interactions. If an AI system behaves consistently over time, it is because context has been applied consistently — not because the model remembers.

From an organizational standpoint, context functions as a governance layer. It plays the same role as architectural constraints, compliance requirements, and policy frameworks in traditional systems.

Context defines where action is permitted — not how action is performed.

## Agents

Agents are the components that perform work.

An agent is a purpose-built module designed to carry out a specific, well-defined task within a larger workflow. Well-designed agents are intentionally narrow. They do one thing, and they do it well.

Well-designed agents are defined explicitly: by role, scope, tools, persona, and shared context. This definition is inspectable and deterministic. Poorly designed agents lack these boundaries — and behave accordingly.

The language model does not replace the agent. The agent carries the model as a capability. When interpretation or language generation is required, the agent consults the model — but the agent definition determines how and where that capability may be used.

This is not autonomy. It is framing — establishing the boundaries within which the model operates so that its outputs serve the agent's defined purpose rather than drifting toward plausible but unintended behavior.

Agents mirror long-standing software principles: small components, limited scope, and explicit boundaries. Governance is designed in, not added later.

## Two Agentic Patterns

The same building blocks — models, prompts, retrieval, context, and agents — behave very differently depending on how they are used.

In practice, agentic systems fall into two broad categories.

In software development, agents function as assistive tools. Humans remain in the loop. Errors are inexpensive and reversible. Prompts can be informal, context incomplete, and retrieval ad hoc because judgment is supplied by the developer.

In agentic applications, agents become operational components. Execution may be automated. Outputs may trigger real-world actions. Errors now carry cost, risk, and compliance implications.

In this environment, assumptions must be explicit. Boundaries must be defined in advance. Governance cannot rely on human correction.

The components are the same. The expectations are not.

## Wrap-Up

Modern AI systems are often treated as mysterious or fundamentally new. In practice, they are best understood as the next evolution of software — powerful, flexible, and capable, but still governed by architectural principles.

Throughout this article, the goal has been to separate:

- what the components are
- how they are used
- where responsibility and risk actually live

Language models provide capability, not judgment. Prompts request action, but do not define behavior. RAG retrieves information, but does not interpret it. Context establishes boundaries, but does not execute. Agents perform work, but only within the space they are given.

When these elements are conflated, AI systems appear unpredictable or unsafe. When they are clearly defined and deliberately combined, behavior becomes far easier to reason about.

AI does not invent its operating environment. If assumptions and constraints are left implicit, the system will infer them — often plausibly, sometimes incorrectly. That is not a failure of intelligence. It is a failure of definition.

None of this requires new metaphors or magic. It requires treating AI systems the same way other critical software systems are treated: by clearly defining roles, responsibilities, boundaries, and controls.

When those are explicit, AI stops feeling mysterious — and starts behaving like the engineered system it actually is.
