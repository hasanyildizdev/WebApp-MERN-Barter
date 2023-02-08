import React, {Component} from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';

export default class CreateUsers extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            username : '',
            password : '',
            birth_date: new Date(),
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

    onSubmit(e){
        e.preventDefault();
        const user ={
            username: this.state.username,
            password: this.state.password,
            birth_date: this.state.birth_date
        }

        console.log(user);

        axios.post('http://192.168.1.124:5000/users/add',user)
            .then(res=>console.log(res.data));

        this.setState({
            username:'',
            password:''
        });

        alert("Account Created Successfully");
        
        window.location = '/login';
    }

    render(){
        return(
            <div className="w-50 mx-auto">
                <h3>Create Account</h3>
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
                    <div className="form-group pt-2 d-flex flex-row">
                        <input type="submit" value="Create Account" className="btn btn-primary"/>
                    </div>
                </form>

            </div>
        )
    }   
}