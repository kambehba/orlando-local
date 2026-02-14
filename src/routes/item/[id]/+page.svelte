<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getItemById, type Item } from '$lib/supabase';
	import { sendSMS, formatPhoneNumber } from '$lib/sms';

	let item: Item | null = null;
	let loading = true;
	let showContactModal = false;
	let buyerMessage = '';

	onMount(async () => {
		const id = $page.params.id;
		item = await getItemById(id);
		loading = false;
	});

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}

	function handleContactSeller() {
		if (!item) return;
		
		const message = buyerMessage.trim() || `Hi, I'm interested in your ${item.title}. Is it still available?`;
		sendSMS(item.seller_phone, item.title, message);
		showContactModal = false;
		buyerMessage = '';
	}

	function openContactModal() {
		showContactModal = true;
		buyerMessage = '';
	}

	function closeContactModal() {
		showContactModal = false;
		buyerMessage = '';
	}
</script>

<svelte:head>
	<title>{item ? item.title : 'Loading...'} - Marketplace</title>
</svelte:head>

{#if loading}
	<div class="flex justify-center items-center py-20">
		<div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
	</div>
{:else if !item}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
		<svg class="w-24 h-24 mx-auto text-secondary-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<h2 class="text-3xl font-display font-bold text-secondary-900 mb-2">Item Not Found</h2>
		<p class="text-secondary-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
		<a href="/" class="btn-primary inline-block">
			Back to Browse
		</a>
	</div>
{:else}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
		<!-- Breadcrumb -->
		<nav class="mb-6 animate-fade-in">
			<ol class="flex items-center space-x-2 text-sm text-secondary-600">
				<li><a href="/" class="hover:text-primary-600 transition-colors">Home</a></li>
				<li><span class="mx-2">/</span></li>
				<li><a href="/?category={item.category}" class="hover:text-primary-600 transition-colors capitalize">{item.category}</a></li>
				<li><span class="mx-2">/</span></li>
				<li class="text-secondary-900 truncate max-w-xs">{item.title}</li>
			</ol>
		</nav>

		<!-- Item Details -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
			<!-- Image Section -->
			<div class="animate-slide-up">
				<div class="card overflow-hidden">
					{#if item.image_url}
						<img 
							src={item.image_url} 
							alt={item.title}
							class="w-full h-96 sm:h-[500px] object-cover"
						/>
					{:else}
						<div class="w-full h-96 sm:h-[500px] bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
							<svg class="w-32 h-32 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
					{/if}
				</div>
			</div>

			<!-- Info Section -->
			<div class="animate-slide-up" style="animation-delay: 0.1s">
				<div class="mb-4">
					<span class="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold capitalize mb-4">
						{item.category}
					</span>
					<h1 class="text-3xl sm:text-4xl font-display font-bold text-secondary-900 mb-3">
						{item.title}
					</h1>
					<div class="text-4xl sm:text-5xl font-bold text-primary-600 mb-6">
						{formatPrice(item.price)}
					</div>
				</div>

				<!-- Description -->
				<div class="mb-8">
					<h2 class="text-xl font-semibold text-secondary-900 mb-3">Description</h2>
					<p class="text-secondary-700 leading-relaxed whitespace-pre-wrap">
						{item.description}
					</p>
				</div>

				<!-- Details -->
				<div class="bg-secondary-50 rounded-lg p-6 mb-8">
					<h3 class="font-semibold text-secondary-900 mb-4">Item Details</h3>
					<div class="space-y-3">
						<div class="flex items-center text-secondary-700">
							<svg class="w-5 h-5 mr-3 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span><strong>Location:</strong> {item.location}</span>
						</div>
						<div class="flex items-center text-secondary-700">
							<svg class="w-5 h-5 mr-3 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span><strong>Listed:</strong> {formatDate(item.created_at)}</span>
						</div>
						<div class="flex items-center text-secondary-700">
							<svg class="w-5 h-5 mr-3 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span><strong>Status:</strong> <span class="text-green-600 font-semibold capitalize">{item.status}</span></span>
						</div>
					</div>
				</div>

				<!-- Contact Button -->
				<button 
					on:click={openContactModal}
					class="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
					</svg>
					<span>Contact Seller via SMS</span>
				</button>

				<p class="text-sm text-secondary-600 mt-4 text-center">
					Click to send an SMS to the seller
				</p>
			</div>
		</div>
	</div>
{/if}

<!-- Contact Modal -->
{#if showContactModal}
	<div 
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
		on:click={closeContactModal}
		on:keydown={(e) => e.key === 'Escape' && closeContactModal()}
		role="button"
		tabindex="0"
	>
		<div 
			class="card max-w-lg w-full p-6 sm:p-8 animate-scale-in"
			on:click|stopPropagation
			role="dialog"
			tabindex="-1"
		>
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-2xl font-display font-bold text-secondary-900">Contact Seller</h3>
				<button 
					on:click={closeContactModal}
					class="text-secondary-500 hover:text-secondary-700 transition-colors"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="mb-6">
				<p class="text-secondary-700 mb-4">
					Customize your message or use the default one:
				</p>
				<textarea 
					bind:value={buyerMessage}
					placeholder={item ? `Hi, I'm interested in your ${item.title}. Is it still available?` : ''}
					class="textarea-field"
					rows="4"
				></textarea>
			</div>

			<div class="bg-secondary-50 rounded-lg p-4 mb-6">
				<p class="text-sm text-secondary-600 mb-2">
					<strong>Seller's Phone:</strong>
				</p>
				<p class="text-lg font-semibold text-secondary-900">
					{item ? formatPhoneNumber(item.seller_phone) : ''}
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-3">
				<button 
					on:click={closeContactModal}
					class="flex-1 px-6 py-3 border-2 border-secondary-300 text-secondary-700 font-semibold rounded-lg hover:bg-secondary-50 transition-all duration-200"
				>
					Cancel
				</button>
				<button 
					on:click={handleContactSeller}
					class="flex-1 btn-primary flex items-center justify-center space-x-2"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
					</svg>
					<span>Send SMS</span>
				</button>
			</div>
		</div>
	</div>
{/if}
