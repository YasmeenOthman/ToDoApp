import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Comments from "./components/comments";
import Task from "./components/task/Task.js";
import Login from "./components/login.js";
import SignUp from "./components/register.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<Task />} />
        {/* <Route path="/comments/:category/:id" element={<Comments />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
