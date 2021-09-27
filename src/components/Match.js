import React from "react";
import "./Match.css";

function Match(info) {
  console.log("hello im match component");
  console.log(info);

  const Team = (start, end) => {
    return;
  };
  return (
    <div>
      <div className="gamemode">match mode : {info.info.gameMode}</div>
      <div className="team">
        <div className="teamA">
          {info.info.participants
            .map((participant) => (
              <div>
                <img
                  className="champion_image"
                  src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${participant.championName}.png`}
                  alt="챔피언"
                  title="챔피언"
                />
                {participant.summonerName} {participant.kills}/
                {participant.deaths}/{participant.assists}
              </div>
            ))
            .slice(0, 5)}
        </div>
        <div>vs</div>
        <div className="teamB">
          {info.info.participants
            .map((participant) => (
              <div>
                <img
                  className="champion_image"
                  src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${participant.championName}.png`}
                  alt="챔피언"
                  title="챔피언"
                />
                {participant.summonerName} {participant.kills}/
                {participant.deaths}/{participant.assists}
              </div>
            ))
            .slice(5, 10)}
        </div>
      </div>
    </div>
  );
}

export default Match;
