# Theme Toggle Component

Este componente proporciona un sistema completo de temas para la aplicación Angular con soporte para modo claro, oscuro y automático.

## Características

- **Modo Claro**: Tema con colores claros
- **Modo Oscuro**: Tema con colores oscuros  
- **Modo Automático**: Se adapta automáticamente a las preferencias del sistema
- **Persistencia**: Guarda la preferencia en localStorage
- **Transiciones suaves**: Animaciones fluidas entre temas
- **Responsive**: Funciona en dispositivos móviles y desktop

## Uso

### Importar el componente

```typescript
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  imports: [ThemeToggleComponent],
  // ...
})
```

### Usar en el template

```html
<app-theme-toggle></app-theme-toggle>
```

## Servicio de Tema

El componente utiliza `ThemeService` que proporciona:

### Métodos disponibles

- `getCurrentTheme()`: Observable que emite el tema actual
- `setTheme(theme: 'light' | 'dark' | 'auto')`: Cambia el tema
- `isDarkMode()`: Observable que indica si está en modo oscuro
- `toggleTheme()`: Alterna entre temas

### Ejemplo de uso del servicio

```typescript
import { ThemeService } from '../services/theme.service';

constructor(private themeService: ThemeService) {}

// Cambiar a modo oscuro
this.themeService.setTheme('dark');

// Escuchar cambios de tema
this.themeService.getCurrentTheme().subscribe(theme => {
  console.log('Tema actual:', theme);
});
```

## Configuración de Tailwind

El sistema utiliza Tailwind CSS con modo oscuro habilitado. La configuración está en `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class', // Habilita modo oscuro con clase 'dark'
  // ...
}
```

## Estilos CSS

Los estilos incluyen:
- Transiciones suaves entre temas
- Hover effects
- Estilos para Material Design en modo oscuro
- Animaciones de iconos

## Personalización

Para personalizar los colores, modifica las variables en `tailwind.config.js` y `src/styles.css`.

## Compatibilidad

- Angular 19+
- Tailwind CSS 4.x
- Angular Material
- Navegadores modernos con soporte para CSS custom properties 