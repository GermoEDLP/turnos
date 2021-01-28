export interface User{
  id?: string,
  name: string,
  surname: string,
  email: string,
  created_at?: Date | any,
  updated_at?: Date | any,
  born: Date | any,
  bio?: string,
  dataW?: DataWeightUser[]
  tall: number,
}

export interface DataWeightUser{
  weigth: number,
  date: Date | any
}
