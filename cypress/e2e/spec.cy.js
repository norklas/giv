describe("user", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("signup", () => {
    cy.get("ul > :nth-child(1)").click();

    cy.get("#username").type("tester6");

    cy.get("#email").type("tester6@gmail.com");

    cy.get("#password").type("tester6password");

    cy.get("#submit-btn").click();
  });

  it("logout", () => {
    cy.wait(500);

    cy.get("ul > :nth-child(2)").click();
  });

  it("login", () => {
    cy.wait(500);

    cy.get("ul > :nth-child(2)").click();

    cy.get("#email").type("tester6@gmail.com");

    cy.get("#password").type("tester6password");

    cy.get("#submit-btn").click();
  });
});
