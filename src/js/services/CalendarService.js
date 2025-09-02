/**
 * Servicio para generar datos del calendario menstrual
 * Se integra con CycleService para mostrar estados reales y predicciones
 */
export class CalendarService {
  constructor(cycleService) {
    this.cycleService = cycleService;
  }

  /**
   * Genera datos del calendario para un mes específico
   * @param {number} month - Mes (0-11, donde 0 = enero)
   * @param {number} year - Año
   * @returns {Array} Array de días con estado y fecha
   */
  generateCalendarData(month, year) {
    console.log(`Generando calendario para ${month + 1}/${year}`);

    const cycleData = this.cycleService.getCycleData();
    const averageCycleLength = cycleData.averageCycleLength || 28;
    const today = new Date();

    // Obtener primer y último día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Obtener día de la semana del primer día (0 = domingo, 1 = lunes)
    // Ajustar para que la semana empiece en lunes (1)
    const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // 0=Lunes, 6=Domingo

    // Calcular días del mes anterior para completar la primera semana
    const daysFromPreviousMonth = firstDayOfWeek;

    const calendarDays = [];

    // Agregar días del mes anterior (si es necesario)
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    const previousMonthLastDay = new Date(previousYear, previousMonth + 1, 0);

    for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
      const day = previousMonthLastDay.getDate() - i;
      const date = new Date(previousYear, previousMonth, day);
      calendarDays.push({
        day: day,
        date: date.toISOString().split('T')[0],
        state: 'otro_mes',
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        cycleDay: null,
        phase: null
      });
    }

    // Agregar días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      const { state, cycleDay, phase } = this.calculateDayState(date, cycleData, averageCycleLength);

