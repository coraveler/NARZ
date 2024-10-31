
export function getLoginInfo(){
    let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    

    /** 로그인 세션 유지 시간 만료 확인 */
    if (loginInfo && loginInfo.expiration && new Date().getTime() > loginInfo.expiration) {
        localStorage.removeItem('loginInfo');
        return null;
    }

    /** 로그인이 되어있지 않는경우 null 리턴 */
    if(loginInfo ==null || loginInfo.data ==null)
        return null;

    return loginInfo.data;
}