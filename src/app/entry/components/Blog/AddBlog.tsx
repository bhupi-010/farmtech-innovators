import {
  Anchor,
  Checkbox,
  Group,
  MultiSelect,
  Select,
  Textarea,
  TextInput,
  rem,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationButton } from '@farmtech/auth/components';
import { useCreateBlogPost, useGetAllCategories, useGetAllTags } from '@farmtech/entry/hooks';
import { AttachmentField, useLocalStorage } from '@farmtech/shared';
import * as yup from 'yup';

const BlogPostSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  content: yup.string().required('Content is required'),
  categoryId: yup.string().required('Category is required'),
  tagIds: yup.array().required('At least one tag is required'),
  image: yup.string().required('Image is required'),
});

type BlogPost = yup.InferType<typeof BlogPostSchema>;

export const AddBlog = () => {
  const { mutate, isPending } = useCreateBlogPost();
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategories();
  const { data: tags, isLoading: tagsLoading } = useGetAllTags();
  const navigate = useNavigate();
  const form = useForm<BlogPost>({
    initialValues: {
      title: '',
      author: '',
      content: '',
      categoryId: '',
      tagIds: [],
      image: '',
    },
    validate: yupResolver(BlogPostSchema),
  });

  const handleSubmit = (values: BlogPost) => {
    const { title, author, content, categoryId, tagIds, image } = values;
    mutate(
      { title, author, content, categoryId, tagIds, image },
      {
        onSuccess: (data: any) => {
          notifications.show({
            color: 'teal',
            title: 'Blog Post Created Successfully',
            message: 'Your blog post has been created successfully.',
          });
          navigate('/blogs');
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message
              ? err?.message
              : 'Failed to create blog post! Please try again later',
          });
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        label="Title"
        placeholder="Enter blog post title"
        size="md"
        withAsterisk
        mt="md"
        {...form.getInputProps('title')}
      />
      <TextInput
        label="Author"
        placeholder="Enter author name"
        size="md"
        mt="md"
        {...form.getInputProps('author')}
      />
      <Textarea
        label="Content"
        placeholder="Enter content for the blog post"
        size="md"
        withAsterisk
        mt="md"
        {...form.getInputProps('content')}
      />
      <Select
        label="Category"
        placeholder="Select a category"
        data={
          categories?.data?.results.map((category: any) => ({
            value: category.id,
            label: category.name,
          })) || []
        }
        size="md"
        withAsterisk
        mt="md"
        {...form.getInputProps('categoryId')}
      />
      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        data={tags?.data?.results.map((tag: any) => ({
          value: tag.id,
          label: tag.name,
        }))}
        size="md"
        mt="md"
        {...form.getInputProps('tagIds')}
      />
      <AttachmentField
        name="image"
        form={form}
        label="Farmland Image"
        imageStoreName="imageFile"
        isimageonly={true}
        placeholder="Farmland Image"
        error={form.errors.hasOwnProperty('image')}
        withAsterisk
        mb="md"
      />
      
      <AuthenticationButton title="Create Blog Post" isLoading={isPending} />
    </form>
  );
};
