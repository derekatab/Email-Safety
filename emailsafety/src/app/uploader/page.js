"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';


const UploadPage = () => {
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = () => {
      if (file) {
        Papa.parse(file, {
          complete: (results) => {
            const rows = results.data;
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
    return (
      <div>
        <h1>Upload CSV File</h1>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  };
  
  export default UploadPage;