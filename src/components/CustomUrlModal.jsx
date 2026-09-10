import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  Play, 
  AlertCircle 
} from 'lucide-react';
import { sound } from '../engine/soundFx';

export default function CustomUrlModal({ isOpen, onClose, onStartCustomTest }) {
  const [url, setUrl] = useState('https://my-saas-production.vercel.app');
  const [objective, setObjective] = useState('full-e2e');
  const [depth, setDepth] = useState('balanced');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    onStartCustomTest({
      url,
      objective,
      depth
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(4, 7, 13, 0.85)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 600,
          padding: 28,
          border: '1px solid rgba(0, 242, 254, 0.4)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={20} color="#000" />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Scan Custom Deployed App</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Deploy autonomous agent crawler on your live URL
              </p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="btn btn-sm btn-secondary"
            style={{ width: 32, height: 32, padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* URL Input */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              Deployed Web Application URL
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#070a12',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              gap: 8
            }}>
              <Globe size={16} color="#00f2fe" />
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-web-app.vercel.app"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: '#f8fafc',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          {/* Test Objective */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
              AI Autonomous Agent Objective
            </label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: '#070a12',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: '#f8fafc',
                fontSize: 13,
                outline: 'none'
              }}
            >
              <option value="full-e2e">Full End-to-End Core User Journey (Discover + Test + Record)</option>
              <option value="edge-boundary">Edge-Case & Boundary Stress Test (Adversarial inputs)</option>
              <option value="form-validation">Form Validation & Error States Audit</option>
              <option value="demo-only">Pure Cinema-Grade Demo Generation</option>
            </select>
          </div>

          {/* Scanning Depth */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Exploration Rigor
              </label>
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#070a12',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#f8fafc',
                  fontSize: 13,
                  outline: 'none'
                }}
              >
                <option value="fast">Rapid Smoke Test (15s)</option>
                <option value="balanced">Balanced Production Audit (30s)</option>
                <option value="deep">Exhaustive Deep Regression (60s)</option>
              </select>
            </div>

            <div style={{ padding: 12, background: 'rgba(0, 242, 254, 0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0, 242, 254, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#00f2fe', marginBottom: 2 }}>
                Auto-Detection Active
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                Agent infers forms, buttons, and API responses automatically.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: 700, gap: 8 }}
            >
              <Play size={15} fill="currentColor" />
              <span>Launch Autonomous Test</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
