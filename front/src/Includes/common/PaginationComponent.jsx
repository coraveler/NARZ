import React, { useState } from 'react';
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

const PaginationComponent = ({ totalPages = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className={styles.paginationContainer} aria-label="Pagination">
      <PaginationNavButton 
        direction="previous" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        Previous
      </PaginationNavButton>
      <div className={styles.paginationList}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationButton
            key={page}
            isActive={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </div>
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