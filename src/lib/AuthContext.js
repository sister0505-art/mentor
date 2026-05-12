'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시로 브라우저에 저장된 세션 복구
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
        
      if (error || !data) {
        console.error("Login Error:", error);
        return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
      }
      
      const { password: _, ...safeUser } = data;
      setCurrentUser(safeUser);
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const switchDemoRole = async (role) => {
    // 각 역할의 대표 사용자 한 명을 가져와서 로그인 처리 (데모용)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .limit(1)
      .single();
      
    if (data && !error) {
       const { password: _, ...safeUser } = data;
       setCurrentUser(safeUser);
       localStorage.setItem('currentUser', JSON.stringify(safeUser));
       return true;
    }
    return false;
  };

  const isAdmin = currentUser?.role === 'admin';
  const isTeamLead = currentUser?.role === 'team_lead';
  const isMentor = currentUser?.role === 'mentor';
  const isTrainee = currentUser?.role === 'trainee';

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, loading, isAdmin, isTeamLead, isMentor, isTrainee, switchDemoRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
