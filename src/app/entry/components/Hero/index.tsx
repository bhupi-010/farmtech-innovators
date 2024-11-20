import { Paper } from '@mantine/core';
import Typewriter from 'typewriter-effect';
import classes from './Hero.module.css'; // Custom styles
import { BlogSection } from '../Blog';
import { NewsSection } from '../News';

export const Hero = () => {
  return (
    <Paper className={classes.paper}  mih={'80vh'}>
      <NewsSection />
      <BlogSection />
      {/* <Typewriter
        options={{
          strings: ['Welcome to Our Website!', 'We offer amazing services'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      /> */}
    </Paper>
  );
};
