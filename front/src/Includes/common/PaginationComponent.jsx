import React from 'react';
import styles from '../../css/PaginationComponent.module.css';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const PaginationButton = ({ children, isActive, onClick }) => {
  

  const buttonClass = isActive ? styles.paginationButtonActive : styles.paginationButton;
  return (
    <button className={buttonClass} onClick={onClick} aria-current={isActive ? 'page' : undefined}>
      {children}
    </button>
  );
};

const PaginationNavButton = ({ children, onClick, direction, disabled }) => {
  const isMac = () => navigator.platform.toLowerCase().includes('mac');

  return (
    <button 
      className={isMac ? styles.paginationNavButton : styles.paginationWindowNavButton} 
      onClick={onClick} 
      disabled={disabled}
      aria-label={`${direction} page`}
    >
      {direction === 'previous' && (
       <IoMdArrowRoundBack />
      )}
      {children}
      {direction === 'next' && (
        <IoMdArrowRoundForward />
      )}
    </button>
  );
};

const PaginationComponent = ({ totalPages = 5, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page); // 부모 컴포넌트에 페이지 번호 전달
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // 페이지 그룹 계산
  const getPageGroup = () => {
    const groupSize = 5;
    const currentGroup = Math.ceil(currentPage / groupSize);
    const start = (currentGroup - 1) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav className={styles.paginationContainer} aria-label="Pagination">
      <PaginationNavButton 
        direction="previous" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        이전
      </PaginationNavButton>&nbsp;&nbsp;
      <div className={styles.paginationList}>
        {getPageGroup().map((page) => (
          <PaginationButton
            key={page}
            isActive={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </div>
      &nbsp;&nbsp;
      <PaginationNavButton 
        direction="next" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        다음&nbsp;
      </PaginationNavButton>
    </nav>
  );
};

export default PaginationComponent;
