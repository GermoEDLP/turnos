import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Activity } from 'src/app/interfaces/activity.interfaces';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers: [MessageService]
})
export class ActivityComponent implements OnInit {
  activities: Activity[];
  actSelected: Activity;
  display: boolean = false;
  new: boolean = false;

  constructor(private actSvc: ActivityService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.inicializarActividades();
  }

  selected(event) {
    this.actSelected = event.value[0];
    console.log(this.actSelected);
    this.openDialog();
  }

  openDialog() {
    this.display = true;
  }

  inicializarActividades() {
    this.actSvc.getActivities().subscribe((acts: Activity[]) => {
      this.activities = acts;
    });
  }

  newAct() {
    this.new = true;
    this.actSelected = {
      name: '',
      desc: '',
      schedule_desc: '',
      category: [],
      status: false
    };
    this.openDialog();
  }

  closeForm(event: boolean) {
    this.display = event;
    this.new = false;
    this.actSelected = undefined;
  }

  showMessage(event){
    this.messageService.add(event);
  }
}
