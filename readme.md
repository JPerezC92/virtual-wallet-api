# Administración de presupuesto personal

Esta es una solución para el reto Full Stack de Alkemy.

## Relacionado

El proyecto esta dividido en 2 repositorios

- [Frontend](https://github.com/JPerezC92/challenge-full-stack-alkemy-frontend)
- [Backend](https://github.com/JPerezC92/challenge-full-stack-alkemy-backend)

## Variables de entorno

Para iniciar este proyecto, tendras que añadir las siguientes variables de entorno a tu archivo .env

`PORT`

### DATABASE

`DATABASE_HOST`

`DATABASE_PORT`

`DATABASE_USERNAME`

`DATABASE_PASSWORD`

`DATABASE_NAME`

### Tokens secrets

`JWT_ACCESSS_TOKEN_SECRET`

`JWT_REFRESH_TOKEN_SECRET`

## Como iniciar el proyecto

Clonar el proyecto

```bash
  git clone https://github.com/JPerezC92/challenge-full-stack-alkemy-backend.git
```

Ir al directorio del proyecto

```bash
  cd challenge-full-stack-alkemy-backend
```

Instalar las dependencias

```bash
  npm install
```

Iniciar la aplicación

```bash
  npm run dev
```

## Requerimientos

- Deberás desarrollar una API en Node.js junto a cualquiera de los siguientes frameworks, en sus versiones estables:

  - Express
  - Adonis
  - Koa

- En el caso de querer utilizar otro framework es posible, pero debe consultarse con anterioridad.

- Los datos mostrados deben ser persistidos en una base de datos relacional. El esquema de
  datos puede armarse según se considere apropiado en base a los requerimientos del
  negocio. La API deberá exponer URLS que devuelvan datos en JSON.

- Estos datos en JSON deberán ser consumidos por un cliente, a través de peticiones AJAX.
- El cliente puede ser armado con React.js.
- El trabajo realizado se subirá a un repositorio.

- Esta es un tipo de aplicación con la que podemos practicar diseños de UI más elaborados. Intenta hacerla bonita y con animaciones!

## Secciones

### Home

- La pantalla de inicio deberá mostrar el balance actual, es decir, el resultante de los ingresos y egresos de dinero cargados, y un listado de los últimos 10 registrados.

### ABM de operaciones (ingresos y egresos)

- La aplicación deberá contener:
  - Formulario de registro de operación. El mismo deberá contener:
    - Concepto
    - Monto
    - Fecha
    - Tipo (ingreso o egreso)
  - Listado de operaciones registradas según su tipo (ingreso o egreso).
  - Desde el listado, se debe poder modificar o eliminar una operación registrada previamente. No debe ser posible modificar el tipo de operación (ingreso o egreso) una vez creada.

## Bonus

### Autenticación de usuarios

Agregar un formulario de registro y login para permitir identificar al usuario que utiliza la
aplicación, y vincular las operaciones registradas al usuario autenticado en el sistema,
tanto para el listado y creación de nuevos registros. Los datos indispensables para permitir
el ingreso deben ser un email y contraseña, pudiendo agregar los que se deseen.
