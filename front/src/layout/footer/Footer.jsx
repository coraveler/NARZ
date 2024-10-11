import React from 'react';
import styles from '../../css/Footer.module.css';
import FooterColumn from './FooterColumn';

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b742f3f6e1cba31a89a8e6720d9b537141ad17b582c67349ffda3d14027d6bb4?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f", alt: "Social Icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/831667955957a828e51d85a01b12a69eab4362ada263687e3569bb1706a65e44?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f", alt: "Social Icon 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b82a070349d56777f787ef38a0f07017425443e20bfd7e1cc425ace49d1b36a?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f", alt: "Social Icon 3" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/520143f22b7a443c22483e4e1764ea3bee5a6b5c15e06a2257c804b1d7c2ed2f?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f", alt: "Social Icon 4" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dcee15a4500105a97a945c35b9786511d4e44cbcd4745dd4d8d7f7a68b28c1bf?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f", alt: "Social Icon 5" }
];

const footerColumns = [
  {
    title: "Use cases",
    items: ["UI design", "UX design", "Wireframing", "Diagramming", "Brainstorming", "Online whiteboard", "Team collaboration"]
  },
  {
    title: "Explore",
    items: ["Design", "Prototyping", "Development features", "Design systems", "Collaboration features", "Design process", "FigJam"]
  },
  {
    title: "Resources",
    items: ["Blog", "Best practices", "Colors", "Color wheel", "Support", "Developers", "Resource library"]
  }
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <div className={styles.logoImage}>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/092ab438b8bf74b8c1890a59c9396edb86c8bfa724e26378bdd4f3e386b7094b?placeholderIfAbsent=true&apiKey=86d6f526105d423e8f5e04a71c36c75f" className={styles.logoIcon} alt="Company Logo" />
          </div>
          <nav className={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <a href="#" key={index} aria-label={`Visit our ${icon.alt}`}>
                <img loading="lazy" src={icon.src} className={styles.socialIcon} alt={icon.alt} />
              </a>
            ))}
          </nav>
        </div>
      </div>
      {footerColumns.map((column, index) => (
        <FooterColumn key={index} title={column.title} items={column.items} />
      ))}
    </footer>
  );
}

export default Footer;