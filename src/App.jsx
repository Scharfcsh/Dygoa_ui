import './App.css'
import DashBoard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom"
import Grids from './pages/Grids'
import SubGrid from './pages/SubGrid'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path='/grids' element={<Grids />} />
      <Route path='/grids/subgrid' element={<SubGrid />} />


      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App