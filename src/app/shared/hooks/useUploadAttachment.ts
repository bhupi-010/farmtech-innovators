import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../lib';

type AttachmentPayload = {
  file: File;
};

export const useUploadAttachment = () => {
  return useMutation({
    mutationFn: async ({ file }: AttachmentPayload) => {
      const formData = new FormData();
      formData.append('file', file);
      return await apiClient.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};
