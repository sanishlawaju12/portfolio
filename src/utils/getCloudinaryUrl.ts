export const getCloudinaryUrl = (image?: string): string => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const fallbackImage = "./blog-img.jpg";
  
    if (!cloudName) {
      console.error("Cloudinary cloud name is not defined in the environment variables.");
      return fallbackImage;
    }
  
    if (!image) return fallbackImage;
  
    return image.startsWith("http")
      ? image
      : `https://res.cloudinary.com/${cloudName}/image/upload/${image}`;
  };
  