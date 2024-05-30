import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Hero from "./components/Hero";
import Tasks from "./components/Tasks";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Layout>
            <Hero />
          </Layout>
        }
      />
      <Route
        path="/tasks"
        element={
          <Layout>
            <Tasks />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
