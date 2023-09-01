import React, { useEffect, useState } from 'react'
import { teams } from '/data/teams.js'



const TeamsPanel = (props) => {

  const [checkedState, setCheckedState] = useState(
    new Array(teams.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalCount = updatedCheckedState.reduce(
      (total, currentState) => (currentState ? total + 1 : total),
      0
    );

    setTotal(totalCount);

    console.log(checkedState);

  };

  return (
    <div className={props.cls}>
      <h2>Teams</h2>
      <p> Include teams from: </p>
      <div className="teams_list">
        <ul className="toppings-list">
          {teams.map(({ country }, index) => {
            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={country}
                      value={country}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>{country}</label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p>
          Checked <span id="checked-count">0</span> of <span id="total-count">{ total }</span> total
        </p>
      </div>
    </div>
  )
}


{/* <ul className="toppings-list">
  {states.map(({ name, price }, index) => {
    return (
      <li key={index}>
        <div className="toppings-list-item">
          <div className="left-section">
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              name={name}
              value={name}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
          </div>
          <div className="right-section">{getFormattedPrice(price)}</div>
        </div>
      </li>
    );
  })}
</ul> */}

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

export default SettingPanel