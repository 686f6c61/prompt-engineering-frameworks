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

### 🧠 Modelos de IA disponibles
- **GPT-3.5 Turbo (Gratis)**: Disponible para todos los usuarios sin costo
  - Recomendaciones de frameworks básicas
  - Respuestas rápidas
  - Hasta 4096 tokens por consulta
- **GPT-4o-mini (API Key propia)**: Para usuarios que desean resultados premium
  - Recomendaciones más precisas y detalladas
  - Mayor comprensión del contexto
  - Requiere tu propia API Key de OpenAI
  - Configuración simple a través del panel de configuración
  - La API Key nunca se almacena en el servidor, solo en la sesión del navegador

### 📚 Frameworks disponibles

| Framework | Componentes | Ideal para |
|-----------|-------------|------------|
| **RTF**   | Role, Task, Format | Generación de contenido estructurado y tareas específicas. |
| **PARA**  | Purpose, Action, Result, Assessment | Planificación y evaluación de proyectos. |
| **SMART** | Specific, Measurable, Achievable, Relevant, Time‑bound | Definición de objetivos y metas. |
| **ERQ**   | Experience, Requirements, Qualifiers | Definición de perfiles y requisitos. |
| **CODE**  | Context, Objective, Details, Examples | Documentación técnica y guías. |
| **PROS**  | Perspective, Requirements, Outcome, Scope | Planificación de proyectos. |
| **TEAM**  | Task, Environment, Approach, Metrics | Trabajo en equipo y colaboración. |
| **IDEA**  | Identify, Define, Execute, Assess | Resolución de problemas. |
| **CARE**  | Context, Action, Result, Example | Instrucciones detalladas y aprendizaje. |
| **RISE**  | Role, Input, Steps, Expectation | Procesos y flujos de trabajo. |
| **LOGIC** | Layout, Objective, Guidelines, Implementation, Criteria | Desarrollo de sistemas y procesos. |
| **SCOPE** | Situation, Core Need, Obstacles, Plan, Evaluation | Definición y gestión de alcance. |
| **FOCUS** | Frame, Objective, Constraints, Understanding, Solution | Resolución estructurada de problemas. |
| **CLARITY** | Context, Limitations, Approach, Requirements, Implementation, Timeline, Yield | Gestión de proyectos complejos y migraciones. |
| **EXPERT** | Expertise, Context, Purpose, Execution, Results, Testing | Proyectos técnicos especializados. |
| **GUIDE** | Goal, User, Implementation, Delivery, Evaluation | Desarrollo de productos y servicios. |
| **PATH**  | Purpose, Approach, Target, Horizon | Planificación estratégica. |
| **LEARN** | Level, Experience, Approach, Resources, Next steps | Planes de formación y desarrollo. |
| **SOLVE** | Situation, Options, Limitations, Verification, Execution | Resolución de problemas complejos. |
| **PRIME** | Problem, Research, Implementation, Monitoring, Evaluation | Proyectos de investigación y desarrollo. |
| **ADAPT** | Analysis, Design, Approach, Progress, Testing | Proyectos adaptativos y ágiles. |
| **BUILD** | Baseline, Understanding, Implementation, Learning, Delivery | Desarrollo de nuevos productos o servicios. |
| **CRAFT** | Context, Requirements, Approach, Features, Testing | Desarrollo de soluciones a medida. |
| **SCALE** | Strategy, Capabilities, Action, Learning, Evolution | Escalamiento de proyectos y operaciones. |
| **THINK** | Topic, History, Insights, Next steps, Knowledge | Análisis estratégico y toma de decisiones. |
| **GROW**  | Goal, Reality, Options, Way Forward | Coaching y desarrollo personal. |
| **QUEST** | Question, Understanding, Exploration, Solution, Testing | Investigación y resolución de problemas. |
| **DRIVE** | Direction, Resources, Implementation, Validation, Evolution | Gestión de proyectos innovadores. |
| **SHAPE** | Situation, History, Analysis, Plan, Execution | Transformación organizacional. |
| **REACH** | Requirements, Evaluation, Approach, Completion, Handover | Gestión de proyectos end-to-end. |
| **BLEND** | Baseline, Learning, Evolution, Navigation, Delivery | Proyectos híbridos y metodologías mixtas. |
| **SPARK** | Strategy, Planning, Action, Results, Knowledge | Iniciativas de innovación. |
| **PULSE** | Purpose, Understanding, Learning, Strategy, Evaluation | Monitoreo y mejora continua. |
| **FAST**  | Focus, Audience, Scope, Tone | Documentación técnica y guías de usuario. |
| **T-A-G** | Tarea, Acción, Meta | Proyectos con objetivos medibles y acciones concretas. |
| **B-A-B** | Antes, Después, Puente | Mostrar cambios y mejoras con un plan claro. |
| **P-E-A-S** | Propósito, Resultado, Audiencia, Estilo | Estrategias de comunicación y marketing. |
| **S-T-A-R** | Situación, Tarea, Acción, Resultado | Documentar logros y experiencias. |
| **Q-C-Q-A** | Pregunta, Contexto, Calificación, Respuesta | Consultas estructuradas para resolver problemas paso a paso. |
| **A-I-D-A** | Atención, Interés, Deseo, Acción | Marketing persuasivo y creación de campañas. |
| **L-E-A-P** | Nivel, Expectativas, Enfoque, Parámetros | Planificación estratégica. |
| **S-P-I-N** | Situación, Problema, Implicación, Necesidad | Ventas consultivas y negociación. |
| **D-E-S-I-G-N** | Define, Explore, Scope, Ideate, Guide, Narrow | Procesos de diseño y desarrollo. |
| **V-I-S-I-O-N** | Visualize, Identify, Structure, Implement, Optimize, Navigate | Planificación estratégica. |
| **I-M-P-A-C-T** | Intent, Message, Purpose, Audience, Channel, Timing | Estrategias de comunicación. |
| **M-A-S-T-E-R** | Mission, Approach, Strategy, Tactics, Execution, Review | Gestión de proyectos. |
| **P-O-W-E-R** | Problem, Outcome, Why, Execution, Resources | Resolución de problemas. |

