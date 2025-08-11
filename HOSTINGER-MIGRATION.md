# 🚀 Guía de Migración a Hostinger - AtapuercaNet

## 📋 Resumen de archivos preparados

### **Archivos de configuración:**
- ✅ `.htaccess` - Configuración de servidor web
- ✅ `deploy-hostinger.sh` - Script de deployment automático
- ✅ `setup-database.sql` - Script para crear BD en MySQL
- ✅ `config/database.php` - Configuración de conexión BD
- ✅ `api/query.php` - Endpoint para consultas SQL

## 🎯 Estrategia de migración

### **Opción A: Solo archivos estáticos (Recomendado para empezar)**
1. **Mantener sistema actual** (SQL.js en el navegador)
2. **Solo subir archivos web** a Hostinger
3. **Sin base de datos** en servidor

### **Opción B: Base de datos real en MySQL**
1. **Crear base de datos** en Hostinger
2. **Importar datos** usando `setup-database.sql`
3. **Modificar JavaScript** para usar API PHP

## 📥 Pasos para Opción A (Más simple)

### 1. **En Hostinger:**
```bash
# Subir estos archivos a public_html/:
- index.html
- retos.html
- sql.html
- contacto.html
- descargas.html
- css/estilos.css
- js/main.js
- js/retos.js
- docs/AtapuercaNet_Retos_Completos.pdf
- .htaccess
```

### 2. **Configurar dominio:**
- Apuntar tu dominio a Hostinger
- Configurar SSL (automático en Hostinger)

### 3. **Listo! 🎉**
Tu sitio funcionará igual que en GitHub Pages pero en tu dominio.

## 📊 Pasos para Opción B (Base de datos real)

### 1. **Crear base de datos en Hostinger:**
- Panel de control → Bases de datos MySQL
- Crear nueva base de datos: `atapuerca_net`
- Anotar: usuario, contraseña, host

### 2. **Importar datos:**
```bash
# En phpMyAdmin de Hostinger:
1. Seleccionar tu base de datos
2. Ir a "Importar"
3. Subir setup-database.sql
4. Ejecutar
```

### 3. **Configurar PHP:**
```bash
# Subir a public_html/:
- config/database.php (editar credenciales)
- api/query.php
```

### 4. **Modificar JavaScript:**
```javascript
// En js/main.js, cambiar el sistema de BD:
const USE_REAL_DATABASE = true; // Cambiar a true
const API_ENDPOINT = 'https://tu-dominio.com/api/query.php';
```

## 🔧 Configuración necesaria

### **1. Editar `deploy-hostinger.sh`:**
```bash
# Líneas 12-14:
HOSTINGER_USER="tu_usuario_ftp"
HOSTINGER_HOST="ftp.tu-dominio.com"  
REMOTE_PATH="/public_html/"
```

### **2. Editar `config/database.php` (solo Opción B):**
```php
// Líneas 6-9:
private $host = 'localhost';
private $dbname = 'tu_usuario_atapuerca';
private $username = 'tu_usuario';
private $password = 'tu_password';
```

## 🚀 Ejecución del deployment

### **Automático:**
```bash
./deploy-hostinger.sh
```

### **Manual:**
1. Ejecutar: `git pull origin main`
2. Copiar archivos necesarios
3. Subir via FTP a Hostinger

## 🔄 Flujo de trabajo continuo

### **GitHub (Desarrollo):**
- Hacer cambios y commits
- Push a GitHub
- GitHub Pages sigue funcionando

### **Hostinger (Producción):**
- Ejecutar `deploy-hostinger.sh`
- O subir manualmente archivos cambidos

## 📞 Soporte

Si tienes problemas:
1. **Verificar** que todos los archivos se subieron
2. **Revisar** logs de error en panel Hostinger
3. **Comprobar** configuración de base de datos (Opción B)

## ✅ Lista de verificación

- [ ] Cuenta Hostinger configurada
- [ ] Dominio apuntando a Hostinger
- [ ] Archivos subidos a public_html/
- [ ] SSL funcionando
- [ ] Base de datos creada (Opción B)
- [ ] Credenciales PHP configuradas (Opción B)
- [ ] Sitio web funcionando correctamente

---

**¡GitHub sigue siendo tu repositorio principal!** Hostinger es solo el hosting de producción.
