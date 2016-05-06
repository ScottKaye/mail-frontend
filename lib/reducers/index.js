import { combineReducers } from "redux";

const initialState = {
	emails: [],
	privateKey: ""
};

const MailStore = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_EMAIL":
			return {
				...state,
				emails: [
					...state.emails,
					{
						
					}
				]
			}
			break;
		case "TOGGLE_STAR":
			return {
				...state,
				...state.emails.map(email => {
					if (email.id !== action.id) return email;
					return {
						...email,
						starred: !email.starred
					};
				})
			};
			break;
	}
};

export default MailStore;