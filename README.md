# ***Premileal***: API REST para el Sistema de Fidelización de Clientes :arrows_clockwise:

Repositorio para el desarrollo de una API REST a ser consumida por la aplicación web y la herramienta de Back-Office *Premileal*.

## Paso 1 :one:

Para poder realizar la instalación del API REST para el sistema de Fidelización de Cleinte, se requiere que tenga instalado previamente en su equipo:

> NodeJs

## Paso 2 :two:

Para poder obtener localmente el proyecto y así dar inicio al desarrollo y/o poder realizar pruebas, deberá abrir la consola de comandos y ejecutar los siguientes comandos :
    
> git clone https://github.com/RafaelMendezUCAB/api-premileal.git

> cd api-premileal

> npm i

De esta manera, podrá comenzar a desarrollar en su máquina.

## Paso 3 :three:

Para ejecutar el proyecto, deberá correr el siguiente comando: 

> npm run serve

Con el comando anterior, el proyecto será ejecutado y éste se actualizará automáticamente a medida que vaya haciendo cambios en el código.

Listo ahora puede desarrollar el proyecto en su máquina.

## Base de Datos :floppy_disk:

1. Primero debe abrir el archivo create.sql y compilar el query **CREATE DATABASE PREMILEAL** para crear la base de datos, después abajo del query compilan los querys de crear las tablas.

2. Segundo debe abrir el archivo de functions.sql y compilar las funciones que tiene, para así se pueda crear los Triggers en Postgresql.

3. Tercero se abre el archivo de triggers.sql y compilarlo.

4. Cuarto se abre el archivo de inserts.sql para insertar los datos a la base de datos.

### Borrar los datos insertados en las Tablas 

Para borrar los datos insertados se abre el archivo de deletes.sql y se compila.

### Eliminar Tablas y Base de datos

Se abre el archivo de drops.sql, compila primero los DROPS de las tablas y por último de la Base de Datos.

## Permisos :closed_lock_with_key:

Se requiere de algunas variables de entorno para tener acceso a las distintas funcionalidades que ofrece la aplicación y así poder realizar cambios y/o pruebas. Deberá crear un archivo **.env** en la carpeta base del proyecto. 

Deberá contactar a los desarrolladores para obtener las llaves necesarias para tener acceso completo a todas las funcionalidades.

## Developers :computer:

- Gabriel Tovar 
- Christian Neira
- Rafael Méndez