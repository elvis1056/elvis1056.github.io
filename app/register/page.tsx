'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { register } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';

import style from './style';

function RegisterPage({ className }: { className?: string }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 前端驗證
    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密碼至少需要 6 個字元');
      return;
    }

    if (formData.username.length < 3) {
      setError('帳號至少需要 3 個字元');
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName || undefined,
        phoneNumber: formData.phoneNumber || undefined,
      });
      setAuth(response);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '註冊失敗');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="register-card">
        <h1 className="title">註冊</h1>
        <p className="subtitle">加入 5dpapa 會員</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              帳號 <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              placeholder="至少 3 個字元"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              密碼 <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              placeholder="至少 6 個字元"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              確認密碼 <span className="required">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              placeholder="再次輸入密碼"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">姓名（選填）</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="您的姓名"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">電話（選填）</label>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="0912-345-678"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? '註冊中...' : '註冊'}
          </button>
        </form>

        <p className="footer-text">
          已經有帳號了？
          <Link href="/login" className="link">
            立即登入
          </Link>
        </p>
      </div>
    </div>
  );
}

export default styled(RegisterPage)`
  ${style}
`;
