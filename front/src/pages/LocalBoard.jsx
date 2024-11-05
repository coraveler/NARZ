import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getLoginInfo } from "../Includes/common/CommonUtil";
import PaginationComponent from '../Includes/common/PaginationComponent';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import ProfileCard from '../Includes/personalPage/ProfileCard';
import api from '../api/axios';

function LocalBoard({ onParamsChange, selectedBadge }) {
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
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    const fullUrl =  window.location.href;
    const trimmedUrl = fullUrl.replace("http://localhost:3000", "");

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
            ? posts.filter(post => post.userNickname.includes(searchTerm) || searchTerm === '')
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

    const getBoardPost = async () => {
        try {
            const response = await api.get(`post/get/${board}/${local}`, {
                params: { userId } // userId를 params로 전달
            });
            console.log(response.data);
            const filteredPosts = filterPosts(response.data, searchTerm);
            setOriginalPost(filteredPosts);
            updatePostOrder(filteredPosts); // 정렬된 포스트 업데이트
            averageRating(filteredPosts.map(post => post.rating));
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        // console.log(userId);
        if (board === "localboard") {
            getPost();
        } else {
            getBoardPost();
        }

    }, [local, board, searchTerm, standardState]);

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
            {
                board == "travelog" &&
                (<div align="center">
                    <ProfileCard selectedBadge={selectedBadge} />
                </div>)
            }

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
                    trimmedUrl={trimmedUrl}
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
