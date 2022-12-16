import 'antd/dist/antd.css';
import './App.css'


import {Routes, Route} from 'react-router-dom';
import OrderAdmin from "./Components/Order";
import NewOrder from './Components/NewOrder';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/order" element={<OrderAdmin/>}/>
      <Route exact path="/neworder" element={<NewOrder/>}/>
      </Routes>
    </div>
  );
}

export default App;