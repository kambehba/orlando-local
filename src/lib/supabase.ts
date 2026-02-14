import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export interface Item {
	id: string;
	title: string;
	description: string;
	price: number;
	category: string;
	location: string;
	seller_phone: string;
	image_url: string | null;
	created_at: string;
	status: 'available' | 'sold';
}

export async function getItems(category?: string) {
	let query = supabase
		.from('items')
		.select('*')
		.eq('status', 'available')
		.order('created_at', { ascending: false });
	
	if (category && category !== 'all') {
		query = query.eq('category', category);
	}
	
	const { data, error } = await query;
	
	if (error) {
		console.error('Error fetching items:', error);
		return [];
	}
	
	return data as Item[];
}

export async function getItemById(id: string) {
	const { data, error } = await supabase
		.from('items')
		.select('*')
		.eq('id', id)
		.single();
	
	if (error) {
		console.error('Error fetching item:', error);
		return null;
	}
	
	return data as Item;
}

export async function createItem(item: Omit<Item, 'id' | 'created_at'>) {
	const { data, error } = await supabase
		.from('items')
		.insert([item])
		.select()
		.single();
	
	if (error) {
		console.error('Error creating item:', error);
		throw error;
	}
	
	return data as Item;
}

export async function uploadImage(file: File): Promise<string | null> {
	const fileExt = file.name.split('.').pop();
	const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
	const filePath = `${fileName}`;

	const { error: uploadError } = await supabase.storage
		.from('item-images')
		.upload(filePath, file);

	if (uploadError) {
		console.error('Error uploading image:', uploadError);
		return null;
	}

	const { data } = supabase.storage
		.from('item-images')
		.getPublicUrl(filePath);

	return data.publicUrl;
}
