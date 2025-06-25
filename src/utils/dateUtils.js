// /**
//  * Formatea la fecha para mostrarla como cabecera en el chat
//  * @param {string} dateString - Fecha en formato ISO
//  * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio", "15 de enero de 2023")
//  */
// export const formatDateHeader = (dateString) => {
//   const date = new Date(dateString);
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   // Comparar fechas sin hora
//   const isToday = date.toDateString() === today.toDateString();
//   const isYesterday = date.toDateString() === yesterday.toDateString();

//   if (isToday) {
//     return 'Hoy';
//   } else if (isYesterday) {
//     return 'Ayer';
//   } else {
//     // Si la fecha es de un año diferente al actual, incluir el año
//     if (date.getFullYear() !== today.getFullYear()) {
//       return date.toLocaleDateString('es-ES', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric' // Incluye el año
//       });
//     } else {
//       // Si es del mismo año pero no hoy ni ayer, no incluir el año
//       return date.toLocaleDateString('es-ES', {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long'
//       });
//     }
//   }
// };

// /**
//  * Agrupa mensajes por fecha y los ordena cronológicamente
//  * @param {Array} messages - Array de mensajes
//  * @returns {Array} - Array de grupos ordenados (más antiguos primero)
//  */
// export const groupMessagesByDate = (messages) => {
//   if (!messages || messages.length === 0) return [];

//   const grouped = {};

//   // 1. Ordenar mensajes por fecha (más antiguos primero)
//   const sortedMessages = [...messages].sort((a, b) => {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });

//   // 2. Agrupar por fecha
//   sortedMessages.forEach(message => {
//     const date = new Date(message.createdAt);
//     // Validar que la fecha sea válida
//     if (isNaN(date.getTime())) return;
//     const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

//     if (!grouped[dateKey]) {
//       grouped[dateKey] = {
//         date: message.createdAt,
//         messages: []
//       };
//     }

//     grouped[dateKey].messages.push(message);
//   });

//   // 3. Ordenar grupos por fecha (más antiguos primero)
//   return Object.values(grouped).sort((a, b) => {
//     return new Date(a.date) - new Date(b.date);
//   });
// };


// /**
//  * Formatea la fecha para mostrarla como cabecera en el chat
//  * @param {string} dateString - Fecha en formato ISO (se asume que es UTC)
//  * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio", "15 de enero de 2023")
//  */
// export const formatDateHeader = (dateString) => {
//   const date = new Date(dateString); // Interpreta la fecha en la zona horaria local del usuario
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   // Asegúrate de que las comparaciones sean solo por día, mes y año en la zona horaria local
//   const isSameDay = (d1, d2) =>
//     d1.getFullYear() === d2.getFullYear() &&
//     d1.getMonth() === d2.getMonth() &&
//     d1.getDate() === d2.getDate();

//   const isToday = isSameDay(date, today);
//   const isYesterday = isSameDay(date, yesterday);

//   if (isToday) {
//     return 'Hoy';
//   } else if (isYesterday) {
//     return 'Ayer';
//   } else {
//     // Si la fecha es de un año diferente al actual, incluir el año
//     if (date.getFullYear() !== today.getFullYear()) {
//       return date.toLocaleDateString('es-ES', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric' // Incluye el año
//       });
//     } else {
//       // Si es del mismo año pero no hoy ni ayer, no incluir el año
//       return date.toLocaleDateString('es-ES', {
//         weekday: 'long', // Para mostrar "Lunes", "Martes", etc.
//         day: 'numeric',
//         month: 'long'
//       });
//     }
//   }
// };

// /**
//  * Agrupa mensajes por fecha (basado en la zona horaria local del usuario) y los ordena cronológicamente
//  * @param {Array} messages - Array de mensajes (se asume que `createdAt` es una fecha ISO en UTC)
//  * @returns {Array} - Array de grupos ordenados (más antiguos primero)
//  */
// export const groupMessagesByDate = (messages) => {
//   if (!messages || messages.length === 0) return [];

//   const grouped = {};

