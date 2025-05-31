import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from "./components/task/Task.jsx";
import Login from "./components/login/login.jsx";
import SignUp from "./components/register/register.jsx";
import Nav from "./components/NavBar/Nav.jsx";
import HomePage from "./components/Pages/Home.jsx";
import EditTask from "./components/task/EditTask.jsx";
import NotFoundPage from "./components/Pages/NotFoundPage.jsx";
import Footer from "./components/footer/footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<Task />} />
        <Route path="/edit" element={<EditTask />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
