import { Smer } from './../../../models/smer';
import { SmerService } from './../../../services/smer.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog/';


@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag: number;

  constructor(public smerService: SmerService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SmerDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Smer) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.smerService.addSmer(this.data);
    this.smerService.addSmer(this.data);
    this.snackBar.open('Uspesno  dodat smer: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  public update(): void {
    this.smerService.updateSmer(this.data);
    this.snackBar.open('Uspesno  modifikovan smer: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  public delete(): void {
    this.smerService.deleteSmer(this.data.id);
    this.snackBar.open('Uspesno  je obrisan smer: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu.', {
      duration: 500
    });
  }



}
