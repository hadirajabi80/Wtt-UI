import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-presence',
  templateUrl: './child-presence.component.html',
  styleUrls: ['./child-presence.component.scss']
})
export class ChildPresenceComponent implements OnInit {

  constructor() { }
  @Input()userPresence;
  ngOnInit(): void {
  }

}
