import { Container} from 'reactstrap';

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Home</h1>
                    </div>
                    <div className="p-2">
                        <a href="/visualizar-cliente" className="btn btn-outline-success 
                        btn-sm">Cliente</a>
                    </div>
                    <div className="p-2">
                        <a href="/visualizar-servico" className="btn btn-outline-success 
                        btn-sm">Serviço</a>
                    </div>
                    <div className="p-2">
                        <a href="/visualizar-pedido" className="btn btn-outline-success 
                        btn-sm">Pedido</a>
                    </div>
                </div>                
            </Container>
        </div>
    );
};