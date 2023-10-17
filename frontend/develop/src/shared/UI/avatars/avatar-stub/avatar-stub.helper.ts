export const hashing = (str:string):number => {
	let hash = 0;
	let chr;
	if (!Boolean(str.length)) {
		return hash;
	}
	for (let i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0;
	}
	return Math.abs(hash);
};
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

export const getInitials = (name:string):string => {
	return name
		.split(' ')
		.splice(0, 2)
		.map(pieceOfName =>
			pieceOfName
				.slice(0, 1)
				.toUpperCase())
		.join('');
};