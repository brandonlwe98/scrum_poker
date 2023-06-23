import logo from './logo.svg';
import './App.css';
import Lobby from './pages/Lobby';
import Host from './pages/Host';
import Join from './pages/Join';
import NoPage from './pages/NoPage';
import { Box, Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Container mt="15" maxW='container.lg'>
        <Routes>
          <Route index element={<Lobby />} />
          <Route path='/host' element={<Host />} />
          <Route path='/join' element={<Join />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
