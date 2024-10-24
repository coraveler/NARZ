import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdFestival } from "react-icons/md";
import { TbLocationFilled } from "react-icons/tb";
import FestivalInfoModal from "./FestivalInfoModal";
import FestivalMapModal from "./FestivalMapModal";



function FestivalList({el}){

    const [festivalInfoModalStatus, setFestivalInfoModalStatus] = useState(false);  // 축제 상세 정보 모달 상태
    const [festivalMapModalStatus, setFestivalMapModalStatus] = useState(false);    // 축제 지도 모달 상태

    // 축제 상세 정보 모달창 닫기
    const festivalInfoModalClose = () => {
        setFestivalInfoModalStatus(false);
    }

    // 축제 지도 모달창 닫기
    const festivalMapModalClose = () => {
        setFestivalMapModalStatus(false);
    }

    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="text-hidden" style={{fontSize:'18px'}}><MdFestival style={{marginBottom:'3px', color:'#FFB74D'}}/> {el.title}</h5><hr/>
                    <div >
                        <div style={{marginBottom:'10px'}}>
                            <div><FaRegCalendarCheck style={{marginBottom:'5px', color:'#FFB74D'}}/> 기간</div>
                            <div>{el.startDate} ~ {el.endDate}</div>
                        </div>
                        <div>
                            <div><TbLocationFilled style={{marginBottom:'4px', color:'#FFB74D'}}/> 장소</div>
                            <div className='text-hidden'>{el.place}</div>
                        </div>
                    </div><hr />
                    <div style={{textAlign:'center', marginBottom:'5px'}}>
                        <button className="btn btn-outline-orange" style={{width:'100px'}} onClick={()=>setFestivalInfoModalStatus(true)}>자세히</button> &nbsp;
                        <button className="btn btn-outline-orange" style={{width:'100px'}} onClick={()=>setFestivalMapModalStatus(true)}><FaMapMarkerAlt style={{marginBottom:'3px', color:'#FFB74D'}}/>지도</button>
                    </div>
                </div>
            </div>

            <FestivalInfoModal
                festivalInfoModalStatus={festivalInfoModalStatus}
                festivalInfoModalClose={festivalInfoModalClose}
                el={el}/>

            <FestivalMapModal
                festivalMapModalStatus={festivalMapModalStatus}
                festivalMapModalClose={festivalMapModalClose}
                el={el}/>
        </div>
    )
}

export default FestivalList;