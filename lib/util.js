export default class Util {
	static truncate(str, length) {
		let words = str.split(" ");
		let charCount = 0;
		let truncated = false;

		let final = words.reduce((prev, current) => {
			charCount += current.length;
			if (charCount < length) return [prev, current].join(" ");
			truncated = true;
			return prev;
		}, "");

		return [final, truncated];
	};

	// Remove non-alphanumeric characters from a string
	static alphanumeric(str) {
		return str.replace(/[^a-z0-9]/gi, "");
	}
}