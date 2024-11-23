<!-- @format -->

# WorldWise

## Overview

This repository documents advanced React concepts I am learning from my favorite teacher, Jonas Schmedtmann. Below are notes and examples from the WorldWise project.

## Table of Contents

1. [Routing with React Router](#routing-with-react-router)
2. [Adding Navigation with NavLink](#adding-navigation-with-navlink)
3. [Tips & Tricks](#tips--tricks)

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

---

### Adding Navigation with `NavLink`

To enable seamless navigation between routes, the `NavLink` component from `react-router-dom` is used. It allows you to define navigation links that automatically apply an active class when the link's destination matches the current URL.

#### Example: Navigation Component

````jsx

import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

export default PageNav;
```

#### Explanation

1. **`NavLink`**: A specialized version of `Link` that provides styling for active links.
2. **Dynamic Navigation**: Users can navigate between routes without a page reload, creating a seamless SPA experience.
3. **Active Link Styling**: The `NavLink` component automatically applies an `active` class to the link that corresponds to the current route.

---

## Tips & Tricks

### ⚡ Ensure Fallback Routes for 404 Handling

To improve user experience, always define a fallback route for unmatched paths. For example:

```jsx
<Route path="*" element={<PageNotFound />} />
````
