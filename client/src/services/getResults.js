export async function getResults(limit = 10) {
	const response = await fetch('http://localhost:3001/results');
	if (!response.ok) {
		throw new Error('Failed to fetch results');
	}
	const data = await response.json();
	return data.reverse().slice(0, limit);
}
