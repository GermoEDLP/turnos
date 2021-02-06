import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  ClassExercise,
  Exercise,
  MuscularGroup,
} from 'src/app/interfaces/exercise.interface';
import { MessageSimple } from 'src/app/interfaces/misc.interaces';
import { ClassesClass } from '../../classes/classes.class';
import { ExerciseClass } from '../../classes/exercise.class';
import { MuscsClass } from '../../classes/muscs.class';
import { ClassService } from '../../services/class.service';
import { ExerciseService } from '../../services/exercise.service';
import { MuscularGroupService } from '../../services/muscular-group.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [MessageService],
})
export class ConfigComponent implements OnInit {
  exercises: Exercise[];
  classes: ClassExercise[];
  muscs: MuscularGroup[];

  constructor(
    private exerSvc: ExerciseService,
    private messageService: MessageService,
    private classSvc: ClassService,
    private muscSvc: MuscularGroupService
  ) {}

  ngOnInit(): void {
    // this.getExercises();
    // this.getClasses();
    // this.getMusc();
    this.classes = [new ClassesClass('Fuerza')];
    this.muscs = [new MuscsClass('Pecho'), new MuscsClass('Espalda')]
    this.exercises = [{
      desc: 'Banco plano con barra',
      name: 'Banco plano',
      dif: 2,
      class:{
        name: 'Fuerza',
      },
      musc_g: {
        name: 'Pecho'
      }
    }];
  }

  getExercises() {
    this.exerSvc.getExercises().subscribe((exers: Exercise[]) => {
      this.exercises = exers;
    });
  }

  getClasses() {
    this.classSvc.getClassExercise().subscribe((c: ClassExercise[]) => {
      this.classes = c;
    });
  }

  getMusc() {
    this.muscSvc.getMuscularGroups().subscribe((m: MuscularGroup[]) => {
      this.muscs = m;
    });
  }

  messageSystem(event: MessageSimple) {
    this.messageService.add(event);
  }
}
