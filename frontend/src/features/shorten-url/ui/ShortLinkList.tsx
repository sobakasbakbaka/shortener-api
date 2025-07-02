import { useShortLinks } from '../model/useShortLinks.ts';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { LinkAnalyticsModal } from '@/features/link-analytics/ui/LinkAnalyticsModal.tsx';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export const ShortLinkList = () => {
  const { links, removeLink, clearLinks } = useShortLinks();
  const [opened, { open, close }] = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  if (links.length === 0) {
    return null;
  }

  const handleOpenModal = (shortUrl: string) => {
    setSelectedLink(shortUrl);
    open();
  };

  return (
    <Stack>
      <Group justify={'space-between'}>
        <Title order={4}>Ваши ссылки</Title>
        <Button
          onClick={clearLinks}
          variant={'light'}
          color={'red'}
          size={'xs'}
        >
          Отчистить все
        </Button>
      </Group>

      {links.map((link) => (
        <Group key={link.shortUrl} justify={'space-between'}>
          <div>
            <Text size={'sm'}>
              <a
                href={`${import.meta.env.VITE_API_URL}/url/${link.shortUrl}`}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                {import.meta.env.VITE_API_URL}/url/{link.shortUrl}
              </a>
            </Text>
            <Text size={'xs'} c={'dimmed'}>
              {link.originalUrl}
            </Text>
          </div>
          <Group gap={'md'}>
            <Button
              onClick={() => handleOpenModal(link.shortUrl)}
              variant={'light'}
              size={'xs'}
            >
              Подробнее
            </Button>
            <Button
              color={'red'}
              size={'xs'}
              variant={'subtle'}
              onClick={() => removeLink(link.shortUrl)}
            >
              <IconTrash size={16} />
            </Button>
          </Group>
        </Group>
      ))}
      {selectedLink && (
        <LinkAnalyticsModal
          shortUrl={selectedLink}
          opened={opened}
          onClose={close}
        />
      )}
    </Stack>
  );
};
