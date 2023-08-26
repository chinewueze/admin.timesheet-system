import React from "react";
import { Route, Routes} from 'react-router-dom';
import { SignIn } from "./components/Login";
import {SpecificReportView } from "./components/ViewSpecificReport"
import {  AdminTimesheetView } from "./components/AdminViewReport";

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/> 
      <Route path="/view-reports" element={< AdminTimesheetView />}/> 
      <Route path="/view-specific-report" element={<SpecificReportView />}/>
      
    </Routes>
  );
}


