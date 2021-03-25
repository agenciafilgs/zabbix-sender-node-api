<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/logo_sender_api-1536x1152.png">

### Olá pessoal, hoje vou falar de um micro serviço que criei para simplificar o uso do Zabbix sender, criando um webhook (API), para que você consiga enviar as suas métricas.Aqui vou colocar um “how to” de como seguir mas lembre, quanto mais experiência você tiver com o Zabbix maiores são as possibilidades desse método (Preprocessing!).
Mas o que é o Sender API for Zabbix
É um componente criado para facilitar o uso do recurso “sender” da Ferramenta de monitoramento Zabbix.

> “O sender se trata de uma lib. que pode ser integrada diretamente no código para enviar métricas para o Zabbix”

Por muitas vezes é necessário fazer diversas homologações e testes para adicionar novos recursos para a aplicação o que pode inviabilizar uma integração com recursos terceiros ou em alguns casos quando skill técnicos são necessários.

Com o Sender API for Zabbix é necessário apenas apontar para o endpoint (API), disponibilizado passando algumas informações para o host/item

E o valor da métrica será enviado ao Zabbix sem a necessidade de lib. ou pacotes no código da sua
aplicação, poderá ser chamado de qualquer lugar com suporte a http.

How to use
É necessário ter um host e item do tipo zabbix trapper para ser passado no body ao realizar o post, a descrição está descrita abaixo:


Criar um host no Zabbix

– Em configurações / Hosts / Create host

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/001-1024x260.png">

Defina um nome e adicione a um grupo (demais opções conforme a sua necessidade).

– No exemplo estou colocando o nome Sender, ao finalizar clique em add.

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/002-1024x558.png">

Agora crie um template com o nome desejado.

– Em Templates/Create Template

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/003-1024x391.png">

Acesse novamente o template e crie o item conforme imagens a seguir.

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/004-1024x309.png">

Create Item:


<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/004-1024x309.png">
<br>
<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/006-1024x415.png">

No exemplo acima incluímos o nome para o item, o tipo como Zabbix Trapper (que permite receber dados da API) e a chave (este que é o identificador para a métrica).

Tipo de informação pode ser definido conforme a sua necessidade o Sender API pode enviar Strings ou valores numéricos para o Zabbix, porem o mesmo será interpretado conforme o tipo definido, ressaltando que existem formas para alterar o tipo de dado e ou estrutura usando Preprocessing (não discutidos neste documento).

Agora adicione o template ao host criado no primeiro step.

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/007-1024x380.png">


Atualize e agora vamos usar o microserviço do Sender API, neste exemplo será configurado no Docker.

Faça o download da imagem no Docker Hub:

– docker push rafasera/sender-api-zbx:latest

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/011-300x74.png">

Inicie a mesma conforme imagem e descrição abaixo

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/008.png">

Aqui foi exposta a porta 80

Em API_URL informe o endereço do Zabbix.

Em API_PORT informe a porta do seu Zabbix, default é 10051

Após isso aguarde inicializar.

“OBS você pode encontrar o mesmo tutorial acessando o container no caminho default que definiu no meu caso seria a localhost”

Por fim vamos utilizar o Sender-API

“Eu vou usar o Programa Postman para efetuar as requests”
Abra o Postman e acesse a rota:

– http://localhost/api/v1/zabbix-sender

Tipo:

– POST

Body:

<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/013-300x120.png">

Obs.

– O endereço localhost foi atribuído pelo docker ressaltando que estou usando localmente.

– O body deve conter o host criado no Zabbix para receber a métrica

– A chave do Item (key)

– E o valor da métrica que pode ser enviado por outra ferramenta ou aplicação.


<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/009-1024x510.png">
<br>
<img src="http://filgs.com.br/blog/wp-content/uploads/2021/03/010-1024x324.png">


Não havendo problemas de estrutura ou comunicação com o Sender-API receberá a mensagem de sucesso.

Em seguida a métrica enviada chegara no seu Zabbix.
