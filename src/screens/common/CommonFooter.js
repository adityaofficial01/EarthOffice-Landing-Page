import React from 'react'
import CustomImage from 'components/CustomImage';
import { StaticImages } from 'utils/StaticImages';
import CommonContainer from 'components/CommonContainer';
import CustomButton from 'components/CustomButton';
import useScrollToSection from 'Hook/useScrollToSection';
import CustomDivider from 'components/CustomDivider';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterKeys } from 'routes/RouterKey';

function CommonFooter() {
  const scrollToSection = useScrollToSection();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === RouterKeys.HOME.HOME;

  const goHomeAndScroll = (section, offset = 0) => {
    if (isHome) {
      scrollToSection(section, offset);
    } else {
      navigate(RouterKeys.HOME.HOME, {
        state: { scrollTo: section, offset },
      });
    }
  };
  return (
    <div>
      {/* Footer */}
      <section>
        <div className="px-2 bg-footerBg bg-cover bg-center bg-no-repeat">
          <CommonContainer>
            <CustomDivider className='my-5 ' />

            <div className="flex gap-5 justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap my-0 common_container">
              <div className='text-center sm:text-start'>
                <CustomButton onClick={() => { goHomeAndScroll('home', 200) }} className="bg-transparent mt-5">
                  <CustomImage
                    height={80}
                    preview={false}
                    draggable={false}
                    src={StaticImages.LOGO.Logo}
                    alt="logo"
                    className=''
                  />
                </CustomButton>
                <p className='titleSmall pl-3 font-semibold'>Quickygram</p>
                <p className='titleSmall pl-3 max-w-96'>The next evolution of social media.
                  Discover, connect, and shop—all in
                  one feed.</p>
                <div className='flex justify-center items-center gap-2 mt-3'>
                  <Button type='ghost' className='w-fit p-0 m-0'><CustomImage height={40} src={StaticImages.ICONS.Insta} /></Button>
                  <Button type='ghost' className='w-fit p-0 m-0'><CustomImage height={40} src={StaticImages.ICONS.Facebook} /></Button>
                  <Button type='ghost' className='w-fit p-0 m-0'><CustomImage height={40} src={StaticImages.ICONS.Linkedin} /></Button>
                  <Button type='ghost' className='w-fit p-0 m-0'><CustomImage height={40} src={StaticImages.ICONS.Twitter} /></Button>
                </div>
              </div>
              <div className='flex flex-col  items-start justify-start  gap-3 sm:gap-0 xl:gap-7 flex-wrap lg:flex-nowrap'>
                <p className='titleSmall font-semibold'>Quick Links</p>
                <CustomButton onClick={() => { goHomeAndScroll('home', 200) }} className="font-medium description text-s w-fit px-0 m-0"><p className='titleMini'>Home</p></CustomButton>
                <CustomButton onClick={() => {navigate(RouterKeys.HOME.ABOUTUS) }} className="font-medium description text-s -ml-2 w-fit px-0 m-0"> <p className='titleMini'>About Us</p></CustomButton>
                <CustomButton onClick={() => { goHomeAndScroll('features', 200) }} className="font-medium description text-s w-fit px-0 m-0 -ml-2"> <p className='titleMini'>Features</p></CustomButton>
                <CustomButton onClick={() => { goHomeAndScroll('Download', 200) }} className="font-medium description text-s w-fit px-0 m-0"><p className='titleMini'>Download</p></CustomButton>
              </div>
              <div className='flex flex-col  items-start justify-start  gap-3 sm:gap-0 xl:gap-7 flex-wrap lg:flex-nowrap'>
                <p className='titleSmall font-semibold'>Support</p>
                <CustomButton onClick={() => { goHomeAndScroll('home', 200) }} className="font-medium description text-s w-fit px-0 m-0"><p className='titleMini'>Contact Support</p></CustomButton>
                <CustomButton  className="font-medium description text-s w-fit px-0 m-0 -ml-2"> <p className='titleMini'>Creator Sign-Up</p></CustomButton>
                <CustomButton onClick={() => navigate(RouterKeys.COMMON.PRIVACY)} className="font-medium description text-s w-fit px-0 m-0 -ml-2"> <p className='titleMini'>Privacy Policy</p></CustomButton>
                <CustomButton  onClick={() => navigate(RouterKeys.COMMON.TERMS)} className="font-medium text-s w-fit px-0 m-0"><p className='titleMini'>Terms & Condition</p></CustomButton>
              </div>
            </div>
          </CommonContainer>
        </div>


        {/* Footer  */}
        <div className=" bg-gradient-to-r from-[#8E45F6] to-[#5C80F5] p-4 text-white">
          <p className='footerTitle font-Poppins text-center'>&copy; {dayjs().year()} QuikyGram. All rights reserved. - <a className='font-bold underline' href='https://solidappmaker.com/' target='_blank' rel='noreferrer'>Quikygram</a> | Designed & Developed by <a href='https://solidappmaker.com/' target='_blank' rel='noreferrer' className='font-bold underline'>Solid App Maker</a> </p>
        </div>
      </section>
    </div>
  )
}

export default CommonFooter
