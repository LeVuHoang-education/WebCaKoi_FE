import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import TrangChu from "./pages/Trangchu/Trangchu.jsx";

function App() {
  return (
        <div className="App">
            {/* code thanh navbar*/}



            {/*<Routes>*/}
            {/*        <Route path="/"  element={<Homepages />} />*/}
            {/*        <Route path="/admin" element={<Admin />} />*/}
            {/*        <Route path="Dashboard" element={<Dashboard />} />*/}
            {/*        <Route path="ProjectManage" element={<ProjectManage />} />*/}
            {/*        <Route path="SampleProjects" element={<SampleProjects />} />*/}
            {/*        <Route path="ServiceManage" element={<ServiceManage />} />*/}
            {/*        <Route path="UserManage" element={<UserManage />} />*/}

            {/*</Routes>*/}
            <Header/>
            <TrangChu/>
            <Footer/>


        </div>
  )
}

export default App;
