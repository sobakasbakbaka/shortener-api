import { ShortenUrlForm, ShortLinkList } from '@/features/shorten-url';
import { Container, Tabs } from '@mantine/core';
import { IconLink, IconList } from '@tabler/icons-react';

export const HomePage = () => {
  return (
    <Container>
      <Tabs defaultValue={'shorten'} variant={'outline'}>
        <Tabs.List>
          <Tabs.Tab value="shorten" leftSection={<IconLink size={16} />}>
            Сократить ссылку
          </Tabs.Tab>
          <Tabs.Tab value="list" leftSection={<IconList size={16} />}>
            Мои ссылки
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="shorten" pt="md">
          <ShortenUrlForm />
        </Tabs.Panel>

        <Tabs.Panel value="list" pt="md">
          <ShortLinkList />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};
