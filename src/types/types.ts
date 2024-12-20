export type Item = {
  fact: string;
  length: number;
  user: {
    name: {
      first: string;
      last: string;
    };
    picture: {
      thumbnail: string;
    };
  };
};

export type Page = {
  data: Item[];
  next_page_url: string | null;
};

export type CatFact = {
  fact: string;
  length: number;
};