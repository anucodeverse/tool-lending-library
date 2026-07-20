import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App.jsx";


import {
  AuthProvider
} from "./context/AuthContext.jsx";


import {
  Toaster
} from "react-hot-toast";


import ErrorBoundary from "./components/ErrorBoundary.jsx";


import "./index.css";





ReactDOM.createRoot(

  document.getElementById("root")

)
.render(


<React.StrictMode>


<AuthProvider>


<ErrorBoundary>


<App />


</ErrorBoundary>



<Toaster

position="top-right"

reverseOrder={false}

/>



</AuthProvider>



</React.StrictMode>


);