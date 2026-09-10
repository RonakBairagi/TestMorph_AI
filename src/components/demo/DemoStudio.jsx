import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Sliders, 
  Maximize2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Scissors, 
  Smartphone, 
  Monitor, 
  Square,
  Volume2,
  VolumeX,
  FastForward,
  Copy,
  Check
} from 'lucide-react';
import { sound } from '../../engine/soundFx';

export default function DemoStudio({ currentApp, isMuted, onToggleMute }) {
  const details = currentApp.generatedDemoDetails || {
    headline: 'Autonomous Architecture Showcase',
    subheadline: 'Automated video demo generated from successful test run.',
    duration: '18s',
    originalDuration: '32s',
    timeSaved: '14s (43% dead latency trimmed)',
    chapters: [
      { time: '0:00', label: 'DOM Ingestion' },
      { time: '0:04', label: 'Parameter Tuning' },
      { time: '0:09', label: 'Inference Execution' },
      { time: '0:14', label: 'Verified Output' },
    ],
    metrics: {
      ttfb: '142ms',
      totalLatency: '380ms',
      accessibilityScore: '98/100',
      domMutations: 18,
    }
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('16:9'); // '16:9', '9:16', '1:1'
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // loop
        }
        return prev + 0.5 * playbackSpeed;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Determine current chapter & caption based on progress
  let currentCaption = 'Step 1: AI Agent scans DOM & automatically injects architecture goal';
  let currentZoom = 1.0;
  let cursorX = 50;
  let cursorY = 50;
  let activeHighlight = 'Topic Input';

  if (progress < 25) {
    currentCaption = 'Step 1: Locating #topic-input and typing "Scalable Microservices with Rust & Kafka"';
    currentZoom = 1.25;
    cursorX = 42;
    cursorY = 32;
    activeHighlight = 'Prompt Objective';
  } else if (progress < 50) {
    currentCaption = 'Step 2: Configuring Tone Profile to "Engineering Authority" & Temperature to 0.70';
    currentZoom = 1.2;
    cursorX = 65;
    cursorY = 48;
    activeHighlight = 'Model Hyperparameters';
  } else if (progress < 75) {
    currentCaption = 'Step 3: Triggering Generation: intercepting TTFB and streaming payload in 380ms';
    currentZoom = 1.15;
    cursorX = 50;
    cursorY = 68;
    activeHighlight = 'Inference Dispatch';
  } else {
    currentCaption = 'Step 4: Output Verified! 842 tokens rendered with 100% schema compliance';
    currentZoom = 1.05;
    cursorX = 50;
    cursorY = 82;
    activeHighlight = 'Verified Output Ready';
  }

  // Handle Video Download via Canvas MediaRecorder
  const handleDownloadVideo = () => {
    setIsExporting(true);
    sound.playSuccess();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      const stream = canvas.captureStream(30);
      let recorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      } catch (e) {
        recorder = new MediaRecorder(stream);
      }

      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentApp.id}-autonomous-demo.webm`;
        a.click();
        setIsExporting(false);
        setExportComplete(true);
        setTimeout(() => setExportComplete(false), 3500);
      };

      recorder.start();

      // Render 60 frames into canvas
      let frame = 0;
      const totalFrames = 60;
      const drawFrame = () => {
        ctx.fillStyle = '#0a0e1a';
        ctx.fillRect(0, 0, 1280, 720);

        // Header bar
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, 1280, 50);
        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.fillText(`TestMorph AI — Autonomous Demo: ${currentApp.name}`, 30, 32);

        // Simulated window
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 2;
        ctx.strokeRect(60, 80, 1160, 560);
        ctx.fillRect(60, 80, 1160, 560);

        // Text content
        ctx.fillStyle = '#f8fafc';
        ctx.font = '22px Plus Jakarta Sans, sans-serif';
        ctx.fillText(currentCaption, 90, 140);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px JetBrains Mono, monospace';
        ctx.fillText(`Frame ${frame}/${totalFrames} • Smart Latency Trimmed • 60 FPS`, 90, 180);

        // Progress bar in video
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(90, 600, 1100, 8);
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(90, 600, (1100 * frame) / totalFrames, 8);

        frame++;
        if (frame <= totalFrames) {
          requestAnimationFrame(drawFrame);
        } else {
          recorder.stop();
        }
      };

      drawFrame();
    } catch (err) {
      console.error('Export error', err);
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="glass-card glass-card-glow-emerald" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Studio Header & Trim Summary */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-emerald">
              <CheckCircle2 size={12} /> Test Passed
            </span>
            <span className="badge badge-cyan">
              <Sparkles size={12} /> Cinema-Grade Auto Demo
            </span>
            <span className="badge badge-violet">
              <Scissors size={12} /> Auto-Trimmed
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>
            {details.headline}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {details.subheadline}
          </p>
        </div>

        {/* Latency Trim Metric Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 16px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)'
        }}>
          <Clock size={18} color="#10b981" />
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
              Smart Trimming
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>
              {details.originalDuration} <span style={{ color: 'var(--text-muted)' }}>➔</span> {details.duration} ({details.timeSaved})
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Stage with Dynamic Aspect Ratio */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#04070d',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 0',
        minHeight: 460,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Aspect Ratio Sized Frame */}
        <div style={{
          width: aspectRatio === '16:9' ? '85%' : (aspectRatio === '9:16' ? '300px' : '440px'),
          aspectRatio: aspectRatio === '16:9' ? '16/9' : (aspectRatio === '9:16' ? '9/16' : '1/1'),
          maxHeight: 520,
          background: '#0a0e19',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease'
        }}>
          {/* Virtual Recording Viewport with Camera Zoom */}
          <div style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0d1322 0%, #080c16 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Background Animated App Preview */}
            <div style={{
              width: '90%',
              height: '80%',
              borderRadius: 8,
              background: '#05070f',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              transform: `scale(${currentZoom})`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#00f2fe' }}>PromptGenius AI Studio</span>
                <span className="badge badge-cyan" style={{ fontSize: 9 }}>4K REC • 60 FPS</span>
              </div>

              <div style={{
                padding: 10,
                borderRadius: 6,
                background: progress < 25 ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: progress < 25 ? '1px solid #00f2fe' : '1px solid transparent',
                fontSize: 11
              }}>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 9 }}>Architecture Goal:</div>
                <div style={{ color: '#f8fafc', fontWeight: 600 }}>Scalable Microservices with Rust & Kafka</div>
              </div>

              <div style={{
                display: 'flex',
                gap: 8,
                padding: 10,
                borderRadius: 6,
                background: progress >= 25 && progress < 50 ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: progress >= 25 && progress < 50 ? '1px solid #a855f7' : '1px solid transparent',
                fontSize: 11
              }}>
                <div>Persona: <strong style={{ color: '#c084fc' }}>Engineering Authority</strong></div>
                <div>Temp: <strong style={{ color: '#00f2fe' }}>0.70</strong></div>
              </div>

              <div style={{
                padding: 10,
                borderRadius: 6,
                background: progress >= 50 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: progress >= 50 ? '1px solid #10b981' : '1px solid transparent',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: '#34d399'
              }}>
                {progress >= 75 ? '✓ 842 tokens generated • Latency: 380ms' : 'Compiling system prompt...'}
              </div>
            </div>

            {/* Virtual Animated Cursor on Recorded Canvas */}
            <div style={{
              position: 'absolute',
              left: `${cursorX}%`,
              top: `${cursorY}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              transition: 'all 0.4s ease-out'
            }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px solid rgba(0, 242, 254, 0.8)',
                animation: 'ripple-wave 1.4s infinite'
              }} />
              <div style={{
                width: 14,
                height: 14,
                background: '#00f2fe',
                borderRadius: '50%',
                border: '2px solid #fff',
                boxShadow: '0 0 16px #00f2fe'
              }} />
            </div>

            {/* Feature Callout Badge in Video */}
            <div style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(5, 8, 16, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 700,
              color: '#00f2fe',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
            }}>
              📍 {activeHighlight}
            </div>

            {/* Synchronized Lower-Third Dynamic Subtitles */}
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              background: 'rgba(7, 10, 18, 0.92)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 6px 20px rgba(0,0,0,0.6)'
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981'
              }} />
              <span style={{ fontSize: 12, color: '#f8fafc', fontWeight: 600 }}>
                {currentCaption}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrub Bar & Timeline Chapters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {/* Clickable Chapter Markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
          {details.chapters.map((ch, idx) => {
            const targetProg = idx * 25;
            return (
              <button
                key={ch.label}
                onClick={() => { sound.playClick(); setProgress(targetProg); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: progress >= targetProg ? '#00f2fe' : 'var(--text-tertiary)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>{ch.time}</span>
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Scrub Bar */}
        <div 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProg = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            setProgress(newProg);
          }}
          style={{
            height: 10,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-full)',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00f2fe, #10b981)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)'
          }} />
        </div>
      </div>

      {/* Player Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        paddingTop: 8,
        borderTop: '1px solid var(--border-subtle)'
      }}>
        {/* Left: Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => {
              sound.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="btn btn-primary btn-sm"
            style={{ width: 40, height: 36, padding: 0 }}
            title={isPlaying ? 'Pause Demo' : 'Play Demo'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          </button>

          {/* Speed Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255, 255, 255, 0.04)', padding: 2, borderRadius: 6 }}>
            {[0.5, 1, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => { sound.playClick(); setPlaybackSpeed(spd); }}
                style={{
                  background: playbackSpeed === spd ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  color: playbackSpeed === spd ? '#00f2fe' : 'var(--text-tertiary)',
                  border: 'none',
                  borderRadius: 4,
                  padding: '3px 7px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="btn btn-secondary btn-sm"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="#00f2fe" />}
          </button>
        </div>

        {/* Center: Aspect Ratio Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', paddingLeft: 6, fontWeight: 600 }}>Format:</span>
          
          <button
            onClick={() => { sound.playClick(); setAspectRatio('16:9'); }}
            className="btn btn-sm"
            style={{
              background: aspectRatio === '16:9' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: aspectRatio === '16:9' ? '#00f2fe' : 'var(--text-tertiary)',
              border: aspectRatio === '16:9' ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
              gap: 4
            }}
            title="16:9 Landscape (Pitch Decks, YouTube, Evaluator Display)"
          >
            <Monitor size={13} />
            <span>16:9 Desktop</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setAspectRatio('9:16'); }}
            className="btn btn-sm"
            style={{
              background: aspectRatio === '9:16' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: aspectRatio === '9:16' ? '#00f2fe' : 'var(--text-tertiary)',
              border: aspectRatio === '9:16' ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
              gap: 4
            }}
            title="9:16 Vertical (Mobile Reels, Shorts, TikTok)"
          >
            <Smartphone size={13} />
            <span>9:16 Reels</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setAspectRatio('1:1'); }}
            className="btn btn-sm"
            style={{
              background: aspectRatio === '1:1' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              color: aspectRatio === '1:1' ? '#00f2fe' : 'var(--text-tertiary)',
              border: aspectRatio === '1:1' ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
              gap: 4
            }}
            title="1:1 Square (LinkedIn, Twitter)"
          >
            <Square size={13} />
            <span>1:1 Square</span>
          </button>
        </div>

        {/* Right: Export & Sharing Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleCopyLink}
            className="btn btn-secondary btn-sm"
            style={{ gap: 6 }}
          >
            {copiedLink ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Demo Link'}</span>
          </button>

          <button
            onClick={handleDownloadVideo}
            disabled={isExporting}
            className="btn btn-success btn-sm"
            style={{ gap: 6, fontWeight: 700 }}
          >
            {exportComplete ? (
              <>
                <Check size={15} />
                <span>Downloaded (.webm)!</span>
              </>
            ) : isExporting ? (
              <>
                <div style={{
                  width: 12,
                  height: 12,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Rendering 60FPS Video...</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>Download Demo Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
