export async function saveResult(result) {
	return fetch('http://localhost:3001/results', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(result),
	});
}
