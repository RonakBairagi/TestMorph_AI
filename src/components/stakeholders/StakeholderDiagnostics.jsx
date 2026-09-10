import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  Flame, 
  ShieldAlert, 
  TrendingDown, 
  BarChart, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Terminal,
  FileDiff,
  Award,
  Users
} from 'lucide-react';
import { sound } from '../../engine/soundFx';

export default function StakeholderDiagnostics({ currentApp, activeLens, onSelectLens }) {
  const diag = currentApp.diagnostics;
  const [copiedPlaywright, setCopiedPlaywright] = useState(false);
  const [copiedDiff, setCopiedDiff] = useState(false);

  if (!diag) {
    return (
      <div className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No diagnostics recorded for this scenario.</p>
      </div>
    );
  }

  const handleCopyPlaywright = () => {
    sound.playClick();
    if (diag.developerView?.playwrightRepro) {
      navigator.clipboard.writeText(diag.developerView.playwrightRepro);
      setCopiedPlaywright(true);
      setTimeout(() => setCopiedPlaywright(false), 2000);
    }
  };

  const handleCopyDiff = () => {
    sound.playClick();
    if (diag.developerView?.suggestedFix) {
      navigator.clipboard.writeText(diag.developerView.suggestedFix);
      setCopiedDiff(true);
      setTimeout(() => setCopiedDiff(false), 2000);
    }
  };

  return (
    <div className="glass-card glass-card-glow-rose" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Banner Alert */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid #f43f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)'
          }}>
            <ShieldAlert size={24} color="#f43f5e" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-rose">{diag.severity}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                {diag.errorCode}
              </span>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>
              Automated Defect Report: {currentApp.name}
            </h2>
          </div>
        </div>

        {/* Lens Quick Switcher */}
        <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 8 }}>
          <button
            onClick={() => onSelectLens('judge')}
            className="btn btn-sm"
            style={{
              background: activeLens === 'judge' ? '#fbbf24' : 'transparent',
              color: activeLens === 'judge' ? '#000' : 'var(--text-tertiary)',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700
            }}
          >
            Judge Lens
          </button>
          <button
            onClick={() => onSelectLens('developer')}
            className="btn btn-sm"
            style={{
              background: activeLens === 'developer' ? '#00f2fe' : 'transparent',
              color: activeLens === 'developer' ? '#000' : 'var(--text-tertiary)',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700
            }}
          >
            Developer Lens
          </button>
          <button
            onClick={() => onSelectLens('pm')}
            className="btn btn-sm"
            style={{
              background: activeLens === 'pm' ? '#c084fc' : 'transparent',
              color: activeLens === 'pm' ? '#000' : 'var(--text-tertiary)',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700
            }}
          >
            PM Lens
          </button>
          <button
            onClick={() => onSelectLens('user')}
            className="btn btn-sm"
            style={{
              background: activeLens === 'user' ? '#34d399' : 'transparent',
              color: activeLens === 'user' ? '#000' : 'var(--text-tertiary)',
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700
            }}
          >
            Everyday User
          </button>
        </div>
      </div>

      {/* =========================================================================
          LENS 1: HACKATHON JUDGES & SENIOR ARCHITECTS (15+ Yrs)
          ========================================================================= */}
      {activeLens === 'judge' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Executive Architecture Audit Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <div style={{ padding: 16, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Resilience Rating
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                {diag.judgeView.resilienceScore}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                Degraded due to unhandled edge inputs
              </div>
            </div>

            <div style={{ padding: 16, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Fault Vulnerability
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fb7185', marginTop: 4 }}>
                Boundary Condition Breach
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                {diag.judgeView.architectureVulnerability}
              </div>
            </div>

            <div style={{ padding: 16, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Autonomous QA Value
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                1.4s
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                Auto-generated Playwright repro test
              </div>
            </div>
          </div>

          {/* Architectural Resilience Commentary */}
          <div style={{
            padding: 16,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#fbbf24', fontSize: 14, marginBottom: 6 }}>
              <Award size={16} />
              Senior Evaluator Analysis
            </div>
            <p style={{ fontSize: 13, color: '#f8fafc', lineHeight: 1.6 }}>
              {diag.judgeView.maintainabilityImpact} The AI agent caught an invariant violation prior to customer deployment, preventing revenue leakage and silent payment gateway rejections.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          LENS 2: SOFTWARE DEVELOPERS & QA ENGINEERS
          ========================================================================= */}
      {activeLens === 'developer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Metadata Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            padding: 12,
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: 12
          }}>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Failing Selector: </span>
              <code style={{ color: '#00f2fe' }}>{diag.failingSelector}</code>
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Observed Output: </span>
              <code style={{ color: '#fb7185' }}>{diag.failingValue}</code>
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Intercepted Endpoint: </span>
              <code style={{ color: '#fbbf24' }}>{diag.endpoint} ({diag.httpStatus})</code>
            </div>
          </div>

          {/* Playwright Test Script Export (Winning Feature for Devs!) */}
          <div className="code-window">
            <div className="code-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="code-dots">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                </div>
                <Terminal size={14} color="#00f2fe" />
                <span style={{ fontWeight: 600, color: '#f8fafc' }}>
                  e2e/regression-tests/reproduce-{currentApp.id}-bug.spec.ts
                </span>
              </div>
              <button
                onClick={handleCopyPlaywright}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: 11, padding: '3px 10px', gap: 4 }}
              >
                {copiedPlaywright ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedPlaywright ? 'Copied to Clipboard' : 'Copy Playwright Script'}</span>
              </button>
            </div>
            <pre className="code-body" style={{ color: '#38bdf8' }}>
              {diag.developerView.playwrightRepro}
            </pre>
          </div>

          {/* Suggested Fix Diff */}
          <div className="code-window">
            <div className="code-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileDiff size={14} color="#10b981" />
                <span style={{ fontWeight: 600, color: '#f8fafc' }}>
                  Recommended Code Patch (Hotfix PR)
                </span>
              </div>
              <button
                onClick={handleCopyDiff}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: 11, padding: '3px 10px', gap: 4 }}
              >
                {copiedDiff ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedDiff ? 'Copied Diff' : 'Copy Patch'}</span>
              </button>
            </div>
            <pre className="code-body" style={{ color: '#e2e8f0', background: 'rgba(0,0,0,0.4)' }}>
              {diag.developerView.suggestedFix}
            </pre>
          </div>

          {/* Stack Trace */}
          <div style={{ padding: 14, background: 'rgba(244, 63, 94, 0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', marginBottom: 6 }}>
              Uncaught Exception Stack Trace
            </div>
            <pre style={{ fontSize: 11, color: '#fca5a5', fontFamily: 'var(--font-mono)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {diag.developerView.stackTrace}
            </pre>
          </div>
        </div>
      )}

      {/* =========================================================================
          LENS 3: PRODUCT MANAGERS & RELEASE OWNERS
          ========================================================================= */}
      {activeLens === 'pm' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Release Readiness Decision Card */}
          <div style={{
            padding: 18,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(15, 23, 42, 0.8))',
            border: '1px solid #f43f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14
          }}>
            <div>
              <div style={{ fontSize: 11, color: '#fb7185', fontWeight: 800, textTransform: 'uppercase' }}>
                Release Decision Matrix
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                {diag.productManagerView.verdict}
              </div>
              <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 4 }}>
                {diag.productManagerView.recommendation}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>User Impact Risk Score</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#f43f5e', fontFamily: 'var(--font-mono)' }}>
                {diag.productManagerView.userImpactRisk}
              </div>
            </div>
          </div>

          {/* User Journey Dropoff Funnel Visualization */}
          <div style={{ padding: 16, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 14 }}>
              User Journey Conversion Funnel Analysis
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Stage 1: Enter Flow / Select Product</span>
                  <strong style={{ color: '#10b981' }}>100% Success</strong>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '100%', background: '#10b981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Stage 2: Configure Parameters / Add Promo Code</span>
                  <strong style={{ color: '#10b981' }}>98% Success</strong>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '98%', background: '#10b981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#fb7185' }}>Stage 3: Calculate Total & Submit Order (DROP-OFF POINT)</span>
                  <strong style={{ color: '#f43f5e' }}>0% Success (100% Drop-off)</strong>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '0%', background: '#f43f5e' }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingDown size={14} color="#f43f5e" />
              <span>{diag.productManagerView.dropoffRate}</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LENS 4: EVERYDAY / NON-TECHNICAL USERS
          ========================================================================= */}
      {activeLens === 'user' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            padding: 16,
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14
          }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(244, 63, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <HelpCircle size={20} color="#fb7185" />
            </div>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                What Happened in Plain English
              </h4>
              <p style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
                {diag.userView.summary}
              </p>
            </div>
          </div>

          <div style={{
            padding: 16,
            background: 'rgba(16, 185, 129, 0.08)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14
          }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={20} color="#34d399" />
            </div>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#34d399', marginBottom: 4 }}>
                How the Developer Will Fix It
              </h4>
              <p style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.6 }}>
                {diag.userView.actionRequired}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
