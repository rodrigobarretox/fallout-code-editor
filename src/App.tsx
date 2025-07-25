import React from 'react';
import CRTScreen from './components/CRTScreen';
import Terminal from './components/Terminal';

function App() {
  return (
    <div className="app-container">
      <CRTScreen>
        <Terminal />
      </CRTScreen>
    </div>
  );
}

export default App;