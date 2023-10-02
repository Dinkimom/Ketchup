describe("Notice tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/helpers")
    localStorage.setItem("available", true)
    cy.reload()
  })

  it("Добавляет команду клика, проверяет запуск одной функции", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()

    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="add-button"]').click()

    cy.get('[name="name"]').last().type("click")
    cy.get('[name="selector"]').last().type("button")
    cy.get('[name="text"]').last().type("Click me")

    cy.get('[data-testid="run-command"]').last().click()

    cy.get('[data-testid="command"]')
      .last()
      .find('[data-testid="command-running-status"]')
      .should("be.visible")
    cy.get('[data-testid="test-button"]')
      .should("have.attr", "data-clicked")

    cy.get('[data-testid="run-commands"]').should("be.visible")
  })

  it("Добавляет команду клика, проверяет запуск показа по селектору", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()

    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="show-command"]').click()

    cy.get('[data-testid="test-button"]').should("have.attr", "data-found")
    cy.get('[data-testid="test-button"]').should("not.have.attr", "data-found")

    cy.get('[data-testid="run-commands"]').should("be.visible")
  })
})
