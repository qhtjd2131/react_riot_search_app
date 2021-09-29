import { React, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Match from "./Match.js";
import "./Main.css";

function Main({ nickName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey] = useState("RGAPI-e7853e74-3322-43ad-86f8-0369a5e92f8c");
  const [userData, setUserData] = useState([]);
  const [leagueV4, setLeagueV4] = useState([]);
  const [matchInfo, setMatchInfo] = useState();
  const [queueIdInfo, setQueueIdInfo] = useState();

  const getSummonerData = useCallback(async () => {
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
    );

    return result.data;
  }, [nickName, apiKey]);

  const getLeagueV4 = async (encryptedId) => {
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${apiKey}`
    );

    return result.data;
  };

  const getMatchId = async (puuid) => {
    const result = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${apiKey}`
    );

    return result.data;
  };

  const getMatchInfo = async (matchlist) => {
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

  //   useEffect(() => {
  //     setTest("first useEffect");
  //   }, []);

  //   useEffect(() => {
  //     console.log("1", test);
  //     if (test) {
  //       console.log("2", test);
  //       setTest("second useEffect");
  //     }
  //   }, [test]);

  //   useEffect(() => {
  //     getSummonerData().then((id) => {
  //       setEncryptedId(id);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log(encryptedId);
  //     if (encryptedId) {
  //       getLeagueV4(encryptedId).then((rsts) => {
  //         console.log(rsts);
  //         if (rsts[0].queueType === "RANKED_SOLO_5x5") {
  //           setLeagueV4({
  //             ...rsts[0],
  //           });
  //         } else if (rsts[1].queueType === "RANKED_SOLO_5x5") {
  //           setLeagueV4({
  //             ...rsts[1],
  //           });
  //         }
  //       });
  //     }
  //   }, [encryptedId]);

  useEffect(() => {
    console.log("useeffect first");
    if (nickName) {
      getQueueIdJson();
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
            <div> Loading... </div>
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
                      />
                    );
                  })}
                </div>
              </div>
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
