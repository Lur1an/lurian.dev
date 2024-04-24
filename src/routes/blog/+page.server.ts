import type { Post } from '$lib/types';
import { type LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
	const resp = await fetch('api/posts');
	const posts: Post[] = await resp.json();
	const allCategories = new Set(posts.map((post) => post.categories).flat());
	return { posts, allCategories };
}
