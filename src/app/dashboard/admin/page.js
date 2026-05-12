'use client';
import { useState } from 'react';
import { useData } from '@/lib/DataContext';
import { useAuth } from '@/lib/AuthContext';
import { roleLabels } from '@/lib/mockData';

export default function AdminPage() {
  const { currentUser } = useAuth();
  const { users, teams, updateUser, addUser } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Security check: Only admins should see this page
  if (currentUser?.role !== 'admin') {
    return (
      <div className="glass-card empty-state">
        <h2>접근 권한이 없습니다.</h2>
        <p>이 페이지는 관리자만 접근할 수 있습니다.</p>
      </div>
    );
  }

  // Filter users
  let filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.role === roleFilter);
  }

  // Handle Edit Save
  const handleEditSave = async (id, email, password, name, role, position) => {
    const updates = { email, password, name, role, position };
    const res = await updateUser(id, updates);
    if (res.success) {
      alert('성공적으로 수정되었습니다.');
      setShowEditModal(false);
    } else {
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  // Handle Add Save
  const handleAddSave = async (userData) => {
    const res = await addUser(userData);
    if (res.success) {
      alert('새로운 직원이 추가되었습니다.');
      setShowAddModal(false);
    } else {
      alert('추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>👑 계정 관리</h1>
          <p style={{ color: 'var(--text-tertiary)', marginTop: '4px' }}>직원들의 이메일과 비밀번호를 설정할 수 있습니다.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + 새 직원 추가
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <input 
            type="text" 
            className="input" 
            placeholder="이름 또는 이메일 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, maxWidth: '300px' }}
          />
          <select 
            className="input" 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="all">모든 역할</option>
            <option value="trainee">공채 사원</option>
            <option value="mentor">멘토</option>
            <option value="team_lead">팀장</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-tertiary)' }}>
                <th style={{ padding: '12px' }}>이름</th>
                <th style={{ padding: '12px' }}>소속 팀</th>
                <th style={{ padding: '12px' }}>역할</th>
                <th style={{ padding: '12px' }}>로그인 이메일</th>
                <th style={{ padding: '12px' }}>비밀번호</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => {
                const team = teams.find(t => t.id === u.team_id);
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="avatar avatar-sm">{u.avatar}</span>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{team?.name || '-'}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        {roleLabels[u.role]}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{u.email || '-'}</td>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>
                      {u.password ? '••••••••' : '(미설정)'}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => { setEditingUser(u); setShowEditModal(true); }}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => { setShowEditModal(false); setEditingUser(null); }}
          onSave={handleEditSave}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddUserModal 
          teams={teams}
          users={users}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}
    </div>
  );
}

function EditUserModal({ user, onClose, onSave }) {
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState(user.password || '');
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState(user.role || 'trainee');
  const [position, setPosition] = useState(user.position || '');

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <h2 style={{ marginBottom: '24px' }}>✏️ 계정 정보 수정</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">이름</label>
            <input 
              type="text" 
              className="input" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">역할</label>
            <select className="input" value={role} onChange={e => setRole(e.target.value)}>
              <option value="trainee">공채 사원</option>
              <option value="mentor">멘토</option>
              <option value="team_lead">팀장</option>
              <option value="admin">관리자</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">직급 (예: 연구원)</label>
            <input 
              type="text" 
              className="input" 
              value={position} 
              onChange={e => setPosition(e.target.value)} 
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <label className="form-label">로그인 이메일</label>
            <input 
              type="email" 
              className="input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="example@rnd.com"
            />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">비밀번호</label>
            <input 
              type="text" 
              className="input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="초기 비밀번호 입력"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button className="btn btn-primary" onClick={() => onSave(user.id, email, password, name, role, position)}>저장하기</button>
        </div>
      </div>
    </div>
  );
}

function AddUserModal({ teams, users, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    role: 'trainee',
    position: '연구원',
    email: '',
    password: '',
    avatar: '👤',
    teamId: '',
    mentorId: ''
  });

  const mentors = users.filter(u => u.role === 'mentor');

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <h2 style={{ marginBottom: '24px' }}>➕ 새 직원 추가</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">이름 *</label>
            <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">역할 *</label>
            <select className="input" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
              <option value="trainee">공채 사원</option>
              <option value="mentor">멘토</option>
              <option value="team_lead">팀장</option>
              <option value="admin">관리자</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">직급 (예: 연구원, 팀장)</label>
            <input className="input" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">아바타 (이모지)</label>
            <input className="input" value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} />
          </div>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">소속 팀 (선택)</label>
            <select className="input" value={form.teamId} onChange={e => setForm({...form, teamId: e.target.value})}>
              <option value="">없음</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {form.role === 'trainee' && (
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">담당 멘토 (공채 사원일 경우)</label>
              <select className="input" value={form.mentorId} onChange={e => setForm({...form, mentorId: e.target.value})}>
                <option value="">없음</option>
                {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          )}

          <div className="form-group" style={{ gridColumn: '1 / -1', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <label className="form-label">초기 이메일 *</label>
            <input className="input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">초기 비밀번호 *</label>
            <input className="input" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button 
            className="btn btn-primary" 
            onClick={() => onSave(form)}
            disabled={!form.name || !form.email || !form.password}
          >
            계정 생성
          </button>
        </div>
      </div>
    </div>
  );
}
