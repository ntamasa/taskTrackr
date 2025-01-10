import { Component, Input, OnInit } from '@angular/core';
import Week from '../../pages/models/week';
import Day from '../../pages/models/day';

@Component({
  selector: 'app-day-template',
  standalone: false,

  templateUrl: './day-template.component.html',
  styleUrl: './day-template.component.css',
})
export class DayTemplateComponent implements OnInit {
  @Input() days: Day[] = [];

  constructor() {}

  ngOnInit() {}
}
