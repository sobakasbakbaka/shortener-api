import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container size={420} py={40}>
      <Stack align={'center'} gap={'md'}>
        <IconAlertTriangle size={48} color={'orange'} />
        <Title order={2} ta={'center'}>
          Ссылка недоступна
        </Title>
        <Text c={'dimmed'} ta={'center'}>
          Возможно, она была удалена, просрочена или никогда не существовала.
        </Text>
        <Group justify={'center'}>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </Group>
      </Stack>
    </Container>
  );
};
