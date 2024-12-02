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
  useMantineTheme,
} from '@mantine/core';
import classes from './Hero.module.css';
import { BlogSection } from '../Blog/BlogSection';
import { NewsSection } from '../News';
import { SubscriptionSection } from '../SubscriptionSection';
import TypewriterComponent from 'typewriter-effect';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const theme = useMantineTheme();
  return (
    <>
      <div className={classes.root}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}> Empowering Farmers</Title>{' '}
              <Title className={classes.title}>
                {''}
                <TypewriterComponent
                  options={{
                    strings: ['With Data Driven Insights'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Title>
              <Text className={classes.description} mt={30}>
                At SmartFarm, we believe in transforming traditional farming into a smarter, more
                sustainable practice. Our innovative platform combines cutting-edge technology with
                agricultural expertise to help farmers make informed decisions for optimal crop and
                water management.
              </Text>
              <Link to="/register-land-soil">
                <Button
                  variant="filled"
                  size="xl"
                  radius={'xl'}
                  className={classes.control}
                  mt={40}
                >
                  Register Farmland
                </Button>
              </Link>
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
