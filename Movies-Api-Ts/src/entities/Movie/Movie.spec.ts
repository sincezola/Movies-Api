import { expect, it, describe } from "vitest";
import { Movie } from "./Movie";

describe("create a movie", () => {
  it("shouldn't be able to create a movie with duration 0", () => {
    expect(() => {
      return new Movie({
        name: "Adventure Time",
        duration: 0,
        category: "Action",
      });
    }).toThrow();
  });

  it("shouldn't be able to create a movie without name", () => {
    expect(() => {
      return new Movie({
        name: "",
        duration: 180,
        category: "Action",
      });
    }).toThrow();
  });

  it("shouldn't be able to create a movie without category", () => {
    expect(() => {
      return new Movie({
        name: "Adventure Time",
        duration: 180,
        category: "",
      });
    }).toThrow();
  });
});
