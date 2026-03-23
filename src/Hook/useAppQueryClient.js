import { useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';

function useAppQueryClient() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return queryClient;
}

export default useAppQueryClient;
