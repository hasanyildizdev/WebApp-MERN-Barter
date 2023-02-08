import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class StaffOnly extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username : '',
            password : '',
            birth_date: new Date(),
            product_name: '',
            product_price: '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    onChangeBirthDate(e){
        this.setState({
            birth_date: e
        });
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
            username: this.state.username,
            password: this.state.password,
            birth_date: this.state.birth_date,
            product_name: this.state.product_name,
            product_price: this.state.product_price,
        }

        console.log(product);

        axios.post('http://192.168.1.124:5000/barterproducts/add',product)
        .then(res=>console.log(res.data));

        window.location = '/';
    }

    render(){
        return(
            <div className="w-50 mx-auto">
                <h3>Add New Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birthday: </label>
                        <div>
                            <DatePicker
                                selected={this.state.birth_date}
                                onChange={this.onChangeBirthDate}
                            />
                        </div>
                    </div>
                    <div className="form-group pt-4">
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
                        <label>Product Price: </label>
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
                        <input type="submit" value="Add New Item" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }   
}