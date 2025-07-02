import { useLinkAnalytics } from '../api/useLinkAnalytics.ts';
import {
  Alert,
  List,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconAlertTriangle, IconLink } from '@tabler/icons-react';

type LinkAnalyticsModalProps = {
  shortUrl: string;
  opened: boolean;
  onClose: () => void;
};

export const LinkAnalyticsModal = ({
  shortUrl,
  opened,
  onClose,
}: LinkAnalyticsModalProps) => {
  const { info, analytics, isLoading, isError } = useLinkAnalytics(shortUrl);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={'Аналитика ссылки'}
      centered
      size={'lg'}
    >
      {isLoading && <Loader />}

      {isError && (
        <Alert
          color={'red'}
          title={'Ошибка'}
          icon={<IconAlertTriangle size={16} />}
        >
          Не удалось загрузить данные
        </Alert>
      )}

      {!isLoading && info && analytics && (
        <Stack gap={'md'}>
          {info.isExpired && (
            <Alert
              color={'red'}
              icon={<IconAlertTriangle size={18} />}
              title={'Ссылка недействительна'}
            >
              Ссылка просрочена и больше не активна.
            </Alert>
          )}

          <Paper shadow={'xs'} p={'md'} withBorder>
            <Text size="sm" mb={4}>
              <b>Оригинальный URL:</b>
            </Text>
            <a
              href={info.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Text
                size="xs"
                c="dimmed"
                w={240}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                }}
                title={info.originalUrl}
              >
                {info.originalUrl}
              </Text>
            </a>
            <Text size={'sm'} mb={4}>
              <b>Создана:</b> {new Date(info.createdAt).toLocaleString('ru-RU')}
            </Text>
            <Text size={'sm'} mb={4}>
              <b>Кликов:</b> {info.clickCount}
            </Text>
          </Paper>

          <Paper shadow={'xs'} p={'md'} withBorder>
            <Text size={'sm'} mb={6}>
              <b>Последние 5 IP:</b>
            </Text>
            <List
              spacing={'xs'}
              size={'sm'}
              icon={
                <ThemeIcon color={'blue'} size={16} radius={'xl'}>
                  <IconLink size={12} />
                </ThemeIcon>
              }
            >
              {analytics.lastClicks.map((ip, index) => (
                <List.Item key={index}>{ip}</List.Item>
              ))}
            </List>
          </Paper>
        </Stack>
      )}
    </Modal>
  );
};
