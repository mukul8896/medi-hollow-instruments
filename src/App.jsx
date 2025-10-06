import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import TopHeader from "./components/TopHeader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import siteConfig from "./siteConfig.json";


function App() {
  const [productsData, setProductsData] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(siteConfig); // Load config data
  }, []);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  return (
    <Router>
      {config && <TopHeader address={config?.address} contact={config?.contact} />}
      <Navbar className="navbar-custom" sty/>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage productsData={productsData} />} />
          <Route path="/product/:productId" element={<ProductPage productsData={productsData} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;
