import { RouterProvider, createBrowserRouter } from "react-router-dom"
import  Layout  from "./components/Layout"
import Home from "./components/Home"
import Profile from "./components/Profile"
import LoadingScreen from "./components/LoadingScreen"

import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import {auth} from "./firebase";
import { useEffect, useState } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "home",
        element: <Home />
      }
    ]
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
`

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async () => {
    //파이어베이스 준비 확인 로직
    await auth.authStateReady();
    setIsLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router}/>}
    </>
  )
}

export default App
