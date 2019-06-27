import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../../../status';

@Component({
  selector: 'dsh-status-item',
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss']
})
export class StatusItemComponent implements OnInit {

  @Input() color: Color;

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
