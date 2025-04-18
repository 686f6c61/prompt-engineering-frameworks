# 🚀 Prompt engineering framework generator

<div align="center">
  <img src="static/img/Frameworks-Prompt.png" alt="Frameworks Prompt" width="500">
</div>

Una aplicación web para generar prompts efectivos utilizando 47 frameworks especializados de prompt engineering.

## 🌟 Características

### 🤖 Sistema de recomendación inteligente
1. **Análisis de objetivo**: Escribe tu objetivo y el sistema lo analiza automáticamente
2. **Selección inteligente**: El sistema determina el framework más adecuado
3. **Explicación detallada**: Recibe el por qué se eligió ese framework
4. **Ejemplos prácticos**: Obtén ejemplos específicos para tu caso
5. **Generación guiada**: Asistencia paso a paso para crear tu prompt

### ⚡❤️ Generador Bolt/Lovable

<div align="center">
  <img src="static/img/bolt-lovable.png" alt="Generador Bolt/Lovable" width="600">
</div>

1. **Especificaciones detalladas**: Genera documentos completos para desarrollos web en plataformas Bolt/Lovable
2. **Diseño visual preciso**: Incluye paletas de colores, tipografía, espaciado y elementos UI
3. **Interacciones y animaciones**: Define comportamientos exactos para cada elemento interactivo
4. **Arquitectura de contenido**: Establece estructura jerárquica de páginas y secciones
5. **SEO y estrategia**: Incluye palabras clave, meta etiquetas y estructura recomendada
6. **Resultados profesionales**: Se aconseja usar API Key propia para resultados óptimos, aunque también funciona excelentemente con la versión gratuita

### 🧠 Prompts para modelos razonadores

<div align="center">
  <img src="static/img/razonadores.png" alt="Prompts para modelos razonadores" width="600">
</div>

La sección de Razonadores está diseñada para crear prompts extremadamente detallados y estructurados que potencian las capacidades de razonamiento profundo de modelos de lenguaje avanzados como GPT-4o y Gemini.

1. **Análisis detallado de temas**: Proporciona un tema y el sistema generará automáticamente preguntas personalizadas para extraer información crucial
2. **Preguntas de refinamiento**: Responde a preguntas específicas generadas por la IA para clarificar detalles clave sobre tu tema
3. **Prompt ultradetallado**: Obtén un prompt con 15-20 puntos de instrucción (tres veces más completo que un prompt estándar)
4. **Estructura optimizada**: El prompt generado incluye secciones, subsecciones, numeración, viñetas y énfasis (negritas, cursivas)
5. **Criterios de evaluación**: Cada prompt incluye métricas específicas para evaluar la calidad de la respuesta
6. **Razonamiento sistemático**: Diseñado para extraer el razonamiento paso a paso de los modelos más avanzados

El modo Razonador funciona siguiendo estos pasos:
1. Ingresa el tema o problema sobre el que necesitas un análisis profundo
2. El sistema analiza el tema y genera preguntas personalizadas para obtener más contexto
3. Responde a estas preguntas para proporcionar información crucial
4. El sistema genera un prompt ultradetallado optimizado para obtener el mejor razonamiento posible
5. Utiliza este prompt con modelos avanzados para obtener análisis sistemáticos y profundos

Para obtener resultados óptimos se recomienda utilizar una API Key propia configurada para acceder a modelos más potentes como GPT-4o, aunque también funciona con GPT-3.5.

### 🧠 Modelos de IA disponibles
- **GPT-3.5 Turbo (Gratis)**: Disponible para todos los usuarios sin coste
  - Recomendaciones de frameworks básicas
  - Respuestas rápidas
  - Hasta 4096 tokens por consulta
  - Limitado a 10 solicitudes por hora (para uso gratuito)
- **GPT-4o-mini (API Key propia)**: Para usuarios que desean resultados premium
  - Recomendaciones más precisas y detalladas
  - Mayor comprensión del contexto
  - Requiere tu propia API Key de OpenAI
  - Sin límites de uso (depende de tu plan de OpenAI)
  - Configuración simple a través del panel de configuración
  - La API Key nunca se almacena en el servidor, solo en la sesión del navegador

### 📚 Frameworks disponibles

