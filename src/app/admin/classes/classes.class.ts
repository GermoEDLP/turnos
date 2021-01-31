import { ClassExercise } from "src/app/interfaces/exercise.interface";

export class ClassesClass implements ClassExercise{
  name: string;
  id: string;
  created_at: any;
  updated_at: any;

  constructor(name: string){
    this.name = name;
    this.id = '',
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
