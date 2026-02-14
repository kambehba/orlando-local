<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getItems, type Item } from '$lib/supabase';

	let items: Item[] = [];
	let loading = true;
	let selectedCategory = 'all';

	const categories = [
		{ value: 'all', label: 'All Items' },
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'furniture', label: 'Furniture' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'books', label: 'Books' },
		{ value: 'sports', label: 'Sports & Outdoors' },
		{ value: 'home', label: 'Home & Garden' },
		{ value: 'other', label: 'Other' }
	];

	onMount(async () => {
		const category = $page.url.searchParams.get('category');
		if (category) {
			selectedCategory = category;
		}
		await loadItems();
	});

	async function loadItems() {
		loading = true;
		items = await getItems(selectedCategory);
		loading = false;
	}

	function handleCategoryChange() {
		if (selectedCategory === 'all') {
			goto('/');
		} else {
			goto(`/?category=${selectedCategory}`);
		}
		loadItems();
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	}

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			electronics: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
			furniture: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
			clothing: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			books: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
			sports: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
			home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
			other: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
		};
		return icons[category] || icons.other;
	}
</script>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary-500 via-primary-600 to-orange-500 text-white py-12 sm:py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 sm:mb-6">
			Discover Local Treasures
		</h1>
		<p class="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-100 max-w-3xl mx-auto px-4">
			Buy and sell items in your community with direct SMS contact
		</p>
		<a 
			href="/sell" 
			class="inline-block bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
		>
			Start Selling Today
		</a>
	</div>
</section>

<!-- Category Filter & Items -->
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<!-- Category Filter -->
	<div class="mb-8 animate-slide-up">
		<label for="category" class="block text-lg font-semibold text-secondary-900 mb-3">
			Filter by Category
		</label>
		<select 
			id="category"
			bind:value={selectedCategory}
			on:change={handleCategoryChange}
			class="input-field max-w-xs font-medium"
		>
			{#each categories as category}
				<option value={category.value}>{category.label}</option>
			{/each}
		</select>
	</div>

	<!-- Loading State -->
	{#if loading}
		<div class="flex justify-center items-center py-20">
			<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
		</div>
	{:else if items.length === 0}
		<!-- Empty State -->
		<div class="text-center py-20 animate-fade-in">
			<svg class="w-24 h-24 mx-auto text-secondary-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
			</svg>
			<h3 class="text-2xl font-display font-bold text-secondary-900 mb-2">No Items Found</h3>
			<p class="text-secondary-600 mb-6">Be the first to list an item in this category!</p>
			<a href="/sell" class="btn-primary inline-block">
				List Your First Item
			</a>
		</div>
	{:else}
		<!-- Items Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each items as item, index}
				<a 
					href="/item/{item.id}"
					class="card overflow-hidden group cursor-pointer animate-scale-in"
					style="animation-delay: {index * 0.05}s"
				>
					<!-- Image -->
					<div class="relative h-48 sm:h-56 bg-secondary-100 overflow-hidden">
						{#if item.image_url}
							<img 
								src={item.image_url} 
								alt={item.title}
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center">
								<svg class="w-16 h-16 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getCategoryIcon(item.category)} />
								</svg>
							</div>
						{/if}
						
						<!-- Category Badge -->
						<div class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-secondary-700 shadow-md">
							{item.category}
						</div>
					</div>

					<!-- Content -->
					<div class="p-4 sm:p-5">
						<h3 class="font-display font-bold text-lg sm:text-xl text-secondary-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
							{item.title}
						</h3>
						
						<p class="text-secondary-600 text-sm mb-3 line-clamp-2">
							{item.description}
						</p>

						<div class="flex items-center justify-between">
							<span class="text-2xl font-bold text-primary-600">
								{formatPrice(item.price)}
							</span>
							
							<div class="flex items-center text-secondary-500 text-sm">
								<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span class="truncate max-w-[100px]">{item.location}</span>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</section>
