import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import About from './component/about/About';
import Footer from './component/footer/Footer';
import Homepage from './component/homepage/Homepage';
import Signup from './component/signup/Signup';
import Signin from './component/signin/Signin';
import Todo from './component/todo/Todo';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    if (userId) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Homepage/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
