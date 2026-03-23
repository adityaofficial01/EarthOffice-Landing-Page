import { Col, Row } from 'antd'
import CustomImage from 'components/CustomImage'
import React from 'react'
import QuikyGramCarousel from 'screens/common/QuikyGramCarousel'
import { StaticImages } from 'utils/StaticImages'

const AboutUs = () => {
    return (
        <div className=' bg-aboutUsBg bg-cover bg-top bg-no-repeat min-h-[80vh]'>
            <div className='pt-32 sm:pt-56 flex flex-col z-50 justify-center items-center'>
                <p className='text-center titleLarge  text-black'>About<span className='text-Blue-100'> Us</span></p>
                <p className='titleSmall max-w-6xl  font-Poppins mt-6 text-center md:text-start'>QuikyGram exists to make the world more connected, inspired, and empowered through visual discovery. We believe social media should feel intuitive — not overwhelming. Shopping should feel seamless not complicated.</p>
            </div>

            {/* MISSION */}
            <div className='p-3 sm:pl-5 xl:pl-64'>
                <Row className='  mt-32'>
                    <Col xs={24} md={24} lg={12}>
                        <div className='w-full h-full rounded-xl min-h-[70vh] bg-MissionBg bg-cover bg-center bg-no-repeat'>

                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={12} className='relative overflow-hidden'>
                        <div className='absolute z-0 md:top-12 md:-left-20'>
                            <CustomImage height={600} src={StaticImages.ICONS.RectangleImage} />
                        </div>
                        <div className=' flex justify-center md:justify-start items-center h-full w-full'>

                            <div className='h-full mt-10 sm:mt-5 lg:h-[90%] xl:h-96  flex flex-col justify-center items-center w-full lg:w-[90%] xl:w-[65%] shadow-box-shadow  z-10 bg-white rounded-xl'>
                                <p className='titleMedium font-semibold text-center'>OUR MISSION</p>
                                <p className='max-w-96 description text-center'>QuikyGram exists to make the world more connected, inspired, and empowered through visual discovery. We believe social media should feel intuitive — not overwhelming. Shopping should feel seamless — not complicated.</p>
                                <p className='max-w-96 mt-3 description text-center'>So we built a place where creativity meets convenience, and where style moves at the speed of your scroll.</p>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
            {/* Vision */}
            {/* Vision */}
            <div className='p-3 sm:pr-5 xl:pr-56'>
                <Row className='mt-32'>
                    {/* LEFT CONTENT */}
                    <Col xs={24} md={24} lg={12} className='relative overflow-hidden'>
                        {/* Decorative Rectangle (mirrored position) */}
                        <div className='absolute z-0 md:top-12 md:-right-20'>
                            <CustomImage height={600} src={StaticImages.ICONS.RectangleImage} />
                        </div>

                        <div className='flex justify-center md:justify-end items-center h-full w-full'>
                            <div className='h-full mt-10 sm:mt-5 lg:h-[90%] xl:h-96 flex flex-col justify-center items-center w-full lg:w-[90%] xl:w-[65%] shadow-box-shadow z-10 bg-white rounded-xl'>
                                <p className='titleMedium font-semibold text-center'>
                                    OUR VISION
                                </p>

                                <p className='max-w-96 description text-center'>
                                    A global community where:
                                </p>
                                <p className='max-w-96 description text-center'>
                                    1.Creators thrive
                                </p>
                                <p className='max-w-96 description text-center'>
                                    2.Trends emerge organically
                                </p>
                                <p className='max-w-96 description text-center'>
                                    3.Shoppers explore freely
                                </p>
                                <p className='max-w-96 description text-center'>
                                    4.Brands connect authentically
                                </p>

                                <p className='max-w-96 mt-3 description text-center'>
                                    QuikyGram is more than an app — it’s a next-generation social ecosystem.
                                </p>
                            </div>
                        </div>
                    </Col>

                    {/* RIGHT IMAGE */}
                    <Col xs={24} md={24} lg={12}>
                        <div className='w-full h-full rounded-xl min-h-[70vh] bg-VisionBg bg-cover bg-center bg-no-repeat' />
                    </Col>
                </Row>
            </div>
            {/* our story */}
            <div className='p-3 sm:pl-5 xl:pl-64'>
                <Row className='  mt-32'>
                    <Col xs={24} md={24} lg={12}>
                        <div className='w-full h-full rounded-xl min-h-[70vh] bg-StoryBg bg-cover bg-center bg-no-repeat'>

                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={12} className='relative overflow-hidden'>
                        <div className='absolute z-0 md:top-12 md:-left-20'>
                            <CustomImage height={600} src={StaticImages.ICONS.RectangleImage} />
                        </div>
                        <div className=' flex justify-center md:justify-start items-center h-full w-full'>

                            <div className='h-full mt-10 sm:mt-5 lg:h-[90%] xl:h-96  flex flex-col justify-center items-center w-full lg:w-[90%] xl:w-[65%] shadow-box-shadow  z-10 bg-white rounded-xl'>
                                <p className='titleMedium font-semibold text-center'>OUR STORY</p>
                                <p className='max-w-96 description font-semibold text-center'>What if discovering and shopping from content could happen in one tap?</p>
                                <p className='max-w-96 description text-center'>As social media evolved, the gap between creators, followers, and commerce grew wider. We closed that gap. Today, QuikyGram brings creators, communities, and products together in a single, fluid experience.</p>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
            
            {/* Why People Love QuikyGram */}
            <QuikyGramCarousel/>

</div>
    )
}
            
export default AboutUs