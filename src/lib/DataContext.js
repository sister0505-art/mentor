'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        { data: usersData },
        { data: teamsData },
        { data: postsData },
        { data: commentsData },
        { data: likesData },
        { data: plansData },
        { data: attData },
      ] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('teams').select('*'),
        supabase.from('posts').select('*').order('created_at', { ascending: false }),
        supabase.from('comments').select('*').order('created_at', { ascending: true }),
        supabase.from('likes').select('*'),
        supabase.from('training_plans').select('*').order('start_date', { ascending: true }),
        supabase.from('attachments').select('*'),
      ]);

      setUsers(usersData || []);
      setTeams(teamsData || []);
      
      // Convert snake_case to camelCase for frontend consistency
      setPosts((postsData || []).map(p => ({
        ...p,
        authorId: p.author_id,
        trainingPlanId: p.training_plan_id,
        postType: p.post_type,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      })));
      
      setComments((commentsData || []).map(c => ({
        ...c,
        postId: c.post_id,
        authorId: c.author_id,
        parentId: c.parent_id,
        createdAt: c.created_at
      })));
      
      setLikes((likesData || []).map(l => ({
        ...l,
        postId: l.post_id,
        userId: l.user_id,
        createdAt: l.created_at
      })));
      
      setTrainingPlans((plansData || []).map(tp => ({
        ...tp,
        traineeId: tp.trainee_id,
        authorId: tp.author_id,
        startDate: tp.start_date,
        endDate: tp.end_date,
        createdAt: tp.created_at
      })));
      
      setAttachments((attData || []).map(a => ({
        ...a,
        postId: a.post_id,
        fileName: a.file_name,
        fileUrl: a.file_url,
        fileType: a.file_type,
        fileSize: a.file_size,
        uploadedBy: a.uploaded_by,
        createdAt: a.created_at
      })));

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper Functions (moved from mockData)
  const getUserById = (id) => users.find((u) => u.id === id);
  const getTeamById = (id) => teams.find((t) => t.id === id);
  const getUsersByTeam = (teamId) => users.filter((u) => u.team_id === teamId);
  const getTrainees = () => users.filter((u) => u.role === 'trainee');

  // User Management
  const updateUser = async (id, updates) => {
    // Only email and password usually, but can be anything
    const { error } = await supabase.from('profiles').update(updates).eq('id', id);
    if (!error) fetchData();
    return { success: !error };
  };

  const addUser = async (userData) => {
    // Generate UUID if not provided by Supabase automatically
    // But since Supabase handles default uuid for id, we just insert.
    // Make sure teamId -> team_id, mentorId -> mentor_id mappings
    const dbData = {
      ...userData,
      team_id: userData.teamId || null,
      mentor_id: userData.mentorId || null,
    };
    delete dbData.teamId;
    delete dbData.mentorId;
    
    const { data, error } = await supabase.from('profiles').insert(dbData).select().single();
    if (!error) fetchData();
    return { success: !error, data, error };
  };

  // Posts
  const addPost = async (post) => {
    const newPostData = {
      author_id: post.authorId,
      training_plan_id: post.trainingPlanId || null,
      title: post.title,
      content: post.content,
      post_type: post.postType || 'general',
      links: post.links || [],
    };
    
    const { data, error } = await supabase.from('posts').insert(newPostData).select().single();
    if (!error && data) {
       fetchData(); // Reload for simplicity, or optimistically append
       return { ...data, authorId: data.author_id, trainingPlanId: data.training_plan_id, postType: data.post_type, createdAt: data.created_at };
    }
    return null;
  };

  const updatePost = async (id, updates) => {
    const { error } = await supabase.from('posts').update(updates).eq('id', id);
    if (!error) fetchData();
  };

  const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) fetchData();
  };

  // Comments
  const addComment = async (comment) => {
    const newCommentData = {
      post_id: comment.postId,
      author_id: comment.authorId,
      content: comment.content,
      parent_id: comment.parentId || null
    };
    const { data, error } = await supabase.from('comments').insert(newCommentData).select().single();
    if (!error && data) fetchData();
    return data;
  };

  const deleteComment = async (id) => {
    await supabase.from('comments').delete().eq('id', id);
    fetchData();
  };

  // Likes
  const toggleLike = async (postId, userId) => {
    const existing = likes.find((l) => l.postId === postId && l.userId === userId);
    if (existing) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: userId });
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: userId });
    }
    fetchData();
  };

  const isLiked = (postId, userId) => likes.some((l) => l.postId === postId && l.userId === userId);
  const getLikeCount = (postId) => likes.filter((l) => l.postId === postId).length;

  // Training Plans
  const addTrainingPlan = async (plan) => {
    const newPlanData = {
      trainee_id: plan.traineeId,
      author_id: plan.authorId,
      title: plan.title,
      category: plan.category,
      description: plan.description,
      start_date: plan.startDate,
      end_date: plan.endDate,
      status: plan.status || 'planned',
      progress: plan.progress || 0
    };
    const { data, error } = await supabase.from('training_plans').insert(newPlanData).select().single();
    if (!error) fetchData();
    return data;
  };

  const updateTrainingPlan = async (id, updates) => {
    const { error } = await supabase.from('training_plans').update(updates).eq('id', id);
    if (!error) fetchData();
  };

  const deleteTrainingPlan = async (id) => {
    const { error } = await supabase.from('training_plans').delete().eq('id', id);
    if (!error) fetchData();
  };

  // Attachments
  const addAttachment = async (attachment) => {
    const newAttData = {
      post_id: attachment.postId,
      file_name: attachment.fileName,
      file_url: attachment.fileUrl,
      file_type: attachment.fileType,
      file_size: attachment.fileSize,
      uploaded_by: attachment.uploadedBy
    };
    const { data, error } = await supabase.from('attachments').insert(newAttData).select().single();
    if (!error) fetchData();
    return data;
  };

  return (
    <DataContext.Provider
      value={{
        users,
        teams,
        getUserById,
        getTeamById,
        getUsersByTeam,
        getTrainees,
        posts,
        addPost,
        updatePost,
        deletePost,
        comments,
        addComment,
        deleteComment,
        likes,
        toggleLike,
        isLiked,
        getLikeCount,
        trainingPlans,
        addTrainingPlan,
        updateTrainingPlan,
        deleteTrainingPlan,
        attachments,
        addAttachment,
        updateUser,
        addUser,
        loading,
        refreshData: fetchData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
