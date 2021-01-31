import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ClassExercise,
  MuscularGroup,
} from 'src/app/interfaces/exercise.interface';
import { MessageSimple } from 'src/app/interfaces/misc.interaces';
import { ClassesClass } from '../../classes/classes.class';
import { MuscsClass } from '../../classes/muscs.class';
import { ClassService } from '../../services/class.service';
import { MuscularGroupService } from '../../services/muscular-group.service';

@Component({
  selector: 'card-config',
  templateUrl: './card-config.component.html',
  styleUrls: ['./card-config.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CardConfigComponent implements OnInit {
  @Input('group') group: ClassExercise[] | MuscularGroup[] | any[];
  @Input('type') type: 'class' | 'musc' | string;
  @Output() msg: EventEmitter<MessageSimple> = new EventEmitter();
  display: boolean = false;
  title: string;
  operation: 'class' | 'musc' | string;
  itemSelected: ClassExercise | MuscularGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private classSvc: ClassService,
    private muscSvc: MuscularGroupService
  ) {}

  ngOnInit(): void {}

  closeForm() {
    this.itemSelected = undefined;
    this.display = false;
  }

  loadCreateItem() {
    switch (this.type) {
      case 'class':
        this.title = 'Nueva clase';
        this.itemSelected = new ClassesClass('');
        break;
      case 'musc':
        this.title = 'Nuevo Grupo muscular';
        this.itemSelected = new MuscsClass('');
        break;
    }
    this.display = true;
    this.operation = 'new';
  }

  loadEditItem(item: ClassExercise | MuscularGroup) {
    switch (this.type) {
      case 'class':
        this.title = 'Actualizar clase';
        break;
      case 'musc':
        this.title = 'Actualizar Grupo muscular';
        break;
    }
    this.itemSelected = item;
    this.display = true;
    this.operation = 'old';
  }

  check(event: ClassExercise | MuscularGroup) {
    switch (this.type) {
      case 'class':
        switch (this.operation) {
          case 'new':
            this.createClass(event);
            break;
          case 'old':
            this.updateClass(event);
            break;
        }
        break;
      case 'musc':
        switch (this.operation) {
          case 'new':
            this.createMusc(event);
            break;
          case 'old':
            this.updateMusc(event);
            break;
        }
        break;
    }
  }

  createClass(event: ClassExercise | MuscularGroup) {
    this.classSvc
      .creteClassExercise(event)
      .then(() => {
        this.thenMsg('Confirmado', 'Clase creada')
      })
      .catch((e) => {
        this.catchMsg(e);
      });
  }

  createMusc(event: ClassExercise | MuscularGroup) {
    this.muscSvc
      .creteMuscularGroups(event)
      .then(() => {
        this.thenMsg('Confirmado', 'Grupo muscular creado')
      })
      .catch((e) => {
        this.catchMsg(e);
      });
  }

  updateClass(event: ClassExercise | MuscularGroup) {
    this.classSvc
      .updateClassExercise(event)
      .then(() => {
        this.thenMsg('Confirmado', 'Clase actualizada')
      })
      .catch((e) => {
        this.catchMsg(e);
      });
  }

  updateMusc(event: ClassExercise | MuscularGroup) {
    this.muscSvc
      .updateMuscularGroups(event)
      .then(() => {
        this.thenMsg('Confirmado', 'Grupo muscular actualizado')
      })
      .catch((e) => {
        this.catchMsg(e);
      });
  }

  thenMsg(sum: string, det: string){
    this.msg.emit({
      severity: 'info',
      summary: sum,
      detail: det,
      state: true,
    });
  }

  catchMsg(e: any){
    this.msg.emit({
      severity: 'error',
      summary: 'Error',
      detail: 'La operación no pudo ser realizada, intentelo nuevamente. (Error code: '+e.code+').',
      state: true,
    });
  }

  deleteItem(item, event) {
    event.path[3].style.background = 'aliceblue';
    this.confirmationService.confirm({
      target: event.path[3],
      message: 'Esta seguro de proceder con el borrado de este elemento? : ',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'daleteButton',
      accept: () => {
        this.thenMsg('Confirmado', 'Elemento borrado')
        switch (this.type) {
          case 'class':
            this.classSvc
              .deleteClassExercise(item)
              .then(() => {
                this.thenMsg('Confirmado', 'Clase borrada')
              })
              .catch((e) => {
                this.catchMsg(e)
              });
            break;
          case 'musc':
            this.muscSvc
              .deleteMuscularGroups(item)
              .then(() => {
                this.thenMsg('Confirmado', 'Grupo muscular borrado');
              })
              .catch((e) => {
               this.catchMsg(e)
              });
            break;
        }
      },
      reject: () => {
        event.path[3].style.background = 'inherit';
      },
    });
  }
}
