// src/App.js

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            /> */}

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} exact />
              <Route element={<Dashboard />} path="/dashboard" />
              {/* <Route element={<ProfilePage />} path="/me" /> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
