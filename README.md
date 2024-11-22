<!-- @format -->

# WorldWise

## Overview

This repository documents advanced React concepts I am learning from my favorite teacher, Jonas Schmedtmann. Below are notes and examples from the WorldWise project.

## Table of Contents

1. [Routing with React Router](#routing-with-react-router)
2. [Tips & Tricks](#tips--tricks)

---

## Routing with React Router

### Why Use `React Router`?

`React Router` is ideal for:

- Creating single-page applications (SPAs) with multiple views.
- Handling dynamic navigation with path-based routing.
- Managing route-specific components and layouts seamlessly.

---

### Key Concepts

- **`BrowserRouter`**: Wraps the app to enable routing.
- **`Routes`**: Contains all route definitions for the app.
- **`Route`**: Maps a path to a specific component.
- **Wildcard Routes**: Catch all unmatched paths with `*`.

---

### Example: Routing in WorldWise

#### App Component with Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Tips & Tricks

### ⚡ Ensure Fallback Routes for 404 Handling

To improve user experience, always define a fallback route for unmatched paths. For example:

```jsx
<Route path="*" element={<PageNotFound />} />
```
