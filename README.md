[![Build to ECR and Rancher Deploy](https://github.com/ampliebr/spiderman/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/ampliebr/spiderman/actions/workflows/main.yml)

# Objetivo

Objetivo desse projeto é controlar toda a notificação das aplicações da amplie

Funcionalidades:

- envio de sms
- envio de email

# O que precisa para rodar?

- Docker e docker-compose - https://docs.docker.com/engine/install/ubuntu/
- NVM - https://github.com/nvm-sh/nvm
- NVM setado na versão 14 `nvm alias default 14`

Dicas:

- Para debugar o projeto já esta configurado no vscode basta clicar no debug, ele sobe a porta 9229 como debug, caso precise alterar essa porta é necessário alterar no arquivo .vscode/launch.json e no docker-compose.yml

- Para instalar algum pacote node basta digitar make install-package package={nome_do_pacote}
