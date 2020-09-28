import React, { useEffect, useState } from "react";


export default function DA() {

    const [dataDump, setDataDump] = useState([]);
    const getData = async () => {
        const result = await fetch("http://localhost:5000/data")
        console.log("Test", result)
        return result;
    }
    useEffect(() => {
        getData().then(res => res.json()).then(setDataDump);
        console.log("data", dataDump)
    }, []);

    return (
        <div>
            <p>This is the data arriving from the postgres API</p>
            {/* <pre>{JSON.stringify(dataDump, null, 2)}</pre> */}

            <table style={{ width: "100px" }}>
                <thead>
                    <tr>
                        <th>address</th>
                        <th>lodged</th>
                        <th>da_number</th>
                        <th>status</th>
                        <th>date_of_decision</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {dataDump.map((DA, index) => (
                        <tr key={index}>
                            <td>{DA.address}</td>
                            <td>{DA.lodged}</td>
                            <td>{DA.da_number}</td>
                            <td>{DA.status}</td>
                            <td>{DA.date_of_decision}</td>
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>



    );

}