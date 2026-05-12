'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/lib/DataContext';
import {
  categoryLabels,
  categoryColors,
  statusLabels,
  statusColors,
  roleLabels,
  postTypeLabels,
} from '@/lib/mockData';
import '../members.css';

export default function MemberDetailPage() {
  const params = useParams();
  const { trainingPlans, posts, comments, likes, users, getUserById, getTeamById } = useData();

  const user = getUserById(params.id);
  if (!user) {
    return (
      <div className="glass-card empty-state">
        <div className="empty-state-icon">❌</div>
        <div className="empty-state-text">사용자를 찾을 수 없습니다.</div>
        <Link href="/dashboard/members" className="btn btn-primary" style={{ marginTop: '16px' }}>
          목록으로
        </Link>
      </div>
    );
  }

  const team = getTeamById(user.teamId);
  const mentor = getUserById(user.mentorId);
  const userPlans = trainingPlans.filter((tp) => tp.traineeId === user.id);
  const userPosts = posts.filter((p) => p.authorId === user.id);
  const avgProgress = userPlans.length
    ? Math.round(userPlans.reduce((s, p) => s + p.progress, 0) / userPlans.length)
    : 0;
  const completedPlans = userPlans.filter((p) => p.status === 'completed').length;

  return (
    <div className="member-detail">
      <Link href="/dashboard/members" className="btn btn-ghost" style={{ marginBottom: '16px' }}>
        ← 목록으로
      </Link>

      <div className="member-detail-header">
        {/* Profile card */}
        <div className="glass-card member-detail-profile">
          <div className="member-detail-avatar">{user.avatar}</div>
          <div className="member-detail-name">{user.name}</div>
          <div className="member-detail-position">{user.position}</div>
          <span
            className="badge"
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              marginBottom: '8px',
            }}
          >
            {roleLabels[user.role]}
          </span>
          {team && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
              🏢 {team.name} · {team.department}
            </p>
          )}
          {mentor && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              🎯 멘토: {mentor.name}
            </p>
          )}

          <div className="member-detail-stats-row" style={{ marginTop: '24px' }}>
            <div className="member-detail-stat">
              <div className="member-detail-stat-value">{userPlans.length}</div>
              <div className="member-detail-stat-label">육성 계획</div>
            </div>
            <div className="member-detail-stat">
              <div className="member-detail-stat-value">{completedPlans}</div>
              <div className="member-detail-stat-label">완료</div>
            </div>
            <div className="member-detail-stat">
              <div className="member-detail-stat-value" style={{ color: 'var(--accent-primary)' }}>
                {avgProgress}%
              </div>
              <div className="member-detail-stat-label">평균 진행률</div>
            </div>
            <div className="member-detail-stat">
              <div className="member-detail-stat-value">{userPosts.length}</div>
              <div className="member-detail-stat-label">게시글</div>
            </div>
          </div>
        </div>

        {/* Training plans */}
        <div className="glass-card member-detail-plans" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 700 }}>
            📋 육성 계획 현황
          </h3>

          {userPlans.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
              육성 계획이 없습니다.
            </div>
          ) : (
            userPlans.map((plan) => (
              <div key={plan.id} className="member-plan-item">
                <div
                  className="member-plan-dot"
                  style={{ background: categoryColors[plan.category] }}
                />
                <div className="member-plan-info">
                  <div className="member-plan-title">{plan.title}</div>
                  <div className="member-plan-sub">
                    <span
                      style={{
                        color: categoryColors[plan.category],
                        fontWeight: 600,
                      }}
                    >
                      {categoryLabels[plan.category]}
                    </span>
                    {' · '}
                    {plan.startDate} ~ {plan.endDate}
                    {' · '}
                    <span style={{ color: statusColors[plan.status] }}>
                      {statusLabels[plan.status]}
                    </span>
                  </div>
                </div>
                <div className="member-plan-progress">
                  <div className="member-plan-progress-value" style={{ color: statusColors[plan.status] }}>
                    {plan.progress}%
                  </div>
                  <div className="progress-bar" style={{ width: '60px', marginTop: '4px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${plan.progress}%`,
                        background: statusColors[plan.status],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent posts by this member */}
      {userPosts.length > 0 && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: 700 }}>
            📝 최근 게시글
          </h3>
          {userPosts.map((post) => (
            <Link
              key={post.id}
              href={`/dashboard/posts/${post.id}`}
              className="member-plan-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ fontSize: '1.1rem' }}>📝</div>
              <div className="member-plan-info">
                <div className="member-plan-title">{post.title}</div>
                <div className="member-plan-sub">
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                    {postTypeLabels[post.postType]}
                  </span>
                  {' · '}
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ❤️ {likes.filter((l) => l.postId === post.id).length}
                {' '}💬 {comments.filter((c) => c.postId === post.id).length}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
