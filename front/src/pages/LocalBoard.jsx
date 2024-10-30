// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import RegionSelector from '../Includes/common/region/RegionSelector';
// import ReviewSection from '../Includes/localboard/ReviewSection';
// import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
// import PaginationComponent from '../Includes/common/PaginationComponent';
// import api from '../api/axios';
// import { useLocation } from 'react-router-dom';

// function LocalBoard({onParamsChange}) {
//     const location = useLocation();
//     const { board ,local } = useParams();
//     const [post, setPost] = useState([]);
//     const [page, setPage] = useState(1); // 기본값을 1로 설정
//     const [totalCount, setTotalCount] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const itemsPerPage = 10;
//     const [ratingAvg, setRatingAvg] = useState(0);
//     const [kLocal, setkLocal] = useState('');
//     const [arrayState, setArrayState] = useState(0); // 기본값을 0으로 설정
//     const [standardState, setStandardState] = useState(0); 
//     const [originalPost, setOriginalPost] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [msg,setMsg] = useState("불러올 수 있는 데이터가 없습니다");
//     const userId = 'userB';
    

//     // const getPost = async () => {
//     //     try {
//     //         const response = await api.get(`post/get/${local}`);
//     //         console.log("debug >>> response, ", response.data);
//     //         setOriginalPost(response.data);
//     //         setPost(response.data.reverse());
//     //         const ratings = response.data.map(post => post.rating);
//     //         averageRating(ratings);
//     //     } catch (err) {
//     //         console.log(err);
//     //     }
//     // };

//     const getPost = async () => {
//         try {
//             const response = await api.get(`post/get/${local}`);
//             console.log("debug >>> response, ", response.data);
//             // console.log("ASDASDASD"+searchTerm);
//             const filteredPosts = filterPosts(response.data, searchTerm);
//             setOriginalPost(filteredPosts);
//             setPost(filteredPosts.reverse());
//             const ratings = filteredPosts.map(post => post.rating);
//             averageRating(ratings);
//         } catch (err) {
//             console.log(err);
//         }
//     };
    
//     const filterPosts = (posts, searchTerm) => {
//         // 검색어가 있는 경우 필터링
//         if(standardState){
//             const filteredPosts = searchTerm 
//                 ? posts.filter(post => 
//                     post.userId.includes(searchTerm)
//                   )
//                 : posts; // 검색어가 없으면 원래 데이터 사용
//                 if (searchTerm && filteredPosts.length === 0) {
//                     setMsg("검색 결과가 없습니다.");
//                 }      
//             return filteredPosts;
//         }else{
//             const filteredPosts = searchTerm 
//                 ? posts.filter(post => 
//                     post.content.includes(searchTerm) || post.title.includes(searchTerm)
//                   )
//                 : posts; // 검색어가 없으면 원래 데이터 사용
//                 if (searchTerm && filteredPosts.length === 0) {
//                     setMsg("검색 결과가 없습니다.");
//                 }      
//             return filteredPosts;
//         }


//     };


//     const averageRating = (ratings) => {
//         if (ratings.length === 0) {
//             setRatingAvg(0);
//         } else {
//             const total = ratings.reduce((acc, rating) => acc + rating, 0);
//             const average = Math.round(total / ratings.length * 100) / 100;
//             setRatingAvg(average);
//         }
//         switch (local) {
//             case "all":
//                 setkLocal("전국");
//                 break;
//             case "sudo":
//                 setkLocal("수도권");
//                 break;
//             case "gangwon":
//                 setkLocal("강원도");
//                 break;
//             case "chungbuk":
//                 setkLocal("충북");
//                 break;
//             case "chungnam":
//                 setkLocal("충남");
//                 break;
//             case "daejeon":
//                 setkLocal("대전");
//                 break;
//             case "gyeonbuk":
//                 setkLocal("경북");
//                 break;
//             case "gyeongnam":
//                 setkLocal("경남");
//                 break;
//             case "jeonbuk":
//                 setkLocal("전북");
//                 break;
//             case "jeonnam":
//                 setkLocal("전남");
//                 break;
//             case "jeju":
//                 setkLocal("제주");
//                 break;
//             default:
//                 alert("문제발생");
//                 return;
//         }
//     };

//     const changeArray = () => {
//         let sortedPosts = [...originalPost];

//         switch (arrayState) {
//             case 0: // 최신순
//                 sortedPosts.sort((a, b) => {
//                     return new Date(b.createdDate) - new Date(a.createdDate);
//                 });
//                 break;
//             case 1: // 인기순
//                 sortedPosts.sort((a, b) => {
//                     if (b.likeCount === a.likeCount) {
//                         // likeCount가 같을 때 createdDate로 정렬
//                         return new Date(b.createdDate) - new Date(a.createdDate);
//                     }
//                     return b.likeCount - a.likeCount;
//                 });
//                 break;
//             case 2: // 평점순
//                 sortedPosts.sort((a, b) => {
//                     if (b.rating === a.rating) {
//                         // rating이 같을 때 createdDate로 정렬
//                         return new Date(b.createdDate) - new Date(a.createdDate);
//                     }
//                     return b.rating - a.rating;
//                 });
                
