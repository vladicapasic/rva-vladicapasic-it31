import { ProjekatService } from './../../../services/projekat.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projekat } from 'src/app/models/projekat';

@Component({
  selector: 'app-projekat-component',
  templateUrl: './projekat-component.component.html',
  styleUrls: ['./projekat-component.component.css']
})
export class ProjekatComponentComponent implements OnInit {


  public flag: number;

  constructor(public projekatService: ProjekatService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProjekatComponentComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Projekat) { }

  ngOnInit(): void {
  }


  //slucajevi buttona potvrdi
  public add(): void {
    this.projekatService.addProjekat(this.data);
    this.snackBar.open('Uspesno  dodat projekat: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  public update(): void {
    this.projekatService.updateProjekat(this.data);
    this.snackBar.open('Uspesno  azuriran projekat: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  public delete(): void {
    this.projekatService.deleteProjekat(this.data.id);
    this.snackBar.open('Uspesno  obrisan projekat: ' + this.data.naziv, 'U redu.', {
      duration: 2500
    });
  }

  //odustani button

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu.', {
      duration: 500
    });
  }

}