> Todos los frameworks están disponibles como archivos de texto en la carpeta `frameworks/` del repositorio, donde se encuentran detallados con ejemplos y estructuras completas.

| Framework | Componentes | Ideal para |
|-----------|-------------|------------|
| **[RTF](frameworks/RTF-Rol-Tarea-Formato.txt)**   | Role, Task, Format | Generación de contenido estructurado y tareas específicas. |
| **[PARA](frameworks/PARA-Problema-Aproximacion-Razon-Accion.txt)**  | Purpose, Action, Result, Assessment | Planificación y evaluación de proyectos. |
| **[SMART](frameworks/SMART-Especifico-Medible-Alcanzable-Relevante-Temporal.txt)** | Specific, Measurable, Achievable, Relevant, Time‑bound | Definición de objetivos y metas. |
| **[ERQ](frameworks/ERQ-Experiencia-Requisitos-Cualificaciones.txt)**   | Experience, Requirements, Qualifiers | Definición de perfiles y requisitos. |
| **[CODE](frameworks/CODE-Contexto-Objetivo-Detalles-Ejemplos.txt)**  | Context, Objective, Details, Examples | Documentación técnica y guías. |
| **[PROS](frameworks/PROS-Perspectiva-Requisitos-Resultado-Solucion.txt)**  | Perspective, Requirements, Outcome, Scope | Planificación de proyectos. |
| **[TEAM](frameworks/TEAM-Tarea-Entorno-Aproximacion-Metricas.txt)**  | Task, Environment, Approach, Metrics | Trabajo en equipo y colaboración. |
| **[IDEA](frameworks/IDEA-Identificar-Definir-Ejecutar-Analizar.txt)**  | Identify, Define, Execute, Assess | Resolución de problemas. |
| **[CARE](frameworks/CARE-Contexto-Accion-Resultado-Ejemplo.txt)**  | Context, Action, Result, Example | Instrucciones detalladas y aprendizaje. |
| **[RISE](frameworks/RISE-Relevancia-Informacion-Solucion-Evaluacion.txt)**  | Role, Input, Steps, Expectation | Procesos y flujos de trabajo. |
| **[LOGIC](frameworks/LOGIC-Diseno-Objetivo-Directrices-Implementacion-Criterios.txt)** | Layout, Objective, Guidelines, Implementation, Criteria | Desarrollo de sistemas y procesos. |
| **[SCOPE](frameworks/SCOPE-Situacion-Necesidad-Obstaculos-Plan-Evaluacion.txt)** | Situation, Core Need, Obstacles, Plan, Evaluation | Definición y gestión de alcance. |
| **[FOCUS](frameworks/FOCUS-Marco-Objetivo-Restricciones-Comprension-Solucion.txt)** | Frame, Objective, Constraints, Understanding, Solution | Resolución estructurada de problemas. |
| **[CLARITY](frameworks/CLARITY-Contexto-Limitaciones-Aproximacion-Requisitos-Implementacion-Cronograma-Rendimiento.txt)** | Context, Limitations, Approach, Requirements, Implementation, Timeline, Yield | Gestión de proyectos complejos y migraciones. |
| **[EXPERT](frameworks/EXPERT-Experiencia-Contexto-Proposito-Ejecucion-Resultados-Pruebas.txt)** | Expertise, Context, Purpose, Execution, Results, Testing | Proyectos técnicos especializados. |
| **[GUIDE](frameworks/GUIDE-Meta-Usuario-Implementacion-Entrega-Evaluacion.txt)** | Goal, User, Implementation, Delivery, Evaluation | Desarrollo de productos y servicios. |
| **[PATH](frameworks/PATH-Proposito-Aproximacion-Objetivo-Horizonte.txt)**  | Purpose, Approach, Target, Horizon | Planificación estratégica. |
| **[LEARN](frameworks/LEARN-Nivel-Experiencia-Aproximacion-Recursos-SiguientesPasos.txt)** | Level, Experience, Approach, Resources, Next steps | Planes de formación y desarrollo. |
| **[SOLVE](frameworks/SOLVE-Situacion-Opciones-Limitaciones-Verificacion-Ejecucion.txt)** | Situation, Options, Limitations, Verification, Execution | Resolución de problemas complejos. |
| **[PRIME](frameworks/PRIME-Problema-Investigacion-Implementacion-Monitoreo-Evaluacion.txt)** | Problem, Research, Implementation, Monitoring, Evaluation | Proyectos de investigación y desarrollo. |
| **[ADAPT](frameworks/ADAPT-Analisis-Diseno-Aproximacion-Progreso-Pruebas.txt)** | Analysis, Design, Approach, Progress, Testing | Proyectos adaptativos y ágiles. |
| **[BUILD](frameworks/BUILD-LineaBase-Entendimiento-Implementacion-Aprendizaje-Entrega.txt)** | Baseline, Understanding, Implementation, Learning, Delivery | Desarrollo de nuevos productos o servicios. |
| **[CRAFT](frameworks/CRAFT-Contexto-Requisitos-Aproximacion-Funcionalidades-Pruebas.txt)** | Context, Requirements, Approach, Features, Testing | Desarrollo de soluciones a medida. |
| **[SCALE](frameworks/SCALE-Estrategia-Capacidades-Accion-Aprendizaje-Evolucion.txt)** | Strategy, Capabilities, Action, Learning, Evolution | Escalamiento de proyectos y operaciones. |
| **[THINK](frameworks/THINK-Tema-Historia-Insights-SiguientesPasos-Conocimiento.txt)** | Topic, History, Insights, Next steps, Knowledge | Análisis estratégico y toma de decisiones. |
| **[GROW](frameworks/GROW-Meta-Realidad-Opciones-Camino.txt)**  | Goal, Reality, Options, Way Forward | Coaching y desarrollo personal. |
| **[QUEST](frameworks/QUEST-Pregunta-Entendimiento-Exploracion-Solucion-Pruebas.txt)** | Question, Understanding, Exploration, Solution, Testing | Investigación y resolución de problemas. |
| **[DRIVE](frameworks/DRIVE-Direccion-Recursos-Implementacion-Validacion-Evolucion.txt)** | Direction, Resources, Implementation, Validation, Evolution | Gestión de proyectos innovadores. |
| **[SHAPE](frameworks/SHAPE-Situacion-Historia-Analisis-Plan-Ejecucion.txt)** | Situation, History, Analysis, Plan, Execution | Transformación organizacional. |
| **[REACH](frameworks/REACH-Requisitos-Evaluacion-Aproximacion-Completitud-Handover.txt)** | Requirements, Evaluation, Approach, Completion, Handover | Gestión de proyectos end-to-end. |
| **[BLEND](frameworks/BLEND-Base-Aprendizaje-Evolucion-Navegacion-Entrega.txt)** | Baseline, Learning, Evolution, Navigation, Delivery | Proyectos híbridos y metodologías mixtas. |
| **[SPARK](frameworks/SPARK-Estrategia-Planificacion-Accion-Resultados-Conocimiento.txt)** | Strategy, Planning, Action, Results, Knowledge | Iniciativas de innovación. |
| **[PULSE](frameworks/PULSE-Proposito-Entendimiento-Aprendizaje-Estrategia-Evaluacion.txt)** | Purpose, Understanding, Learning, Strategy, Evaluation | Monitoreo y mejora continua. |
| **[FAST](frameworks/FAST-Enfoque-Audiencia-Alcance-Tono.txt)**  | Focus, Audience, Scope, Tone | Documentación técnica y guías de usuario. |
| **[T-A-G](frameworks/TAG-Tarea-Accion-Meta.txt)** | Tarea, Acción, Meta | Proyectos con objetivos medibles y acciones concretas. |
| **[B-A-B](frameworks/BAB-Antes-Despues-Puente.txt)** | Antes, Después, Puente | Mostrar cambios y mejoras con un plan claro. |
| **[P-E-A-S](frameworks/PEAS-Proposito-Resultado-Audiencia-Estilo.txt)** | Propósito, Resultado, Audiencia, Estilo | Estrategias de comunicación y marketing. |
| **[S-T-A-R](frameworks/STAR-Situacion-Tarea-Accion-Resultado.txt)** | Situación, Tarea, Acción, Resultado | Documentar logros y experiencias. |
| **[Q-C-Q-A](frameworks/QCQA-Pregunta-Contexto-Calificacion-Formato.txt)** | Pregunta, Contexto, Calificación, Respuesta | Consultas estructuradas para resolver problemas paso a paso. |
| **[A-I-D-A](frameworks/AIDA-Atencion-Interes-Deseo-Accion.txt)** | Atención, Interés, Deseo, Acción | Marketing persuasivo y creación de campañas. |
| **[L-E-A-P](frameworks/LEAP-Nivel-Expectativas-Aproximacion-Parametros.txt)** | Nivel, Expectativas, Enfoque, Parámetros | Planificación estratégica. |
| **[S-P-I-N](frameworks/SPIN-Situacion-Problema-Implicacion-Necesidad.txt)** | Situación, Problema, Implicación, Necesidad | Ventas consultivas y negociación. |
| **[D-E-S-I-G-N](frameworks/DESIGN-Definir-Explorar-Alcance-Idear-Guiar-Reducir.txt)** | Define, Explore, Scope, Ideate, Guide, Narrow | Procesos de diseño y desarrollo. |
| **[V-I-S-I-O-N](frameworks/VISION-Visualizar-Identificar-Estructurar-Implementar-Optimizar-Navegar.txt)** | Visualize, Identify, Structure, Implement, Optimize, Navigate | Planificación estratégica. |
| **[I-M-P-A-C-T](frameworks/IMPACT-Intencion-Mensaje-Proposito-Audiencia-Canal-Tiempo.txt)** | Intent, Message, Purpose, Audience, Channel, Timing | Estrategias de comunicación. |
| **[M-A-S-T-E-R](frameworks/MASTER-Mision-Aproximacion-Estrategia-Tacticas-Ejecucion-Revision.txt)** | Mission, Approach, Strategy, Tactics, Execution, Review | Gestión de proyectos. |
| **[P-O-W-E-R](frameworks/POWER-Problema-Resultado-PorQue-Ejecucion-Recursos.txt)** | Problem, Outcome, Why, Execution, Resources | Resolución de problemas. |

