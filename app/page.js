'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── WebGL shader background (orange nebula) ──────────────────────────────────
const SHADER_SOURCE = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

function useShaderBg() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, `#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}`);
    gl.compileShader(vert);

    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, SHADER_SOURCE);
    gl.compileShader(frag);

    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, 'resolution');
    const uTime = gl.getUniformLocation(prog, 'time');

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = (now) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(prog);
    };
  }, []);

  return canvasRef;
}

// ── Radial pulse loader ───────────────────────────────────────────────────────
function PulseLoader() {
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 48; canvas.height = 48;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, 48, 48);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pulse = Math.sin(t * 0.05 + i * 0.5) * 10 + 14;
        ctx.beginPath();
        ctx.moveTo(24, 24);
        ctx.lineTo(24 + Math.cos(angle) * pulse, 24 + Math.sin(angle) * pulse);
        const op = 0.3 + Math.sin(t * 0.05 + i * 0.5) * 0.7;
        ctx.strokeStyle = `rgba(251,146,60,${op})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(24 + Math.cos(angle) * pulse, 24 + Math.sin(angle) * pulse, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fb923c';
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(24, 24, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fb923c';
      ctx.fill();
      t++;
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return <canvas ref={ref} style={{ width: 48, height: 48 }} />;
}

// ── Detail hint ───────────────────────────────────────────────────────────────
function detailHint(len) {
  if (len === 0)   return { text: '',                                          color: 'transparent' };
  if (len < 80)    return { text: 'Keep going — add income, debts, goals',    color: 'rgba(251,146,60,0.4)' };
  if (len < 250)   return { text: "Good — include what you've tried",         color: 'rgba(251,146,60,0.55)' };
  if (len < 500)   return { text: 'Getting detailed — add your timeline',     color: 'rgba(251,146,60,0.7)' };
  if (len < 800)   return { text: 'Strong — include your biggest obstacle',   color: 'rgba(251,146,60,0.85)' };
  return             { text: '✓ Excellent detail — ready to send',            color: '#fb923c' };
}

const FEATURES = [
  { icon: '⚡', title: 'Personalized to your situation',  desc: 'Income, debt, goals, constraints — your plan, not a template.' },
  { icon: '📸', title: 'Photo & document analysis',       desc: 'Upload a pay stub or bank statement. Actionable coaches on real numbers.' },
  { icon: '🎙', title: 'Voice input',                     desc: 'Talk through your situation. No typing required.' },
  { icon: '📈', title: 'Progress tracking',               desc: 'Milestone checklists and streaks keep you moving forward.' },
  { icon: '💬', title: 'Full chat history',               desc: 'Every session saved. Pick up where you left off.' },
  { icon: '🤝', title: 'Community stories',               desc: 'Real people who broke out. Post yours when you make it.' },
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const canvasRef  = useShaderBg();
  const [scenario, setScenario]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [response, setResponse]   = useState('');
  const [trialUsed, setTrialUsed] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  async function submit() {
    if (!scenario.trim() || loading || trialUsed || scenario.length < 50) return;
    setLoading(true);
    try {
      const res  = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenario.trim() }),
      });
      const data = await res.json();
      setResponse(data.error ? 'Something went wrong. Please try again.' : data.response);
      if (!data.error) {
        setTrialUsed(true);
        if (typeof localStorage !== 'undefined') localStorage.setItem('actionable_trial_used', '1');
      }
    } catch { setResponse('Something went wrong. Please try again.'); }
    setLoading(false);
  }

  const hint    = detailHint(scenario.length);
  const canSend = scenario.trim().length >= 50 && !loading && !trialUsed;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gradShift {
          0%,100% { background-position:0% 50%; }
          50%     { background-position:100% 50%; }
        }
        .grad-text {
          background: linear-gradient(90deg,#fdba74,#f97316,#fbbf24,#ef4444,#f97316);
          background-size: 300% 300%;
          animation: gradShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .anim-0 { animation: fadeUp 0.7s 0.1s ease both; }
        .anim-1 { animation: fadeUp 0.7s 0.25s ease both; }
        .anim-2 { animation: fadeUp 0.7s 0.4s ease both; }
        .anim-3 { animation: fadeUp 0.7s 0.55s ease both; }
        .send-btn { transition: all 0.18s; }
        .send-btn:hover:not(:disabled) { transform: scale(1.03); }
        .send-btn:active:not(:disabled) { transform: scale(0.97); }
      `}</style>

      {/* ── Shader canvas (fixed behind everything) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
        }}
      />
      {/* Dark overlay so text is readable */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 1, pointerEvents: 'none' }} />

      {/* ── All content ── */}
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', color: '#fff', fontFamily: "'Inter Tight', system-ui, sans-serif" }}>

        {/* ── Floating navbar ── */}
        <header style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '12px 24px',
          borderRadius: menuOpen ? 18 : 9999,
          border: '1px solid rgba(251,146,60,0.2)',
          background: 'rgba(20,10,0,0.6)',
          backdropFilter: 'blur(20px)',
          width: 'calc(100% - 48px)', maxWidth: 560,
          transition: 'border-radius 0.3s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 24 }}>
            <a href="/" style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>Actionable</a>
            <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <a href="/stories" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Stories</a>
              <a href="/login"   style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', border: '1px solid rgba(251,146,60,0.25)', borderRadius: 999, padding: '6px 14px' }}>Sign in</a>
              <a href="/signup"  style={{ fontSize: 13, fontWeight: 700, color: '#000', textDecoration: 'none', background: 'linear-gradient(135deg,#f97316,#fbbf24)', borderRadius: 999, padding: '7px 16px' }}>Get started</a>
            </nav>
          </div>
        </header>

        {/* ── Hero ── */}
        <div style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '100px 24px 80px', textAlign: 'center',
        }}>

          {/* Trust badge */}
          <div className="anim-0" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px',
            border: '1px solid rgba(251,146,60,0.3)',
            borderRadius: 999,
            background: 'rgba(251,146,60,0.08)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'rgba(253,186,116,0.9)',
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 8px #f97316' }} />
            One free message · Make it count
          </div>

          {/* Headline */}
          <h1 className="anim-1" style={{ fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.045em', margin: '0 0 20px' }}>
            <span className="grad-text">What's your<br />situation?</span>
          </h1>

          <p className="anim-2" style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: '0 0 40px', maxWidth: 440 }}>
            One shot. Lay it all out — income, debt, goals, what's held you back. Get a real plan built for your exact life.
          </p>

          {/* ── AI chat bar ── */}
          <div className="anim-3" style={{ width: '100%', maxWidth: 660 }}>
            <div style={{
              background: 'rgba(20,10,0,0.75)',
              border: '1px solid rgba(251,146,60,0.25)',
              borderRadius: 20,
              overflow: 'hidden',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 0 1px rgba(249,115,22,0.08) inset, 0 24px 64px -12px rgba(0,0,0,0.7)',
            }}>

              {/* One-message warning */}
              {!response && (
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(251,146,60,0.12)',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  background: 'rgba(249,115,22,0.05)',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚡</span>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                    <span style={{ color: 'rgba(253,186,116,0.9)', fontWeight: 700 }}>You have one free message.</span>{' '}
                    Include your exact income, total debt, real goals, and what you've already tried. The more specific, the better your plan.
                  </p>
                </div>
              )}

              {/* Input */}
              {!trialUsed && (
                <>
                  <textarea
                    style={{
                      width: '100%', background: 'transparent', border: 'none',
                      padding: '20px 22px 10px',
                      color: '#fff', fontSize: 15, fontFamily: 'inherit',
                      resize: 'none', outline: 'none', lineHeight: 1.75,
                      boxSizing: 'border-box', minHeight: 160,
                      caretColor: '#f97316',
                    }}
                    placeholder="I make $X/month, have $X in debt (credit cards, student loans, car…), want to X by X. I've tried Y but Z. My biggest obstacle is…"
                    value={scenario}
                    onChange={e => setScenario(e.target.value)}
                    maxLength={1500}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit(); }}
                  />

                  <div style={{
                    padding: '10px 16px',
                    borderTop: '1px solid rgba(251,146,60,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ fontSize: 12, color: hint.color, transition: 'color 0.4s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {hint.text}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.12)', flexShrink: 0 }}>{scenario.length}/1500</span>
                    </div>
                    <button
                      className="send-btn"
                      onClick={submit}
                      disabled={!canSend}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: canSend
                          ? 'linear-gradient(135deg,#f97316,#fbbf24)'
                          : 'rgba(255,255,255,0.06)',
                        color: canSend ? '#000' : 'rgba(255,255,255,0.2)',
                        border: 'none', borderRadius: 11,
                        padding: '11px 22px',
                        fontSize: 13, fontWeight: 700,
                        cursor: canSend ? 'pointer' : 'default',
                        fontFamily: 'inherit', flexShrink: 0,
                      }}
                    >
                      Send →
                    </button>
                  </div>
                </>
              )}

              {/* Loading state */}
              {loading && (
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <PulseLoader />
                  <p style={{ fontSize: 13, color: 'rgba(253,186,116,0.7)', margin: 0 }}>Building your plan…</p>
                </div>
              )}

              {/* Response */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div style={{ padding: '26px 24px', borderBottom: '1px solid rgba(251,146,60,0.1)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(251,146,60,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                        Your plan
                      </div>
                      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.82, whiteSpace: 'pre-wrap' }}>
                        {response}
                      </div>
                    </div>
                    <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', background: 'rgba(249,115,22,0.04)' }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Want the full roadmap?</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>Unlimited sessions · Progress tracking · $15/mo</div>
                      </div>
                      <a href="/signup" style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', color: '#000', borderRadius: 11, padding: '12px 24px', fontSize: 13, fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}>
                        Start for $15/mo →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {!response && !loading && (
            <p style={{ marginTop: 18, fontSize: 12, color: 'rgba(255,255,255,0.12)' }}>↓ See what's included</p>
          )}
        </div>

        {/* ── Features ── */}
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(251,146,60,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Everything you need</div>
            <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0, color: '#fff' }}>Built for people who move different</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: 'rgba(20,10,0,0.6)', border: '1px solid rgba(251,146,60,0.12)', borderRadius: 16, padding: '24px', backdropFilter: 'blur(12px)' }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pricing ── */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 100px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(251,146,60,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Simple pricing</div>
          <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 40px', color: '#fff' }}>One coach. Two plans.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            <div style={{ background: 'rgba(20,10,0,0.6)', border: '1px solid rgba(251,146,60,0.15)', borderRadius: 20, padding: '32px 28px', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Basic</div>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 4px' }}>$15</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>per month</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {['Unlimited AI coaching','Photo & document analysis','Voice input','Full chat history','Progress roadmap','Community stories','Mobile app (PWA)'].map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#f97316' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/signup?plan=basic" style={{ display: 'block', textAlign: 'center', border: '1px solid rgba(251,146,60,0.3)', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, color: '#fdba74', textDecoration: 'none', boxSizing: 'border-box' }}>
                Get Basic →
              </a>
            </div>
            <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(251,191,36,0.1))', border: '1px solid rgba(251,146,60,0.4)', borderRadius: 20, padding: '32px 28px', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fb923c', marginBottom: 12 }}>Pro — Most popular</div>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 4px' }}>$49</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>per month</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {['Everything in Basic','Weekly AI progress reports','Priority response speed','Downloadable financial plans','Referral — give & get free months','Early access to features'].map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', padding: '6px 0', borderBottom: '1px solid rgba(251,146,60,0.08)', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#f97316' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/signup?plan=pro" style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#f97316,#fbbf24)', borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, color: '#000', textDecoration: 'none', boxSizing: 'border-box' }}>
                Get Pro →
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(251,146,60,0.1)', padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Actionable AI. Built for people who move different.</div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 12 }}>
            {[['Privacy','/privacy'],['Terms','/terms'],['Stories','/stories']].map(([l,h]) => (
              <a key={l} href={h} style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
