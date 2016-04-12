import React from "react";
import Base from "~/views/layouts/base";

// Client-side login functions
class Login {
	static login(data) {
		return new Promise((resolve, reject) => {
			fetch("/login", {
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				credentials: "same-origin",
				method: "post",
				body: JSON.stringify(data)
			}).then(res => res.json())
			.then(res => resolve(res))
			.catch(err => reject(err));
		});
	};
}

export default class LoginPage extends React.Component {
	state = {
		username: "",
		password: ""
	};

	change = (field, e) => {
		this.setState({ [field]: e.target.value });
	};

	submit = (e) => {
		e.preventDefault();

		Login.login(this.state).then(res => {
			// TODO make this much better
			console.log(res);
			if (res.success) return window.location.reload();
			alert(res.msg);
		});
	};

	render() {
		return <Base data={ this.state }>
			<div className="login-area">
				<div className="centered">
					<form className="login">
						<input value={ this.state.username } onChange={ this.change.bind(this, "username") } placeholder="Username" />
						<input value={ this.state.password } onChange={ this.change.bind(this, "password") } placeholder="Password" type="password" />
						<input type="submit" onClick={ this.submit } />
					</form>
				</div>
			</div>
		</Base>
	};
};