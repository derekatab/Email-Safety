"use client";

import React, { useEffect, useState } from 'react';

const GeneratePage = () => {
    const [selectedMessages, setSelectedMessages] = useState([]);

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('selectedMessages')) || [];
        setSelectedMessages(storedMessages);
    }, []);

    const handleGenerate = async (message) => {
        // Generate email
        try {
            const response = await fetch('/api/generateEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
            const data = await response.json();

            console.log('Email generated:', data);

            // Update message status

        } catch (error) {
            console.error('Error generating email:', error);
        }

    };



    return (
        <div>
            <h1>Generate Page</h1>
            <p>Selected Messages</p>
            {selectedMessages.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMessages.map((message, index) => (
                            <tr key={index}>
                                <td>{message.name}</td>
                                <td>{message.email}</td>
                                <td>
                                    <button onClick={() => handleGenerate(message)}>Generate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No messages selected</p>
            )}
        </div>
    );
};

export default GeneratePage;