### 🛠️ Características técnicas
- **Generación de prompts**: Creación automática según el framework seleccionado
- **Exportación flexible**: Opciones para copiar en markdown o texto formateado
- **Contador de tokens**: Monitorización en tiempo real del uso de tokens
- **Interfaz responsiva**: Diseño adaptable para cualquier dispositivo
- **Selección de modelos**: Opción para usar GPT-3.5 Turbo (gratis) o GPT-4o-mini (con API key propia)
- **Almacenamiento local**: Guarda tus prompts favoritos
- **Ejemplos interactivos**: Biblioteca de casos de uso para cada framework
- **Configuración de privacidad**: Las API Keys nunca se almacenan en el servidor, solo en la sesión del navegador

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
  - **img/**: Recursos gráficos
- **templates/**: Plantillas HTML de Jinja2
  - **base.html**: Plantilla base con estructura común
  - **index.html**: Página principal con los frameworks
  - **como_funciona.html**: Documentación y guía de uso
- **utils/**: Módulos de utilidad
  - **openai_helper.py**: Funciones para interactuar con la API de OpenAI


## 🔧 Configuración

La aplicación utiliza las siguientes variables de entorno:

- `OPENAI_API_KEY`: Tu clave de API de OpenAI
- `FLASK_ENV`: Entorno de Flask (development/production)
- `FLASK_DEBUG`: Modo debug (1/0)

## 🚀 Uso

1. Accede a la aplicación en `http://localhost:5000`
2. Describe tu objetivo o selecciona un framework
3. Completa los campos según el framework elegido
4. Genera y copia tu prompt optimizado

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
