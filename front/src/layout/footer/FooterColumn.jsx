import React from 'react';
import styles from '../../css/Footer.module.css';

function FooterColumn({ title, items }) {
  return (
    <div className={styles.footerColumn}>
      <h2 className={styles.columnTitle}>
        <div>{title}</div>
      </h2>
      <ul className={styles.columnList}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <a href="#" className={styles.listItemWrap}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;