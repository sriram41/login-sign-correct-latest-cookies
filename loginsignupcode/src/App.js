import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/login2';
import Signup from './component/signup2';
import Protectrouter from './component/protectrouter';
import Dashboard from './component/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}  />
          <Route path="/login" element={<Login/>}  />
          <Route path="/signup" element={<Signup/>}  />
          <Route path="/dashboard" element={
            <Protectrouter>

            <Dashboard/>
            </Protectrouter> }  />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
