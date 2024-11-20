import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ImBullhorn } from "react-icons/im";
import { LiaSmileWink } from "react-icons/lia";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import FestivalList from '../Includes/festival/FestivalList';
import '../css/festival/Festival.css';

function FestivalPage() {

    const [festivalAry, setFestivalAry] = useState([]);     // 축제 일정 배열
    const [currentPage, setCurrentPage] = useState(1);      // 현재 페이지
    
    const maxFestival = 8;      // 한페이지 일정 최대 개수
    const totalPages = Math.ceil(festivalAry.length/maxFestival)    // 축제 일정 총 페이지 구하기
    const lastEl = currentPage * maxFestival;
    const firstEl = lastEl - maxFestival;
    const currentAry = festivalAry.slice(firstEl, lastEl);  // 보여지는 축제 일정들

    const maxPage = 5;  // 보여줄 페이지 개수
    const startPage = Math.floor((currentPage-1)/maxPage)*maxPage+1
    const lastPage = Math.min(startPage+maxPage-1, totalPages)

    // 페이지 범위를 설정
    const pageNumbers = [];
    for (let i = startPage; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    // db로부터 축제 일정 가져오기
    const getFestival = async () => {
        const response = await axios.get('http://localhost:7777/api/festival')
        const sortedFestivals = response.data.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        setFestivalAry(sortedFestivals);
    }

    useEffect(()=>{
        getFestival();
    },[])

    
    return (
        <>
            <div style={{display:'flex', justifyContent:'center', marginTop:'50px', paddingRight:'5%'}}>
                
                <div style={{padding:'20px', paddingLeft:''}}>
                    <img src="img/festival/festival_img.png" style={{width:'220px', height:'700px', borderRadius:'20px', }}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column'}} >
                    <div style={{marginLeft:'20px', display:'flex', justifyContent:'space-between'}}>
                        <div style={{flex:3}}>
                            <h1 className="font-face" style={{color:'#FF8A2B'}}><ImBullhorn style={{marginBottom:'10px', color:'#FF6F00'}}/> &nbsp;축제 일정 &nbsp;</h1><br/>
                            <h5 className="font-face-2" style={{fontWeight:'bold'}}>다가오는 축제들을 만나보세요! <LiaSmileWink style={{marginBottom:'5px', fontSize:'30px', color:'#FFB74D'}}/></h5>
                        </div>
                        {/* <div>
                            <img src='img/festival/festival_img_3.png' style={{width:'400px', height:'120px'}}/>
                        </div> */}
                    </div>
                    
                    <div style={{ width:'1200px'}} className="d-flex flex-wrap" >
                        {currentAry.map((el)=>{return <FestivalList key={el.id} el={el}/>})}
                    </div>
                </div>
            </div><p/>
            <div>
                <div style={{display:'flex', justifyContent:'center', marginRight:'35px', marginBottom:'20px'}}>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item" onClick={() => setCurrentPage(1)}>
                                <a className="page-link"><span><MdOutlineKeyboardDoubleArrowLeft /></span></a>
                            </li>
                            <li className="page-item" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
                                <a className="page-link"><span><MdOutlineKeyboardArrowLeft /></span></a>
                            </li>
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} onClick={() => setCurrentPage(number)}>
                                    <a className="page-link">{number}</a>
                                </li>
                            ))}
                            <li className="page-item" onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}>
                                <a className="page-link"><span><MdOutlineKeyboardArrowRight /></span></a>
                            </li>
                            <li className="page-item" onClick={() => setCurrentPage(totalPages)}>
                                <a className="page-link"><span><MdOutlineKeyboardDoubleArrowRight /></span></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div><br/><br/>
        </>
    );
}

export default FestivalPage;
