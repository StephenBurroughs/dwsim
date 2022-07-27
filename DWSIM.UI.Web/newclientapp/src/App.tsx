import React from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {


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

            {/*<Route path="/filepicker/open" exact component={OpenDashboardFilePage} />*/}
            {/*<Route path="/filepicker/save" exact render={(props) => <OpenDashboardFilePage {...{ isSaveDialog: true }} {...props} />} />*/}

            {/*<Route path="/login/intro" exact component={LoginIntroPage} />*/}

        </div> </>;

}

export default App;