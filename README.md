# EscolaLMS Software Development Kit

[![codecov](https://codecov.io/gh/EscolaLMS/sdk/branch/main/graph/badge.svg?token=qkNOJG7bLh)](https://codecov.io/gh/EscolaLMS/sdk)
[![Maintainability](https://api.codeclimate.com/v1/badges/55841ab42538f51a42d2/maintainability)](https://codeclimate.com/github/EscolaLMS/sdk/maintainability)
![npm](https://img.shields.io/npm/v/@escolalms/sdk)
![npm](https://img.shields.io/npm/dm/@escolalms/sdk)

The following project contains:

## API Documentation

- Most of what you're looking for is covered by [TypeDoc documentations](https://escolalms.github.io/sdk/).

## Types

- [Types of all API Responses](https://github.com/EscolaLMS/sdk/blob/main/src/types/api.ts)

- [ts-models](https://github.com/EscolaLMS/ts-models) those types are automatically generated

## React

For rapid React application development here is list of

- [React Context](https://github.com/EscolaLMS/sdk/blob/main/src/react/context/index.tsx)
- [React hooks](https://github.com/EscolaLMS/sdk/tree/main/src/react/hooks)
- [React Components](https://github.com/EscolaLMS/sdk/tree/main/src/react/components)

### Context

Simplest React appliaction consuming Wellms Context API would look like

```tsx
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";

declare global {
  interface Window {
    REACT_APP_API_URL: string;
  }
}

const App = () => {
  const { user, courses, fetchCourses } = useContext(EscolaLMSContext);

  useEffect(() => fetchCourses(), []);

  console.log("current user data", user);

  return (
    <React.Fragment>
      <ul>
        {courses.list.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

const API_URL =
  window.REACT_APP_API_URL ||
  (process && process.env && process.env.REACT_APP_PUBLIC_API_URL);

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <EscolaLMSContextProvider apiUrl={API_URL}>
    <App />
  </EscolaLMSContextProvider>
);
```

## API endpoint calls

List of [umi-request](https://github.com/umijs/umi-request) based

- [Frontend App](https://github.com/EscolaLMS/sdk/tree/main/src/services) endpoints
- [Admin](https://github.com/EscolaLMS/sdk/tree/main/src/types) endpoints
