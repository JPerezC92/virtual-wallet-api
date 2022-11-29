import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryColumn,
	RelationId,
	UpdateDateColumn,
} from "typeorm";

import { BudgetMovementType } from "@/Movements/domain";
import { UserPersistence } from "@/Users/infrastructure/Users.persistence";

@Entity({ name: "Movements" })
export class MovementPersistence {
	@PrimaryColumn({ type: "uuid" })
	id: string;

	@Column()
	concept: string;

	@Column({ type: "decimal", precision: 15, scale: 2 })
	amount: string;

	@Column({ type: "date" })
	date: string;

	@ManyToOne(() => UserPersistence, { nullable: false })
	user: UserPersistence;

	@RelationId((movement: MovementPersistence) => movement.user)
	userId: string;

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
