import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}