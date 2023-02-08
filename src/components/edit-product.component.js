import React, { Component } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_price: 0,
        }
    }

    componentDidMount() {
        axios.get('http://192.168.1.124:5000/myproducts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    product_price: response.data.product_price,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }
    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const product = {
            product_name: this.state.product_name,
            product_price: this.state.product_price,
        }

        console.log(product);
        axios.post('http://192.168.1.124:5000/myproducts/update/' + this.props.match.params.id, product)
        .then(res => console.log(res.data));

        window.location = '/myproducts';
    }

    render() {
        return (
            <div className="w-50 mx-auto">
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.product_name}
                            onChange={this.onChangeProductName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.product_price}
                            onChange={this.onChangeProductPrice}
                        />
                    </div>
                    <div className="form-group pt-2 d-flex flex-row">
                        <input type="submit" value="Edit" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(EditProduct);