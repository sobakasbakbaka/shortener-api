import { useLinkAnalytics } from '../api/useLinkAnalytics.ts';
import { Loader, Modal, Stack, Text } from '@mantine/core';

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

  console.log('info:', info);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={'Аналитика ссылки'}
      centered
    >
      {isLoading && <Loader />}
      {isError && <Text c={'red'}>Не удалось загрузить данные</Text>}
      {!isLoading && info && analytics && (
        <Stack>
          {info.isExpired && (
            <Text size={'sm'} c={'red'}>
              Сылка просрочена и больше не активна.
            </Text>
          )}
          <Text size={'sm'}>
            <b>Оригинальный URL:</b>{' '}
            <a href={info.originalUrl}>{info.originalUrl}</a>
          </Text>
          <Text size={'sm'}>
            <b>Создана:</b> {new Date(info.createdAt).toLocaleString()}
          </Text>
          <Text size={'sm'}>
            <b>Кликов:</b> {info.clickCount}
          </Text>
          <Text size={'sm'}>
            <b>Последние 5 IP:</b>
          </Text>
          <ul style={{ paddingLeft: 16 }}>
            {analytics.lastClicks.map((ip) => (
              <li key={ip}>{ip}</li>
            ))}
          </ul>
        </Stack>
      )}
    </Modal>
  );
};