//                 break;
//             default:
//                 return;
//         }
//         setPage(1);
//         setPost(sortedPosts);
//     };

//     useEffect(() => {
//         // 로컬 스토리지에서 arrayState를 가져옵니다.
//         const storedArrayState = localStorage.getItem('arrayState');
//         if (storedArrayState) {
//             setArrayState(JSON.parse(storedArrayState));
//         }
//     }, []);

//     useEffect(() => {
//         changeArray();
//         // arrayState를 로컬 스토리지에 저장
//         localStorage.setItem('arrayState', JSON.stringify(arrayState));
//         // 페이지를 1로 초기화
//         setPage(1);
//     }, [arrayState, originalPost]); // originalPost가 변경될 때도 호출

//     const handlePageChange = (page) => {
//         console.log('현재 페이지:', page);
//         setPage(page);
//     };

//     const handleTotalCountChange = (count) => {
//         console.log("게시글 수 : ", count);
//         setTotalCount(count);
//         setTotalPages(Math.ceil(count / itemsPerPage));
//         console.log("페이지 수 : ", totalPages);
//     };

//     const getBookMarkPost = async () => {
//         try {
//           const response = await api.get(`post/get/bookmark`,{params: {
//                                             local: local,
//                                             userId: userId,
//         }

//           });
//           console.log("debug >>> response, ", response.data);
//           const filteredPosts = filterPosts(response.data, searchTerm);
//           // 최신순으로 정렬
//           const sortedPosts = filteredPosts.sort((a, b) => {
//             return new Date(b.createdDate) - new Date(a.createdDate);
//           });
//           setOriginalPost(filteredPosts);
//           setPost(sortedPosts);
    
//         } catch (err) {
//           // setError('Failed to load images');
//           console.log(err);
//         }
//       };

//     useEffect(() => {
//         // console.log("ASDASDASDASD"+searchTerm);
//         switch(board){
//             case "bookmark":
//                 getBookMarkPost();
//                 break;
//             default:
//                 getPost();
//                 return;   
//         }
//     }, [local,board,arrayState,searchTerm,standardState]);

//     const handleArray = (value) => {
//         setArrayState(value);
//     };

//     useEffect(() => {
//         if (onParamsChange) {
//           onParamsChange(board, local); // URL 파라미터가 변경될 때마다 호출
//         }
//       }, [board, local, onParamsChange]);

//       useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const term = params.get('searchTerm');
//         setSearchTerm(term || '');
//     }, [location.search]); // location.search가 변경될 때마다 호출

//     const handleStandard = (value) => {
//         setStandardState(value);
//     };

    

//     return (
//         <div>
//             <br/>
            
//             <div>
//                 <RegionSelector board={board} searchTerm={searchTerm}/>
//             </div>

//             <div>
//                 <ReviewSection ratingAvg={ratingAvg} kLocal={kLocal} handleArray={handleArray} searchTerm={searchTerm} handleStandard={handleStandard}/>
//             </div>
//             <div style={{width:"100%", display:'flex', alignItems: 'center'}}  >
//                 <span style={{width:"900px", margin:'0px auto', backgroundColor:'white'}} >{
//                 searchTerm 
                
//                     ? `검색어: ${searchTerm}` 
//                     : ""
//                 } </span>
//             </div>
//             <br/><br/>
//             <div align="center">
                
//                 <TravelCardGrid data={post} page={page} onTotalCountChange={handleTotalCountChange} itemsPerPage={itemsPerPage} msg={msg}/>
//                 {post.length > 0 &&
//                     <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange} totalCount={totalCount} currentPage={page} />
//                 }
                
                
//             </div>
//         </div>
//     );
// }

// export default LocalBoard;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../Includes/common/PaginationComponent';
import api from '../api/axios';
import { useLocation } from 'react-router-dom';

