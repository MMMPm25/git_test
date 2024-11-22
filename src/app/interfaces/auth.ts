export interface RegisterPostData {
  fullname:string;
  email:string;
  password:string;
}

export interface User extends RegisterPostData {
  id:string;
}
