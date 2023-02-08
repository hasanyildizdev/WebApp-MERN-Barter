import React, {Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

class Login extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            password:'',
            usernameData:'',
            passwordData:'',
            users:[]
        };
    }

    componentDidMount(){
        axios.get('http://192.168.1.124:5000/users')
            .then(response =>{
                this.setState({users:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
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
    
    onSubmit(e){
        e.preventDefault();
        
        axios.get('http://192.168.1.124:5000/users/' + this.state.username)
            .then(response => {
                if(response.data.username===this.state.username && response.data.password===this.state.password){
                    alert(`Wellcome ${this.state.username}`);
                    this.setState({
                        username:'',
                        password:''
                    });

                    window.location = '/';
                }
                else{
                    alert('Wrong Username and Password');
                }            
            })
            .catch(function (error) {
                alert('Wrong Username and Password');
                console.log(error);
            });
    }

    render(){
        return(
            <div className="w-50 mx-auto">
                <h3>Login</h3>
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
                    <div className="form-group pt-2 d-flex flex-row">
                        <input type="submit" value="Login" className="btn btn-success"/>

                        <div className="ps-2">
                            <Link to="/user" className="btn btn-primary"> Create New Account </Link>
                        </div>
                    </div>
                </form>

            </div>
        )
    }   
}

export default withRouter(Login);