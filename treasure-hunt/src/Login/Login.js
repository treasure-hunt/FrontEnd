import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <div>
                <form type='submit'>
                    <div>
                        <h4>Name:</h4>
                        <input
                        type = "text"
                        value = {this.props.name}
                        name = "name"
                        onChange = {this.props.handleChanges}
                        placeholder = "Name..."
                        />
                        </div>
                        <div>
                        <h4>Token:</h4>
                        <input
                        type = "text"
                        value = {this.props.token}
                        name = "token"
                        onChange = {this.props.handleChanges}
                        placeholder = "Token..."
                        />
                    </div>
                </form>
                <button onClick = {this.props.signIn}>Login</button>
            </div>
        )
    }
}

export default Login
