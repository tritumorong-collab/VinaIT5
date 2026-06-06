let audioCtx: AudioContext | null = null;

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

export function playBeep(type: 'correct' | 'wrong' | 'success', isSoundEnabled: boolean = true) {
  if (!isSoundEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'correct') {
      // Retro coin jump play
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      // Short buzzer
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === 'success') {
      // Fanfare arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, i) => {
        if (!ctx) return;
        const oscNote = ctx.createOscillator();
        const gainNote = ctx.createGain();
        oscNote.connect(gainNote);
        gainNote.connect(ctx.destination);
        oscNote.type = 'sine';
        oscNote.frequency.value = freq;
        gainNote.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gainNote.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.25);
        oscNote.start(ctx.currentTime + i * 0.08);
        oscNote.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    }
  } catch (error) {
    console.warn("Audio Context sound failed to play", error);
  }
}
