import React from 'react';
import './App.css';
import { PlanetsProvider } from './context/PlanetsContext';
import { Table } from './components/Table';
import { Filter } from './components/Filter';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
