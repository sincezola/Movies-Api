import { isTheseWrongData } from "../../services/movie-entity-verify";

export interface MovieProps {
  id?: string;
  name: string;
  duration: number;
  category: string;
}

export class Movie {
  constructor(private props: MovieProps) {
    const { id, name, duration, category } = props;

    const isWrongData = isTheseWrongData({
      id,
      name,
      duration,
      category,
    });

    if (isWrongData) {
      throw new Error(isWrongData);
    }
  }

  // Agora as propriedades podem ser acessadas diretamente de 'props'
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get duration() {
    return this.props.duration;
  }

  get category() {
    return this.props.category;
  }
}
