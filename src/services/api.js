import { pictures } from '../data/pictures';
export const apiService = {
  async fetchPictures() {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (Math.random() < 0.05) {
      throw new Error('שגיאת חיבור לשרת');
    }
    
    return { data: pictures, status: 'success' };
  },
  
  async fetchPictureById(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const picture = pictures.find(p => p.id === id);
    if (!picture) {
      throw new Error('התמונה לא נמצאה');
    }
    return { data: picture, status: 'success' };
  }
};