import React from 'react';
import './App.css';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <header>
      KPL - 2025 Players List
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}
// "homepage" : "https://mpshetty12.github.io/KPL-2025" in package.json
export default App;
