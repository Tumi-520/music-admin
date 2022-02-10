import { Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";
import MKF from "assets/img/mkf.png";
import { Modal } from "antd";
import { changeShow,logout } from "store/login";
import Login from "components/login";
const Head = () => {
  const baseCls = "head";
  // @ts-ignore
  const { login,show,user} = useSelector((state) => state.login);
  const disaptch =useDispatch()

  const handleCancel = () => {
    disaptch(changeShow(false));
  };
  const loginBtn =()=>{
    disaptch(changeShow(true))
  }
  const logouted =()=>{
    disaptch(logout())
  }
  return (
    <div className="header-wrapper">
      <div className={`${baseCls}`}>
        <div className={`${baseCls}-logo`}>
          <span className={`${baseCls}-logo-icon`}></span>
          <span className={`${baseCls}-logo-title`}>网易云音乐</span>
        </div>
        <div className={`${baseCls}-search`}>
          <input
            type="text"
            className={`${baseCls}-search-input`}
            placeholder="搜索"
          />
          <div className={`${baseCls}-search-btn`}>
            <img
              src={MKF}
              alt="听歌识曲"
              className={`${baseCls}-search-btn-img`}
            />
          </div>
        </div>
        <div className={`${baseCls}-fun`}>
          <div onClick={loginBtn} className={`${baseCls}-fun-img`}>
            <Avatar  src={login?user.profile.avatarUrl:''} />
          </div>
          <div className='mask'></div>
          {login ? (
            <div className={`${baseCls}-fun-set`}>
              <div className={`${baseCls}-fun-set-me`}>个人中心</div>
              <div className={`${baseCls}-fun-set-logout`} onClick={()=>{logouted()}}>退出</div>
            </div>
          ):null}
        </div>
        {show ? (
        <Modal
          title="登录"
          visible={show}
          onCancel={handleCancel}
          footer={[]}
        >
          <Login/>
        </Modal>
      ) : null}
      </div>
    </div>
  );
};

export default Head;
