import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticleById from './components/common/ArticleById.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import UserAuthorProvider from './contexts/UserAuthorContext.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx';
import Active from './components/admin/Active.jsx'
import Inactive from './components/admin/Inactive.jsx'
import AllUsersContext from './contexts/AllUsersContext.jsx';

const browserRouterObj = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'signin',
        element: <Signin />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'user-profile/:email',
        element: <UserProfile />,
        children: [
          {
            path: 'articles',
            element: <Articles />
          },
          {
            path: ':articleId',
            element: <ArticleById />
          },
          {
            path: '',
            element: <Navigate to="articles" />
          }
        ]
      },
      {
        path: 'author-profile/:email',
        element: <AuthorProfile />,
        children: [
          {
            path: 'articles',
            element: <Articles />
          },
          {
            path: ':articleId',
            element: <ArticleById />
          },
          {
            path: 'article',
            element: <PostArticle />
          },
          {
            path: '',
            element: <Navigate to="articles" />
          }
        ]
      },
      {
        path:"admin-profile/:email",
        element:<AdminProfile />,
        children:[
          {
            path:'active',
            element:<Active />
          },
          {
            path:'inactive',
            element:<Inactive />
          },
          {
            path: "",
            element: <Navigate to="active" />
          }
        ]
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <UserAuthorProvider>
    <AllUsersContext>
      <RouterProvider router={browserRouterObj} />
    </AllUsersContext>
  </UserAuthorProvider>
)
