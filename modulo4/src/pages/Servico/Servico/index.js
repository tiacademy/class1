import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Container } from "reactstrap";
import { api } from "../../../config";

export const Servico = (props) => {
    //console.log(props.match.params.id);

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    useEffect(() => {
        const getServico = async () => {
            await axios.get(api + "/totalservico/" + id)
                .then((response) => {
                    //console.log(response.data.pedidos);
                    setData(response.data.pedidos);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Sem conexão com a API.'
                    })
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Quantidade de pedidos do serviço</h1>
                </div>
                <div className="p-2">
                    <Link to="/visualizar-servico" className="btn btn-outline-success 
                        btn-sm m-1">Listar</Link>
                    <Link to={"/editar-servico/"+data.id}
                        className="btn btn-outline-warning btn-sm">Editar</Link>
                </div>
            </div>
            <hr className="m-1"/>
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            
            <dl className="row">
                <dt className="col-sm-3">Valor total</dt>
                <dd className="col-sm-9">{data}</dd>
            </dl>
            </Container>
            
        </div>
    );
};