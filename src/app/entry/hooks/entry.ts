import { useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthContext } from '@farmtech/auth';
import { apiClient } from '@farmtech/shared';

export const useAddFarmlandDetails = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/farmland/', data),
  });
};

export const useEditFarmlandDetails = (id: any) => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post(`/farmland/${id}/`, data),
  });
};

export const useAddSoilDetails = () => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post('/register-soil-data/', data),
  });
};

export const useEditSoilDetails = (id: any) => {
  return useMutation({
    mutationFn: async (data: any) => await apiClient.post(`/soil/${id}/`, data),
  });
};
