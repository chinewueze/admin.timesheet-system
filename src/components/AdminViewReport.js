import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom"
export const AdminTimesheetView = () => {
    const [report, setReport] = useState([]);
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        fetch('https://timesheet-api-main.onrender.com/view/reports/all?current-week=2023-08-14', {
            method: 'GET',
            headers: {
                'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
            })
            .then(data => {
                if (data.status) {
                    setReport(data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <>
            <Helmet>
                <title> VIEW ALL REPORTS </title>
                <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
            </Helmet>
            <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
                <table className="mx-auto my-[10%] w-4/5">
                    <thead>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Date
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Day
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Project
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Task
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Status
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Duration
                        </th>
                        <th className="border-2 border-solid border-black p-2 align-baseline">
                            Link
                        </th>
                    </thead>
                    <tbody>
                        {report.map((item, index) => (
                            <tr key={index}>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report.date}
                                </td>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report["day-of-week"]}
                                </td>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report.project}
                                </td>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report.task}
                                </td>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report.status}
                                </td>
                                <td className="border-2 border-solid border-black p-3">
                                    {item.report.duration}
                                </td>
                                <td className="border-2 border-solid border-black p-3 text-blue-500">
                                    <a
                                        href={item.report.link.startsWith("http") ? item.report.link : `http://${item.report.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.report.link}
                                    </a>
                                </td>
                                <Link to={`/view-specific-report/${item.user.id}`}>
                                    <button className="bg-blue-500 p-2 rounded-lg ml-[5%]">View</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
