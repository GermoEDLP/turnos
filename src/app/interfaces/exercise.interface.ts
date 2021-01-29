export interface Exercise {
  name: string;
  id?: string;
  created_at?: Date | any;
  updated_at?: Date | any;
  desc: string;
  class: string;
  dif: string;
  url?: string;
  musc_g?:string;
}
