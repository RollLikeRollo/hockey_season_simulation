/**
 * @fileoverview Contains functions for simulation of the season.
 * @author Jan Zboril
 * @date 2023-09-01
 */

import { TEAMS } from "../data/teams.js";

/**
 * Description placeholder
 * @date 9/1/2023 - 2:26:16 PM
 *
 * @param {*} settings
 * @returns {number}
 */
export const Simulate = (settings) => {

    function pickTeams(no_teams, countries) {
        
        // select the number of teams from each country randomly
        var teams = [];
        for (let i = 0; i < countries.length; i++) {
            var country = countries[i];
            var teams_from_country = TEAMS.find(team => team.country === country).teams;
            for (let j = 0; j < ((no_teams/countries.length)); j++) {
                var random_team = teams_from_country[Math.floor(Math.random() * teams_from_country.length)];
                if (teams.includes(random_team)) {
                    j--;
                }else{
                    teams.push(random_team);
                }
            }
        }
        while (teams.length > no_teams) { 
            teams.pop();
        }
        if (teams.length % 2 != 0) { 
            teams.push("EVENFILLER")
        }
        return teams;
    }

    console.log("Simulating the season...");

    var season = {
        teams: pickTeams(settings.regular_teams, settings.countries)
    };

    SimulateRegularSeason(season, settings.regular_teams, settings.countries, settings.matchesagainstsame);

    if (settings.playoffs) {
        SimulatePlayoffs(season, settings.playoffs_teams, settings.bestof);
    }


    console.log("Season simulation finished.");
    console.log(season);
    return season;
}

function SimulatePlayoffs(season, no_teams, best_of) {
    console.log("Simulating playoffs...");

    var must_win = Math.floor(best_of / 2) + 1;
    console.log("Must win: " + must_win);

    var teams = season.standings.slice(0, no_teams);
    teams = teams.map(team => team.team);

    var rounds = [];

    // for quarterfinals, semifinals, finals
    var tiers = Math.log2(no_teams);
    for (let i = 0; i < tiers; i++) {
        rounds.push({
            number: i,
            matches: []
        });

        console.log("Round: " + i);

        var round_winners = [];

        var no_teams_round = teams.length;

        // for a round
        for (let j = 0; j < no_teams_round / 2; j++) {

            var serie_wins = {};
            
            // for a matches betwwen two teams
            for (let k = 0; k < best_of; k++) {
                var home = teams[j];
                var away = teams[teams.length - j - 1];
                if (k % 2 == 0) {
                    var away = teams[j];
                    var home = teams[teams.length - j - 1];
                }
                var match = SimulateMatch(home, away);
                rounds[i].matches.push(match);
                
                if (match.home_score > match.away_score) {
                    serie_wins[home] = serie_wins[home] ? serie_wins[home] + 1 : 1;
                }else{
                    serie_wins[away] = serie_wins[away] ? serie_wins[away] + 1 : 1;
                }

                if(serie_wins[home] == must_win || serie_wins[away] == must_win) {
                    if (serie_wins[home] == must_win) {
                        round_winners.push(home);
                    }else{
                        round_winners.push(away);
                    }
                    break;
                }
            }
        }

        // update teams who advanced to next round
        teams = round_winners;
        no_teams_round = teams.length;

    }

    season.winner = teams[0];
    season.playoffs = rounds;

    console.log("Playoffs simulation finished.");

    return
}


function ExponentialRandom(mean) { 
    return (mean * Math.E ** (-Math.log(1 - Math.random())));
}

function GenerateScore() { 
    var num = ExponentialRandom(1);
    num = Math.floor(num);
    num += Math.floor(Math.random()*5);
    while (num > 25) {
        num = ExponentialRandom(1);
        num = Math.floor(num);
        num += Math.floor(Math.random()*5);
    }
    return num;
}

const SimulateMatch = (home, away) => { 
    var match = {
        home: home,
        away: away,
        home_score: GenerateScore(),
        away_score: GenerateScore(),
        over_time: false,
        shootout: false
    }
    if (match.home_score == match.away_score) { 
        let who = Math.floor(Math.random() * 2);
        if (who == 0) {
            match.home_score++;
        }
        else { 
            match.away_score++;
        }
        who = Math.floor(Math.random() * 2);
        if (who == 0) {
            match.over_time = true;
        }
        else { 
            match.shootout = true;
        }
    }

    return match;
}

function SimulateRegularSeason(season, no_teams, countries, matches_agnst_same) {

    const SimulateRound = (teams, i, standings) => { 

        var round = {
            number: i,
            matches: []
        }

        for (let j = 0; j < teams.length / 2; j++) { 
            var home = teams[j];
            var away = teams[teams.length - j - 1];    
            
            if (home === "EVENFILLER" || away === "EVENFILLER") {
                continue;
            }

            if (i % 2 == 0) {
                var away = teams[j];
                var home = teams[teams.length - j - 1];
            }
            var match = SimulateMatch(home, away);

            round.matches.push(match);

            // update standings
            let winner = "";
            let loser = "";
            if (match.home_score > match.away_score) {
                winner = match.home;
                loser = match.away;
            }else{
                winner = match.away;
                loser = match.home;
            }
            if (match.over_time || match.shootout) {
                standings[winner].otw++;
                standings[loser].otl++;
                standings[winner].pts += 2;
                standings[loser].pts += 1;
            }else{
                standings[winner].w++;
                standings[loser].l++;
                standings[winner].pts += 3;
            }
            standings[winner].games += 1;
            standings[loser].games += 1;
        }

        return round;
    }

    var no_rounds = (no_teams - 1)
    var rounds = [];

    var teams = season.teams;
    var standings = {}
    teams.forEach(team => {
        standings[team] = {
            team: team,
            w: 0,
            l: 0,
            otw: 0,
            otl: 0,
            pts: 0,
            games: 0,
        };
    })

    for (let k = 0; k < matches_agnst_same; k++) {
        for (let i = 0; i < no_rounds; i++) {
            rounds.push(SimulateRound(teams, i, standings));
            teams.splice(1, 0, teams[teams.length - 1]);
            teams.pop();
        }

    }

    var standings_array = [];
    for (const [key, value] of Object.entries(standings)) {
        standings_array.push(value);
    }
    standings_array.sort((a, b) => (a.pts < b.pts) ? 1 : -1);
    const i = standings_array.findIndex(team => team.team === "EVENFILLER");
    if (i > -1) {
        standings_array.splice(i, 1);
    }

    season.rounds = rounds;
    season.standings = standings_array;
}