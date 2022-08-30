import { Smer } from './../../models/smer';
import { GrupaService } from './../../services/grupa.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupa } from 'src/app/models/grupa';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GrupaDialogComponent } from '../dialogs/grupa-dialog/grupa-dialog.component';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {

  displayedColumns = ['id', 'oznaka', 'smer', 'actions'];
  dataSource: MatTableDataSource<Grupa>;
  selektovanaGrupa: Grupa;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public grupaService: GrupaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.grupaService.getAllGrupa().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu ugnjezdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'smer' ? currentTerm + data.smer.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFliter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFliter) !== -1;
      };

      //sortiranje po nazivu ugnjezdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'smer': return data.smer.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectRow(row: any){
    this.selektovanaGrupa = row;
  }

  public openDialog(flag: number, id?: number, oznaka?: string, smer?: Smer) {
    const dialogRef = this.dialog.open(GrupaDialogComponent,
      {data: {id, oznaka, smer}
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1)
      this.loadData();
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
