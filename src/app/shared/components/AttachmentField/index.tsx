import { Box, CloseButton, FileInput, Group, Image, Loader, rem, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconUpload } from '@tabler/icons-react';
import { useUploadAttachment } from '@farmtech/shared';

const defaulFileSize = 2;

export const AttachmentField = ({ filePath, fileSize = defaulFileSize, ...props }: any) => {
  const { form, name, label, isMultiple = false, accept } = props;
  const attachmentMutation = useUploadAttachment();

  const handleAttachment = (e: File) => {
    if (e?.size >= fileSize * 1024 * 1024) {
      notifications.show({
        color: 'red',
        title: 'File Size Limit Exceeded',
        message: `The selected file exceeds the maximum allowed size of ${fileSize}MB.`,
      });
    } else {
      if (e) {
        attachmentMutation.mutate(
          { attachment: e },
          {
            onSuccess: (data) => {
              form.setFieldValue(name + 'File', e);
              const file = data?.data;
              form.setFieldValue(name, file);
            },
            onError: (err) => {
              notifications.show({
                color: 'red',
                title: 'Error',
                message:
                  err?.message ?? 'Something went wrong with file upload. Please try again later.',
              });
            },
          }
        );
      }
    }
  };
  const handleClose = () => {
    form.setFieldValue(name + 'File', null);
    form.setFieldValue(name, null);
  };

  if (!filePath) {
    filePath = form.values[name]?.filePath;
  }

  return filePath ? (
    <>
      <Text fw={600} mb="xs" size="sm">
        {label}
      </Text>
      <Box maw={120}>
        <Group mb="xl" justify="space-between">
          <Image src={`${import.meta.env.VITE_API_URL}/${filePath}`} mb="sm" h={80} w={80} />
          <CloseButton mr={-9} mt={-19} onClick={handleClose} />
        </Group>
      </Box>
    </>
  ) : (
    <FileInput
      multiple={isMultiple}
      accept={accept ? accept : 'image/png, image/gif, image/jpeg , image/jpg , image/webp'}
      rightSection={
        attachmentMutation.isPending ? (
          <Loader size={15} />
        ) : attachmentMutation.isSuccess && form.values[name] ? (
          <IconCheck style={{ width: rem(15), height: rem(15) }} color="green" />
        ) : (
          <IconUpload style={{ width: rem(15), height: rem(15) }} />
        )
      }
      {...props}
      onChange={(event: File) => handleAttachment(event)}
    />
  );
};
