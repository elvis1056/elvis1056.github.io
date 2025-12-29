'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

const mockCategories = [
  { title: '生日派對', subtitle: '100+ 商品' },
  { title: '婚禮佈置', subtitle: '80+ 商品' },
  { title: '開幕活動', subtitle: '50+ 商品' },
  { title: '節慶裝飾', subtitle: '120+ 商品' },
  { title: '週年慶', subtitle: '60+ 商品' },
  { title: '寶寶派對', subtitle: '45+ 商品' },
  { title: '求婚佈置', subtitle: '30+ 商品' },
  { title: '畢業典禮', subtitle: '40+ 商品' },
];

interface PillContentProps {
  className?: string;
}

function PillContent({ className }: PillContentProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const toggleItem = (title: string) => {
    setSelectedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const displayItems = expanded ? mockCategories : mockCategories.slice(0, 4);

  return (
    <div className={className}>
      <h1 className="page-title">Pill Filter Demo</h1>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">活動類型</h2>
          <div className="section-subtitle">選擇您需要的活動類型</div>
        </div>

        <div className={`rows ${!expanded ? 'collapse' : ''}`}>
          {displayItems.map((item, index) => (
            <div className="row-wrapper" key={index}>
              <img
                alt="checkbox"
                className="checkbox"
                onClick={() => toggleItem(item.title)}
                src={assetPath(
                  selectedItems.includes(item.title)
                    ? '/icons/checkbox-checked.svg'
                    : '/icons/checkbox-unchecked.svg'
                )}
              />
              <div
                className={`row ${selectedItems.includes(item.title) ? 'selected' : ''}`}
                onClick={() => toggleItem(item.title)}
              >
                <div className="item-title">{item.title}</div>
                <div className="item-subtitle">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        {mockCategories.length > 4 && (
          <div className="show-more" onClick={() => setExpanded(!expanded)}>
            <span className="text">{expanded ? '收合' : '看更多'}</span>
            <span className={`chevron-icon ${expanded ? 'expanded' : ''}`}>
              ›
            </span>
          </div>
        )}
      </section>

      <div className="selected-info">
        已選擇: {selectedItems.length > 0 ? selectedItems.join(', ') : '無'}
      </div>
    </div>
  );
}

PillContent.displayName = 'PillContent';

export default styled(PillContent)`
  ${style}
`;
