export class MovementUpdateDto {
  id: string;
  concept: string;
  amount: number;
  date: Date;

  constructor(props: {
    id: string;
    concept: string;
    amount: number;
    date: Date;
  }) {
    this.id = props.id;
    this.concept = props.concept;
    this.amount = props.amount;
    this.date = props.date;
  }
}
