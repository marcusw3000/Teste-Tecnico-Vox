//Constante para alocar o site
const webPage = 'https://www.saucedemo.com/v1/'

describe('Login', () => {
  it('Deve validar o Login', () => {
    cy.visit(webPage)

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('#login-button').click()

    //Verifica a existencia do header da pagina
    cy.get('.header_secondary_container')
      .should('exist');

    //Verifica a existencia do botao de Logout
    cy.get('.bm-burger-button > button').click()
      .get('#logout_sidebar_link').should('exist')
  })

  it('Deve tentar logar com senha invalida', () => {
    cy.visit(webPage)

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauceeee')

    cy.get('#login-button').click()

    //Verifica a mensagem de erro
    cy.get('[data-test="error"]')
      .contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
  });

  it('Deve tentar logar com usuario invalido', () => {
    cy.visit(webPage)

    cy.get('[data-test="username"]').type('standard_useeeer')
    cy.get('[data-test="password"]').type('secret_saucee')

    cy.get('#login-button').click()

    //Verifica a mensagem de erro
    cy.get('[data-test="error"]')
      .contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
  });

  it('Deve tentar logar sem digitar o campo de usuario', () => {
    cy.visit(webPage)

    cy.get('[data-test="password"]').type('secret_sauceeee')

    cy.get('#login-button').click()

    //Verifica a mensagem de erro
    cy.get('[data-test="error"]')
      .contains('Epic sadface: Username is required').should('be.visible')
  });
  it('Deve tentar logar sem digitar o campo de senha', () => {
    cy.visit(webPage)

    cy.get('[data-test="username"]').type('standard_user')

    cy.get('#login-button').click()

    //Verifica a mensagem de erro
    cy.get('[data-test="error"]')
      .contains('Epic sadface: Password is required').should('be.visible')
  });

  it('Deve deslogar', () => {
    cy.visit(webPage)

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('#login-button').click()

    //Verifica a existencia do header da pagina
    cy.get('.header_secondary_container')
      .should('exist');

    //Desloga da sessao atual
    cy.get('.bm-burger-button > button').click()
    cy.get('#logout_sidebar_link').click()

    //Verifica se o login foi bem sucedido
    cy.get('#login_button_container')
      .should('exist')
  })
})

describe('Visualização de Produtos', () => {

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  });
  it('Verificar se os produtos estao aparecendo na home page', () => {
    cy.get('#item_4_img_link > .inventory_item_img')
      .should('exist') //Verifica se existe uma imagem sendo exibida

    cy.get('#item_4_title_link > .inventory_item_name')
      .should('exist')
      .contains('Sauce Labs Backpack').should('be.visible') //Verifica se existe um nome de produto sendo exibido

    cy.get(':nth-child(1) > .pricebar > .inventory_item_price')
      .should('exist')
      .contains('$29.99').should('be.visible') //Verifica se existe um preço sendo exibido
  });
});

describe('Adicionar ao Carrinho', () => {

  //beforeEach usado para logar na pagina
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  });
  it('Deve adicionar 1 produto ao carrinho', () => {
    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click() //Adiciona o primeiro produto ao carrinho
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter') //Verifica se o produto está no carrinho
      .should('have.text', '1')
  });
  it('Deve adicionar 2 produtos ao carrinho', () => {
    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(2)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter') //Verifica se os produtos estão no carrinho
      .should('have.text', '2')
  });

  it('Deve adicionar todos os produtos ao carrinho', () => {
    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(2)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(3)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(4)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(5)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(6)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter') //Verifica se os produtos estão no carrinho
      .should('have.text', '6')
  });
})

describe('Remover do Carrinho', () => {

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  });
  it('Deve adicionar 1 produto ao carrinho e excluir', () => {
    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click() //Adiciona o primeiro produto ao carrinho
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter').click() //Clica no carrinho

    cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .btn_secondary').click() //Remove o item do carrinho

    cy.get('fa-layers-counter shopping_cart_badge')
      .should('not.exist') //Verifica se ainda existe algum item no carrinho
  });

  it('Deve adicionar todos os produto ao carrinho e exclui-los', () => {
    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(2)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(3)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(4)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(5)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.inventory_list > :nth-child(6)')
      .contains('ADD TO CART').click()
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter').click() //Clica no carrinho

    cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > .btn_secondary').click()

    cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > .btn_secondary').click()

    cy.get(':nth-child(5) > .cart_item_label > .item_pricebar > .btn_secondary').click()

    cy.get(':nth-child(6) > .cart_item_label > .item_pricebar > .btn_secondary').click()

    cy.get(':nth-child(7) > .cart_item_label > .item_pricebar > .btn_secondary').click()

    cy.get('.item_pricebar > .btn_secondary').click()

    cy.get('fa-layers-counter shopping_cart_badge')
      .should('not.exist') //Verifica se ainda existe algum item no carrinho

  });
})

describe('Finalizar Compra', () => {
  it('Deve finalizar a compra', () => {
    cy.login('standard_user', 'secret_sauce')

    cy.get('.inventory_list > :nth-child(1)')
      .contains('ADD TO CART').click() //Adiciona o primeiro produto ao carrinho
      .should('have.text', 'REMOVE') //Verifica se o produto foi adicionado

    cy.get('.fa-layers-counter') //Verifica se o produto está no carrinho
      .should('have.text', '1')

    cy.get('.fa-layers-counter').click() //Clica no carrinho

    cy.get('.btn_action').click()

    cy.get('[data-test="firstName"]').type('Nome')
    cy.get('[data-test="lastName"]').type('Sobrenome')
    cy.get('[data-test="postalCode"]').type('3070340')

    cy.get('.btn_primary').click()

    cy.get('.summary_subtotal_label')
      .should('contain.text', '$29.99') //Verifica se o preço total está correto

    cy.get('.btn_action').click()

    cy.get('.complete-header')
      .should('contain.text', 'THANK YOU FOR YOUR ORDER') //Verifica se a ordem de compra foi concluida
  });
});