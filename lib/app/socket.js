export default function(io) {
	io.on("connection", socket => {
		console.log("Somebody connected!");

		socket.on("disconnect", () => {
			console.log("Somebody disconnected.");
		});
	});
};