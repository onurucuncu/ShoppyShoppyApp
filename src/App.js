import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import PageContainer from "./containers/PageContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import "alertifyjs/build/alertify.min.js"
import "alertifyjs/build/css/alertify.min.css"
import "alertifyjs/build/css/themes/default.min.css"
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div>
      <PageContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products/:id" element={<Detail />}/>
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
      </PageContainer>
    </div>
  );
}

export default App;
