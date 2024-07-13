import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactMe from "./pages/ContactMe";
import Header from "./components/Header";
import MM1 from "./pages/MM1";
import MM2 from "./pages/MM2";
import MM1N from "./pages/MM1N";
import FooterCom from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mm1" element={<MM1 />} />
        <Route path="/mm2" element={<MM2 />} />
        <Route path="/mm1n" element={<MM1N />} />
        <Route path="/contact-me" element={<ContactMe />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
