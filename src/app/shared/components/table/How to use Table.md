# Table Component

Un componente de tabla avanzado con funcionalidades CRUD completas, construido con Angular Material y optimizado para una experiencia de usuario moderna y responsive.

## 🚀 Características

### ✅ Funcionalidades CRUD
- **Create**: Botón de agregar con diálogo de formulario
- **Read**: Visualización con ordenamiento y paginación
- **Update**: Botón de editar con formulario pre-poblado
- **Delete**: Botón de eliminar con confirmación

### ✅ Funcionalidades Avanzadas
- **Acciones Personalizadas**: Botones adicionales configurables
- **Ordenamiento**: Ordenamiento por columnas
- **Paginación**: Paginación configurable
- **Selector de Columnas**: Mostrar/ocultar columnas dinámicamente
- **Responsive**: Diseño adaptativo para móviles
- **Temas**: Soporte para temas claros y oscuros
- **Loading States**: Estados de carga
- **Tooltips**: Información contextual

## 📦 Instalación

### 1. Dependencias Requeridas

Asegúrate de tener Angular Material instalado:

```bash
ng add @angular/material
```

### 2. Configuración de Animaciones

En `app.config.ts`:

```typescript
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    provideAnimations(),
  ],
};
```

## 🎯 Uso Básico

### 1. Importar el Componente

```typescript
import { TableComponent, TableConfig } from './shared/components/table/table.component';
```

### 2. Definir la Interfaz de Datos

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  salary: number;
  createdAt: Date;
}
```

### 3. Configurar la Tabla

```typescript
tableConfig: TableConfig = {
  columns: [
    { name: 'id', header: 'ID', type: 'number', sortable: true, visible: true },
    { name: 'name', header: 'Nombre', type: 'text', sortable: true, visible: true },
    { name: 'email', header: 'Email', type: 'text', visible: true },
    { name: 'role', header: 'Rol', type: 'text', visible: true },
    { name: 'active', header: 'Activo', type: 'boolean', visible: true },
    { name: 'salary', header: 'Salario', type: 'currency', sortable: true, visible: true },
    { name: 'createdAt', header: 'Fecha', type: 'date', sortable: true, visible: true },
  ],
  showActions: true,
  showAddButton: true,
  showEditButton: true,
  showDeleteButton: true,
  showViewButton: true,
  title: 'Gestión de Usuarios'
};
```

### 4. Usar en el Template

```html
<app-table
  [dataSource]="users"
  [config]="tableConfig"
  [loading]="loading"
  (addClick)="onAddClick()"
  (editClick)="onEditClick($event)"
  (deleteClick)="onDeleteClick($event)"
  (viewClick)="onViewClick($event)"
  (customActionClick)="onCustomActionClick($event)"
>
</app-table>
```

### 5. Implementar Métodos CRUD

```typescript
export class UsersComponent {
  users: User[] = [];
  loading = false;

  onAddClick(): void {
    // Abrir diálogo para agregar
  }

  onEditClick(user: User): void {
    // Abrir diálogo para editar
  }

  onDeleteClick(user: User): void {
    // Mostrar confirmación y eliminar
  }

  onViewClick(user: User): void {
    // Mostrar detalles
  }

