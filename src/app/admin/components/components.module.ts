//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos propios

//Modulos externos
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TooltipModule} from 'primeng/tooltip';
import {AccordionModule} from 'primeng/accordion';



//Componentes
import { FormActivityComponent } from './form-activity/form-activity.component';
import { FromExerciseComponent } from './from-exercise/from-exercise.component';
import { FormSimpleComponent } from './form-simple/form-simple.component';
import { CardConfigComponent } from './card-config/card-config.component';
import { CardExerciseComponent } from './card-exercise/card-exercise.component';
import { FormVideoComponent } from './form-video/form-video.component';
import { CardBlocksComponent } from './card-blocks/card-blocks.component';
import { SelectExerciseComponent } from './select-exercise/select-exercise.component';
import { FormBlockComponent } from './form-block/form-block.component';

//Otros
import { HourAndMinutesPipePipe } from 'src/app/pipes/hour-and-minutes-pipe.pipe';
import { safeUrlPipe } from 'src/app/pipes/youtube-safe.pipe';

const comp = [
  FormActivityComponent,
  HourAndMinutesPipePipe,
  safeUrlPipe,
  FromExerciseComponent,
  FormSimpleComponent,
  CardConfigComponent,
  CardExerciseComponent,
  FormVideoComponent,
  CardBlocksComponent,
  SelectExerciseComponent,
  FormBlockComponent
];

@NgModule({
  declarations: comp,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    ConfirmDialogModule,
    DividerModule,
    MessagesModule,
    ToastModule,
    MultiSelectModule,
    RatingModule,
    ConfirmPopupModule,
    MessageModule,
    TooltipModule,
    AccordionModule
  ],
  exports: comp,
})
export class AdminComponentsModule {}
