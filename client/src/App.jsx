import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/ProtectedRoute";


import { useAuth } from "./context/useAuth";






function HomeRedirect(){


  const {
    user,
    loading
  } = useAuth();




  if(loading){

    return null;

  }





  return user ? (

    <Navigate
      to="/dashboard"
      replace
    />

  ) : (

    <Navigate
      to="/login"
      replace
    />

  );


}








function App(){


  return (

    <BrowserRouter>


      <Routes>


        {/* Home */}

        <Route

          path="/"

          element={<HomeRedirect />}

        />





        {/* Public Routes */}

        <Route

          path="/login"

          element={<Login />}

        />



        <Route

          path="/register"

          element={<Register />}

        />







        {/* Protected Routes */}


        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />






        <Route

          path="/tools"

          element={

            <ProtectedRoute>

              <Tools />

            </ProtectedRoute>

          }

        />








        {/* 404 */}

        <Route

          path="*"

          element={<NotFound />}

        />



      </Routes>



    </BrowserRouter>

  );


}


export default App;