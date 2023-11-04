import React from "react";
import { Route, Routes} from 'react-router-dom';
import { SignIn } from "./components/Login";
import {SpecificReportView } from "./components/ViewSpecificReport"
import {  AdminViewAll } from "./components/AdminViewReport";

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/> 
      <Route path="/view-reports" element={< AdminViewAll />}/> 
      <Route path="/view-specific-report/:userId" element={<SpecificReportView />}/>
      
    </Routes>
  );
}


