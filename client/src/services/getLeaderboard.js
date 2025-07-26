export async function getLeaderboardResults(limit = 5) {
	const response = await fetch('http://localhost:3001/results');
	if (!response.ok) {
		throw new Error('Failed to fetch results');
	}
	const data = await response.json();

	// Filter out invalid/incomplete entries
	const valid = data.filter((r) => r.moves > 0 && r.time > 0);

	// Sort by moves ascending (fewest first), then by time
	const sorted = valid.sort((a, b) => {
		if (a.moves !== b.moves) return a.moves - b.moves;
		return a.time - b.time;
	});

	return sorted.slice(0, limit);
}
