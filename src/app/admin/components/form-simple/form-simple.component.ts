import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  ClassExercise,
  MuscularGroup,
} from 'src/app/interfaces/exercise.interface';

@Component({
  selector: 'form-simple',
  templateUrl: './form-simple.component.html',
  styleUrls: ['./form-simple.component.css'],
  providers: [MessageService]
})
export class FormSimpleComponent implements OnInit {
  @Input('item') item: ClassExercise | MuscularGroup;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() complete: EventEmitter<ClassExercise | MuscularGroup> = new EventEmitter();
  form: FormGroup;

  constructor(private mesgSvc: MessageService) {}

  ngOnInit(): void {
    this.createControl();
  }

  get invalid(){
    return this.form.get('name').touched && this.form.get('name').invalid;
  }

  createControl() {
    this.form = new FormGroup({
      name: new FormControl(this.item.name, Validators.required),
    });
  }

  loadForm() {
    this.form.setValue({
      name: this.item.name,
    });
  }

  closeFrom() {
    this.close.emit();
  }
  check() {
    if(this.form.valid){
      this.item.name = this.form.value.name;
      this.complete.emit(this.item)
      this.close.emit();
    }else{
      this.form.markAllAsTouched();
    }
  }
}
