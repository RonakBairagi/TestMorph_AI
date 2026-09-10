import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Lock, 
  RotateCw, 
  Sparkles, 
  Check, 
  Copy, 
  AlertCircle, 
  ShoppingBag, 
  Calendar, 
  Stethoscope, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Eye, 
  Cpu, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { sound } from '../engine/soundFx';

export default function VirtualBrowser({
  currentApp,
  isTesting,
  currentStepIndex,
  testOutcome,
  agentCursor,
  activeTargetSelector,
  agentActionLog,
  onCustomUrlChange,
  customUrl,
  cameraTransform
}) {
  // Local state for interactive app elements
  const [topicInput, setTopicInput] = useState('Scalable Microservices with Rust & Kafka');
  const [toneSelect, setToneSelect] = useState('Engineering Authority');
  const [temperature, setTemperature] = useState(0.7);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // PayVault state
  const [promoInput, setPromoInput] = useState('');
  const [cartTotal, setCartTotal] = useState('$199.00');
  const [promoApplied, setPromoApplied] = useState(false);
  const [payError, setPayError] = useState(false);

  // HealthSync state
  const [selectedSlot, setSelectedSlot] = useState('02:30 PM');
  const [symptoms, setSymptoms] = useState('');
  const [healthError, setHealthError] = useState(false);

  // Sync state when test steps advance
  useEffect(() => {
    if (!isTesting) return;

    if (currentApp.id === 'promptgenius') {
      if (currentStepIndex === 0) {
        setTopicInput('');
        let charIndex = 0;
        const text = 'Scalable Microservices with Rust & Kafka';
        const interval = setInterval(() => {
          if (charIndex <= text.length) {
            setTopicInput(text.slice(0, charIndex));
            sound.playTyping();
            charIndex++;
          } else {
            clearInterval(interval);
          }
        }, 30);
        return () => clearInterval(interval);
      }
      if (currentStepIndex === 1) {
        setToneSelect('Engineering Authority');
      }
      if (currentStepIndex === 2) {
        setTemperature(0.7);
      }
      if (currentStepIndex === 3) {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setIsGenerated(true);
        }, 800);
      }
    }

    if (currentApp.id === 'payvault') {
      if (currentStepIndex === 0) {
        setCartTotal('$199.00');
        setPromoInput('');
        setPromoApplied(false);
        setPayError(false);
      }
      if (currentStepIndex === 1) {
        setPromoInput('');
        let charIndex = 0;
        const code = 'DISCOUNT-300-SUPER';
        const interval = setInterval(() => {
          if (charIndex <= code.length) {
            setPromoInput(code.slice(0, charIndex));
            sound.playTyping();
            charIndex++;
          } else {
            clearInterval(interval);
          }
        }, 40);
        return () => clearInterval(interval);
      }
      if (currentStepIndex === 2) {
        // Trigger the edge-case calculation bug!
        setPromoApplied(true);
        setCartTotal('-$101.00 (Tax: NaN)');
      }
      if (currentStepIndex === 3) {
        setPayError(true);
      }
    }

    if (currentApp.id === 'healthsync') {
      if (currentStepIndex === 0) {
        setSelectedSlot('02:30 PM');
        setSymptoms('');
        setHealthError(false);
      }
      if (currentStepIndex === 1) {
        const text = 'Acute resting tachycardia and dizziness';
        let i = 0;
        const interval = setInterval(() => {
          if (i <= text.length) {
            setSymptoms(text.slice(0, i));
            sound.playTyping();
            i++;
          } else {
            clearInterval(interval);
          }
        }, 30);
        return () => clearInterval(interval);
      }
      if (currentStepIndex === 2) {
        // Submit
      }
      if (currentStepIndex === 3) {
        setHealthError(true);
      }
    }
  }, [isTesting, currentStepIndex, currentApp.id]);

  return (
    <div className="mock-browser-window" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top Chrome Toolbar */}
      <div className="mock-browser-toolbar">
        <div className="code-dots">
          <div className="code-dot red" />
          <div className="code-dot yellow" />
          <div className="code-dot green" />
        </div>

        <div className="mock-address-bar">
          <Lock size={12} color="#10b981" />
          <span style={{ color: '#10b981', fontWeight: 600 }}>https://</span>
          <span style={{ color: '#f8fafc' }}>
            {currentApp.url.replace('https://', '')}
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-tertiary)'
            }}>
              DOM v4.2
            </span>
            <RotateCw size={12} className={isTesting ? 'spin' : ''} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge badge-cyan" style={{ fontSize: 10, padding: '4px 8px' }}>
            <Cpu size={12} />
            <span>AI Sandboxed</span>
          </span>
        </div>
      </div>

      {/* Viewport Area with Camera Transform & Agent Overlay */}
      <div 
        className="mock-browser-viewport"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0e17'
        }}
      >
        {/* Radar Scanner Sweep when testing */}
        {isTesting && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00f2fe, transparent)',
            boxShadow: '0 0 15px #00f2fe',
            zIndex: 30,
            animation: 'radar-sweep 2.2s ease-in-out infinite',
            pointerEvents: 'none'
          }} />
        )}

        {/* Live Active Element Highlight Bounding Box */}
        {isTesting && activeTargetSelector && (
          <div style={{
            position: 'absolute',
            top: 12,
            right: 16,
            zIndex: 40,
            background: 'rgba(0, 242, 254, 0.15)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 10px',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: '#00f2fe',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Eye size={12} />
            <span>Inspecting: {activeTargetSelector}</span>
          </div>
        )}

        {/* Scalable Container for Pan/Zoom */}
        <div 
          style={{
            flex: 1,
            padding: '24px',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: cameraTransform 
              ? `scale(${cameraTransform.zoom}) translate(${cameraTransform.x}px, ${cameraTransform.y}px)` 
              : 'none',
            transformOrigin: 'center center',
            overflowY: 'auto'
          }}
        >
          {/* ============================================================
              APP 1: PROMPTGENIUS AI (Happy Path)
              ============================================================ */}
          {currentApp.id === 'promptgenius' && (
            <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* App Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.12), rgba(0, 242, 254, 0.08))',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(138, 43, 226, 0.25)'
              }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles size={18} color="#c084fc" />
                    PromptGenius Architect Studio
                  </h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Enterprise system prompt compilation & dynamic LLM schema tuning.
                  </p>
                </div>
                <span className="badge badge-violet">Claude 3.5 Sonnet / GPT-4o</span>
              </div>

              {/* Form Input 1: Topic */}
              <div 
                id="topic-input"
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: activeTargetSelector === '#topic-input' 
                    ? '2px solid #00f2fe' 
                    : '1px solid var(--border-subtle)',
                  boxShadow: activeTargetSelector === '#topic-input' ? '0 0 20px rgba(0, 242, 254, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  System Prompt Architecture Objective <span style={{ color: '#00f2fe' }}>*</span>
                </label>
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="e.g. Enterprise Microservices with Rust"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#070a12',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#f8fafc',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>

              {/* Controls Row: Tone & Slider */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Tone Select */}
                <div 
                  id="tone-select"
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: activeTargetSelector === '#tone-select' 
                      ? '2px solid #00f2fe' 
                      : '1px solid var(--border-subtle)',
                    boxShadow: activeTargetSelector === '#tone-select' ? '0 0 20px rgba(0, 242, 254, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    Persona Authority & Tone
                  </label>
                  <select
                    value={toneSelect}
                    onChange={(e) => setToneSelect(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#070a12',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#f8fafc',
                      fontSize: 14,
                      outline: 'none'
                    }}
                  >
                    <option value="Engineering Authority">Engineering Authority</option>
                    <option value="Scientific Researcher">Scientific Researcher</option>
                    <option value="Product Executive">Product Executive</option>
                    <option value="Creative Storyteller">Creative Storyteller</option>
                  </select>
                </div>

                {/* Temperature Slider */}
                <div 
                  id="temperature-slider"
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: activeTargetSelector === '#temperature-slider' 
                      ? '2px solid #00f2fe' 
                      : '1px solid var(--border-subtle)',
                    boxShadow: activeTargetSelector === '#temperature-slider' ? '0 0 20px rgba(0, 242, 254, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Creativity Temp:
                    </label>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#00f2fe', fontWeight: 700 }}>
                      {temperature}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#00f2fe' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>
                    <span>Deterministic (0.0)</span>
                    <span>Exploratory (1.0)</span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  id="generate-btn"
                  onClick={() => {
                    setIsGenerating(true);
                    setTimeout(() => {
                      setIsGenerating(false);
                      setIsGenerated(true);
                    }, 600);
                  }}
                  className="btn btn-primary btn-lg"
                  style={{
                    width: '100%',
                    border: activeTargetSelector === '#generate-btn' ? '2px solid #ffffff' : 'none',
                    boxShadow: activeTargetSelector === '#generate-btn' ? '0 0 24px #00f2fe' : undefined
                  }}
                >
                  <Sparkles size={18} />
                  <span>{isGenerating ? 'Compiling Architecture...' : 'Generate Optimized System Prompt'}</span>
                </button>
              </div>

              {/* Output Result Card */}
              {(isGenerated || isGenerating) && (
                <div
                  id="output-result"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    background: '#05070e',
                    border: activeTargetSelector === '#output-result' ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.35)',
                    padding: 18,
                    boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="badge badge-emerald">
                        <Check size={12} /> Ready
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        842 tokens • 380ms TTFB
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: 11, padding: '4px 10px', gap: 4 }}
                    >
                      {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'var(--font-mono)',
                    maxHeight: 160,
                    overflowY: 'auto',
                    padding: 10,
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
{`// SYSTEM PROMPT: HIGH-THROUGHPUT DISTRIBUTED SYSTEMS ARCHITECT
Role: Principal Staff Systems Engineer with 15+ years of production experience in Rust, Tokio, and Kafka event backbones.
Directive: Design zero-copy serialization protocols, enforce strict backpressure thresholds, and eliminate latency jitter.
Telemetry Assertion: Latency p99 < 8.2ms; GC overhead: 0.00%; Thread pool starvation guarded by work-stealing executors.`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ============================================================
              APP 2: PAYVAULT EXPRESS (Edge-Case Bug)
              ============================================================ */}
          {currentApp.id === 'payvault' && (
            <div style={{ maxWidth: 650, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={18} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>PayVault Global Checkout</h3>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Order ref: #ORD-9824-CALIFORNIA</p>
                  </div>
                </div>
                <span className="badge badge-cyan">256-Bit Encrypted</span>
              </div>

              {/* Cart Subtotal */}
              <div 
                id="subtotal-amount"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 14,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: activeTargetSelector === '#subtotal-amount' ? '2px solid #00f2fe' : '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Enterprise Cloud Subscription (Annual)</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Unlimited seats • Priority SLA</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  $199.00
                </div>
              </div>

              {/* Promo Code Injection */}
              <div style={{
                padding: 16,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: activeTargetSelector === '#promo-input' ? '2px solid #00f2fe' : '1px solid var(--border-subtle)'
              }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Promotional Coupon / Voucher Code
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    id="promo-input"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon code (e.g. DISCOUNT-300-SUPER)"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#070a12',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#f8fafc',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13
                    }}
                  />
                  <button
                    id="apply-promo-btn"
                    onClick={() => {
                      setPromoApplied(true);
                      setCartTotal('-$101.00 (Tax: NaN)');
                    }}
                    className="btn btn-secondary"
                    style={{
                      border: activeTargetSelector === '#apply-promo-btn' ? '2px solid #00f2fe' : undefined,
                      boxShadow: activeTargetSelector === '#apply-promo-btn' ? '0 0 15px rgba(0, 242, 254, 0.4)' : undefined
                    }}
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div 
                id="final-total"
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: promoApplied ? 'rgba(244, 63, 94, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: promoApplied 
                    ? '2px solid #f43f5e' 
                    : (activeTargetSelector === '#final-total' ? '2px solid #00f2fe' : '1px solid var(--border-subtle)'),
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Calculated Total to Authorize:</div>
                  {promoApplied && (
                    <div style={{ fontSize: 11, color: '#f43f5e', marginTop: 4 }}>
                      ⚠️ Negative Balance & Invalid NaN Tax detected
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: promoApplied ? '#f43f5e' : '#f8fafc'
                }}>
                  {cartTotal}
                </div>
              </div>

              {/* Pay Button / Error Banner */}
              {payError ? (
                <div style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid #f43f5e',
                  color: '#fb7185',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <AlertCircle size={20} />
                  <div>
                    <strong>Payment Gateway Rejection:</strong> Cannot process negative billing amount (-$101.00). Checkout flow halted.
                  </div>
                </div>
              ) : (
                <button
                  id="pay-btn"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <ShieldCheck size={18} />
                  <span>Authorize & Pay {cartTotal}</span>
                </button>
              )}
            </div>
          )}

          {/* ============================================================
              APP 3: HEALTHSYNC TELEHEALTH (API 500 Bug)
              ============================================================ */}
          {currentApp.id === 'healthsync' && (
            <div style={{ maxWidth: 650, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Doctor Card */}
              <div style={{
                padding: 16,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Stethoscope size={24} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Dr. Sarah Chen, MD</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Chief of Cardiology • Stanford Medical Center</p>
                </div>
              </div>

              {/* Slot Picker */}
              <div style={{
                padding: 16,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                  Available Urgent Telehealth Consultations (Today)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {['10:00 AM', '01:15 PM', '02:30 PM'].map((slot) => {
                    const isSelected = selectedSlot === slot;
                    const isTargeted = slot === '02:30 PM' && activeTargetSelector === '#slot-0230';
                    return (
                      <button
                        key={slot}
                        id={slot === '02:30 PM' ? 'slot-0230' : undefined}
                        onClick={() => setSelectedSlot(slot)}
                        className="btn btn-sm"
                        style={{
                          background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          color: isSelected ? '#00f2fe' : 'var(--text-secondary)',
                          border: isTargeted 
                            ? '2px solid #00f2fe' 
                            : (isSelected ? '1px solid rgba(0, 242, 254, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)'),
                          boxShadow: isTargeted ? '0 0 15px rgba(0, 242, 254, 0.4)' : 'none'
                        }}
                      >
                        <Calendar size={13} />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Symptoms Input */}
              <div 
                id="symptoms-textarea"
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: activeTargetSelector === '#symptoms-textarea' ? '2px solid #00f2fe' : '1px solid var(--border-subtle)',
                  boxShadow: activeTargetSelector === '#symptoms-textarea' ? '0 0 20px rgba(0, 242, 254, 0.3)' : 'none'
                }}
              >
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Chief Clinical Symptoms Description
                </label>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe resting pulse, dizziness or chest discomfort..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#070a12',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#f8fafc',
                    fontSize: 13,
                    resize: 'none'
                  }}
                />
              </div>

              {/* Error Banner or Confirm Button */}
              {healthError ? (
                <div 
                  id="error-banner"
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '2px solid #f43f5e',
                    color: '#fb7185',
                    fontSize: 13,
                    boxShadow: '0 0 24px rgba(244, 63, 94, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 4 }}>
                    <AlertCircle size={18} />
                    HTTP 500 INTERNAL SERVER ERROR
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>
                    Uncaught <code>SlotRaceConditionLockException</code>: Database transaction rolled back due to concurrent slot locking deadlock.
                  </div>
                </div>
              ) : (
                <button
                  id="confirm-booking-btn"
                  className="btn btn-success btn-lg"
                  style={{
                    width: '100%',
                    border: activeTargetSelector === '#confirm-booking-btn' ? '2px solid #ffffff' : undefined,
                    boxShadow: activeTargetSelector === '#confirm-booking-btn' ? '0 0 20px #10b981' : undefined
                  }}
                >
                  Confirm Specialist Consultation ({selectedSlot})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Virtual Agent Cursor Layer */}
        {isTesting && (
          <div
            style={{
              position: 'absolute',
              left: `${agentCursor.x}%`,
              top: `${agentCursor.y}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 100,
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Pulsing Ripple */}
            <div style={{
              position: 'absolute',
              top: -12,
              left: -12,
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '2px solid #00f2fe',
              animation: 'ripple-wave 1.2s infinite'
            }} />

            {/* Neon Cursor Icon */}
            <div style={{
              width: 18,
              height: 18,
              background: '#00f2fe',
              borderRadius: '50%',
              boxShadow: '0 0 15px #00f2fe, 0 0 30px rgba(0, 242, 254, 0.6)',
              border: '2px solid #ffffff'
            }} />

            {/* Floating Tag */}
            <div style={{
              position: 'absolute',
              top: 20,
              left: 12,
              background: 'rgba(5, 8, 16, 0.92)',
              border: '1px solid #00f2fe',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 10,
              color: '#00f2fe',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-mono)'
            }}>
              AI Agent
            </div>
          </div>
        )}

        {/* Action Toast at Bottom of Viewport */}
        {isTesting && agentActionLog && (
          <div style={{
            position: 'absolute',
            bottom: 14,
            left: 14,
            right: 14,
            background: 'rgba(10, 15, 26, 0.95)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 40,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00f2fe',
                boxShadow: '0 0 8px #00f2fe'
              }} />
              <span style={{ fontSize: 12, color: '#f8fafc', fontWeight: 500 }}>
                {agentActionLog}
              </span>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: 10 }}>
              Step {currentStepIndex + 1} of {currentApp.testPlan.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
