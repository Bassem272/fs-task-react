import React from 'react';

// MainImage component displays a product image with next and previous buttons
const MainImage = ({ gallery, currentImageIndex, nextImage, prevImage }) => {
  return (
    // Container for the image and navigation buttons
    <div className="sm:col-span-4 relative">
      
      {/* Main Product Image */}
      <img
        src={gallery[currentImageIndex].image_url} // The source URL for the current image in the gallery
        alt="Main Product" // Alternative text for accessibility
        className="w-full h-64 sm:h-96 object-cover" // Responsive classes to ensure the image is properly displayed
      />
      
      {/* Button to navigate to the previous image */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" // Positioning the button on the left side
        onClick={prevImage} // Calls the prevImage function passed via props
      >
        &lt; {/* Display a left arrow symbol */}
      </button>
      
      {/* Button to navigate to the next image */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2" // Positioning the button on the right side
        onClick={nextImage} // Calls the nextImage function passed via props
      >
        &gt; {/* Display a right arrow symbol */}
      </button>
    </div>
  );
};

export default MainImage;
