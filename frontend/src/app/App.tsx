import { ShortenUrlForm, ShortLinkList } from '@/features/shorten-url';
import { Stack } from '@mantine/core';

export const App = () => {
  return (
    <Stack p="md">
      <ShortenUrlForm />
      <ShortLinkList />
    </Stack>
  );
};
