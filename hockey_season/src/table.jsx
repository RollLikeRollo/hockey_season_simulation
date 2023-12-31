import React from "react";
import { useSortBy, useTable } from "react-table";
import TableCell from '@mui/material/TableCell'

export default function Table({ columns, data }) {

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data,
        initialState: {
            sortBy: [
                {
                    id: "pts",
                    desc: true
                }
            ]
        }
    },
    useSortBy
    );

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                        column.isSorted
                            ? column.isSortedDesc
                            ? "sort-desc"
                            : "sort-asc"
                            : ""
                        }
                    >
                        {column.render("Header")}
                        <span>
                            {column.isSorted ? (column.isSortedDesc ? " ▽" : " △") : " ⇳"}
                        </span>
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                    })}
                    </tr>
                );
                })}
            </tbody>
        </table>
    );
}