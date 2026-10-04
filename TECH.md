# AI Engineering Roadmap

## Goal

Build from a senior software engineering background into an **AI-focused Software Engineer / AI Engineer** who can design, build, debug, evaluate, and productionize LLM-powered applications and agentic systems from first principles.

The goal is not simply to learn AI terminology or frameworks. The goal is to understand the underlying mechanics well enough to build AI systems yourself and then use frameworks intentionally.

---

# Roadmap Overview

```text
                         AI ENGINEERING
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ FOUNDATION              │
                 │ LLMs + APIs + Tokens    │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V0                     │
                 │ AI Application Plumbing │
                 │ React + Node + SSE      │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V1                     │
                 │ LLM Agent Routing      │
                 │ ← CURRENT              │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V2                     │
                 │ Agent → LLM → Answer   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V3                     │
                 │ Tool Calling            │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V4                     │
                 │ Agent Loops             │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ V5                     │
                 │ State + RAG + Memory    │
                 │ + MCP + Multi-Agent     │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ Production AI           │
                 │ Evaluation              │
                 │ Observability           │
                 │ Reliability             │
                 │ Security                │
                 │ Cost / Latency          │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │ AI Engineer / AI SWE    │
                 └─────────────────────────┘
```

---

# Phase 0 — LLM Foundations

## Goal

Understand what you are actually programming against.

You do not need to become an ML researcher. Focus on the concepts needed to build AI applications.

### LLM fundamentals

Learn:

- Tokens
- Context window
- Input/output tokens
- Temperature
- Structured output
- System/user messages
- Model parameters
- Reasoning vs generation
- Model latency
- Model limits
- Streaming

### API fundamentals

Understand:

```text
Your application
      ↓
LLM API
      ↓
Model
      ↓
Response
```

Learn:

- API authentication
- Request/response
- Streaming
- Errors
- Rate limits
- Retries
- Timeouts
- Token usage
- Cost calculation

---

# Phase 1 — AI Application Engineering

## V0 — AI Application Plumbing

### Architecture

```text
React
  ↓
Express
  ↓
Gemini
  ↓
Agent
  ↓
SSE
  ↓
Redux
  ↓
UI
```

### What this phase teaches

- LLM API integration
- Node.js orchestration
- Server-Sent Events
- Streaming events
- Redux state
- Structured responses
- Frontend/backend integration
- Async execution
- Error handling
- Debugging
- Request lifecycle

### Status

**COMPLETED**

---

# Phase 2 — LLM as a Router

## V1 — Current Phase

### Architecture

```text
User
 ↓
LLM
 ↓
Choose agent
 ↓
Agent
 ↓
Result
```

### Example

User:

```text
"What's the weather tomorrow?"
```

Gemini:

```json
{
  "agent": "weatherAgent"
}
```

Node.js:

```js
agents["weatherAgent"](message);
```

### Concepts learned

#### Structured output

```json
{
  "agent": "weatherAgent"
}
```

#### Schema

```js
required: ["agent"]
```

This means the `agent` field must exist.

#### Enum

```js
enum: AVAILABLE_AGENTS
```

This restricts the returned agent to known agents.

#### Prompt-based routing

```text
weather → weatherAgent
math → calculatorAgent
hello → greetingAgent
```

### Key concept

The LLM is not executing your code.

It is making a decision.

```text
LLM
 ↓
Decision
 ↓
Your code
 ↓
Execution
```

### Status

**COMPLETED / CURRENT MILESTONE**

---

# Phase 3 — Agent Result → LLM → Final Response

## V2

Currently:

```text
User
 ↓
LLM
 ↓
Agent
 ↓
Result
 ↓
User
```

Change it to:

```text
User
 ↓
LLM
 ↓
Agent
 ↓
Result
 ↓
LLM
 ↓
Final response
 ↓
User
```

### Example

```text
User:
"What's the weather?"

        ↓

Router

        ↓

weatherAgent

        ↓

{
  temperature: 31,
  condition: "Sunny"
}

        ↓

LLM

        ↓

"It's currently 31°C and sunny."
```

### Learn

- Multiple LLM calls
- Intermediate state
- Agent result normalization
- Prompting with agent results
- Context construction
- Separating raw data from presentation

