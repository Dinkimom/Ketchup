import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Content from "./content"
import reportWebVitals from "./reportWebVitals"
import { Helpers, Main, Notice } from "./testLanding"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/notice",
    element: <Notice />
  },
  {
    path: "/helpers",
    element: <Helpers />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Content />
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
