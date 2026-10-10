import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesTree } from './RoutesTree';

const App: React.FC = () => (
  <Router>
    <RoutesTree />
  </Router>
);

export default App;