### Project

**AI Assistant V2**

---

# Phase 4 — Tool Calling

## V3

Move from:

```text
LLM → Agent
```

to:

```text
LLM → Tool
```

### Architecture

```text
User
 ↓
LLM
 ↓
Tool call
 ↓
Tool
 ↓
Result
 ↓
LLM
 ↓
Answer
```

### Example

User:

```text
"What is 25 × 48?"
```

LLM requests:

```json
{
  "tool": "calculator",
  "arguments": {
    "expression": "25 * 48"
  }
}
```

Application executes the calculator:

```text
25 × 48
 ↓
1200
```

Then the result goes back to the LLM.

### Important concept

The LLM does not execute the tool.

It requests the tool.

```text
LLM decides
      ↓
Structured request
      ↓
Your application
      ↓
Tool execution
      ↓
Result
```

### Build initial tools

- Calculator
- Date/time
- Weather

Then:

- HTTP/API tool
- Database tool
- File tool

---

# Phase 5 — Agent Loop

## V4

Do not assume one tool call is enough.

Build a loop:

```text
             ┌──────────────┐
             │     LLM      │
             └──────┬───────┘
                    ↓
               Tool call
                    ↓
             ┌──────────────┐
             │     Tool     │
             └──────┬───────┘
                    ↓
                 Result
                    │
                    └──────────────→ LLM
```

The LLM decides whether another action is necessary.

### Example

```text
User:
"Find the weather in London and tell me whether I need an umbrella."

LLM
 ↓
Weather tool
 ↓
Rain = true
 ↓
LLM
 ↓
"I'd recommend carrying an umbrella."
```

A more complex execution:

```text
LLM
 ↓
Tool A
 ↓
Result
 ↓
LLM
 ↓
Tool B
 ↓
Result
 ↓
LLM
 ↓
Final answer
```

### Learn

- Agent loops
- Maximum iterations
- Termination conditions
- Intermediate state
- Tool errors
- Retries
- Preventing infinite loops

This is where you start building a real agent.

---

# Phase 6 — State

## V5A

Your current execution is essentially:

```text
request → execution → response
```

Introduce state:

```text
Conversation
     ↓
Messages
     ↓
Agent state
     ↓
Tool results
     ↓
LLM
```

### Learn

- Conversation state
- Short-term memory
- State machines
- Checkpoints
- Execution state
- Resumability

Your existing Redux experience becomes useful here.

---

# Phase 7 — RAG

## V5B

Teach the AI to work with your own data.

### Architecture

```text
Documents
 ↓
Chunking
 ↓
Embeddings
 ↓
Vector database
 ↓
Retrieval
 ↓
LLM
 ↓
Answer
```

### Learn

- Embeddings
- Chunking
- Vector search
- Semantic search
- Metadata filtering
- Retrieval
- Reranking
- Context construction
- Hallucination mitigation

### Project

**AI Documentation Assistant**

Possible data:

- ServiceNow documentation
- Project documentation
- Technical PDFs
- README files

Example:

```text
"How does this component work?"
```

The system retrieves relevant information and generates an answer.

---

# Phase 8 — Memory

## V5C

Understand the difference between conversation state and memory.

### Conversation state

```text
What happened in this conversation?
```

### Memory

```text
What should the system remember across conversations?
```

### Learn

- Short-term memory
- Long-term memory
- User preferences
- Semantic memory
- Memory retrieval
- Memory write policies
- Memory deletion/update

Do not simply store everything in a vector database.

Learn when the system should and should not remember something.

---

# Phase 9 — MCP

## V5D

Learn the Model Context Protocol.

### Concept

```text
LLM
 ↓
Agent
 ↓
MCP
 ├── GitHub
 ├── Filesystem
 ├── Database
 ├── Slack
 └── Other services
```

### Learn

- MCP client
- MCP server
- Tools
- Resources
- Prompts
- Permissions
- Authentication

The goal is to understand how AI systems can interact with external capabilities through a standardized interface.

---

# Phase 10 — Multi-Agent Systems

## V6

Move beyond:

```text
LLM → One Agent
```

to:

