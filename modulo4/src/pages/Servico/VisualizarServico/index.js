import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Alert } from 'reactstrap';

import { api } from '../../../config';

export const VisualizarServico = () => {

    //iniciar um array vazio que recebe os dados 
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    //função assíncrona getServicos 
    const getServicos = async () => {
        axios.get(api+"/visualizarservicos")
            .then((respose) => {
                console.log(respose.data.servicos);
                setData(respose.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            })
    }

    const apagarServico = async(idServico) =>{
        console.log(idServico);

        const headers={
            'Content-Type':'application/json'
        }

        await axios.delete(api+"/apagarservico/"+idServico,{headers})
        .then((response)=>{
            console.log(response.data.error);
            getServicos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: Não foi possível acessar a API.'
            });
        });
    }

    //instanciar a função 
    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-3">
                        <h1>Visualizar informações do serviço</h1>
                    </div>
                    <div className="p-3">
                        <a href="/cadastrar-servico" className="btn btn-outline-success 
                        btn-sm">Cadastrar</a>
                    </div>
                </div>
                
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/servico/"+item.id}
                                    className="btn btn-outline-primary btn-sm m-1">Consultar</Link>
                                    <Link to={"/editar-servico/"+item.id}
                                    className="btn btn-outline-warning btn-sm m-1">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm m-1"
                                        onClick={() => apagarServico(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};