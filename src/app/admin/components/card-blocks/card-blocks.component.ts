import { Component, OnInit } from '@angular/core';
import { Block } from '../../classes/block.class';
import { BlockService } from '../../services/block.service';

@Component({
  selector: 'card-blocks',
  templateUrl: './card-blocks.component.html',
  styleUrls: ['./card-blocks.component.css']
})
export class CardBlocksComponent implements OnInit {

  blocks: Block[] = [new Block(false, true)];
  display: boolean = false;
blockSelected: Block;
nuevo: boolean = false;

  constructor(private blocksSvc: BlockService) {

  }

  ngOnInit(): void {
  }

  clear(){

  }

  loadCreateBlock(){

  }
deleteBlock(){

}
loadEditBlock(){

}
closeBlockForm(){

}

evaluateComplete(){

}

deleteCicle(){

}
addCicle(){

}

}
