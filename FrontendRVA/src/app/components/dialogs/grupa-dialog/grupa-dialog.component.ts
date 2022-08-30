import { Smer } from './../../../models/smer';
import { SmerService } from './../../../services/smer.service';
import { Grupa } from 'src/app/models/grupa';
import { GrupaService } from './../../../services/grupa.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  smerovi: Smer[];
  public flag: number;

  constructor(public grupaService: GrupaService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GrupaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Grupa,
              public smerService: SmerService

              ) { }

  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe( smerovi =>
      this.smerovi = smerovi
      );
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.data.id = -1;
    this.grupaService.addGrupa(this.data);
    this.snackBar.open('Uspesno dodata grupa' + this.data.oznaka, 'U redu.', {
      duration: 2500
    });
  }

  public update(): void {
    this.grupaService.updateGrupa(this.data);
    this.snackBar.open('Uspesno modifikovana grupa' + this.data.oznaka, 'U redu.', {
      duration: 2500
    });
  }

  public delete(): void {
    this.grupaService.deleteGrupa(this.data.id);
    this.snackBar.open('Uspesno obrisana grupa' + this.data.oznaka, 'U redu.', {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste. ', 'U redu.', {
      duration: 500
    });
  }


}
