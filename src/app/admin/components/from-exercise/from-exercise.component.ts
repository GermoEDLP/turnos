import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  ClassExercise,
  Exercise,
  MuscularGroup,
} from 'src/app/interfaces/exercise.interface';
import { ClassService } from '../../services/class.service';
import { MuscularGroupService } from '../../services/muscular-group.service';

@Component({
  selector: 'modal-exercise',
  templateUrl: './from-exercise.component.html',
  styleUrls: ['./from-exercise.component.css'],
  providers: [MessageService],
})
export class FromExerciseComponent implements OnInit {
  @Input('nuevo') nuevo: boolean = false;
  @Input('exercise') exercise: Exercise;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() complete: EventEmitter<{exer: Exercise, status: boolean}> = new EventEmitter();
  exerForm: FormGroup;
  classesExercise: ClassExercise[];
  muscsGroup: MuscularGroup[];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private classSvc: ClassService,
    private muscSvc: MuscularGroupService
  ) {}

  ngOnInit(): void {
    console.log(this.nuevo, this.exercise);

    this.getClasses();
    this.getMuscularGroups();
    this.createForm();
    if(!this.nuevo){
      this.loadForm();
    }
  }

  createForm() {
    this.exerForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      class: ['', Validators.required],
      dif: [0, Validators.required],
      url: [''],
      musc_g: ['', Validators.required],
      id: [''],
      created_at: [''],
      updated_at: [''],
    });
  }

  loadForm() {
    this.exerForm.setValue(this.exercise);
  }

  check() {
    console.log(this.exerForm);
    if (this.exerForm.valid) {

      if(this.nuevo){
        this.complete.emit({
          exer: this.exerForm.value,
          status: true
        });
        this.close.emit();
      }else{
        this.complete.emit({
          exer: this.exerForm.value,
          status: false
        });
        this.close.emit();
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos incompletos o erroneos',
        detail: 'Complete todos los campos con valores validos',
      });
    }
  }

  closeForm(){
    this.close.emit();
  }

  getClasses() {
    this.classSvc.getClassExercise().subscribe((c: ClassExercise[]) => {
      this.classesExercise = c;
    });
  }

  getMuscularGroups() {
    this.muscSvc.getMuscularGroups().subscribe((m: MuscularGroup[]) => {
      this.muscsGroup = m;
    });
  }
}
