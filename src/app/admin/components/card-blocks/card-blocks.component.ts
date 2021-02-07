import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageSimple } from 'src/app/interfaces/misc.interaces';
import { Block, LoadExercise, WorkCicle } from '../../classes/block.class';
import { ExerciseClass } from '../../classes/exercise.class';
import { BlockService } from '../../services/block.service';

@Component({
  selector: 'card-blocks',
  templateUrl: './card-blocks.component.html',
  styleUrls: ['./card-blocks.component.css'],
  providers: [ConfirmationService],
})
export class CardBlocksComponent implements OnInit {
  @Output('msg') msg: EventEmitter<MessageSimple> = new EventEmitter();
  blocks: Block[] = [new Block(false, true)];
  display: boolean = false;
  blockSelected: Block;
  exerSelected: LoadExercise;
  nuevo: boolean = false;
  form: FormGroup;

  constructor(
    private blocksSvc: BlockService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      cicle: [, Validators.required],
      repetition: [, Validators.required],
      weigth: ['', Validators.required],
    });
  }

  loadAddExercise() {
    this.exerSelected = new LoadExercise(false, new ExerciseClass(), new WorkCicle(false, null, null, ''));
    this.display = true;
  }
  removeExercise(event, b: number, e: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Esta seguro de eliminar este ejercicio del bloque?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.blocks[b].removeExercise(e);
        this.blocksSvc.updateBlock(this.blocks[b]);
      },
    });
  }
  loadEditBlock() {}
  closeExerForm() {
    this.display = false;
  }

  evaluateComplete(event: {exercise: LoadExercise, status: boolean}, b: number) {
    if(event.status){
      this.blocks[b].addLoadExercise(event.exercise);
    }
  }

  deleteCicle(b: number, e: number, c: number) {
    this.blocks[b].exercises[e].removeWorkCicle(c);
    this.blocksSvc.updateBlock(this.blocks[b]);
  }
  addCicle(b: number, e: number) {
    if (this.form.valid) {
      this.blocks[b].exercises[e].addWorkCicle(
        new WorkCicle(
          false,
          this.form.value.cicle,
          this.form.value.repetition,
          this.form.value.weigth + ' Kg'
        )
      );
      this.form.reset();
      this.blocksSvc.updateBlock(this.blocks[b]);
    } else {
      this.msg.emit({
        severity: 'error',
        detail: 'Complete los campos',
        summary: 'Error',
      });
    }
  }
}
