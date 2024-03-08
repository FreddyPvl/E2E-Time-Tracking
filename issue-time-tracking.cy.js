describe("Issue time tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should add, edit, remove time estimation successfully", () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('input[placeholder="Number"]').clear().type("10");
      cy.get('input[placeholder="Number"]').should("have.value", "10");
      cy.get('input[placeholder="Number"]').clear().type("12");
      cy.get('input[placeholder="Number"]').should("have.value", "12");
      cy.get('input[placeholder="Number"]').clear();
      cy.get("12").should("not.exist");
      cy.get('[data-testid="icon:close"]').eq(0).click();
    });
  });

  it("Should add, edit, remove time-logging successfully", () => {
    cy.get('[data-testid="modal:issue-details"]').within(() => {
      cy.get('[data-testid="icon:stopwatch"]').click();
    });
    cy.get('[data-testid="modal:tracking"]').should("be.visible");
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('input[placeholder="Number"]').eq(0).clear().type("4");
      cy.get('[placeholder="Number"]').eq(1).clear().type("3");
      cy.contains("4h logged").should("be.visible");
      cy.contains("3h remaining").should("be.visible");
      cy.contains("Done").click();
    });
    cy.get('[data-testid="modal:tracking"]').should("not.exist");

    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should("be.visible");
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('input[placeholder="Number"]').eq(0).clear().type("12");
      cy.get('[placeholder="Number"]').eq(1).clear().type("13");
      cy.contains("12h logged").should("be.visible");
      cy.contains("13h remaining").should("be.visible");
      cy.contains("Done").click();
    });
    cy.get('[data-testid="modal:tracking"]').should("not.exist");

    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should("be.visible");
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get('input[placeholder="Number"]').clear();
      cy.get('[placeholder="Number"]').clear();
      cy.contains("No time logged").should("be.visible");
      cy.contains("Done").click();
    });
  });
});
