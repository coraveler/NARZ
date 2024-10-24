import React from 'react';
import styles from '../../css/PaginationComponent.module.css';

const PaginationButton = ({ children, isActive, onClick }) => {
  const buttonClass = isActive ? styles.paginationButtonActive : styles.paginationButton;
  return (
    <button className={buttonClass} onClick={onClick} aria-current={isActive ? 'page' : undefined}>
      {children}
    </button>
  );
};

const PaginationNavButton = ({ children, onClick, direction, disabled }) => {
  return (
    <button 
      className={styles.paginationNavButton} 
      onClick={onClick} 
      disabled={disabled}
      aria-label={`${direction} page`}
    >
      {direction === 'previous' && (
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/19f075e853cf9369b05635d48350fe7f5648bacf4828f67bc095fd11bc4c6ea5?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="" className={styles.navIcon} />
      )}
      {children}
      {direction === 'next' && (
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8bffe3600cb34c563844fbb1907b34eb8ac0f701d9d00e7706e7f25b35514d5?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="" className={styles.navIcon} />
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
        Previous
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
        Next
      </PaginationNavButton>
    </nav>
  );
};

export default PaginationComponent;
