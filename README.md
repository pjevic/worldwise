<!-- @format -->

# WorldWise

## Overview

This repository documents advanced React concepts I am learning from my favorite teacher, Jonas Schmedtmann. Below are notes and examples from the WorldWise project.

## Table of Contents

1. [Routing with React Router](#routing-with-react-router)
2. [Adding Navigation with NavLink](#adding-navigation-with-navlink)
3. [Sidebar and PageNav Implementation](#sidebar-and-pagenav-implementation)
4. [Tips & Tricks](#tips--tricks)

---

## Routing with React Router

### Why Use `React Router`?

`React Router` is ideal for:

- Creating single-page applications (SPAs) with multiple views.
- Handling dynamic navigation with path-based routing.
- Managing route-specific components and layouts seamlessly.

### Key Concepts

- **`BrowserRouter`**: Wraps the app to enable routing.
- **`Routes`**: Contains all route definitions for the app.
- **`Route`**: Maps a path to a specific component.
- **Nested Routes**: Define routes within routes to organize the application structure.
- **Fallback Routes**: Catch all unmatched paths with `*`.

### Example: Routing in WorldWise

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>FORM</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Adding Navigation with NavLink

The `NavLink` component from `react-router-dom` provides navigation between routes with automatic active state styling for the currently active link.

### Example: Navigation with NavLink

```jsx
import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
```

### Key Features of NavLink

1. **Active Link Styling**: `NavLink` automatically applies an `active` class to the currently active link.
2. **Custom Styling**: Use the `className` or `style` prop to define custom styles for active and inactive links.
3. **Dynamic Navigation**: Perfect for declarative navigation within React applications.

---

## Sidebar and PageNav Implementation

The `Sidebar` and `PageNav` components enhance the application's structure and layout, ensuring intuitive navigation. They leverage React Router's `Outlet` for rendering nested routes.

### Example: Sidebar Component

```jsx
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
```

### Example: PageNav Component

```jsx
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```

### Explanation

- **Sidebar**: Acts as the main container for the app's navigation and content, utilizing `Outlet` to render nested routes dynamically.
- **PageNav**: A top-level navigation bar offering quick links to primary routes, with active link styling.

---

## Tips & Tricks

1. **Keep Components Small**: Break down your layout into reusable components like `Sidebar`, `PageNav`, and `Footer` for better maintainability.
2. **Dynamic Styling**: Use CSS-in-JS libraries like `styled-components` or `emotion` for scoped and dynamic styling within components.
3. **Error Boundaries**: Implement error boundaries around critical components to handle unexpected crashes gracefully.
4. **Lazy Loading**: Use `React.lazy()` and `Suspense` to load components only when needed, improving performance.

### Example: Implementing Lazy Loading

```jsx
import React, { Suspense, lazy } from "react";

const Pricing = lazy(() => import("./Pricing"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Pricing />
    </Suspense>
  );
}
```
