import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiQuery } from '../redux/action/action';
import CustomToast from 'utils/CustomToast';

const useCustomMutation = ({ mutationKey, invalidateQueryIds, onSuccessCallback, onErrorCallback, showSuccessToast=true }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [...mutationKey],
        mutationFn: getApiQuery,
        gcTime: 0,
        retry: 3,
        retryDelay: 60 * 1000, // Retry every 60 seconds
        onError: (error) => {
            CustomToast('e', error);
            onErrorCallback?.(error); // Use optional chaining to simplify the callback
        },
        onSuccess: (data) => {
            const { status, data: responseData } = data || {};

            if (status === 401) {
                console.log('Logged Out');
                return;
            }

            if ([400, 404, 417, 500, 422].includes(status)) {
                console.log('ApiResponseData', responseData)
                onErrorCallback?.(data);
                CustomToast('e', responseData?.message);
                return;
            }
            
            if (status === 200) {
                if (invalidateQueryIds) {
                    queryClient.invalidateQueries([invalidateQueryIds]);
                }
                if(showSuccessToast){
                    CustomToast('s', responseData?.message);
                }
                onSuccessCallback?.(responseData);
            }
        },
        select: (data) => data?.data, // Directly select the nested data if it exists
    });
};

export default useCustomMutation;
