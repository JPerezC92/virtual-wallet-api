import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { BudgetMovementType } from "../domain/BudgetMovementType";

@Entity({ name: "Movements" })
export class MovementPersistence {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  concept: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column({
    type: "enum",
    enum: BudgetMovementType,
  })
  type: BudgetMovementType;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
