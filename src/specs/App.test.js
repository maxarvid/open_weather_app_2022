import React from "react";
import axios from "axios";
import App from "../App";
import { act } from "react-dom/test-utils";
import { screen, render } from "@testing-library/react";

let mockGeolocation;
let locationResponseSpy;
let weatherResponseSpy;

const whenStable = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

describe("App.jsx", () => {
  beforeEach(async () => {
    mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: { latitude: 42.420677, longitude: 12.107669 },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    weatherResponseSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({ data: { main: { temp: 26 } } });

    locationResponseSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce({
        data: { results: [{ components: { city: "Viterbo" } }] },
      });

    render(<App />);
    await whenStable();
  });

  it("is expected to display user coordinates", () => {
    expect(
      screen.getByText("You are at latitude 42.420677 and longitude 12.107669")
    ).toBeInTheDocument();
  });

  it("is expected to get geolocation once", () => {
    expect(mockGeolocation.getCurrentPosition).toBeCalledTimes(1);
  });

  it("is expected to display the temperature", () => {
    expect(screen.getByTestId("temp")).toHaveTextContent("26°C");
  });

  it("is expected to display the city", () => {
    expect(screen.getByTestId("city")).toHaveTextContent("Viterbo");
  });
});
