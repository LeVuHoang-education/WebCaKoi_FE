import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from "prop-types";

const ProjectGallery = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null); // Tạo ref cho slider

    console.log("Images:", images);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        beforeChange: (current, next) => { setCurrentSlide(next); },
        arrows: false,
    };

    const handleThumbnailClick = (index) => {
        setCurrentSlide(index);
        sliderRef.current.slickGoTo(index);
    };

    return (
        <div className={`slideshow-container`}>
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div className={`flex justify-center items-center w-[500px] h-[300px] bg-violet-200 rounded-3xl `} key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg p-5" />
                    </div>
                ))}
            </Slider>

            <div className="flex justify-center mt-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-12 h-12 object-cover cursor-pointer mx-1 rounded-lg ${currentSlide === index ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

ProjectGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ProjectGallery;