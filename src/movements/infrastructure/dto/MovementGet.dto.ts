import { OrderType } from "../../domain/OrderType";

export class MovementGetDto {
  page: number;
  limit: number;
  order: OrderType;

  constructor(props: { page: number; limit: number; order: OrderType }) {
    this.page = props.page || 0;
    this.limit = props.limit || 0;
    this.order = props.order || OrderType.ASC;
  }
}
