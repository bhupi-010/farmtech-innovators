import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group, Box } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import english from '../../../../../public/assets/english.png';
import french from '../../../../../public/assets/french.png';
import classes from './LanguagePicker.module.css';
import { useTranslation } from 'react-i18next';

const data = [
  { label: 'English', image: english, code: 'en' },
  { label: 'French', image: french, code: 'fr' },
];

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      leftSection={
        <Box h={20} w={20}>
          <Image src={item.image} width="100%" height="100%" style={{ objectFit: 'contain' }} />
        </Box>
      }
      onClick={() => {
        setSelected(item);
        i18n.changeLanguage(item.code);
      }}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={20} height={20} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
