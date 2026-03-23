import useCustomMutation from "Hook/useCustomMutation";
import useAppDispatch from "Hook/useAppDispatch";
import { storeCommonContent } from "../redux/action/action";
import { COMMON } from "utils/EndPoint";
import { QueryKeys } from "Constant/TanKeys";
import { METHODS } from "Constant/variable";

// Custom hook for getting common content
export const useCommonContentMutation = () => {
    const dispatch = useAppDispatch();

    // Initialize the mutation hook with necessary settings
    const { mutate: fetchCommonContentMutation, data: commonContentData, isPending: isFetchingContent } = useCustomMutation({
        mutationKey: QueryKeys.LANDING.COMMON_CONTENT,
        showSuccessToast:false,
        onSuccessCallback: (successData) => {
            // Dispatch action to store the fetched data
            dispatch(storeCommonContent(successData?.data));
        },
    });

    // Function to trigger the mutation for fetching content
    const fetchCommonContent = () => {
        const contentRequestData = {
            myObj: null,
            url: COMMON.COMMON.COMMON_CONTENT,
            method: METHODS.GET,
        };
        fetchCommonContentMutation(contentRequestData);
    };

    // Return the mutation trigger function and data for external use
    return { fetchCommonContent, commonContentData, isFetchingContent };
};
