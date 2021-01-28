import { Category } from "./category.interface";

export interface Activity{
  name: string,
  desc: string,
  id?: string,
  schedule?: Schedule[],
  schedule_desc: string,
  created_at?: Date | any;
  updated_at?: Date | any;
  category: Category[],
  members?: number,
  status: boolean
}

export interface Schedule{
  day: number,
  hour_start: Time,
  hour_end: Time
}

export interface Time{
  hour: number,
  min: number
}
