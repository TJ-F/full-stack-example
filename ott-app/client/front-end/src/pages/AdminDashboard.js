import React from 'react';
import axios from 'axios';
import { format24to12 } from '../util/FormatTime';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

const AdminDashboard = () => {
    const token = localStorage.getItem('token');

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };

    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [inputIds, setInputIds] = React.useState({});
    const [showDatePickerIdx, setShowDatePickerIdx] = React.useState(null);
    // const [showEmailPickerIdx, setShowEmailPickerIdx] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState('');

    const queries = [
        { label: 'Show All Customers', api: '/api/customers' },
        { label: 'Find Customer by Email', api: '/api/customer/email/', needsEmail: true },
        { label: 'Find Customer by ID', api: '/api/customer/id/', needsId: true },
        { label: 'Show All Payments', api: '/api/square_payments' },
        { label: 'Show Reserved TeeTimes', api: '/api/reserved-teetimes?date=', needsDate: true },
        { label: 'Show Available TeeTimes', api: '/api/available-teetimes?date=', needsDate: true },

    ];

    const adminQueries = [
        { label: 'Delete a Customer', api: '/api/customer/delete', needsId: true },
        { label: 'Make Customer an Admin', api: '/api/customer/promote_to_admin', needsId: true },
    ]

    const [inputEmails, setInputEmails] = React.useState({});

    const handleInputEmailChange = (idx, value) => {
        setInputEmails(prev => ({ ...prev, [idx]: value }));
    };

    const handleInputIdChange = (idx, value) => {
        setInputIds(prev => ({ ...prev, [idx]: value }));
    };

    const handleButtonQuery = async (api, needsId = false, needsDate = false, needsEmail = false, idx = null) => {
        if (needsDate) {
            setShowDatePickerIdx(idx);
            return;
        }

        if (needsEmail) {
            if (idx === null) {
                return;
            }
            const email = inputEmails[idx];
            if (!email) {
                setError('Please enter a customer email.');
                return;
            }

            setLoading(true);
            setError('');
            setResults([]);

            try {
                const response = await axios.post(
                    `${BASE_URL}${api}`,
                    { email },
                    axiosConfig
                );

                setResults([response.data]);
            } catch (err) {
                setError(err.response?.data?.error || err.message || 'Error fetching data');
            }

            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');
        setResults([]);

        try {
            if (needsId && idx !== null) {
                const customerId = inputIds[idx];
                if (!customerId) {
                    setLoading(false);
                    return setError('Please enter a customer_id.');
                }

                const response = await axios.post(
                    `${BASE_URL}${api}`,
                    { customer_id: customerId },
                    axiosConfig
                );

                setResults([response.data]);
            } else {
                const response = await axios.get(`${BASE_URL}${api}`, axiosConfig);
                setResults(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Error fetching data');
        }

        setLoading(false);
    };


    const handleDateSubmit = async (api) => {
        if (!selectedDate) return;

        setShowDatePickerIdx(null);
        setLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await axios.get(`${BASE_URL}${api}${selectedDate}`, axiosConfig);
            const rawData = response.data;

            if (rawData.length > 0) {
                const firstCol = Object.keys(rawData[0])[0];
                const filtered = rawData
                    .filter(row => row[firstCol] !== null && row[firstCol] !== '')
                    .map(row => ({
                        ...row,
                        [firstCol]: format24to12(row[firstCol])
                    }));
                setResults(filtered);
            } else {
                setResults(rawData);
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Error fetching data');
        }

        setLoading(false);
    };

    // Define a fixed width for all blue buttons
    const buttonStyle = { minWidth: 220 };

    return (
        <div className="container py-4" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <h1 className="mb-4">Admin Reports</h1>
            <div className="mb-3 d-flex flex-column align-items-start">
                {queries.map((q, idx) => (
                    <div key={q.label} className="mb-3 w-100">
                        <button
                            className="btn btn-primary me-2 mb-2"
                            style={buttonStyle}
                            onClick={() => handleButtonQuery(q.api, q.needsId, q.needsDate, q.needsEmail, idx)}
                            disabled={loading}
                        >
                            {q.label}
                        </button>

                        {q.needsDate && showDatePickerIdx === idx && (
                            <>
                                <input
                                    type="date"
                                    className="form-control d-inline-block w-auto me-2 mb-2"
                                    style={{ minWidth: 180 }}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    value={selectedDate}
                                />
                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => handleDateSubmit(q.api)}
                                    disabled={!selectedDate}
                                >
                                    Submit
                                </button>
                            </>
                        )}

                        {q.needsId && (
                            <input
                                type="number"
                                placeholder="Customer ID"
                                className="form-control d-inline-block w-auto mt-2"
                                style={{ minWidth: 150 }}
                                value={inputIds[idx] || ''}
                                onChange={(e) => handleInputIdChange(idx, e.target.value)}
                            />
                        )}
                        {q.needsEmail && (
                            <input
                                type="email"
                                placeholder="Customer email"
                                className="form-control d-inline-block w-auto mt-2"
                                style={{ minWidth: 150 }}
                                value={inputEmails[idx] || ''}
                                onChange={(e) => handleInputEmailChange(idx, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                {adminQueries.map((q, idx) => (
                    <div key={q.label} className="mb-3 w-100">
                        <button
                            className="btn btn-danger me-2 mb-2"
                            style={buttonStyle}
                            onClick={() => handleButtonQuery(q.api, q.needsId, false, false, idx)}
                            disabled={loading}
                        >
                            {q.label}
                        </button>
                        {q.needsId && (
                            <input
                                type="number"
                                placeholder="Customer ID"
                                className="form-control d-inline-block w-auto mt-2"
                                style={{ minWidth: 150 }}
                                value={inputIds[idx] || ''}
                                onChange={(e) => handleInputIdChange(idx, e.target.value)}
                            />
                        )}
                    </div>
                ))}
            </div>

            {loading && <div className="alert alert-info mt-3">Running query...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {results.length > 0 && (
                <div className="table-responsive mt-3">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                {Object.keys(results[0]).map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, idx) => (
                                <tr key={idx}>
                                    {Object.values(row).map((val, i) => (
                                        <td key={i}>{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Spacer to push footer down if no results */}
            {results.length === 0 && !loading && !error && <div style={{ flex: 1 }} />}
        </div>
    );
};

export default AdminDashboard;
