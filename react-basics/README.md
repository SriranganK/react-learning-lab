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

## Key Takeaways

✅ **Virtual DOM** allows React to efficiently update the UI by batching changes

✅ **Lifecycle Methods** give you control over what happens at specific moments in a component's life

✅ **Mounting** sets up the component when it's first created

✅ **Updating** handles changes to state and props

✅ **Unmounting** cleans up resources before removal

Understanding these concepts is essential for building efficient and maintainable React applications!