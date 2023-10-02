describe("Notice tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/notice")
    localStorage.setItem("available", true)
    cy.reload()
  })

  it("Ждет появление элемента на странице, делает клик, как только находит элемент", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()

    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="run-commands"]').click()

    cy.get('[data-testid="notice"]').should("not.exist")
    cy.get('[data-testid="command-running-status"]').should("be.visible")
    cy.get('[data-testid="notice"]').should("be.visible")
    cy.get('[data-testid="notice"]').should("have.attr", "data-clicked")

    cy.get('[data-testid="run-commands"]').should("be.visible")
  })
})
