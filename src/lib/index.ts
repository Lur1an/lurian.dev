// place files you want to import through the `$lib` alias in this folder.
// e.g. `import { someFunction } from '$lib/someFunction'`
import NavBar from '$lib/components/NavBar.svelte';
export { NavBar };

export type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDateString(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return formatter.format(new Date(date))
}

