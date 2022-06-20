export class UserEndpointDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(props: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
  }
}
