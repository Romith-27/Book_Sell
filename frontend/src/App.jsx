import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import BookPage from "./components/BookPage.jsx";
import AddBook from "./components/AddBook.jsx";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile.jsx";
import Edit from "./components/EditPage.jsx";
import PrivateRoutes from "./PrivateRoute.jsx";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" Component={Login} ></Route>
        <Route path="/signup" Component={Signup} ></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" Component={Home}></Route>
          <Route path="/admin" Component={AdminLogin}></Route>
          <Route path="/book/:id" Component={BookPage}></Route>
          <Route path="/add-book" Component={AddBook}></Route>
          <Route path="/profile" Component={Profile}></Route>
        </Route>
        <Route path="/edit" Component={Edit}></Route>
      </Routes>
    </>
  );
}

export default App;
