import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Award, 
  Code2, 
  BarChart3, 
  Users, 
  Volume2, 
  VolumeX, 
  Tv, 
  Play, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { sound } from '../engine/soundFx';

export default function Header({ 
  currentApp, 
  onSelectApp, 
  benchmarkApps, 
  activeLens, 
  onSelectLens, 
  onOpenPitchModal,
  isTesting,
  onRunTest,
  onReset,
  testOutcome,
  isMuted,
  onToggleMute,
  testProgress
}) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 13, 22, 0.88)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: 1600,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
          }}>
            <Bot size={24} color="#050811" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em' }}>
                TestMorph <span className="gradient-text-cyan">AI</span>
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: 10 }}>v2.4 Autonomous</span>
              {testOutcome === 'pass' && (
                <span className="badge badge-emerald" style={{ fontSize: 10 }}>
                  <CheckCircle2 size={11} /> Ready to Demo
                </span>
              )}
              {testOutcome === 'fail' && (
                <span className="badge badge-rose" style={{ fontSize: 10 }}>
                  <AlertTriangle size={11} /> Defect Found
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
              Autonomous App Testing & Cinema-Grade Video Demo Studio
            </p>
          </div>
        </div>

        {/* Target App Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px 6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          {benchmarkApps.map((app) => {
            const isSelected = currentApp.id === app.id;
            return (
              <button
                key={app.id}
                onClick={() => onSelectApp(app)}
                className="btn btn-sm"
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
                  color: isSelected ? '#00f2fe' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{app.name}</span>
                <span style={{
                  fontSize: 10,
                  opacity: 0.7,
                  padding: '1px 6px',
                  borderRadius: 6,
                  background: app.expectedOutcome === 'pass' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                  color: app.expectedOutcome === 'pass' ? '#34d399' : '#fb7185'
                }}>
                  {app.expectedOutcome === 'pass' ? 'Happy Path' : 'Edge Bug'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stakeholder Lens Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(15, 23, 42, 0.8)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ 
            fontSize: 11, 
            color: 'var(--text-tertiary)', 
            fontWeight: 700, 
            padding: '0 8px',
            textTransform: 'uppercase'
          }}>
            Feedback Lens:
          </span>

          <button
            onClick={() => { sound.playClick(); onSelectLens('judge'); }}
            className="btn btn-sm"
            style={{
              background: activeLens === 'judge' ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))' : 'transparent',
              color: activeLens === 'judge' ? '#fbbf24' : 'var(--text-secondary)',
              border: activeLens === 'judge' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
              gap: 6
            }}
            title="Senior Evaluators & Hackathon Judges (Architecture, TTFB, 30s Pitch Video)"
          >
            <Award size={14} />
            <span>Judges (15+ Yrs)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); onSelectLens('developer'); }}
            className="btn btn-sm"
            style={{
              background: activeLens === 'developer' ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(79, 172, 254, 0.2))' : 'transparent',
              color: activeLens === 'developer' ? '#00f2fe' : 'var(--text-secondary)',
              border: activeLens === 'developer' ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid transparent',
              gap: 6
            }}
            title="Software Engineers (Playwright script, exact selector, code diff patch)"
          >
            <Code2 size={14} />
            <span>Developers</span>
          </button>

          <button
            onClick={() => { sound.playClick(); onSelectLens('pm'); }}
            className="btn btn-sm"
            style={{
              background: activeLens === 'pm' ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2))' : 'transparent',
              color: activeLens === 'pm' ? '#c084fc' : 'var(--text-secondary)',
              border: activeLens === 'pm' ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid transparent',
              gap: 6
            }}
            title="Product Managers (Release Go/No-Go, user journey dropoff, UX friction)"
          >
            <BarChart3 size={14} />
            <span>Product Mgr</span>
          </button>

          <button
            onClick={() => { sound.playClick(); onSelectLens('user'); }}
            className="btn btn-sm"
            style={{
              background: activeLens === 'user' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))' : 'transparent',
              color: activeLens === 'user' ? '#34d399' : 'var(--text-secondary)',
              border: activeLens === 'user' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
              gap: 6
            }}
            title="Everyday Users (Plain English, visual steps, no jargon)"
          >
            <Users size={14} />
            <span>General User</span>
          </button>
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Pitch Deck Mode Button */}
          <button
            onClick={onOpenPitchModal}
            className="btn btn-sm btn-secondary"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
              border: '1px solid rgba(236, 72, 153, 0.35)',
              color: '#f472b6',
              gap: 6,
              fontWeight: 700
            }}
            title="View Executive Pitch & Evaluator Defense Deck"
          >
            <Flame size={14} color="#f472b6" />
            <span>Pitch Deck / ROI</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="btn btn-sm btn-secondary"
            style={{ padding: '8px' }}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} color="#00f2fe" />}
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="btn btn-sm btn-secondary"
            style={{ padding: '8px 12px', gap: 6 }}
            title="Reset Simulation"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          {/* Main Action Trigger */}
          <button
            onClick={onRunTest}
            disabled={isTesting}
            className={`btn ${testOutcome === 'pass' ? 'btn-success' : 'btn-primary'}`}
            style={{
              fontWeight: 700,
              gap: 8,
              minWidth: 175
            }}
          >
            {isTesting ? (
              <>
                <div style={{
                  width: 14,
                  height: 14,
                  border: '2px solid rgba(0,0,0,0.2)',
                  borderTopColor: '#000',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Testing ({Math.round(testProgress)}%)...</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>Run Autonomous Test</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
