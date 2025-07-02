import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Notification, Stack, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useShortenUrl } from '../api/useShortenUrl';
import { useShortLinks } from '../model/useShortLinks';
import { CopyButton } from '@/shared/ui/CopyButton';
import '@mantine/dates/styles.css';

type FormValues = {
  originalUrl: string;
  alias?: string;
  expiresAt: Date | null;
};

export const ShortenUrlForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const form = useForm<FormValues>({
    initialValues: {
      originalUrl: '',
      alias: '',
      expiresAt: null,
    },
    validate: {
      originalUrl: (value) =>
        /^https?:\/\/.+/.test(value) ? null : 'Введите корректный URL',
      alias: (value) =>
        !value || value.length <= 20 ? null : 'Максимум 20 символов',
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
    const payload = {
      originalUrl: values.originalUrl,
      alias: values.alias || undefined,
      expiresAt: values.expiresAt || undefined,
    };

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
        <DateTimePicker
          label={'Срок действия (необязательно)'}
          placeholder={'Выберите дату и время'}
          value={form.values.expiresAt}
          onChange={(date) =>
            form.setFieldValue('expiresAt', date as Date | null)
          }
          clearable
          // minDate={new Date()}
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
          color="green"
          title="Ссылка создана"
          withCloseButton={false}
        >
          <Group justify="space-between" wrap="wrap">
            <a
              href={`${import.meta.env.VITE_API_URL}/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {import.meta.env.VITE_API_URL}/{shortUrl}
            </a>
            <CopyButton value={`${import.meta.env.VITE_API_URL}/${shortUrl}`} />
          </Group>
        </Notification>
      )}

      {isError && (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          title="Ошибка"
          mt="md"
        >
          {(error as Error)?.message || 'Произошла ошибка'}
        </Notification>
      )}
    </Stack>
  );
};
