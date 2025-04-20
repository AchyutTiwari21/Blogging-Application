// import { Cloudinary } from '@cloudinary/url-gen';
// import { AdvancedImage } from '@cloudinary/react';

async function ImageUploader(image) {
  let imageUrl = null;

  // const cld = new Cloudinary({ cloud: { cloudName: 'dk0kw8hco' } });

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'blog_app_uploads'); // Cloudinary upload preset for blog images
    
    const response = await fetch('https://api.cloudinary.com/v1_1/dk0kw8hco/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    imageUrl = data.secure_url;
    console.log(imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error so the calling code can handle it
  }
}

export default ImageUploader;