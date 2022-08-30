import { Student } from './../models/student';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly API_URL = 'http://localhost:8083/student/';
  private readonly API_URL_BYID = 'http://localhost:8083/studentZaGrupaId/';

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private httpClient: HttpClient) { }
  public getStudentZaGrupaId(idGrupe: number): Observable<Student[]> {
    this.httpClient.get<Student[]>(this.API_URL_BYID + idGrupe).subscribe(data => {
        this.dataChange.next(data);
    },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
  }

  public addStudent(student: Student): void {
    student.id = 0;
    console.log('Uspesno dodat' + student.ime);
    this.httpClient.post(this.API_URL, student).subscribe();
  }
  public updateStudent(student: Student): void {
    this.httpClient.put(this.API_URL, student).subscribe();
  }
  public deleteGrupa(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
