import { Menu, Group, ActionIcon, Button, rem, useMantineTheme, MenuProps } from '@mantine/core';
import { IconAntennaBars1, IconChevronDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { IconAntennaBarsOff } from '@tabler/icons-react';
import { IconAntennaBars3 } from '@tabler/icons-react';
import { BsThreeDotsVertical } from 'react-icons/bs';


interface ActionItem {
  label: string;
  link?: string;
  onClick?: () => void; // Function to execute if not a link
}

interface SplitButtonProps {
  actionItems: ActionItem[];
}

export function SplitButton({ actionItems }: SplitButtonProps) {
  const theme = useMantineTheme();

  // Function to handle menu item click based on the action item properties
  const handleMenuItemClick = (item: ActionItem) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal shadow="md">
      <Menu.Target>
        <Button variant="subtle"  size='xs' style={{ hover: { backgroundColor: theme.colors.gray[0] }, padding: '5px' }} >
          <BsThreeDotsVertical size={20} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
        {actionItems.map((item, index) =>
          item.link ? (
            // For items with a link, use Link for navigation
            <Link to={item.link} key={index} style={{ textDecoration: 'none' }}>
              <Menu.Item>{item.label}</Menu.Item>
            </Link>
          ) : (
            // For items with an onClick function, use a clickable item
            <Menu.Item key={index} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
