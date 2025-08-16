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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { SkeletonComponent } from "../skeleton/skeleton.component";

export interface TableColumn {
  name: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  sortable?: boolean;
  visible?: boolean;
  order?: number;
  editable?: boolean;
  required?: boolean;
  showColorIndicator?: boolean;
}

export interface TableAction {
  name: string;
  icon: string;
  tooltip: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
  visible?: boolean;
}

export interface TableConfig {
  columns: TableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  showPaginator?: boolean;
  showColumnSelector?: boolean;
  showActions?: boolean;
  showAddButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showViewButton?: boolean;
  customActions?: TableAction[];
  defaultSort?: { active: string; direction: 'asc' | 'desc' };
  totalItems?: number;
  title?: string;
  addButtonText?: string;
  editButtonText?: string;
  deleteButtonText?: string;
  viewButtonText?: string;
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
    MatDialogModule,
    MatTooltipModule,
    DatePipe,
    CurrencyPipe,
    ButtonComponent,
    SkeletonComponent
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
  
  // CRUD outputs
  addClick = output<void>();
  editClick = output<T>();
  deleteClick = output<T>();
  viewClick = output<T>();
  customActionClick = output<{ action: string; item: T }>();

  visibleColumns: string[] = [];
  actionsColumn = 'actions';

  ngOnInit() {
    this.visibleColumns = (this.config()?.columns || [])
      .filter((col) => col.visible !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((col) => col.name);

    // Agregar columna de acciones si está habilitada
    if (this.config()?.showActions) {
      this.visibleColumns.push(this.actionsColumn);
    }

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

  // CRUD methods
  onAddClick(): void {
    this.addClick.emit();
  }

  onEditClick(row: T, event: Event): void {
    event.stopPropagation();
    this.editClick.emit(row);
  }

  onDeleteClick(row: T, event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(row);
  }

  onViewClick(row: T, event: Event): void {
    event.stopPropagation();
    this.viewClick.emit(row);
  }

  onCustomActionClick(action: string, row: T, event: Event): void {
    event.stopPropagation();
    this.customActionClick.emit({ action, item: row });
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

  // Nuevo método para detectar valores con + o - y aplicar colores
  getValueColorClass(value: any): string {
    if (!value || typeof value !== 'string') {
      return '';
    }
    
    const trimmedValue = value.toString().trim();
    
    if (trimmedValue.startsWith('+')) {
      return 'text-green-600 font-medium';
    } else if (trimmedValue.startsWith('-')) {
      return 'text-red-600 font-medium';
    }
    
    return '';
  }

  // Método para verificar si una columna debe mostrar indicadores de color
  shouldShowColorIndicator(column: TableColumn): boolean {
    return column.showColorIndicator === true;
  }

  // Helper methods for actions
  shouldShowAddButton(): boolean {
    return this.config()?.showAddButton ?? false;
  }

  shouldShowEditButton(): boolean {
    return this.config()?.showEditButton ?? false;
  }

  shouldShowDeleteButton(): boolean {
    return this.config()?.showDeleteButton ?? false;
  }

  shouldShowViewButton(): boolean {
    return this.config()?.showViewButton ?? false;
  }

  getCustomActions(): TableAction[] {
    return this.config()?.customActions || [];
  }

  getAddButtonText(): string {
    return this.config()?.addButtonText || 'Agregar';
  }

  getEditButtonText(): string {
    return this.config()?.editButtonText || 'Editar';
  }

  getDeleteButtonText(): string {
    return this.config()?.deleteButtonText || 'Eliminar';
  }

  getViewButtonText(): string {
    return this.config()?.viewButtonText || 'Ver';
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
