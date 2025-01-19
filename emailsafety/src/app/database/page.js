'use client';

import { db } from '../../../firebase/clientApp';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

import React, { useState } from 'react';

import { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { GithubAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';

// Configuring the Firestore database

async function addDataToFireStore(name, email, message) {

    try {
        const docRef = await addDoc(collection(db, "messages"), {
            name: name,
            email: email,
            message: message,
        });
        console.log("Document written with ID:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document to Firestore database", error)
        return false;
    }
}

// **New Function to Fetch Data
async function fetchDataFromFirestore() {
    try {
        const q = query(collection(db, "messages"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching data from Firestore", error);
        return [];
    }
}



export default function Home() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // **New State to Store User data for the table
    const [users, setUsers] = useState([]);

    //** Fetch data on component mount

    useEffect(() => {

        const loadData = async () => {

            const data = await fetchDataFromFirestore();
            setUsers(data);
        }
        loadData();

    }, []


    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFireStore(name, email, message);
        if (added) {
            setName("");
            setEmail("");
            setMessage("");

            alert("Data added to Firestore database");
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-5xl font-bold m-10">
                Add Data to Firestore Database
            </h1>

            <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md'>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                        Name:
                    </label>

                    <input
                        type='text'
                        id='name'
                        className='w-full px-3 py-2 borner rounded lg focus:outline-none focus:border-blue-500'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <div className='mb-4'>

                    <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                        Email:
                    </label>

                    <input
                        type='text'
                        id='email'
                        className='w-full px-3 py-2 borner rounded lg focus:outline-none focus:border-blue-500'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className='mb-4'>

                    <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
                        Message:
                    </label>

                    <textarea
                        rows={5}
                        type='message'
                        id='message'
                        className='w-full px-3 py-2 borner rounded lg focus:outline-none focus:border-blue-500'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    >

                    </textarea>

                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        className='bg-blue-500 gover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'
                    >
                        Submit
                    </button>
                </div>

            </form>


            //**Table to Display User Data


            <div className="mt-10 w-full">
                <h2 className="text-3xl font-bold mb-4">Submitted Users</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* **Dynamically render user data in the table** */}
                        {users.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </main>
    )
   
}


