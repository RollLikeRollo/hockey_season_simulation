import React from "react";

export const GameField = ({match}) => {

    var cls1 = "home"
    var cls2 = "away win"
    if (match.home_score > match.away_score) {
        var cls1 = "home win"
        var cls2 = "away"
    }

    return (
        <div className="game_field">
        <span className={cls1}>{match.home}</span>
        <span className="home_score">{match.home_score}</span>
        <span className="divider">:</span>
        <span className="away_score">{match.away_score}</span>
        <span className={cls2}>{match.away}</span>
        {match.over_time ? <span className="ot">OT</span> : null}
        {match.shootout ? <span className="ot">SO</span> : null}
        </div>
    )
}



export const GamesPanel = ({rounds}) => { 

return (
    <div className="games_panel">
    <h2>Games</h2>
    {rounds.map((round, index) => {
        return (
        <>
        <div className="round_panel">
            <h3>Round {index+1}:</h3>
            {round.matches.map((match, index) => {
                return (
                <GameField match={match}/>
                )
            })}
        </div>
        </>
        )
    })}
    </div>
)
}