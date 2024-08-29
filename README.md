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

## BDD

1 - Login
```
Funcionalidade: Autenticação de Usuário
    Para acessar o sistema
    Como um usuário registrado
    Eu preciso ser capaz de fazer login com minhas credenciais

Cenario: Login com credenciais válidas
    Given que o usuário está na página de login
    When o usuário insere o nome de usuário "standard_user" e a senha "secret_sauce"
    And clica no botão de login
    Then o usuário deve ser redirecionado para a página principal
    And deve ver a barra de navegação superior

Cenario: Login com senha inválida
    Given que o usuário está na página de login
    When o usuário insere o nome de usuário "standard_user" e a senha "senha_errada"
    And clica no botão de login
    Then uma mensagem de erro "Epic sadface: Username and password do not match any user in this service" deve ser exibida

Cenario: Login com nome de usuário inválido
    Given que o usuário está na página de login
    When o usuário insere o nome de usuário "usuario_invalido" e a senha "secret_sauce"
    And clica no botão de login
    Then uma mensagem de erro "Epic sadface: Username and password do not match any user in this service" deve ser exibida

Cenario: Login sem preencher o campo de usuário
    Given que o usuário está na página de login
    When o usuário insere a senha "secret_sauce"
    And clica no botão de login
    Then uma mensagem de erro "Epic sadface: Username is required" deve ser exibida

Cenario: Login sem preencher o campo de senha
    Given que o usuário está na página de login
    When o usuário insere o nome de usuário "standard_user"
    And clica no botão de login
    Then uma mensagem de erro "Epic sadface: Password is required" deve ser exibida

Cenario: Deslogar da aplicação
    Given que o usuário está logado
    When o usuário clica no botão de menu
    And clica no botão de logout
    Then o usuário deve ser redirecionado para a página de login
    And o botão de login deve estar visível
```

2 - Visualização de Produtos
```
Funcionalidade: Visualização de Produtos
    Para decidir quais produtos comprar
    Como um usuário autenticado
    Eu preciso ver a lista de produtos na página principal

Cenario: Verificar a exibição dos produtos na página principal
    Given que o usuário está logado
    When o usuário navega para a página principal
    Then o usuário deve ver imagens de produtos
    And deve ver os nomes dos produtos
    And deve ver os preços dos produtos
```

3 - Adicionar ao Carrinho
```
Funcionalidade: Adicionar Produtos ao Carrinho
    Para fazer uma compra
    Como um usuário autenticado
    Eu preciso adicionar produtos ao meu carrinho de compras

Cenario: Adicionar um produto ao carrinho
    Given que o usuário está logado e na página principal
    When o usuário clica em "ADD TO CART" para o primeiro produto
    Then o botão deve mudar para "REMOVE"
    And o ícone do carrinho deve mostrar "1"

Cenario: Adicionar dois produtos ao carrinho
    Given que o usuário está logado e na página principal
    When o usuário clica em "ADD TO CART" para os dois primeiros produtos
    Then ambos os botões devem mudar para "REMOVE"
    And o ícone do carrinho deve mostrar "2"

Cenario: Adicionar todos os produtos ao carrinho
    Given que o usuário está logado e na página principal
    When o usuário clica em "ADD TO CART" para todos os produtos disponíveis
    Then todos os botões devem mudar para "REMOVE"
    And o ícone do carrinho deve mostrar o número total de produtos adicionados

```

4 - Remover do Carrinho
```
Funcionalidade: Remover Produtos do Carrinho
    Para corrigir meu pedido
    Como um usuário autenticado
    Eu preciso remover produtos do meu carrinho de compras

Cenario: Remover um produto do carrinho
    Given que o usuário adicionou um produto ao carrinho
    When o usuário navega para o carrinho
    And clica em "REMOVE" para o produto
    Then o produto deve ser removido do carrinho
    And o ícone do carrinho não deve exibir nenhum número

Cenario: Remover todos os produtos do carrinho
    Given que o usuário adicionou todos os produtos ao carrinho
    When o usuário navega para o carrinho
    And clica em "REMOVE" para cada produto
    Then todos os produtos devem ser removidos do carrinho
    And o ícone do carrinho não deve exibir nenhum número
```
5 - Finalizar Compra
```
Funcionalidade: Finalizar Compra
    Para completar uma compra
    Como um usuário autenticado
    Eu preciso passar pelo processo de finalização do pedido

Cenario: Finalizar a compra com um produto no carrinho
    Given que o usuário adicionou um produto ao carrinho
    When o usuário navega para o carrinho
    And clica em "CHECKOUT"
    And preenche o formulário de informações de entrega
    And clica em "CONTINUE"
    Then o resumo da compra deve mostrar o preço correto
    When o usuário clica em "FINISH"
    Then o usuário deve ver uma mensagem "THANK YOU FOR YOUR ORDER"
```
