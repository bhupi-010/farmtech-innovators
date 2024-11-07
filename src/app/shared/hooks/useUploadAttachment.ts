import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../lib';

type AttachmentPayload = {
  attachment: File;
  maxFileSize?: number;
};

export const useUploadAttachment = () => {
  return useMutation({
    mutationFn: async ({ attachment }: AttachmentPayload) => {
      const formData = new FormData();
      formData.append('attachment', attachment);
      return await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};
