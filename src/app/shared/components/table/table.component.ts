import {
  Component,
  OnInit,
  input,
  output,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

export interface TableColumn {
  name: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  sortable?: boolean;
  visible?: boolean;
  order?: number;
}

export interface TableConfig {
  columns: TableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  showPaginator?: boolean;
  showColumnSelector?: boolean;
  defaultSort?: { active: string; direction: 'asc' | 'desc' };
  totalItems?: number;
  title?: string;
}

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  tableDataSource = new MatTableDataSource<T>();
  dataSource = input<T[]>([]);
  config = input<TableConfig>();
  loading = input<boolean>(false);

  pageChange = output<PageEvent>();
  sortChange = output<Sort>();
  rowClick = output<T>();

  visibleColumns: string[] = [];

  ngOnInit() {
    this.visibleColumns = (this.config()?.columns || [])
      .filter((col) => col.visible !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((col) => col.name);

    this.tableDataSource.data = this.dataSource();

    if (this.config()?.defaultSort) {
      this.config()?.defaultSort || { active: '', direction: 'asc' };
      this.tableDataSource.sortingDataAccessor = (item, prop) =>
        (item as any)[prop];
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  toggleColumn(column: TableColumn): void {
    const currentColumns = this.visibleColumns;
    const allColumns = this.config()?.columns || [];

    if (currentColumns.includes(column.name)) {
      this.visibleColumns = currentColumns.filter((col) => col !== column.name);
    } else {
      const newColumns = [...currentColumns];
      
      let insertPosition = 0;
      for (let i = 0; i < allColumns.length; i++) {
        if (allColumns[i].name === column.name) {
          break;
        }
        if (currentColumns.includes(allColumns[i].name)) {
          insertPosition++;
        }
      }

      newColumns.splice(insertPosition, 0, column.name);
      this.visibleColumns = newColumns;
    }
  }

  isColumnVisible(columnName: string): boolean {
    return this.visibleColumns.includes(columnName);
  }

  getColumnType(column: TableColumn): string {
    return column.type || 'text';
  }

  ngAfterViewInit() {
    this.tableDataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.tableDataSource.data = this.dataSource();
    }
  }
  onSortChange(sortState: Sort) {
    this.sortChange.emit(sortState);
  }
}
