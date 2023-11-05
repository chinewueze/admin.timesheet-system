import React, { useState, useEffect } from "react"
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
export const AdminViewAll = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = sessionStorage.getItem('access_token')

    useEffect(() => {

        const displayAll = async () => {
            try {
                const response = await fetch(`https://timesheet-api-main.onrender.com/view/reports/all`, {
                    headers: {
                        "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-type": "application/json"
                    },
                })
                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data.data)
                }
            } catch (err) {
                console.error("Error", err)
            } finally {
                setLoading(false);
            }
        }
        displayAll()
    }, [accessToken])

    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_id');
        navigate('/')
    }
    return (
        <>
            <Helmet>
                <title> VIEW ALL USERS </title>
                <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
            </Helmet>
            <div className='flex  w-full h-[75px] justify-end items-center bg-[#232f3e]'>
                <button className="bg-gray-500 text-white rounded-md p-1 mr-[3%]" onClick={handleLogout}> LOGOUT </button>
            </div>
            <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
                <table className="mx-auto my-[10%] w-4/5">
                    <thead>
                        <tr>
                            <th className="border-2 border-solid border-black p-2 align-baseline">
                                Username
                            </th>
                            <th className="border-2 border-solid border-black p-2 align-baseline">
                                Email Address
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                        <div className="text-center mt-11">
                            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                        </div>
                    ) : (
                        users.map((report) => {
                            return (<tbody>
                                <tr key={report}>
                                    <td className="border-2 border-solid border-black p-3"> {report.user.username}  </td>
                                    <td className="border-2 border-solid border-black p-3"> {report.user.email}  </td>
                                    <button className="bg-blue-400 rounded-md w-28 h-9 ml-3 mt-3" onClick={() => navigate(`/view-specific-report/${report.user.id}`)}>
                                        VIEW REPORT
                                    </button>
                                </tr>
                            </tbody>)
                        })
                    )}
                </table>
            </div>
        </>
    )
}
