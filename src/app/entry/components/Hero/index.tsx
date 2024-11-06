import { Link } from 'react-router-dom';
import {
  Image,
  Container,
} from '@mantine/core';

// import image from './hero.jpg';
import classes from './Hero.module.css';

export const Hero = () => {
  return (
    <div className={classes.wrapper}>
      <Container size="xl">
        {/* <Image src={image } className={classes.image} height={500} alt="Hero image" /> */}
      </Container>
    </div>
  );
};
