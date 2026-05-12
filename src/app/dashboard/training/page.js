'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useData } from '@/lib/DataContext';
  categoryLabels,
  categoryColors,
  statusLabels,
  statusColors,
} from '@/lib/mockData';
import './training.css';

const categories = ['all', 'education', 'mentoring', 'team_work', 'external', 'adaptation'];
const statuses = ['all', 'planned', 'in_progress', 'completed', 'delayed'];

export default function TrainingPage() {
  const { currentUser } = useAuth();
  const { trainingPlans, addTrainingPlan, updateTrainingPlan, deleteTrainingPlan, users, getUserById } = useData();
  const [catFilter, setCatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('card');
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  // Filter
  let filtered = [...trainingPlans];
  if (catFilter !== 'all') filtered = filtered.filter((tp) => tp.category === catFilter);
  if (statusFilter !== 'all') filtered = filtered.filter((tp) => tp.status === statusFilter);

  // Sort by start date
  filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteTrainingPlan(id);
    }
  };

  return (
    <div className="training-page">
      <div className="training-page-header">
        <h1>📋 육성 계획</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              카드
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'gantt' ? 'active' : ''}`}
              onClick={() => setViewMode('gantt')}
            >
              타임라인
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditPlan(null); setShowForm(true); }}>
            + 새 계획
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>카테고리</div>
          <div className="training-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${catFilter === cat ? 'active' : ''}`}
                onClick={() => setCatFilter(cat)}
              >
                {cat === 'all' ? '전체' : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>상태</div>
          <div className="training-filters">
            {statuses.map((s) => (
              <button
                key={s}
                className={`filter-chip ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'all' ? '전체' : statusLabels[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="training-grid">
          {filtered.map((plan) => {
            const trainee = getUserById(plan.traineeId);
            const author = getUserById(plan.authorId);
            return (
              <div
                key={plan.id}
                className="glass-card training-card"
                style={{ '--cat-color': categoryColors[plan.category] }}
                onClick={() => handleEdit(plan)}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: categoryColors[plan.category],
                  }}
                />
                <div className="training-card-header">
                  <div className="training-card-title">{plan.title}</div>
                  <div className="training-card-badges">
                    <span
                      className="badge"
                      style={{
                        background: `${categoryColors[plan.category]}22`,
                        color: categoryColors[plan.category],
                      }}
                    >
                      {categoryLabels[plan.category]}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background: `${statusColors[plan.status]}22`,
                        color: statusColors[plan.status],
                      }}
                    >
                      {statusLabels[plan.status]}
                    </span>
                  </div>
                </div>

                <div className="training-card-desc">{plan.description}</div>

                <div className="training-card-meta">
                  <span>📅 {plan.startDate} ~ {plan.endDate}</span>
                </div>

                <div className="training-card-footer">
                  <div className="training-card-people">
                    <div className="training-card-person">
                      <span>{trainee?.avatar}</span>
                      {trainee?.name}
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>←</span>
                    <div className="training-card-person">
                      <span>{author?.avatar}</span>
                      {author?.name}
                    </div>
                  </div>
                  <div className="training-progress-info">
                    <div className="progress-bar" style={{ width: '60px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${plan.progress}%`,
                          background: statusColors[plan.status],
                        }}
                      />
                    </div>
                    <span className="training-progress-text">{plan.progress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gantt/Timeline View */}
      {viewMode === 'gantt' && (
        <div className="glass-card" style={{ padding: '20px' }}>
          <div className="gantt-view">
            <table className="gantt-table">
              <thead>
                <tr>
                  <th style={{ width: '200px' }}>계획명</th>
                  <th style={{ width: '80px' }}>대상자</th>
                  <th style={{ width: '80px' }}>카테고리</th>
                  <th style={{ width: '60px' }}>상태</th>
                  <th style={{ width: '60px' }}>진행률</th>
                  <th>기간 (6월 ~ 12월)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((plan) => {
                  const trainee = getUserById(plan.traineeId);
                  const start = new Date(plan.startDate);
                  const end = new Date(plan.endDate);
                  const ganttStart = new Date('2026-06-15');
                  const ganttEnd = new Date('2026-12-31');
                  const totalDays = (ganttEnd - ganttStart) / (1000 * 60 * 60 * 24);
                  const leftPct = Math.max(0, ((start - ganttStart) / (1000 * 60 * 60 * 24)) / totalDays * 100);
                  const widthPct = Math.min(100 - leftPct, ((end - start) / (1000 * 60 * 60 * 24)) / totalDays * 100);

                  return (
                    <tr key={plan.id}>
                      <td style={{ fontWeight: 600 }}>{plan.title}</td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {trainee?.avatar} {trainee?.name}
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: `${categoryColors[plan.category]}22`,
                            color: categoryColors[plan.category],
                          }}
                        >
                          {categoryLabels[plan.category]}
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: `${statusColors[plan.status]}22`,
                            color: statusColors[plan.status],
                          }}
                        >
                          {statusLabels[plan.status]}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{plan.progress}%</td>
                      <td className="gantt-bar-cell">
                        <div
                          className="gantt-bar"
                          style={{
                            marginLeft: `${leftPct}%`,
                            width: `${Math.max(widthPct, 3)}%`,
                            background: `${categoryColors[plan.category]}33`,
                          }}
                        >
                          <div
                            className="gantt-bar-fill"
                            style={{
                              width: `${plan.progress}%`,
                              background: categoryColors[plan.category],
                            }}
                          />
                          <span className="gantt-bar-text">{plan.title}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="glass-card empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-text">해당 조건의 육성 계획이 없습니다.</div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <TrainingFormModal
          plan={editPlan}
          onClose={() => { setShowForm(false); setEditPlan(null); }}
          onSave={(data) => {
            if (editPlan) {
              updateTrainingPlan(editPlan.id, data);
            } else {
              addTrainingPlan(data);
            }
            setShowForm(false);
            setEditPlan(null);
          }}
          onDelete={editPlan ? () => { handleDelete(editPlan.id); setShowForm(false); setEditPlan(null); } : null}
        />
      )}
    </div>
  );
}

