import React, {Component} from "react";
import axios from 'axios';

export default class AddProduct extends Component{
    constructor(props){
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            product_name : '',
            product_price : '',
        }
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }
    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
    
        const product ={
            product_name: this.state.product_name,
            product_price: this.state.product_price,
        }

        console.log(product);

        axios.post('http://192.168.1.124:5000/myproducts/add',product)
        .then(res=>{
            console.log(res.data);
        });

        window.location = '/myproducts'; 
    }

    render(){
        return(
            <div className="w-50 mx-auto">
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.product_name}
                            onChange={this.onChangeProductName}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            placeholder="0 TL"
                            value={this.state.product_price}
                            onChange={this.onChangeProductPrice}
                        />
                    </div>

                    <div className="form-group pt-2">
                        <input type="submit" value="Add New Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }   
}
