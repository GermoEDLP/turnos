import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Exercise } from 'src/app/interfaces/exercise.interface';
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
      console.log(exers);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  loadCreateExer() {
    this.display = true;
  }

  loadEditExer() {}

  createExer() {}

  editExer() {}

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
              severity: 'success',
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
}
