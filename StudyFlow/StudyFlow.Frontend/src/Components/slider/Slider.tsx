import React, { ReactElement } from 'react';
import { Swiper } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

interface Slider {
  children: ReactElement[] | null,
  swiperConfig: SwiperOptions,
}

const Slider = ({ children, swiperConfig }: Slider) => {

  return <Swiper className='slider' {...swiperConfig}>{children}</Swiper>;
};

export default Slider;
