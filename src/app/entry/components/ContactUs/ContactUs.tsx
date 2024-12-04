import { TextInput, Textarea, Button, Group, Title, SimpleGrid, Text, rem } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { ActionIcon } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import * as yup from 'yup';
import { useAddContact } from '@farmtech/entry/hooks';
import classes from './ContactUs.module.css';
import { ContactIconsList } from './ContactIcons';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

const ContactSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  name: yup.string().required('Name is required'),
  message: yup.string().required('Message is required'),
});

type ContactFormValues = yup.InferType<typeof ContactSchema>;

export const ContactUs = () => {
  const { mutate, isPending } = useAddContact();
  const form = useForm<ContactFormValues>({
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
    validate: yupResolver(ContactSchema),
  });

  const handleSubmit = (values: ContactFormValues) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          color: 'teal',
          title: 'Message Sent',
          message: 'Your message has been sent successfully!',
        });
        form.reset();
      },
      onError: (error: any) => {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: error?.message || 'Failed to send message. Try again later.',
        });
      },
    });
  };

  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={rem(28)} className={classes.social} variant="transparent">
      <Icon size={rem(20)} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours.
          </Text>
          <ContactIconsList />
          <Group mt="xl">{icons}</Group>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            size="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Name"
            placeholder="Enter your name"
            withAsterisk
            size="md"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Your Message"
            placeholder="Enter your message"
            withAsterisk
            size="md"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
            {...form.getInputProps('message')}
          />
          <Group justify="right" mt="md">
            <Button type="submit" size="md" loading={isPending} className={classes.control}>
              Send Message
            </Button>
          </Group>
        </form>
      </SimpleGrid>
    </div>
  );
};
