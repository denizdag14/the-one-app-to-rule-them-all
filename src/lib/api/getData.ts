const API_KEY = process.env.API_KEY;

export interface Movie {
  id: string;
  title: string;
  release_date: string;
  director: string[];
  producer: string[];
  characters: string[];
  url_api: string;
}

export interface Realm {
  id: string;
  name: string;
  capital_url_api: string;
  founded_date: string;
  type: string;
  location: string;
  inhabitants: string[];
  characters: string[];
  url_api: string;
}

export interface Character {
  id: string;
  name: string;
  realm_url_api: string;
  height: string;
  hair_color: string;
  eye_color: string;
  date_of_birth: string;
  date_of_death: string;
  gender: string;
  species_api_url: string;
  race_api_url: string;
  group_api_url: string;
  weapons: string[];
  languages_url_api: string[];
  films_url_api: string[];
  books_url_api: string[];
  url_api: string;
}


export const getMovies = async (): Promise<Movie[] | null> => {
  try {
    const response = await fetch('https://lotrapi.co/api/v1/films');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const movies = data.results;
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
};

export const getRealms = async (): Promise<Realm[] | null> => {
  try {
    const response = await fetch('https://lotrapi.co/api/v1/realms');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const realms = data.results;
    return realms;
  } catch (error) {
    console.error('Error fetching realms:', error);
    return null;
  }
};

export const getCharacters = async (): Promise<Character[] | null> => {
  try {
    const response = await fetch('https://lotrapi.co/api/v1/characters');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const data_race = await fetch(data.results.race);
    const characters = data.results;
    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
};