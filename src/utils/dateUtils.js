// export const formatDateHeader = (dateString) => {
//     const date = new Date(dateString);
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     // Comparar fechas sin tener en cuenta la hora
//     const isToday = date.toDateString() === today.toDateString();
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     if (isToday) {
//       return 'Hoy';
//     } else if (isYesterday) {
//       return 'Ayer';
//     } else {
//       return date.toLocaleDateString('es-ES', {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long'
//       });
//     }
//   };

//   export const groupMessagesByDate = (messages) => {
//     if (!messages || messages.length === 0) return [];

//     const grouped = {};

//     messages.forEach(message => {
//       const date = new Date(message.createdAt);
//       // Usamos solo la fecha (sin hora) como clave
//       const dateKey = date.toISOString().split('T')[0];

//       if (!grouped[dateKey]) {
//         grouped[dateKey] = {
//           date: message.createdAt,
//           messages: []
//         };
//       }

//       grouped[dateKey].messages.push(message);
//     });

//     // Convertir el objeto en un array y ordenar por fecha (más reciente primero)
//     return Object.values(grouped).sort((a, b) => {
//       return new Date(b.date) - new Date(a.date);
//     });
//   };

// /**
//  * Formatea la fecha para mostrarla como cabecera en el chat
//  * @param {string} dateString - Fecha en formato ISO
//  * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio")
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
//     return date.toLocaleDateString('es-ES', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long'
//     });
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

/**
 * Formatea la fecha para mostrarla como cabecera en el chat
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada (ej: "Hoy", "Ayer", "Lunes, 5 de junio", "15 de enero de 2023")
 */
export const formatDateHeader = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Comparar fechas sin hora
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return 'Hoy';
  } else if (isYesterday) {
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
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
  }
};

/**
 * Agrupa mensajes por fecha y los ordena cronológicamente
 * @param {Array} messages - Array de mensajes
 * @returns {Array} - Array de grupos ordenados (más antiguos primero)
 */
export const groupMessagesByDate = (messages) => {
  if (!messages || messages.length === 0) return [];

  const grouped = {};

  // 1. Ordenar mensajes por fecha (más antiguos primero)
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // 2. Agrupar por fecha
  sortedMessages.forEach(message => {
    const date = new Date(message.createdAt);
    // Validar que la fecha sea válida
    if (isNaN(date.getTime())) return;
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

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