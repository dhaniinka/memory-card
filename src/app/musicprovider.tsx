"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  RefObject,
} from "react";

type MusicContextType = {
  isPlaying: boolean;
  toggleMusic: () => void;
  stopMusic: () => void;
  playMusic: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
};

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  stopMusic: () => {},
  playMusic: () => {},
  audioRef: { current: null },
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const playMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, toggleMusic, stopMusic, playMusic, audioRef }}
    >
      {/* ❌ autoplay dihapus */}
      <audio ref={audioRef} src="/sounds/homepage.mp3" loop />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
