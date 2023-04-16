export interface UserDetailsProps {
	firstName: string;
	lastName: string;
	email: string;
}

export class UserDetails implements UserDetailsProps {
	firstName: string;
	lastName: string;
	email: string;

	constructor(props: UserDetailsProps) {
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.email = props.email;
	}
}
