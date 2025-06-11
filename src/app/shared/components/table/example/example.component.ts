import { Component, OnInit } from '@angular/core';
import { TableComponent, TableConfig } from '../table.component';
import { PageEvent } from '@angular/material/paginator';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  active: boolean;
  salary: number;
}

@Component({
  selector: 'app-example',
  imports: [TableComponent],
  template: `
    <app-table
      [dataSource]="users"
      [config]="tableConfig"
      [loading]="loading"
      (pageChange)="onPageChange($event)"
      (rowClick)="onRowClick($event)"
    >
    </app-table>
  `,
})
export class ExampleComponent implements OnInit {
  users: User[] = [];
  loading = false;
  totalItems = 100;

  tableConfig: TableConfig = {
    columns: [
      {
        name: 'id',
        header: 'ID',
        type: 'number',
        sortable: true,
        visible: true,
        order: 0,
      },
      {
        name: 'name',
        header: 'Nombre',
        type: 'text',
        sortable: true,
        visible: true,
        order: 1,
      },
      { name: 'email', header: 'Email', type: 'text', visible: true, order: 2 },
      {
        name: 'role',
        header: 'Rol',
        type: 'text',
        sortable: true,
        visible: true,
        order: 3,
      },
      {
        name: 'createdAt',
        header: 'Fecha de creación',
        type: 'date',
        sortable: true,
        visible: true,
        order: 4,
      },
      {
        name: 'active',
        header: 'Activo',
        type: 'boolean',
        visible: true,
        order: 5,
      },
      {
        name: 'salary',
        header: 'Salario',
        type: 'currency',
        sortable: true,
        visible: true,
        order: 6,
      },
    ],
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 50],
    showPaginator: true,
    showColumnSelector: true,
    totalItems: this.totalItems,
    title: 'Tabla de ejemplo',
  };

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(pageIndex: number = 0, pageSize: number = 5): void {
    this.loading = true;

    setTimeout(() => {
      this.users = Array.from({ length: pageSize }, (_, i) => ({
        id: pageIndex * pageSize + i + 1,
        name: `Usuario ${pageIndex * pageSize + i + 1}`,
        email: `usuario${pageIndex * pageSize + i + 1}@example.com`,
        role: ['Administrador', 'Desarrollador', 'Diseñador', 'QA'][
          Math.floor(Math.random() * 4)
        ],
        createdAt: new Date(
          2024,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),
        active: Math.random() > 0.3,
        salary: Math.floor(Math.random() * 30000) + 30000,
      }));

      this.loading = false;
    }, 500);
  }

  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    this.loadData(event.pageIndex, event.pageSize);
  }

  onRowClick(user: User): void {
    console.log('Row clicked:', user);
  }
}
