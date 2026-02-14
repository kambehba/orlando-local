# Supabase Storage Bucket Setup

## Step-by-Step Instructions

### 1. Create the Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Configure the bucket:
   - **Name**: `item-images`
   - **Public bucket**: ✅ Check this box (very important!)
   - **Allowed MIME types**: Leave empty (allows all image types)
   - **File size limit**: 5MB (or adjust as needed)
5. Click **Create bucket**

### 2. Set Up Storage Policies

Go to **Storage** → **Policies** and add the following policies:

#### Policy 1: Allow Public Uploads

```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'item-images');
```

#### Policy 2: Allow Public Reads

```sql
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
USING (bucket_id = 'item-images');
```

### 3. Verify Setup

1. Go to **Storage** → **item-images**
2. Try uploading a test image using the Supabase dashboard
3. If successful, your storage is ready!

### Alternative: Use the Supabase Dashboard

Instead of SQL, you can create policies through the UI:

1. Go to **Storage** → **Policies** → **New Policy**
2. Select the `item-images` bucket
3. Choose **Custom** policy
4. For **INSERT** operations:
   - Name: "Allow public uploads"
   - Policy definition: `true`
5. For **SELECT** operations:
   - Name: "Allow public reads"  
   - Policy definition: `true`

## Testing Your Setup

After setup, test the upload functionality:

1. Run your marketplace app
2. Go to the "Sell Item" page
3. Try uploading an image
4. If successful, you'll see a preview of the image
5. After creating the listing, the image should appear on the item detail page

## Troubleshooting

### Images not uploading?

- ✅ Verify the bucket is set to **public**
- ✅ Check that both policies (INSERT and SELECT) are created
- ✅ Ensure the bucket name is exactly `item-images`
- ✅ Check browser console for error messages

### Images uploading but not displaying?

- ✅ Verify the SELECT policy is created
- ✅ Check that the bucket is public
- ✅ Inspect the image_url in the database - it should be a valid public URL
