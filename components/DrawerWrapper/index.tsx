'use client';

import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

import DrawerWrapperContainer from './style';

interface DrawerWrapperProps {
  className?: string;
  height?: number;
  heightAuto?: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
}

export interface DrawerWrapperRef {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const STEP_ANIMATION_INITIAL = 0;
const STEP_ANIMATION_START = 1;
const STEP_ANIMATION_CLOSING = 2;
const STEP_ANIMATION_CLOSED = 3;

const DrawerWrapper = forwardRef<DrawerWrapperRef, DrawerWrapperProps>(
  (
    {
      className,
      height = 500,
      heightAuto = false,
      children,
      onBackdropClick = () => {},
    },
    ref
  ) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [animationStep, setAnimationStep] = useState(STEP_ANIMATION_INITIAL);

    const closeModal = () => {
      setAnimationStep(STEP_ANIMATION_CLOSING);
      setIsOpenModal(false);
    };

    useImperativeHandle(ref, () => ({
      isOpen: isOpenModal,
      openModal: () => {
        setAnimationStep(STEP_ANIMATION_START);
        setIsOpenModal(true);
      },
      closeModal: closeModal,
    }));

    // 阻止背景滾動
    useEffect(() => {
      if (isOpenModal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpenModal]);

    if (!isOpenModal && animationStep === STEP_ANIMATION_INITIAL) {
      return null;
    }
    if (!isOpenModal && animationStep === STEP_ANIMATION_CLOSED) {
      return null;
    }

    return (
      <DrawerWrapperContainer
        className={className}
        height={height}
        heightAuto={heightAuto}
        isOpen={isOpenModal}
      >
        {isOpenModal && (
          <div
            className="backdrop"
            onClick={() => {
              onBackdropClick();
              closeModal();
            }}
          />
        )}
        <div
          className="modal"
          onAnimationEnd={() => {
            if (!isOpenModal && animationStep === STEP_ANIMATION_CLOSING) {
              setAnimationStep(STEP_ANIMATION_CLOSED);
            }
          }}
        >
          {children}
        </div>
      </DrawerWrapperContainer>
    );
  }
);

DrawerWrapper.displayName = 'DrawerWrapper';

export default DrawerWrapper;
