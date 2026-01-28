# Getting Started with Create React Class Life cycle


# What is React? 

React is a JavaScript library for building user interfaces using reusable components. Instead of directly manipulating the DOM, React updates the UI efficiently by using a virtual DOM and re-rendering components whenever their state or props change.

In React, components have a lifecycle that represents different stages in their existence. Each stage provides special methods (called lifecycle methods) that allow you to run code at specific moments.

## A component lifecycle has three main phases:

- Mounting

- Updating

- Unmounting
## 1. Mounting Phase

This phase happens when a component is created and added to the DOM.

The mounting phase includes:

- constructor()

- render()

- componentDidMount()

### constructor()

Runs first when the component is created.

Used for: Initializing state Binding methods

In this project:

```ts
    console.log("Constructor"); 
```

### render()

Responsible for returning JSX (UI).
Runs whenever React needs to display or update the component.

```ts 
console.log("Render");
```

### componentDidMount()

Runs once after the component is fully inserted into the DOM.

Common uses:

- API calls

- Timers

- Event listeners

```ts 
console.log("Mounted");
```

## 2. Updating Phase

Triggered whenever component state or props change.

In this project, clicking Increment updates state.

This causes:

- render()

- componentDidUpdate()

```ts 
console.log("Updated");
```

## 3. Unmounting Phase

Runs when the component is removed from the DOM.

Used for cleanup:

- Clear timers

- Remove listeners

```ts 
console.log("Unmounted");
```

This happens only if React removes the component (not on browser refresh).

Running the Project

Install dependencies:

```ts 
npm install
```

Start the development server:

```ts 
npm start
```

Open in browser:

http://localhost:3000

How to View Lifecycle Logs in Browser

Open your app in the browser → Right-click → Inspect → Go to the Console tab

You will see logs from lifecycle methods.

What You Will See in Console
On initial page load:
Constructor
Render
Mounted

When clicking Increment:
Render
Updated


(This happens every time you click.)

When component is removed (if using toggle):
Unmounted

Explanation:

Initial Load
Constructor → Render → Mounted


Component is created and added to the DOM.

Button Click
Render → Updated


State changes → React re-renders.

Component Removal
Unmounted


Component is destroyed and cleanup runs.

Lifecycle Flow Summary
Mounting:
constructor → render → componentDidMount

Updating:
render → componentDidUpdate

Unmounting:
componentWillUnmount




## 📊 Timeline Visualization

```txt 
Button Click
↓
setState
↓
render()      ← build new virtual DOM
↓
DOM patch
↓
componentDidUpdate()
```