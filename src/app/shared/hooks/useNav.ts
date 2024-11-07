import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib';

export const useLatestNav = () => {
  return useQuery({
    queryKey: ['latest-nav'],
    queryFn: async () => (await apiClient.get(`/navs/latest`)).data,
  });
};
