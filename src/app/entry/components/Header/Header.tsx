import { Group, Button, Box, Burger, useMantineTheme, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { Logo, UserButton } from '@farmtech/shared';
import { useAuth } from '@farmtech/auth';
import classes from './Header.module.css';
import { useLocation } from 'react-router-dom';

export function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
    <Box>
      <header className={classes.header}>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Logo />
            <Group gap="lg">
              <Link
                to="/"
                className={`${location.pathname === '/' ? classes.active : classes.link}`}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className={`${location.pathname === '/about-us' ? classes.active : classes.link}`}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className={`${location.pathname === '/contact-us' ? classes.active : classes.link}`}
              >
                Contact Us
              </Link>
            </Group>

            <Group justify="space-between" align="center">
              {isAuthenticated ? (
                <UserButton />
              ) : (
                <Group visibleFrom="sm">
                  <Button component={Link} to="/login" variant="default">
                    Log in
                  </Button>
                  <Button component={Link} to="/register">
                    Sign up
                  </Button>
                </Group>
              )}
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
            </Group>
          </Group>
        </Container>
      </header>
    </Box>
  );
}
