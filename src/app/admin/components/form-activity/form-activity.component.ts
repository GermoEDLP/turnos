import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, Schedule } from 'src/app/interfaces/activity.interfaces';
import { ActivityService } from '../../services/activity.service';
import { take } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/interfaces/category.interface';
import { days_week } from 'src/temps/temps';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'modal-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FormActivityComponent implements OnInit {
  @Input('activity') activity: Activity;
  @Input('new') new: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() msg = new EventEmitter<any>();
  actForm: FormGroup;
  schedForm: FormGroup;
  categories: Category[];
  schedule: Schedule[];
  days: any = days_week;
  create: boolean = false;
  updatingSchedule: number;
  blocked: boolean = false;

  constructor(
    private actSvc: ActivityService,
    private fb: FormBuilder,
    private catSvc: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createForm();
    this.createScheduleForm();

    if (!this.new) {
      this.loadForm();
    }
  }

  get nameInvalid() {
    return this.actForm.get('name').invalid && this.actForm.get('name').touched;
  }
  get descInvalid() {
    return this.actForm.get('desc').invalid && this.actForm.get('desc').touched;
  }
  get sched_descInvalid() {
    return (
      this.actForm.get('schedule_desc').invalid &&
      this.actForm.get('schedule_desc').touched
    );
  }

  createForm() {
    this.actForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      schedule_desc: ['', Validators.required],
      category: ['', Validators.required],
      status: [false],
    });
    this.schedule = [];
  }

  loadForm() {
    this.actForm.setValue({
      name: this.activity.name,
      desc: this.activity.desc,
      schedule_desc: this.activity.schedule_desc,
      category: this.activity.category,
      status: this.activity.status,
    });
    this.schedule = this.activity.schedule;
  }

  createScheduleForm() {
    this.schedForm = this.fb.group({
      day: ['', Validators.required],
      hour_start: ['', Validators.required],
      hour_end: ['', Validators.required],
    });
  }

  loadScheduleForm(sched?: Schedule, pos?: number) {
    if (sched) {
      this.schedForm.setValue(sched);
      this.updatingSchedule = pos;
      console.log(this.schedForm, this.updatingSchedule);
    }
    this.create = true;
  }

  getCategories() {
    this.catSvc
      .getCategories()
      .pipe(take(1))
      .subscribe((cats: Category[]) => {
        this.categories = cats;
        console.log(cats);
      });
  }

  createSchedule() {
    if (this.schedForm.valid) {
      this.schedule.push({
        day: this.schedForm.get('day').value,
        hour_start: {
          hour: this.schedForm.get('hour_start').value.getHours(),
          min: this.schedForm.get('hour_start').value.getMinutes(),
        },
        hour_end: {
          hour: this.schedForm.get('hour_end').value.getHours(),
          min: this.schedForm.get('hour_end').value.getMinutes(),
        },
      });
      this.create = false;
      this.schedForm.reset();
    } else {
    }
  }

  updateSchedule() {
    this.schedule[this.updatingSchedule] = {
      day: this.schedForm.get('day').value,
      hour_end: this.schedForm.get('hour_end').value,
      hour_start: this.schedForm.get('hour_start').value,
    };
    this.updatingSchedule = undefined;
    this.schedForm.reset();
    this.create = false;
  }

  closeSchedForm() {
    this.updatingSchedule = undefined;
    this.schedForm.reset();
    this.create = false;
  }

  deleteSchedule(index: number) {
    console.log(index);

    this.confirmationService.confirm({
      message: 'Esta seguro de borrar este Horario?',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.schedule.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmado',
          detail: 'Horario borrado',
        });
      },
    });
  }
  closeForm() {
    this.schedule = undefined;
    this.actForm.reset();
    this.close.emit(false);
  }
  createActivity() {
    this.actSvc
      .createActivity({
        name: this.actForm.get('name').value,
        desc: this.actForm.get('desc').value,
        schedule_desc: this.actForm.get('schedule_desc').value,
        category: this.actForm.get('category').value,
        status: this.actForm.get('status').value,
        schedule: this.schedule,
        members: 0
      })
      .then(() => {
        this.msg.emit({
          severity: 'success',
          summary: 'Actividad Generada',
          detail: 'La nueva actividad esta disponible.',
        });
        this.closeForm();
      })
      .catch((e) => {
        this.blocked = true;
        this.msg.emit({
          severity: 'error',
          summary: 'Error',
          detail:
            'Ocurrio un error, pruebe nuevamente. De mantenerse el problema comuniquese con el técnico',
        });
        this.closeForm();
      });
  }
  updateActivity() {
    let act: Activity = { ...this.actForm.value };
    act.schedule = this.schedule;
    act.created_at = this.activity.created_at;
    act.id = this.activity.id;
    this.actSvc
      .updateActivity(act)
      .then(() => {
        this.msg.emit({
          severity: 'success',
          summary: 'Actividad Actualizada',
          detail: 'Los cambios se han guardado correctamente.',
        });
        this.closeForm();
      })
      .catch((e) => {
        this.blocked = true;
        console.log(e);
        this.msg.emit({
          severity: 'error',
          summary: 'Error',
          detail:
            'Ocurrio un error, pruebe nuevamente. De mantenerse el problema comuniquese con el técnico',
        });
        this.closeForm();
      });
  }
}
