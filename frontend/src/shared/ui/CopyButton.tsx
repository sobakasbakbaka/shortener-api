import { useState, useEffect } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

type CopyButtonProps = {
  value: string;
  copiedLabel?: string;
  initialLabel?: string;
  timeout?: number;
};

export const CopyButton = ({
  value,
  copiedLabel = 'Скопировано',
  initialLabel = 'Скопировать',
  timeout = 2000,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [copied, timeout]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error('Ошибка копирования текста', error);
    }
  };

  return (
    <Button size={'xs'} variant={'light'} onClick={handleCopy}>
      {copied ? (
        <Group gap={'xs'}>
          <IconCheck size={16} />
          <Text size={'sm'}>{copiedLabel}</Text>
        </Group>
      ) : (
        <Text size={'sm'}>{initialLabel}</Text>
      )}
    </Button>
  );
};
