import { Paper } from '@mantine/core';
import Typewriter from 'typewriter-effect';
import classes from './Hero.module.css'; // Custom styles

export const Hero = () => {
  return (
    <Paper className={classes.paper} p="lg" mih={'80vh'}>
      <Typewriter
        options={{
          strings: ['Welcome to Our Website!', 'We offer amazing services'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </Paper>
  );
};
