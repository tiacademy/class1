const express=require('express');
const cors=require('cors');

const models=require('./models');
const { sequelize } = require('./models');
const { response } = require('express');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let servico=models.Servico;
let pedido=models.Pedido;

app.post('/servicos', async (req, res) => {
  await aguardar(3000);

  function aguardar(ms){
    return new Promise((resolve) =>{
      setTimeout(resolve.ms);
    });
  };

  await servico.create(
    req.body
  ).then(function (){
    return res.json({
      error: false,
      message: "Serviço criado com sucesso!"
    })
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro no cadastro do serviço."
    })    
  });  
});

app.post('/clientes', async (req, res) => {
  let create=await cliente.create(
    req.body
  ).then(function(){
    return res.json({
      error: false,
      message: "Cliente cadastrado com sucesso!"
    })
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro ao cadastrar o cliente."
    })
  });
});

app.post('/pedidos', async (req, res) => {
  let create=await pedido.create(
    req.body
  ).then(function(){
    return res.json({
      error: false,
      message: "Pedido cadastrado com sucesso!"
    })
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro ao cadastrar novo pedido."
    })
  });
});

app.get('/visualizarservicos', async(req,res)=>{
    servico.findAll({
    order: [['nome', 'DESC']]
  }).then(function(servicos){
    res.json({servicos})
  });
});

app.get('/ofertas', async(req,res)=>{
  let read=await servico.count('id').then(function(servicos){
    res.json(servicos);
  });  
});

app.get('/qtdclientes', async(req,res)=>{
  let read=await cliente.count('id').then(function(clientes){
    res.json(clientes);
  });  
});

app.get('/totalservico/:id', async(req, res)=>{
  await pedido.sum('valorPedido',{
    where: {clienteId: req.params.id}
  })
  .then(pedidos=>{
    return res.json({
      message: "Valor total ",
      pedidos
    });
  });
});

app.get('/servico/:id', async(req, res) =>{  
  servico.findByPk(req.params.id)
  .then(servico =>{
    return res.json({
      error: false,
      servico
    });
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro: Código não cadastrado!"
    });
  });
});

app.get('/atualizaservico', async(req, res)=>{
  await servico.findByPk(1)  
  .then(servico =>{
    servico.nome='HTML/CSS/JS';
    servico.descricao='Páginas estáticas e dinâmicas estilizadas';
    servico.save();
    return res.json({servico});
  });
});

app.put('/editarservico', (req, res)=>{
  servico.update(req.body,{
    where: {id: req.body.id}
  }).then(function(){
    return res.json({
      error: false,
      message: "Serviço modificado com sucesso!"
    });
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro na modificação do serviço!"
    });
  });
});

app.get('/servicospedidos', async(req, res)=>{
  await servico.findByPk(3, {include:[{all:true}]})  
  .then(servico =>{
    return res.json({servico});
  });
});

app.put('/editarpedido', (req, res)=>{
  pedido.update(req.body,{
    where: {servicoId: req.body.servicoId}
  }).then(function(){
    return res.json({
      error: false,
      message: "Pedido modificado com sucesso!"
    });
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro na modificação do pedido!"
    });
  });
});

app.get('/totalcliente/:clienteId', async(req, res) =>{  
  servico.findByPk(req.params.id)
  .then(servico =>{
    return res.json({
      error: false,
      servico
    });
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      message: "Erro: Código não cadastrado!"
    });
  });
});

app.get('/excluircliente', async(req,res)=>{
  cliente.destroy({
    where: {id:2}
  });
});

app.delete('/apagarservico/:id', (req, res)=>{
  servico.destroy({
    where: {id: req.params.id}
  }).then(function(){
    return res.json({
      error: false,
      message: "Cliente excluído com sucesso!"
    });
  }).catch(function(erro){
    return res.status(400).json({
      error: true,
      messagem: "Erro ao tentar excluir."
    });
  });
});

let port=process.env.PORT || 3001;
app.listen(port,(req,res)=>{
    console.log('Servidor ativo');
});
