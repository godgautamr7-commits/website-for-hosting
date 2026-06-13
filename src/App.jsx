import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { theme } from "./config";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Statuspage from "./pages/Statuspage";
import BillingPage from "./pages/BillingPage";
import Supportpage from "./pages/Supportpage";
import Linkspage from "./pages/Linkspage";
import Privacypage from "./pages/Privacypage";
import Termsofservicepage from "./pages/Termsofservicepage";

const App = () => (
  <div className="min-h-screen bg-zinc-950 text-zinc-100">
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: theme.toastStyle }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/status" element={<Statuspage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/support" element={<Supportpage />} />
        <Route path="/links" element={<Linkspage />} />
        <Route path="/privacy-policy" element={<Privacypage />} />
        <Route path="/terms-of-service" element={<Termsofservicepage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
