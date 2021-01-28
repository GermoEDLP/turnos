//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { ToastModule } from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';

//Componentes
import { FormActivityComponent } from './form-activity/form-activity.component';

//Otros
import { HourAndMinutesPipePipe } from 'src/app/pipes/hour-and-minutes-pipe.pipe';

const comp = [FormActivityComponent, HourAndMinutesPipePipe];

@NgModule({
  declarations: comp,
  imports: [
    CommonModule,
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
    MultiSelectModule
  ],
  exports: comp,
})
export class AdminComponentsModule {}
