export default function(state, action) {
	switch (action.type) {
		case "toggle":
			return { ...state, starred: !state.starred };
			break;
	}
};