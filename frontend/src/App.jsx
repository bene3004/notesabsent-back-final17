import { Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/navbar.jsx';
import MainPage from './pages/MainPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import GetAllEntitiesPage    from './pages/GetAllEntitiesPage.jsx';
import GetEntityByIDPage     from './pages/GetEntityByIDPage.jsx';
import AddEntityPage         from './pages/AddEntityPage.jsx';
import UpdateEntityPage      from './pages/UpdateEntityPage.jsx';
import DeleteEntityPage      from './pages/DeleteEntityPage.jsx';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/"                    element={<MainPage />} />
                <Route path="/login"               element={<LogInPage />} />
                <Route path="/signup"              element={<SignUpPage />} />
                <Route path="/:entity"             element={<GetAllEntitiesPage />} />
                <Route path="/:entity/add"         element={<AddEntityPage />} />
                <Route path="/:entity/:id"         element={<GetEntityByIDPage />} />
                <Route path="/:entity/:id/edit"    element={<UpdateEntityPage />} />
                <Route path="/:entity/:id/delete"  element={<DeleteEntityPage />} />
            </Routes>
        </>
    );
}

export default App;