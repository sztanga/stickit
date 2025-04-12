import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesBoard from './components/notes/NotesBoard';
import AppShell from "./components/layout/AppShell";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/notes"
                    element={
                        <AppShell>
                            <NotesBoard />
                        </AppShell>
                    }
                />
                <Route path="*" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