### 🛠️ Características técnicas
- **Generación de prompts**: Creación automática según el framework seleccionado
- **Exportación flexible**: Opciones para copiar en markdown o texto formateado
- **Contador de tokens**: Monitorización en tiempo real del uso de tokens
- **Sistema de limitación de tasa**: Control de uso para el modelo gratuito (10 solicitudes/hora)
- **Interfaz responsiva**: Diseño adaptable para cualquier dispositivo
- **Selección de modelos**: Opción para usar GPT-3.5 Turbo (gratis) o GPT-4o-mini (con API key propia)
- **Almacenamiento local**: Guarda tus prompts favoritos
- **Ejemplos interactivos**: Biblioteca de casos de uso para cada framework
- **Configuración de privacidad**: Las API Keys nunca se almacenan en el servidor, solo en la sesión del navegador
- **Formulario de contacto**: Sistema de contacto integrado usando Resend para el envío de emails
- **Analítica web**: Seguimiento de uso mediante Google Analytics para mejorar la experiencia

## 🛠️ Tecnologías

- **Backend**: Python 3.9+ con Flask
- **IA**: OpenAI GPT-3.5 Turbo (gratis) o GPT-4o-mini (con API key propia)
- **Frontend**: HTML5, CSS3, JavaScript
- **Estilos**: Bootstrap 5
- **Documentación**: Markdown
- **Despliegue**: Gunicorn

