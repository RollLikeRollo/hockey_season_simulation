import React from 'react';
import { GameField } from './games.jsx'
import './scss/playoffs.scss';

export const PlayoffRoundName = ({rounds, index}) => {

    let len = rounds.length
    let round_name = ""
    if (len == index +1) {
        round_name = "Finals"
    }else if (len == index +2) {
        round_name = "Semi-finals"
    }
    else if (len == index +3) {
        round_name = "Quarter-finals"
    }
    else if (len == index +4) {
        round_name = "Round of 16"
    }
    else if (len == index +5) {
        round_name = "Round of 32"
    }

    return (
        <span>{round_name}</span>
    )
}

const Serie = ({pair}) => {


    return (
        <>
        <div className='serie'>
            <div className='team up'>
                <span className='team'>{pair.t1}</span>
                <span className='score'>{pair.t1score}</span>
            </div>
            <div className='team down'>
                <span className='team'>{pair.t2}</span>
                <span className='score'>{pair.t2score}</span>
            </div>
        </div>
        </>
    )
};


const Round = ({round, i, rounds}) => {

    var pairs = [];
    for (var j = 0; j < round.matches.length; j++) {
        let pair = {
            t1: round.matches[j].home,
            t2: round.matches[j].away,
            t1score: 0,
            t2score: 0
        }
        if (!pairs.some(e => e.t1 === pair.t1 && e.t2 === pair.t2)) {
            if(!pairs.some(e => e.t1 === pair.t2 && e.t2 === pair.t1)){
                pairs.push(pair);
            }
        }

        let winner = round.matches[j].away
        if (round.matches[j].home_score > round.matches[j].away_score) {
            winner = round.matches[j].home
        }

        if(pairs.some(e => e.t1 === winner)){
            let ind = pairs.findIndex(e => e.t1 === winner)
            pairs[ind].t1score += 1;
        }else{
            let ind = pairs.findIndex(e => e.t2 === winner)
            pairs[ind].t2score += 1;
        }
    }

    return (
        <>
            <div className='round'>
                <div className='name'>
                    <PlayoffRoundName rounds={rounds} index={i} />
                </div>
                {pairs.map((pair, i) => {
                    return (
                        <Serie i={i} pair={pair} />
                    )
                })}
            </div>
        </>
    )
    
};


export const Playoffs = ({results}) => {

    return (
        <div className="playoffs">
            {results.map((round, i) => {
                return (
                    <Round round={round} i={i} rounds={results} />
                )
            })}
        </div>
    )

};

export const PlayoffPanel = ({results}) => { 
    if (results) {
        return (
            <div className="games_panel">
            <h2>Playoffs</h2>
            <Playoffs results={results}/>
            {results.map((round, index) => {
                return (
                <>
                    <div className="round_panel">
                    <h3><PlayoffRoundName rounds={results} index={index}/></h3>
                        {round.matches.map((match, index) => {
                        return (
                            <GameField key={index} match={match}/>
                            )
                        })}
                    </div>
                </>
                )
            })}
            </div>
        )
    }
}

export default Playoffs;