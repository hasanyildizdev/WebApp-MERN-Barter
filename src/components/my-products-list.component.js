import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_price} TL</td>
        <td>
            <Link to={"/edit/"+props.product._id} className="btn btn-primary">Edit</Link>  
            <a href="/myproducts" className="btn btn-danger ms-2" onClick={()=>{props.deleteProduct(props.product._id)}}>Delete</a>
        </td>
    </tr>
)

export default class MyProductsList extends Component{

    constructor(props){
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {products:[]};
    }

    componentDidMount(){
        axios.get('http://192.168.1.124:5000/myproducts')
            .then(response =>{
                this.setState({products:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    deleteProduct(id){
        axios.delete('http://192.168.1.124:5000/myproducts/'+id)
            .then(res=> console.log(res.data));

        this.setState({
            products: this.state.products.filter(el=>el._id !== id)
        })
    }

    productList(){
        return this.state.products.map(currentproduct=>{
            return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
        })
    }

    render(){
        return(
            <div>
                <h3>My Products</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
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