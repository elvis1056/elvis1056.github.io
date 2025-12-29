'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CartButton from '@/components/CartButton';
import Clock from '@/components/Clock';
import { Logo } from '@/components/Logo';
import { logout as logoutApi } from '@/lib/api/auth';
import { csrfManager } from '@/lib/security/csrfManager';
import { useAuthStore } from '@/stores/authStore';

import style from './style';

function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: '首頁' },
    { href: '/about', label: '關於我' },
    { href: '/shop', label: '商城' },
    { href: '/blog', label: '部落格' },
  ];

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearAuth();
      csrfManager.clearToken();
      router.push('/');
    }
  };

  // 禁止背景滾動
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // 隱藏 404 頁面的 Navbar
  if (pathname === '/not-found') {
    return null;
  }

  return (
    <header className={className}>
      <div className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <Link className="logo-link" href="/">
            <Logo />
            <span className="logo-text">5dpapa</span>
          </Link>

          <div className="nav-right">
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* 購物車按鈕 */}
            <CartButton />

            <div className="auth-section">
              {mounted && (
                <>
                  {user ? (
                    <>
                      <span className="user-name">{user.username}</span>
                      <button className="logout-btn" onClick={logout}>
                        登出
                      </button>
                    </>
                  ) : (
                    <Link className="auth-link" href="/login">
                      登入
                    </Link>
                  )}
                </>
              )}
            </div>

            <div className="nav-clock">
              <Clock />
            </div>
          </div>

          <button
            aria-label="切換選單"
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {isMobileMenuOpen && (
          <>
            <div
              className="mobile-menu-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="mobile-menu">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mobile-auth-section">
                {mounted && (
                  <>
                    {user ? (
                      <>
                        <div className="mobile-user-info">
                          <span className="mobile-user-name">
                            {user.username}
                          </span>
                        </div>
                        <button
                          className="mobile-logout-btn"
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          登出
                        </button>
                      </>
                    ) : (
                      <Link
                        className="mobile-auth-link"
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        登入
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default styled(Navbar)`
  ${style}
`;
