import React from 'react';
import { FaFacebookSquare, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoCall } from "react-icons/io5";
import { MdOutlineMailOutline } from 'react-icons/md';
import { SiNaver } from "react-icons/si";
import styles from '../../css/Footer.module.css';




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
    <div style={{borderTop:'1px solid rgba(214, 214, 214, 0.8)'}}>
      <div style={{textAlign:'center', marginTop:'20px', marginBottom:'5px'}}><span  className={styles.logo}>.Traveler.</span></div>
      <div className={styles['member']} ><p>member | jaksam, siu, Gunzzal, uunesn, semi, yoonseo</p></div>
      <footer className={styles.footer}>
        <div className={styles['comment']} >
        <p>Travel makes one modest. You see what a tiny place you occupy in the world.</p>
        <p>-Gustave Flaubert-</p>
        </div>
      </footer>

      <div style={{ display:'flex', gap:'10px', fontSize:'25px', justifyContent:'center', cursor:'pointer', marginTop:'5px'}}>
        <a href="https://github.com/coraveler/final-pjt" target="_blank" ><FaGithub/></a>
        <a href="https://youtube.com" target="_blank" ><FaYoutube/></a>
        <a href="https://facebook.com" target="_blank" ><FaFacebookSquare/></a>
        <a href="https://instagram.com" target="_blank" ><FaInstagram/></a>
        <a href="https://twitter.com" target="_blank" ><FaTwitter/></a>
        <a href="https://naver.com" style={{fontSize: '20px', lineHeight: '38px' }} target="_blank" ><SiNaver/></a>
      </div>
        
      <div style={{ textAlign: 'center', marginBottom:'20px', padding: '10px', }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>educational institution| <span style={{ fontWeight: 'normal' }}>MultiCampus</span></p>
      </div>
        
    </div>
  );
}

export default Footer;
