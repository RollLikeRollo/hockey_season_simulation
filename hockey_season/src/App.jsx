import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import SettingPanel from './components/SettingPanel'
// import SimulationPanel from './components/SimulationPanel'
import './scss/main.scss'
import { teams } from '../data/teams.js'



const TeamsPanel = (props) => {
  return (
    <div className={props.cls}>
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
                    id={`custom-checkbox-${index}`}
                    name={country}
                    value={country}
                    // checked={checkedState[index]}
                    // onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{country}</label>
                </div>
              </li>
            );
          })}
        </ul>
        <p>
          Checked <span id="checked-count">0</span> of <span id="total-count">{  }</span> total
        </p>
      </div>
    </div>
  )
}

const SeasonPanel = (props) => {
  return (
    <div className={props.cls}>
      <h2>Season</h2>
      <p> set the season </p>
      
    </div>
  )
}

const SettingPanel = () => {
  return (
    <div>
      <h1>Hockey season simulator</h1>
      
      <TeamsPanel cls={'setting_subsection'} />
      <SeasonPanel cls={'setting_subsection'} />

    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='setting_panel'> 
        <SettingPanel />

      </div>
      <div className='simulation_panel'>
        <p> test odstavec</p>
      </div>
      
    </>
  )
}

export default App
