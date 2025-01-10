import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import Day from '../../pages/models/day';
import Week from '../../pages/models/week';

@Component({
  selector: 'app-searchbar',
  standalone: false,

  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements OnInit {
  @Input() searchData: Day[] | Week[] = [];
  @Input() actualData: Day[] | Week[] = [];
  @Output() actualDataChange = new EventEmitter<Day[] | Week[]>();

  filteredData: Observable<Day[] | Week[]> = new Observable<Day[] | Week[]>();
  control = new FormControl('');

  ngOnInit() {
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.filteredData.subscribe((data) => {
      this.actualData = data;
      this.actualDataChange.emit(this.actualData);
    });
  }

  // filter the days based on the input value
  private _filter(value: string): Day[] | Week[] {
    const filterValue = this._normalizeValue(value);
    if (this.searchData.length > 0 && 'tasks' in this.searchData[0]) {
      return (this.searchData as Day[]).filter((data) =>
        this._normalizeValue(data.name).includes(filterValue)
      );
    } else {
      return (this.searchData as Week[]).filter((data) =>
        this._normalizeValue(data.name).includes(filterValue)
      );
    }
  }

  // make the query lowercase and remove spaces
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
