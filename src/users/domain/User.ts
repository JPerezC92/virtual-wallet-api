export class User {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  refreshToken: string;

  constructor(props: {
    id: string;
    firstName: string;
    email: string;
    lastName: string;
    password: string;
    refreshToken: string;
  }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.refreshToken = props.refreshToken;
  }

  public updateRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
  }
}
