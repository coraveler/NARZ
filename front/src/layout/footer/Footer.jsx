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
      <div style={{textAlign:'center', marginTop:'20px', marginBottom:'5px'}}><span  className={styles.logo}>NARZ</span></div>
      <footer className={styles.footer}>
        {/* {footerColumns.map((column, index) => (
          <FooterColumn key={index} title={column.title} items={column.items} />
        ))} */}
        <div><IoCall/> <span style={{fontSize:'15px'}}>010.5121.1754</span></div>
        <div><MdOutlineMailOutline style={{fontSize:'22px'}}/> <span>siu147@naver.com</span></div>
      </footer>

      <div style={{ display:'flex', gap:'10px', fontSize:'25px', justifyContent:'center', cursor:'pointer', marginTop:'5px'}}>
        <a href="https://github.com" ><FaGithub/></a>
        <a href="https://youtube.com" ><FaYoutube/></a>
        <a href="https://facebook.com"><FaFacebookSquare/></a>
        <a href="https://instagram.com"><FaInstagram/></a>
        <a href="https://twitter.com"><FaTwitter/></a>
        <a href="https://naver.com" style={{fontSize: '20px', lineHeight: '38px' }}><SiNaver/></a>
      </div>
        
      <div style={{ textAlign: 'center', marginBottom:'20px', padding: '10px', }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>교육 기관: <span style={{ fontWeight: 'normal' }}>멀티캠퍼스</span></p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>팀명: <span style={{ fontWeight: 'normal' }}>코레블러</span></p>
      </div>
        
    </div>
  );
}

export default Footer;
