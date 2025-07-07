import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AddPost, EditPost, Home, Login, Post, Signup } from './pages/index.js'
import { AuthContainer } from './components/index.js'
import AllPosts from './pages/AllPost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthContainer authRequired={false}>
            <Login />
          </AuthContainer>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthContainer authRequired={false}>
            <Signup />
          </AuthContainer>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthContainer authRequired>
            {" "}
            <AllPosts />
          </AuthContainer>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthContainer authRequired>
            {" "}
            <AddPost />
          </AuthContainer>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthContainer authRequired>
            {" "}
            <EditPost />
          </AuthContainer>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