//   // 1. Ordenar mensajes por fecha de creación (más antiguos primero)
//   const sortedMessages = [...messages].sort((a, b) => {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });

//   // 2. Agrupar por fecha local del usuario
//   sortedMessages.forEach(message => {
//     const date = new Date(message.createdAt); // Interpreta la fecha en la zona horaria local del usuario

//     // Validar que la fecha sea válida
//     if (isNaN(date.getTime())) return;

//     // *** CAMBIO CLAVE AQUÍ: Crear la clave de fecha basada en la hora local del usuario ***
//     // Obtiene el año, mes y día de la fecha *localmente*
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses son de 0-11
//     const day = date.getDate().toString().padStart(2, '0');
//     const dateKey = `${year}-${month}-${day}`; // Formato AAAA-MM-DD local

//     if (!grouped[dateKey]) {
//       grouped[dateKey] = {
//         // La fecha para el grupo debería ser la "fecha local" del primer mensaje de ese día
//         // Usamos message.createdAt porque formatDateHeader lo procesará localmente de nuevo.
//         date: message.createdAt,
//         messages: []
//       };
//     }

//     grouped[dateKey].messages.push(message);
//   });

//   // 3. Ordenar grupos por fecha (más antiguos primero)
//   // El .date en cada grupo es el `createdAt` del primer mensaje de ese grupo,
//   // que al pasarlo a `new Date()` se interpretará localmente para la comparación.
//   return Object.values(grouped).sort((a, b) => {
//     return new Date(a.date) - new Date(b.date);
//   });
// };



// src/utils/dateUtils.js
// import { format, isToday, isYesterday, isThisYear } from 'date-fns';
// import { es } from 'date-fns/locale'; // Asegúrate de importar el locale si lo necesitas

// /**
//  * Formatea la fecha para mostrarla como cabecera en el chat
//  * @param {string} dateString - Fecha en formato ISO (se asume que es UTC)
//  * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio", "15 de enero de 2023")
//  */
// export const formatDateHeader = (dateString) => {
//   const date = new Date(dateString); // Interpreta la fecha en la zona horaria local del usuario
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   // Asegúrate de que las comparaciones sean solo por día, mes y año en la zona horaria local
//   const isSameDay = (d1, d2) =>
//     d1.getFullYear() === d2.getFullYear() &&
//     d1.getMonth() === d2.getMonth() &&
//     d1.getDate() === d2.getDate();

//   const isTodayDate = isSameDay(date, today);
//   const isYesterdayDate = isSameDay(date, yesterday);

//   if (isTodayDate) {
//     return 'Hoy';
//   } else if (isYesterdayDate) {
//     return 'Ayer';
//   } else {
//     // Si la fecha es de un año diferente al actual, incluir el año
//     if (date.getFullYear() !== today.getFullYear()) {
//       return date.toLocaleDateString('es-ES', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric' // Incluye el año
//       });
//     } else {
//       // Si es del mismo año pero no hoy ni ayer, no incluir el año
//       return date.toLocaleDateString('es-ES', {
//         weekday: 'long', // Para mostrar "Lunes", "Martes", etc.
//         day: 'numeric',
//         month: 'long'
//       });
//     }
//   }
// };

// /**
//  * Agrupa mensajes por fecha (basado en la zona horaria local del usuario) y los ordena cronológicamente
//  * @param {Array} messages - Array de mensajes (se asume que `createdAt` es una fecha ISO en UTC)
//  * @returns {Array} - Array de grupos ordenados (más antiguos primero)
//  */
// export const groupMessagesByDate = (messages) => {
//   if (!messages || messages.length === 0) return [];

//   const grouped = {};

//   // 1. Ordenar mensajes por fecha de creación (más antiguos primero)
//   const sortedMessages = [...messages].sort((a, b) => {
//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });

//   // 2. Agrupar por fecha local del usuario
//   sortedMessages.forEach(message => {
//     const date = new Date(message.createdAt); // Interpreta la fecha en la zona horaria local del usuario

//     // Validar que la fecha sea válida
//     if (isNaN(date.getTime())) return;

