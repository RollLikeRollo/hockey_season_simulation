import React, { useState, useEffect } from "react";
import Toggle from 'react-toggle';
import { useMediaQuery } from "react-responsive";
import { TEAMS } from '../data/teams.js'
import { SEASON } from '../data/season.js'
import { Simulate } from './simulate.js'
import './scss/main.scss'
import "react-toggle/style.css";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDark(isSystemDark)
  );

  useEffect(() => { 
    if (isDark) { 
      document.body.classList.add('dark')
    }
    else { 
      document.body.classList.remove('dark')
    }
   }, [isDark]);

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => setIsDark(target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};



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
  return (
    <div className={cls}>
      <h2>Season</h2>
      <p> Set the season: </p>

      <input 
        type="checkbox"
        id="playoffs-checkbox"
        name="playoffs"
        checked={settingState.playoffs}
        onChange={(e) => saveSettingState(e.target.id, e.target.checked)}
      />
      <label htmlFor="playoffs-checkbox">Simulate playoffs</label>

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

      <input
        type="number"
        id="noteamsplayoffs-input"
        name="noteamsplayoffs"
        min="2"
        max="32"
        defaultValue={settingState.playoffs_teams}
        onChange={(e) => saveSettingState(e.target.name, e.target.value)}
      />
      <label htmlFor="noteamsplayoffs-input">Playoffs - number of teams</label>
      
    </div>
  )
}

const SimulateButton = ({cls, simulate}) => { 

  return (
    <div>
      {/* <button onClick={() => SimulateButtonAction()}>Simulate</button> */}
      <button className='simulate_btn' onClick={(e) => simulate(e.target.value)}>Simulate</button> 
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
        <SimulateButton cls={'setting_subsection'} simulate={simulate} />

      </div>
    </>
  )
}

const GameField = () => { 
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Team 1</td>
            <td>Score 1</td>
            <td>Score 2</td>
            <td>Team 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const GamesPanel = () => { 
  return (
    <div>
      <h2>Games</h2>
      <GameField />
      <GameField />
      <GameField />
    </div>
  )
}

const WinnerPanel = () => { 
  return (
    <div>
      <h2>Winner</h2>
      <p> Winner of the season </p>
    </div>
  )
}

const PlayoffPanel = () => { 
  return (
    <div>
      <h2>Playoffs</h2>
      <p> Playoffs </p>
    </div>
  )
}

const RegularPanel = () => { 
  return (
    <>
      <div>
        <h2>Regular season</h2>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>W</th>
              <th>L</th>
              <th>OTL</th>
              <th>OTW</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Team 1</td>
              <td>10</td>
              <td>5</td>
              <td>2</td>
              <td>1</td>
              <td>35</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <GamesPanel />
      </div>
    </>
  )
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

  const setSettingCountriesHandler = (country, checked) => { 
    var new_settingState = settingState
    if (checked) {
      new_settingState.countries.push(country)
    }
    else { 
      new_settingState.countries = new_settingState.countries.filter((item) => item !== country)
    }
    setSettingState(new_settingState)
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
    console.log(sim_result)
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
        <WinnerPanel />
        <PlayoffPanel />
        <RegularPanel />
      </div>
      
    </>
  )
}

export default App
