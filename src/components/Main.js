import { React, useEffect, useState } from "react";
import axios from "axios";

function Main({ nickName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey] = useState("RGAPI-8c4338af-f685-46e9-9e2d-4471d38fdacf");
  const [userData, setUserData] = useState([]);
  const [leagueV4, setLeagueV4] = useState([]);

  useEffect(() => {
    if (nickName) {
      console.log(nickName);

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
          getLeagueV4(encryptedId).then((rsts) => {
            const rank = rsts[0].rank;
            const tier = rsts[0].tier;
            const leaguePoints = rsts[0].leaguePoints;
            const wins = rsts[0].wins;
            const losses = rsts[0].losses;

            setLeagueV4({
              tier: tier,
              rank: rank,
              leaguePoints: leaguePoints,
              wins: wins,
              losses: losses,
            });
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
            <div>
              <div> 이름 : {userData.name} </div>
              <div> 레벨 : {userData.summonerLevel} </div>
              <div> icon : {userData.profileIconId} </div>
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
