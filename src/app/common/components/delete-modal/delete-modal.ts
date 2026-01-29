import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  @Input() isOpen = false;
  @Output() deleted = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  handleClose() {
    this.closed.emit();
  }

  handleDelete() {
    this.deleted.emit();
    this.handleClose();
  }
}