## 📋 Requisitos Previos

- Python 3.9 o superior
- Cuenta de OpenAI con API key
- pip (gestor de paquetes de Python)

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/686f6c61/prompt-engineering-frameworks.git
cd prompt-engineering-frameworks
```
2. Crea y activa un entorno virtual:

```bash
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instala las dependencias:

```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno:

```bash
cp .env.example .env
# Edita .env y añade tu OPENAI_API_KEY
```

5. Ejecuta la aplicación:

```bash
python main.py
```
### 📚 Descripción de los componentes

- **app.py**: Punto de entrada de la aplicación Flask, maneja las rutas y la lógica principal
- **requirements.txt**: Lista de dependencias Python necesarias para el proyecto
- **.env**: Archivo de configuración con variables de entorno sensibles
- **static/**: Directorio para archivos estáticos
  - **css/**: Hojas de estilo personalizadas
  - **js/**: Scripts de JavaScript para la interactividad
    - **main.js**: Funcionalidad principal para los 47 frameworks
    - **bolt_lovable.js**: Lógica específica para el generador Bolt/Lovable
  - **img/**: Recursos gráficos
- **templates/**: Plantillas HTML de Jinja2
  - **base.html**: Plantilla base con estructura común
  - **index.html**: Página principal con los frameworks
  - **bolt_lovable.html**: Interfaz para el generador de especificaciones Bolt/Lovable
  - **como_funciona.html**: Documentación y guía de uso
- **utils/**: Módulos de utilidad
  - **openai_helper.py**: Funciones para interactuar con la API de OpenAI
  - **bolt_lovable_helper.py**: Funciones específicas para generar especificaciones detalladas para Bolt/Lovable
  - **prompt_formatter.py**: Utilidades para formatear los prompts generados
  - **rate_limiter.py**: Control de límites de uso de la API

## 🔧 Configuración

La aplicación utiliza las siguientes variables de entorno:

- `OPENAI_API_KEY`: Tu clave de API de OpenAI
- `FLASK_SECRET_KEY`: Clave secreta para la seguridad de Flask
- `RESEND_API_KEY`: Clave de API de Resend para el envío de correos
- `FLASK_ENV`: Entorno de Flask (development/production)
- `PORT`: Puerto para el servidor (por defecto 8000)

### Configuración del seguimiento analítico

La aplicación incluye por defecto el código de Google Analytics. Si deseas usar tu propio código:

1. Localiza en el archivo `templates/base.html` el siguiente bloque:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BYM5KDT6C6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BYM5KDT6C6');
</script>
```