      calendarDays.push({
        day: day,
        date: date.toISOString().split('T')[0],
        state: state,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        cycleDay: cycleDay,
        phase: phase
      });
    }

    // Completar la última semana con días del siguiente mes
    const totalDays = calendarDays.length;
    const remainingDays = 42 - totalDays; // Asegurar 6 semanas completas

    if (remainingDays > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;

      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(nextYear, nextMonth, day);
        calendarDays.push({
          day: day,
          date: date.toISOString().split('T')[0],
          state: 'otro_mes',
          isCurrentMonth: false,
          isToday: this.isSameDay(date, today),
          cycleDay: null,
          phase: null
        });
      }
    }

    console.log(`Calendario generado con ${calendarDays.length} días`);
    return calendarDays;
  }

  /**
   * Verifica si hay datos registrados por el usuario para una fecha específica
   * @param {Date} date - Fecha a verificar
   * @returns {boolean} True si hay datos registrados
   */
  hasUserDataForDate(date) {
    const dateKey = date.toISOString().split('T')[0];
    
    // Verificar si hay síntomas registrados
    const symptomsKey = `symptoms_${dateKey}`;
    if (localStorage.getItem(symptomsKey)) {
      return true;
    }
    
    // Verificar si hay estado de ánimo registrado
    const moodKey = `mood_${dateKey}`;
    if (localStorage.getItem(moodKey)) {
      return true;
    }
    
    // Verificar si hay actividades registradas
    const activityKey = `activity_${dateKey}`;
    if (localStorage.getItem(activityKey)) {
      return true;
    }
    
    return false;
  }

  /**
   * Calcula el estado de un día específico
   * @param {Date} date - Fecha a evaluar
   * @param {Object} cycleData - Datos del ciclo
   * @param {number} averageCycleLength - Duración promedio del ciclo
   * @returns {Object} Estado del día, día del ciclo y fase
   */
  calculateDayState(date, cycleData, averageCycleLength) {
    if (!cycleData.lastPeriod) {
      return { state: 'normal', cycleDay: null, phase: null }; // Sin datos del ciclo
    }

    const lastPeriodDate = new Date(cycleData.lastPeriod);
    const today = new Date();

    // Si la fecha es anterior al último período registrado, es normal
    if (date.getTime() < lastPeriodDate.getTime()) {
      // Si es un día de período registrado en el historial
      const isHistoricalPeriod = cycleData.cycleHistory && cycleData.cycleHistory.some(cycle => {
        const start = new Date(cycle.startDate);
        const end = new Date(start);
        // Usar la duración real del período registrado por el usuario, o 5 días por defecto
        const periodDuration = cycle.periodDuration || 5;
        end.setDate(start.getDate() + periodDuration - 1); // -1 porque incluye el día de inicio
        return date >= start && date <= end;
      });
      return { state: isHistoricalPeriod ? 'periodo' : 'normal', cycleDay: null, phase: null };
    }

    const daysSinceLastPeriod = this.calculateDaysBetween(lastPeriodDate, date);
    let cycleDay = daysSinceLastPeriod + 1;

    // Ajustar cycleDay si la fecha está en un ciclo futuro
    let currentCycleStartDate = new Date(lastPeriodDate);
    while (date.getTime() >= new Date(currentCycleStartDate.getTime() + (averageCycleLength * 24 * 60 * 60 * 1000))) {
      currentCycleStartDate = new Date(currentCycleStartDate.getTime() + (averageCycleLength * 24 * 60 * 60 * 1000));
      cycleDay = this.calculateDaysBetween(currentCycleStartDate, date) + 1;
    }

    // Calcular duración del período actual (usar la última duración registrada o 5 días por defecto)
    let menstrualEnd = 5; // Default
    if (cycleData.cycleHistory && cycleData.cycleHistory.length > 0) {
      const lastCycle = cycleData.cycleHistory[cycleData.cycleHistory.length - 1];
      menstrualEnd = lastCycle.periodDuration || 5;
    }
    const follicularEnd = Math.floor(averageCycleLength * 0.46);
    const ovulationEnd = Math.floor(averageCycleLength * 0.57);
    
    // Ventana fértil: 6 días total (5 días antes + día de ovulación)
    // Para un ciclo de 28 días: ovulación día 14, ventana fértil días 9-14
    // 3 días de separación después del período
    const ovulationDay = Math.floor(averageCycleLength / 2); // Día 14 en ciclo de 28 días
    const fertileStart = menstrualEnd + 4; // 3 días de separación después del período
    const fertileEnd = fertileStart + 5; // 6 días total: si start=9, end=14 → días 9,10,11,12,13,14
    
    let state = 'normal';
    let phaseName = 'Fase lútea'; // Default

    if (cycleDay >= 1 && cycleDay <= menstrualEnd) {
      state = 'periodo';
      phaseName = 'Fase menstrual';
    } else if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      console.log(`DEBUG - Día fértil: fecha=${date.toISOString().split('T')[0]}, cycleDay=${cycleDay}, fertileStart=${fertileStart}, fertileEnd=${fertileEnd}`);
      state = 'fertil';
      phaseName = 'Ventana fértil';
    } else if (cycleDay > menstrualEnd && cycleDay < fertileStart) {
      state = 'normal';
      phaseName = 'Fase folicular';
    } else {
      state = 'normal';
      phaseName = 'Fase lútea';
    }

    // Predicciones para el futuro (solo después del ciclo actual Y sin datos registrados)
    const cycleStartDate = new Date(lastPeriodDate);
    const currentCycleEndDate = new Date(cycleStartDate);
    currentCycleEndDate.setDate(cycleStartDate.getDate() + averageCycleLength - 1);
    
    // Solo hacer predicciones si la fecha está después del ciclo actual
    if (date.getTime() > currentCycleEndDate.getTime() && !this.hasUserDataForDate(date)) {
      const currentCycleDay = this.cycleService.getCurrentCycleDay();
      const daysToNextPeriod = averageCycleLength - currentCycleDay + 1;
      
      const daysDiff = this.calculateDaysBetween(today, date);
      
      // Predicción de período futuro (5 días)
      if (daysDiff >= daysToNextPeriod && daysDiff < daysToNextPeriod + 5) {
        state = 'futuro_periodo';
        phaseName = 'Período predicho';
      }
      // Predicción de ventana fértil futura (6 días) - aproximadamente 14 días antes del próximo período
      else if (daysDiff >= (daysToNextPeriod - 14) && daysDiff < (daysToNextPeriod - 8)) {
        state = 'futuro_fertil';
        phaseName = 'Ventana fértil predicha';
      }
    }

    return { state: state, cycleDay: cycleDay, phase: phaseName };
  }

  /**
   * Obtiene información del ciclo actual
   * @returns {Object} Información del ciclo
   */
  getCurrentCycleInfo() {
    const cycleData = this.cycleService.getCycleData();
    if (!cycleData.lastPeriod) {
      return { 
        cycleDay: 0,
        phase: { name: 'Sin datos', icon: '❓' },
        fertility: { level: 'baja' }, 
        daysToNextPeriod: 'N/A' 
      };
    }

    const stats = this.cycleService.getCycleStatistics();
    const currentPhase = stats.currentPhase;
    
    // Mapear la fase a un icono
    let phaseIcon = '🔄';
    let phaseName = currentPhase.name || 'Desconocida';
    
    switch (currentPhase.name) {
      case 'Fase folicular':
        phaseIcon = '🌱';
        break;
      case 'Fase ovulatoria':
        phaseIcon = '🥚';
        break;
      case 'Fase lútea':
        phaseIcon = '🌙';
        break;
      case 'Fase menstrual':
        phaseIcon = '🩸';
        break;
      default:
        phaseIcon = '🔄';
    }

    return {
      cycleDay: stats.currentCycleDay || 1,
      phase: {
        name: phaseName,
        icon: phaseIcon
      },
      fertility: {
        level: stats.fertility?.level || 'baja'
      },
      daysToNextPeriod: stats.daysToNextPeriod || 0
    };
  }

  /**
   * Obtiene estadísticas del mes
   * @param {number} month - Mes (0-11)
   * @param {number} year - Año
   * @returns {Object} Estadísticas del mes
   */
  getMonthStatistics(month, year) {
    const calendarDays = this.generateCalendarData(month, year);
    const stats = {
      periodDays: 0,
      fertileDays: 0,
      futurePeriodDays: 0
    };

    calendarDays.forEach(day => {
      if (day.isCurrentMonth) {
        switch (day.state) {
          case 'periodo':
            stats.periodDays++;
            break;
          case 'fertil':
            stats.fertileDays++;
            break;
          case 'futuro_periodo':
            stats.futurePeriodDays++;
            break;
        }
      }
    });
    return stats;
  }

  /**
   * Calcula días entre dos fechas
   * @param {Date} date1 - Primera fecha
   * @param {Date} date2 - Segunda fecha
   * @returns {number} Días de diferencia
   */
  calculateDaysBetween(date1, date2) {
    const timeDiff = date2.getTime() - date1.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Verifica si dos fechas son el mismo día
   * @param {Date} date1 - Primera fecha
   * @param {Date} date2 - Segunda fecha
   * @returns {boolean} True si es el mismo día
   */
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
