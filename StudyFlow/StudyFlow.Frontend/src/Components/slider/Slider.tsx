import React, { ReactElement } from 'react';
import { Swiper } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

interface ISlider {
    children: ReactElement[] | null,
    swiperConfig: SwiperOptions,
}

const Slider = ({ children, swiperConfig }: ISlider) => {
    return <Swiper className='slider' {...swiperConfig}>{children}</Swiper>;
};

export default Slider;