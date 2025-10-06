# NASAproyect — UI/UX Subgrupo

Este repositorio contiene la web pública de apoyo para el desafío "Investigación de Exoplanetas con IA".

Resumen rápido
- `index.html` — plantilla base con estructura, hero, secciones y footer.
- `css/custom.css` — estilos personalizados (paleta, tipografías, accesibilidad).
- `css/bootstrap.min.css` y `js/bootstrap.bundle.min.js` — recursos de Bootstrap incluidos localmente.

Objetivos inmediatos
- Refinar la paleta y tipografías según la identidad del equipo.
- Añadir imágenes y visualizaciones (carpeta `img/`).
- Implementar componentes interactivos para dashboards.

Cómo ejecutar localmente
1. Abrir `index.html` en el navegador (doble clic o "Open with Live Server").

Checklist de UX (rápida)
- Contraste suficiente entre texto y fondo (usar https://contrast-ratio.com/).
- Navegación accesible desde teclado (tab, shift+tab).
- Titulares y CTAs claros y con jerarquía visual.

Ideas para siguiente sprint
- Construir componente de galería de datos con filtros.
- Prototipo de flujo de onboarding para nuevos usuarios.
- Pruebas de usabilidad con 3-5 participantes y recopilación de feedback.

---

## Backend (FastAPI) — Estructura inicial

Se añadió una carpeta `backend/` con un esqueleto mínimo para servir métricas y preparar endpoints futuros.

Estructura:
```
backend/
	app/
		main.py              # Punto de entrada FastAPI
		routers/
			health.py          # /health
			models.py          # /models/metrics (mock)
requirements.txt       # Dependencias backend (en la raíz del repositorio)
```

### Levantar backend localmente

En PowerShell (Windows):
```
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cd NASAproyect/backend
uvicorn app:app --reload --port 8000
```

Abrir: http://127.0.0.1:8000/docs para ver la documentación interactiva.

### Integración front–backend

La sección `#metrics-lab` en `index.html` intenta hacer fetch a `/models/metrics`.
Si sirves el backend en otro puerto (ej: 8000) y la página se abre como `file://`, las peticiones fallarán por CORS/origen. Opciones:

1. Servir el front también desde un servidor (Live Server / simple HTTP):
```
python -m http.server 5500
```
Luego acceder a: http://localhost:5500/index.html

2. Cambiar el fetch para apuntar a URL absoluta (ej: `fetch('http://localhost:8000/models/metrics')`).

### API esperada (resumen futuro)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| /health | GET | Estado del servicio |
| /datasets | GET | Listado de datasets disponibles |
| /features | GET | Features de una curva |
| /predict | POST | Predicción individual |
| /predict/batch | POST | Predicción batch |
| /explain | POST | Explicabilidad (saliencia / SHAP) |
| /models/metrics | GET | Métricas del modelo activo |
| /models/importance | GET | Importancia de variables |
| /jobs/{id} | GET | Estado de tarea asíncrona |

### Roadmap técnico (alto nivel)

Fase 1
- Ingesta básica (sample Kepler) y preprocesado simple.
- Modelo base (XGBoost + RF) con métricas.

Fase 2
- CNN 1D + ensemble (voting).
- SHAP para árboles; saliency para CNN.

Fase 3
- Batch predict + caching.
- Explorador de datasets (paginado).

Fase 4
- Laboratorio (Streamlit) + tuning hiperparámetros.
- WebSocket para progreso de entrenamiento.

Fase 5
- Docker + CI/CD + documentación extendida.
- i18n (ES/EN) y mejoras de accesibilidad.

### Buenas prácticas previstas
- MLflow para versionado y métricas.
- DVC (opcional) para datasets grandes.
- Pruebas unitarias y de integración (pytest) para endpoints críticos.
- Lógica de preprocesamiento modular (reutilizable en training y serving).

### Próximos pasos sugeridos
1. Definir formato estándar de curva de luz para `/predict` (ej: lista de floats y meta JSON).
2. Añadir endpoint real `/models/metrics` consumiendo un archivo JSON versionado.
3. Implementar parse CSV local y vista previa antes de enviar a la API.
4. Agregar placeholder gráfico (canvas/Plotly) para futura curva ROC dinámica.

---

Si quieres que implemente directamente el fetch real con URL configurable, soporte para subida de CSV real o un prototipo del endpoint `/predict`, pídelo y continúo.
