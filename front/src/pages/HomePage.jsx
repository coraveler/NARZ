import React from 'react';
import RegionSelector from '../Includes/common/region/RegionSelector';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import styles from '../css/HeroSection.module.css';

function HomePage() {
    return (
        <div>
            <div>
                <section className={styles.heroActions}>
                    <h1 className={styles.title}>
                        <span className={styles.subtitle}>
                            나만 알고싶은 지역, 나알지
                        </span>
                    </h1>
                </section>
            </div>
            <div>
                <RegionSelector />
            </div>
            <h3 style={{ marginLeft: 150 }}>주간 인기 게시글 랭킹</h3>
            <div align="center">

                <TravelCardGrid />
            </div>
        </div>
    );
}

export default HomePage;