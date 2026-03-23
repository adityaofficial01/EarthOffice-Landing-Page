import React from 'react';
import { useCommonContentMutation } from 'Api/CommonContent';
import LoadingWrapper from 'components/LoadingWrapper';

const termsConditions = () => {
  const { fetchCommonContent, commonContentData, isFetchingContent } = useCommonContentMutation();

  React.useEffect(() => {
    fetchCommonContent();
  }, []);
  console.log('commonContentData', commonContentData)

  // Optionally, safely extract privacy content from the fetched data
  const privacyContent = commonContentData?.data?.data?.terms_conditions ?? '';

  return (
    <LoadingWrapper loading={isFetchingContent}>
      <div>
        <div className="mt-20 flex flex-col justify-center items-center sm:mt-36">
          <p className=' titleLarge text-left text-black'>Terms of <span className='text-Blue-100'> Service</span></p>
        </div>
        <div className='max-w-6xl text-center mt-5 '>
          <p dangerouslySetInnerHTML={{ __html: privacyContent }} />

        </div>
      </div>
    </LoadingWrapper>
  );
};

export default termsConditions;