//     // *** CAMBIO CLAVE AQUÍ: Crear la clave de fecha basada en la hora local del usuario ***
//     // Obtiene el año, mes y día de la fecha *localmente*
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses son de 0-11
//     const day = date.getDate().toString().padStart(2, '0');
//     const dateKey = `${year}-${month}-${day}`; // Formato AAAA-MM-DD local

//     if (!grouped[dateKey]) {
//       grouped[dateKey] = {
//         date: message.createdAt, 
//         messages: []
//       };
//     }

//     grouped[dateKey].messages.push(message);
//   });

//   // 3. Ordenar grupos por fecha (más antiguos primero)
//   return Object.values(grouped).sort((a, b) => {
//     return new Date(a.date) - new Date(b.date);
//   });
// };

// /**
//  * Formatea una fecha para mostrar solo la hora con AM/PM (si es del mismo día),
//  * o un formato abreviado si es ayer, hace menos de una semana, o más antiguo.
//  * @param {string} dateString - La fecha en formato ISO.
//  * @returns {string} - La cadena de tiempo o fecha formateada.
//  */
// export const formatMessageTime = (dateString) => {
//   if (!dateString) return '';

//   const date = new Date(dateString); // Interpreta la fecha en la zona horaria local
//   const now = new Date();

//   // Si es hoy, muestra la hora con AM/PM
//   if (isToday(date, { locale: es })) { // Usamos isToday de date-fns para mayor robustez
//     return format(date, 'h:mm a', { locale: es });
//   }

//   // Si fue ayer
//   if (isYesterday(date, { locale: es })) { // Usamos isYesterday de date-fns
//     return 'Ayer';
//   }

//   // Si fue hace menos de 7 días (esta semana)
//   // date-fns handles this better than custom logic
//   if (date > new Date(now.setDate(now.getDate() - 7))) {
//      return format(date, 'EEE', { locale: es }); // Ej: "Lun", "Mar"
//   }

//   // Si es del mismo año, muestra mes y día (Ej: "Mar. 15")
//   if (isThisYear(date, { locale: es })) {
//     return format(date, 'MMM d', { locale: es });
//   }

//   // Si es de otro año, muestra mes, día y año (Ej: "Feb. 15, 2023")
//   return format(date, 'MMM d, yyyy', { locale: es });
// };



// src/utils/dateUtils.js
import { format, isToday, isYesterday, isThisYear } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea la fecha para mostrarla como cabecera en el chat
 * @param {string} dateString - Fecha en formato ISO (se asume que es UTC)
 * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio", "15 de enero de 2023")
 */
export const formatDateHeader = (dateString) => {
  const date = new Date(dateString); // Interpreta la fecha en la zona horaria local del usuario
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Asegúrate de que las comparaciones sean solo por día, mes y año en la zona horaria local
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTodayDate = isSameDay(date, today);
  const isYesterdayDate = isSameDay(date, yesterday);

  if (isTodayDate) {
    return 'Hoy';
  } else if (isYesterdayDate) {
    return 'Ayer';
  } else {
    // Si la fecha es de un año diferente al actual, incluir el año
    if (date.getFullYear() !== today.getFullYear()) {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric' // Incluye el año
      });
    } else {
      // Si es del mismo año pero no hoy ni ayer, no incluir el año
      return date.toLocaleDateString('es-ES', {
        weekday: 'long', // Para mostrar "Lunes", "Martes", etc.
        day: 'numeric',
        month: 'long'
      });
    }
  }
};

/**
 * Agrupa mensajes por fecha (basado en la zona horaria local del usuario) y los ordena cronológicamente
 * @param {Array} messages - Array de mensajes (se asume que `createdAt` es una fecha ISO en UTC)
 * @returns {Array} - Array de grupos ordenados (más antiguos primero)
 */
