import React from "react";
import Table from './table.jsx'
import { GamesPanel } from './games.jsx'

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

export const RegularPanel = ({sim_res}) => { 

    if (sim_res) {
        return (
        <div>
            <h2>Regular season</h2>
            <div className="reg_table">
            <RegularTable sim_res={sim_res}/>
            </div>
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