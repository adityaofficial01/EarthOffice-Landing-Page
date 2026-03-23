import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { StaticImages } from 'utils/StaticImages';
import CustomButton from 'components/CustomButton';

const QuikyGramCarousel = () => {
    const carouselRef = useRef(null);

    const features = [
        {
            id: 1,
            image: StaticImages.ICONS.LoveQucky1,
            title: 'Shoppable Posts',
            description: 'Every piece of content can link to products or inspiration.'
        },
        {
            id: 2,
            image: StaticImages.ICONS.LoveQucky2,
            title: 'Built-in Audience Growth',
            description: 'Our discovery algorithm helps new creators get seen.'
        },
        {
            id: 3,
            image: StaticImages.ICONS.LoveQucky3,
            title: 'Seamless Monetization',
            description: 'Earn from engagement and conversions.'
        },
        {
            id: 4,
            image: StaticImages.ICONS.LoveQucky4,
            title: 'Direct Community Connection',
            description: 'Build loyalty through interaction and shared taste.'
        },
        {
            id: 5,
            image: StaticImages.ICONS.LoveQucky5,
            title: 'Mobile-First Tools',
            description: 'Post faster and smarter from your phone.'
        }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="w-full bg-white my-10">
            <div className=" mx-auto">
                {/* Header */}
                <div className="flex items-center px-5 sm:px-10 md:px-32 lg:px-40 xl:px-60 justify-between mb-12">
                    <p className='text-center sm:titleLarge  text-black'> Why People<span className='text-Blue-100'> Love QuikyGram</span></p>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
                        <Button
                            onClick={() => carouselRef.current?.prev()}
                            className="w-10 h-10 rounded-full bg-Buttongrey text-white flex items-center justify-center transition-colors"
                        >
                            <LeftOutlined className="text-gray-700" />
                        </Button>
                        <Button
                            onClick={() => carouselRef.current?.next()}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-Blue-200 to-Blue-100 text-white flex items-center justify-center transition-colors"
                        >
                            <RightOutlined className="text-white" />
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel ref={carouselRef} {...settings}>
                    {features.map((feature) => (
                        <div key={feature.id} className="px-3">
                            <div className="bg-white rounded-xl overflow-hidden h-full">
                                {/* Image */}
                                <div className="relative h-96 overflow-hidden rounded-xl">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="pt-6">
                                    <h3 className="titleMedium text-center font-bold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="titleSmall text-center text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <div className="flex justify-center mt-12 items-center">
                    <CustomButton htmlType="submit" className=" commonButton" >Start Creating on QuikyGram</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default QuikyGramCarousel;