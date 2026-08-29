export interface register extends loginface {
  name: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  rePassword: string;
}
export interface loginface {
  email: string;
  password: string;
}
