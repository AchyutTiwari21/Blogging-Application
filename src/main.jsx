import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingPage, BlogPage, LoginPage, SignupPage, AddPostPage, UserProfilePage } from './pages'
import EditPostPage from './pages/EditPost-Page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/blog',
        element: <BlogPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/add-post',
        element: <AddPostPage />,
      },
      {
        path: '/edit-post/:Id',
        element: <EditPostPage/>
      },
      {
        path: '/user-profile',
        element: <UserProfilePage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
