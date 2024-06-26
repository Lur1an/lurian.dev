import { formatDateString } from '$lib';
import type { Post } from '$lib/types';
import { json, type RequestEvent } from '@sveltejs/kit';

async function getPosts() {
	let posts: Post[] = [];
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	for (let [path, file] of Object.entries(paths)) {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			if (!metadata.published) continue;
			const post = { ...metadata, slug };
			post.date = formatDateString(post.date);
			posts.push(post);
		}
	}
	posts.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime());
	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
