import React from "react";
import { connect } from "react-redux";
import Base from "../base";
import Decryptable from "../../components/decryptable";

// Client-side login functions
const requestAction = (route, data) => {
	return new Promise((resolve, reject) => {
		fetch(route, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			credentials: "same-origin",
			method: "post",
			body: JSON.stringify(data)
		}).then(res => res.json())
		.then(resolve)
		.catch(reject);
	});
};

class LoginPage extends React.Component {
	state = {
		username: "",
		password: "",
		confirmPassword: ""
	};

	static contextTypes = {
		store: React.PropTypes.object
	};

	change = (field, e) => {
		this.setState({ [field]: e.target.value });
	};

	submit = (route, e) => {
		const { store } = this.context;

		e.preventDefault();
		requestAction(route, this.state).then(res => {
			console.log(res);

			if (res.success) {
				if (res.userdata.privatekey) {
					localStorage.privatekey = res.userdata.privatekey;
				}

				store.dispatch({
					type: "LOGIN",
					username: res.userdata.username,
					name: res.userdata.name
				});
			}
			else {
				console.error(res.msg);
			}
		}).catch(err => {
			console.error(err);
		});
	};

	render() {
		return <Base>
			<Decryptable sym={ this.props.userdata.name.key } value={ this.props.userdata.name.value } />
			<div className="login-area">
				<div className="centered">
					<form className="login">
						<input required value={ this.state.username } onChange={ this.change.bind(this, "username") } placeholder="Username" />
						<input required value={ this.state.password } onChange={ this.change.bind(this, "password") } placeholder="Password" type="password" />
						<input type="submit" onClick={ this.submit.bind(this, "/login") } value="Login" />
					</form>

					<form className="register">
						<input required value={ this.state.username } onChange={ this.change.bind(this, "username") } placeholder="Username" />
						<input required value={ this.state.password } onChange={ this.change.bind(this, "password") } placeholder="Password" type="password" />
						<input required value={ this.state.confirmPassword } onChange={ this.change.bind(this, "confirmPassword") } placeholder="Confirm password" type="password" />
						<input type="submit" onClick={ this.submit.bind(this, "/register") } value="Register" />
					</form>
				</div>
			</div>
		</Base>
	};
};

export default connect(state => {
	return {
		userdata: state.userdata
	};
})(LoginPage);