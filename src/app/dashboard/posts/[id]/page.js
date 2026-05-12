'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/lib/DataContext';
import { useAuth } from '@/lib/AuthContext';
import { postTypeLabels } from '@/lib/mockData';
import { useState } from 'react';
import '../posts.css';

export default function PostDetailPage() {
  const params = useParams();
  const { currentUser } = useAuth();
  const { posts, comments, addComment, likes, toggleLike, isLiked, getLikeCount, attachments, getUserById } = useData();
  const [commentText, setCommentText] = useState('');

  const post = posts.find((p) => p.id === params.id);
  if (!post) {
    return (
      <div className="glass-card empty-state">
        <div className="empty-state-icon">❌</div>
        <div className="empty-state-text">게시글을 찾을 수 없습니다.</div>
        <Link href="/dashboard/posts" className="btn btn-primary" style={{ marginTop: '16px' }}>
          목록으로
        </Link>
      </div>
    );
  }

  const author = getUserById(post.authorId);
  const postComments = comments.filter((c) => c.postId === post.id);
  const postAttachments = attachments.filter((a) => a.postId === post.id);
  const likeCount = getLikeCount(post.id);
  const liked = isLiked(post.id, currentUser?.id);

  const rootComments = postComments.filter((c) => !c.parentId);
  const getReplies = (commentId) => postComments.filter((c) => c.parentId === commentId);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment({
        postId: post.id,
        authorId: currentUser?.id,
        content: commentText.trim(),
        parentId: null,
      });
      setCommentText('');
    }
  };

  return (
    <div className="posts-page" style={{ maxWidth: '800px' }}>
      <Link href="/dashboard/posts" className="btn btn-ghost" style={{ marginBottom: '16px' }}>
        ← 목록으로
      </Link>

      <div className="glass-card post-card">
        <div className="post-card-header">
          <div className="avatar avatar-lg">{author?.avatar}</div>
          <div className="post-card-author">
            <div className="post-card-author-name">
              {author?.name}
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                {postTypeLabels[post.postType]}
              </span>
            </div>
            <div className="post-card-author-meta">
              {author?.position} · {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        <h3 className="post-card-title" style={{ fontSize: '1.4rem' }}>{post.title}</h3>
        <div className="post-card-content" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>

        {post.links && post.links.length > 0 && (
          <div className="post-links">
            {post.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="post-link">
                🔗 {link.label}
              </a>
            ))}
          </div>
        )}

        {postAttachments.length > 0 && (
          <div className="post-attachments">
            {postAttachments.map((att) => (
              <div key={att.id} className="post-attachment">
                📄 {att.fileName}
              </div>
            ))}
          </div>
        )}

        <div className="post-actions">
          <button className={`post-action-btn ${liked ? 'liked' : ''}`} onClick={() => toggleLike(post.id, currentUser?.id)}>
            {liked ? '❤️' : '🤍'} {likeCount}
          </button>
          <span className="post-action-btn">💬 {postComments.length}</span>
        </div>

        {/* Full comments */}
        <div className="comments-section">
          <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>💬 댓글 ({postComments.length})</h4>
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
                      <div className="comment-meta"><span>{formatDate(comment.createdAt)}</span></div>
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
                          <div className="comment-meta"><span>{formatDate(reply.createdAt)}</span></div>
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
              onKeyDown={(e) => { if (e.key === 'Enter') handleComment(); }}
            />
            <button className="btn btn-primary btn-sm" onClick={handleComment}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}
