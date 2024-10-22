import { useEffect, useState }from 'react';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import PaginationComponent from '../Includes/common/PaginationComponent';
import api from '../api/axios';

function LocalBoard() {
    const [post, setPost] = useState([]);

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

    return (
        <div> 
            <div>
                <RegionSelector />
            </div>
            <div>
                <ReviewSection/>
            </div>
            <div align="center">
                <TravelCardGrid data={post}/>
                <PaginationComponent/>
            </div>
        </div>
    );
}

export default LocalBoard;