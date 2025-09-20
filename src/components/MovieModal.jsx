import React, { useEffect } from 'react';


const PictureModal = ({ picture, onClose }) => {

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (picture) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
      };
 }, [picture]);


 if (!picture) return null;

 return (
   <div className="picture-view">
     <button className="close-btn" onClick={handleClose}>✕</button>
     
      <div>

      </div>
       <div className="picture-main">
         
      <img
          className="picture-large"
          src={picture.imageUrl}
          alt={picture.name}
          style={{ cursor: "pointer" }}
          onClick={() => window.open(picture.movieUrl, "_blank", "noopener,noreferrer")}
        />
         </div>
      
         
           <div className="picture-info">
             <h2>{picture.name}</h2>
           </div>    
     </div>
 );
};

export default PictureModal;