# =============================================
# Etapa de construcción
# =============================================

# Usar imagen de node
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# =============================================
# Etapa de producción
# =============================================

# Usar imagen de nginx
FROM nginx:alpine

# Crear usuario y grupo no-root
RUN addgroup -S nginxuser && adduser -S nginxuser -G nginxuser

# Copiar archivos estáticos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Cambiar permisos para el usuario no-root
RUN chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    chown -R nginxuser:nginxuser /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

# Establecer usuario no-root
USER nginxuser

# Exponer puerto
EXPOSE 80