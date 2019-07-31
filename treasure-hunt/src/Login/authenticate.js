import React from 'react';
import axios from 'axios';

const url = "https://lambda-treasure-hunt.herokuapp.com/api/adv/";

const authenticate = Main => Login => 
    class extends React.Component{
        constructor(props){
            super(props);
            this.state = ({
                name: '',
                token: '',
                loggedIn: false
            })
        }

        componentDidMount(){
            
        }

        handleChanges = event => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        //requires name and token
        signIn = event => {
            event.persist();
            return axios.get(`${url}init/`,
            {headers:{
              'Authorization': `Token ${this.state.token}`,
            }})
            .then(res => {
            console.log(res.data)
            if(res.status == 200){
                localStorage.setItem('token', this.state.token)
                this.setState({
                    loggedIn: true
                })
            }
            })
            .catch(err => {
            console.log(err)
            })
        }

        signOut = event => {
            event.preventDefault();
            window.localStorage.clear();
            this.setState({
                loggedIn: false
            })
        }

        render(){
            if(localStorage.getItem('token')){
                return <Main 
                signOut = {this.signOut}
                loggedIn = {this.state.loggedIn}
                />
            } else {
                return <Login 
                handleChanges = {this.handleChanges}
                signIn = {this.signIn}
                name = {this.state.name}
                token = {this.state.token}
                />
            }
        }
    }


export default authenticate;