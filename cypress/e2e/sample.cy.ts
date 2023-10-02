describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it("Показывает кнопку раскрытия, если выставлен параметр available", () => {
    localStorage.setItem("available", false)
    cy.reload()
    cy.get('[data-testid="toggle-button"').should("not.exist")

    localStorage.setItem("available", true)
    cy.reload()
    cy.get('[data-testid="toggle-button"').should("be.visible")
  })

  it("Показывает и скрывает контент, если нажать на кнопку раскрытия", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[data-testid="content"').should("be.visible")
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[data-testid="content"').should("not.exist")
  })
})
