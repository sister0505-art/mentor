'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useData } from '@/lib/DataContext';
import {
  categoryLabels,
  categoryColors,
  statusLabels,
  statusColors,
  postTypeLabels,
  roleLabels,
} from '@/lib/mockData';
import './home.css';

export default function DashboardHome() {
  const { currentUser } = useAuth();
  const { trainingPlans, posts, likes, comments, users, teams, getUserById, getTeamById } = useData();

  // Calculate stats
  let trainees = users.filter((u) => u.role === 'trainee');
  
  // 권한별 필터링
  if (currentUser?.role === 'team_lead') {
    trainees = trainees.filter((u) => u.teamId === currentUser.teamId);
  } else if (currentUser?.role === 'mentor') {
    trainees = trainees.filter((u) => u.mentorId === currentUser.id);
  } else if (currentUser?.role === 'trainee') {
    trainees = trainees.filter((u) => u.id === currentUser.id);
  }
  const totalTrainees = trainees.length;

  const avgProgress = Math.round(
    trainingPlans.reduce((sum, tp) => sum + tp.progress, 0) / trainingPlans.length
  );

  const thisWeekPosts = posts.filter((p) => {
    const d = new Date(p.createdAt);
    const now = new Date();
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  const mentoringCount = trainingPlans.filter(
    (tp) => tp.category === 'mentoring'
  ).length;

  // Timeline calculation (June 15 ~ Dec 31)
  const startDate = new Date('2026-06-15');
  const endDate = new Date('2026-12-31');
  const today = new Date();
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const elapsedDays = Math.max(0, Math.min(totalDays, (today - startDate) / (1000 * 60 * 60 * 24)));
  const timelineProgress = Math.round((elapsedDays / totalDays) * 100);

  const months = ['6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const currentMonth = today.getMonth(); // 0-indexed

  // Category stats
  const categories = ['education', 'mentoring', 'team_work', 'external', 'adaptation'];
  const categoryStats = categories.map((cat) => {
    const items = trainingPlans.filter((tp) => tp.category === cat);
    const completed = items.filter((tp) => tp.status === 'completed').length;
    const total = items.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { category: cat, total, completed, progress };
  });

  // Recent activity
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="home-grid">
      {/* Stats Row */}
      <div className="stats-row">
        <div className="glass-card stat-card" style={{ animationDelay: '0s' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">공채 인원</span>
            <span className="stat-card-icon">👥</span>
          </div>
          <div className="stat-card-value">{totalTrainees}명</div>
          <div className="stat-card-sub">{teams.length}개 팀 배치</div>
        </div>

        <div className="glass-card stat-card" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">전체 진행률</span>
            <span className="stat-card-icon">📊</span>
          </div>
          <div className="stat-card-value">{avgProgress}%</div>
          <div className="stat-card-sub">육성 계획 평균 달성률</div>
        </div>

        <div className="glass-card stat-card" style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">활동 기록</span>
            <span className="stat-card-icon">📝</span>
          </div>
          <div className="stat-card-value">{posts.length}건</div>
          <div className="stat-card-sub">이번 주 {thisWeekPosts}건 작성</div>
        </div>

        <div className="glass-card stat-card" style={{ animationDelay: '0.3s' }}>
          <div className="stat-card-header">
            <span className="stat-card-label">멘토링</span>
            <span className="stat-card-icon">🎯</span>
          </div>
          <div className="stat-card-value">{mentoringCount}건</div>
          <div className="stat-card-sub">멘토링 세션 진행중</div>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="glass-card timeline-section">
        <div className="section-header">
          <h2 className="section-title">📅 6개월 육성 타임라인</h2>
          <span className="badge badge-primary">D+{Math.floor(elapsedDays)}일</span>
        </div>

        <div className="timeline-bar-wrapper">
          <div className="timeline-months">
            {months.map((m, i) => (
              <span
                key={m}
                className={`timeline-month ${i + 5 === currentMonth ? 'current' : ''}`}
              >
                {m}
              </span>
            ))}
          </div>

          <div className="timeline-track">
            <div
              className="timeline-progress"
              style={{ width: `${timelineProgress}%` }}
            >
              <div className="timeline-marker" />
            </div>
          </div>

          <div className="timeline-dates">
            <span className="timeline-date">시작: 2026.06.15</span>
            <span className="timeline-date">종료: 2026.12.31</span>
          </div>
        </div>

        {/* Category Progress */}
        <h3 className="section-title" style={{ fontSize: '0.95rem', marginBottom: '16px' }}>
          카테고리별 현황
        </h3>
        <div className="category-grid">
          {categoryStats.map((cs) => (
            <div key={cs.category} className="category-item">
              <div className="category-item-header">
                <span
                  className="category-dot"
                  style={{ background: categoryColors[cs.category] }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {cs.completed}/{cs.total}
                </span>
              </div>
              <div className="category-label">{categoryLabels[cs.category]}</div>
              <div className="category-count">{cs.total}개 프로그램</div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${cs.progress}%`,
                    background: categoryColors[cs.category],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two column: Recent Activity + Team Overview */}
      <div className="two-col">
        {/* Recent Activity Feed */}
        <div className="glass-card feed-section">
          <div className="section-header">
            <h2 className="section-title">🔔 최근 활동</h2>
            <Link href="/dashboard/posts" className="btn btn-ghost btn-sm">
              전체 보기 →
            </Link>
          </div>

          <div className="feed-list">
            {recentPosts.map((post) => {
              const author = getUserById(post.authorId);
              const postLikes = likes.filter((l) => l.postId === post.id).length;
              const postComments = comments.filter((c) => c.postId === post.id).length;
              return (
                <Link
                  key={post.id}
                  href={`/dashboard/posts/${post.id}`}
                  className="feed-item"
                >
                  <div className="avatar avatar-sm">{author?.avatar}</div>
                  <div className="feed-item-content">
                    <div className="feed-item-title">{post.title}</div>
                    <div className="feed-item-desc">{post.content}</div>
                    <div className="feed-item-meta">
                      <span>{author?.name}</span>
                      <span>❤️ {postLikes}</span>
                      <span>💬 {postComments}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Trainee Overview */}
        <div className="glass-card feed-section">
          <div className="section-header">
            <h2 className="section-title">🌱 공채 사원 현황</h2>
            <Link href="/dashboard/members" className="btn btn-ghost btn-sm">
              전체 보기 →
            </Link>
          </div>

          <div className="feed-list">
            {trainees.map((trainee) => {
              const team = getTeamById(trainee.teamId);
              const mentor = getUserById(trainee.mentorId);
              const plans = trainingPlans.filter((tp) => tp.traineeId === trainee.id);
              const avgProg = plans.length
                ? Math.round(plans.reduce((s, p) => s + p.progress, 0) / plans.length)
                : 0;
              return (
                <Link
                  key={trainee.id}
                  href={`/dashboard/members/${trainee.id}`}
                  className="feed-item"
                >
                  <div className="avatar avatar-sm">{trainee.avatar}</div>
                  <div className="feed-item-content">
                    <div className="feed-item-title">
                      {trainee.name}
                      <span
                        className="badge badge-info"
                        style={{ marginLeft: '8px', fontSize: '0.65rem' }}
                      >
                        {team?.name}
                      </span>
                    </div>
                    <div className="feed-item-desc">
                      멘토: {mentor?.name} · 육성 계획 {plans.length}개
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                          진행률
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                          {avgProg}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${avgProg}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
