<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Marketplace - Buy & Sell Locally</title>
	<meta name="description" content="A modern marketplace for buying and selling items locally" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<!-- Header -->
	<header class="bg-white shadow-md sticky top-0 z-50">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="flex items-center space-x-3 group">
					<div class="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-200">
						<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<span class="text-2xl font-display font-bold text-secondary-900 hidden sm:block">Marketplace</span>
				</a>
				
				<div class="flex items-center space-x-2 sm:space-x-4">
					<a 
						href="/" 
						class="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 {$page.url.pathname === '/' ? 'bg-primary-100 text-primary-700' : 'text-secondary-700 hover:bg-secondary-100'}"
					>
						Browse
					</a>
					<a 
						href="/sell" 
						class="px-3 sm:px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-sm sm:text-base"
					>
						Sell Item
					</a>
				</div>
			</div>
		</nav>
	</header>

	<!-- Main Content -->
	<main class="flex-grow">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-secondary-900 text-white mt-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 class="text-xl font-display font-bold mb-4">Marketplace</h3>
					<p class="text-secondary-300 text-sm">
						Buy and sell items locally with ease. Connect directly with sellers through SMS.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-4">Quick Links</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/" class="text-secondary-300 hover:text-white transition-colors">Browse Items</a></li>
						<li><a href="/sell" class="text-secondary-300 hover:text-white transition-colors">Sell an Item</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-4">Categories</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/?category=electronics" class="text-secondary-300 hover:text-white transition-colors">Electronics</a></li>
						<li><a href="/?category=furniture" class="text-secondary-300 hover:text-white transition-colors">Furniture</a></li>
						<li><a href="/?category=clothing" class="text-secondary-300 hover:text-white transition-colors">Clothing</a></li>
						<li><a href="/?category=other" class="text-secondary-300 hover:text-white transition-colors">Other</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-secondary-700 mt-8 pt-8 text-center text-sm text-secondary-400">
				<p>&copy; 2026 Marketplace. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
