import React from "react";
import "./Match.css";

function Match({ info, queueIdInfoJson }) {
  console.log("info :", info);

  function millisecond_to_minute_second(millisecond) {
    if (millisecond) {
      const minute = parseInt(millisecond / 60000);
      const second = parseInt((millisecond % 60000) / 1000);
      const result = minute + "분 " + second + "초";

      return result;
    }
  }
  function did_win(first_user_in_team) {
    if (info.participants[first_user_in_team].win) {
      return "승 리";
    } else {
      return "패 배";
    }
  }

  function getQueueType() {
    const result = queueIdInfoJson.filter((i) => i.queueId === info.queueId);
    return result[0].description;
  }

  function getItemInfo(item) {
    if (item > 0) {
      return (
        <img
          className="item"
          src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${item}.png`}
          alt="item"
          title="item"
        />
      );
    } else {
      return <img className="item" alt="" title="null item"></img>;
    }
  }

  function getSpellInfo() {}

  function getTime_didPlay() {
    const currentTime_Object = new Date();
    const currentTime = currentTime_Object.getTime();

    const time_dp = currentTime - info.gameStartTimestamp - info.gameDuration;
    const result = millisecond_to_minute_second(time_dp) + " 전에 게임종료";

    return result;
  }

  const Team = (start, end) => {
    return info.participants
      .map((participant) => (
        <div key={participant.summonerName}>
          <div className="summoner_data">
            <img
              className="champion_image"
              src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${participant.championName}.png`}
              alt={participant.championName}
              title={participant.championName}
            />
            <div className="summoner_name">{participant.summonerName}</div>
            <div className="summoner_kda">
              {participant.kills}/{participant.deaths}/{participant.assists}
            </div>
            <div className="item_container">
              {getItemInfo(participant.item0)}
              {getItemInfo(participant.item1)}
              {getItemInfo(participant.item2)}
              {getItemInfo(participant.item3)}
              {getItemInfo(participant.item4)}
              {getItemInfo(participant.item5)}
              {getItemInfo(participant.item6)}
            </div>
          </div>
        </div>
      ))
      .slice(start, end);
  };

  return (
    <div>
      <div className="gamemode">match mode : {info.gameMode}</div>
      <div className="gameduration">
        게임시간 : {millisecond_to_minute_second(info.gameDuration)}
      </div>
      <div className="time_dp">{getTime_didPlay()}</div>
      <div className="queueType"> 큐 타입 : {getQueueType()}</div>
      <div className="team">
        <div className="teamA">
          <div className="win_or_loss">{did_win(0)}</div>
          {Team(0, 5)}
        </div>

        <div className="teamB">
          <div className="win_or_loss">{did_win(5)}</div>
          {Team(5, 10)}
        </div>
      </div>
    </div>
  );
}

export default Match;
