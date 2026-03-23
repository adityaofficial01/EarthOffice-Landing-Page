import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getApiQuery } from '../redux/action/action';

const useCustomQuery = ({ 
    queryKey, 
    url, 
    method = 'GET', 
    myObj = null, 
    hasFile = false, 
    enabled,
}) => {
    const queryClient = useQueryClient();

    const { data, error, isLoading, isFetching, refetch, isRefetching, failureReason, isError, isSuccess } = useQuery({
        queryKey: [...queryKey],
        queryFn: () => getApiQuery({ url, method, myObj, hasFile }),
        gcTime: 10000,
        retry: 3,
        enabled,
        suspense:false,
        retryOnMount:true,
        refetchOnMount:true,
        retryDelay: 60 * 1000, // Retry in case of failure in every 1 Minute
        refetchInterval: 5 * 60 * 1000, // Refresh in every 5 minutes.   
        refetchOnReconnect: true,
        refetchOnWindowFocus:true,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        refetchIntervalInBackground: true,
        notifyOnChangeProps: 'all',
        refetchIntervalMaxWait: 60 * 60 * 1000, // Wait for 1 minute before refetching
        select: (data) => data?.data, // Return only the nested data
    });

    // Function to invalidate the query cache for the specified query key
    const invalidateQuery = () => queryClient.invalidateQueries([queryKey]);

    return { 
        data, 
        error, 
        isError,
        isSuccess,
        isLoading, 
        isFetching, 
        isRefetching, 
        failureReason, 
        refetch,  // Expose refetch function to the parent
        invalidateQuery // Expose invalidateQuery function to the parent
    };
};

export default useCustomQuery;