
import { useState } from 'react';

export function useMediaStream() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return {
    videoStream,
    setVideoStream,
  };
}