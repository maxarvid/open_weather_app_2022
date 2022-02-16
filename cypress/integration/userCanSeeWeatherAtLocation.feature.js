describe("Location based weather", () => {
  beforeEach(() => {
    cy.intercept("https://api.openweathermap.org/data/2.5/weather?**", {
      fixture: "weatherResponse.json",
    });
    cy.intercept("https://api.opencagedata.com/geocode/v1/json?q=**", {
      fixture: "locationResponse.json",
    });
    cy.visit("/", {
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 42.420677,
            longitude: 12.107669,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    });
  });

  it("is expected to be displayed on initial render", () => {
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "26°C");
      cy.get("[data-cy=city]").should("contain", "Viterbo");
    });
  });

  it("is expected to display users coordinates", () => {
    cy.get("[data-cy=coords]").should(
      "contain.text",
      "You are at latitude 42.420677 and longitude 12.107669"
    );
  });
});
