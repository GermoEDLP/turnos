import { Exercise } from 'src/app/interfaces/exercise.interface';
import { ClassesClass } from './classes.class';
import { MuscsClass } from './muscs.class';

export class ExerciseClass {
  public name: string;
  public id?: string;
  public created_at?: Date | any;
  public updated_at?: Date | any;
  public desc: string;
  public class?: {
    name: string;
    id?: string;
    updated_at?: Date | any;
    created_at?: Date | any;
  };
  public dif?: number;
  public url?: string;
  public musc_g?: {
    name: string;
    id?: string;
    updated_at?: Date | any;
    created_at?: Date | any;
  };

  constructor(
    isNew: boolean = true,
    isTest?: boolean,
    name?: string,
    desc?: string
  ) {
    if (isNew) {
      (this.name = ''),
        (this.id = ''),
        (this.desc = ''),
        (this.class = null),
        (this.dif = 0),
        (this.url = ''),
        (this.musc_g = null);
      this.created_at = '';
      this.updated_at = '';
    }
    if (isTest) {
      this.createExercise(name, desc);
    }
  }

  createExercise(name: string, desc: string): any {
    this.name = name;
    this.desc = desc;
    this.class = new ClassesClass('Activación');
    this.musc_g = new MuscsClass('pecho');
    this.created_at = new Date();
    this.updated_at = new Date();
    this.dif = 3;
  }
}
