import { DatePipe } from '@angular/common';
import { Task } from './../../model/task';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    private datepipe: DatePipe,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
    console.log(data);
    data.formattedDeadline = this.datepipe.transform(data.deadline, 'yyyy-MM-dd');
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

}
