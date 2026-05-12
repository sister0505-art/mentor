'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import './login.css';

const demoAccounts = [
  { emoji: '👑', name: '김관리 (관리자)', email: 'admin@rdtech.com', password: 'admin123', role: '관리자', color: '#f59e0b' },
  { emoji: '🏆', name: '박팀장 (팀장)', email: 'lead1@rdtech.com', password: 'lead123', role: '팀장', color: '#0ea5e9' },
  { emoji: '🎯', name: '강멘토 (멘토)', email: 'mentor1@rdtech.com', password: 'mentor123', role: '멘토', color: '#8b5cf6' },
  { emoji: '🌱', name: '김신입 (공채)', email: 'trainee1@rdtech.com', password: 'trainee123', role: '공채', color: '#10b981' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const result = login(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  if (loading) return null;

  return (
    <div className="login-wrapper">
      {/* Animated background */}
      <div className="login-bg">
        <div className="login-bg-orb"></div>
        <div className="login-bg-orb"></div>
        <div className="login-bg-orb"></div>
      </div>

      {/* Left panel - Info */}
      <div className="login-info-panel">
        <div className="login-brand">
          <div className="login-brand-badge">🚀 2026년 공채 1기</div>
          <h1>R&D TECH<br />배치후 육성 대시보드</h1>
          <p>
            6개월간의 체계적인 육성 과정을 한눈에 관리하세요.<br />
            교육, 멘토링, 직무 적응까지 밀착 케어합니다.
          </p>
        </div>

        <div className="login-features">
          <div className="login-feature">
            <div className="login-feature-icon" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>📋</div>
            <div className="login-feature-text">
              <h3>6개월 육성 계획</h3>
              <p>6.15 ~ 12.31 타임라인 기반 체계적 관리</p>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>🎯</div>
            <div className="login-feature-text">
              <h3>멘토링 & 실무 노하우</h3>
              <p>멘토를 통한 실무 경험 전수 및 팀 업무 적응</p>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon" style={{ background: 'rgba(14, 165, 233, 0.15)' }}>🌐</div>
            <div className="login-feature-text">
              <h3>외부 교육 & 박람회</h3>
              <p>최신 기술 트렌드 학습 및 네트워킹</p>
            </div>
          </div>
          <div className="login-feature">
            <div className="login-feature-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>💚</div>
            <div className="login-feature-text">
              <h3>밀착 케어</h3>
              <p>직무 적응 상태 실시간 모니터링 및 피드백</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="login-form-panel">
        <div className="login-card">
          <div className="login-card-header">
            <h2>로그인</h2>
            <p>회사 이메일로 로그인하세요</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">📧 이메일</label>
              <input
                type="email"
                className="input"
                placeholder="name@rdtech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="login-email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">🔒 비밀번호</label>
              <input
                type="password"
                className="input"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="login-password"
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={isLoading}
              id="login-submit"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="login-demo-accounts">
            <h4>데모 계정으로 빠른 로그인</h4>
            <div className="demo-account-list">
              {demoAccounts.map((account) => (
                <div
                  key={account.email}
                  className="demo-account"
                  onClick={() => handleDemoLogin(account)}
                >
                  <div className="demo-account-info">
                    <span>{account.emoji}</span>
                    <span>{account.name}</span>
                  </div>
                  <span
                    className="demo-account-role"
                    style={{ background: `${account.color}22`, color: account.color }}
                  >
                    {account.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
