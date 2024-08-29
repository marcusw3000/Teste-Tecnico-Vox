# Teste-Tecnico-Vox

## Projeto de Testes Automatizados com Cypress
Este projeto contém uma suíte de testes automatizados desenvolvida com Cypress para validar as funcionalidades principais de um site de e-commerce. O foco dos testes está na verificação do fluxo de login, visualização de produtos, adição e remoção de itens do carrinho de compras, e finalização de compra.

## Estrutura dos Testes
Os testes estão organizados em diferentes descrições (describe), cada uma correspondendo a um conjunto específico de funcionalidades:

## 1. Login
```
Descrição: Valida o processo de login com credenciais válidas e inválidas.
    Login com credenciais válidas.
    Tentativa de login com senha incorreta.
    Tentativa de login com nome de usuário incorreto.
    Tentativa de login sem preencher o campo de usuário.
    Tentativa de login sem preencher o campo de senha.
    Logout após login bem-sucedido.
```

## 2. Visualização de Produtos
```
Descrição: Verifica a visualização dos produtos na página principal após o login.
    Verifica se os produtos estão visíveis, com nome e preço corretos.
```

## 3. Adicionar ao Carrinho
```
Descrição: Testa a funcionalidade de adicionar produtos ao carrinho.
    Adição de um produto ao carrinho.
    Adição de dois produtos ao carrinho.
    Adição de todos os produtos disponíveis ao carrinho.
```

## 4. Remover do Carrinho
```
Descrição: Testa a funcionalidade de remoção de produtos do carrinho.
    Adicionar um produto ao carrinho e removê-lo.
    Adicionar todos os produtos ao carrinho e removê-los.
```

## 5. Finalizar Compra
```
Descrição: Valida o processo completo de finalização de compra.
    Adição de um produto ao carrinho e finalização da compra, incluindo a verificação do preço total e a confirmação de que a ordem foi concluída.
```

## Configuração e Execução dos Testes
Pré-requisitos:

Node.js instalado na máquina.

Cypress instalado no projeto.

## Instalação

1-Clone este repositório.

2-Navegue até o diretório do projeto e execute o comando:

```bash
npm install
```

## Executando os Testes

3-Para executar todos os testes, utilize o comando: (Isso abrirá a interface do Cypress, onde você pode selecionar os arquivos de teste que deseja executar.)
```
npx cypress open
```
4-Alternativamente, você pode executar os testes em modo headless com:
```
npx cypress run
```


Isso abrirá a interface gráfica do Cypress, onde você poderá escolher os testes a serem executados.


Estrutura do Código
webPage: Constante que armazena a URL do site que será testado.
cy.login: Função auxiliar que automatiza o processo de login, usada para preparar o estado do teste.

## Evidencias

![image](https://github.com/user-attachments/assets/8b79fa21-ea89-4f11-b0e3-9a149dab6803)

