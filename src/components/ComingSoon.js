import React from 'react';
import CustomImage from 'components/CustomImage';
import { StaticImages } from 'utils/StaticImages';

const ComingSoon = () => {


    return (
        <div className="min-h-screen bg-black-800 text-white flex flex-col items-center justify-center px-6">
            <di1v className="">

                <CustomImage
                    src={StaticImages.LOGO.Logo}
                    height={120}
                />
            </di1v>
            <p className='titleLarge font-medium mt-4 text-red-900 my-10'><span className='text-red-900 titleLarge font-bold italic'>Coming Soon...</span></p>
            <CustomImage src={StaticImages.LOGO.Logo} height={400} />
        </div>
    );
};

export default ComingSoon;
