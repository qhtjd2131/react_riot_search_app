import React from "react";
import "./UserData.css";
import IRON from "./Emblem_Iron.png";
import BRONZE from "./Emblem_Bronze.png";
import SILVER from "./Emblem_Silver.png";
import GOLD from "./Emblem_Gold.png";
import PLATINUM from "./Emblem_Platinum.png";
import DIAMOND from "./Emblem_Diamond.png";
import MASTER from "./Emblem_Master.png";
import GRANDMASTER from "./Emblem_Grandmaster.png";
import CHALLENGER from "./Emblem_Challenger.png";

function UserData({ userData, leagueV4 }) {
  function getTierImage(soloRankTier) {
    let result = undefined;
    switch (soloRankTier) {
      case "IRON":
        result = IRON;
        break;
      case "SILVER":
        result = SILVER;
        break;
      case "BRONZE":
        result = BRONZE;
        break;
      case "GOLD":
        result = GOLD;
        break;
      case "PLATINUM":
        result = PLATINUM;
        break;
      case "DIAMOND":
        result = DIAMOND;
        break;
      case "MASTER":
        result = MASTER;
        break;
      case "GRANDMASTER":
        result = GRANDMASTER;
        break;
      case "CHALLENGER":
        result = CHALLENGER;
        break;
    }

    return result;
  }
  const SummonerIcon = () => {
    return (
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${userData.profileIconId}.png`}
        alt="소환사 아이콘"
        title="소환사 아이콘"
      />
    );
  };

  const UserName = () => {
    return <div className="user_data_info_name">이름 : {userData.name}</div>;
  };

  const UserLevel = () => {
    return (
      <div className="user_data_info_level">
        레벨 : {userData.summonerLevel}
      </div>
    );
  };

  const UserSoloRankTier = () => {
    const soloRank = (leagueV4 ?? []).filter(
      (i) => i.queueType == "RANKED_SOLO_5x5"
    );
    if (soloRank.length > 0) {
      const result = getTierImage(soloRank[0].tier);
      return (
        <div className="user_data_info_tier">
          솔랭티어 : {soloRank[0].tier} {soloRank[0].rank}
          {soloRank[0].leaguePoints}점
          <img src={result} alt={soloRank[0].tier} title={soloRank[0].tier} />
        </div>
      );
    }

    return <div className="user_data_info_tier">솔랭티어 : 언랭</div>;
  };

  const UserFlexRankTier = () => {
    const flexRank = (leagueV4 ?? []).filter(
      (i) => i.queueType == "RANKED_FLEX_SR"
    );
    if (flexRank.length > 0) {
      const result = getTierImage(flexRank[0].tier);
      return (
        <div className="user_data_info_tier">
          자랭티어 : {flexRank[0].tier} {flexRank[0].rank}
          {flexRank[0].leaguePoints}점
          <img src={result} alt={flexRank[0].tier} title={flexRank[0].tier} />
        </div>
      );
    }

    return <div className="user_data_info_tier">자랭티어 : 언랭</div>;
  };

  const UserSoloRankWinsAndLosses = () => {
    const soloRank = (leagueV4 ?? []).filter(
      (i) => i.queueType == "RANKED_SOLO_5x5"
    );

    if (soloRank.length > 0) {
      return (
        <div className="wins_and_losses">
          <div> (솔로랭크) 승 : {soloRank[0].wins} </div>
          <div> 패 : {soloRank[0].losses} </div>
        </div>
      );
    }
    return (
      <div className="wins_and_losses">
        <div> (솔로랭크) 승 : 0 </div>
        <div> 패 : 0 </div>
      </div>
    );
  };

  const UserFlexRankWinsAndLosses = () => {
    const flexRank = (leagueV4 ?? []).filter(
      (i) => i.queueType == "RANKED_FLEX_SR"
    );

    if (flexRank.length > 0) {
      return (
        <div className="wins_and_losses">
          <div> (자유랭크) 승 : {flexRank[0].wins} </div>
          <div> 패 : {flexRank[0].losses} </div>
        </div>
      );
    }
    return (
      <div className="wins_and_losses">
        <div> (자유랭크) 승 : 0 </div>
        <div> 패 : 0 </div>
      </div>
    );
  };
  return (
    <div className="user_data">
      <SummonerIcon />
      <div className="user_data_info">
        <UserName />
        <UserLevel />
        <UserSoloRankTier />
        <UserFlexRankTier />
        <UserSoloRankWinsAndLosses />
        <UserFlexRankWinsAndLosses />
      </div>
    </div>
  );
}

export default UserData;
