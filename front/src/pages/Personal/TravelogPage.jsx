import React from 'react';
import { useNavigate } from 'react-router-dom'; // 경로 이동을 위해 useNavigate 훅 사용
import styles from '../../css/Personal/personalpage.module.css';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import TravelCardGrid from '../../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../../Includes/common/PaginationComponent';

function TravelogPage({ selectedBadge }) {
    const navigate = useNavigate(); // 경로 이동을 위한 useNavigate 훅 사용

    const handleWriteClick = () => {
        navigate('/TravelWritePage'); // 글작성 페이지로 이동
    };

    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            <div className={styles.centeredMap}>
                000's 여행노트
            </div>
            
            <div className={styles.writeButtonContainer}>
            <button onClick={handleWriteClick} className={styles.writeButton}>
                글작성
            </button>
            </div>

{/*             
            <div align="center">
                <TravelCardGrid 
                    data={post} 
                    page={10} 
                    // onTotalCountChange={handleTotalCountChange} 
                    itemsPerPage={itemsPerPage} 
                    msg={msg} 
                />
                {post.length > 0 &&
                    <PaginationComponent 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                        totalCount={totalCount} 
                        currentPage={page} 
                    />
                }
            </div> */}

        </div>
    );
}

export default TravelogPage;
