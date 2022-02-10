import React, { Fragment, useEffect, useRef } from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { hotApi, Singer, Playlist, Disc } from "store/music";
import { Tabs, Carousel } from "antd";
import { LoadingOutlined } from '@ant-design/icons'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import p1 from "assets/img/1.jpg";
import p2 from "assets/img/2.jpg";
import p3 from "assets/img/3.jpg";
import p4 from "assets/img/4.jpg";
import p5 from "assets/img/5.jpg";
import n1 from "assets/img/n1.jpg";
import n2 from "assets/img/n2.jpg";
import n3 from "assets/img/n3.jpg";
import n4 from "assets/img/n4.jpg";
import n5 from "assets/img/n5.jpg";
import { LeftOutlined, RightOutlined, PlayCircleOutlined, createFromIconfontCN } from "@ant-design/icons";
const { TabPane } = Tabs;

const Content = () => {
  const carousel = useRef(null);
  const newDiscItem = useRef(null)
  // @ts-ignore
  const { hot, playlist, singers, newDisc } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hotApi());
    dispatch(Playlist({ cat: hot && hot.length && hot[0].name || '华语', limit: 8 }));
    dispatch(Singer({ limit: 5 }))
    dispatch(Disc())
  }, []);
  const cls = "content";
  const change = (key: string) => {
    dispatch(Playlist({ cat: hot[key].name, limit: 8 }));
  };
  const imgArr = [p1, p2, p3, p4, p5];
  const imgArr2 = [n1, n2, n3, n4, n5];
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3005339_diuszd03wj8.js'
  })
  const renderSinger = () => {
    return singers.map((item: any, index: number) => {
      return (
        <div key={index} className="item">
          <div className="item-img">
            <LazyLoadImage
              height={100}
              width={100}
              src={item.img1v1Url}
              placeholder={< LoadingOutlined />}
            />
          </div>
          <div className="item-info">
            <span>{item.name}</span>
            <span>{item.alias[0]}</span>
          </div>
        </div>
      )
    })
  }
  const getArr = (arr: any[]) => {
    const len = arr.length
    const n = 5
    const lenNum = len % 5 === 0 ? len / 5 : Math.floor((len / 5) + 1)
    const res = []
    for (let i = 0; i < lenNum; i++) {
      const temp = arr.slice(i * n, i * n + n)
      res.push(temp)
    }
    return res
  }
  const renderNewItem = (item: any) => {
    return (
      <div className={`${cls}-body-left-newDisc-box-page-item`}>
        {
          item.map((i: any, idx: number) => {
            return (
              <div key={idx} className='item'>
                <div className="imgbox"><img src={i.picUrl} alt="" className="img" /></div>
                <div className="song" title={i.name}>{i.name}</div>
                <div className="singer" title={i.artist.name}>{i.artist.name}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
  const renderNewDisc = () => {
    return (
      <div className={`${cls}-body-left-newDisc-box`}>
        <Carousel ref={newDiscItem}>
          {
            getArr(newDisc).map((item, index) => {
              return (
                <div key={index} className={`${cls}-body-left-newDisc-box-page`}>
                  {renderNewItem(item)}
                </div>
              )
            })
          }
        </Carousel>
        <div className={`${cls}-body-left-newDisc-box-left`}><LeftOutlined /></div>
        <div className={`${cls}-body-left-newDisc-box-left`}><RightOutlined /></div>
      </div >
    )
  }
  return (
    <div className={`${cls}`}>
      <div className={`${cls}-carousel`}>
        <Carousel dotPosition={"bottom"} autoplay ref={carousel} effect="fade">
          {imgArr.map((item, index) => {
            return (
              <div key={index} className={`${cls}-carousel-img`}>
                <div
                  style={{ background: `url(${imgArr2[index]})` }}
                  className="bg"
                >
                  <div className="box">
                    <img src={item} alt="" className="img" />
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
        <div className={`${cls}-carousel-btn`}>
          <div className="pre">
            <LeftOutlined
              onClick={() => {
                // @ts-ignore
                carousel.current.prev();
              }}
            />
          </div>
          <div className="next">
            <RightOutlined
              onClick={() => {
                // @ts-ignore
                carousel.current.next();
              }}
            />
          </div>
        </div>
      </div>
      <div className={`${cls}-body`}>
        <div className={`${cls}-body-left`}>
          <div className={`${cls}-body-left-tabs`}>
            <Tabs
              defaultActiveKey="0"
              onChange={(key) => {
                change(key);
              }}
            >
              {hot &&
                hot.map((item: any, index: number) => {
                  return (
                    <TabPane tab={item.name} key={index}>
                      {playlist.map((item: any, index: number) => {
                        return (
                          <div key={index} className="item">
                            <img src={item.coverImgUrl} alt="" />
                            <a>{item.name}</a>
                            <div className="item-info">
                              <IconFont type="icon-erji" className="icon" />
                              <span>{item.trackCount}万</span>
                              <PlayCircleOutlined />
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
            </Tabs>
          </div>
          <div className={`${cls}-body-left-newDisc`}>
            {renderNewDisc()}
          </div>
        </div>
        <div className={`${cls}-body-right`}>
          <div className={`${cls}-body-right-login`}>
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <div className="btn">用户登录</div>
          </div>
          <div className={`${cls}-body-right-singer`}>
            <div className={`${cls}-body-right-singer-title`}>
              <div>入住歌手</div>
              <div>查看全部</div>
            </div>
            <div className={`${cls}-body-right-singer-content`}>
              {renderSinger()}
            </div>
            <div className={`${cls}-body-right-singer-foot`}>
              <div className="btn">申请成为网易音乐人</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
