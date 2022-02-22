# Practica 4 - PAT - Exploración de la EIS

Bienvenidos a la pagina web la cual hace uso de 2 FETCH API's para proporcionar informacion sobre la ubicación actual de la estación internacional del espacio (ISS) y que tiempo hace en la ubicación por la que pasa. 


# API's usadas
En esta practica hemos hecho uso de 2 API's: 
- Where ISS at? 
	- Esta API nos proporciona en tiempo real (con limite de una llamada por segundo), la latitud y longitud actual de la ISS. 
- OpenWeatherMap API 
	- Usando los datos de la API anterior, le re-alimentamos estos datos de longitud y longitud para obtener el tiempo que hace en la ubicación por la que esta sobre-pasando dicha estación en tiempo real (con una llamada hecha cada 5 segundos)

## Diseño de la pagina web y archivos

Esto es una pagina web bastante simple con 2 elementos principales. Hemos hecho uso de una plantilla BootStrap para dejar más presentable nuestro proyecto. 
A parte de los que vienen con nuestra plantilla, hemos hecho las modificaciones en CSS, JavaScript y HTML para adaptarla a nuestras necesidades. 

Para la sección del mapa, hicimos uso de la librería Leaflet.js al **igual que OpenStreetMap para poder dibujar el mapa, y colocar los Markers.** 

Para el widget del tiempo, el usuario puede **hacer click sobre la temperatura, para observar la temperatura en Farenheit o en Celsius**, sea cual sea su preferencia. 