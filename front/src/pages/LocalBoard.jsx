import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../Includes/common/PaginationComponent';
import api from '../api/axios';

function LocalBoard() {
    const { board ,local } = useParams();
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1); // 기본값을 1로 설정
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [ratingAvg, setRatingAvg] = useState(0);
    const [kLocal, setkLocal] = useState('');
    const [arrayState, setArrayState] = useState(0); // 기본값을 0으로 설정
    const [originalPost, setOriginalPost] = useState([]);
    // const [board, setBoard] = useState();
    const userId = 'userB';

    const getPost = async () => {
        try {
            const response = await api.get(`post/get/${local}`);
            console.log("debug >>> response, ", response.data);
            setOriginalPost(response.data);
            setPost(response.data.reverse());
            const ratings = response.data.map(post => post.rating);
            averageRating(ratings);
        } catch (err) {
            console.log(err);
        }
    };

    const averageRating = (ratings) => {
        if (ratings.length === 0) {
            setRatingAvg(0);
        } else {
            const total = ratings.reduce((acc, rating) => acc + rating, 0);
            const average = Math.round(total / ratings.length * 100) / 100;
            setRatingAvg(average);
        }
        switch (local) {
            case "all":
                setkLocal("전국");
                break;
            case "sudo":
                setkLocal("수도권");
                break;
            case "gangwon":
                setkLocal("강원도");
                break;
            case "chungbuk":
                setkLocal("충북");
                break;
            case "chungnam":
                setkLocal("충남");
                break;
            case "daejeon":
                setkLocal("대전");
                break;
            case "gyeonbuk":
                setkLocal("경북");
                break;
            case "gyeongnam":
                setkLocal("경남");
                break;
            case "jeonbuk":
                setkLocal("전북");
                break;
            case "jeonnam":
                setkLocal("전남");
                break;
            case "jeju":
                setkLocal("제주");
                break;
            default:
                alert("문제발생");
                return;
        }
    };

    const changeArray = () => {
        let sortedPosts = [...originalPost];

        switch (arrayState) {
            case 0: // 최신순
                sortedPosts.sort((a, b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                });
                break;
            case 1: // 인기순
                sortedPosts.sort((a, b) => {
                    if (b.likeCount === a.likeCount) {
                        // likeCount가 같을 때 createdDate로 정렬
                        return new Date(b.createdDate) - new Date(a.createdDate);
                    }
                    return b.likeCount - a.likeCount;
                });
                break;
            case 2: // 평점순
                sortedPosts.sort((a, b) => {
                    if (b.rating === a.rating) {
                        // rating이 같을 때 createdDate로 정렬
                        return new Date(b.createdDate) - new Date(a.createdDate);
                    }
                    return b.rating - a.rating;
                });
                
                break;
            default:
                return;
        }
        setPage(1);
        setPost(sortedPosts);
    };

    useEffect(() => {
        // 로컬 스토리지에서 arrayState를 가져옵니다.
        const storedArrayState = localStorage.getItem('arrayState');
        if (storedArrayState) {
            setArrayState(JSON.parse(storedArrayState));
        }
    }, []);

    useEffect(() => {
        changeArray();
        // arrayState를 로컬 스토리지에 저장
        localStorage.setItem('arrayState', JSON.stringify(arrayState));
        // 페이지를 1로 초기화
        setPage(1);
    }, [arrayState, originalPost]); // originalPost가 변경될 때도 호출

    const handlePageChange = (page) => {
        console.log('현재 페이지:', page);
        setPage(page);
    };

    const handleTotalCountChange = (count) => {
        console.log("게시글 수 : ", count);
        setTotalCount(count);
        setTotalPages(Math.ceil(count / itemsPerPage));
        console.log("페이지 수 : ", totalPages);
    };

    const getBookMarkPost = async () => {
        try {
          const response = await api.get(`post/get/bookmark`,{params: {
                                            local: local,
                                            userId: userId,
        }

          });
          console.log("debug >>> response, ", response.data);
          // 최신순으로 정렬
          const sortedPosts = response.data.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
          });
          setOriginalPost(response.data);
          setPost(sortedPosts);
    
        } catch (err) {
          // setError('Failed to load images');
          console.log(err);
        }
      };

    useEffect(() => {
        switch(board){
            case "bookmark":
                getBookMarkPost();
                break;
            default:
                getPost();
                return;   
        }
        
        
    }, [local]);

    const handleArray = (value) => {
        setArrayState(value);
    };

    return (
        <div>
            <div>
                <RegionSelector board={board}/>
            </div>

            <div>
                <ReviewSection ratingAvg={ratingAvg} kLocal={kLocal} handleArray={handleArray} />
            </div>
            <div align="center">
                <TravelCardGrid data={post} page={page} onTotalCountChange={handleTotalCountChange} itemsPerPage={itemsPerPage} />
                <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange} totalCount={totalCount} currentPage={page} />
            </div>
        </div>
    );
}

export default LocalBoard;
