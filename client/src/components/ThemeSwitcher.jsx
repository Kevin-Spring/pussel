import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
	const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<button className="btn btn-ghost btn-square theme-switcher" onClick={toggleTheme} aria-label="Toggle Theme">
			{theme === 'light' ? '🌙' : '☀️'}
		</button>
	);
};

export default ThemeSwitcher;
