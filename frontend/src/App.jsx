import {Routes, Route} from 'react-router-dom';
import AddEntityPage from './pages/AddEntityPage';
import LogInPage from './pages/LogInPage';
import MainPage from './pages/MainPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path=':entity/add' element={<AddEntityPage />} />
        </Routes>
    );
}

export default App;