import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Private from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <SignIn/> }/>
            <Route path='/register' element={ <Register/> }/>
            <Route path='/home' element={ <Private><Home/></Private>}/>
        </Routes>
    )
}

export default RoutesApp;