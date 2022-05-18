import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/models/board.class';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  host: {  // Die nun folgenden HTML Attribute werden an alle <app-board> Tags angehangen:
    style: 'height: 100%; width: 100%;'
  }
})
export class BoardComponent implements OnInit {


  activeBoard!: Board;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // this.activeBoard = this.boards[params['boardId']];
    });
  }


}
