import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import AllProductsList from "./components/barter-product-list.component";
import EditProduct from "./components/edit-product.component";
import Login from "./components/login.component";
import CreateUser from "./components/create-user.component";
import MyProductsList from "./components/my-products-list.component";
import AddProduct from "./components/add-product.component";
import StaffOnly from "./components/staff-only-add.component";
import Offer from "./components/offer.component";

function App() {
  return (
      <Router>
        <div className="container">
            <Navbar/>
            <br />
            <div className="w-75 mx-auto">
              <Routes>
                <Route path="/" element={<AllProductsList/>}/>
                <Route path="/myproducts" element={<MyProductsList/>}/>
                <Route path="/edit/:id" element={<EditProduct/> }/>
                <Route path="/add" element={<AddProduct/>}/>
                <Route path="/barterproducts" element={<StaffOnly/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/user" element={<CreateUser/>}/>
                <Route path="/offer/:id" element={<Offer/>}/>
              </Routes>
            </div>
        </div>
      </Router>
  );
}

export default App;
