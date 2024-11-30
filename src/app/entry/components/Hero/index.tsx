import {
  Paper,
  Text,
  Button,
  TextInput,
  Stack,
  Image,
  Group,
  Container,
  Title,
} from '@mantine/core';
import classes from './Hero.module.css'; 
import { BlogSection } from '../Blog/BlogSection';
import { NewsSection } from '../News';
import { SubscriptionSection } from '../SubscriptionSection';

export const Hero = () => {
  return (
    <>
      <div className={classes.root}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                 {''}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: 'Black', to: 'black' }}

                >
                  Empowering  Farmers
                </Text>{' '}
                With Data Driven Insights
              </Title>

              <Text className={classes.description} mt={30}>
                At SmartFarm, we believe in transforming traditional farming into a smarter, more sustainable practice. Our innovative platform combines cutting-edge technology with agricultural expertise to help
                farmers make informed decisions for optimal crop and water management.
              </Text>

              <Button
                variant="gradient"
                gradient={{ from: 'green', to: 'yellow' }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                Register Farmland
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <NewsSection />
      <BlogSection />
      <SubscriptionSection />
    </>
  );
};
