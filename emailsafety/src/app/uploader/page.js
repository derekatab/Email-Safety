"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase/clientApp';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Papa from 'papaparse';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';


const UploadPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [showAll, setShowAll] = useState(false); // Toggle
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const rows = results.data;
          setCsvData(rows);
          rows.forEach((row, index) => {
            if (row.length >= 2) {
              const [item1, item2] = row; // Assuming each row has at least two items
              addDataToFireStore(item1, item2, index);
            }
          });
        },
        header: false,
      });
    }
  };

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

  const fetchAllData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "messages"))); // Get all documents from Firestore
      const allRows = querySnapshot.docs.map((doc) => doc.data());
      setAllData(allRows);
    } catch (error) {
      console.error("Error fetching documents from Firestore database", error);
    }
  };

  const toggleView = () => {
    if (!showAll) {
      fetchAllData();
    }
    setShowAll(!showAll);
  };

  const handleCheckboxChange = (index) => {
    setSelectedMessages((prev) => {
      const newSelectedMessages = new Set(prev);
      if (newSelectedMessages.has(index)) {
        newSelectedMessages.delete(index);
      } else {
        newSelectedMessages.add(index);
      }
      return newSelectedMessages;
    });
  };

  const handleCheckAll = (checked) => {
    if (checked) {
      const newSelectedMessages = new Set(csvData.map((_, index) => index));
      setSelectedMessages(newSelectedMessages);
    } else {
      setSelectedMessages(new Set());
    }
  };

  const handleRedirect = () => {
    const selectedMessagesArray = Array.from(selectedMessages).map((index) => showAll ? allData[index] : csvData[index]);
    localStorage.setItem('selectedMessages', JSON.stringify(selectedMessagesArray));
    router.push('/generate');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/auth');
  };

  return (
    <div>
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button><br></br>
      <p>Welcome back, {user.displayName || 'User'}!</p>
      {/* Display parsed CSV results */}
      <h2>Uploaded...</h2>
      <div>
        {csvData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Select</th>
                <th>
                  <input type="checkbox" onChange={(e) => handleCheckAll(e.target.checked)}
                    checked={selectedMessages.size === csvData.length} />{" "}
                  Select All
                </th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={selectedMessages.has(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display</p>
        )}
      </div>

      {/* Toggle Button */}
      <button onClick={toggleView}>{showAll ? 'Hide All Data' : 'Show All Data'}</button>


      <h2>{showAll ? "All Data in Database" : "Uploaded CSV Data"}</h2>
      <div>
        {showAll ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.message}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={selectedMessages.has(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display</p>
        )}
      </div>

      <button onClick={handleRedirect}>Generate Email Test</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UploadPage;