import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Exercise } from 'src/app/interfaces/exercise.interface';

@Component({
  selector: 'form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css']
})
export class FormVideoComponent{

  urlForm: string;

  @Input('url') url: string;


}
