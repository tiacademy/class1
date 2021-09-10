import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home/';
import {VisualizarCliente} from './pages/Cliente/VisualizarCliente';

import {Menu} from './components/Menu';
import { VisualizarServico } from './pages/Servico/VisualizarServico';
import {Servico} from './pages/Servico/Servico';
import { VisualizarPedido } from './pages/Pedido/VisualiarPedido';
import { Cadastrar } from './pages/Servico/Cadastrar';
import { Editar } from './pages/Servico/Editar';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/visualizar-cliente" component={VisualizarCliente}/>
          <Route path="/visualizar-servico" component={VisualizarServico}/>
          <Route path="/visualizar-pedido" component={VisualizarPedido}/>
          <Route path="/servico/:id" component={Servico}/>
          <Route path="/cadastrar-servico" component={Cadastrar}/>
          <Route path="/editar-servico/:id" component={Editar}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
