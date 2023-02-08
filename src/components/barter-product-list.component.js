import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = props => (
    <tr>
        <td>{props.product.username}</td>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_price} TL</td>
        <td>{props.product.updatedAt.substring(0, 10)}</td>
        <td>
            <Link className="btn btn-success" to={"/offer/" + props.product._id}>Offer Barter Now!</Link>
        </td>
    </tr>
)

export default class productsList extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        axios.get('http://192.168.1.124:5000/barterproducts')
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    productList() {
        return this.state.products.map(currentproduct => {
            return <Product product={currentproduct} key={currentproduct._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Barter Products List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Owner</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Upload Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productList()}
                    </tbody>
                </table>
            </div>
        )
    }
}