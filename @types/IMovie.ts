export default interface IMovie {
  _id: string | number;
  title: string;
  runtime: number;
  released: Date;
  rating: number;
  votes: number;
  type: string;
}
