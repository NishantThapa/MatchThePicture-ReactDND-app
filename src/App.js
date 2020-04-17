import React from 'react';
import './App.css';
import Container from './Matching/dnd'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Container/>
      </DndProvider>
    </div>
  );
}
 
export default App;