export const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return [];

  const grouped = {};

  // 1. Ordenar mensajes por fecha de creación (más antiguos primero)
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // 2. Agrupar por fecha local del usuario
  sortedMessages.forEach(message => {
    const date = new Date(message.createdAt); // Interpreta la fecha en la zona horaria local del usuario

    // Validar que la fecha sea válida
    if (isNaN(date.getTime())) return;

    // Crear la clave de fecha basada en la hora local del usuario
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses son de 0-11
    const day = date.getDate().toString().padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`; // Formato AAAA-MM-DD local

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: message.createdAt,
        messages: []
      };
    }

    grouped[dateKey].messages.push(message);
  });

  // 3. Ordenar grupos por fecha (más antiguos primero)
  return Object.values(grouped).sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
};

/**
 * Formatea una fecha para mostrar solo la hora con AM/PM.
 * @param {Date | string} date - La fecha o cadena de fecha.
 * @returns {string} - La hora formateada (ej: "10:30 a. m.").
 */
export const formatTimeOnly = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return format(d, "h:mm 'a. m.'", { locale: es });
};


/**
 * Formatea una fecha para mostrar solo la hora con AM/PM (si es del mismo día),
 * o un formato abreviado si es ayer, hace menos de una semana, o más antiguo.
 * @param {string} dateString - La fecha en formato ISO.
 * @returns {string} - La cadena de tiempo o fecha formateada.
 */
export const formatMessageTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString); // Interpreta la fecha en la zona horaria local
  const now = new Date();

  // Si es hoy, muestra la hora con AM/PM
  if (isToday(date, { locale: es })) { // Usamos isToday de date-fns para mayor robustez
    return formatTimeOnly(date);
  }

  // Si fue ayer
  if (isYesterday(date, { locale: es })) { // Usamos isYesterday de date-fns
    return 'Ayer';
  }

  // Si fue hace menos de 7 días (esta semana)
  // date-fns handles this better than custom logic
  if (date > new Date(now.setDate(now.getDate() - 7))) {
    return format(date, 'EEE', { locale: es }); // Ej: "Lun", "Mar"
  }

  // Si es del mismo año, muestra mes y día (Ej: "Mar. 15")
  if (isThisYear(date, { locale: es })) {
    return format(date, 'MMM d', { locale: es });
  }

  // Si es de otro año, muestra mes, día y año (Ej: "Feb. 15, 2023")
  return format(date, 'MMM d, yyyy', { locale: es });
};


/**
 * Formatea una fecha para mostrar el tiempo relativo (Hoy, Ayer) o abreviado.
 * Es una función más flexible para usar en listas de mensajes o estado de última conexión.
 * @param {string | Date} dateInput - La fecha en formato ISO o un objeto Date.
 * @param {boolean} showTimeForTodayAndYesterday - Si true, incluye la hora para "Hoy" y "Ayer".
 * @returns {string} - La cadena de tiempo o fecha formateada.
 */
export const formatRelativeTime = (dateInput, showTimeForTodayAndYesterday = false) => {
  if (!dateInput) return '';

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const now = new Date();

  // Si es hoy
  if (isToday(date, { locale: es })) {
    return showTimeForTodayAndYesterday ? `hoy a las ${formatTimeOnly(date)}` : 'Hoy';
  }

  // Si fue ayer
  if (isYesterday(date, { locale: es })) {
    return showTimeForTodayAndYesterday ? `ayer a las ${formatTimeOnly(date)}` : 'Ayer';
  }

  // Si fue hace menos de 7 días (esta semana)
  // Nota: `date-fns` `isSameWeek` u `isWithinInterval` con `subDays` sería más preciso para "esta semana".
  // Para simplificar aquí, si es más de 2 días atrás pero menos de 7.
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  if (date > sevenDaysAgo) {
    return format(date, 'EEEE', { locale: es }); // Ej: "Lunes", "Martes" (nombre completo del día)
  }

  // Si es del mismo año
  if (isThisYear(date, { locale: es })) {
    return format(date, 'd MMMM', { locale: es }); // Ej: "15 de marzo"
  }

  // Si es de otro año
  return format(date, 'd MMMM yyyy', { locale: es }); // Ej: "15 de enero 2023"
};

// Exportar las funciones para su uso
// export {
//   formatTimeOnly,
//   formatRelativeTime
// };