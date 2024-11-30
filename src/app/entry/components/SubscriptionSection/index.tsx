import { Button, Image, Text, TextInput, Title } from '@mantine/core';
import image from './image.svg';
import classes from './SubscriptionSection.module.css';
import tractor from '../../../../../public/assets/tractor.png';
import { Link } from 'react-router-dom';

export function SubscriptionSection() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Text style={{ fontWeight: 500, fontSize: '40px', lineHeight: '48px' }}>Subscribe</Text>
        <Text fw={500} style={{ fontSize: '20px', lineHeight: '48px' }} mb={5}>
          Join the SmartFarm community!
        </Text>
        <Text fz="sm" c="dimmed">
          Will allow you to register multiple farmlands and you will never miss important product updates, latest news and community QA sessions.
        </Text>

        <div className={classes.controls}>
          <Link to="/subscription">
            <Button radius={'xl'} size="xl">
              Subscribe
            </Button>
          </Link>
        </div>
      </div>
      <Image src={tractor} className={classes.image} />
    </div>
  );
}
