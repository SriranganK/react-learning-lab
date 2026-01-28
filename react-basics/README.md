# Getting Started with React Class Lifecycle

Learn how React manages component lifecycles and the virtual DOM to build efficient and reactive user interfaces.

## What is React? 

React is a JavaScript library for building user interfaces using reusable components. Instead of directly manipulating the DOM, React updates the UI efficiently by using a virtual DOM and re-rendering components whenever their state or props change.

In React, components have a lifecycle that represents different stages in their existence. Each stage provides special methods (called lifecycle methods) that allow you to run code at specific moments.

### What is Virtual DOM?
#### Short definition:

The Virtual DOM is a lightweight JavaScript object representation of your real DOM.
It is NOT real HTML.It is just plain JS objects stored in memory.

Example

You write JSX:
```html
<h1>Hello</h1>
```

React converts it internally to something like:

```js 
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```


That object is Virtual DOM.

### Where does Virtual DOM live?
In JavaScript memory (RAM)

It exists only inside React runtime memory.

The browser never sees it directly.

### How React uses Virtual DOM

When state changes:

1️⃣ New Virtual DOM created
2️⃣ React compares old vs new Virtual DOM

(diffing / reconciliation)

3️⃣ Calculates minimal changes
4️⃣ Updates real DOM

This is why React is fast.
React does NOT update full DOM.
It patches only changed nodes.

Can you console Virtual DOM?
NO.

React does NOT expose it publicly.

But you can inspect React Elements

Example:
```js

console.log(
  React.createElement("h1", null, "Hello")
);
```

Output:
```
{
  $$typeof: Symbol(react.element),
  type: "h1",
  props: { children: "Hello" }
}
```

That’s basically Virtual DOM representation.

### Where React Stores Virtual DOM

Internally React keeps:

- **Fiber Tree** (modern VDOM representation)
- **React Elements** (component descriptors)
- **Work queues** (batch updates)

All stored inside JavaScript heap memory.

---

## Understanding Component Lifecycle

Now that we understand how React's Virtual DOM works under the hood, let's explore **Component Lifecycle**. 

The lifecycle is a series of methods that get called at different points in a component's life—from creation to destruction. These methods give you the power to hook into specific moments and run custom code, making your components more powerful and flexible.

**Why is this important?**
- Fetch data at the right time
- Clean up resources (timers, listeners)
- Update components efficiently
- Respond to state and prop changes

React class components have well-defined lifecycle methods that make this possible. Let's dive into each phase:

---

## Component Lifecycle Phases

A component lifecycle has **three main phases**:

1. **Mounting** — Component is created and added to the DOM
2. **Updating** — Component receives new props or state changes
3. **Unmounting** — Component is removed from the DOM
## 1. Mounting Phase

This phase happens when a component is created and added to the DOM.

**Methods called during mounting (in order):**
- `constructor()`
- `render()`
- `componentDidMount()`

### constructor()

Runs **first** when the component is created.

**Used for:**
- Initializing state
- Binding event handler methods

**In this project:**
```ts
console.log("Constructor"); 
```

### render()

Responsible for returning JSX (the UI).

Runs every time React needs to display or update the component.

```ts 
console.log("Render");
```

### componentDidMount()

Runs **once** after the component is fully inserted into the DOM.

**Common uses:**
- Making API calls to fetch data
- Setting up timers or intervals
- Adding event listeners
- Integrating with third-party libraries

```ts 
console.log("Mounted");
```

## 2. Updating Phase

Triggered whenever the component's **state or props change**.

In this project, clicking the "Increment" button updates the state, which causes:

- `render()` — Re-render with new state
- `componentDidUpdate()` — Runs after the update is applied

```ts 
console.log("Updated");
```

## 3. Unmounting Phase

Runs when the component is **removed from the DOM**.

**Used for cleanup:**
- Clearing timers and intervals
- Removing event listeners
- Canceling API requests
- Unsubscribing from observables

```ts 
console.log("Unmounted");
```

> **Note:** This only happens if React removes the component. It won't run on browser refresh.

## How to Run This Project

### Install Dependencies

```ts 
npm install
```

### Start Development Server

```ts 
npm start
```

### Open in Browser

Navigate to `http://localhost:3000`

## Viewing Lifecycle Logs in Console

1. Open your app in the browser
2. Right-click → **Inspect** (or press `Cmd + Option + I`)
3. Navigate to the **Console** tab
4. You will see logs from the lifecycle methods

