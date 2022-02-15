describe("Location based weather", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("is expected to be displayed on initial render", () => {
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "26°C");
      cy.get("[data-cy=city").should("contain", "Viturbo");
    });
  });
});
