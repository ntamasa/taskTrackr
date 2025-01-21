import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: false,

  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit {
  @Input() classes: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  // Get the classes for the logo
  get getClasses(): string[] {
    const hasHeightDefined = this.classes.some((c) => c.startsWith('h-'));
    const hasDisplayDefined = this.classes.some((c) =>
      ['block', 'inline-block', 'flex', 'inline', 'grid', 'hidden'].includes(c)
    );

    return [
      ...(hasHeightDefined ? [] : ['h-1/2']),
      ...(hasDisplayDefined ? [] : ['block']),
      ...this.classes,
    ];
  }
}
