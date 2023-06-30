import { Howl, HowlOptions } from 'howler';

export function createAudio(assetPath: string): {
  play(): void;
  seek(): void;
  playing(): void;
  rate(): void;
  setVolume(): void;
} {
  const options: HowlOptions = {
    src: [assetPath],
    volume: 1,
    autoplay: true,
    loop: true,
  };

  const audio = new Howl(options);

  return {
    play: () => audio.play(),
    seek: () => audio.seek(),
    playing: () => audio.playing(),
    rate: () => audio.rate(),
    setVolume: () => audio.volume(),
  };
}
