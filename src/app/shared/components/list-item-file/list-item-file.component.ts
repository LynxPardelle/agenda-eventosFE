import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { GenericButtonComponent } from '../generic-button/generic-button.component';

@Component({
  selector: 'list-item-file',
  imports: [SharedModule, GenericButtonComponent],
  templateUrl: './list-item-file.component.html',
  styleUrls: ['./list-item-file.component.scss'],
})
export class ListItemFileComponent implements OnInit {
  @Input() public file: { name: string; id: string; url?: string } = {
    name: '',
    id: '',
    url: '',
  };
  /* Output */
  @Output() clicked = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
