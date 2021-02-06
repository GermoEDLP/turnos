import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css'],
  providers: [MessageService],
})
export class BlocksComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
}