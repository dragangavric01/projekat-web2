import './App.css';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import {BrowserRouter,Routes, Route} from 'react-router-dom'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/logIn' element={<LogIn/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

