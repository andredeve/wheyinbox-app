import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/home' element={ <Home/> }/>
            <Route path='/register' element={ <Register/> }/>
            <Route path='/' element={ <SignIn/> }/>
        </Routes>
    )
}

export default RoutesApp;