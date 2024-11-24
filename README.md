<!-- @format -->

# WorldWise

## Overview

This repository documents advanced React concepts I am learning from my favorite teacher, Jonas Schmedtmann. Below are notes and examples from the WorldWise project.

## Table of Contents

1. [Routing with React Router](#routing-with-react-router)
2. [Navigation with NavLink](#navigation-with-navlink)
3. [Outlet Implementation](#outlet-implementation)
4. [The URL For State Management](#the-url-for-state-management)
5. [Tips & Tricks](#tips--tricks)

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
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Navigation with NavLink

The `NavLink` component from `react-router-dom` provides navigation between routes with automatic **active** state styling for the currently active link.

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
      </ul>
    </nav>
  );
}
```

### Key Features of NavLink

1. **Active Link Styling**: `NavLink` automatically applies an `active` class to the currently active link.
2. **Custom Styling**: Use the `className` or `style` prop to define custom styles for active and inactive links.
3. **Dynamic Navigation**: Perfect for declarative navigation within React applications.

### The core difference between `<Link />` and `<NavLink />` in React:

- **`<Link />`**: Used for basic navigation between routes without additional styling or behavior.

- **`<NavLink />`**: Enhances `<Link />` by automatically applying styling or classes when the link matches the current route, indicating it is **active**.

---

## Outlet Implementation

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
      </ul>
    </nav>
  );
}
```

### Explanation

- **Sidebar**: Acts as the main container for the app's navigation and content, utilizing `Outlet` to render nested routes dynamically.
- **PageNav**: A top-level navigation bar offering quick links to primary routes, with active link styling.

---

## The URL for State Management

- The URL is an **easy-to-use global storage** for state, accessible by all components in the app.
- It provides a **simple way to pass data** from one page to the next using query parameters.
- Enables users to **bookmark and share** the exact UI state of the page at a specific moment.

### Implementation of Dynamic Routes with URL Parameters

1. **Create a Route**: Define a dynamic route in your `Routes` configuration. The `:id` is a placeholder for dynamic segments.

```jsx
<Route path="cities/:id" element={<City />} />
```

2. **_Link to the Route_**: Generate links dynamically using the route parameters and query strings.

```jsx
<li>
  <Link
    to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    className={styles.cityItem}
  >
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.name}>{cityName}</h3>
  </Link>
</li>
```

3. **_Retrieve Data from the URL_**: Use React Router's useParams and useSearchParams hooks to extract the route parameters and query parameters.

```jsx
import { useParams, useSearchParams } from "react-router-dom";

const { id } = useParams();
const [searchParams, setSearchParams] = useSearchParams();
```

#### Notes

- **Dynamic Routes**: The `:id` in the route acts as a variable and can be replaced with any specific value (e.g., city ID).
- **Query Parameters**: The `lat` and `lng` values in the query string provide additional contextual information, which is especially useful for map-based apps or filtering.
- **useParams and useSearchParams**: These hooks simplify accessing route and query parameters in your components.

## Tips & Tricks

**Lazy Loading**: Use `React.lazy()` and `Suspense` to load components only when needed, improving performance.

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
