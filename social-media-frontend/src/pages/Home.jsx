// src/pages/Home.js

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Social Media Platform</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
