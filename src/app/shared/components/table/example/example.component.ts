import { Component, OnInit } from '@angular/core';
import { TableComponent, TableConfig, TableAction } from '../table.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      (addClick)="onAddClick()"
      (editClick)="onEditClick($event)"
      (deleteClick)="onDeleteClick($event)"
      (viewClick)="onViewClick($event)"
      (customActionClick)="onCustomActionClick($event)"
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
        editable: true,
        required: true,
      },
      { 
        name: 'email', 
        header: 'Email', 
        type: 'text', 
        visible: true, 
        order: 2,
        editable: true,
        required: true,
      },
      {
        name: 'role',
        header: 'Rol',
        type: 'text',
        sortable: true,
        visible: true,
        order: 3,
        editable: true,
        required: true,
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
        editable: true,
      },
      {
        name: 'salary',
        header: 'Salario',
        type: 'currency',
        sortable: true,
        visible: true,
        order: 6,
        editable: true,
      },
    ],
    pageSize: 5,
    pageSizeOptions: [5, 10, 25, 50],
    showPaginator: true,
    showColumnSelector: true,
    showActions: true,
    showAddButton: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    customActions: [
      {
        name: 'activate',
        icon: 'check_circle',
        tooltip: 'Activar usuario',
        color: 'primary',
        visible: true,
      },
      {
        name: 'deactivate',
        icon: 'cancel',
        tooltip: 'Desactivar usuario',
        color: 'warn',
        visible: true,
      },
      {
        name: 'duplicate',
        icon: 'content_copy',
        tooltip: 'Duplicar usuario',
        color: 'accent',
        visible: true,
      },
    ],
    totalItems: this.totalItems,
    title: 'Gestión de Usuarios',
    addButtonText: 'Nuevo Usuario',
    editButtonText: 'Editar',
    deleteButtonText: 'Eliminar',
    viewButtonText: 'Ver Detalles',
  };

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
    this.showUserDetails(user);
  }

  // CRUD Methods
  onAddClick(): void {
    console.log('Add button clicked');
  }

  onEditClick(user: User): void {
    console.log('Edit button clicked for user:', user);
  }

  onDeleteClick(user: User): void {
    console.log('Delete button clicked for user:', user);
    this.showDeleteConfirmation(user);
  }

  onViewClick(user: User): void {
    console.log('View button clicked for user:', user);
    this.showUserDetails(user);
  }

  onCustomActionClick(event: { action: string; item: User }): void {
    console.log('Custom action clicked:', event.action, 'for user:', event.item);
    
    switch (event.action) {
      case 'activate':
        this.activateUser(event.item);
        break;
      case 'deactivate':
        this.deactivateUser(event.item);
        break;
      case 'duplicate':
        this.duplicateUser(event.item);
        break;
      default:
        console.log('Unknown action:', event.action);
    }
  }

  private showDeleteConfirmation(user: User): void {
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${user.name}?`)) {
      this.deleteUser(user);
    }
  }

  private showUserDetails(user: User): void {
    this.snackBar.open(`Viendo detalles de: ${user.name}`, 'Cerrar', {
      duration: 3000,
    });
  }

  private deleteUser(user: User): void {
    this.users = this.users.filter(u => u.id !== user.id);
    this.snackBar.open(`Usuario ${user.name} eliminado exitosamente`, 'Cerrar', {
      duration: 3000,
    });
  }

  private activateUser(user: User): void {
    user.active = true;
    this.snackBar.open(`Usuario ${user.name} activado`, 'Cerrar', {
      duration: 2000,
    });
  }

  private deactivateUser(user: User): void {
    user.active = false;
    this.snackBar.open(`Usuario ${user.name} desactivado`, 'Cerrar', {
      duration: 2000,
    });
  }

  private duplicateUser(user: User): void {
    const newUser: User = {
      ...user,
      id: Math.max(...this.users.map(u => u.id)) + 1,
      name: `${user.name} (Copia)`,
      email: `${user.email.replace('@', '.copy@')}`,
      createdAt: new Date(),
    };
    
    this.users.unshift(newUser);
    this.snackBar.open(`Usuario ${user.name} duplicado exitosamente`, 'Cerrar', {
      duration: 3000,
    });
  }
}
