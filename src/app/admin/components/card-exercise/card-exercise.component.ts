import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { MessageSimple } from 'src/app/interfaces/misc.interaces';
import { ExerciseClass } from '../../classes/exercise.class';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'card-exercise',
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.css'],
  providers: [ConfirmationService]
})
export class CardExerciseComponent implements OnInit {
  @Input('exercises') exercises: Exercise[];
  @Output() msg: EventEmitter<any> = new EventEmitter();
  displayVideo: boolean = false;
  display: boolean = false;
  exerSelected: Exercise;
  nuevo: boolean = false;
  urlVideo: string;

  constructor(
    private exerSvc: ExerciseService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}


  loadVideo(url: string){
    this.urlVideo = url;
    this.displayVideo = true;
  }
  closeVideo(){
    this.urlVideo = undefined;
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
        this.msg.emit({
          severity: 'success',
          summary: 'Creado',
          detail: 'Ejercicio creado correctamente',
        });
      })
      .catch((e) => {
        this.msg.emit({
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
    this.exerSvc
      .updateExercise(exer)
      .then(() => {
        this.msg.emit({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Ejercicio actualizado correctamente',
        });
      })
      .catch((e) => {
        this.msg.emit({
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
            this.msg.emit({
              severity: 'success',
              summary: 'Borrado',
              detail: 'Ejercicio borrado correctamente',
            });
          })
          .catch((e) => {
            this.msg.emit({
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
