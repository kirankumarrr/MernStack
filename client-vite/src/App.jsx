import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Cards from './components/Card/Card';
import MonthBasedCards from './components/MonthBasedCards/MonthBasedCards';

function Page3() {
  return (
    <div>
      <h1>Page 3</h1>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const theme = createTheme({
    //here you set palette, typography ect...
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Cards />} />
            <Route exact path="/cards" element={<MonthBasedCards />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
