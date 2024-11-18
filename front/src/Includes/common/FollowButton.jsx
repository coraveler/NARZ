import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import api from '../../api/axios';

const FollowButton = ({ followedId }) => {
    let loginInfo = getLoginInfo();
    const followerId = loginInfo?.userId || null;
    const [followState, setFollowState] = useState(0);

    const saveFollow = async () => {
        const data = {
            followerId: followerId,
            followedId: followedId
        }
        try {
            const response = await api.post('follow/save', data);
            console.log(response.data);
            setFollowState(1);
        } catch (err) {
            console.error(err);
        }
    };

    const checkFollow = async () => {
        console.log('Follower ID:', followerId);
        console.log('Followed ID:', followedId);
        try {
            const response = await api.get('follow/check', {
                params: {
                    followerId: followerId,
                    followedId: followedId
                }
            });
            setFollowState(response.data);

        } catch (err) {
            console.error(err);
        }
    };

    const deleteFollow = async () => {
        const data = {
            followerId: followerId,
            followedId: followedId
        }
        try {
            const response = await api.delete('follow/delete', { data: data });
            setFollowState(response.data);
            setFollowState(0);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if(followedId!=null){

            checkFollow();
        }
    }, [followedId])


    return (
        <div>
            {
                (followerId != null && followedId != followerId) && (followState) ?
                    <button className="btn btn-warning" aria-label="Follow"
                        style={{ marginLeft: "5px" , width:'95px', height:'40px', fontWeight:'550'}}
                        onClick={deleteFollow}>
                        - 팔로잉
                    </button> :
                    <button className="btn btn-outline-warning" aria-label="Follow"
                        style={{ marginLeft: "5px", width:'95px', height:'40px', fontWeight:'550' }}
                        onClick={saveFollow}>
                        + 팔로우
                    </button>
            }


        </div>
    );
};

export default FollowButton;