```text
                 Orchestrator
                      ↓
             ┌────────┼────────┐
             ↓        ↓        ↓
          Research  Coding   Review
           Agent    Agent     Agent
             ↓        ↓        ↓
            Tools    Tools    Tools
```

Example:

```text
User
 ↓
Orchestrator
 ↓
Research Agent
 ↓
Coding Agent
 ↓
Review Agent
 ↓
Final LLM
 ↓
User
```

### Learn

- Delegation
- Agent communication
- Shared state
- Task dependencies
- Parallel execution
- Sequential execution
- Failure handling
- Agent boundaries

---

# Phase 11 — Production AI Engineering

This phase turns an AI demo into an AI system that can be operated reliably.

## Reliability

Learn:

```text
Timeouts
Retries
Fallback models
Circuit breakers
Rate limits
Idempotency
```

## Observability

You should be able to answer:

> "Why did the AI do that?"

Track:

```text
Request
 ↓
LLM call
 ↓
Prompt
 ↓
Model
 ↓
Tokens
 ↓
Tool
 ↓
Tool result
 ↓
LLM
 ↓
Final answer
```

Learn:

- Traces
- Spans
- Logs
- Latency
- Token usage
- Failures

---

# Phase 12 — Evaluation

A demo working once does not mean your AI system works.

Build evaluation datasets:

```text
Input
Expected behavior
Actual behavior
Score
```

Measure:

- Routing accuracy
- Tool selection
- Answer correctness
- Hallucination
- Retrieval quality
- Latency
- Cost
- Failure rate

Eventually:

```text
100 test cases
       ↓
Run automatically
       ↓
Score
       ↓
Regression detection
```

This is a major transition from AI application development to serious AI engineering.

---

# Phase 13 — Security & Guardrails

## Input

Learn about:

- Prompt injection
- Malicious input
- Data leakage

## Tools

Learn about:

- Permissions
- Authorization
- Dangerous actions

## Output

Learn about:

- Validation
- Structured output
- PII handling
- Unsafe responses

This becomes especially important once agents can actually perform actions.

---

# Phase 14 — Cost & Performance

Understand:

```text
Tokens
 ↓
Cost
 ↓
Latency
 ↓
Model selection
```

Learn:

- Cheap vs expensive models
- Model routing
- Caching
- Prompt optimization
- Context reduction
- Batching
- Streaming
- Latency budgets

Eventually you should be able to answer:

> "Why are we spending X per user?"

---

# Phase 15 — AI Frameworks

Only after understanding the primitives.

Then learn frameworks such as:

- LangChain
- LangGraph
- LlamaIndex

The objective is to understand what these frameworks abstract.

For example:

```text
Framework abstraction
        ↓
LLM call
        ↓
Tool
        ↓
State
        ↓
Agent loop
        ↓
Graph
```

You should be able to build the underlying concepts without relying on the framework.

---

# Phase 16 — AI System Design

Use your existing senior software engineering experience.

Eventually you should be able to design systems such as:

```text
                    User
                     ↓
                  Frontend
                     ↓
                  API Layer
                     ↓
               AI Orchestrator
                     ↓
              ┌──────┴──────┐
              ↓             ↓
           Router          State
              ↓
          Agent Loop
              ↓
       ┌──────┼────────┐
       ↓      ↓        ↓
      RAG   Tools     MCP
       ↓      ↓        ↓
       └──────┼────────┘
              ↓
             LLM
              ↓
           Response
              ↓
         Evaluation
              ↓
        Observability
              ↓
        Cost / Metrics
```

Be able to discuss:

- Architecture
- Scaling
- Latency
- Reliability
- Security
- Cost
- Observability
- Evaluation
- Data privacy
- Model selection

---

# Where You Stand Today

You are not starting from zero.

Your current position:

```text
Software Engineering
████████████████████  Strong

Frontend
████████████████████  Strong

Backend
██████████████░░░░░░  Good

LLM APIs
██████████░░░░░░░░░░  Developing

Agent Architecture
███████░░░░░░░░░░░░░  Early

Tool Calling
██░░░░░░░░░░░░░░░░░░  Not started

RAG
██░░░░░░░░░░░░░░░░░░  Not started

Agent Loops
██░░░░░░░░░░░░░░░░░░  Not started

Evaluation
█░░░░░░░░░░░░░░░░░░░  Not started

Production AI
█░░░░░░░░░░░░░░░░░░░  Not started
```

