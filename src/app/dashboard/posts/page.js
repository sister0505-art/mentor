'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useData } from '@/lib/DataContext';
import {
  postTypeLabels,
  categoryLabels,
} from '@/lib/mockData';
import './posts.css';

export default function PostsPage() {
  const { currentUser } = useAuth();
  const {
    posts,
    addPost,
    deletePost,
    comments,
    addComment,
    likes,
    toggleLike,
    isLiked,
    getLikeCount,
    attachments,
    trainingPlans,
    users,
    getUserById,
    getTeamById,
  } = useData();
  const [showForm, setShowForm] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedPost, setExpandedPost] = useState(null);

  const types = ['all', 'weekly_report', 'monthly_report', 'mentor_feedback', 'lead_review', 'activity_log', 'general'];

  let filteredPosts = [...posts];
  if (typeFilter !== 'all') {
    filteredPosts = filteredPosts.filter((p) => p.postType === typeFilter);
  }
  filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="posts-page">
      <div className="posts-page-header">
        <h1>📝 활동 기록</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '취소' : '+ 새 게시글'}
        </button>
      </div>

      {/* Filters */}
      <div className="training-filters" style={{ marginBottom: '24px' }}>
        {types.map((t) => (
          <button
            key={t}
            className={`filter-chip ${typeFilter === t ? 'active' : ''}`}
            onClick={() => setTypeFilter(t)}
          >
            {t === 'all' ? '전체' : postTypeLabels[t]}
          </button>
        ))}
      </div>

      {/* New post form */}
      {showForm && (
        <NewPostForm
          currentUser={currentUser}
          trainingPlans={trainingPlans}
          onSubmit={(data) => {
            addPost(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Posts list */}
      <div className="posts-list">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            comments={comments.filter((c) => c.postId === post.id)}
            attachments={attachments.filter((a) => a.postId === post.id)}
            likeCount={getLikeCount(post.id)}
            liked={isLiked(post.id, currentUser?.id)}
            onLike={() => toggleLike(post.id, currentUser?.id)}
            onComment={(content, parentId) =>
              addComment({
                postId: post.id,
                authorId: currentUser?.id,
                content,
                parentId: parentId || null,
              })
            }
            onDelete={() => {
              if (confirm('정말 삭제하시겠습니까?')) deletePost(post.id);
            }}
            expanded={expandedPost === post.id}
            onToggle={() =>
              setExpandedPost(expandedPost === post.id ? null : post.id)
            }
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="glass-card empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">게시글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}

function NewPostForm({ currentUser, trainingPlans, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('activity_log');
  const [trainingPlanId, setTrainingPlanId] = useState('');
  const [links, setLinks] = useState([]);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');

  const handleAddLink = () => {
    if (linkUrl) {
      setLinks([...links, { url: linkUrl, label: linkLabel || linkUrl }]);
      setLinkUrl('');
      setLinkLabel('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      authorId: currentUser.id,
      trainingPlanId: trainingPlanId || null,
      title,
      content,
      postType,
      links,
    });
  };

  return (
    <div className="glass-card post-form-card">
      <form className="post-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">제목</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목"
              required
            />
          </div>
          <div className="form-group" style={{ width: '160px' }}>
            <label className="form-label">유형</label>
            <select
              className="input"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
            >
              {Object.entries(postTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">연관 육성 계획 (선택)</label>
          <select
            className="input"
            value={trainingPlanId}
            onChange={(e) => setTrainingPlanId(e.target.value)}
          >
            <option value="">선택 안함</option>
            {trainingPlans.map((tp) => (
              <option key={tp.id} value={tp.id}>{tp.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">내용</label>
          <textarea
            className="input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="활동 내용을 작성하세요..."
            rows={6}
            required
          />
        </div>

        {/* Link input */}
        <div className="form-group">
          <label className="form-label">🔗 링크 첨부</label>
          <div className="link-input-row">
            <input
              className="input"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="URL 입력"
              style={{ flex: 2 }}
            />
            <input
              className="input"
              value={linkLabel}
              onChange={(e) => setLinkLabel(e.target.value)}
              placeholder="링크 이름 (선택)"
              style={{ flex: 1 }}
            />
            <button type="button" className="btn btn-secondary" onClick={handleAddLink}>
              추가
            </button>
          </div>
          {links.length > 0 && (
            <div className="link-list">
              {links.map((link, i) => (
                <span key={i} className="link-tag">
                  🔗 {link.label}
                  <button type="button" onClick={() => setLinks(links.filter((_, j) => j !== i))}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* File upload placeholder */}
        <div className="form-group">
          <label className="form-label">📎 파일 첨부</label>
          <div
            style={{
              padding: '20px',
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            파일을 드래그하거나 클릭하여 업로드<br />
            <span style={{ fontSize: '0.75rem' }}>(Supabase 연동 후 활성화)</span>
          </div>
        </div>

        <div className="post-form-actions">
          <div />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              게시하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function PostCard({
  post,
  currentUser,
  comments,
  attachments,
  likeCount,
  liked,
  onLike,
  onComment,
  onDelete,
  expanded,
  onToggle,
}) {
  const author = getUserById(post.authorId);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const rootComments = comments.filter((c) => !c.parentId);
  const getReplies = (commentId) => comments.filter((c) => c.parentId === commentId);

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(commentText.trim());
      setCommentText('');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="glass-card post-card">
      <div className="post-card-header">
        <div className="avatar">{author?.avatar}</div>
        <div className="post-card-author">
          <div className="post-card-author-name">
            {author?.name}
            <span
              className="badge"
              style={{
                fontSize: '0.65rem',
                padding: '2px 8px',
                background: 'rgba(99, 102, 241, 0.1)',
                color: '#818cf8',
              }}
            >
              {postTypeLabels[post.postType]}
            </span>
          </div>
          <div className="post-card-author-meta">
            {author?.position} · {formatDate(post.createdAt)}
          </div>
        </div>
        {(currentUser?.id === post.authorId || currentUser?.role === 'admin') && (
          <button className="btn btn-ghost btn-sm" onClick={onDelete}>
            🗑️
          </button>
        )}
      </div>

      <h3 className="post-card-title">{post.title}</h3>

      <div className={`post-card-content ${!expanded ? 'truncated' : ''}`}>
        {post.content}
      </div>

      {post.content.length > 200 && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={onToggle}
          style={{ marginBottom: '12px', color: 'var(--accent-primary)' }}
        >
          {expanded ? '접기' : '더 보기'}
        </button>
      )}

      {/* Links */}
      {post.links && post.links.length > 0 && (
        <div className="post-links">
          {post.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="post-link"
            >
              🔗 {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="post-attachments">
          {attachments.map((att) => (
            <div key={att.id} className="post-attachment">
              📄 {att.fileName}
              <span className="post-attachment-size">
                ({formatFileSize(att.fileSize)})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="post-actions">
        <button
          className={`post-action-btn ${liked ? 'liked' : ''}`}
          onClick={onLike}
        >
          {liked ? '❤️' : '🤍'} {likeCount}
        </button>
        <button
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {comments.length}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {rootComments.map((comment) => {
              const cAuthor = getUserById(comment.authorId);
              const replies = getReplies(comment.id);
              return (
                <div key={comment.id}>
                  <div className="comment-item">
                    <div className="avatar avatar-sm">{cAuthor?.avatar}</div>
                    <div className="comment-content">
                      <div className="comment-author">{cAuthor?.name}</div>
                      <div className="comment-text">{comment.content}</div>
                      <div className="comment-meta">
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {replies.map((reply) => {
                    const rAuthor = getUserById(reply.authorId);
                    return (
                      <div key={reply.id} className="comment-item reply">
                        <div className="avatar avatar-sm">{rAuthor?.avatar}</div>
                        <div className="comment-content">
                          <div className="comment-author">{rAuthor?.name}</div>
                          <div className="comment-text">{reply.content}</div>
                          <div className="comment-meta">
                            <span>{formatDate(reply.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="comment-input-row">
            <div className="avatar avatar-sm">{currentUser?.avatar}</div>
            <input
              className="input"
              placeholder="댓글을 입력하세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleComment();
              }}
            />
            <button className="btn btn-primary btn-sm" onClick={handleComment}>
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
