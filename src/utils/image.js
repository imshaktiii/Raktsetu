export const getProfileImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;

  // Extract backend base URL
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const hostUrl = apiBase.replace(/\/api$/, '').replace(/\/api\/$/, '');
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${hostUrl}${cleanPath}`;
};
