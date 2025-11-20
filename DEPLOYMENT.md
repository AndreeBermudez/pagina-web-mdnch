# Guía de Despliegue a Producción

## 📦 Generar Build de Producción

### 1. Configurar Variables de Entorno
Las variables de entorno ya están configuradas en `.env.production`:
```bash
VITE_API_URL=http://167.99.169.248:8080
VITE_IMAGENES_URL=http://167.99.169.248:8080/imagenes/
VITE_DOCUMENTOS_URL=http://167.99.169.248:8080/documentos/
```

**Para desarrollo local**, usa `.env.local`:
```bash
VITE_API_URL=http://localhost:8080
VITE_IMAGENES_URL=http://localhost:8080/imagenes/
VITE_DOCUMENTOS_URL=http://localhost:8080/documentos/
```

### 2. Crear el Build
```bash
npm run build
```

Este comando:
- ✅ Compila TypeScript
- ✅ Optimiza y minifica el código
- ✅ Genera sourcemaps para debug en producción
- ✅ Separa el código en chunks optimizados
- ✅ Crea la carpeta `dist/` con los archivos listos
- ✅ Usa las variables de `.env.production` automáticamente

### 3. Probar Localmente (Opcional)
Prueba el build de producción en tu máquina:
```bash
npm run preview
```
**Nota:** El preview usará las URLs de producción (VPS)

## 🚀 Despliegue en VPS (DigitalOcean)

### Opción Recomendada: Despliegue en VPS
Tu backend está en: `http://167.99.169.248:8080`

**Pasos para desplegar el frontend en el mismo VPS:**

#### 1. Conectarse al VPS
```bash
ssh root@167.99.169.248
```

#### 2. Instalar Nginx (si no está instalado)
```bash
sudo apt update
sudo apt install nginx -y
```

#### 3. Subir los archivos
Desde tu máquina local, después de hacer el build:
```bash
# Comprimir la carpeta dist
tar -czf dist.tar.gz dist/

# Subir al servidor (reemplaza 'root' con tu usuario)
scp dist.tar.gz root@167.99.169.248:/var/www/
```

#### 4. Configurar Nginx en el VPS
```bash
# En el servidor VPS
cd /var/www/
tar -xzf dist.tar.gz
mv dist frontend

# Crear configuración de Nginx
sudo nano /etc/nginx/sites-available/frontend
```

Pega esta configuración:
```nginx
server {
    listen 80;
    server_name 167.99.169.248;
    
    root /var/www/frontend;
    index index.html;
    
    # Habilitar compresión
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Configurar cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 5. Activar el sitio
```bash
# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 6. Acceder al sitio
Abre tu navegador en: `http://167.99.169.248`

### Alternativas: Hosting Externo

#### Opción 1: Vercel (Gratis)
```bash
npm i -g vercel
vercel
```

#### Opción 2: Netlify (Gratis)
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**Nota:** Si usas Vercel/Netlify, el frontend estará en un dominio diferente al backend (CORS debe estar configurado en Spring Boot)

## 🔍 Configuración de Sourcemaps

Los **sourcemaps** están habilitados en `vite.config.ts`:
- Permiten debug en producción
- Mapean el código minificado al código original
- Útiles para rastrear errores en consola del navegador

Si NO quieres sourcemaps en producción (por seguridad), cambia en `vite.config.ts`:
```ts
sourcemap: false
```

## 📊 Análisis del Bundle (Opcional)

Para ver qué ocupa espacio en tu build:
```bash
npm run build -- --mode analyze
```

## ⚙️ Variables de Entorno

Las variables que empiezan con `VITE_` son accesibles en el código:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🔒 Configuración CORS en Spring Boot

Si despliegas el frontend en un dominio/IP diferente al backend, asegúrate de configurar CORS en tu aplicación Spring Boot:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://167.99.169.248",           // VPS mismo servidor
                    "http://localhost:5173",           // Desarrollo local
                    "https://tu-dominio.com"           // Dominio producción
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 📝 Checklist Pre-Deploy

- [ ] ✅ Variables de entorno configuradas en `.env.production`
- [ ] Backend Spring Boot funcionando en `http://167.99.169.248:8080`
- [ ] CORS configurado en Spring Boot (si aplica)
- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar el build localmente con `npm run preview`
- [ ] Verificar que todas las rutas funcionan
- [ ] Verificar que las imágenes cargan correctamente desde `/imagenes/`
- [ ] Verificar que los documentos se descargan desde `/documentos/`
- [ ] Probar formularios y funcionalidades críticas
- [ ] Verificar login y autenticación
- [ ] Probar roles de usuario (ADMINISTRADOR, IMAGEN, ALCALDIA)

## 🔄 Actualizar el Frontend

Para actualizar después del primer deploy:

```bash
# 1. Hacer los cambios necesarios
# 2. Generar nuevo build
npm run build

# 3. Subir al servidor
tar -czf dist.tar.gz dist/
scp dist.tar.gz root@167.99.169.248:/var/www/

# 4. En el servidor
ssh root@167.99.169.248
cd /var/www/
rm -rf frontend
tar -xzf dist.tar.gz
mv dist frontend
sudo systemctl restart nginx
```
