import { SmerService } from './../../services/smer.service';
import { Smer } from './../../models/smer';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SmerDialogComponent } from '../dialogs/smer-dialog/smer-dialog.component';

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit {


  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Smer>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private smerService: SmerService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.smerService.getAllSmer().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string) {
    const dialogRef = this.dialog.open(SmerDialogComponent,
      {data: {id, naziv, oznaka}}
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
