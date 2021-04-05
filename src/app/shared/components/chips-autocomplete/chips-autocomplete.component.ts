import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { contains } from 'underscore';

@Component({
  selector: 'bgt-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
})
export class ChipsAutocompleteComponent implements OnInit {
  @Input() visible = true;
  @Input() selectable = true;
  @Input() removable = true;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() allowDuplication = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  @Input() items: string[] = [];
  @Input() allItems: string[] = [];

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  @Output() added = new EventEmitter<string>();
  @Output() removed = new EventEmitter<string>();
  @Output() empty = new EventEmitter<void>();

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any | null) =>
        item ? this._filter(item) : this.allItems.slice()
      )
    );
  }

  ngOnInit(): void {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(
      (item) => item.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private preprocessValue(value: string): string {
    return (value || '').trim();
  }

  private addItem(value: string): void {
    value = this.preprocessValue(value);
    if (!value) {
      return;
    }
    if (this.allowDuplication || !this.isDuplicated(value)) {
      this.items.push(value);
      this.added.emit(value);
    } else {
      this.handleDuplication(value);
    }
  }

  private handleDuplication(value: string): void {
    // TODO
    console.warn(`[chips-autocomplete] detect duplication value`, value);
  }

  private isDuplicated(value: string): boolean {
    return contains(this.items, value);
  }

  private removeItem(item: string): void {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.removed.emit(item);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.addItem(value);
    // if (input) {
    //   input.value = '';
    // }
    // this.itemCtrl.setValue(null);
    this.cleanInput();
  }

  private cleanInput(): void {
    if (this.itemInput.nativeElement) {
      this.itemInput.nativeElement.value = '';
    }
    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    this.removeItem(item);
  }

  removeAll(): void {
    this.items = [];
    this.empty.emit();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.items.push(event.option.viewValue);
    this.addItem(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  onBlur(): void {
    // console.log(`[chips-autocomplete] blur`, this.itemInput.nativeElement);
    this.addItem(this.itemInput.nativeElement.value);
    this.cleanInput();
  }
}
