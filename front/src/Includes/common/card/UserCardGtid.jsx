import React from 'react';
import styles from '../../../css/TravelCardGrid.module.css';
import USerCard from './USerCard';

const UserCardGtid = ({ data }) => {

    return (
        <section className={styles.travelCardGrid}>
            {data.slice(0, 5).map((item, index) => (
                <div key={index} className={styles.travelCardColumn}>
                    <USerCard data={item} cardIndex={index} />
                </div>
            ))}
        </section>
    );
};

export default UserCardGtid;