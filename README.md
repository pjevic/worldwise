<!-- @format -->

# WorldWise

## Overview

This repository documents advanced React concepts I am learning from my favorite teacher, Jonas Schmedtmann. Below are notes and examples from the WorldWise project.

## Table of Contents

1. [Routing with React Router](#routing-with-react-router)
2. [Navigation with NavLink](#navigation-with-navlink)
3. [Outlet Implementation](#outlet-implementation)
4. [The URL For State Management](#the-url-for-state-management)
5. [Programmatic Navigation with `useNavigate` and `<Navigate />`](#programmatic-navigation-with-usenavigate-and-navigate-)
6. [Custom Provider and Custom Hook](#custom-provider-and-custom-hook)
7. [Tips & Tricks](#tips--tricks)

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

2. **Link to the Route**: Generate links dynamically using the route parameters and query strings.

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

3. **Retrieve Data from the URL**: Use React Router's `useParams` and `useSearchParams` hooks to extract the route parameters and query parameters.

```jsx
import { useParams, useSearchParams } from "react-router-dom";

const { id } = useParams();
const [searchParams, setSearchParams] = useSearchParams();
```

#### Notes

- **Dynamic Routes**: The `:id` in the route acts as a variable and can be replaced with any specific value (e.g., city ID).
- **Query Parameters**: The `lat` and `lng` values in the query string provide additional contextual information, which is especially useful for map-based apps or filtering.

## Programmatic Navigation with `useNavigate` and `<Navigate />`

```jsx
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <button
        onClick={() => {
          setSearchParams({ lat: 25, lng: 50 });
        }}
      >
        Change Position
      </button>
    </div>
  );
}
```

```jsx
<Route path="app" element={<AppLayout />}>
  <Route index element={<Navigate to="cities" replace />} />
  <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
  <Route path="cities/:id" element={<City />} />
</Route>
```

### Difference between `<Link />`, `navigate`, and `<Navigate />`:

- **`<Link />`**:

  - A declarative navigation component used to create links between routes.
  - Automatically triggers navigation when the link is clicked.
  - Renders an anchor (`<a>`) tag that updates the browser's URL and initiates a route change.
  - Ideal for creating navigable links in the UI, commonly used in JSX.

- **`navigate`**:

  - An imperative function used for programmatically navigating between routes.
  - Can be invoked from anywhere in the component, including event handlers or other functions.
  - Ideal for scenarios where navigation needs to occur based on specific logic or user actions (e.g., button clicks, form submissions).
  - Offers greater control over navigation, such as redirecting, going back/forward in history, or navigating to a specific path.

- **`<Navigate />`**:
  - A component used to programmatically redirect the user to a different route.
  - Renders and immediately triggers a navigation to the specified path when it is mounted.
  - Typically used for automatic redirection, such as after form submissions or authentication checks.
  - Can replace the `navigate` function for simpler, more declarative redirections.

#### `replace` Keyword:

- When `replace={true}` is passed to `<Navigate />`, it prevents the current entry in the history stack from being added, essentially replacing the current route.
- This is useful when you want to redirect without leaving a history entry, which means the user cannot use the browser's "back" button to return to the previous page.

## Custom Provider and Custom Hook

A custom provider allows you to share data and logic across components, while a custom hook simplifies the usage of that context.

### Custom Provider

The custom provider component wraps your app and makes state or logic available to all its descendants.

#### Creating a Custom Provider

```jsx
import { createContext, useState } from "react";

// 1. Create a Context
const CitiesContext = createContext();

// 2. Create a custom provider component
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
```

#### Creating a Custom Hook

```jsx
import { useContext } from "react";

// Create a custom hook to access context
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
```

## Dependency Array Rules

- Every **state variable**, **prop**, and **context value** used inside the effect **MUST** be included in the dependency array.
- Include all **reactive values**—any function or variable that references **any other** reactive value—to avoid "stale closures."
- Do **NOT** use **objects** or **arrays** directly as dependencies (objects and arrays are recreated on each render, and React treats new instances as different).

### Removing Unnecessary Dependencies

#### Removing Function Dependencies

- Move the function **inside the effect** if it’s only needed there.
- If the function is used in multiple places, **memoize it** using `useCallback`.
- If the function does not reference any reactive values, move it **outside the component**.

#### Removing Object Dependencies

- Instead of including the entire object, include **only the specific properties you need** (primitive values).
- If that’s not feasible, apply the same strategies as with functions: **move** or **memoize** the object.

#### Other Strategies

- For **multiple related reactive values**, consider using a reducer with `useReducer` to manage them collectively.
- You do not need to include `setState` (from `useState`) or `dispatch` (from `useReducer`) in the dependencies, as React guarantees their stability across renders.

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

### Key Points:

- **React.lazy**: Dynamically imports the component.
- **Suspense**: Displays a fallback UI (e.g., a loading spinner) while the component is being loaded.

### Button Type

```jsx
export default function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Move Back or Forward with `navigate`

```jsx
<Button
  type="back"
  onClick={(e) => {
    e.preventDefault();
    navigate(-1);
  }}
>
  &larr; Back
</Button>
```

### Key Points:

- **navigate(-1)**: Moves one step back in the browser history.
- **navigate(+1)**: Moves one step forward.
- **Dynamic Navigation**: Use `navigate("/path")` to programmatically redirect to a specific route.
