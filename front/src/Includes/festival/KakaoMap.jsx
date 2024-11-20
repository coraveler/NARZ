import { useEffect } from "react";

function KakaoMap({el}){

    // kakao는 window라는 전역 객체에서 생성되었기 때문에 따로 구조 분해 할당하였음
    // 그렇지 않으면 window.kakao 라고 사용
    const {kakao} = window;

    useEffect(()=>{

        // 좌표가 있을 경우만 실행
        if(el.lat && el.lon){

            const container = document.getElementById('map');   // 지도를 담을 영역 가져오기
            const options = {   // 지도 설정
                center: new kakao.maps.LatLng(el.lat, el.lon),  // 중심 좌표
                level: 3 };    // 지도 확대/축소 기본 설정
            const map = new kakao.maps.Map(container, options); // 지도 생성

            const marker = new kakao.maps.Marker({  // 마커 생성
                position: new kakao.maps.LatLng(el.lat, el.lon) }); // 마커 위치
            marker.setMap(map);// 마커가 지도 위에 표시되도록 설정한다
        }
    },[])

    return(
        <div>
            <style>
                {`
                @font-face {
                    font-family: 'KCC-Hanbit';
                    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/KCC-Hanbit.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }
                `}
            </style>

            {el.lat && el.lon 
            ? <div id="map" style={{width:'500px', height:'500px'}}/> 
            : <div style={{textAlign:'center', marginBottom:'50px', fontFamily: 'KCC-Hanbit'}}><h4>위치 정보 없음</h4></div>}
        </div>
    )
}

export default KakaoMap;