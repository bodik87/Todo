export interface IUser {
  name: string;
  password: string;
}

export interface ISnippet {
  id: string;
  body: string;
}

export interface ITodo {
  id: string;
  todoBody: string;
  isCompleted: boolean;
}