### Example Console Output

**On initial page load:**
```
Constructor
Render
Mounted
```

**When clicking Increment button:**
```
Render
Updated
```
(This repeats every time you click.)

**When component is removed:**
```
Unmounted
```

## Understanding the Lifecycle Flow

### What Happens During Initial Load
**Order:** Constructor → Render → componentDidMount

The component is created, rendered to JSX, and then fully mounted to the DOM.

### What Happens on Button Click
**Order:** render → componentDidUpdate

State changes, React re-renders the component, and the update method runs after the DOM is updated.

### What Happens on Component Removal
**Order:** componentWillUnmount

The component is cleaned up and removed from the DOM.

---

## Lifecycle Flow Summary

```
MOUNTING
  ├─ constructor()
  ├─ render()
  └─ componentDidMount()

UPDATING (when state/props change)
  ├─ render()
  └─ componentDidUpdate()

UNMOUNTING
  └─ componentWillUnmount()
```


## Visual Timeline

Here's what happens when you interact with the component:

```txt 
USER CLICKS INCREMENT BUTTON
        ↓
    setState()
        ↓
   render()      ← Builds new Virtual DOM
        ↓
   DOM Patch     ← React compares Virtual DOM and updates real DOM
        ↓
componentDidUpdate()  ← Component update complete
```

---

## Functional Components — How Hooks Actually Work (Simple Mental Model)

Almost everyone struggles with functional components at first, especially if they already understand class components.

**The reason?**

- Class components feel "real" (objects, lifecycle methods, this.state)
- Functional components feel magical ("how does a simple function remember state??")

Let's remove the magic. I'll explain this in the simplest mental model possible.

No buzzwords. No Fiber yet. Just reality.

### Understanding Functions Don't Remember State

First, forget React for 30 seconds and look at a normal JS function:

```js
function demo() {
  let count = 0;
  count++;
  console.log(count);
}

demo(); // 1
demo(); // 1
demo(); // 1
```

Why always 1?

Because:
- Function runs
- Variables die
- Function runs again
- Variables recreated

**Functions DO NOT remember anything.**

**That's the key problem React had to solve.**

### How React Remembers State

Then how does this work?

```js
const [count, setCount] = useState(0);
```

**The Truth (Important):**
- React does NOT store state inside your function
- Your function is stateless
- React stores state OUTSIDE your function

### React's Memory Management

React creates a memory box (Fiber Node) for each component that stores:
- State array
- Effects
- Refs

**Example:**
```
Fiber Node:
  hook[0] = 0
```

🔄 What actually happens

### What Actually Happens
First render

React:

Calls your function

MyComponent()

Sees:

useState(0)

Stores:

hook[0] = 0

Returns UI.

Click button

You call:

setCount(1)

React:

👉 updates Fiber hook[0] to 1
👉 re-calls function

Second render

React again calls:

MyComponent()

But now:

hook[0] = 1

So React gives you:

count = 1

🔥 Your function thinks it “remembered”.

But React injected it.

🎯 Mental Model (MOST IMPORTANT)
Functional Component = Pure Function

React = Memory Manager

You write:

function Counter() {
  const [count] = useState(0);
}

Reality:

React:
  stores count

You:
  just receive it

🧩 Visual
React Memory
-------------
count = 2

↓

Function runs

↓

count becomes available

↓

JSX returned

🔥 Hooks are POSITIONAL

React does:

hook[0]
hook[1]
hook[2]

That’s why hooks must be:

❌ not in if
❌ not in loops

Order must stay same.

⚡ Lifecycle in Functional Components

There is NO lifecycle.

Only:

👉 Re-execution

Every render = function runs again.

`useEffect` replaces lifecycle:

```js
useEffect(() => {
  console.log("Mounted");

  return () => console.log("Unmounted");
}, []);
```

🧠 Compare with Class
Class:
object exists
state stored on object
methods called

Functional:
no object
function runs
React injects state
hooks connect to memory

---

## Endnotes

If you want, I can add diagrams or a small interactive example to demonstrate hooks and the memory model visually.


## Key Takeaways

✅ **Virtual DOM** allows React to efficiently update the UI by batching changes

✅ **Lifecycle Methods** give you control over what happens at specific moments in a component's life

✅ **Mounting** sets up the component when it's first created

✅ **Updating** handles changes to state and props

✅ **Unmounting** cleans up resources before removal

Understanding these concepts is essential for building efficient and maintainable React applications!