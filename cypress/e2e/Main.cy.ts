describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
    // cy.restoreLocalStorage()
    localStorage.setItem("available", true)
    cy.reload()
  })

  afterEach(() => {
    // cy.saveLocalStorage()
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

  it("Добавляет две команды, команды сохраняются после перезагрузки", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[data-testid="add-button"]').click()
    cy.get('[data-testid="add-button"]').click()

    cy.get('[data-testid="command"]').should("have.length", 2)

    cy.reload()

    cy.get('[data-testid="command"]').should("have.length", 2)
  })

  it("Добавляет команду, удаляет команду, после обновления команды не сохранились", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[data-testid="add-button"]').click()

    cy.get('[data-testid="command"]').should("have.length", 1)

    cy.get('[data-testid="delete-command"]').click()

    cy.get('[data-testid="command"]').should("have.length", 0)

    cy.reload()

    cy.get('[data-testid="command"]').should("have.length", 0)
  })

  it("Добавляет команду на клик по кнопке, запускает команду не в цикле", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()

    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="run-commands"]').click()
    cy.get('[data-testid="command-running-status"]').should("be.visible")
    cy.get('[data-testid="test-button"]').should("have.attr", "data-clicked")
    cy.get('[data-testid="test-button"]').should(
      "not.have.attr",
      "data-clicked"
    )
    cy.get('[data-testid="command-running-status"]').should("not.exist")

    cy.get('[data-testid="run-commands"]').should("be.visible")
  })

  it("Добавляет команду на поиск и команду на клик, запущено не циклично", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').click()
    cy.get('[name="cycled"]').should("be.not.checked")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').type("click")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').last().type("find")
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
    cy.get('[data-testid="command"]')
      .first()
      .find('[data-testid="command-complete-status"]')
      .should("be.visible")

    cy.get('[data-testid="run-commands"]').should("be.visible")
  })

  it("Добавляет две команды на поиск, запущено циклично", () => {
    cy.get('[data-testid="toggle-button"]').click()
    cy.get('[name="cycled"]').should("be.checked")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').type("find")
    cy.get('[name="selector"]').type("button")
    cy.get('[name="text"]').type("Click me")

    cy.get('[data-testid="add-button"]').click()
    cy.get('[name="name"]').last().type("find")
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
    cy.get('[data-testid="command"]')
      .first()
      .find('[data-testid="command-complete-status"]')
      .should("be.visible")

    cy.get('[data-testid="counter"]').should("have.text", 1)

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

    cy.get('[data-testid="counter"]').should("have.text", 2)

    cy.get('[data-testid="stop-commands"]').click()
    cy.get('[data-testid="run-commands"]').should("be.visible")
  })
})
