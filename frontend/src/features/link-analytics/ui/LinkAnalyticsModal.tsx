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
          <Text size={'sm'}>
            <b>Оригинальный URL:</b> {info.originalUrl}
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
