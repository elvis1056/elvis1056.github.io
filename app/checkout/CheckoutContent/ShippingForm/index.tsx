'use client';

import type { DebouncedFunc } from 'lodash';
import { useState } from 'react';
import styled from 'styled-components';

import type { Address, DeliveryTimeSlot } from '@/types';

import style from './style';

interface ShippingData {
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  deliveryTimeSlot: DeliveryTimeSlot;
  selectedAddressId: number | null;
  saveAddress: boolean;
  setAsDefaultAddress: boolean;
}

interface ShippingFormProps {
  className?: string;
  shippingData: ShippingData;
  onFieldChange: DebouncedFunc<
    (field: keyof ShippingData, value: string | number | boolean | null) => void
  >;
}

function ShippingForm({
  className,
  shippingData,
  onFieldChange,
}: ShippingFormProps) {
  // TODO: 未來從 API 載入會員常用地址
  const [savedAddresses] = useState<Address[]>([]);

  // 選擇常用地址
  const selectAddress = (addressId: number | null) => {
    if (addressId === null) {
      // 清空表單
      onFieldChange('selectedAddressId', null);
      onFieldChange('recipientName', '');
      onFieldChange('recipientPhone', '');
      onFieldChange('city', '');
      onFieldChange('district', '');
      onFieldChange('postalCode', '');
      onFieldChange('addressLine', '');
      return;
    }

    const address = savedAddresses.find((a) => a.id === addressId);
    if (!address) return;

    // 填入地址資料
    onFieldChange('selectedAddressId', addressId);
    onFieldChange('recipientName', address.recipientName);
    onFieldChange('recipientPhone', address.recipientPhone);
    onFieldChange('city', address.city);
    onFieldChange('district', address.district);
    onFieldChange('postalCode', address.postalCode);
    onFieldChange('addressLine', address.addressLine);
  };

  return (
    <div className={className}>
      <h2 className="section-title">收件資訊</h2>

      {/* 常用地址選擇（未來啟用） */}
      {savedAddresses.length > 0 && (
        <div className="form-group">
          <label className="form-label" htmlFor="savedAddress">
            選擇常用地址
          </label>
          <select
            className="form-select"
            id="savedAddress"
            onChange={(e) =>
              selectAddress(e.target.value ? Number(e.target.value) : null)
            }
            value={shippingData.selectedAddressId || ''}
          >
            <option value="">手動填寫新地址</option>
            {savedAddresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.recipientName} - {addr.city}
                {addr.district}
                {addr.addressLine}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 基本資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="recipientName">
            收件人姓名 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="recipientName"
            onChange={(e) => onFieldChange('recipientName', e.target.value)}
            placeholder="請輸入收件人姓名"
            required
            type="text"
            value={shippingData.recipientName}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="recipientPhone">
            聯絡電話 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="recipientPhone"
            onChange={(e) => onFieldChange('recipientPhone', e.target.value)}
            placeholder="0912-345-678"
            required
            type="tel"
            value={shippingData.recipientPhone}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="recipientEmail">
          Email <span className="required">*</span>
        </label>
        <input
          className="form-input"
          id="recipientEmail"
          onChange={(e) => onFieldChange('recipientEmail', e.target.value)}
          placeholder="example@email.com"
          required
          type="email"
          value={shippingData.recipientEmail}
        />
      </div>

      {/* 地址資訊 */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="city">
            縣市 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="city"
            onChange={(e) => onFieldChange('city', e.target.value)}
            placeholder="台北市"
            required
            type="text"
            value={shippingData.city}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="district">
            鄉鎮市區 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="district"
            onChange={(e) => onFieldChange('district', e.target.value)}
            placeholder="信義區"
            required
            type="text"
            value={shippingData.district}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="postalCode">
            郵遞區號 <span className="required">*</span>
          </label>
          <input
            className="form-input"
            id="postalCode"
            onChange={(e) => onFieldChange('postalCode', e.target.value)}
            placeholder="110"
            required
            type="text"
            value={shippingData.postalCode}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="addressLine">
          詳細地址 <span className="required">*</span>
        </label>
        <input
          className="form-input"
          id="addressLine"
          onChange={(e) => onFieldChange('addressLine', e.target.value)}
          placeholder="請輸入路名、巷弄、門牌號碼"
          required
          type="text"
          value={shippingData.addressLine}
        />
      </div>

      {/* 配送時段 */}
      <div className="form-group">
        <label className="form-label">
          配送時段 <span className="required">*</span>
        </label>
        <div className="time-slot-options">
          <label className="radio-option">
            <input
              checked={shippingData.deliveryTimeSlot === 'DELIVERY_MORNING'}
              name="deliveryTimeSlot"
              onChange={(e) =>
                onFieldChange('deliveryTimeSlot', e.target.value)
              }
              type="radio"
              value="DELIVERY_MORNING"
            />
            <span>上午 (09:00-12:00)</span>
          </label>
          <label className="radio-option">
            <input
              checked={shippingData.deliveryTimeSlot === 'DELIVERY_AFTERNOON'}
              name="deliveryTimeSlot"
              onChange={(e) =>
                onFieldChange('deliveryTimeSlot', e.target.value)
              }
              type="radio"
              value="DELIVERY_AFTERNOON"
            />
            <span>下午 (12:00-18:00)</span>
          </label>
          <label className="radio-option">
            <input
              checked={shippingData.deliveryTimeSlot === 'DELIVERY_EVENING'}
              name="deliveryTimeSlot"
              onChange={(e) =>
                onFieldChange('deliveryTimeSlot', e.target.value)
              }
              type="radio"
              value="DELIVERY_EVENING"
            />
            <span>晚上 (18:00-21:00)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default styled(ShippingForm)`
  ${style}
`;
