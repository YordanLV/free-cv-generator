import { useRouter } from 'next/router';

const useCurrentUrl = () => {
  const router = useRouter();

  // This will work on the client-side only
  const getFullUrl = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.location.href;
  };

  const fullUrl = getFullUrl();

  return fullUrl || `${router.protocol}://${router.host}${router.asPath}`;
};

export default useCurrentUrl;
