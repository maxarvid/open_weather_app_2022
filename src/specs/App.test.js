import React from "react";
import App from "../App";
import { screen, render } from "@testing-library/react";

let mockGeolocation;

describe("App.jsx", () => {
  beforeEach(() => {
    mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: { latitude: 42.420677, longitude: 12.107669 },
          })
        )
      ),
    };

    global.navigator.geolocation = mockGeolocation;

    render(<App />);
  });

  it("is expected to display user coordinates", () => {
    expect(
      screen.getByText("You are at latitude 42.420677 and longitude 12.107669")
    ).toBeInTheDocument();
  });

  it("is expected to get geolocation once", () => {
    expect(mockGeolocation.getCurrentPosition).toBeCalledTimes(1);
  });
});
