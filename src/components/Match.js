import React from "react";
import "./Match.css";

function Match(info) {
  console.log(info);

  function millisecond_to_minute_second(millisecond) {
    if (millisecond) {
      const minute = parseInt(millisecond / 60000);
      const second = parseInt((millisecond % 60000) / 1000);
      const result = minute + "분 " + second + "초";

      return result;
    }
  }
  function did_win(first_user_in_team) {
    if (info.info.participants[first_user_in_team].win) {
      return "승 리";
    } else {
      return "패 배";
    }
  }

  const Team = (start, end) => {
    return info.info.participants
      .map((participant) => (
        <div key={participant.summonerName}>
          <img
            className="champion_image"
            src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${participant.championName}.png`}
            alt="챔피언"
            title="챔피언"
          />
          {participant.summonerName} {participant.kills}/{participant.deaths}/
          {participant.assists}
        </div>
      ))
      .slice(start, end);
  };
  return (
    <div>
      <div className="gamemode">match mode : {info.info.gameMode}</div>
      <div className="gameduration">
        게임시간 : {millisecond_to_minute_second(info.info.gameDuration)}
      </div>
      <div className="team">
        <div className="teamA">
          <div className="win_or_loss">{did_win(0)}</div>
          {Team(0, 5)}
        </div>
        <div className="vs">vs</div>
        <div className="teamB">
          <div className="win_or_loss">{did_win(5)}</div>
          {Team(5, 10)}
        </div>
      </div>
    </div>
  );
}

export default Match;
