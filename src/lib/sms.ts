export function sendSMS(phoneNumber: string, itemTitle: string, buyerMessage: string) {
	// Format the message for SMS
	const message = `Marketplace Inquiry for: ${itemTitle}\n\nMessage: ${buyerMessage}`;
	
	// Create SMS URL (works on both mobile and desktop)
	// On mobile devices, this will open the default SMS app
	// On desktop, it may prompt to pair with a phone or use a web service
	const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
	
	// Open SMS in new window/tab
	window.location.href = smsUrl;
}

export function formatPhoneNumber(phone: string): string {
	// Remove all non-numeric characters
	const cleaned = phone.replace(/\D/g, '');
	
	// Format as (XXX) XXX-XXXX if it's a 10-digit US number
	if (cleaned.length === 10) {
		return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
	}
	
	// Return as-is if not a standard format
	return phone;
}

export function validatePhoneNumber(phone: string): boolean {
	// Remove all non-numeric characters
	const cleaned = phone.replace(/\D/g, '');
	
	// Check if it's a valid 10-digit number (US format)
	// You can modify this regex for different countries
	return cleaned.length === 10 || cleaned.length === 11;
}
