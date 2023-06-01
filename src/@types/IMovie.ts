export default interface IMovie {
  _id: string | number;
  title: string;
  runtime: number;
  released: Date;
  imdb: { rating: number, votes: number; };

  type: string;
}
