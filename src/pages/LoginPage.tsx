import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Store, HeartHandshake, ArrowRight, AlertCircle, Sparkles, Loader2, Database, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { isSupabaseConfigured } from '../lib/db';

export default function LoginPage() {
  const [role, setRole] = useState<'driver' | 'dealer' | 'emergency' | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Please select a portal first');
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = (formData.get('email') as string).trim();
    const password = formData.get('password') as string;

    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        const data = Object.fromEntries(formData.entries());
        data.role = role;
        await register(data);
      }
      
      if (role === 'driver') navigate('/driver');
      if (role === 'dealer') navigate('/dealer');
      if (role === 'emergency') navigate('/emergency');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (
    targetEmail: string, 
    targetPass: string, 
    targetRole: 'driver' | 'dealer' | 'emergency'
  ) => {
    setRole(targetRole);
    setEmailInput(targetEmail);
    setPasswordInput(targetPass);
    setError(null);
    setLoading(true);

    try {
      await login(targetEmail, targetPass, targetRole);
      if (targetRole === 'driver') navigate('/driver');
      if (targetRole === 'dealer') navigate('/dealer');
      if (targetRole === 'emergency') navigate('/emergency');
    } catch (err: any) {
      setError(err.message || 'Quick login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex-center" style={{ position: 'relative', overflow: 'hidden', background: '#0a0a0f', padding: '2rem 1rem' }}>
      
      {/* Decorative Animated Blobs */}
      <div className="blob" style={{ top: '10%', left: '20%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.4)' }}></div>
      <div className="blob" style={{ bottom: '10%', right: '20%', width: '400px', height: '400px', background: 'rgba(139, 92, 246, 0.3)', animationDelay: '2s' }}></div>

      <div className="glass-panel animate-fade-in" style={{ 
        padding: '2.5rem', 
        width: '100%', 
        maxWidth: '520px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(15, 15, 20, 0.75)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="flex-center" style={{ margin: '0 auto 1rem', width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
            <Truck color="white" size={30} />
          </div>
          <h2 className="text-gradient" style={{ fontSize: '1.875rem', letterSpacing: '-0.025em' }}>Welcome to OPTIMAL-TRUCK</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '1rem' }}>Intelligent Freight Logistics & Humanitarian Fleet</p>
          
          {/* Cloud Database Status Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.35rem 0.85rem', borderRadius: '999px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', fontSize: '0.75rem', color: '#4ade80' }}>
            <Database size={13} />
            <span>{isSupabaseConfigured ? 'Cloud Database Connected (Supabase)' : 'Cloud Persistence Active'}</span>
            <Check size={13} />
          </div>
        </div>

        {/* Quick Demo Access Bar */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Sparkles size={15} color="var(--accent-primary)" />
            <span>One-Click Instant Demo Access:</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('mohithdande3@gmail.com', 'password', 'dealer')}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#93c5fd',
                fontSize: '0.78rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <Store size={14} />
              <span>Mohith (Dealer)</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('mohithdande3@gmail.com', 'password', 'driver')}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#d8b4fe',
                fontSize: '0.78rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <Truck size={14} />
              <span>Mohith (Driver)</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('driver@optimal-truck.com', 'password', 'driver')}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Truck size={14} color="var(--accent-primary)" />
              <span>Rajesh (Driver)</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('ngo@optimal-truck.com', 'password', 'emergency')}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 500,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <HeartHandshake size={14} color="var(--accent-danger)" />
              <span>Kerala Relief (NGO)</span>
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
          <button 
            type="button"
            className={`glass-card role-card ${role === 'driver' ? 'active-role' : ''}`}
            style={{ 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              border: role === 'driver' ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
              background: role === 'driver' ? 'rgba(59, 130, 246, 0.1)' : undefined
            }}
            onClick={() => setRole('driver')}
          >
            <div className="flex-center" style={{ width: '42px', height: '42px', borderRadius: '50%', background: role === 'driver' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
              <Truck size={22} color={role === 'driver' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>Driver Portal</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Find backhaul loads & maximize profit</div>
            </div>
          </button>
          
          <button 
            type="button"
            className={`glass-card role-card ${role === 'dealer' ? 'active-role' : ''}`}
            style={{ 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              border: role === 'dealer' ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
              background: role === 'dealer' ? 'rgba(59, 130, 246, 0.1)' : undefined
            }}
            onClick={() => setRole('dealer')}
          >
            <div className="flex-center" style={{ width: '42px', height: '42px', borderRadius: '50%', background: role === 'dealer' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
              <Store size={22} color={role === 'dealer' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>Dealer Portal</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Ship goods efficiently & find trucks</div>
            </div>
          </button>
          
          <button 
            type="button"
            className={`glass-card role-card ${role === 'emergency' ? 'active-role' : ''}`}
            style={{ 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              border: role === 'emergency' ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
              background: role === 'emergency' ? 'rgba(59, 130, 246, 0.1)' : undefined
            }}
            onClick={() => setRole('emergency')}
          >
            <div className="flex-center" style={{ width: '42px', height: '42px', borderRadius: '50%', background: role === 'emergency' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
              <HeartHandshake size={22} color={role === 'emergency' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>Emergency / NGO Portal</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Broadcast urgent humanitarian needs</div>
            </div>
          </button>
        </div>

        {role && (
          <form onSubmit={handleAuth} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
            <div className="flex-between">
              <h3 style={{ fontSize: '1.15rem' }}>{isLogin ? `Sign In as ${role.toUpperCase()}` : `Create ${role.toUpperCase()} Account`}</h3>
              <button 
                type="button" 
                onClick={() => { setIsLogin(!isLogin); setError(null); }} 
                style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isLogin ? 'Need an account?' : 'Already have an account?'}
              </button>
            </div>
            
            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-md)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <>
                {role === 'driver' && (
                  <>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                      <input type="text" name="name" className="form-input" placeholder="e.g. Mohith Dande" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                      <input type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Vehicle / Registration Number</label>
                      <input type="text" name="vehicleNumber" className="form-input" placeholder="e.g. KL-07-BZ-1234" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </>
                )}
                {role === 'dealer' && (
                  <>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Dealer / Contact Name</label>
                      <input type="text" name="name" className="form-input" placeholder="e.g. Mohith Dande" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                      <input type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Organization / Business Name</label>
                      <input type="text" name="orgName" className="form-input" placeholder="e.g. Dande Logistics" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </>
                )}
                {role === 'emergency' && (
                  <>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Organization / NGO Name</label>
                      <input type="text" name="orgName" className="form-input" placeholder="e.g. Disaster Relief Foundation" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Emergency Contact Phone</label>
                      <input type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" required style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  </>
                )}
              </>
            )}
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="form-input" 
                placeholder="name@example.com" 
                required 
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} 
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <input 
                type="password" 
                name="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="form-input" 
                placeholder="Enter your password" 
                required 
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Connecting to Cloud DB...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
