import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Clue, Tile } from '@app/models';

const LETTER_RANGE_START = 'A'.charCodeAt(0);
const LETTER_RANGE_END = 'z'.charCodeAt(0);
const ARROW_RANGE_START = 37;
const ARROW_RANGE_END = 40;

@Component({
  selector: 'xw-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit, OnChanges {
  @ViewChild('letterInput') public inputEl: ElementRef;

  @Input() public tile: Tile;
  @Input() public selected = false;
  @Output() public update = new EventEmitter<string>();
  @Output() public arrowPress = new EventEmitter<KeyboardEvent>();

  constructor() { }

  public ngOnInit() {
  }

  public ngOnChanges(changes) {
    const selected = changes.selected || {};
    if (selected.currentValue) {
      this.focus();
    }
  }

  public focus() {
    this.inputEl.nativeElement.focus();
  }

  public onInputChange(keyEvt) {
    const { keyCode, key } = keyEvt;
    if (keyCode >= LETTER_RANGE_START && keyCode <= LETTER_RANGE_END) {
      this.tile.value = key.toUpperCase();
      this.update.emit(this.tile.displayValue);
    } else if (key === 'Backspace') {
      this.tile.value = '';
      this.update.emit(this.tile.displayValue);
    } else if (keyCode >= ARROW_RANGE_START && keyCode <= ARROW_RANGE_END) {
      this.arrowPress.emit(keyEvt);
    }
  }

}
