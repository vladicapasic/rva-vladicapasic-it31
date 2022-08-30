import { ProjekatComponentComponent } from './../dialogs/projekat-component/projekat-component.component';
import { ProjekatService } from './../../services/projekat.service';
import { Projekat } from './../../models/projekat';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka','opis', 'actions'];
  dataSource: MatTableDataSource<Projekat>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private projekatService: ProjekatService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.projekatService.getAllProjekat().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string) {
    const dialogRef = this.dialog.open(ProjekatComponentComponent,
      {data: { id, naziv, oznaka, opis}}
      );

      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // moja     --MoJa
    filterValue = filterValue.toLocaleLowerCase(); //MoJa --moja
    this.dataSource.filter = filterValue;
  }

}
