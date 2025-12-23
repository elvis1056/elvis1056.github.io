'use client';

import styled from 'styled-components';

import type { PaymentMethod as PaymentMethodType } from '@/types';

import style from './style';

interface PaymentMethodProps {
  className?: string;
  selectedMethod: PaymentMethodType;
  onMethodChange: (method: PaymentMethodType) => void;
}

function PaymentMethod({
  className,
  selectedMethod,
  onMethodChange,
}: PaymentMethodProps) {
  return (
    <div className={className}>
      <h2 className="section-title">付款方式</h2>

      <div className="payment-options">
        {/* ✅ 現場付款（目前唯一可用） */}
        <label className="payment-option">
          <input
            checked={selectedMethod === 'CASH_ON_DELIVERY'}
            name="paymentMethod"
            onChange={(e) =>
              onMethodChange(e.target.value as PaymentMethodType)
            }
            type="radio"
            value="CASH_ON_DELIVERY"
          />
          <div className="payment-content">
            <div className="payment-icon">💵</div>
            <div className="payment-info">
              <div className="payment-title">貨到付款</div>
              <div className="payment-description">
                收到商品時以現金付款給物流人員
              </div>
            </div>
          </div>
        </label>

        {/* 🔒 ATM 轉帳（未來啟用） */}
        {/*
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="ATM"
            checked={selectedMethod === 'ATM'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethodType)}
          />
          <div className="payment-content">
            <div className="payment-icon">🏦</div>
            <div className="payment-info">
              <div className="payment-title">ATM 轉帳</div>
              <div className="payment-description">
                提供虛擬帳號，請於 3 天內完成轉帳
              </div>
            </div>
          </div>
        </label>
        */}

        {/* 🔒 信用卡（未來啟用 - 需串接金流） */}
        {/*
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="CREDIT_CARD"
            checked={selectedMethod === 'CREDIT_CARD'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethodType)}
          />
          <div className="payment-content">
            <div className="payment-icon">💳</div>
            <div className="payment-info">
              <div className="payment-title">信用卡</div>
              <div className="payment-description">
                Visa / MasterCard / JCB
              </div>
            </div>
          </div>
        </label>
        */}

        {/* 🔒 LINE Pay（未來啟用 - 需串接金流） */}
        {/*
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="LINE_PAY"
            checked={selectedMethod === 'LINE_PAY'}
            onChange={(e) => onMethodChange(e.target.value as PaymentMethodType)}
          />
          <div className="payment-content">
            <div className="payment-icon">💚</div>
            <div className="payment-info">
              <div className="payment-title">LINE Pay</div>
              <div className="payment-description">
                使用 LINE Pay 快速付款
              </div>
            </div>
          </div>
        </label>
        */}
      </div>

      {/* 未來啟用說明 */}
      <div className="payment-note">
        <p>💡 提示：更多付款方式（ATM 轉帳、信用卡、LINE Pay）即將上線</p>
      </div>
    </div>
  );
}

export default styled(PaymentMethod)`
  ${style}
`;
