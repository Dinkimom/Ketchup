describe("Redirect tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/redirect")
    localStorage.setItem("available", true)
    cy.reload()
  })

  it("Добавляет команду на редирект на другую страницу и клик на кнопку", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("a")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').last().type("click")
    cy.get('[name="selector"]').last().type("button")
    cy.get('[name="text"]').last().type("Click me")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').last().type("click")
    cy.get('[name="selector"]').last().type("button")
    cy.get('[name="text"]').last().type("No! Click me")

    cy.get('[data-testid="run-commands"]').click()
    cy.get('[data-testid="command"]')
      .first()
      .find('[data-testid="command-running-status"]')
      .should("be.visible")
    cy.get('[data-testid="command"]')
      .first()
      .get('[data-testid="command-complete-status"]', { timeout: 7000 })
      .should("be.visible")

    cy.get('[data-testid="command"]')
      .last()
      .find('[data-testid="command-running-status"]')
      .should("be.visible")

    cy.get('[data-testid="run-commands"]', { timeout: 7000 }).should(
      "be.visible"
    )
    cy.get('[data-testid="counter"]').should("have.text", 1)
  })
})
