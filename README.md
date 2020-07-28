# Saipos ToDo Challenge

Projeto desenvolvido para fins de execução do teste prático da empresa Saipos.

### Pré-requisitos

Para o funcionamento, faz-se necessário que se tenha instalado o Docker/Docker-Compose.
Segue links da documentação oficial para instalação
- Windows: https://docs.docker.com/docker-for-windows/install/
- MacOS: https://docs.docker.com/docker-for-mac/install/
- Ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/ | https://docs.docker.com/compose/install/

Recomenda-se, sempre, a utilização das versões mais recentes de cada plataforma.


### Instalando

Os comandos que seguem, devem ser executados na pasta raíz do projeto, onde encontra-se o arquivo ***docker-compose.yml***

Para executar o projeto, com live-reload:

- docker-compose up -d

Para verificar os containers online:

- docker-compose ps e/ou docker ps


##### Primeira execução do projeto: Rodando migrations e seeders

Se for a primeira vez que executar o projeto, será necessário gerar a key da api e executar as migrations, através do comando:

- docker exec -it api sh ./api-config.sh

Sempre que necessitar rodar as migrations, execute o comando abaixo:

- docker exec -it api adonis migrations

Para uma execução 'limpa' das migrations:

- docker exec -it api adonis migrations:refresh


## Testes

Foram criados alguns testes de unidade/funcionalidade para a api, que podem ser executados com o seguinte comando:


- docker exec -it api adonis test