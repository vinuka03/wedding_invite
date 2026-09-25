let audio: HTMLAudioElement | null = null;

export function getMusicAudio(): HTMLAudioElement {
  if (typeof window === "undefined") return null as unknown as HTMLAudioElement;
  if (!audio) {
    audio = new Audio("/music/music1.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
  }
  return audio;
}

export function startMusic(): void {
  const a = getMusicAudio();
  if (!a) return;

  a.muted = false;
  a.volume = 0.55;
  a.currentTime = 0;
  a.play().catch(() => {});
}

export function isMusicMuted(): boolean {
  const a = getMusicAudio();
  return a ? a.muted : true;
}

export function toggleMute(): boolean {
  const a = getMusicAudio();
  if (!a) return true;

  if (a.muted) {
    a.muted = false;
    a.volume = 0.55;
    if (a.paused) {
      a.play().catch(() => {});
    }
    return false;
  } else {
    a.muted = true;
    return true;
  }
}
