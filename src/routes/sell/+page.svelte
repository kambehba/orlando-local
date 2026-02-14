<script lang="ts">
	import { goto } from '$app/navigation';
	import { createItem, uploadImage } from '$lib/supabase';
	import { validatePhoneNumber } from '$lib/sms';

	let title = '';
	let description = '';
	let price = '';
	let category = 'electronics';
	let location = '';
	let sellerPhone = '';
	let imageFile: File | null = null;
	let imagePreview: string | null = null;
	let loading = false;
	let error = '';
	let success = false;

	const categories = [
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'furniture', label: 'Furniture' },
		{ value: 'clothing', label: 'Clothing' },
		{ value: 'books', label: 'Books' },
		{ value: 'sports', label: 'Sports & Outdoors' },
		{ value: 'home', label: 'Home & Garden' },
		{ value: 'other', label: 'Other' }
	];

	function handleImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			imageFile = input.files[0];
			
			// Create preview
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(imageFile);
		}
	}

	function removeImage() {
		imageFile = null;
		imagePreview = null;
		const input = document.getElementById('image') as HTMLInputElement;
		if (input) input.value = '';
	}

	async function handleSubmit() {
		error = '';
		
		// Validation
		if (!title.trim() || !description.trim() || !price || !location.trim() || !sellerPhone.trim()) {
			error = 'Please fill in all required fields';
			return;
		}

		if (!validatePhoneNumber(sellerPhone)) {
			error = 'Please enter a valid phone number (10-11 digits)';
			return;
		}

		const priceNum = parseFloat(price);
		if (isNaN(priceNum) || priceNum <= 0) {
			error = 'Please enter a valid price';
			return;
		}

		loading = true;

		try {
			// Upload image if provided
			let imageUrl: string | null = null;
			if (imageFile) {
				console.log('Uploading image:', imageFile);
				imageUrl = await uploadImage(imageFile);
				console.log('Image uploaded, URL:', imageUrl);
			}

			// Create item
			const newItem = await createItem({
				title: title.trim(),
				description: description.trim(),
				price: priceNum,
				category,
				location: location.trim(),
				seller_phone: sellerPhone.trim(),
				image_url: imageUrl,
				status: 'available'
			});

			success = true;
			
			// Redirect to item page after short delay
			setTimeout(() => {
				goto(`/item/${newItem.id}`);
			}, 1500);

		} catch (err) {
			console.error('Error creating item:', err);
			error = 'Failed to create listing. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sell an Item - Marketplace</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
	<div class="mb-8 animate-fade-in">
		<h1 class="text-3xl sm:text-4xl font-display font-bold text-secondary-900 mb-2">List Your Item</h1>
		<p class="text-secondary-600 text-lg">Fill out the details below to create your listing</p>
	</div>

	{#if success}
		<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6 animate-scale-in">
			<div class="flex items-center">
				<svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				<div>
					<h3 class="text-green-800 font-bold">Success!</h3>
					<p class="text-green-700">Your item has been listed. Redirecting...</p>
				</div>
			</div>
		</div>
	{/if}

	{#if error}
		<div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6 animate-scale-in">
			<div class="flex items-center">
				<svg class="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p class="text-red-700 font-medium">{error}</p>
			</div>
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="card p-6 sm:p-8 space-y-6 animate-slide-up">
		<!-- Title -->
		<div>
			<label for="title" class="block text-sm font-semibold text-secondary-900 mb-2">
				Title <span class="text-red-500">*</span>
			</label>
			<input 
				id="title"
				type="text" 
				bind:value={title}
				placeholder="e.g., iPhone 13 Pro Max"
				class="input-field"
				maxlength="100"
				required
			/>
		</div>

		<!-- Description -->
		<div>
			<label for="description" class="block text-sm font-semibold text-secondary-900 mb-2">
				Description <span class="text-red-500">*</span>
			</label>
			<textarea 
				id="description"
				bind:value={description}
				placeholder="Describe your item in detail..."
				class="textarea-field"
				maxlength="1000"
				required
			></textarea>
		</div>

		<!-- Price and Category Row -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<!-- Price -->
			<div>
				<label for="price" class="block text-sm font-semibold text-secondary-900 mb-2">
					Price (USD) <span class="text-red-500">*</span>
				</label>
				<div class="relative">
					<span class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-500 font-medium">$</span>
					<input 
						id="price"
						type="number" 
						bind:value={price}
						placeholder="0.00"
						step="0.01"
						min="0"
						class="input-field pl-8"
						required
					/>
				</div>
			</div>

			<!-- Category -->
			<div>
				<label for="category" class="block text-sm font-semibold text-secondary-900 mb-2">
					Category <span class="text-red-500">*</span>
				</label>
				<select 
					id="category"
					bind:value={category}
					class="input-field"
					required
				>
					{#each categories as cat}
						<option value={cat.value}>{cat.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Location -->
		<div>
			<label for="location" class="block text-sm font-semibold text-secondary-900 mb-2">
				Location <span class="text-red-500">*</span>
			</label>
			<input 
				id="location"
				type="text" 
				bind:value={location}
				placeholder="e.g., New York, NY"
				class="input-field"
				required
			/>
		</div>

		<!-- Phone Number -->
		<div>
			<label for="phone" class="block text-sm font-semibold text-secondary-900 mb-2">
				Contact Phone Number <span class="text-red-500">*</span>
			</label>
			<input 
				id="phone"
				type="tel" 
				bind:value={sellerPhone}
				placeholder="(555) 123-4567"
				class="input-field"
				required
			/>
			<p class="text-sm text-secondary-600 mt-2">
				Buyers will be able to contact you via SMS through this number
			</p>
		</div>

		<!-- Image Upload -->
		<div>
			<label for="image" class="block text-sm font-semibold text-secondary-900 mb-2">
				Item Image
			</label>
			
			{#if imagePreview}
				<div class="relative inline-block mb-4">
					<img 
						src={imagePreview} 
						alt="Preview" 
						class="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
					/>
					<button 
						type="button"
						on:click={removeImage}
						class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/if}

			<div class="flex items-center justify-center w-full">
				<label for="image" class="flex flex-col items-center justify-center w-full h-32 border-2 border-secondary-300 border-dashed rounded-lg cursor-pointer bg-secondary-50 hover:bg-secondary-100 transition-colors">
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<svg class="w-10 h-10 mb-3 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
						<p class="mb-2 text-sm text-secondary-600">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs text-secondary-500">PNG, JPG, GIF (MAX. 5MB)</p>
					</div>
					<input 
						id="image" 
						type="file" 
						accept="image/*"
						on:change={handleImageChange}
						class="hidden" 
					/>
				</label>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="pt-4">
			<button 
				type="submit" 
				disabled={loading}
				class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
			>
				{#if loading}
					<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Creating Listing...
				{:else}
					Create Listing
				{/if}
			</button>
		</div>
	</form>
</div>
