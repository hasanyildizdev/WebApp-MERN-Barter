import React, {Component} from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="ps-3 navbar-brand"> Barter App</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto me-4 ">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link"> Barter Products </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/myproducts" className="nav-link"> My Products </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to={"/add"} className="nav-link"> Add New Product </Link> 
                        </li>
                        <li className="navbar-item ps-2 ">
                            <Link to="/login" className="nav-link btn btn-primary text-light"> Login </Link>
                        </li>
                        <li className="navbar-item ps-2">
                            <Link to="/barterproducts" className="nav-link btn btn-danger text-light"> Staff Only </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}