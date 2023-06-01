interface SpanishMonth {
  name: string
  shortName: string
  spanishCalendarMonthNumber: number
}

interface SpanishCalendarDay {
  name: string
  shortName: string
  spanishCalendarWeekdayNumber: number
}

export const months: { [id: number]: string } = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
};

export const spanishMonths: { [id: number]: SpanishMonth } = {
  0: {
    name: 'Enero',
    shortName: 'Ene',
    spanishCalendarMonthNumber: 1,
  },
  1: {
    name: 'Febrero',
    shortName: 'Feb',
    spanishCalendarMonthNumber: 2,
  },
  2: {
    name: 'Marzo',
    shortName: 'Mar',
    spanishCalendarMonthNumber: 3,
  },
  3: {
    name: 'Abril',
    shortName: 'Abr',
    spanishCalendarMonthNumber: 4,
  },
  4: {
    name: 'Mayo',
    shortName: 'May',
    spanishCalendarMonthNumber: 5,
  },
  5: {
    name: 'Junio',
    shortName: 'Jun',
    spanishCalendarMonthNumber: 6,
  },
  6: {
    name: 'Julio',
    shortName: 'Jul',
    spanishCalendarMonthNumber: 7,
  },
  7: {
    name: 'Agosto',
    shortName: 'Ago',
    spanishCalendarMonthNumber: 8,
  },
  8: {
    name: 'Septiembre',
    shortName: 'Sep',
    spanishCalendarMonthNumber: 9,
  },
  9: {
    name: 'Octubre',
    shortName: 'Oct',
    spanishCalendarMonthNumber: 10,
  },
  10: {
    name: 'Noviembre',
    shortName: 'Nov',
    spanishCalendarMonthNumber: 11,
  },
  11: {
    name: 'Diciembre',
    shortName: 'Dic',
    spanishCalendarMonthNumber: 12,
  },
};

export const spanishDays: { [id: number]: SpanishCalendarDay } = {
  0: {
    name: 'Domingo',
    shortName: 'Dom',
    spanishCalendarWeekdayNumber: 6,
  },
  1: {
    name: 'Lunes',
    shortName: 'Lun',
    spanishCalendarWeekdayNumber: 0,
  },
  2: {
    name: 'Martes',
    shortName: 'Mar',
    spanishCalendarWeekdayNumber: 1,
  },
  3: {
    name: 'Miércoles',
    shortName: 'Mie',
    spanishCalendarWeekdayNumber: 2,
  },
  4: {
    name: 'Jueves',
    shortName: 'Jue',
    spanishCalendarWeekdayNumber: 3,
  },
  5: {
    name: 'Viernes',
    shortName: 'Vie',
    spanishCalendarWeekdayNumber: 4,
  },
  6: {
    name: 'Sábado',
    shortName: 'Sab',
    spanishCalendarWeekdayNumber: 5,
  },
};

export const days = ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'];
