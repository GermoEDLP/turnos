import { ClassExercise, Exercise } from 'src/app/interfaces/exercise.interface';
import { ClassesClass } from './classes.class';
import { ExerciseClass } from './exercise.class';

export class Block {
  public id: string;
  public type: ClassExercise;
  public created_at: Date | any;
  public updated_at: Date | any;
  public name: string;
  public nameDisplay: string;
  public activated: boolean;
  public exercises: LoadExercise[];

  constructor(isNew: boolean = false, isTest?: boolean) {
    if (isNew) {
      this.id = '';
      this.created_at = '';
      this.updated_at = '';
      this.name = '';
      this.nameDisplay = '';
      this.activated = false;
      this.exercises = [];
    }
    if (isTest) {
      this.id = '001';
      this.type = new ClassesClass('Activación');
      this.created_at = new Date();
      this.updated_at = new Date();
      this.name = 'Fuerza para principiantes';
      this.nameDisplay = 'Fuerza';
      this.activated = true;
      this.exercises = [new LoadExercise()];
    }
  }

  addLoadExercise(l: LoadExercise){
    this.exercises.push(l);
  }

  addExercise(e: Exercise){
    this.exercises.push(new LoadExercise(false, e, new WorkCicle(false, null, null, '')));
  }

  removeExercise(i: number){
    this.exercises.splice(i, 1);
  }

  public createBlock() {}
}

export class LoadExercise {
  exercise: Exercise;
  load_at: Date | any;
  work_cicle: WorkCicle[];

  constructor(isTest: boolean = true, e?: Exercise, w?: WorkCicle) {
    if (isTest) {
      this.exercise = new ExerciseClass(
        true,
        true,
        'Mancuernas',
        'Levantamiento de mancuernas'
      );
      this.load_at = new Date();
      this.work_cicle = [];
    } else {
      this.exercise = e;
      this.load_at = new Date();
      if(w){
        this.work_cicle = [w];
      }else{
        this.work_cicle = [];
      }
    }
  }

  addWorkCicle(w: WorkCicle) {
    this.work_cicle.push(w);
  }

  removeWorkCicle(i: number) {
    this.work_cicle.splice(i, 1);
  }
}

export class WorkCicle {
  public cicle: number;
  public repetition: number;
  public weigth: string;

  constructor(isTest: boolean = true, c?: number, r?: number, w?: string) {
    if (isTest) {
      this.cicle = 4;
      this.repetition = 12;
      this.weigth = '55 Kg';
    } else {
      this.cicle = c;
      this.repetition = r;
      this.weigth = w;
    }
  }
}
