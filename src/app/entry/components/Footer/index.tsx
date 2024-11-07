import { Container, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const data = [
  {
    title: 'Our Terms',
    links: [{ label: 'Support', link: '/pages/support' }],
  },
];

export const Footer = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text key={index}>
        <Link className={classes.link} to={link.link}>
          {link.label}
        </Link>
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size="xl" className={classes.inner}>
        <div>
          <Text size="xs" c="dimmed" className={classes.description} mt="sm">
            "FarmTech Innovation: Cultivating Smarter Soil, Growing Better Futures"
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
    </footer>
  );
};
