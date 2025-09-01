# Sistema de Cálculo de Ciclo Menstrual

## 🎯 Características Implementadas

### ✅ Funciones Principales
- **Cálculo automático del día del ciclo** basado en la fecha del último período
- **Detección automática de fases** del ciclo (menstrual, folicular, ovulación, lútea)
- **Cálculo personalizado** de duración promedio del ciclo basado en historial
- **Predicciones inteligentes** para próximo período y ventana fértil
- **Probabilidad de embarazo** basada en la fase actual del ciclo

### ✅ Sistema de Fases
- **Fase Menstrual** (días 1-5): Período de sangrado
- **Fase Folicular** (días 6-13): Preparación para ovulación
- **Ovulación** (días 14-16): Liberación del óvulo
- **Fase Lútea** (días 17-28): Preparación para el período

### ✅ Cálculos Personalizados
- **Duración promedio del ciclo** calculada automáticamente
- **Variación estándar** para medir regularidad
- **Ventana fértil** adaptada a la duración personal del ciclo
- **Predicciones** basadas en patrones individuales

## 🚀 Cómo Usar

### 1. Registrar un Período
```javascript
// Navegar a /periodo
// O usar la función directa:
const cycleService = new CycleService();
cycleService.recordPeriod(new Date('2024-01-15'));
```

### 2. Obtener Información del Ciclo
```javascript
const stats = cycleService.getCycleStatistics();

console.log(`Día actual: ${stats.currentCycleDay}`);
console.log(`Fase: ${stats.currentPhase.name}`);
console.log(`Fertilidad: ${stats.fertility.level}`);
console.log(`Próximo período en: ${stats.daysToNextPeriod} días`);
```

### 3. Actualización Automática
```javascript
// El sistema se actualiza automáticamente cada día
cycleService.updateCycleDay();
```

## 📊 Datos Almacenados

### Estructura de Datos
```javascript
{
  lastPeriod: "2024-01-15T00:00:00.000Z",
  cycleHistory: [
    {
      startDate: "2023-12-15T00:00:00.000Z",
      endDate: "2024-01-15T00:00:00.000Z",
      duration: 31
    }
  ],
  averageCycleLength: 31,
  cycleVariation: 2,
  lastCalculatedDate: "2024-01-16T00:00:00.000Z"
}
```

### Detalles del Período
```javascript
{
  startDate: "2024-01-15",
  duration: 5,
  flowIntensity: "medium",
  symptoms: ["cramps", "fatigue"],
  notes: "Flujo moderado, cólicos leves",
  timestamp: "2024-01-15T10:00:00.000Z"
}
```

## 🔧 API del Servicio

### Métodos Principales

#### `recordPeriod(date)`
Registra un nuevo período y recalcula estadísticas.

#### `getCurrentCycleDay()`
Retorna el día actual del ciclo (1-35).

#### `getCurrentPhase()`
Retorna información de la fase actual:
```javascript
{
  name: "Fase folicular",
  description: "Preparación para la ovulación",
  icon: "🌱",
  fertility: "media",
  symptoms: ["Energía alta", "Humor mejorado"]
}
```

#### `getPregnancyProbability()`
Retorna información de fertilidad:
```javascript
{
  level: "alta",
  percentage: "70-85%",
  description: "Ventana fértil activa",
  icon: "⚡"
}
```

#### `getFertileWindowInfo()`
Retorna información de la ventana fértil:
```javascript
{
  daysUntil: 0,
  status: "activa",
  description: "Faltan 2 días de fertilidad"
}
```

#### `getCycleStatistics()`
Retorna todas las estadísticas del ciclo en un objeto.

#### `getRecommendations()`
Retorna recomendaciones basadas en la fase actual.

## 📱 Páginas Implementadas

### 1. **Página Principal** (`/`)
- Muestra día actual del ciclo
- Fase actual con icono y descripción
- Nivel de fertilidad
- Predicciones de próximo período y ventana fértil

### 2. **Página de Períodos** (`/periodo`)
- Formulario para registrar períodos
- Selección de fecha, duración, intensidad
- Checklist de síntomas
- Acciones rápidas (hoy/ayer)
- Información del ciclo actual

### 3. **Página de Estadísticas** (`/estadisticas`)
- Duración promedio personalizada
- Variación del ciclo
- Historial de últimos ciclos
- Métricas de regularidad

## 🎨 Características de UX

### Indicadores Visuales
- **Iconos** para cada fase del ciclo
- **Colores** para niveles de fertilidad
- **Estados** claros para ventana fértil

### Acciones Rápidas
- Botón "Registrar para hoy"
- Botón "Registrar para ayer"
- Formulario completo para detalles

### Información Contextual
- Recomendaciones por fase
- Síntomas típicos de cada fase
- Explicaciones claras de cada estado

## 🔄 Flujo de Datos

1. **Usuario registra período** → `recordPeriod()`
2. **Sistema calcula duración** del ciclo anterior
3. **Se actualiza historial** y estadísticas
4. **Se recalcula promedio** y variación
5. **Se actualiza información** en todas las páginas

## 🧪 Casos de Uso

### Usuario Nuevo
- Primera vez registrando período
- Sistema comienza con duración estándar (28 días)
- Se personaliza gradualmente con más datos

### Usuario Regular
- Ciclo bien establecido
- Predicciones precisas
- Recomendaciones personalizadas

### Ciclo Irregular
- Sistema detecta variaciones
- Muestra estadísticas de regularidad
- Adapta cálculos a patrones individuales

## 🚨 Validaciones

### Duración del Ciclo
- **Mínimo**: 21 días (ciclo corto)
- **Máximo**: 45 días (ciclo largo)
- **Por defecto**: 28 días

### Fechas
- No permite duplicados en la misma fecha
- Valida formato de fecha
- Calcula diferencias correctamente

## 🔮 Futuras Mejoras

- [ ] Gráficos visuales del ciclo
- [ ] Notificaciones de períodos próximos
- [ ] Sincronización con calendario
- [ ] Exportación de datos
- [ ] Análisis de tendencias
- [ ] Integración con wearables

## 📝 Notas Técnicas

- **Almacenamiento**: localStorage para persistencia
- **Cálculos**: Matemáticas precisas para fechas
- **Rendimiento**: Actualizaciones automáticas eficientes
- **Compatibilidad**: Funciona en todos los navegadores modernos

---

**Desarrollado para AppHibrida - Sistema de Salud Femenina**
