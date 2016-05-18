import { combineReducers } from "redux";

const initialState = {
	emails: [],
	userdata: {
		loggedIn: false,
		name: {
			key: "",
			value: ""
		}
	}
};

const MailStore = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
			break;
		case "LOGIN":
			return {
				...state,
				userdata: {
					loggedIn: true,
					username: action.username,
					name: action.name
				}
			};
			break;
		case "EMAIL_STAR":
			return {
				...state,
				emails: state.emails.map(email => {
					if (email._id !== action.id) return email;

					return {
						...email,
						starred: action.starred
					};
				})
			};
			break;
	}
};

export default MailStore;