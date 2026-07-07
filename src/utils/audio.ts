let audioCtx: AudioContext | null = null;
let isMutedGlobal = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isMutedGlobal = muted;
  // If we have an active context, suspend or resume to be clean
  const ctx = getAudioContext();
  if (ctx) {
    if (muted) {
      ctx.suspend().catch(() => {});
    } else {
      ctx.resume().catch(() => {});
    }
  }
}

export function isSoundMuted(): boolean {
  return isMutedGlobal;
}

/**
 * Procedurally generates a subtle, high-quality, gentle rustling sound of crispy mathiya/snacks.
 * Uses bandpassed white noise with a multi-peak decay envelope to mimic natural crisp texture.
 */
export function playSnackRustle() {
  if (isMutedGlobal) return;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Resume context if suspended (browser security policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    
    // Create random white noise buffer
    // A 0.35s sound buffer
    const duration = 0.35;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Create a high-quality Bandpass Filter to isolate the crisp crinkling frequencies (3500Hz - 7500Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    // Add slight random pitch/frequency variation so it sounds unique every time
    const baseFreq = 4800 + Math.random() * 1200;
    filter.frequency.value = baseFreq;
    filter.Q.value = 1.8;

    // Create a Lowpass Filter to smooth out harsh high-frequency noise
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 8500;

    // Multi-stage envelope gain node to simulate realistic crackles/rustles
    const gainNode = ctx.createGain();
    
    // Extremely subtle levels to keep it premium and non-intrusive
    const maxVolume = 0.04 + Math.random() * 0.03; 

    // Sound envelope curve
    gainNode.gain.setValueAtTime(0, now);
    // First sharp little crackle
    gainNode.gain.linearRampToValueAtTime(maxVolume, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.12);
    
    // Second smaller rustle wave
    gainNode.gain.setValueAtTime(0.005, now + 0.13);
    gainNode.gain.linearRampToValueAtTime(maxVolume * 0.5, now + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    // Node connections
    noiseSource.connect(filter);
    filter.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  } catch (error) {
    console.warn('Web Audio rustle sound synthesis was blocked or unsupported:', error);
  }
}
