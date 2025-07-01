import { useState } from 'react';
import { useForm } from '@mantine/form';
import type { ShortenUrlDto } from '@/entities/url';
import { useShortenUrl } from '../api/useShortenUrl';
import { Button, Group, Notification, Stack, TextInput } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useShortLinks } from '../model/useShortLinks.ts';

export const ShortenUrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const form = useForm<ShortenUrlDto>({
    initialValues: {
      originalUrl: '',
      alias: '',
      expiresAt: '',
    },
    validate: {
      originalUrl: (value) =>
        /^https?:\/\/.+/.test(value) ? null : 'Введите корректный URL',
      alias: (value) => (value!.length <= 20 ? null : 'Максимум 20 символов'),
    },
  });

  const { addLink } = useShortLinks();

  const { mutate, isSuccess, isPending, isError, error } = useShortenUrl({
    onSuccess: ({ shortUrl }) => {
      setShortUrl(shortUrl);
      addLink({
        shortUrl,
        originalUrl: form.values.originalUrl,
        createdAt: new Date().toISOString(),
      });
      form.reset();
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const payload = Object.fromEntries(
      Object.entries(values).filter(([_, value]) => value !== ''),
    ) as ShortenUrlDto;

    mutate(payload);
  });

  return (
    <Stack maw={500} mx={'auto'}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label={'Оригинальный URL'}
          placeholder={'https://example.com'}
          {...form.getInputProps('originalUrl')}
          required
        />
        <TextInput
          label={'Пользовательский алиас (необязательно)'}
          placeholder={'lol-kek'}
          {...form.getInputProps('alias')}
        />
        <TextInput
          label={'Дата истечения (необязательно)'}
          placeholder={'2025-12-31T23:59:59Z'}
          {...form.getInputProps('expiresAt')}
        />
        <Group justify={'flex-end'} mt={'md'}>
          <Button type={'submit'} loading={isPending}>
            Сократить
          </Button>
        </Group>
      </form>

      {isSuccess && shortUrl && (
        <Notification
          icon={<IconCheck size={18} />}
          color={'green'}
          title={'Ссылка создана'}
        >
          <a
            href={`${import.meta.env.VITE_API_URL}/url/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {import.meta.env.VITE_API_URL}/url/{shortUrl}
          </a>
        </Notification>
      )}

      {isError && (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          title="Ошибка"
          mt="md"
        >
          {(error as any)?.message || 'Произошла ошибка'}
        </Notification>
      )}
    </Stack>
  );
};
