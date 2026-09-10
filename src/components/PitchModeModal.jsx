import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Zap, 
  Layers, 
  Film, 
  Code2,
  ChevronRight
} from 'lucide-react';
import { sound } from '../engine/soundFx';

export default function PitchModeModal({ isOpen, onClose }) {
  const [deploymentsPerWeek, setDeploymentsPerWeek] = useState(6);

  if (!isOpen) return null;

  // ROI calculations
  const hoursSavedPerWeek = (deploymentsPerWeek * 4.4).toFixed(1);
  const dollarsSavedPerYear = Math.round(deploymentsPerWeek * 4.4 * 90 * 52).toLocaleString();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(4, 7, 13, 0.85)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 960,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 32,
          border: '1px solid rgba(0, 242, 254, 0.35)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 242, 254, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
            }}>
              <Award size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>
                  Why TestMorph AI Wins: Hackathon Defense Deck
                </h2>
                <span className="badge badge-cyan">Winning Perspective</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Targeted for 15+ year veteran judges, architects, and technical evaluators.
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="btn btn-sm btn-secondary"
            style={{ width: 34, height: 34, padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* The 4.5 Hour vs 18 Second Comparison Grid */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
            The Ground-Truth Productivity Revolution
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* The Old Manual Way */}
            <div style={{
              padding: 20,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(244, 63, 94, 0.06)',
              border: '1px solid rgba(244, 63, 94, 0.25)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fb7185' }}>The Status Quo (Manual QA & Video Demo)</span>
                <span className="badge badge-rose">4.5 Hours</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li>❌ Manual clicking & typing test inputs (45 min)</li>
                <li>❌ Multiple screen recording takes due to errors (60 min)</li>
                <li>❌ Video editing in Premiere/CapCut: trimming, zooms, captions (135 min)</li>
                <li>❌ Writing bug repro instructions manually for developers (30 min)</li>
              </ul>
            </div>

            {/* The TestMorph AI Way */}
            <div style={{
              padding: 20,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 242, 254, 0.06)',
              border: '1px solid rgba(0, 242, 254, 0.35)',
              boxShadow: '0 0 25px rgba(0, 242, 254, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#00f2fe' }}>With TestMorph AI Autonomous Studio</span>
                <span className="badge badge-emerald">18 Seconds (99.9% Faster)</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#f8fafc' }}>
                <li>✓ AI Agent scans DOM and executes boundary/happy tests autonomously</li>
                <li>✓ Smart-cut algorithm trims network latency and idle pauses</li>
                <li>✓ Kinetic camera auto-zooms onto active fields with captions</li>
                <li>✓ Auto-generates exportable Playwright CI/CD script + code diff fix</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive ROI Calculator */}
        <div style={{
          padding: 20,
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Interactive Enterprise ROI Simulator</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Calculated assuming a standard software engineering rate of $90/hr
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#00f2fe' }}>
              {deploymentsPerWeek} App Deployments / Week
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="25"
            value={deploymentsPerWeek}
            onChange={(e) => setDeploymentsPerWeek(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#00f2fe' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ padding: 14, background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Time Saved Weekly</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                {hoursSavedPerWeek} Hours
              </div>
            </div>

            <div style={{ padding: 14, background: 'rgba(0, 242, 254, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 242, 254, 0.25)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Annual Capital Saved</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#00f2fe', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                ${dollarsSavedPerYear} USD
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <div style={{ padding: 14, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, marginBottom: 4, color: '#c084fc' }}>
              <Code2 size={16} />
              Zero Flakiness
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Deterministic DOM mutation observers ensure tests never fail due to asynchronous timing jitter.
            </p>
          </div>

          <div style={{ padding: 14, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, marginBottom: 4, color: '#00f2fe' }}>
              <Film size={16} />
              Dynamic Auto-Zoom
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Smooth focal tracking dynamically centers and magnifies active input fields without manual camera work.
            </p>
          </div>

          <div style={{ padding: 14, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13, marginBottom: 4, color: '#34d399' }}>
              <Layers size={16} />
              Multi-Lens Feedback
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Instantly transforms raw exceptions into customized views for Devs, PMs, Evaluators, and End Users.
            </p>
          </div>
        </div>

        {/* Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="btn btn-primary"
            style={{ fontWeight: 700 }}
          >
            Return to Live Platform
          </button>
        </div>
      </div>
    </div>
  );
}
