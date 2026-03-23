import React from 'react';
import CustomImage from './CustomImage';
import { StaticImages } from 'utils/StaticImages';
import { MagnifyingGlass } from 'react-loader-spinner';
import CustomParagraph from './CustomParagraph';
import TitleHeader from './TitleHeader';

// Component to display No Data Media
const NoDataFound = ({ isEvent, loading, content = 'No Events' }) => {
    return (
        <div className='text-center flex justify-center items-center min-h-96'>
            {loading ?
                <MagnifyingGlass
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#fff"
                    color="#e15b64"
                />
                :
                <div className='flex flex-col gap-3 justify-center'>
                    {<CustomImage
                        src={isEvent ? StaticImages.EVENT.EventCalendar : StaticImages.NO_DATA.NoData}
                        height={isEvent ? 250 : 150}
                        className='animate-fadeIn'
                    />}
                    {isEvent && 
                    <div>
                        <CustomParagraph content={content} />
                        <TitleHeader fontSize='titleSmall' >No Event found!</TitleHeader>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default NoDataFound
