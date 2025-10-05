import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Graphics from './Graphics';
import Map from './Map';

const Carrousel = (props) => {
  const [radius, setRadius] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  // children será el componente Map que se pasa desde MapContainer
  const slides = [
    { id: 1, component: <Map color={"red"} radius={props.radius} />, name: 'Map' },
    { id: 2, component: <Graphics/>, name: 'Graphics' }
  ];

  // console.log("Radio padre: ", props.radius)
  return (
    
    <section className="eztax-carousel-custom" style={{ width: '100%', height: '500px' }}>
      <Carousel
        
        
        showArrows={true}
        showThumbs={false}
        showIndicators={true}
        
        onChange={handleChange}
        style={{ height: '100%' }}
      >
        {slides.map((slide) => (
          <div key={slide.id} style={{ height: '500px', width: '100%' }}>
            {slide.component}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Carrousel;