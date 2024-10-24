import React from 'react';
import RegionItem from './RegionItem';
import styles from '../../../css/RegionSelector.module.css';



const RegionSelector = ({board}) => {
  

  const regions = [
    { name: '전국', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f7b6ed17f7fe4942cc720681729a7fca7644688c3e5ade50c4f48ab57ab16199?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db', href:"/board/"+board+"/all" },
    { name: '수도권', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8c567af33bcf919c57484e7fec42cdfac62908b2b7e9b3fddd9686e7aaef4b51?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/sudo" },
    { name: '강원', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/af8f2fdba3b6a716e48cd36007ce2bd221011931f247d23be601a6a95531900e?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/gangwon" },
    { name: '충북', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0410f9002458f8d1fe48bbf3e9b264ad0b1270516788f12102ae957b4f35f1ad?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/chungbuk" },
    { name: '충남', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a58ac7f1781887325902755f43f5ebdfa71d0506757d7c34f347b35f6251874?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/chungnam" },
    { name: '대전', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e698ba26d283a0be26616156285bf89d4c3b837d87abbbac0dc4188f100c59a3?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/daejeon" },
    { name: '경북', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/89f1688d458b4753e153756899f4f01715c0c40b37c918911f5ae667a1bcf562?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/gyeonbuk" },
    { name: '경남', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/30666bbe1eb34ac9a3e93378927e2c165978f1a72b8713d80f588d2d4489ad73?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/gyeongnam" },
    { name: '전북', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f5d17f682895f75d04a7514cbbb70f49d719a0f00b02dbfd3cba975ec4281c6b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/jeonbuk" },
    { name: '전남', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b1c805fd219936f991e27eb7834fdd4a4ca694a24af4e8adb661adf140a4cb73?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/jeonnam" },
    { name: '제주', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3cc9192d8821dc5e39f0cce7018755142af75b51c38590a4b82994dab47a58e7?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db',href:"/board/"+board+"/jeju" },
  ];

  return (
    <nav className={styles.container}>
      <h2 className={styles['visually-hidden']}>지역 선택</h2>
      {regions.map((region, index) => (
        <RegionItem key={index} iconSrc={region.iconSrc} name={region.name} href={region.href} board={board} />
      ))}
    </nav>
  );
};

export default RegionSelector;