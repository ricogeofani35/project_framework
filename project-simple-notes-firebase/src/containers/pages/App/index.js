import './App.css';
import { Route,BrowserRouter as Router, Routes} from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'



function App() {
  return (
    // bungkus dengan Profider lalu beri store / props wajibnya
    <Provider store={store}>
       <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </Router>
    </Provider>
   
  );
}

export default App;
