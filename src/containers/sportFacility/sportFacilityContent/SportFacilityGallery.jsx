import React, { useContext } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { ModalContext } from "../../../App";
import { Image } from "../../../components/sharedComponents";

const SportFacilityGallery = ({ images }) => {
  const { setIsModalOpen, setSelectedOption, setSelectedImages } = useContext(ModalContext);

  // Get only the first 5 images from the array
  const slicedImages = images.slice(0, 5);

  // Function to handle click on image
  const handleImageClick = (index) => {
    setIsModalOpen(true);
    setSelectedOption("image");
    setSelectedImages(slicedImages[index].photoUrl);
  };

  // Function to handle click on button
  const handleButtonClick = () => {
    setIsModalOpen(true);
    setSelectedOption("images");
    setSelectedImages(images);
  };

  return (
    <div className="relative grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden sm:grid-cols-none sm:w-full sm:overflow-x-auto sm:gap-1">
      {slicedImages.map((image, index) => (
        <Image
          key={image.photoId}
          className={`relative cursor-pointer ${
            index === 0 ? "col-span-2 row-span-2" : ""
          }`}
          src={image.photoUrl}
          onClick={() => handleImageClick(index)}
        />
      ))}
      <button
        className="absolute flex bottom-4 left-4 items-center gap-2 px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-full sm:p-3"
        onClick={handleButtonClick}
      >
        <span className="sm:hidden">Zobacz więcej</span>
        <BsGrid3X3GapFill />
      </button>
    </div>
  );
};

export default SportFacilityGallery;
