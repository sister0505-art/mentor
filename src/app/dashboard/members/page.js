'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useData } from '@/lib/DataContext';
import { roleLabels } from '@/lib/mockData';
import { useState } from 'react';
import './members.css';

const roleColors = {
  admin: '#f59e0b',
  team_lead: '#0ea5e9',
  mentor: '#8b5cf6',
  trainee: '#10b981',
};

export default function MembersPage() {
  const { currentUser } = useAuth();
  const { trainingPlans, posts, users, getUserById, getTeamById } = useData();
  const [roleFilter, setRoleFilter] = useState('all');

  const roles = ['all', 'trainee', 'mentor', 'team_lead', 'admin'];

  let filteredUsers = [...users];
  
  // 1. 역할(권한)에 따른 데이터 필터링
  if (currentUser?.role === 'team_lead') {
    // 팀장은 본인과 같은 팀 소속만 볼 수 있음
    filteredUsers = filteredUsers.filter((u) => u.teamId === currentUser.teamId || u.id === currentUser.id);
  } else if (currentUser?.role === 'mentor') {
    // 멘토는 본인과 담당 멘티만 볼 수 있음
    filteredUsers = filteredUsers.filter((u) => u.mentorId === currentUser.id || u.id === currentUser.id);
  } else if (currentUser?.role === 'trainee') {
    // 공채 사원은 일단 본인 정보만 볼 수 있음 (필요시 같은 팀원까지 확대 가능)
    filteredUsers = filteredUsers.filter((u) => u.id === currentUser.id);
  }
  // admin은 모든 데이터를 볼 수 있으므로 필터링 패스

  // 2. 화면 상단의 탭 필터링 (전체, 공채, 멘토 등)
  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter((u) => u.role === roleFilter);
  }

  // Sort: trainees first, then mentors, team_leads, admins
  const roleOrder = { trainee: 0, mentor: 1, team_lead: 2, admin: 3 };
  filteredUsers.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

  return (
    <div className="members-page">
      <div className="members-page-header">
        <h1>👥 팀원 관리</h1>
      </div>

      {/* Role filter */}
      <div className="training-filters" style={{ marginBottom: '24px' }}>
        {roles.map((r) => (
          <button
            key={r}
            className={`filter-chip ${roleFilter === r ? 'active' : ''}`}
            onClick={() => setRoleFilter(r)}
          >
            {r === 'all' ? '전체' : roleLabels[r]}
          </button>
        ))}
      </div>

      <div className="members-grid">
        {filteredUsers.map((user) => {
          const team = getTeamById(user.teamId);
          const mentor = getUserById(user.mentorId);
          const userPlans = trainingPlans.filter((tp) => tp.traineeId === user.id);
          const userPosts = posts.filter((p) => p.authorId === user.id);
          const avgProgress = userPlans.length
            ? Math.round(userPlans.reduce((s, p) => s + p.progress, 0) / userPlans.length)
            : 0;

          return (
            <Link
              key={user.id}
              href={`/dashboard/members/${user.id}`}
              className="glass-card member-card"
            >
              <div className="member-card-top">
                <div className="avatar avatar-lg">{user.avatar}</div>
                <div className="member-card-info">
                  <h3>
                    {user.name}
                    <span
                      className="member-card-team"
                      style={{
                        background: `${roleColors[user.role]}22`,
                        color: roleColors[user.role],
                        marginLeft: '8px',
                      }}
                    >
                      {roleLabels[user.role]}
                    </span>
                  </h3>
                  <p>{user.position}</p>
                  {team && <p style={{ color: 'var(--text-secondary)' }}>{team.name}</p>}
                </div>
              </div>

              {user.role === 'trainee' && (
                <>
                  <div className="member-card-stats">
                    <div className="member-stat">
                      <div className="member-stat-value">{userPlans.length}</div>
                      <div className="member-stat-label">육성 계획</div>
                    </div>
                    <div className="member-stat">
                      <div className="member-stat-value">{userPosts.length}</div>
                      <div className="member-stat-label">게시글</div>
                    </div>
                    <div className="member-stat">
                      <div className="member-stat-value" style={{ color: avgProgress >= 70 ? 'var(--success)' : 'var(--accent-primary)' }}>
                        {avgProgress}%
                      </div>
                      <div className="member-stat-label">진행률</div>
                    </div>
                  </div>

                  <div className="progress-bar" style={{ marginBottom: '12px' }}>
                    <div className="progress-bar-fill" style={{ width: `${avgProgress}%` }} />
                  </div>

                  {mentor && (
                    <div className="member-card-mentor">
                      <span>{mentor.avatar}</span>
                      멘토: {mentor.name}
                    </div>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
