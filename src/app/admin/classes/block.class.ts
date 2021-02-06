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
   if(isNew){
    this.id = '';
    this.created_at = '';
    this.updated_at = '';
    this.name =  '';
    this.nameDisplay =  '';
    this.activated = false;
    this.exercises = [];
   }
   if(isTest){
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

  public createBlock() {}
}

export class LoadExercise {
  exercise: Exercise;
  id: string;
  load_at: Date | any;
  updated_at: Date | any;
  work_cicle: WorkCicle[];

  constructor(){
    this.exercise = new ExerciseClass(true, true, 'Mancuernas', 'Levantamiento de mancuernas')
    this.id = '001-1';
    this.load_at = new Date();
    this.updated_at = new Date();
    this.work_cicle = [];
  }
}

export class WorkCicle {
  public cicle: number;
  public repetition: number;
  public weigth: string;

  constructor() {
    this.cicle = 4;
    this.repetition = 12;
    this.weigth = '55 Kg';
  }
}
