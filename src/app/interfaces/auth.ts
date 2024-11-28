export interface RegisterPostData {
  fullname:string;
  email:string;
  password:string;
  level:string;
}

export interface User extends RegisterPostData {
  id:string;
}
