import React from 'react';
import Table from './components/table-component';
import Calendar from './components/calendar';
import { Grid } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Calendar />
        </Grid>
        <Grid item xs={5}>
          <Table />
        </Grid>
      </Grid>
    </DndProvider>
  );
}

export default App;
