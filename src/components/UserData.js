import React from "react";
import "./UserData.css";
import UNRANK from "../images/Emblem_Unranked.png";
import IRON from "../images/Emblem_Iron.png";
import BRONZE from "../images/Emblem_Bronze.png";
import SILVER from "../images/Emblem_Silver.png";
import GOLD from "../images/Emblem_Gold.png";
import PLATINUM from "../images/Emblem_Platinum.png";
import DIAMOND from "../images/Emblem_Diamond.png";
import MASTER from "../images/Emblem_Master.png";
import GRANDMASTER from "../images/Emblem_Grandmaster.png";
import CHALLENGER from "../images/Emblem_Challenger.png";

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
      default:
        result = UNRANK;
    }

    return result;
  }
  const SummonerIcon = () => {
    return (
      <div className="summoner_icon">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${userData.profileIconId}.png`}
          alt="소환사 아이콘"
          title="소환사 아이콘"
        />
      </div>
    );
  };

  const UserName = () => {
    return <div className="name">{userData.name}</div>;
  };

  const UserLevel = () => {
    return <div className="level">Lv.{userData.summonerLevel}</div>;
  };

  const UserSoloRankTier = () => {
    const soloRank = (leagueV4 ?? []).filter(
      (i) => i.queueType === "RANKED_SOLO_5x5"
    );
    if (soloRank.length > 0) {
      const result = getTierImage(soloRank[0].tier);
      return (
        <div className="solorank">
          <div className="tier_img">
            <img src={result} alt={soloRank[0].tier} title={soloRank[0].tier} />
          </div>
          <div className="tier">
            {soloRank[0].tier} {soloRank[0].rank} {soloRank[0].leaguePoints}
            <div className="wins_and_losses">
              <div className="wins"> {soloRank[0].wins}W </div>
              <div className="losses"> {soloRank[0].losses}L </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="solorank">
        <div className="tier_img">
          <img src={getTierImage("unrank")} alt="unrank" title="unrank" />
        </div>

        <div className="tier">
          <div className="wins_and_losses">
            <div className="wins"> 0W </div>
            <div className="losses"> 0L </div>
          </div>
        </div>
      </div>
    );
  };

  const UserFlexRankTier = () => {
    const flexRank = (leagueV4 ?? []).filter(
      (i) => i.queueType === "RANKED_FLEX_SR"
    );
    if (flexRank.length > 0) {
      const result = getTierImage(flexRank[0].tier);
      return (
        <div className="flexrank">
          <div className="tier_img">
            <img src={result} alt={flexRank[0].tier} title={flexRank[0].tier} />
          </div>
          <div className="tier">
            {flexRank[0].tier} {flexRank[0].rank} {flexRank[0].leaguePoints}
            <div className="wins_and_losses">
              <div className="wins"> {flexRank[0].wins}W </div>
              <div className="losses"> {flexRank[0].losses}L </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flexrank">
        <div className="tier_img">
          <img src={getTierImage("unrank")} alt="unrank" title="unrank" />
        </div>

        <div className="tier">
          <div className="wins_and_losses">
            <div className="wins"> 0W </div>
            <div className="losses"> 0L </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="user_data">
      <div className="user_info">
        <SummonerIcon />
        <UserLevel />
        <UserName />
      </div>
      <UserSoloRankTier />
      <UserFlexRankTier />
    </div>
  );
}

export default UserData;
