import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactMe from "./pages/ContactMe";
import Header from "./components/Header";
import MM1 from "./pages/MM1";
import MM2 from "./pages/MM2";
import MM1N from "./pages/MM1N";
import FooterCom from "./components/Footer";
import MG1 from "./pages/MG1";
import MD1 from "./pages/MD1";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MM1" element={<MM1 />} />
        <Route path="/MM2" element={<MM2 />} />
        <Route path="/MM1N" element={<MM1N />} />
        <Route path="/MG1" element={<MG1 />} />
        <Route path="/MD1" element={<MD1 />} />
        <Route path="/contact-me" element={<ContactMe />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
