import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@farmtech/auth';
import { apiClient } from '@farmtech/shared';

export const useAddFarmlandDetails = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/farmland/', data),
  });
};

export const useEditFarmlandDetails = (id: any) => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.put(`/farmland/${id}/`, data),
  });
};

export const useAddSoilDetails = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/soil-data/', data),
  });
};

export const useEditSoilDetails = (id: any) => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.put(`/soil-data/${id}/`, data),
  });
};

export const useSubscription = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/subscription/', data),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => (await apiClient.get('/user/profile')).data,
  });
};

export const useGetFarmland = () => {
  return useQuery({
    queryKey: ['farmland'],
    queryFn: async () => (await apiClient.get('/farmland')).data,
  });
};

export const useCropSuggestion = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/crop/crop-suggestions/', data),
  });
};

export const useGetAllNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => (await apiClient.get('/farmland')).data,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/blog/posts/', data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['AllBlogs'] });
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await apiClient.get('/blog/categories')).data,
  });
};

export const useGetAllTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => (await apiClient.get('/blog/tags')).data,
  });
};

export const useGetBlogs = (query: string) => {
  return useQuery({
    queryKey: ['AllBlogs', query], // Add query as part of the query key
    queryFn: async () => {
      const params = query ? { search: query } : {};
      return (await apiClient.get('/blog/posts', { params })).data;
    },
  });
};

export const useGetBlog = (id: any) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => (await apiClient.get(`/blog/posts/${id}`)).data,
    enabled: !!id,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post(`/blog/comments/`, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['blog'] });
    },
  });
};

export const useGetCommentsById = (id: any) => {
  return useQuery({
    queryKey: ['comment', id],
    queryFn: async () => (await apiClient.get(`/blog/comments/${id}`)).data,
  });
};

export const useGetComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: async () => (await apiClient.get('/blog/comments/')).data,
  });
};
