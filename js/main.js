var entries = [];
google.load("feeds", "1");

function initialize() {
  //guardo en feed el RSS con la direccion indicada
  var feed = new google.feeds.Feed("http://feeds.feedburner.com/futbolecuador/3?format=xml");
  //ponemos un maximo de 25 entradas
  feed.setNumEntries(25);
  //cargamos el RSS con la funcion load
  feed.load(function(result) {
	if (!result.error) {
		//recorremos el rss
	  for (var i = 0; i < result.feed.entries.length; i++) {
		//guardamos la entrada en un arreglo
		entries[i] = result.feed.entries[i];
		//guardamos los datos de la entrada en variables
		titulo =  entries[i].title;
		fecha = new Date(entries[i].publishedDate);
		fecha = fecha.toLocaleDateString();
		contenido = entries[i].contentSnippet;
		
		//agregamos a la lista la entrada
		$('#lista').append('<li><a href="#noticia" entry=' + i + ' class="noticia"><h4>' + titulo + '</h4><p>' + contenido + '</p><p><b>' + fecha + '</b></p></a></li>');
    }
	//refrescamos la lista
	$('#lista').listview('refresh');
	}
  });
}
google.setOnLoadCallback(initialize);

//cargamos el contenido de la noticia en la pagina noticia
$( document ).on( "vclick", ".noticia", function() {
	$("#titulo").html(entries[$(this).attr("entry")].title);
	$("#cuerpo").html(entries[$(this).attr("entry")].content);
	//quitamos los links para que no se salga de la app
	$("#cuerpo a").replaceWith(function() {  return $(this).text(); });
	$("#cuerpo div a").replaceWith(function() {  return "" });
	
});

	