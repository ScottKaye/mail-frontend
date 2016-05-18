import React, { PropTypes } from "react";
import Icon from "./icon";
import { connect } from "react-redux";

const EmailStar = ({ email, onStar }) => {
	return <span className={ `email-star ${ email.starred && "active" }`} onClick={ () => onStar(email) }>
		<Icon icon="star" />
	</span>
};

export default connect(
	null,
	dispatch => {
		return {
			onStar: email => {
				dispatch({
					type: "EMAIL_STAR",
					starred: !email.starred,
					id: email._id
				});

				// Update database
				fetch("/api/star", {
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					credentials: "same-origin",
					method: "post",
					body: JSON.stringify({ _id: email._id })
				});
			}
		};
	}
)(EmailStar);