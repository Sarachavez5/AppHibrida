/**
 * Servicio para el cálculo y gestión del ciclo menstrual
 */
export class CycleService {
  constructor() {
    this.storageKey = 'cycle_data';
    console.log('CycleService inicializándose...');
    this.initializeData();
    console.log('CycleService inicializado. Datos:', this.getCycleData());
  }

  /**
   * Inicializa los datos del ciclo si no existen
   */
  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        lastPeriod: null,
        cycleHistory: [],
        averageCycleLength: 28,
        cycleVariation: 0,
        lastCalculatedDate: null
      };
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  /**
   * Registra un nuevo período
   * @param {Date} periodDate - Fecha del período
   */
  recordPeriod(periodDate) {
    console.log('recordPeriod llamado con fecha:', periodDate);
    const data = this.getCycleData();
    const today = new Date();
    
    console.log('Datos actuales:', data);
    console.log('Fecha de hoy:', today);
    
    // Si ya existe un período para la fecha seleccionada, no duplicar
    if (data.lastPeriod && this.isSameDay(new Date(data.lastPeriod), periodDate)) {
      console.log('Ya existe un período para esa fecha:', periodDate.toISOString().split('T')[0]);
      return false;
    }

    // Calcular duración del ciclo anterior si existe
    if (data.lastPeriod) {
      const lastPeriodDate = new Date(data.lastPeriod);
      const cycleLength = this.calculateDaysBetween(lastPeriodDate, periodDate);
      
      // Solo agregar si es un ciclo válido (entre 21 y 45 días)
      if (cycleLength >= 21 && cycleLength <= 45) {
        data.cycleHistory.push({
          startDate: data.lastPeriod,
          endDate: periodDate.toISOString(),
          duration: cycleLength
        });
        
        // Mantener solo los últimos 12 ciclos
        if (data.cycleHistory.length > 12) {
          data.cycleHistory = data.cycleHistory.slice(-12);
        }
        
        // Recalcular promedio y variación
        this.calculateCycleStatistics(data);
      }
    } else {
      // Es el primer período registrado, agregarlo al historial
      data.cycleHistory.push({
        startDate: periodDate.toISOString(),
        endDate: periodDate.toISOString(),
        duration: 1  // Duración mínima para el primer período
      });
      
      console.log('Primer período agregado al historial:', data.cycleHistory);
    }

    data.lastPeriod = periodDate.toISOString();
    data.lastCalculatedDate = today.toISOString();
    
    console.log('Guardando datos:', data);
    this.saveCycleData(data);
    
    // Verificar que se guardó correctamente
    const savedData = this.getCycleData();
    console.log('Datos guardados verificados:', savedData);
    
    return true;
  }

  /**
   * Obtiene el día actual del ciclo
   * @returns {number} Día del ciclo (1-35)
   */
  getCurrentCycleDay() {
    const data = this.getCycleData();
    console.log('getCurrentCycleDay - data:', data);
    
    if (!data.lastPeriod) {
      console.log('getCurrentCycleDay - no hay lastPeriod, retornando 1');
      return 1;
    }

    const lastPeriodDate = new Date(data.lastPeriod);
    const today = new Date();
    const cycleDay = this.calculateDaysBetween(lastPeriodDate, today) + 1;
    
    console.log('getCurrentCycleDay - lastPeriodDate:', lastPeriodDate);
    console.log('getCurrentCycleDay - today:', today);
    console.log('getCurrentCycleDay - días entre:', this.calculateDaysBetween(lastPeriodDate, today));
    console.log('getCurrentCycleDay - cycleDay calculado:', cycleDay);
    
    // Si han pasado más de 35 días, probablemente sea un nuevo ciclo
    if (cycleDay > 35) {
      console.log('getCurrentCycleDay - más de 35 días, retornando 1');
      return 1;
    }
    
    console.log('getCurrentCycleDay - retornando:', cycleDay);
    return cycleDay;
  }

  /**
   * Obtiene la fase actual del ciclo
   * @returns {Object} Información de la fase actual
   */
  getCurrentPhase() {
    const cycleDay = this.getCurrentCycleDay();
    const data = this.getCycleData();
    const averageLength = data.averageCycleLength;
    
    // Calcular fases basadas en la duración promedio personalizada
    const menstrualEnd = Math.min(5, Math.floor(averageLength * 0.18));
    const follicularEnd = Math.floor(averageLength * 0.46);
    const ovulationEnd = Math.floor(averageLength * 0.57);
    
    if (cycleDay >= 1 && cycleDay <= menstrualEnd) {
      return {
        name: 'Fase menstrual',
        description: 'Período de sangrado',
        icon: '🩸',
        fertility: 'baja',
        symptoms: ['Cólicos', 'Fatiga', 'Cambios de humor']
      };
    } else if (cycleDay > menstrualEnd && cycleDay <= follicularEnd) {
      return {
        name: 'Fase folicular',
        description: 'Preparación para la ovulación',
        icon: '🌱',
        fertility: 'media',
        symptoms: ['Energía alta', 'Humor mejorado', 'Libido aumentada']
      };
    } else if (cycleDay > follicularEnd && cycleDay <= ovulationEnd) {
      return {
        name: 'Ovulación',
        description: 'Liberación del óvulo',
        icon: '🥚',
        fertility: 'máxima',
        symptoms: ['Dolor pélvico', 'Flujo cervical', 'Libido máxima']
      };
    } else {
      return {
        name: 'Fase lútea',
        description: 'Preparación para el período',
        icon: '🌙',
        fertility: 'baja',
        symptoms: ['Síndrome premenstrual', 'Retención de líquidos', 'Cambios de humor']
      };
    }
  }

  /**
   * Calcula la probabilidad de embarazo
   * @returns {Object} Información de fertilidad
   */
  getPregnancyProbability() {
    const cycleDay = this.getCurrentCycleDay();
    const data = this.getCycleData();
    const averageLength = data.averageCycleLength;
    
    // Calcular ventana fértil basada en duración personalizada
    const ovulationDay = Math.floor(averageLength * 0.5);
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 2;
    
    if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      if (cycleDay === ovulationDay || cycleDay === ovulationDay - 1) {
        return {
          level: 'máxima',
          percentage: '90-95%',
          description: 'Días más fértiles del ciclo',
          icon: '🔥'
        };
      } else {
        return {
          level: 'alta',
          percentage: '70-85%',
          description: 'Ventana fértil activa',
          icon: '⚡'
        };
      }
    } else if (cycleDay >= fertileStart - 2 && cycleDay <= fertileEnd + 2) {
      return {
        level: 'media',
        percentage: '30-50%',
        description: 'Fertilidad moderada',
        icon: '⚠️'
      };
    } else {
      return {
        level: 'baja',
        percentage: '5-15%',
        description: 'Fertilidad baja',
        icon: '🛡️'
      };
    }
  }

  /**
   * Calcula días hasta el próximo período
   * @returns {number} Días restantes
   */
  getDaysToNextPeriod() {
    const cycleDay = this.getCurrentCycleDay();
    const data = this.getCycleData();
    const averageLength = data.averageCycleLength;
    
    const daysUntilNext = averageLength - cycleDay + 1;
    return daysUntilNext <= 0 ? 1 : daysUntilNext;
  }

  /**
   * Calcula días hasta la ventana fértil
   * @returns {Object} Información de la ventana fértil
   */
  getFertileWindowInfo() {
    const cycleDay = this.getCurrentCycleDay();
    const data = this.getCycleData();
    const averageLength = data.averageCycleLength;
    
    const ovulationDay = Math.floor(averageLength * 0.5);
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 2;
    
    if (cycleDay < fertileStart) {
      return {
        daysUntil: fertileStart - cycleDay,
        status: 'próxima',
        description: `Ventana fértil en ${fertileStart - cycleDay} días`
      };
    } else if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      const daysLeft = fertileEnd - cycleDay;
      return {
        daysUntil: 0,
        status: 'activa',
        description: daysLeft > 0 ? `Faltan ${daysLeft} días de fertilidad` : 'Último día fértil'
      };
    } else {
      // Calcular para el próximo ciclo
      const daysToNextCycle = averageLength - cycleDay;
      const nextFertileStart = daysToNextCycle + fertileStart;
      return {
        daysUntil: nextFertileStart,
        status: 'siguiente',
        description: `Próxima ventana fértil en ${nextFertileStart} días`
      };
    }
  }

  /**
   * Obtiene estadísticas del ciclo
   * @returns {Object} Estadísticas completas
   */
  getCycleStatistics() {
    const data = this.getCycleData();
    const currentCycleDay = this.getCurrentCycleDay();
    const currentPhase = this.getCurrentPhase();
    const fertility = this.getPregnancyProbability();
    const fertileWindow = this.getFertileWindowInfo();
    
    return {
      currentCycleDay,
      currentPhase,
      fertility,
      fertileWindow,
      daysToNextPeriod: this.getDaysToNextPeriod(),
      averageCycleLength: data.averageCycleLength,
      cycleVariation: data.cycleVariation,
      totalCycles: data.cycleHistory.length,
      lastPeriod: data.lastPeriod,
      cycleHistory: data.cycleHistory
    };
  }

  /**
   * Calcula estadísticas basadas en el historial
   * @param {Object} data - Datos del ciclo
   */
  calculateCycleStatistics(data) {
    if (data.cycleHistory.length === 0) return;
    
    const durations = data.cycleHistory.map(cycle => cycle.duration);
    const sum = durations.reduce((acc, val) => acc + val, 0);
    data.averageCycleLength = Math.round(sum / durations.length);
    
    // Calcular variación estándar
    const mean = data.averageCycleLength;
    const squaredDiffs = durations.map(duration => Math.pow(duration - mean, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / durations.length;
    data.cycleVariation = Math.round(Math.sqrt(variance));
  }

  /**
   * Obtiene datos del ciclo desde localStorage
   * @returns {Object} Datos del ciclo
   */
  getCycleData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {
      lastPeriod: null,
      cycleHistory: [],
      averageCycleLength: 28,
      cycleVariation: 0,
      lastCalculatedDate: null
    };
  }

  /**
   * Guarda datos del ciclo en localStorage
   * @param {Object} data - Datos a guardar
   */
  saveCycleData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  /**
   * Calcula días entre dos fechas
   * @param {Date} date1 - Primera fecha
   * @param {Date} date2 - Segunda fecha
   * @returns {number} Días de diferencia
   */
  calculateDaysBetween(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log('calculateDaysBetween - date1:', date1, 'date2:', date2, 'timeDiff:', timeDiff, 'days:', days);
    return days;
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

  /**
   * Actualiza automáticamente el día del ciclo
   * @returns {boolean} True si se actualizó
   */
  updateCycleDay() {
    const data = this.getCycleData();
    const today = new Date();
    
    // Solo actualizar si es un día diferente
    if (!data.lastCalculatedDate || 
        !this.isSameDay(new Date(data.lastCalculatedDate), today)) {
      
      data.lastCalculatedDate = today.toISOString();
      this.saveCycleData(data);
      return true;
    }
    
    return false;
  }

  /**
   * Obtiene recomendaciones basadas en la fase actual
   * @returns {Array} Lista de recomendaciones
   */
  getRecommendations() {
    const phase = this.getCurrentPhase();
    const fertility = this.getPregnancyProbability();
    
    const recommendations = [];
    
    // Recomendaciones por fase
    switch (phase.name) {
      case 'Fase menstrual':
        recommendations.push(
          'Descansa lo suficiente',
          'Mantén una buena hidratación',
          'Considera tomar suplementos de hierro si es necesario'
        );
        break;
      case 'Fase folicular':
        recommendations.push(
          'Es buen momento para hacer ejercicio intenso',
          'Aprovecha tu energía alta para proyectos',
          'Mantén una dieta equilibrada'
        );
        break;
      case 'Ovulación':
        recommendations.push(
          'Si buscas embarazo, estos son tus días más fértiles',
          'Mantén relaciones sexuales regulares',
          'Evita el estrés excesivo'
        );
        break;
      case 'Fase lútea':
        recommendations.push(
          'Practica técnicas de relajación',
          'Mantén una rutina de sueño regular',
          'Considera suplementos de magnesio para el SPM'
        );
        break;
    }
    
    // Recomendaciones de fertilidad
    if (fertility.level === 'máxima' || fertility.level === 'alta') {
      recommendations.push(
        'Mantén relaciones sexuales regulares',
        'Evita lubricantes que puedan afectar la fertilidad',
        'Mantén un peso saludable'
      );
    }
    
    return recommendations;
  }
}
