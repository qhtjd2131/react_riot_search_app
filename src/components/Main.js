import { React, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Match from "./Match.js";
import "./Main.css";

function Main({ nickName }) {
  const apiKey = "RGAPI-50b5616b-5017-4888-b2d7-629165125318--";
  const matchNumber = 3; //화면에 보여질 전적 갯수
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [leagueV4, setLeagueV4] = useState([]);
  const [matchInfo, setMatchInfo] = useState();
  const [queueIdInfo, setQueueIdInfo] = useState();
  const [spellInfo, setSpellInfo] = useState();
  const [isNetworkError, setIsNetworkError] = useState(false);

  //   const getSummonerData = async () => {
  //     await axios
  //       .get(
  //         `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
  //       )
  //       .then((result) => {
  //         return result.data;
  //       });
  //   };
  const getSummonerData = async () => {
    console.log("getSummonerData() 1");
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
    );
    console.log("getSummonerData() 2");
    return result.data;
  };

  const getLeagueV4 = async (encryptedId) => {
    console.log("getLeagueV4()");
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${apiKey}`
    );
    return result.data;
  };

  const getMatchId = async (puuid) => {
    console.log("getMatchId()");
    const result = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${matchNumber}&api_key=${apiKey}`
    );

    return result.data;
  };

  const getMatchInfo = async (matchlist) => {
    console.log("getMatchInfo()");
    const matchinfos = await Promise.all(
      matchlist.map(async (match) => {
        const result = await axios.get(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${apiKey}`
        );

        return result.data;
      })
    );

    return matchinfos;
  };

  const getQueueIdJson = async () => {
    await axios
      .get(`https://static.developer.riotgames.com/docs/lol/queues.json`)
      .then((response) => {
        setQueueIdInfo(response.data);
      });
  };

  const getSpellInfoJson = async () => {
    await axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/summoner.json`
      )
      .then((response) => {
        setSpellInfo(response.data);
      });
  };

  useEffect(() => {
    if (nickName) {
      getQueueIdJson(); //큐 JSON 가져오기
      getSpellInfoJson(); //스펠 JSON 가져오기
      getSummonerData()
        .then((rsts) => {
          setUserData({ ...rsts });
          return rsts;
        })
        .then((rsts) => {
          getLeagueV4(rsts.id)
            .then((rsts) => {
              if (rsts[0].queueType === "RANKED_SOLO_5x5") {
                setLeagueV4({ ...rsts[0] });
              } else if (rsts[1].queueType === "RANKED_SOLO_5x5") {
                setLeagueV4({ ...rsts[1] });
              }
            })
            .catch(() => {
              console.log("랭크 데이터없음");
            });

          getMatchId(rsts.puuid).then((matchList) => {
            getMatchInfo(matchList)
              .then((matchinfos) => {
                setMatchInfo(matchinfos);
              })
              .then(() => {
                setIsLoading(false);
              });
          });
        })
        .catch((error) => {
          //   console.log("api 호출 실패!", error);

          setIsLoading(false);
          setIsNetworkError(true);
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }, [nickName]);

  //   useEffect(() => {
  //     if (matchList) {
  //       console.log("useeffect second with match list   ");

  //       getMatchInfo().then((matchinfos) => {
  //         setMatchInfo(...matchinfos);
  //         console.log("2", matchinfos);
  //       });
  //     }
  //   }, [matchList]);

  //   useEffect(() => {
  //     if (matchInfo) {
  //       console.log("useeffect third with match info");
  //       console.log("3" + matchInfo);
  //     }
  //   }, [matchInfo]);

  return (
    <section>
      {nickName ? (
        <div>
          {isLoading ? (
            <div className="loader"> Loading... </div>
          ) : (
            <div>
              {isNetworkError ? (
                <div>
                  데이터를 불러오지 못하였습니다. 관리자에게 문의해주세요.
                </div>
              ) : (
                <div>
                  <div className="user_data">
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${userData.profileIconId}.png`}
                      alt="소환사 아이콘"
                      title="소환사 아이콘"
                    />
                    <div className="user_data_info">
                      <div className="user_data_info_name">
                        이름 : {userData.name}
                      </div>
                      <div> 레벨 : {userData.summonerLevel} </div>

                      <div>
                        티어 : {leagueV4.tier} {leagueV4.rank}{" "}
                        {leagueV4.leaguePoints}점
                      </div>
                      <div className="winorloss">
                        <div> 승 : {leagueV4.wins} </div>
                        <div> 패 : {leagueV4.losses} </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      {(matchInfo ?? []).map((match) => {
                        return (
                          <Match
                            key={match.info.gameId}
                            info={match.info}
                            queueIdInfoJson={queueIdInfo}
                            spellInfoJson={spellInfo}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="searcher"> 검색해주세요 </div>
      )}
    </section>
  );
}
export default Main;
