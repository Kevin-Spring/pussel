export async function fetchDailyPuzzle() {
	const response = await fetch('http://localhost:3001/daily-seed');
	const { seed } = await response.json();
	const board = [];
	for (let i = 0; i < 4; i++) {
		board.push(seed.slice(i * 4, i * 4 + 4));
	}
	return board;
}
