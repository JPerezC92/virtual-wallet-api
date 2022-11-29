import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "Users" })
export class UserPersistence {
	@PrimaryColumn({ type: "uuid" })
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column()
	refreshToken!: string;
}
