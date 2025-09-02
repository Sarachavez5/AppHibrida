/**
 * Ejemplo de uso del sistema de calendario sincronizado
 * Este archivo demuestra cómo usar CalendarService y CycleService juntos
 */

import { CycleService } from '../services/CycleService.js';
import { CalendarService } from '../services/CalendarService.js';

export class CalendarExample {
  constructor() {
    // Inicializar servicios
    this.cycleService = new CycleService();
    this.calendarService = new CalendarService(this.cycleService);
    
    console.log('CalendarExample inicializado');
  }

  /**
   * Ejemplo 1: Generar calendario para el mes actual
   */
  generateCurrentMonthCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    console.log(`Generando calendario para ${currentMonth + 1}/${currentYear}`);
    
    const calendarData = this.calendarService.generateCalendarData(currentMonth, currentYear);
    
    console.log('Datos del calendario generados:', calendarData);
    
    // Mostrar estadísticas del mes
    const monthStats = this.calendarService.getMonthStatistics(currentMonth, currentYear);
    console.log('Estadísticas del mes:', monthStats);
    
    return { calendarData, monthStats };
  }

  /**
   * Ejemplo 2: Mostrar información del ciclo actual
   */
  showCurrentCycleInfo() {
    const cycleInfo = this.calendarService.getCurrentCycleInfo();
    
    console.log('=== INFORMACIÓN DEL CICLO ACTUAL ===');
    console.log(`Día del ciclo: ${cycleInfo.cycleDay}`);
    
    if (cycleInfo.phase && cycleInfo.phase !== 'Sin datos') {
      console.log(`Fase: ${cycleInfo.phase.name}`);
      console.log(`Descripción: ${cycleInfo.phase.description}`);
      console.log(`Icono: ${cycleInfo.phase.icon}`);
      console.log(`Fertilidad: ${cycleInfo.fertility.level} (${cycleInfo.fertility.percentage})`);
      console.log(`Próximo período en: ${cycleInfo.daysToNextPeriod} días`);
    } else {
      console.log('No hay datos del ciclo registrados');
    }
    
    return cycleInfo;
  }

  /**
   * Ejemplo 3: Generar calendario para diferentes meses
   */
  generateMultipleMonths() {
    const months = [
      { month: 0, year: 2025, name: 'Enero 2025' },
      { month: 1, year: 2025, name: 'Febrero 2025' },
      { month: 2, year: 2025, name: 'Marzo 2025' }
    ];
    
    const calendars = {};
    
    months.forEach(({ month, year, name }) => {
      console.log(`Generando ${name}...`);
      const calendarData = this.calendarService.generateCalendarData(month, year);
      const stats = this.calendarService.getMonthStatistics(month, year);
      
      calendars[name] = {
        calendarData,
        stats
      };
      
      console.log(`${name}: ${stats.periodDays} días de período, ${stats.fertileDays} días fértiles`);
    });
    
    return calendars;
  }

  /**
   * Ejemplo 4: Simular registro de período y ver cambios
   */
  simulatePeriodRegistration() {
    console.log('=== SIMULANDO REGISTRO DE PERÍODO ===');
    
    // Mostrar estado antes
    const beforeInfo = this.calendarService.getCurrentCycleInfo();
    console.log('Estado ANTES del registro:', beforeInfo);
    
    // Simular registro de período para hoy
    const today = new Date();
    const success = this.cycleService.recordPeriod(today);
    
    if (success) {
      console.log('Período registrado exitosamente');
      
      // Mostrar estado después
      const afterInfo = this.calendarService.getCurrentCycleInfo();
      console.log('Estado DESPUÉS del registro:', afterInfo);
      
      // Regenerar calendario
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const newCalendarData = this.calendarService.generateCalendarData(currentMonth, currentYear);
      
      console.log('Calendario actualizado:', newCalendarData);
      
      return { before: beforeInfo, after: afterInfo, newCalendar: newCalendarData };
    } else {
      console.log('No se pudo registrar el período');
      return null;
    }
  }

  /**
   * Ejemplo 5: Mostrar días especiales del mes
   */
  showSpecialDays() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const specialDays = this.calendarService.getSpecialDays(currentMonth, currentYear);
    
    console.log('=== DÍAS ESPECIALES DEL MES ===');
    
    if (specialDays.length === 0) {
      console.log('No hay días especiales este mes');
    } else {
      specialDays.forEach(day => {
        console.log(`${day.date}: ${day.state} (Día ${day.cycleDay} del ciclo)`);
      });
    }
    
    return specialDays;
  }

  /**
   * Ejemplo 6: Predicciones del ciclo
   */
  showPredictions() {
    const prediction = this.calendarService.predictNextPeriod();
    
    console.log('=== PREDICCIONES DEL CICLO ===');
    
    if (prediction) {
      console.log(`Próximo período previsto: ${prediction.predictedDate.toLocaleDateString()}`);
      console.log(`Días hasta el próximo período: ${prediction.daysUntil}`);
      console.log(`Confianza de la predicción: ${prediction.confidence}`);
    } else {
      console.log('No hay suficientes datos para hacer predicciones');
    }
    
    return prediction;
  }

  /**
   * Ejemplo 7: Navegación entre meses
   */
  demonstrateMonthNavigation() {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    console.log('=== NAVEGACIÓN ENTRE MESES ===');
    
    // Mes actual
    console.log(`Mes actual: ${this.getMonthName(currentMonth)} ${currentYear}`);
    let calendarData = this.calendarService.generateCalendarData(currentMonth, currentYear);
    console.log(`Días en el calendario: ${calendarData.length}`);
    
    // Mes anterior
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    
    console.log(`Mes anterior: ${this.getMonthName(currentMonth)} ${currentYear}`);
    calendarData = this.calendarService.generateCalendarData(currentMonth, currentYear);
    console.log(`Días en el calendario: ${calendarData.length}`);
    
    // Mes siguiente (volver al actual)
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    
    console.log(`Mes siguiente: ${this.getMonthName(currentMonth)} ${currentYear}`);
    calendarData = this.calendarService.generateCalendarData(currentMonth, currentYear);
    console.log(`Días en el calendario: ${calendarData.length}`);
  }

  /**
   * Ejemplo 8: Ejecutar todos los ejemplos
   */
  runAllExamples() {
    console.log('🚀 INICIANDO EJEMPLOS DEL CALENDARIO SINCRONIZADO');
    console.log('================================================');
    
    try {
      // Ejemplo 1: Calendario del mes actual
      console.log('\n📅 EJEMPLO 1: Calendario del mes actual');
      this.generateCurrentMonthCalendar();
      
      // Ejemplo 2: Información del ciclo
      console.log('\n🔄 EJEMPLO 2: Información del ciclo actual');
      this.showCurrentCycleInfo();
      
      // Ejemplo 3: Múltiples meses
      console.log('\n📆 EJEMPLO 3: Múltiples meses');
      this.generateMultipleMonths();
      
      // Ejemplo 4: Simulación de registro
      console.log('\n📝 EJEMPLO 4: Simulación de registro de período');
      this.simulatePeriodRegistration();
      
      // Ejemplo 5: Días especiales
      console.log('\n⭐ EJEMPLO 5: Días especiales');
      this.showSpecialDays();
      
      // Ejemplo 6: Predicciones
      console.log('\n🔮 EJEMPLO 6: Predicciones');
      this.showPredictions();
      
      // Ejemplo 7: Navegación
      console.log('\n🧭 EJEMPLO 7: Navegación entre meses');
      this.demonstrateMonthNavigation();
      
      console.log('\n✅ Todos los ejemplos ejecutados exitosamente');
      
    } catch (error) {
      console.error('❌ Error ejecutando ejemplos:', error);
    }
  }

  /**
   * Utilidad: Obtener nombre del mes
   */
  getMonthName(month) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  }
}

// Ejemplo de uso directo (descomentar para probar)
/*
const example = new CalendarExample();
example.runAllExamples();
*/
