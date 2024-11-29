import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import { Logo, UserButton } from '@farmtech/shared';
import { useAuth } from '@farmtech/auth';
import { useTranslation } from 'react-i18next';
import classes from './Header.module.css';
import { LanguagePicker } from '@farmtech/shared/components/LanguagePicker/LanguagePicker';
import {
  IconPlant,
  IconPencil,
  IconHelp,
  IconMapPin,
  IconChevronDown,
  IconMountain,
} from '@tabler/icons-react';

export function Header() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const mockdata = [
    {
      icon: IconMapPin,
      title: 'Register Land & Soil Info',
      description: 'Add and register detailed information about your land and soil.',
      link: '/register-land-soil',
    },
    {
      icon: IconMountain,
      title: 'View Public Farmlands',
      description: 'Discover and explore public farmlands for agricultural purposes.',
      link: '/view-public-farmlands',
    },
    {
      icon: IconHelp,
      title: 'Help & Tutorials',
      description: 'Access guides and tutorials to help you use the platform effectively.',
      link: '/help',
    },
  ];

  const links = mockdata.map((item, index) => (
    <>
      <Link to={item.link}>
        <UnstyledButton className={classes.subLink} key={item.title}>
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon size={22} color={theme.colors.primary[6]} />
            </ThemeIcon>
            <div>
              <Text size="sm" c={theme.colors.primary[6]} fw={500}>
                {item.title}
              </Text>
              <Text size="xs" maw={200} c="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
        {index === mockdata.length - 1 ? null : <Divider />}
      </Link>
    </>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Paper h="100%">
          <Group justify="space-between" h="100%">
            <Group gap="lg">
              <Logo />
              <Link
                to="/"
                className={`${location.pathname === '/' ? classes.active : classes.link}`}
              >
                {t('home')}
              </Link>

              <HoverCard width={300} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Farmland
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.primary[6]} />
                    </Center>
                  </a>
                </HoverCard.Target>
                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Stack>{links}</Stack>
                </HoverCard.Dropdown>
              </HoverCard>
              <Link
                to="/news"
                className={`${location.pathname === '/news' ? classes.active : classes.link}`}
              >
                News
              </Link>
              <Link
                to="/blogs"
                className={`${location.pathname === '/blog' ? classes.active : classes.link}`}
              >
                Blog
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
