import React from 'react';
import { 
  TextInput, 
  Select, 
  Container, 
  Card, 
  Button, 
  Group, 
  Grid 
} from '@mantine/core';
import { PageHeader } from './PageHeader';
import { OutlinedButton } from './OutlinedButton';
import { PrimaryButton } from './PrimaryButton';
import { SplitButton } from './SplitButton';

interface ActionItem {
  label: string;
  link?: string;
  onClick?: () => void;
}

type FormComponentProps = {
  length?: number;
  title: string;
  subTitle?: string;
  addLink?: React.ReactEventHandler;
  addOnTable?: {
    label: string;
    link?: string;
    onClick?: () => void;
  };
  onDelete?: () => void;
  children?: React.ReactNode;
  mx?: string;
  hmx?: string;
  actionItems?: ActionItem[];
  cardBordered?: boolean;
  cardPadding?: string;
  cardShadow?: string;
  cardBackGround?: string;
  fw?: number;
};

export const FormComponent: React.FC<FormComponentProps> = ({
  length,
  title='',
  addLink,
  addOnTable,
  onDelete,
  children,
  mx,
  hmx,
  subTitle,
  actionItems,
  cardPadding="md",
  cardBordered = true,
  cardShadow="sm",
  cardBackGround="",
  fw
}) => {
  return (
    <>
      {onDelete && length && length > 1 ? (
        <Grid my="md" align="end">
        <Grid.Col span={10}>
          <PageHeader title={title} fw={fw} subTitle={subTitle} />
        </Grid.Col>
        <Grid.Col span={2}>
          <Group justify="right">
            <OutlinedButton onClick={onDelete} size="xs" buttonText="Delete" />
          </Group>
        </Grid.Col>
      </Grid>
      
      ) : addOnTable ? (
        <Group justify="space-between" pt="md" pb="xs" mx={mx}>
          <PageHeader title={title} fw={fw} subTitle={subTitle} />
          <PrimaryButton
            link={addOnTable.link}
            buttonText={addOnTable.label}
            onClick={addOnTable.onClick}
          />
        </Group>
      ) : (
        <Group justify="space-between" pt="md" pb="xs" mx={mx}>
          <PageHeader title={title} fw={fw} subTitle={subTitle} />
          {actionItems ? <SplitButton actionItems={actionItems} /> : null}
        </Group>
      )}
      <Card p={cardPadding} mx={mx} bg={cardBackGround} mb="xs" shadow={cardShadow} radius="md" withBorder={cardBordered}>
        <div>{children}</div>
        {addLink && (
          <Group justify="center" pt="sm">
            <PrimaryButton onClick={addLink} buttonText="Add" />
          </Group>
        )}
      </Card>
    </>
  );
};
