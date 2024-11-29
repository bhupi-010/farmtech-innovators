import { Card, Title, Text, Button, Center, Stack, Grid, Container, List } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { loadStripe } from '@stripe/stripe-js';
import { useSubscription } from '@farmtech/entry/hooks';

const stripePromise = loadStripe('pk_test_TppDF6AQWFbnKVWuLRtSvdtU002PINObpa');

export const Subscription = () => {
  const addSubscription = useSubscription();
  const handleSubscribe = async (planType: string) => {
    const stripe = await stripePromise;

    addSubscription.mutate(
      { plan: planType }, 
      {
        onSuccess: async (data: any) => {
          notifications.show({
            color: 'blue',
            title: 'Success',
            message: 'Subscription created successfully!',
          });

          const { sessionId } = data;
          if (stripe) {
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              console.error('Stripe checkout error:', error.message);
            }
          }
        },
        onError: (err: any) => {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: err?.message || 'Failed to create subscription! Please try again later.',
          });
        },
      }
    );
  };

  return (
    <Container style={{ flexDirection: 'column', padding: '1rem' }}>
      <Title ta="center" order={1} mb="lg">
        Subscription Plans
      </Title>
      <Text ta="center" size="lg" color="dimmed" mb="xl">
        Choose a plan that fits your needs
      </Text>
      <Grid gutter="lg" style={{ maxWidth: 1200 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card mih="320px" shadow="md" padding="lg" radius="md" withBorder>
            <Stack justify="center">
              <Title order={3}>Monthly Plan</Title>
              <Text>$10/month</Text>
              <Text size="md" h={120} color="dimmed">
                Features:
                <List size='sm'>
                  <List.Item>Register multiple land</List.Item>
                  <List.Item>24/7 support</List.Item>
                </List>
              </Text>
              <Button
                color="blue"
                size="md"
                onClick={() => handleSubscribe('monthly')}
              >
                Subscribe Now
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card mih="320px" shadow="md" padding="lg" radius="md" withBorder>
            <Stack justify="center">
              <Title order={3}>Yearly Plan</Title>
              <Text>$100/year</Text>
              <Text size="md" h={120} color="dimmed">
                Features:
                <List size='sm'>
                  <List.Item>Register multiple land</List.Item>
                  <List.Item>Priority 24/7 support</List.Item>
                  <List.Item>One month free!</List.Item>
                </List>
              </Text>
              <Button
                color="green"
                size="md"
                onClick={() => handleSubscribe('yearly')}
              >
                Subscribe Now
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
