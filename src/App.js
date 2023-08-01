import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import PostForm from './components/Post/PostForm';
import Auth from './components/Auth/Auth';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/user" element={<User />} /> */}
        <Route exact path="/user/:userId" element={<User />} />
        <Route exact path="/post" element={<PostForm />} />
        
        <Route exact path="/auth" element={<Auth />} />
        
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        
      </Routes>
    </Router>
  );
}

export default App;
