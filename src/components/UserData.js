import React from "react";
import "./UserData.css";

function UserData({ userData, leagueV4 }) {
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

  const UserTier = () => {
    if (leagueV4.tier) {
      return (
        <div className="user_data_info_tier">
          티어 : {leagueV4.tier} {leagueV4.rank}
          {leagueV4.leaguePoints}점
        </div>
      );
    }

    return <div className="user_data_info_tier">티어 : 언랭</div>;
  };

  const UserWinsAndLosses = () => {
    if (leagueV4.wins || leagueV4.losses) {
      return (
        <div className="wins_and_losses">
          <div> (솔로랭크) 승 : {leagueV4.wins} </div>
          <div> 패 : {leagueV4.losses} </div>
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
  return (
    <div className="user_data">
      <SummonerIcon />
      <div className="user_data_info">
        <UserName />
        <UserLevel />
        <UserTier />
        <UserWinsAndLosses />
      </div>
    </div>
  );
}

export default UserData;
