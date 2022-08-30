import { ProjekatService } from './../../../services/projekat.service';
import { Projekat } from './../../../models/projekat';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  projekti: Projekat[];
  public flag: number;
  constructor(public studentService: StudentService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Student,
              public projekatService: ProjekatService
              ) { }

  ngOnInit(){
    this.projekatService.getAllProjekat().subscribe(projekti =>
      this.projekti = projekti
      );

  }

  public add(): void{
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspjesno dodat student: ' + this.data.ime, 'U redu',{
      duration: 2500
    });
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspjesno modifikovan student: ' + this.data.ime, 'U redu',{
      duration: 2500
    });
  }

  public delete(): void {
    this.studentService.deleteGrupa(this.data.id);
    this.snackBar.open('Uspjesno obrisan student: ' + this.data.ime, 'U redu',{
      duration: 2500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Moze', 'U redu',{
      duration: 500
    });
  }


}
