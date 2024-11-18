import { useEffect, useState } from "react";
import { TbMapHeart } from "react-icons/tb";
import MapShareCard from "../Includes/mapshare/MapShareCard";
import api from "../api/axios";

function MapSharePage() {
    const [fetchMapImgs, setFetchMapImgs] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10); 
    const [sortingMethod, setSortingMethod] = useState('등록순');
    const [currentViewMethod, setCurrentViewMethod] = useState('전체 보기');

    const getMapShareImg = async () => {
        try {
            const response = await api.get("/api/mapshare");
            if (response.status === 200) {
                if (sortingMethod === '등록순') {
                    dateSort(response.data);
                } else if (sortingMethod === '좋아요순') {
                    likeSort(response.data);
                }
            } else {
                alert("지도 데이터를 가져오는데 실패했습니다.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchSelfMapShareImg = async () => {
        try {
            if (localStorage.getItem("loginInfo")) {
                const response = await api.get(`/api/mapshareself?userId=${JSON.parse(localStorage.getItem("loginInfo")).data.userId}`);
                if (response.status === 200) {
                    if (sortingMethod === '등록순') {
                        dateSort(response.data);
                    } else if (sortingMethod === '좋아요순') {
                        likeSort(response.data);
                    }
                } else {
                    alert("지도 데이터를 가져오는데 실패했습니다.");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const dateSort = (ary) => {
        setFetchMapImgs(ary.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)));
    };

    const likeSort = (ary) => {
        setFetchMapImgs(
            ary.sort((a, b) => {
                if (b.likeCount === a.likeCount) {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                }
                return b.likeCount - a.likeCount;
            })
        );
    };

    const randomSort = async () => {
        try {
            const response = await api.get("/api/mapshare");
            const shuffledArray = response.data.sort(() => Math.random() - 0.5);
            setFetchMapImgs(shuffledArray);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (currentViewMethod === '전체 보기') {
            getMapShareImg();
        } else if (currentViewMethod === '내가 등록한 지도 보기' && localStorage.getItem("loginInfo")) {
            fetchSelfMapShareImg();
        }
    }, []);

    const loadMoreMaps = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    useEffect(() => {
        if (currentViewMethod === '전체 보기') {
            getMapShareImg();
        } else if (currentViewMethod === '내가 등록한 지도 보기' && localStorage.getItem("loginInfo")) {
            fetchSelfMapShareImg();
        }
    }, [sortingMethod]);

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <br />
                <div style={{ width: '52%', display: 'flex', justifyContent: 'center',  }}>
                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems:'center' }}>
                        <br/>
                        <h4 className="title">
                            <TbMapHeart style={{ fontSize: '50px', color: 'orange', marginLeft: '5px', marginBottom: '5px' }} /> -- 전국 지도 자랑 -- <TbMapHeart style={{ fontSize: '50px', color: 'orange', marginLeft: '5px', marginBottom: '5px' }} />
                        </h4>
                        <div><p className="subtitle" >-내가 채워 넣어놨던 지도를 자랑해주세요-</p></div>
                        
                    </div>
                </div>

                <hr style={{ width: '95%', border: '1px solid #ddd' }} /><br />
                
                {/* 버튼 그룹 */}
                <div style={{ display: 'flex', gap: '35px' }}>
                    <button
                        className={`button ${currentViewMethod === '전체 보기' ? 'selected' : ''}`}
                        onClick={() => { getMapShareImg(); setCurrentViewMethod('전체 보기'); }}
                    >
                        전체 보기
                    </button>
                    {localStorage.getItem("loginInfo") &&
                        <button
                            className={`button ${currentViewMethod === '내가 등록한 지도 보기' ? 'selected' : ''}`}
                            style={{ width: '250px' }}
                            onClick={() => { fetchSelfMapShareImg(); setCurrentViewMethod('내가 등록한 지도 보기'); }}
                        >
                            내가 등록한 지도 보기
                        </button>
                    }
                    <button
                        className={`button ${currentViewMethod === '랜덤' ? 'selected' : ''}`}
                        style={{ width: '80px' }}
                        onClick={() => { randomSort(); setCurrentViewMethod('랜덤'); }}
                    >
                        랜덤
                    </button>
                </div>
                
                {/* 정렬 선택 */}
                <div className="select-wrapper">
                    <div className="select-container">
                        <select
                            className="custom-select"
                            aria-label="Default select example"
                            onChange={(e) => setSortingMethod(e.target.value)}
                        >
                            <option value="등록순">등록순</option>
                            <option value="좋아요순">좋아요순</option>
                        </select>
                    </div>
                </div>
                <br /><br /><br />
                
                {/* 지도 목록 */}
                <div style={{ maxWidth: '1010px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                        {fetchMapImgs.length === 0
                            ? <div><br /><h5>아직 등록된 지도가 없어요! 😅</h5></div>
                            : fetchMapImgs.slice(0, visibleCount).map(img => (
                                <MapShareCard
                                    img={img}
                                    key={img.mapId}
                                    getMapShareImg={getMapShareImg}
                                    fetchSelfMapShareImg={fetchSelfMapShareImg}
                                    currentViewMethod={currentViewMethod}
                                    currentViewChange={() => setCurrentViewMethod('전체 보기')}
                                />
                            ))
                        }
                    </div>
                </div><br /><br /><br />

                {/* 더 보기 버튼 */}
                {visibleCount < fetchMapImgs.length && (
                    <div style={{ textAlign: 'center' }}>
                        <button
                            className="btn btn-outline-orange more-btn"
                            style={{ borderRadius: '20px', padding: '5px 15px', color: 'orange' }}
                            onClick={loadMoreMaps}
                        >
                            더 보기
                        </button>
                    </div>
                )}

                <br /><br />
            </div>
        </>
    );
}

export default MapSharePage;
