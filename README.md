# 🚀 Prompt Engineering Framework Generator

Una aplicación web para generar prompts efectivos utilizando 30 frameworks especializados de prompt engineering.

## 🌟 Características

### 🤖 Sistema de Recomendación Inteligente
1. **Análisis de Objetivo**: Escribe tu objetivo y GPT-4 Turbo lo analiza
2. **Selección Inteligente**: El sistema determina el framework más adecuado
3. **Explicación Detallada**: Recibe el por qué se eligió ese framework
4. **Ejemplos Prácticos**: Obtén ejemplos específicos para tu caso
5. **Generación Guiada**: Asistencia paso a paso para crear tu prompt

### 📚 Frameworks Disponibles
1. **RTF** (Role, Task, Format) - Para instrucciones basadas en roles
2. **TAG** (Task, Action, Goal) - Para prompts orientados a objetivos
3. **BAB** (Before, After, Bridge) - Para escenarios de transformación
4. **CARE** (Context, Action, Result, Example) - Para planificación detallada
5. **RISE** (Role, Input, Steps, Expectation) - Para tareas basadas en procesos
6. **PEAS** (Purpose, End-Result, Audience, Style) - Para comunicación efectiva
7. **STAR** (Situation, Task, Action, Result) - Para casos de éxito
8. **QCQA** (Question, Context, Quality, Answer) - Para consultas estructuradas
9. **AIDA** (Attention, Interest, Desire, Action) - Para marketing persuasivo
10. **PARA** (Problem, Approach, Rationale, Action) - Para resolución estructurada
11. **SMART** (Specific, Measurable, Achievable, Relevant, Time-bound) - Para objetivos
12. **ERQ** (Experience, Requirements, Qualifiers) - Para perfiles específicos
13. **CODE** (Context, Objective, Details, Examples) - Para instrucciones claras
14. **PROS** (Perspective, Requirements, Outcome, Scope) - Para proyectos
15. **TEAM** (Task, Environment, Approach, Metrics) - Para trabajo en equipo
16. **IDEA** (Identify, Define, Execute, Assess) - Para solución de problemas
17. **FAST** (Focus, Audience, Scope, Tone) - Para comunicación efectiva
18. **LEAP** (Level, Expectations, Approach, Parameters) - Para planificación
19. **GROW** (Goal, Reality, Options, Way Forward) - Para desarrollo personal
20. **SPIN** (Situation, Problem, Implication, Need) - Para ventas consultivas
21. **DESIGN** (Define, Explore, Scope, Ideate, Guide, Narrow) - Para diseño
22. **VISION** (Visualize, Identify, Structure, Implement, Optimize, Navigate) - Para estrategia
23. **IMPACT** (Intent, Message, Purpose, Audience, Channel, Timing) - Para comunicación
24. **MASTER** (Mission, Approach, Strategy, Tactics, Execution, Review) - Para gestión
25. **POWER** (Problem, Outcome, Why, Execution, Resources) - Para resolución
26. **LOGIC** (Layout, Objective, Guidelines, Implementation, Criteria) - Para desarrollo
27. **SCOPE** (Situation, Core Need, Obstacles, Plan, Evaluation) - Para alcance
28. **FOCUS** (Frame, Objective, Constraints, Understanding, Solution) - Para análisis
29. **EXPERT** (Expertise, Context, Purpose, Execution, Results, Testing) - Para documentación
30. **CLARITY** (Context, Limitations, Approach, Requirements, Implementation, Timeline, Yield) - Para planificación

### 🛠️ Características Técnicas
- **Generación de Prompts**: Creación automática según el framework seleccionado
- **Exportación Flexible**: Opciones para copiar en markdown o texto formateado
- **Contador de Tokens**: Monitorización en tiempo real del uso de tokens
- **Interfaz Responsiva**: Diseño adaptable para cualquier dispositivo
- **Almacenamiento Local**: Guarda tus prompts favoritos
- **Ejemplos Interactivos**: Biblioteca de casos de uso para cada framework

## 🛠️ Tecnologías

- **Backend**: Python 3.9+ con Flask
- **IA**: OpenAI GPT-4 Turbo
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
git clone https://github.com/yourusername/prompt-engineering-frameworks.git
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
### 📚 Descripción de los Componentes

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

## 👥 Autores

- Tu Nombre - [@686f6c61](https://github.com/686f6c61)





