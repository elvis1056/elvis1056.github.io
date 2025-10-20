'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/authStore';

import Clock from '../Clock';
import { Logo } from '../Logo';

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
    { href: '/shop', label: '商城' },
    { href: '/blog', label: '部落格' },
  ];

  const handleLogout = () => {
    clearAuth();
    router.push('/');
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

  return (
    <header className={className}>
      <div className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <Link href="/" className="logo-link">
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
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="auth-section">
              {mounted && (
                <>
                  {user ? (
                    <>
                      <span className="user-name">{user.username}</span>
                      <button onClick={handleLogout} className="logout-btn">
                        登出
                      </button>
                    </>
                  ) : (
                    <Link href="/login" className="auth-link">
                      登入/註冊
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
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="切換選單"
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
                        href={link.href}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
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
                          <span className="mobile-user-name">{user.username}</span>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="mobile-logout-btn"
                        >
                          登出
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="mobile-auth-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        登入/註冊
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
