import React, { Component } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class Offer extends Component {

    constructor(props) {
        super(props);

        this.onChangeMyProductName = this.onChangeMyProductName.bind(this);

        this.state = {
            username: '',
            product_name: '',
            product_price: '',
            my_product_name: '',
            my_product_price: '',
            myproducts: []
        }
    }

    componentDidMount() {

        axios.get('http://192.168.1.124:5000/barterproducts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    product_name: response.data.product_name,
                    product_price: response.data.product_price,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://192.168.1.124:5000/myproducts/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        myproducts: response.data.map(products => products.product_name),
                    })
                }
            })
    }

    onChangeMyProductName(e) {
        this.setState({
            my_product_name: e.target.value
        });

        axios.get('http://192.168.1.124:5000/myproducts/get/'+e.target.value)
        .then(response => {
                this.setState({
                    my_product_price:response.data.product_price +" TL"
                })
        })
    }

    
    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col">
                        <h3>Barter Product</h3>
                        <div className="card rounded-4">
                            <div className="card-body bg-info text-white rounded-4">
                                <h5 className="card-title">Product Name</h5>
                                <h3 className="card-text text-black"> {this.state.product_name} </h3>
                                <h5 className="card-title pt-4">Product Price</h5>
                                <h3 className="card-text text-black">- {this.state.product_price} TL </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <h3>My Product</h3>
                        <div className="card rounded-4">
                            <div className="card-body bg-info text-white rounded-4">
                                <h5 className="card-title">Select Product</h5>
                                <select ref="userInput"
                                    required
                                    className="form-control"
                                    onChange={this.onChangeMyProductName}>
                                    <option>Click here!</option>
                                    {
                                        this.state.myproducts.map(function (myproducts) {
                                            return <option key={myproducts} value={myproducts}> {myproducts} </option>
                                        })
                                    }
                                </select>
                                <h5 className="card-title pt-4">Product Price</h5>                             
                                <h3 className="card-text text-black">
                                    - {this.state.my_product_price} 
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pt-4 justify-content-center">
                    <button className="w-25 btn btn-primary" 
                            onClick={()=>{
                                 alert('Your offer sent Successfully!');
                                 window.location="/";
                            }}>
                         Make an offer to {this.state.username}
                    </button>
                </div>

            </div>
        )
    }
}

export default withRouter(Offer);