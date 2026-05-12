'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { roleLabels } from '@/lib/mockData';
import './dashboard.css';

const navItems = [
  { href: '/dashboard', icon: '🏠', label: '대시보드 홈', exact: true },
  { href: '/dashboard/training', icon: '📋', label: '육성 계획' },
  { href: '/dashboard/posts', icon: '📝', label: '활동 기록', badge: 'NEW' },
  { href: '/dashboard/members', icon: '👥', label: '팀원 관리' },
  { href: '/dashboard/calendar', icon: '📅', label: '일정 캘린더' },
];

const settingsItems = [
  { href: '/dashboard/settings', icon: '⚙️', label: '설정' },
];

export default function DashboardLayout({ children }) {
  const { currentUser, logout, loading, switchDemoRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoRole, setDemoRole] = useState('');

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (currentUser) {
      setDemoRole(currentUser.role);
    }
  }, [currentUser]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleDemoRoleSwitch = async (e) => {
    const newRole = e.target.value;
    setDemoRole(newRole);
    const success = await switchDemoRole(newRole);
    if (success) {
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !currentUser) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '1.2rem', opacity: 0.5 }}>로딩 중...</div>
      </div>
    );
  }

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div className="dashboard-layout">
      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">R</div>
            <div className="sidebar-logo-text">
              <h2>R&D TECH</h2>
              <span>공채 1기 육성 대시보드</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">메인 메뉴</div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive(item.href, item.exact) ? 'active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="sidebar-link-badge">{item.badge}</span>
              )}
            </Link>
          ))}

          <div className="sidebar-section-label">설정</div>
          {settingsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          {currentUser?.role === 'admin' && (
            <>
              <div className="sidebar-section-label" style={{ color: '#fbbf24' }}>관리자</div>
              <Link
                href="/dashboard/admin"
                className={`sidebar-link ${isActive('/dashboard/admin') ? 'active' : ''}`}
              >
                <span className="sidebar-link-icon">👑</span>
                계정 관리
              </Link>
            </>
          )}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-user-card">
            <div className="avatar avatar-sm">{currentUser.avatar}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{currentUser.name}</div>
              <div className="sidebar-user-role">{roleLabels[currentUser.role]}</div>
            </div>
            <button className="sidebar-logout-btn" onClick={handleLogout} title="로그아웃">
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="header-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <span className="header-title">
              {navItems.find((n) => isActive(n.href, n.exact))?.label || '대시보드'}
            </span>
          </div>

          <div className="header-right">
            <span className="header-date">📆 {dateStr}</span>

            {/* Demo role switcher */}
            <div className="header-role-switcher">
              <label>역할 전환:</label>
              <select value={demoRole} onChange={handleDemoRoleSwitch}>
                <option value="admin">👑 관리자</option>
                <option value="team_lead">🏆 팀장</option>
                <option value="mentor">🎯 멘토</option>
                <option value="trainee">🌱 공채 사원</option>
              </select>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
