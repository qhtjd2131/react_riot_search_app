import { React, useEffect, useState } from "react";
import axios from "axios";
import Match from "./Match.js";
import "./Main.css";
import UserData from "./UserData.js";

function Main({ nickName }) {
  const apiKey = "RGAPI-9bcee12c-249f-4452-95ed-c4dacb096b38";
  const matchNumber = 3; //화면에 보여질 전적 갯수
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [leagueV4, setLeagueV4] = useState([]);
  const [matchInfo, setMatchInfo] = useState([]);
  const [queueIdInfo, setQueueIdInfo] = useState();
  const [spellInfo, setSpellInfo] = useState();
  const [exactName, setExactName] = useState("");

  useEffect(() => {
    const getSummonerData = async () => {
      // console.log("getSummonerData() 1");
      const result = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
      );
      // console.log("getSummonerData() 2");
      return result.data;
    };

    const getLeagueV4 = async (encryptedId) => {
      // console.log("getLeagueV4()");
      const result = await axios.get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${apiKey}`
      );
      return result.data;
    };

    const getMatchId = async (puuid) => {
      // console.log("getMatchId()");
      const result = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${matchNumber}&api_key=${apiKey}`
      );

      return result.data;
    };

    const getMatchInfo = async (matchlist) => {
      // console.log("getMatchInfo()");
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
          `https://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/summoner.json`
        )
        .then((response) => {
          setSpellInfo(response.data);
        });
    };

    if (nickName) {
      setIsLoading(true);
      setIsNetworkError(false);
      getQueueIdJson(); //큐 JSON 가져오기
      getSpellInfoJson(); //스펠 JSON 가져오기
      getSummonerData()
        .then((rsts) => {
          setExactName(rsts.name);
          setUserData({ ...rsts });
          return rsts;
        })
        .then((rsts) => {
          getLeagueV4(rsts.id)
            .then((rsts) => {
              setLeagueV4(rsts);
            })
            .catch(() => {
              setLeagueV4([]);
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
          setIsLoading(false);
          setIsNetworkError(true);
          console.log(error.config);
        });
    }
  }, [nickName]);

  return (
    <section className="main_container">
      {nickName ? (
        <>
          {isLoading ? (
            <div className="loader"> Loading... </div>
          ) : (
            <>
              {isNetworkError ? (
                <div>
                  데이터를 불러오지 못하였습니다. 소환사 이름을 확인하거나
                  관리자에게 문의해주세요.
                </div>
              ) : (
                <div>
                  <UserData userData={userData} leagueV4={leagueV4} />
                  <div className="match_container">
                    {matchInfo.map((match) => {
                      return (
                        <Match
                          key={match.info.gameId}
                          exactName={exactName}
                          info={match.info}
                          queueIdInfoJson={queueIdInfo}
                          spellInfoJson={spellInfo}
                        />
                      );
                    })}
                    {matchInfo.length === 0 && (
                      <div className="cant_find_match"> 매치 데이터 없음 </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="searcher">검색해주세요</div>
      )}
    </section>
  );
}
export default Main;
