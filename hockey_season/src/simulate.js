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
                teams.push(random_team);
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


    console.log("Season simulation finished.");
    return 1667;
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

function SimulateRegularSeason(season, no_teams, countries, matches_agnst_same) {

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

    const SimulateRound = (teams, i) => { 

        var round = {
            number: i,
            matches: []
        }

        for (let j = 0; j < teams.length / 2; j++) { 
            // if (i % 2 == 0) {
            //     var home = teams[j];
            //     var away = teams[teams.length - j - 1];
            //     var match = SimulateMatch(home, away);
            // }
            // else { 
            //     var home = teams[teams.length - j - 1];
            //     var away = teams[j];
            //     var match = SimulateMatch(home, away);
            // }
            var home = teams[j];
            var away = teams[teams.length - j - 1];
            var match = SimulateMatch(home, away);
            round.matches.push(match);
        }

        return round;
    }

    var no_rounds = (no_teams - 1)
    var rounds = [];

    var teams = season.teams;

    for (let k = 0; k < matches_agnst_same; k++) { 
        for (let i = 0; i < no_rounds; i++) {
            rounds.push(SimulateRound(teams, i));
            teams.splice(1, 0, teams[teams.length - 1]);
            teams.pop();
        }

    }

    function generateRounds() {
        for (i = 0; i < numberOfRounds; i++) {
            document.write('<h1 class="round">' + 'Round ' + (i + 1) + '</h1>');
          
            for (var j = 0; j < players.length / 2; j++) {
                document.write('<div class="match">' + players[j].playerName + " - " + players[players.length - 1 - j].playerName + '</div>');
            }
      
            players.splice(1, 0, players[15]);
            players.pop();
        }
    }

    season.rounds = rounds;

    console.log(season);
}