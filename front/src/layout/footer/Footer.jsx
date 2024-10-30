import React from 'react';
import styles from '../../css/Footer.module.css';
import FooterColumn from './FooterColumn';

const footerColumns = [
  {
    title: "Use cases",
    items: ["UI design", "UX design", "Wireframing"]
  },
  {
    title: "Explore",
    items: ["Design", "Prototyping", "Development features"]
  },
  {
    title: "Resources",
    items: ["Blog", "Best practices", "Colors"]
  }
];

function Footer() {
  return (
    <footer className={styles.footer}>
      {footerColumns.map((column, index) => (
        <FooterColumn key={index} title={column.title} items={column.items} />
      ))}
    </footer>
  );
}

export default Footer;
