import React, { useState, useEffect } from 'react';
import './UserList.css'; // For styles

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // The CSV export URL for your Google Sheets document
        const url = 'https://docs.google.com/spreadsheets/d/1dEZYweH2aDskzR32zR0T4BL4SJmcSiKbMlUSDo5DhpI/export?format=csv';

        // Fetch the CSV data
        const response = await fetch(url);
        const data = await response.text();

        // Parse CSV data into JSON
        const parsedData = csvToJson(data);

        // Format the data into user objects and sort by id
        const formattedUsers = parsedData
          .map((row, index) => ({
            id: row['FMC ID'],  // Ensure ID is a number for proper sorting
            name: row['Name'],
            playerType: row['Player Type'],
            dob: row['DOB'],
            shirtSize: row['Shirt Size'],
            shirtNumber: row['Shirt Number'],
            boxId: row['Box Id'],
            photo: row['Photo URL'],
          }))
          .sort((a, b) => a.boxId - b.boxId); // Sort users by ID in ascending order

        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching or parsing CSV file:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to convert CSV to JSON
  const csvToJson = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);

    return rows.map((row) => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {});
    });
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <img src={user.photo} alt={user.name} className="user-photo" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <p><strong>Player Type:</strong> {user.playerType}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>DOB:</strong> {user.dob}</p>
            <p><strong>Shirt Size:</strong> {user.shirtSize}</p>
            <p><strong>Shirt Number:</strong> {user.shirtNumber}</p>
            <p><strong>BoxId:</strong> {user.boxId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