function TrainingFormModal({ plan, onClose, onSave, onDelete }) {
  const trainees = users.filter((u) => u.role === 'trainee');
  const [form, setForm] = useState({
    traineeId: plan?.traineeId || trainees[0]?.id || '',
    authorId: plan?.authorId || '',
    title: plan?.title || '',
    category: plan?.category || 'education',
    description: plan?.description || '',
    startDate: plan?.startDate || '2026-06-15',
    endDate: plan?.endDate || '2026-07-15',
    status: plan?.status || 'planned',
    progress: plan?.progress || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '24px' }}>
          {plan ? '✏️ 육성 계획 수정' : '➕ 새 육성 계획'}
        </h2>
        <form className="training-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">제목</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="육성 계획 제목"
              required
            />
          </div>

          <div className="training-form-row">
            <div className="form-group">
              <label className="form-label">대상 사원</label>
              <select
                className="input"
                value={form.traineeId}
                onChange={(e) => setForm({ ...form, traineeId: e.target.value })}
              >
                {trainees.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.position})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">카테고리</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">설명</label>
            <textarea
              className="input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="육성 계획에 대한 상세 설명"
            />
          </div>

          <div className="training-form-row">
            <div className="form-group">
              <label className="form-label">시작일</label>
              <input
                type="date"
                className="input"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">종료일</label>
              <input
                type="date"
                className="input"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="training-form-row">
            <div className="form-group">
              <label className="form-label">상태</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">진행률 ({form.progress}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value) })}
                style={{ width: '100%', marginTop: '8px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            {onDelete && (
              <button type="button" className="btn btn-danger" onClick={onDelete}>
                삭제
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              {plan ? '수정' : '생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
