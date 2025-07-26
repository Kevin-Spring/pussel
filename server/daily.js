function seedRandom(seed) {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

export function getDailySeed() {
	const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
	const seed = today.split('-').join(''); // e.g., 20250726
	const tiles = Array.from({ length: 16 }, (_, i) => i); // 4x4 puzzle

	for (let i = tiles.length - 1; i > 0; i--) {
		const rand = seedRandom(Number(seed) + i);
		const j = Math.floor(rand * (i + 1));
		[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
	}

	return tiles;
}