Your strong software engineering background is the foundation.

The AI layer is what you are building on top of it.

---

# End Goal

You are not trying to become an ML researcher.

You are also not trying to become:

> "A frontend developer who knows how to call GPT."

The target is:

> **A senior software engineer who can architect and build AI-native software systems.**

Your existing skills:

```text
JavaScript / TypeScript
React
Node.js
APIs
Testing
Git
System Design
Software Architecture
```

combined with:

```text
LLMs
+
Agents
+
Tools
+
RAG
+
Memory
+
MCP
+
Evaluation
+
Observability
+
AI System Design
```

should make you capable of building complete AI systems.

---

# Final Skill Stack

```text
                    AI ENGINEER
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
     LLMs             Agents             RAG
       │                 │                 │
       ├─ Prompting      ├─ Routing        ├─ Embeddings
       ├─ Tokens         ├─ Tools          ├─ Retrieval
       ├─ Streaming      ├─ Loops          ├─ Reranking
       ├─ Structured     ├─ State          └─ Vector DB
       │  output         ├─ Memory
       │                 └─ Multi-agent
       │
       ├─────────────────────────────────────┐
       │                                     │
       ▼                                     ▼
 AI Infrastructure                     AI Reliability
       │                                     │
       ├─ APIs                              ├─ Evaluation
       ├─ MCP                               ├─ Observability
       ├─ Queues                            ├─ Retries
       ├─ Caching                           ├─ Guardrails
       └─ Databases                         ├─ Security
                                            └─ Cost
```

---

# Portfolio Projects

Instead of building 20 tiny tutorials, target five substantial projects.

| Project | What it proves |
|---|---|
| **V0 Agent Orchestrator** | LLM routing + streaming + architecture |
| **V2 Tool-Using Assistant** | Agent loops + tool calling |
| **RAG Knowledge Assistant** | RAG + embeddings + retrieval |
| **MCP AI Developer Assistant** | External tools + MCP |
| **Production AI Platform** | Agents + RAG + memory + evaluation + observability |

The final project should become the centerpiece of your AI engineering portfolio.

---

# Final Destination

At the end of this roadmap, you should be able to receive a requirement such as:

> "Build an AI assistant that can understand a user's request, retrieve company knowledge, call internal APIs, perform actions, remember relevant context, and provide an answer."

And independently design and implement:

```text
User
 ↓
Frontend
 ↓
API
 ↓
AI Orchestrator
 ↓
Router
 ↓
Agent Loop
 ├── RAG
 ├── Tools
 ├── MCP
 └── Memory
 ↓
LLM
 ↓
Response
 ↓
Evaluation
 ↓
Observability
 ↓
Cost / Metrics
```

Most importantly, you should be able to explain **why every box exists, what can fail, how to test it, and how to operate it in production.**

---

# Current Milestone

## V1 — LLM-Based Agent Routing

**Status: COMPLETED**

Current architecture:

```text
React
 ↓
Express
 ↓
Gemini Router
 ↓
Agent Selection
 ↓
JavaScript Agent
 ↓
Result
 ↓
SSE
 ↓
Redux
 ↓
UI
```

## Next Milestone

### V2 — Agent Result → LLM → Final Response

Do not rush ahead.

The next project should teach:

```text
User
 ↓
Router LLM
 ↓
Agent
 ↓
Agent Result
 ↓
LLM
 ↓
Final Answer
```

Once this works, move to **V3 Tool Calling**.

---

# The Progression in One Line

```text
LLM API
  ↓
AI Application
  ↓
LLM Router
  ↓
Agent
  ↓
Agent + LLM
  ↓
Tool Calling
  ↓
Agent Loop
  ↓
State
  ↓
RAG
  ↓
Memory
  ↓
MCP
  ↓
Multi-Agent
  ↓
Evaluation
  ↓
Observability
  ↓
Reliability + Security
  ↓
AI System Design
  ↓
AI Engineer
```
