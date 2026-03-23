import React from "react";
import { Card, Carousel } from "antd";
import CustomImage from "components/CustomImage";
import { StaticImages } from "utils/StaticImages";
import CustomButton from "components/CustomButton";

const features = [
  {
    icon: <CustomImage height={30} src={StaticImages.ICONS.BrowseFeed} alt="Video Messaging" className="" />,
    title: "Browse Your Feed",
    description:
      "Scroll through content curated for your interests, style, and preferences.",
    bg: "bg-Yellow-50",
  },
  {
    icon: <CustomImage height={30} src={StaticImages.ICONS.Explore} alt="Media Sharing" />,
    title: "Explore What Catches Your Eye",
    description:
      "Tap on posts to see more details, creator info, and related products.",
    bg: "bg-Blue-50",
  },
  {
    icon: <CustomImage height={30} src={StaticImages.ICONS.Shop} alt="Shopping Bag" />,
    title: "Shop Instantly",
    description:
      "Purchase what you love with just a few taps — no redirects, no delays.",
    bg: "bg-Purple-50",
  },
  {
    icon: <CustomImage height={30} src={StaticImages.ICONS.Follow} alt="Shopping Bag" />,
    title: "Follow & Build Your Vibe",
    description:
      "Connect with creators and brands that match your aesthetic and interests.",
    bg: "bg-Blue-60",
  },
];

const FeaturesCarousel = () => {
  const carouselRef = React.useRef();

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div id="features" name="features" className=" bg-Violet-100   text-center bg-gray-100 py-20">
      {/* Title Section */}
      <h2 className="titleMedium sm:titleLarge  font-bold mb-4 ">
        How QuikyGram{" "}
        <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-Blue-200 to-Blue-100">
          Works
        </span>
      </h2>
      <p className=" mx-auto max-w-6xl px-4 sm:titleSmall mb-12">
        Four simple steps to discover, engage, and shop all in one place.
      </p>

      {/* Carousel */}
      <div className="relative  mx-auto md:px-20">
        <Carousel
          ref={carouselRef}
          dots={{ className: "custom-dots absolute top-86 " }}
          slidesToShow={3}
          infinite

          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
        >
          {features.map((feature, index) => (
            <div key={index} className="px-3 text-left">
              <Card className="shadow-md rounded-xl sm:p-2 lg:p-2   transition-all flex justify-start items-start flex-col h-auto">
                <div
                  className={`size-16 flex items-center justify-center shadow-box-shadow rounded-xl mb-4 ${feature.bg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-title24">{feature.title}</h3>
                <p className=" mt-2 text-title20 text-black ">{feature.description}</p>
              </Card>
            </div>
          ))}
        </Carousel>

        <div className="flex justify-between items-center w-full pl-4 md:w-[92%] -bottom-24  absolute">
          {/* Arrows */}
          <button
            onClick={prev}
            className=" z-50     w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <CustomImage src={StaticImages.ICONS.leftArrow} alt="Left Arrow" className="size-10 " />
          </button>
          <button
            onClick={next}
            className=" z-50    w-20 h-20 flex items-center justify-center rounded-full  text-white"
          >
            <CustomImage src={StaticImages.ICONS.rightArrow} alt="Right Arrow" className="size-10 " />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-32 items-center">
        <CustomButton  htmlType="submit" className=" commonButton" >GET STARTED</CustomButton>
      </div>
    </div>
  );
};

export default FeaturesCarousel;

