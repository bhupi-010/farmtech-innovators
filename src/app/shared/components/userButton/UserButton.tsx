import { Avatar, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@farmtech/auth';
import classes from './UserButton.module.css';
import { useMediaQuery } from '@mantine/hooks';

export const UserButton = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 37.5em)');

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <Menu
      width={200}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar alt={user?.firstName} radius="xl" size="md" tt="uppercase" color="cyan">
              {user?.firstName?.slice(0, 1) ?? 'T'}
            </Avatar>
            {!isMobile ? (
              <>
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {user?.firstName} {user.lastName}
                  </Text>
                </div>

                <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
              </>
            ) : null}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to="/profile"
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        >
          My Profile
        </Menu.Item>
        <Menu.Item
          onClick={handleLogout}
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
