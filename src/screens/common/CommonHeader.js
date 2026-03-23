import * as AntdComponent from 'antd';
import CustomButton from 'components/CustomButton'
import CustomImage from 'components/CustomImage'
import IconButton from 'components/IconButton';
import useScrollToSection from 'Hook/useScrollToSection';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterKeys } from 'routes/RouterKey';
// import { NavLink } from 'react-router-dom';
import { AppStoreLink, playStoreLink } from 'utils/Constant';
import { ReactIcons } from 'utils/ReactIcons';
import { StaticImages } from 'utils/StaticImages'


function CommonHeader() {

    const [popoverVisible, setPopoverVisible] = React.useState(false);
    const scrollToSection = useScrollToSection();

    // const handleScrollAndClose = (section, offset = 0) => {
    //     scrollToSection(section, offset);
    //     setPopoverVisible(false); // Close the popover
    // };
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
        <div className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 common_container  bg-white rounded-lg px-4 py-3 md:py-4 z-50 ">
            <div className="flex items-center gap-16 justify-evenly">
                <CustomButton onClick={() => { scrollToSection('home', 200) }} className='py-2 md:py-0 bg-transparent'>
                    <CustomImage src={StaticImages.LOGO.Logo} className='h-10 lg:h-14 lg:min-w-14' />
                </CustomButton>
                <div className='flex justify-evenly items-center w-full'>
                    <div className="hidden lg:flex w-full gap-16 items-center">
                        <div className="hidden md:flex gap-12 xl:gap-12 w-full">
                            <CustomButton onClick={() => { goHomeAndScroll('home', 200); }} className="font-semibold description sm:titleSmall">Home</CustomButton>
                            <CustomButton onClick={() => { navigate(RouterKeys.HOME.ABOUTUS); }} className="font-semibold description sm:titleSmall">About Us</CustomButton>
                            <CustomButton onClick={() => { goHomeAndScroll('features', 100); }} className="font-semibold description sm:titleSmall">Features</CustomButton>
                            <CustomButton onClick={() => { goHomeAndScroll('Testimonials', 100); }} className="font-semibold description sm:titleSmall">Testimonials</CustomButton>
                            <CustomButton onClick={() => { goHomeAndScroll('contact', 100); }} className="font-semibold description sm:titleSmall">Contact Us</CustomButton>
                        </div>
                        <div className="hidden xl:flex gap-4 min-w-80 items-center">
                            <a href={playStoreLink} rel='noreferrer' target='_blank' className='flex items-center'>
                                <CustomImage src={StaticImages.DOWNLOAD.PlayStore} height={50} />
                            </a>
                            <a href={AppStoreLink} target='_blank' rel='noreferrer' className='flex items-center'>
                                <CustomImage src={StaticImages.DOWNLOAD.AppStore} height={50} />
                            </a>
                        </div>
                    </div>
                    {/*For Mobile Devices */}
                    <AntdComponent.Flex align="left" vertical className='block lg:hidden absolute right-4'>
                        <AntdComponent.Popover
                            placement="bottomRight"
                            arrow={false}
                            visible={popoverVisible}
                            onVisibleChange={(visible) => setPopoverVisible(visible)}
                            content={
                                <div className="grid gap-3 p-3">
                                    <CustomButton onClick={() => { goHomeAndScroll('home', 200); setPopoverVisible(false); }} className="font-semibold description">Home</CustomButton>
                                    <CustomButton onClick={() => { navigate(RouterKeys.HOME.ABOUTUS); setPopoverVisible(false); }} className="font-semibold description">About us</CustomButton>
                                    <CustomButton onClick={() => { goHomeAndScroll('features', 100); setPopoverVisible(false); }} className="font-semibold description">Features</CustomButton>
                                    <CustomButton onClick={() => { goHomeAndScroll('Testimonials', 100); setPopoverVisible(false); }} className="font-semibold description">Testimonials</CustomButton>
                                    <CustomButton onClick={() => { goHomeAndScroll('contact', 100); setPopoverVisible(false); }} className="font-semibold description">Contact Us</CustomButton>
                                    <div className="flex flex-col gap-3">
                                        <a href={playStoreLink} target="_blank" rel="noreferrer" onClick={() => setPopoverVisible(false)}>
                                            <CustomImage src={StaticImages.DOWNLOAD.PlayStore} height={60} width={200} />
                                        </a>
                                        <a href={AppStoreLink} target="_blank" rel="noreferrer" onClick={() => setPopoverVisible(false)}>
                                            <CustomImage src={StaticImages.DOWNLOAD.AppStore} height={60} width={200} />
                                        </a>
                                    </div>
                                </div>
                            }
                        >
                            <span>
                                <IconButton
                                    className="m-0 p-0 pt-14"
                                    Icon={<ReactIcons.MenuBar />}
                                    onClick={() => setPopoverVisible(!popoverVisible)}
                                />
                            </span>
                        </AntdComponent.Popover>
                    </AntdComponent.Flex>
                </div>
            </div>

        </div>

    )
}

export default CommonHeader
