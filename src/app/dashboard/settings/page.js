'use client';
import { useAuth } from '@/lib/AuthContext';
import { roleLabels, getTeamById } from '@/lib/mockData';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const team = getTeamById(currentUser?.teamId);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>⚙️ 설정</h1>

      <div className="glass-card" style={{ padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="avatar avatar-lg" style={{ width: '80px', height: '80px', fontSize: '2.5rem', margin: '0 auto 16px' }}>
            {currentUser?.avatar}
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px' }}>
            {currentUser?.name}
          </h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {currentUser?.position}
          </p>
          <span className="badge badge-primary" style={{ marginTop: '8px' }}>
            {roleLabels[currentUser?.role]}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input className="input" value={currentUser?.email || ''} disabled />
          </div>

          <div className="form-group">
            <label className="form-label">이름</label>
            <input className="input" value={currentUser?.name || ''} disabled />
          </div>

          <div className="form-group">
            <label className="form-label">소속 팀</label>
            <input className="input" value={team?.name || '없음'} disabled />
          </div>

          <div className="form-group">
            <label className="form-label">역할</label>
            <input className="input" value={roleLabels[currentUser?.role] || ''} disabled />
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          color: '#fbbf24',
        }}>
          ⚠️ 프로필 수정은 Supabase 연동 후 활성화됩니다.
        </div>
      </div>

      {/* Demo info */}
      <div className="glass-card" style={{ padding: '24px', marginTop: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>
          🧪 데모 모드 안내
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
          현재 데모 모드로 실행 중입니다. 모든 데이터는 브라우저 메모리에 저장되며,
          페이지를 새로고침하면 초기 데이터로 복원됩니다.<br /><br />
          상단 헤더의 <strong>역할 전환</strong> 드롭다운을 사용하여
          관리자, 팀장, 멘토, 공채 사원 등 다양한 역할로 전환하여 테스트할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