2. Sustituye el ID `G-BYM5KDT6C6` por tu propio ID de Google Analytics

### Configuración del sistema de contacto

El formulario de contacto utiliza Resend para enviar correos electrónicos:

1. Regístrate en [Resend](https://resend.com) y obtén tu API key
2. Añade tu API key en el archivo `.env`: `RESEND_API_KEY=tu_clave_aqui`
3. Modifica el dominio y dirección de correo en `app.py` si deseas usar tu propio dominio

## 🚀 Uso

1. Accede a la aplicación en `http://localhost:5000`
2. Describe tu objetivo o selecciona un framework
3. Completa los campos según el framework elegido
4. Genera y copia tu prompt optimizado

### 📊 Sistema de limitación de uso (Rate Limiting)

El sistema implementa un control de uso para el modelo gratuito GPT-3.5 Turbo:

- **Límite estándar**: 10 solicitudes por hora por usuario
- **Contador visual**: Muestra las solicitudes restantes en la interfaz
- **Temporizador de reinicio**: Indica cuándo se restablecerá el contador
- **Uso ilimitado**: Disponible al configurar tu propia API Key de OpenAI
- **Almacenamiento en sesión**: El contador se mantiene en la sesión del navegador

Para usar el sistema sin limitaciones:
1. Haz clic en "Cambiar modelo" en la barra superior
2. Selecciona la opción "Usar GPT-4o-mini con mi API Key"
3. Introduce tu API Key de OpenAI
4. Confirma para eliminar las restricciones de uso

<div align="center">
  <img src="static/img/configuracion.png" alt="Pantalla de configuración de API Key" width="600">
</div>

### 👨‍💻 Generador Bolt/Lovable para proyectos web

<div align="center">
  <img src="static/img/bolt-lovable.png" alt="Generador Bolt/Lovable" width="600">
</div>

Para crear especificaciones detalladas de proyectos web:

1. Haz clic en el botón "⚡❤️ Bolt/Lovable" en la barra de navegación
2. Escribe una descripción de tu proyecto web en el campo correspondiente
3. Haz clic en "Recomendar Framework" para obtener una sugerencia basada en tu descripción
4. Completa los campos del framework recomendado con los detalles de tu proyecto
5. Genera el prompt detallado haciendo clic en "Generar Prompt Bolt/Lovable"
6. Copia el resultado en formato Markdown o formateado según tus necesidades

Para obtener resultados óptimos se recomienda utilizar una API Key propia configurada en la sección "Configuración", aunque también se obtienen excelentes resultados con la versión gratuita (GPT-3.5).

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
