import { useState, useEffect } from 'react';

/**
 * Custom hook to preload critical images and track their loading progress.
 * @param urls Array of image URLs to preload
 */
export function useImagePreloader(urls: string[]) {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setIsPreloaded(true);
      setPreloadProgress(100);
      return;
    }

    let loadedCount = 0;
    const total = urls.length;
    let isMounted = true;

    const onImageLoadOrError = () => {
      if (!isMounted) return;
      loadedCount++;
      const progressPercent = Math.min(Math.round((loadedCount / total) * 100), 100);
      setPreloadProgress(progressPercent);

      if (loadedCount >= total) {
        setIsPreloaded(true);
      }
    };

    urls.forEach((url) => {
      const img = new Image();
      // Safely encode the URL if it contains spaces or special characters
      const encodedUrl = url ? encodeURI(url) : '';
      img.src = encodedUrl;
      img.onload = onImageLoadOrError;
      img.onerror = onImageLoadOrError; // Continue even if some images fail to load
    });

    // Fail-safe timeout (maximum 3 seconds to not block the loader indefinitely if some network issues occur)
    const timeoutId = setTimeout(() => {
      if (isMounted && !isPreloaded) {
        setIsPreloaded(true);
        setPreloadProgress(100);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [urls]);

  return { isPreloaded, preloadProgress };
}
