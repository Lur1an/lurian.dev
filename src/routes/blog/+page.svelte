<script lang="ts">
	export let data;

	const postUrl = (slug: string) => {
		return `blog/${slug}`;
	};

	let searchParam: null | string = null;
	$: filteredPosts = data.posts.filter((post) => {
        if (searchParam === null) {
            return true;
        }
        const matchesTitle = post.title.toLowerCase().includes(searchParam.toLowerCase());
        const matchesDescription = post.description.toLowerCase().includes(searchParam.toLowerCase());
        let matchesCategory = false;
        for (let category of post.categories) {
            matchesCategory = category.toLowerCase().includes(searchParam.toLowerCase());
            if (matchesCategory) {
                break;
            }
        }
        return matchesTitle || matchesCategory || matchesDescription;
	});
</script>

<div class="container h-full mx-auto flex flex-col w-full mt-12 space-y-8">
	<input
		class="input !border-tertiary-500 !border-opacity-50"
		type="search"
		name="autocomplete-search"
		bind:value={searchParam}
		placeholder="Search..."
	/>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each filteredPosts as post}
			<a href={postUrl(post.slug)}>
				<div class="card card-hover flex flex-col overflow-hidden">
					{#if post.headerImage !== undefined}
						<header>
							<img class="w-full aspect-[21/9]" src={post.headerImage} alt="" />
						</header>
					{:else}
						<header>
							<img class="w-full aspect-[21/9]" src="/default.jpg" alt="" />
						</header>
					{/if}
					<div class="p-4 space-y-4">
						<div class="flex justify-start gap-2">
							{#each post.categories as category}
								<button class="chip variant-filled" on:click={() => {}}>
									<div class="">
										<h4 class="">{category}</h4>
									</div>
								</button>
							{/each}
						</div>
						<h1 class="text-secondary-700 text-xl text-center">{post.title}</h1>
						<p>{post.description}</p>
						<p>{post.date}</p>
					</div>
				</div>
			</a>
		{/each}
	</section>
</div>
