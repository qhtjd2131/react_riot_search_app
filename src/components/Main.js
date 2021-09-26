import { React, useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Main({ nickName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey] = useState("RGAPI-8c4338af-f685-46e9-9e2d-4471d38fdacf");
  const [userData, setUserData] = useState([]);
  const [leagueV4, setLeagueV4] = useState([]);

  useEffect(() => {
    if (nickName) {
      getSummonerData()
        .then((rsts) => {
          const name = rsts.name;
          const profileIconId = rsts.profileIconId;
          const summonerLevel = rsts.summonerLevel;
          const encryptedId = rsts.id;
          setUserData({
            name: name,
            profileIconId: profileIconId,
            summonerLevel: summonerLevel,
            encryptedId: encryptedId,
          });

          return encryptedId;
        })
        .then((encryptedId) => {
          getLeagueV4(encryptedId)
            .then((rsts) => {
              let rank, tier, leaguePoints, wins, losses;
              if (rsts.length == 1) {
                rank = rsts[0].rank;
                tier = rsts[0].tier;
                leaguePoints = rsts[0].leaguePoints;
                wins = rsts[0].wins;
                losses = rsts[0].losses;
              } else {
                rank = rsts[1].rank;
                tier = rsts[1].tier;
                leaguePoints = rsts[1].leaguePoints;
                wins = rsts[1].wins;
                losses = rsts[1].losses;
              }

              setLeagueV4({
                tier: tier,
                rank: rank,
                leaguePoints: leaguePoints,
                wins: wins,
                losses: losses,
              });

              return rsts;
            })
            .catch((rsts) => {
              console.log("자유랭크 데이터없음");
            });
          setIsLoading(false);
        });
    }
  }, [nickName]);

  const getSummonerData = async () => {
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickName}?api_key=${apiKey}`
    );

    return result.data;
  };

  const getLeagueV4 = async (encryptedId) => {
    const result = await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedId}?api_key=${apiKey}`
    );

    return result.data;
  };

  return (
    <section>
      {nickName ? (
        <div>
          {isLoading ? (
            <div> Loading... </div>
          ) : (
            <div className="user_data">
              {console.log(userData)}
              <div> 이름 : {userData.name} </div>
              <div> 레벨 : {userData.summonerLevel} </div>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${userData.profileIconId}.png`}
                alt="소환사 아이콘"
                title="소환사 아이콘"
              />
              <div> id : {userData.encryptedId} </div>
              <div>
                티어 : {leagueV4.tier} {leagueV4.rank} {leagueV4.leaguePoints}점{" "}
              </div>
              <div> 승 : {leagueV4.wins} </div>
              <div> 패 : {leagueV4.losses} </div>
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
