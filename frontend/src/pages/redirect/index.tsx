import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Center, Loader } from '@mantine/core';
import { NotFoundPage } from '@/pages/not-found';

export const RedirectPage = () => {
  const { alias } = useParams();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!alias) return;

    fetch(`http://localhost:3000/info/${alias}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
        } else {
          window.location.href = `http://localhost:3000/${alias}`;
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [alias]);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (loading) {
    return (
      <Center h={'100vh'}>
        <Loader />
      </Center>
    );
  }
};
