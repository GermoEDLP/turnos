import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { ExerciseClass } from '../../classes/exercise.class';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ConfigComponent implements OnInit {
  exercises: Exercise[];
  display: boolean = false;
  nuevo: boolean = false;
  exerSelected: Exercise;

  constructor(
    private exerSvc: ExerciseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises() {
    this.exerSvc.getExercises().subscribe((exers: Exercise[]) => {
      this.exercises = exers;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  loadCreateExer() {
    this.exerSelected = new ExerciseClass(true);
    this.nuevo = true;
    this.display = true;
  }

  loadEditExer(exer: Exercise) {
    this.nuevo = false;
    this.exerSelected = exer;
    this.display = true;
  }

  evaluateComplete(event) {
    console.log(event);

    if (event.status) {
      this.createExer(event.exer);
    } else {
      this.editExer(event.exer);
    }
  }

  createExer(exer: Exercise) {
    this.exerSvc
      .cretedExecercise(exer)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Creado',
          detail: 'Ejercicio creado correctamente',
        });
      })
      .catch((e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Ocurrio un error, intentelo mas tarde. (Error code: ' +
            e.code +
            ').',
        });
      });
  }

  editExer(exer: Exercise) {
    this.exerSvc.updateExercise(exer)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Ejercicio actualizado correctamente',
        });
      })
      .catch((e) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Ocurrio un error, intentelo mas tarde. (Error code: ' +
            e.code +
            ').',
        });
      });
  }

  deleteExer(exer: Exercise) {
    this.confirmationService.confirm({
      message: 'Esta seguro de borrar este ejercicio: ' + exer.name,
      accept: () => {
        this.exerSvc
          .deleteExercise(exer)
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Borrado',
              detail: 'Ejercicio borrado correctamente',
            });
          })
          .catch((e) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Ocurrio un error, intentelo mas tarde. (Error code: ' +
                e.code +
                ').',
            });
          });
      },
    });
  }

  closeExerciseForm() {
    this.nuevo = false;
    this.exerSelected = undefined;
    this.display = false;
  }
}