function LocalBoard({ onParamsChange }) {
    const location = useLocation();
    const { board, local } = useParams();
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [ratingAvg, setRatingAvg] = useState(0);
    const [kLocal, setkLocal] = useState('');
    const [arrayState, setArrayState] = useState(0);
    const [standardState, setStandardState] = useState(0);
    const [originalPost, setOriginalPost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [msg, setMsg] = useState("불러올 수 있는 데이터가 없습니다");
    const userId = 'userB';

    const getPost = async () => {
        try {
            const response = await api.get(`post/get/${local}`);
            const filteredPosts = filterPosts(response.data, searchTerm);
            setOriginalPost(filteredPosts);
            updatePostOrder(filteredPosts);
            averageRating(filteredPosts.map(post => post.rating));
        } catch (err) {
            console.log(err);
        }
    };

    const filterPosts = (posts, searchTerm) => {
        const filteredPosts = standardState 
            ? posts.filter(post => post.userId.includes(searchTerm) || searchTerm === '')
            : posts.filter(post => 
                post.content.includes(searchTerm) || post.title.includes(searchTerm) || searchTerm === ''
            );

        if (searchTerm && filteredPosts.length === 0) {
            setMsg("검색 결과가 없습니다.");
        }
        return filteredPosts;
    };

    const averageRating = (ratings) => {
        if (ratings.length === 0) {
            setRatingAvg(0);
        } else {
            const total = ratings.reduce((acc, rating) => acc + rating, 0);
            const average = Math.round(total / ratings.length * 100) / 100;
            setRatingAvg(average);
        }
        const localNames = {
            "all": "전국",
            "sudo": "수도권",
            "gangwon": "강원도",
            "chungbuk": "충북",
            "chungnam": "충남",
            "daejeon": "대전",
            "gyeonbuk": "경북",
            "gyeongnam": "경남",
            "jeonbuk": "전북",
            "jeonnam": "전남",
            "jeju": "제주"
        };
        setkLocal(localNames[local] || "");
    };

    const updatePostOrder = (posts) => {
        let sortedPosts = [...posts];
        switch (arrayState) {
            case 0:
                sortedPosts.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                break;
            case 1:
                sortedPosts.sort((a, b) => b.likeCount - a.likeCount || new Date(b.createdDate) - new Date(a.createdDate));
                break;
            case 2:
                sortedPosts.sort((a, b) => b.rating - a.rating || new Date(b.createdDate) - new Date(a.createdDate));
                break;
            default:
                return;
        }
        setPost(sortedPosts);
    };

    useEffect(() => {
        updatePostOrder(originalPost); // originalPost가 변경될 때마다 정렬
    }, [arrayState, originalPost]);

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleTotalCountChange = (count) => {
        setTotalCount(count);
        setTotalPages(Math.ceil(count / itemsPerPage));
    };

    const getBookMarkPost = async () => {
        try {
            const response = await api.get(`post/get/bookmark`, {
                params: {
                    local: local,
                    userId: userId,
                }
            });
            const filteredPosts = filterPosts(response.data, searchTerm);
            setOriginalPost(filteredPosts);
            updatePostOrder(filteredPosts); // 정렬된 포스트 업데이트
            averageRating(filteredPosts.map(post => post.rating));
        } catch (err) {
            console.log(err);
        }
    };
    

    useEffect(() => {
        console.log("ASDASDASDASD"+board);
        if (board === "bookmark") {
            getBookMarkPost();
        } else {
            getPost();
        }
    }, [local, board,  searchTerm, standardState]);

    const handleArray = (value) => {
        setArrayState(value);
        // localStorage.setItem('arrayButtonState', value); // 로컬 스토리지에 저장
    };

    useEffect(() => {
                // 로컬 스토리지에서 arrayState를 가져옵니다.
                const storedArrayState = localStorage.getItem('arrayButtonState');
                if (storedArrayState) {
                    setArrayState(JSON.parse(storedArrayState));
                }
            }, []);

    useEffect(() => {
        if (onParamsChange) {
            onParamsChange(board, local);
        }
    }, [board, local, onParamsChange]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const term = params.get('searchTerm');
        setSearchTerm(term || '');
    }, [location.search]);

    const handleStandard = (value) => {
        setStandardState(value);
        // localStorage.setItem('standardState', value); // 로컬 스토리지에 저장
    };

    return (
        <div>
            <br />
            <div>
                <RegionSelector board={board} searchTerm={searchTerm} />
            </div>
            <div>
                <ReviewSection 
                    ratingAvg={ratingAvg} 
                    kLocal={kLocal} 
                    handleArray={handleArray} 
                    searchTerm={searchTerm} 
                    handleStandard={handleStandard} 
                />
            </div>
            <div style={{ width: "100%", display: 'flex', alignItems: 'center' }}>
                <span style={{ width: "900px", margin: '0px auto', backgroundColor: 'white' }}>
                    {searchTerm ? `검색어: ${searchTerm}` : ""}
                </span>
            </div>
            <br /><br />
            <div align="center">
                <TravelCardGrid 
                    data={post} 
                    page={page} 
                    onTotalCountChange={handleTotalCountChange} 
                    itemsPerPage={itemsPerPage} 
                    msg={msg} 
                />
                {post.length > 0 &&
                    <PaginationComponent 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                        totalCount={totalCount} 
                        currentPage={page} 
                    />
                }
            </div>
        </div>
    );
}

export default LocalBoard;
