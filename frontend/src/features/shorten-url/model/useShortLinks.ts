import { useLocalStorage } from '@mantine/hooks';
import { urlApi } from '@/entities/url';

type ShortLink = {
  originalUrl: string;
  shortUrl: string;
  createdAt?: string;
};

export const useShortLinks = () => {
  const [links, setLinks] = useLocalStorage<ShortLink[]>({
    key: 'short-links',
    defaultValue: [],
  });

  const addLink = (link: ShortLink) => {
    setLinks((prev) => {
      if (prev.some((l) => l.shortUrl === link.shortUrl)) {
        return prev;
      }
      return [link, ...prev];
    });
  };

  const removeLink = async (shortUrl: string) => {
    try {
      await urlApi.delete(shortUrl);
      setLinks((prev) => prev.filter((link) => link.shortUrl !== shortUrl));
    } catch (error) {
      console.log('Ошибка удаления ссылки', error);
    }
  };

  return {
    links,
    addLink,
    removeLink,
  };
};
