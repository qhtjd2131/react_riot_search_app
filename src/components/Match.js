import React from "react";
import "./Match.css";

function Match({ exactName, info, queueIdInfoJson, spellInfoJson }) {
  didSummonerWin();
  function millisecond_to_minute_second(millisecond) {
    if (millisecond) {
      const minutes = parseInt(millisecond / 60000);
      const seconds = parseInt((millisecond % 60000) / 1000);

      let result = 0;
      if (minutes > 59) {
        const hours = parseInt(minutes / 60);
        result = hours + " hours ";
      } else {
        result = minutes + "m " + seconds + "s ";
      }
      return result;
    }
  }

  

  function didSummonerWin() {
    const participants = info.participants;
    const result = participants.filter((i) => i.summonerName === exactName);
    const result2 = { ...result[0] };

    if (result2.win) {
      return <div className="match_header_win">WIN</div>;
    } else {
      return <div className="match_header_loss">LOSS</div>;
    }
  }
  function whichTeamWin(first_user_in_team) {
    if (info.participants[first_user_in_team].win) {
      return true;
    } else {
      return false;
    }
  }

  function getQueueType() {
    const result = queueIdInfoJson.filter((i) => i.queueId === info.queueId);

    const queueId = info.queueId;
    if (queueId === 420) {
      return "SOLO RANK";
    } else if (queueId === 430) {
      return "NORMAL";
    } else if (queueId === 440) {
      return "FLEX RANK";
    } else if (queueId === 900) {
      return "URF";
    } else if (queueId === 450) {
      return "Howling Abyss";
    }
    return result[0].description;
  }

  function getItemInfo(item) {
    if (item > 0) {
      return (
        <img
          className="item"
          src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${item}.png`}
          alt="item"
          title="item"
        />
      );
    } else {
      return <img className="item" alt="" title="null item"></img>;
    }
  }

  function getSpellInfo(participant) {
    const result = Object.entries(spellInfoJson.data).map((a) => a[1]);
    const result2 = result.filter((i) => {
      return parseInt(i.key) === participant.summoner1Id;
    })[0];
    const result3 = result.filter(
      (i) => parseInt(i.key) === participant.summoner2Id
    )[0];

    return (
      <div className="spell_image_container">
        <img
          className="spell_image"
          src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${result2.id}.png`}
          alt="spell_1"
          title={result2.id}
        />
        <img
          className="spell_image"
          src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/${result3.id}.png`}
          alt="spell_2"
          title={result3.id}
        />
      </div>
    );
  }

  function getTime_didPlay() {
    const currentTime_Object = new Date();
    const currentTime = currentTime_Object.getTime();

    const time_dp = currentTime - info.gameStartTimestamp - info.gameDuration;
    const result = millisecond_to_minute_second(time_dp) + "ago";

    return result;
  }

  const Team = (start, end) => {
    return info.participants
      .map((participant) => (
        <div key={participant.summonerName}>
          <div className="summoner_data">
            <img
              className="champion_image"
              src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${participant.championName}.png`}
              alt={participant.championName}
              title={participant.championName}
            />
            {getSpellInfo(participant)}
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
    <div className="match">
      <div className="match_header">
        {didSummonerWin()}
        <div className="center">
          <div className="queueType"> {getQueueType()}</div>
          <div className="gameduration">
            {millisecond_to_minute_second(info.gameDuration)}
          </div>
        </div>
        <div className="time_dp">{getTime_didPlay()}</div>
      </div>
      <div className="team">
        <div className="teamA">
          <div className={whichTeamWin(0) ? "winner" : "looser"}>
            {Team(0, 5)}
          </div>
        </div>

        <div className="teamB">
          <div className={whichTeamWin(5) ? "winner" : "looser"}>
            {Team(5, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