  onCustomActionClick(event: { action: string; item: User }): void {
    // Manejar acciones personalizadas
  }
}
```

## 📋 Configuración Detallada

### Tipos de Columna

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `text` | Texto simple | "Juan Pérez" |
| `number` | Números | 123 |
| `date` | Fechas | 15/12/2024 |
| `boolean` | Valores booleanos | Activo/Inactivo |
| `currency` | Moneda | €50,000.00 |

### Propiedades de Columna

```typescript
interface TableColumn {
  name: string;           // Nombre de la propiedad en el objeto
  header: string;         // Texto del encabezado
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  sortable?: boolean;     // Si se puede ordenar
  visible?: boolean;      // Si se muestra por defecto
  order?: number;         // Orden de aparición
  editable?: boolean;     // Si es editable (para futuras funcionalidades)
  required?: boolean;     // Si es requerido (para validaciones)
}
```

### Configuración de Acciones

```typescript
interface TableConfig {
  // ... otras propiedades
  showActions?: boolean;        // Mostrar columna de acciones
  showAddButton?: boolean;      // Botón de agregar en header
  showEditButton?: boolean;     // Botón de editar en filas
  showDeleteButton?: boolean;   // Botón de eliminar en filas
  showViewButton?: boolean;     // Botón de ver en filas
  customActions?: TableAction[]; // Acciones personalizadas
  addButtonText?: string;       // Texto del botón agregar
  editButtonText?: string;      // Texto del botón editar
  deleteButtonText?: string;    // Texto del botón eliminar
  viewButtonText?: string;      // Texto del botón ver
}
```

### Acciones Personalizadas

```typescript
interface TableAction {
  name: string;                    // Identificador único
  icon: string;                    // Icono de Material
  tooltip: string;                 // Texto del tooltip
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;              // Si está deshabilitado
  visible?: boolean;               // Si se muestra
}
```

## 📡 Eventos Disponibles

### Eventos CRUD
- `addClick`: Se dispara al hacer clic en el botón de agregar
- `editClick`: Se dispara al hacer clic en el botón de editar (pasa el item)
- `deleteClick`: Se dispara al hacer clic en el botón de eliminar (pasa el item)
- `viewClick`: Se dispara al hacer clic en el botón de ver (pasa el item)
- `customActionClick`: Se dispara al hacer clic en acciones personalizadas

### Eventos de Tabla
- `rowClick`: Se dispara al hacer clic en una fila
- `pageChange`: Se dispara al cambiar de página
- `sortChange`: Se dispara al ordenar columnas

## 💡 Ejemplo Completo

```typescript
@Component({
  selector: 'app-users',
  template: `
    <app-table
      [dataSource]="users"
      [config]="tableConfig"
      [loading]="loading"
      (addClick)="onAddClick()"
      (editClick)="onEditClick($event)"
      (deleteClick)="onDeleteClick($event)"
      (viewClick)="onViewClick($event)"
      (customActionClick)="onCustomActionClick($event)"
      (pageChange)="onPageChange($event)"
      (rowClick)="onRowClick($event)"
    >
    </app-table>
  `
})
export class UsersComponent {
  users: User[] = [];
  loading = false;

  tableConfig: TableConfig = {
    columns: [
      { name: 'id', header: 'ID', type: 'number', sortable: true, visible: true },
      { name: 'name', header: 'Nombre', type: 'text', sortable: true, visible: true, editable: true },
      { name: 'email', header: 'Email', type: 'text', visible: true, editable: true },
      { name: 'role', header: 'Rol', type: 'text', visible: true, editable: true },
      { name: 'createdAt', header: 'Fecha', type: 'date', sortable: true, visible: true },
      { name: 'active', header: 'Activo', type: 'boolean', visible: true, editable: true },
      { name: 'salary', header: 'Salario', type: 'currency', sortable: true, visible: true, editable: true },
    ],
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showPaginator: true,
    showColumnSelector: true,
    showActions: true,
    showAddButton: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    customActions: [
      { name: 'activate', icon: 'check_circle', tooltip: 'Activar', color: 'primary' },
      { name: 'duplicate', icon: 'content_copy', tooltip: 'Duplicar', color: 'accent' }
    ],
    title: 'Gestión de Usuarios',
    addButtonText: 'Nuevo Usuario'
  };

  onAddClick(): void {
    // Abrir diálogo para agregar usuario
    console.log('Agregar nuevo usuario');
  }

  onEditClick(user: User): void {
    // Abrir diálogo para editar usuario
    console.log('Editar usuario:', user);
  }

