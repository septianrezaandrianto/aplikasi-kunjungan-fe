import AppAdmin from "./components/admin/AppAdmin"
import Home from "./components/guest/Home"
import React from 'react';

import { 
  BrowserRouter as Router, 
  Route, 
  Routes 
} from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/*" element = {<AppAdmin/>} />
      </Routes>
  )
}

export default App
