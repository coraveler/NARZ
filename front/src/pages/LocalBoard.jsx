import { useEffect, useState }from 'react';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../Includes/common/PaginationComponent';
import api from '../api/axios';

function LocalBoard() {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    
    const getPost = async () => {
        try {
            const response = await api.get(`post/view`);
            console.log("debug >>> response, ", response.data);
            setPost(response.data);
            // console.log("debug >>> response, ", response.data.comments);
            // setComments(response.data.comments);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPost();
        // getComments();
    }, []);

    const handlePageChange = (page) => {
        console.log('현재 페이지:', page); // 현재 페이지 번호를 출력
        setPage(page);
      };

      const handleTotalCountChange = (count) => {
        console.log("게시글 수 : ", count)
        setTotalCount(count);
        setTotalPages(Math.ceil(totalCount/itemsPerPage));
        console.log("페이지 수 : ", totalPages)
      };
    

    return (
        <div> 
            <div>
                <RegionSelector />
            </div>
            <div>
                <ReviewSection/>
            </div>
            <div align="center">
                <TravelCardGrid data={post} page={page} onTotalCountChange={handleTotalCountChange} itemsPerPage={itemsPerPage}/>
                <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange} totalCount={totalCount} />
            </div>
        </div>
    );
}

export default LocalBoard;