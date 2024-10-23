import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 추가
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../Includes/common/PaginationComponent';
import api from '../api/axios';

function LocalBoard() {
const { local } = useParams();
const [post, setPost] = useState([]);
const [page, setPage] = useState();
const [totalCount, setTotalCount] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const itemsPerPage = 10;
const [ratingAvg, setRatingAvg] = useState(0);
const [kLocal, setkLocal] = useState('');
const [arrayState, setArratState] = useState();
const [originalPost, setOriginalPost] = useState([]);


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
    }
    else {
        const total = ratings.reduce((acc, rating) => acc + rating, 0); // 모든 rating을 더함
        const average = Math.round(total / ratings.length * 100) / 100; // 평균 계산
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
            alert("지역설정이 잘못되었습니다.");
            return;
    }
}

const changeArray = () => {
    let sortedPosts = [...originalPost]; // originalPost의 복사본을 만듭니다.

    switch (arrayState) {
        case 0: // 최신순
            sortedPosts = [...originalPost];
            break;
        case 1: // 인기순
            sortedPosts.sort((a, b) => {
                if (b.likeCount === a.likeCount) {
                    return a.rating - b.rating; // likeCount가 같으면 rating으로 오름차순 정렬
                }
                return b.likeCount - a.likeCount; // likeCount로 내림차순 정렬
            });
            console.log(sortedPosts[0].likeCount);
            break;
        case 2: // 평점순
            sortedPosts.sort((a, b) => {
                if (b.rating === a.rating) {
                    return a.likeCount - b.likeCount; // rating이 같으면 likeCount로 오름차순 정렬
                }
                return b.rating - a.rating; // rating으로 내림차순 정렬
            });
            break;
        default:
            return; // 잘못된 경우는 아무것도 하지 않음
    }

    setPost(sortedPosts); // 정렬된 배열을 post에 설정
}

useEffect(() => {
    changeArray()
}, [arrayState]);

const handlePageChange = (page) => {
    console.log('현재 페이지:', page); // 현재 페이지 번호를 출력
    setPage(page);
};

const handleTotalCountChange = (count) => {
    console.log("게시글 수 : ", count)
    setTotalCount(count);
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
    console.log("페이지 수 : ", totalPages)
};

useEffect(() => {
    getPost();
    // getComments();
}, [local]);

const handleArray = (value) => {
    setArratState(value);
};


return (
    <div>
        <div>
            <RegionSelector />
        </div>
        <div>
            <ReviewSection ratingAvg={ratingAvg} kLocal={kLocal} handleArray={handleArray} />
        </div>
        <div align="center">
            <TravelCardGrid data={post} page={page} onTotalCountChange={handleTotalCountChange} itemsPerPage={itemsPerPage} />
            <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange} totalCount={totalCount} />
        </div>
    </div>
);
}

export default LocalBoard;
