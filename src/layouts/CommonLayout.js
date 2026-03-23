import * as React from 'react';
import { Layout } from 'antd';
import { useCommonContentMutation } from 'Api/CommonContent';
// import CustomImage from 'components/CustomImage';
import { Outlet } from 'react-router-dom';

import LoadingWrapper from 'components/LoadingWrapper';
import SuspenseLoader from 'utils/SuspenseLoader';
// import { StaticImages } from 'utils/StaticImages';

const CommonLayout = () => {
    const { fetchCommonContent, commonContentData, isFetchingContent } = useCommonContentMutation();

    React.useEffect(() => {
        fetchCommonContent()
    }, [])
    return (
        <Layout className='min-h-screen'>
            <div className="container">
                <div className='flex justify-center items-center p-5'>
                    {/* <CustomImage src={StaticImages.LOGO.Logo} height={70} width={300} /> */}
                </div>
                <div className=' py-5'>
                    <React.Suspense fallback={<SuspenseLoader />}>
                        <LoadingWrapper loading={isFetchingContent} >
                            <Outlet context={commonContentData} />
                        </LoadingWrapper>
                    </React.Suspense>
                </div>
            </div>
        </Layout>
    );
};

export default CommonLayout
