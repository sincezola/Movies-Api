import type { MovieProps } from "../entities/Movie/Movie";

export const isTheseWrongData = (props: MovieProps): string | null => {
  const { id, name, duration, category } = props;

  if (id && id === "") {
    return "Invalid id inserted.";
  }

  if (!name || !duration || !category) {
    return "Invalid data received.";
  }

  if (duration <= 0) {
    return "The duration cannot be smaller than 1.";
  }

  return null;
};
