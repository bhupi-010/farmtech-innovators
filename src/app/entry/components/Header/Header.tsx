import { Group, Button, Box, Burger, useMantineTheme, Container, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { Logo, UserButton } from '@farmtech/shared';
import { useAuth } from '@farmtech/auth';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import i18n from 'i18next'; // Import i18n instance
import classes from './Header.module.css';
import { LanguagePicker } from '@farmtech/shared/components/LanguagePicker/LanguagePicker';

export function Header() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Paper px={"lg"}  h="100%">
          <Group justify="space-between" h="100%">
            <Group gap="lg">
            <Logo />
              <Link
                to="/"
                className={`${location.pathname === '/' ? classes.active : classes.link}`}
              >
                {t('home')}
              </Link>
              <Link
                to="/about-us"
                className={`${location.pathname === '/about-us' ? classes.active : classes.link}`}
              >
                {t('aboutUs')}
              </Link>
              <Link
                to="/contact-us"
                className={`${location.pathname === '/contact-us' ? classes.active : classes.link}`}
              >
                {t('contactUs')}
              </Link>
            </Group>
            {/* Language Switcher */}
           
            <Group justify="space-between" align="center">
            <LanguagePicker />
              {isAuthenticated ? (
                <UserButton />
              ) : (
                <Group visibleFrom="sm">
                  <Button component={Link} to="/login" variant="default">
                    {t('login')}
                  </Button>
                  <Button component={Link} to="/register">
                    {t('signUp')}
                  </Button>
                </Group>
              )}
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
            </Group>
          </Group>
        </Paper>
      </header>
    </Box>
  );
}
