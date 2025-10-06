# Integración Convocatorias CAS - Admin a Usuario

## 📋 Descripción

Este sistema conecta la vista de administración de Convocatorias CAS con la vista pública de usuario, permitiendo:

- **Control de fases por documento**: Desde el admin puedes habilitar/deshabilitar cada documento (Bases, Anexos, Postulación, etc.)
- **Vista dinámica**: Los usuarios solo ven los documentos que están habilitados desde el admin
- **Actualización en tiempo real**: Los cambios en el admin se reflejan inmediatamente en la vista pública

## 🔄 Flujo de Funcionamiento

### Admin (ConvocatoriaCAS)
1. Crea una nueva convocatoria
2. Sube documentos (Bases, Anexos, etc.)
3. **Habilita/Deshabilita** cada documento según la fase del proceso
4. Los cambios se guardan en la base de datos

### Usuario (Vista Pública)
1. Ve solo las convocatorias activas (`estado: true`)
2. Ve solo los documentos habilitados (`habilitado: true`)
3. Los documentos se organizan por categorías:
   - **Documentos base**: Bases, Anexos, Postulación
   - **Comunicados**: Comunicado 1, Comunicado 2
   - **Evaluaciones**: Eval. Curricular, Eval. Entrevista, Resultados Finales

## 🚀 Implementación Actual

### ✅ Frontend Completado
- `useConvocatoriasPublicas`: Hook para obtener convocatorias públicas
- `TableConvocatoria`: Componente actualizado para usar datos dinámicos
- `ExpandedRowConvocatoria`: Renderiza solo documentos habilitados
- `obtenerConvocatoriasPublicas`: Servicio con mock data para testing

### 🔧 API Endpoint Requerido

```typescript
// GET /convocatorias/publicas
Response: ConvocatoriaPublica[]

interface ConvocatoriaPublica {
  id: number;
  codigo: string;
  convocatoria: string;
  area: string;
  vacantes: number;
  estado: boolean; // Solo las activas se muestran
  documentos: DocumentoPublico[];
}

interface DocumentoPublico {
  tipo: string; // 'BASES', 'ANEXOS', 'POSTULACION', etc.
  titulo: string;
  habilitado: boolean; // ⭐ CLAVE: Solo los habilitados se muestran
  url: string | null;
  categoria: string; // 'documento', 'enlace', 'comunicado', 'evaluacion'
}
```

## 📂 Archivos Creados/Modificados

### Nuevos Archivos
- `src/core/services/convocatoria/obtenerConvocatoriasPublicas.ts`
- `src/core/hooks/useConvocatoriasPublicas.ts`

### Archivos Modificados
- `src/core/components/common/page/tramites/convocatoria/TableConvocatoria.tsx`
- `src/core/components/common/page/tramites/convocatoria/ExpandedRowConvocatoria.tsx`

## 🔄 Cómo Conectar con Backend Real

1. **Remover mock data** del archivo `obtenerConvocatoriasPublicas.ts`
2. **Implementar endpoint** `/convocatorias/publicas` en tu backend
3. **El endpoint debe**:
   - Filtrar solo convocatorias con `estado: true`
   - Incluir todos los documentos con su estado `habilitado`
   - Retornar la estructura `ConvocatoriaPublica[]`

## 🎯 Ejemplo de Uso

### Escenario: Nueva Convocatoria "Inspector de Transporte"

1. **Admin crea convocatoria** con estado `activo`
2. **Admin sube "Bases"** → Habilita "Bases" ✅
3. **Usuario ve**: Solo "Bases" disponible
4. **Admin sube "Anexos"** → Habilita "Anexos" ✅  
5. **Usuario ve**: "Bases" + "Anexos" disponibles
6. **Admin sube resultados** → Mantiene deshabilitado ❌
7. **Usuario ve**: Solo "Bases" + "Anexos" (resultados no aparecen)

## 🧪 Testing con Mock Data

Actualmente el sistema funciona con datos mock que simulan este comportamiento:
- Convocatoria 001: Tiene Bases, Anexos, Postulación y Evaluación Curricular habilitados
- Convocatoria 002: Solo tiene Bases habilitado

## ⚡ Estado Actual

- ✅ **Frontend listo y funcional**
- ✅ **Mock data para testing**
- ⏳ **Pendiente**: Conectar con API real del backend
- ⏳ **Pendiente**: Configurar invalidación de caché cuando admin hace cambios

¡El sistema está listo para funcionar tan pronto como implementes el endpoint en el backend! 🚀