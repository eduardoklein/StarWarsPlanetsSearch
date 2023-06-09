import React from 'react';
import './App.css';
import { PlanetsProvider } from './context/PlanetsContext';
import { Table } from './components/Table';
import { Filter } from './components/Filter';
import { NumericFilter } from './components/NumericFilter';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <NumericFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
