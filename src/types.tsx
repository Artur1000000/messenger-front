export interface IButtonLink {
  path: string;
  title: string;
  onClick?: any;
}

export interface IField {
  name?: string;
  label: string;
  type?: string;
  id: string;
  error?: boolean;
  helperText?: string;
  register?: any;
}

export interface IAuthUser {
  userName: string;
  id: string;
  message?: null | string;
}

export interface IInitialStateAuth extends IAuthUser {
  status: null | string;
  isLoading: boolean;
}

export interface IMessages {
  _id: string;
  from: string;
  to: string;
  theme: string;
  text: string;
  createdAt: string;
  status:boolean,
  message?: string;
}

export interface IData{
  messages:IMessages[],
  themes:string[]
}

export interface IInitialState {
  data: IData | null;
  status: null | string;
  isLoading: boolean;
  message: null | string;
}
export interface IUserData {
  id: string;
  userName: string;
  cheked?: boolean;
}

export interface IInitialStateUsers {
  data: IUserData[];
  status: string;
  isLoading: boolean;
}