  onDeleteClick(user: User): void {
    // Mostrar confirmación y eliminar
    if (confirm(`¿Eliminar usuario ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  onViewClick(user: User): void {
    // Mostrar detalles del usuario
    console.log('Ver detalles:', user);
  }

  onCustomActionClick(event: { action: string; item: User }): void {
    switch (event.action) {
      case 'activate':
        event.item.active = true;
        break;
      case 'duplicate':
        const newUser = { ...event.item, id: Date.now(), name: `${event.item.name} (Copia)` };
        this.users.unshift(newUser);
        break;
    }
  }

  onPageChange(event: PageEvent): void {
    // Cargar datos de la página
    console.log('Cambiar página:', event);
  }

  onRowClick(user: User): void {
    // Acción al hacer clic en fila
    console.log('Clic en fila:', user);
  }
}
```

## 🎨 Estilos y Temas

El componente utiliza variables CSS para temas. Asegúrate de tener definidas estas variables:

```css
:root {
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --border: #e2e8f0;
  --destructive: #ef4444;
}
```

## 📱 Responsive Design

El componente es completamente responsive:

- **Desktop**: Muestra todos los botones de acción
- **Tablet**: Optimiza el espaciado
- **Mobile**: Reduce el tamaño de botones y ajusta el padding

## 🔧 Configuración Avanzada

### Paginación Personalizada

```typescript
tableConfig: TableConfig = {
  // ... otras configuraciones
  pageSize: 25,
  pageSizeOptions: [10, 25, 50, 100],
  showPaginator: true,
  totalItems: 1000
};
```

### Ordenamiento por Defecto

```typescript
tableConfig: TableConfig = {
  // ... otras configuraciones
  defaultSort: { active: 'name', direction: 'asc' }
};
```

### Acciones Personalizadas Avanzadas

```typescript
tableConfig: TableConfig = {
  // ... otras configuraciones
  customActions: [
    {
      name: 'activate',
      icon: 'check_circle',
      tooltip: 'Activar usuario',
      color: 'primary',
      visible: true,
      disabled: false
    },
    {
      name: 'export',
      icon: 'download',
      tooltip: 'Exportar datos',
      color: 'accent',
      visible: true
    },
    {
      name: 'archive',
      icon: 'archive',
      tooltip: 'Archivar',
      color: 'warn',
      visible: false // Solo visible en ciertas condiciones
    }
  ]
};
```

## 🚨 Solución de Problemas

### El hover no funciona correctamente
- Asegúrate de que las animaciones estén habilitadas en `app.config.ts`
- Verifica que no haya estilos CSS conflictivos

### Los botones de acción no aparecen
- Verifica que `showActions: true` esté configurado
- Asegúrate de que al menos un botón de acción esté habilitado

### La paginación no funciona
- Verifica que `showPaginator: true` esté configurado
- Asegúrate de manejar el evento `pageChange`

## 📚 Archivos del Componente

- `table.component.ts` - Lógica principal del componente
- `table.component.html` - Template del componente
- `table.component.css` - Estilos del componente
- `example/example.component.ts` - Ejemplo de uso
- `README.md` - Esta documentación

## ❓ Preguntas Frecuentes (FAQ)

### **¿Se puede usar cualquier tipo de interfaz?**

**Sí**, el componente es genérico (`TableComponent<T>`) y acepta cualquier interfaz. Solo necesitas:

```typescript
interface MiEntidad {
  id: number;
  nombre: string;
  // ... cualquier propiedad
}

// Usar con tu interfaz
<app-table [dataSource]="miArray" [config]="config"></app-table>
```

### **¿Cuáles son los límites del componente?**

- **Columnas**: No hay límite técnico, pero se recomienda máximo 10-12 columnas para UX
- **Filas**: Depende de la memoria del navegador, se recomienda paginación para >1000 filas
- **Acciones personalizadas**: Máximo 5-6 acciones por fila para evitar desorden visual
- **Tipos de datos**: Solo soporta los 5 tipos definidos (`text`, `number`, `date`, `boolean`, `currency`)

### **¿Cómo manejar datos anidados o complejos?**

Para propiedades anidadas, usa la notación de punto:

```typescript
interface User {
  id: number;
  profile: {
    name: string;
    email: string;
  };
  address: {
    city: string;
    country: string;
  };
}

tableConfig: TableConfig = {
  columns: [
    { name: 'id', header: 'ID', type: 'number' },
    { name: 'profile.name', header: 'Nombre', type: 'text' },
    { name: 'profile.email', header: 'Email', type: 'text' },
    { name: 'address.city', header: 'Ciudad', type: 'text' },
  ]
};
```

### **¿Se puede personalizar el formato de fechas y monedas?**

**Sí**, puedes extender el componente para soportar formatos personalizados:

```typescript
// En el template, puedes usar pipes personalizados
{{ row[column.name] | date : "dd/MM/yyyy HH:mm" }}
{{ row[column.name] | currency : "USD" : "symbol" : "1.2-2" }}
```

### **¿Cómo implementar filtros personalizados?**

El componente no incluye filtros por defecto, pero puedes implementarlos:

```typescript
// Agregar filtros en tu componente padre
filteredData: User[] = [];

applyFilter(filterValue: string) {
  this.filteredData = this.users.filter(user => 
    user.name.toLowerCase().includes(filterValue.toLowerCase())
  );
}
```

### **¿Se puede usar con datos asíncronos?**

**Sí**, es perfecto para datos asíncronos:

```typescript
export class UsersComponent {
  users$ = this.userService.getUsers();
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.users$.subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        // Manejar error
      }
    });
  }
}
```

### **¿Cómo manejar permisos de usuario?**

Puedes controlar la visibilidad de acciones basado en permisos:

```typescript
tableConfig: TableConfig = {
  // ... otras configuraciones
  showAddButton: this.hasPermission('users.create'),
  showEditButton: this.hasPermission('users.update'),
  showDeleteButton: this.hasPermission('users.delete'),
  customActions: [
    {
      name: 'activate',
      visible: this.hasPermission('users.activate'),
      disabled: !this.hasPermission('users.activate')
    }
  ]
};
```

### **¿Se puede usar con Angular Reactive Forms?**

**Sí**, puedes integrar con formularios reactivos para los diálogos:

```typescript
// En tu diálogo de edición
export class UserDialogComponent {
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
```

### **¿Cómo optimizar el rendimiento con muchos datos?**

- **Paginación**: Usa `pageSize` apropiado (10-50 elementos)
- **Virtual Scrolling**: Para listas muy grandes, considera `cdk-virtual-scroll-viewport`
- **Lazy Loading**: Carga datos por demanda
- **Debounce**: Para filtros en tiempo real

### **¿Se puede exportar a Excel/CSV?**

No está incluido por defecto, pero puedes implementarlo:

```typescript
onExportClick() {
  const csvContent = this.convertToCSV(this.users);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'usuarios.csv';
  link.click();
}
```

### **¿Cómo manejar errores de carga?**

```typescript
export class UsersComponent {
  loading = false;
  error = false;

  loadData() {
    this.loading = true;
    this.error = false;
    
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        // Mostrar mensaje de error
      }
    });
  }
}
```

### **¿Se puede usar con Angular Material Dialog?**

**Sí**, es la forma recomendada para formularios CRUD:

```typescript
onAddClick() {
  const dialogRef = this.dialog.open(UserDialogComponent, {
    width: '500px',
    data: { isEdit: false }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Guardar nuevo usuario
    }
  });
}
```

### **¿Cómo implementar búsqueda global?**

```typescript
// Agregar campo de búsqueda en tu template
<input matInput [(ngModel)]="searchTerm" (input)="onSearchChange()" placeholder="Buscar...">

// En tu componente
onSearchChange() {
  this.filteredUsers = this.users.filter(user =>
    Object.values(user).some(value =>
      value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  );
}
```

### **¿Se puede usar con Angular Router?**

**Sí**, puedes navegar a rutas específicas desde las acciones:

```typescript
onViewClick(user: User) {
  this.router.navigate(['/users', user.id]);
}

onEditClick(user: User) {
  this.router.navigate(['/users', user.id, 'edit']);
}
```

### **¿Cómo manejar estados de carga individuales?**

```typescript
// Para acciones individuales
usersWithLoading: (User & { loading?: boolean })[] = [];

onEditClick(user: User) {
  const userIndex = this.usersWithLoading.findIndex(u => u.id === user.id);
  this.usersWithLoading[userIndex].loading = true;
  
  this.userService.updateUser(user).subscribe({
    next: () => {
      this.usersWithLoading[userIndex].loading = false;
    },
    error: () => {
      this.usersWithLoading[userIndex].loading = false;
    }
  });
}
```
