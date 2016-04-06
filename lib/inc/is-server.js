export default function IsServer() {
	//Accessing window from the server will throw an error, so it is caught silently
	try {
		return !window.hasOwnProperty("document");
	}
	catch (e) {
		return true;
	}
};