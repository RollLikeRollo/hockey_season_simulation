import React, { useState, useEffect, useRef } from "react";

import { useMediaQuery } from "react-responsive";
import { TEAMS } from '../data/teams.js'
import { SEASON } from '../data/season.js'
import { Simulate } from './simulate.js'
import DarkModeToggle from './darkmode.jsx'
import Table from './table.jsx'
import './scss/main.scss'





const TeamsPanel = ({cls, teams, saveCountriesState}) => {
  return (
    <div className={cls}>
      <h2>Teams</h2>
      <p> Include teams from: </p>
      <div className="teams_list_div">
        <ul className="team_list_ul">
          {teams.map(({ country }, index) => {
            return (
              <li key={index}>
                <div className="team_list_item">
                  <input
                    type="checkbox"
                    id={`checkbox-${country}`}
                    name={country}
                    value={country}
                    // checked={checkedState[index]}
                    onChange={(e) => saveCountriesState(country, e.target.checked)}
                  />
                  <label htmlFor={`checkbox-${country}`}>{country}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

const SeasonPanel = ({cls, settingState,  saveSettingState }) => {

  const [playoffs_teams, setPlayoffsTeams] = useState(settingState.playoffs_teams);
  const prevPlayoffsTeams = useRef(settingState.playoffs_teams);

  useEffect(() => {
    prevPlayoffsTeams.current = playoffs_teams;
  }, [playoffs_teams])

  const handlePlayoffsNum = (id, value) => {
    
    // max number of teams in playoffs is no in regular
    if (value > settingState.regular_teams) {
      value = settingState.regular_teams
    }
    // number of teams in playoffs must be 2, 4, 8, 16, 32
    let accepted_values = [2, 4, 8, 16, 32, 64]
    if (!accepted_values.includes(Number(value))) {
      if (value >= prevPlayoffsTeams.current){
        value = accepted_values.find((item) => item > value)
      }else{
        value = accepted_values.find(
          (item) => accepted_values.indexOf(item) == accepted_values.indexOf(prevPlayoffsTeams.current) - 1
        )
      }
    }

    setPlayoffsTeams(value)
    saveSettingState(id, value)
  }

  return (
    <div className={cls}>
      <h2>Season</h2>
      <p> Set the season: </p>

      <div className="season_setting">
        <input 
          type="checkbox"
          id="playoffs-checkbox"
          name="playoffs"
          checked={settingState.playoffs}
          onChange={(e) => saveSettingState(e.target.id, e.target.checked)}
          />
        <label htmlFor="playoffs-checkbox">Simulate playoffs</label>
      </div>

      <div className="season_setting">
        <input
          type="number"
          id="bestof-input"
          name="bestof"
          min="1"
          max="7"
          defaultValue={settingState.bestof}
          onChange={(e) => saveSettingState(e.target.name, e.target.value)}
        />
        <label htmlFor="bestof-input">Playoff rounds - Best of</label>
      </div>

      <div className="season_setting">
        <input
          type="number"
          id="matchesagainstsame-input"
          name="matchesagainstsame"
          min="1"
          max="4"
          defaultValue={settingState.matchesagainstsame}
          onChange={(e) => saveSettingState(e.target.name, e.target.value)}
        />
        <label htmlFor="matchesagainstsame-input">Season - matches against same opponent</label>
      </div>

      <div className="season_setting">
        <input
          type="number"
          id="noteams-input"
          name="noteams"
          min="2"
          max="32"
          defaultValue={settingState.regular_teams}
          onChange={(e) => saveSettingState(e.target.name, e.target.value)}
        />
        <label htmlFor="noteams-input">Season - number of teams</label>
      </div>

      <div className="season_setting">
        <input
          type="number"
          id="noteamsplayoffs-input"
          name="noteamsplayoffs"
          min="2"
          max="32"
          value={playoffs_teams}
          onChange={(e) => handlePlayoffsNum(e.target.name, e.target.value)}
        />
        <label htmlFor="noteamsplayoffs-input">Playoffs - number of teams</label>
      </div>      
    </div>
  )
}

const SimulateButton = ({cls, simulate, settingState}) => { 

  useEffect(() => {
    console.log("kkdawflk")
  }, [settingState])

  return (
    <div>
      {/* <button onClick={() => SimulateButtonAction()}>Simulate</button> */}
      <button 
        className='simulate_btn'
        onClick={(e) => simulate(e.target.value)}
        disabled={settingState.countries.length == 0}
        >
          {settingState.countries.length == 0 ? "Select countries" : "Simulate"}
        </button>
    </div>
  )
}

const SettingPanel = ({ teams, season, settingState, saveCountriesState, saveSettingState, simulate }) => {
  return (
    <>
      <div>
        <h1>Hockey season simulator</h1>

        <TeamsPanel cls={'setting_subsection'} teams={teams} saveCountriesState={saveCountriesState} />
        <SeasonPanel cls={'setting_subsection'} settingState={settingState} saveSettingState={saveSettingState} />
        <SimulateButton cls={'setting_subsection'} simulate={simulate} settingState={settingState} />

      </div>
    </>
  )
}

const GameField = ({match}) => { 
  return (
    <div>
      <span>{match.home}</span>
      <span>{match.home_score}</span>
      <span>:</span>
      <span>{match.away_score}</span>
      <span>{match.away}</span>
      {match.over_time ? <span>OT</span> : <span></span>}
      {match.shootout ? <span>SO</span> : <span></span>}
    </div>
  )
}

const PlayoffRoundName = ({rounds, index}) => {

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

const GamesPanel = ({rounds}) => { 

  return (
    <div>
      <h2>Games</h2>
      {rounds.map((round, index) => {
        return (
          <>
          <h3>Round {index+1}:</h3>
            {round.matches.map((match, index) => {
              return (
                <GameField match={match}/>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

const WinnerPanel = ({winner}) => { 
  if (winner) {
    return (
      <div>
        <h2>{winner}</h2>
        <h3>Winner</h3>
      </div>
    )
  }
}

const PlayoffPanel = ({results}) => { 
  if (results) {
    return (
      <div>
        <h2>Playoffs</h2>
        {results.map((round, index) => {
          return (
            <>
            <h3><PlayoffRoundName rounds={results} index={index}/></h3>
              {round.matches.map((match, index) => {
                return (
                  <GameField match={match}/>
                )
              })}
            </>
          )
        })}
      </div>
    )
  }
}

const RegularTable = ({sim_res}) => {

  const cols = React.useMemo(
    () => [
      {
        Header: 'Team',
        accessor: "team",
      },
      {
        Header: 'GP',
        accessor: "games",
      },
      {
        Header: 'W',
        accessor: "w",
      },
      {
        Header: 'L',
        accessor: "l",
      },
      {
        Header: 'OTW',
        accessor: "otw",
      },
      {
        Header: 'OTL',
        accessor: "otl",
      },
      {
        Header: 'PTS',
        accessor: "pts",
      }
    ],
    []
  );

  return(
    <Table columns={cols} data={sim_res.standings} />
  )

}

const RegularPanel = ({sim_res}) => { 

  if (sim_res) {
    return (
      <div>
        <RegularTable sim_res={sim_res}/>
        <GamesPanel rounds={sim_res.rounds} />
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
  }
}

function App() {
  
  const [settingState, setSettingState] = useState({
    regular_teams: 16,
    countries: [],
    playoffs: true,
    bestof: 7,
    matchesagainstsame: 4,
    playoffs_teams: 8,
  })

  const [sim_result, setSimResult] = useState(null)

  const setSettingCountriesHandler = (country, checked) => { 
    var new_settingState = settingState
    if (checked) {
      new_settingState.countries.push(country)
    }
    else { 
      new_settingState.countries = new_settingState.countries.filter((item) => item !== country)
    }
    setSettingState({
      ...settingState,
      countries: new_settingState.countries
    })
    console.log(settingState)
  }

  const setSettingStateHandler = (id, value) => { 
    
    if (id == "playoffs-checkbox") {
      setSettingState({
        ...settingState,
        playoffs: value
      })
    }

    else if (id == "bestof") { 
      setSettingState({
        ...settingState,
        bestof: Number(value)
      })
    }

    else if (id == "matchesagainstsame") { 
      setSettingState({
        ...settingState,
        matchesagainstsame: Number(value)
      })
    }

    else if (id == "noteamsplayoffs") { 
      setSettingState({
        ...settingState,
        playoffs_teams: Number(value)
      })
    }

    else if (id == "noteams") { 
      setSettingState({
        ...settingState,
        regular_teams: Number(value)
      })
    }
  }

  const SimulateButtonAction = (value) => { 
    
    var sim_result = Simulate(settingState)

    setSimResult(sim_result)
      
  }

  return (
    <>
      <div className="dark_toggle">
        <DarkModeToggle />
      </div>
      <div className='setting_panel'> 
        <SettingPanel
          teams={TEAMS}
          results={SEASON}
          settingState={settingState}
          saveCountriesState={setSettingCountriesHandler}
          saveSettingState={setSettingStateHandler}
          simulate={SimulateButtonAction}
        />
      </div>
      <div className='simulation_panel'>
        <WinnerPanel winner={sim_result ? sim_result.winner : null } />
        <PlayoffPanel results={sim_result ? sim_result.playoffs : null} />
        <RegularPanel
          sim_res={sim_result}
        />
      </div>
      
    </>
  )
}

export default App
