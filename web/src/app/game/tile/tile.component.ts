import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Clue, Tile } from '@app/models';

const LETTER_RANGE_START = 'A'.charCodeAt(0);
const LETTER_RANGE_END = 'z'.charCodeAt(0);

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
    const { charCode, key } = keyEvt;
    if (charCode >= LETTER_RANGE_START && charCode <= LETTER_RANGE_END) {
      this.tile.value = key.toUpperCase();
      this.update.emit(this.tile.displayValue);
    }
  }

}
