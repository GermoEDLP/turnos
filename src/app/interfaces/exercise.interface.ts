export interface Exercise {
  name: string;
  id?: string;
  created_at?: Date | any;
  updated_at?: Date | any;
  desc: string;
  class?: ClassExercise;
  dif?: number;
  url?: string;
  musc_g?: MuscularGroup;
}

export interface MuscularGroup {
  name: string;
  id?: string;
  updated_at?: Date | any;
  created_at?: Date | any;
}

export interface ClassExercise {
  name: string;
  id?: string;
  updated_at?: Date | any;
  created_at?: Date | any;
}


