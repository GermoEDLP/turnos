import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { take } from 'rxjs/operators';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { LoadExercise, WorkCicle } from '../../classes/block.class';
import { ExerciseClass } from '../../classes/exercise.class';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'select-exercise',
  templateUrl: './select-exercise.component.html',
  styleUrls: ['./select-exercise.component.css'],
})
export class SelectExerciseComponent implements OnInit {
  @Output() complete: EventEmitter<{
    exercise: LoadExercise;
    status: boolean;
  }> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Input('nuevo') nuevo: boolean;
  @Input('exercise') exercise: LoadExercise;
  exercises: Exercise[];
  exerSelected: Exercise;

  constructor(private exerSvc: ExerciseService) {}

  ngOnInit(): void {
    this.getExercises();
    // this.exercises = [
    //   new ExerciseClass(true, true, 'Banco declinado', 'Banco declinado'),
    //   new ExerciseClass(true, true, 'Banco inclinado', 'Banco banco inclinado'),
    // ];
  }

  clear(table: Table) {
    table.clear();
  }

  getExercises() {
    this.exerSvc
      .getExercises()
      .pipe(take(1))
      .subscribe((data: Exercise[]) => {
        this.exercises = data;
      });
  }

  onRowSelect(event) {
    console.log(event);
    this.complete.emit({
      exercise: new LoadExercise(
        false,
        event.data
      ),
      status: true,
    });
    this.close.emit();
  }
}
