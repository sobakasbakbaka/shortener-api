import { useLocalStorage } from '@mantine/hooks';

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

  const removeLink = (shortUrl: string) => {
    setLinks((prev) => prev.filter((link) => link.shortUrl !== shortUrl));
  };

  const clearLinks = () => setLinks([]);

  return {
    links,
    addLink,
    removeLink,
    clearLinks,
  };
};
