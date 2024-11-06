import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import MapShareCard from "../Includes/mapshare/MapShareCard";
import api from "../api/axios";

function MapSharePage(){

    const [fetchMapImgs, setFetchMapImgs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);  // 초기 10개만 보이도록 설정
    const [sortingMethod, setSortingMethod] = useState('등록순');
    const [currentViewMethod, setCurrentViewMethod] = useState('전체 보기')

    // 전체 지도 정보 가져오기
    const getMapShareImg = async() => {
        try{
            const response = await api.get("/api/mapshare")
            if(response.status == 200){
                if(sortingMethod == '등록순'){
                    dateSort(response.data);
                } else if(sortingMethod == '좋아요순'){
                    likeSort(response.data)
                } 
            } else{
                alert("지도 데이터를 가져오는데 실패했습니다.")
            }
        }catch(e){
            console.log(e);
        }
    }

    // 내가 등록한 지도 정보 가져오기
    const fetchSelfMapShareImg = async() => {
        try{
            if(localStorage.getItem("loginInfo")){
                const response = await api.get(`/api/mapshareself?userId=${JSON.parse(localStorage.getItem("loginInfo")).data.userId}`)
                if(response.status == 200){
                    if(sortingMethod == '등록순'){
                        dateSort(response.data);
                    } else if(sortingMethod == '좋아요순'){
                        likeSort(response.data)
                    } 
                } else{
                    alert("지도 데이터를 가져오는데 실패했습니다.")
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    // 등록순 정렬 함수
    const dateSort = (ary) => {
        setFetchMapImgs(ary.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate)));
    }

    // 좋아요순 정렬 함수
    const likeSort = (ary) => {
        setFetchMapImgs(ary.sort((a,b) => b.likeCount -a.likeCount));
    }

    // 랜덤 정렬 함수
    const randomSort = async() => {
        try{
            const response = await api.get("/api/mapshare")
            const shuffledArray = response.data.sort(() => Math.random() - 0.5);
            setFetchMapImgs(shuffledArray);
        }catch(e){
            console.log(e);
        }
        
    };

    useEffect(()=>{
        if(currentViewMethod=='전체 보기'){
            getMapShareImg();
        } else if(currentViewMethod=='내가 등록한 지도 보기' && localStorage.getItem("loginInfo")){
            fetchSelfMapShareImg();
        }
       
    },[])

    // 버튼 클릭 시 항목을 10개씩 추가
    const loadMoreMaps = () => {
        setVisibleCount((prevCount) => prevCount + 10);  // 10개씩 더 보이게
    };

    useEffect(()=>{
        if(currentViewMethod=='전체 보기'){
            getMapShareImg();
        } else if(currentViewMethod=='내가 등록한 지도 보기' && localStorage.getItem("loginInfo")){
            fetchSelfMapShareImg();
        }
    },[sortingMethod])

    return(
        <>
            <div style={{
                    display: 'flex',
                    justifyContent: 'center', // 부모 요소를 화면 중앙에 배치
                    alignItems: 'center', // 세로 중앙 정렬
                    flexDirection: 'column', // 자식 요소들을 세로로 배치
                    position:'relative'
                }}><br/>
                {/* <img src="img/mapshare/mapShareBackground_3.png" style={{position:'absolute', left:'0', top:'0', width:'350px', height:'990px'}}></img> */}
                {/* <img src="img/mapshare/mapShareBackground_4.png" style={{position:'absolute', right:'0', top:'0', width:'350px', height:'990px'}}></img> */}
                <div style={{width:'52%', display:'flex', justifyContent:'space-between'}}>
                    <div style={{textAlign: 'left'}}>
                        <FaUserFriends style={{fontSize:'30px', color:'orange', marginLeft:'5px', marginBottom:'5px'}}/>
                        <h4>나만의 지도를 공유하는 공간입니다.</h4>
                    </div>
                    <div style={{textAlign: 'right'}}>
                    <select className="form-select" 
                        aria-label="Default select example" 
                        style={{width:'110px', 
                            borderRadius:'20px', 
                            marginTop:'30%'}}
                        onChange={(e)=>setSortingMethod(e.target.value)}
                    >
                        <option value="등록순">등록순</option>
                        <option value="좋아요순">좋아요순</option>
                    </select>
                    </div>
                </div>
                
                <hr style={{ width: '95%', border: '1px solid #ddd'}} /><br/>
                <div style={{display:'flex', gap:'35px'}}>
                    <div onClick={()=>{getMapShareImg(); setCurrentViewMethod('전체 보기')}}>
                        {currentViewMethod == '전체 보기'
                        ?<button className="btn btn-outline-orange view-btn-choice" >전체 보기</button>
                        :<button className="btn btn-outline-orange view-btn" >전체 보기</button>}
                    </div>
                    {localStorage.getItem("loginInfo") &&
                    <div onClick={()=>{fetchSelfMapShareImg(); setCurrentViewMethod('내가 등록한 지도 보기')}}>
                        {currentViewMethod == '내가 등록한 지도 보기'
                        ?<button className="btn btn-outline-orange view-btn-choice" style={{width:'200px'}}>내가 등록한 지도 보기</button>
                        :<button className="btn btn-outline-orange view-btn" style={{width:'200px'}}>내가 등록한 지도 보기</button>}
                    </div>
                    }
                    <div onClick={()=>{randomSort(); setCurrentViewMethod('랜덤')}}>
                        {currentViewMethod == '랜덤'
                        ?<button className="btn btn-outline-orange view-btn-choice" style={{width:'80px'}}>랜덤</button>
                        :<button className="btn btn-outline-orange view-btn" style={{width:'80px'}}>랜덤</button>}
                    </div>
                </div><br/><br/>
                <div>
                    <div style={{maxWidth: '1010px'}}>
                        <div style={{display:'flex', flexWrap: 'wrap', gap:'40px'}}>
                            {fetchMapImgs.slice(0, visibleCount).map(img => (
                                <MapShareCard 
                                    img={img} 
                                    key={img.mapId} 
                                    getMapShareImg={getMapShareImg} 
                                    fetchSelfMapShareImg={fetchSelfMapShareImg}
                                    currentViewMethod={currentViewMethod}
                                    currentViewChange={()=>setCurrentViewMethod('전체 보기')}/>
                            ))}
                        </div>
                    </div><br/><br/><br/>
                    {/* "더 보기" 버튼 */}
                    {visibleCount < fetchMapImgs.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button 
                                className="btn btn-outline-orange more-btn" 
                                style={{borderRadius:'20px', padding:'5px 15px', color:'orange'}} 
                                onClick={loadMoreMaps}
                            >더 보기
                            </button>
                        </div>
                    )}

                    <br/><br/>
                </div>
                
            </div>

            
        </>
    )
}

export default MapSharePage;