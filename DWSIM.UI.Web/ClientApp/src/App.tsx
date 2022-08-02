import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import LoginIntroPage from "./pages/login-intro.component";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilePicker from './components/file-picker/file-picker.component';

//used only when opening in browser while developing

const  App =()=> {
 

    return <>  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  /> <div className="App">

      <Route path="/" exact component={FilePicker} />

    </div> </>;
  
}

export default App;
