import { formatDateString } from '$lib';
import { error, type LoadEvent } from '@sveltejs/kit';

export async function load({ params }: LoadEvent) {
	try {
		const slug = params.slug;
		const post = await import(`../../../posts/${slug}.md`);
		const data =  {
			content: post.default,
			metadata: post.metadata
		};
        data.metadata.date = formatDateString(data.metadata.date);
        return data
	} catch (e) {
		throw error(404, 'Post not found');
	}
}
