import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import RankingPage from '../pages/RankingPage';
import RankingPorCidade from '../pages/RankingClassificacaoPage';
import Disputa from '../pages/DisputaPage';
import Dashboard from '../pages/DashboardPage';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Private from './Private';
import Bizus from '../pages/Bizus';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <SignIn/> }/>
            <Route path='/register' element={ <Register/> }/>
            <Route path='/dashboard' element={ <Dashboard/>}/>
            <Route path='/bizus' element={ <Bizus/>}/>
            <Route path='/home' element={ <Private><Home/></Private>}/>
            <Route path='/ranking-das-cidades' element={ <Private><RankingPage/></Private>}/>
            <Route path='/ranking-por-cidades-por-classificado' element={ <Private><RankingPorCidade/></Private>}/>
            <Route path='/disputa' element={ <Private><Disputa/></Private>}/>
        </Routes>
    )
}

export default RoutesApp;