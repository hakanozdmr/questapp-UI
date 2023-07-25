import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import PostForm from './components/Post/PostForm';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user" element={<User />} /> */}
        <Route exact path="/user/:userId" element={<User />} />
        <Route exact path="/post" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
