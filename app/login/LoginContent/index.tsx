'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { login, loginWithFacebook, loginWithGoogle } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';

import style from './style';

interface LoginContentProps {
  className?: string;
}

function LoginContent({ className }: LoginContentProps) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(formData);
      setAuth(response);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登入失敗');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="login-card">
        <h1 className="title">登入</h1>
        <p className="subtitle">歡迎回到 5dpapa</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">帳號</label>
            <input
              id="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="請輸入帳號"
              required
              type="text"
              value={formData.username}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="請輸入密碼"
              required
              type="password"
              value={formData.password}
            />
          </div>

          <button className="submit-btn" disabled={isLoading} type="submit">
            {isLoading ? '登入中...' : '登入'}
          </button>
        </form>

        <div className="divider">
          <span>或使用以下方式登入</span>
        </div>

        <div className="oauth-buttons">
          <button
            className="oauth-btn google"
            onClick={loginWithGoogle}
            type="button"
          >
            <span className="oauth-icon">G</span>
            Google 登入
          </button>
          <button
            className="oauth-btn facebook"
            onClick={loginWithFacebook}
            type="button"
          >
            <span className="oauth-icon">f</span>
            Facebook 登入
          </button>
        </div>

        <p className="footer-text">
          還沒有帳號？
          <Link className="link" href="/register">
            立即註冊
          </Link>
        </p>
      </div>
    </div>
  );
}

export default styled(LoginContent)`
  ${style}
`;
