import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Carrinho from '../pages/Carrinho';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Checkout from '../pages/Checkout';
import Private from './Private';
import QRScanner from '../pages/LeitorQrCode';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <SignIn/> }/>
            <Route path='/register' element={ <Register/> }/>
            <Route path='/home' element={ <Private><Home/></Private>}/>
            <Route path='/carrinho' element={ <Private><Carrinho/></Private>}/>
            <Route path='/checkout' element={ <Private><Checkout/></Private>}/>
            <Route path='/qrcodescann' element={ <Private><QRScanner/></Private>}/>
        </Routes>
    )
}

export default RoutesApp;