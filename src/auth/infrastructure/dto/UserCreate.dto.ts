export class UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(props: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
  }
}
