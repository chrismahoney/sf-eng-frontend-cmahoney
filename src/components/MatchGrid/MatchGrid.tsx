import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px, Flex } from '@mantine/core';

const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export default function MatchGrid() {
  const theme = useMantineTheme();
  return (
    <Flex
      style={(theme) => ({
        margin: 0,
        padding: px(theme.spacing.md),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      })}
    >
      Test
    </Flex>
  );
}