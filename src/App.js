import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './home';
import "leaflet/dist/leaflet.css";
import ServiceFile from './serviceFile';



import ProvidersFile from './providersFile';

import Form from './componets/userform2';
import Auth from './componets/auth';
import Details from './componets/details';
import AdminDashboard from './componets/adminDashboard';
import PendingRequest from './componets/pendingRequest';
import PendingDetails from './componets/pendingDetails';
import RejectedRequest from './componets/rejectedRequest';
import ActiveProviders from './componets/activeProviders';
import TotalUser from './componets/totalUser';
import Setting from './componets/setting';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/services" element={<ServiceFile/>}/>
      
      <Route path="/provider" element={<ProvidersFile/>}/>
   
            <Route path="/userform2" element={<Form/>}/>
            <Route path="/auth" element ={<Auth/>}/>
          <Route path="/details/:id" element={<Details/>} />
          <Route path="/dashboard" element={<AdminDashboard/>}/>
         <Route path="/pending" element={<PendingRequest/>}/> 
          <Route path="/pendingD/:id" element={<PendingDetails/>}/> 
           <Route path="/rejected" element={<RejectedRequest/>}/> 
           <Route path="/activePro" element={<ActiveProviders/>}/> 
           <Route path="/totalUser" element={<TotalUser/>}/> 
             <Route path="/setting" element={<Setting/>}/> 

    </Routes> 
    </BrowserRouter>
   

    </div>
  );
}

export default App;
