 
 
 
 
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var dataBase = null;   
             
            
        function startDB() {
                
                dataBase = indexedDB.open("baseDeDatos", 1);                                                        	
                                              
                dataBase.onupgradeneeded = function (e) {                    
                    var active = dataBase.result;
                    var object = active.createObjectStore("emails", { keyPath : 'id', autoIncrement : true });
                    object.createIndex('by_email', 'email', { unique : true });
                    object.createIndex('by_nombre', 'nombre', { unique : false });
                    object.createIndex('by_profesion', 'profesion', { unique : false });
                    object.createIndex('by_entidad', 'entidad', { unique : false });
                    object.createIndex('by_direccion', 'direccion', { unique : false });
                    object.createIndex('by_localidad', 'localidad', { unique : false });
                    object.createIndex('by_pais', 'pais', { unique : false });
                    object.createIndex('by_cp', 'cp', { unique : false });
                    object.createIndex('by_telefono', 'telefono', { unique : false });
                    object.createIndex('by_fax', 'fax', { unique : false });
                    object.createIndex('by_blog', 'blog', { unique : false });
                    object.createIndex('by_observaciones', 'observaciones', { unique : false });                    
                };
                                
                dataBase.onsuccess = function (e) {
                    //alert('Database loaded');
                    if (document.getElementById("estadoBD")) document.getElementById("estadoBD").innerHTML = "Base de datos conectada";
                    if (document.getElementById("estadoBD")) loadAll();
                };
                
                dataBase.onerror = function (e) {
                    //alert('Error loading database');
                    //document.getElementById("estadoBD").innerHTML = "Base de datos no conectada";
                };                
        }
        
		function add() {
                
                var form = document.getElementById("entrada");
                var fElements = form.elements;
                
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readwrite");
                var object = data.objectStore("emails");

                var request = object.put({
                    email: fElements["email"].value, 
                    nombre: fElements["nombre"].value,
                    profesion: fElements["profesion"].value,
                    entidad: fElements["entidad"].value,
                    direccion: fElements["direccion"].value,
                    localidad: fElements["localidad"].value,
                    pais: fElements["pais"].value,
                    cp: fElements["cp"].value,
                    telefono: fElements["telefono"].value,
                    fax: fElements["fax"].value,
                    blog: fElements["blog"].value,
                    observaciones: fElements["observaciones"].value
                });

                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };

                data.oncomplete = function (e) {
    				document.getElementById("estadoMensaje").innerHTML = "Mensaje:<br> Se ha añadido correctamente";
    				loadAll();
    				form.reset();
                };
        } 
        
 		function update(id) {	
                                
                deleteCell(id);
                
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readwrite");
                var object = data.objectStore("emails");
                
                var request = object.put({
                    email: document.getElementById("modiemail").value, 
                    nombre: document.getElementById("modinombre").value,
                    profesion: document.getElementById("modiprofesion").value,
                    entidad: document.getElementById("modientidad").value,
                    direccion: document.getElementById("modidireccion").value,
                    localidad: document.getElementById("modilocalidad").value,
                    pais: document.getElementById("modipais").value,
                    cp: document.getElementById("modicp").value,
                    telefono: document.getElementById("moditelefono").value,
                    fax: document.getElementById("modifax").value,
                    blog:document.getElementById("modiblog").value,
                    observaciones: document.getElementById("modiobservaciones").value
                });

                request.onerror = function (e) {
    				document.getElementById("estadoMensaje").innerHTML = "Error al modificar";
                };

                data.oncomplete = function (e) {
    				document.getElementById("estadoMensaje").innerHTML = "Se ha modificado el registro correctamente";
    				updateTableRow(id)
    				deleteTotalDiv();
                };	
        }  
        
        function updateTableRow(id){    				
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readonly");
                var object = data.objectStore("emails");
                var request = object.get(id);
				var result;
                request.onsuccess = function () {
                    result = request.result;
        			document.getElementById("fila"+id).innerHTML="<td>" + "<input type='checkbox'>" + "</td>" +   
                 			       			 "<td>" + result.email + "</td>" +   
                        					 "<td>" + result.nombre + "</td>" +   
                      		  				 "<td>" + result.entidad + "</td>" +   
                       			 			 "<td>" + result.localidad + "</td>" +   
                       			 			 "<td>" + result.pais + "</td>" +   
                        					 "<td>" + result.telefono + "</td>" +   
                    		    			 "<td>" + 
                        					 	"<span onclick='seeOne(" + result.id + ")'>Ver</span> | " + 
                        					 	"<span onclick='deleteCell(" + result.id + ")'>Borrar</span>"
                       			 			 "</td>" +                      
                        					 "</tr>";
                };
        }
               
        function convertToArray(element){
        	var arrayElement = [];             	
        	arrayElement["id"] = element.id;
        	arrayElement["email"] = element.email;
        	arrayElement["nombre"] = element.nombre;
        	arrayElement["profesion"] = element.profesion;
        	arrayElement["entidad"] = element.entidad;
        	arrayElement["direccion"] = element.direccion;
        	arrayElement["localidad"] = element.localidad;
        	arrayElement["pais"] = element.pais;
        	arrayElement["cp"] = element.cp;
        	arrayElement["telefono"] = element.telefono;
        	arrayElement["fax"] = element.fax;
        	arrayElement["blog"] = element.blog;
        	arrayElement["obsevaciones"] = element.obsevaciones;
        	return arrayElement;
        }
        
        function generateTableRow(element){
        	var resultString = "<tr id='fila" + element["id"] + "'>" + 
                    	    		 "<td>" + "<input class='selectedOne' id='" + element["email"] + "' type='checkbox'>" + "</td>" +   
                   		     		 "<td>" + element["email"] + "</td>" +   
                  		      		 "<td>" + element["nombre"] + "</td>" +   
                   		     		 "<td>" + element["entidad"]+ "</td>" +   
                	        		 "<td>" + element["localidad"] + "</td>" +   
               		         		 "<td>" + element["pais"] + "</td>" +   
                	        		 "<td>" + element["telefono"] + "</td>" +   
               		         		 "<td>" + 
                	        		 	"<span onclick='seeOne(" + element["id"] + ")'>Ver</span> | " + 
                	        		 	"<span onclick='deleteCell(" + element["id"] + ")'>Borrar</span>" + 
               		         		 "</td>" +                      
               		         	 "</tr>";   
            return resultString;      
        }
        
       	function loadWithFilter (){
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readonly");
                var object = data.objectStore("emails");

                var elements = [];

                object.openCursor().onsuccess = function (e) {
                    var result = e.target.result;

                    if (result === null) {
                        return;
                    }

                    elements.push(result.value);
                    result.continue();
                };

                document.getElementById("tablaResultados").innerHTML = 
                	"<tr><th></th><th>Email</th><th>Nombre</th><th>Entidad</th><th>Localidad</th><th>País</th><th>Teléfono</th><th>Acciones</th></tr>";  
                
                var campo = document.getElementById("campoFiltro").value;
                var texto = document.getElementById("textoFiltro").value;
                
                document.getElementById("estadoMensaje").innerHTML = "Filtrado por " + campo + " con '" +  texto + "'";
                
                
                data.oncomplete = function () {
                
                    var outerHTML = '';

                    for (var key in elements) {
                        
                        var elementoActual = convertToArray(elements[key]);             
                        
                        if (elementoActual[campo].indexOf(texto) != -1){
                        	var row = generateTableRow(elementoActual);  
                        	outerHTML += row;                    	  
                    	}
                    }
					
                    document.getElementById("tablaResultados").innerHTML += outerHTML;      
                                  
                };                
                document.getElementById("estadoCarga").innerHTML = "Los datos se han cargado";   
        }      
                 
        function loadById(id) {
    				
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readonly");
                var object = data.objectStore("emails");
                var request = object.get(id);

                request.onsuccess = function () {
                    var result = request.result;

                    if (result !== undefined) {                               
                        document.getElementById("modiemail").value = result.email || ""; 
                        document.getElementById("modinombre").value = result.nombre || ""; 
                        document.getElementById("modiprofesion").value = result.profesion || ""; 
                        document.getElementById("modientidad").value = result.entidad || ""; 
                        document.getElementById("modidireccion").value = result.direccion || "";   
                        document.getElementById("modilocalidad").value = result.localidad || "";   
                        document.getElementById("modipais").value = result.pais || "";   
                        document.getElementById("modicp").value = result.cp || "";   
                        document.getElementById("moditelefono").value = result.telefono || "";  
                        document.getElementById("modifax").value = result.fax || "";  
                        document.getElementById("modiobservaciones").innerHTML = result.obsevaciones || "";     
                        document.getElementById("guardarCambios").innerHTML = "<div onclick='update("+id+")'>GUARDAR CAMBIOS</div>";    
                    }
                };
        }
          
      function deleteCell(id){ 
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readwrite");
                var object = data.objectStore("emails");
  			  	
    			var request = object.delete(id);
    			
    			request.onsuccess = function(evt) {
    				document.getElementById("estadoMensaje").innerHTML = "Mensaje:<br> Se ha eliminado correctamente";
    				loadAll();
    			}
      }    
          
      function loadAll() {
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readonly");
                var object = data.objectStore("emails");

                var elements = [];

                object.openCursor().onsuccess = function (e) {
                    var result = e.target.result;

                    if (result === null) {
                        return;
                    }

                    elements.push(result.value);
                    result.continue();
                };

                document.getElementById("tablaResultados").innerHTML = 
                	"<tr><th></th><th>Email</th><th>Nombre</th><th>Entidad</th><th>Localidad</th><th>País</th><th>Teléfono</th><th>Acciones</th></tr>";  
                
                data.oncomplete = function () {                
                    var outerHTML = '';
                    for (var key in elements) {                    	                        
                        var elementoActual = convertToArray(elements[key]);  
                        outerHTML = generateTableRow(elementoActual);          
                    	document.getElementById("tablaResultados").innerHTML += outerHTML;   
                    }                                   
                };                
                document.getElementById("estadoCarga").innerHTML = "Los datos se han cargado";                
        }   
        
        function loadAllInString(divId){
        
                var active = dataBase.result;
                var data = active.transaction(["emails"], "readonly");
                var object = data.objectStore("emails");

                var elements = [];
                
                document.getElementById(divId).innerHTML = "";
                document.getElementById("eliminar").remove();

                object.openCursor().onsuccess = function (e) {
                    var result = e.target.result;

                    if (result === null) {
                        return;
                    }

                    elements.push(result.value);
                    result.continue();
                };

                data.oncomplete = function () {   
                	document.getElementById(divId).innerHTML += "datos = []; ";
                    for (var key in elements) {                    	                        
                        var elementoActual = convertToArray(elements[key]);    
                        document.getElementById(divId).innerHTML += "datos["+key+"] = {";    
                    	for (var field in elementoActual){
                    		if (field != "id"){
            					document.getElementById(divId).innerHTML += field+ ":\""+ (elementoActual[field] || "") + "\",";
            				}
                    	}            	
                    	document.getElementById(divId).innerHTML = document.getElementById(divId).innerHTML.slice(0,-1) + "}; ";
                    }                                
                }; 
        }
        
        
        function deleteTotalDiv(){
        	document.getElementById("totalDiv").style.display = "none";
        	document.getElementById("informacionDiv").style.display = "none";
        }   
        
        function seeOne(id){        
        	document.getElementById("totalDiv").style.display = "block";
        	document.getElementById("informacionDiv").style.display = "block";  
        	loadById(id);
        	totalDiv.addEventListener("click", deleteTotalDiv);   	        									        	
        }
                
        
        function generarRistraEmails(){
        	document.getElementById("ristraEmails").innerHTML = "";
        	var elements = document.getElementsByClassName("selectedOne");	
        	var separador = document.getElementById("separador").value;
   			for (i= 0; i < elements.length; i++) {
   				if (elements[i].checked){
        			document.getElementById("ristraEmails").innerHTML += elements[i].id + separador;  
    			}
    		}         
        }
        
        function marcarTodas(){
        	var elements = document.getElementsByClassName("selectedOne");	
   			for (i= 0; i < elements.length; i++) {
   				elements[i].checked = "true";
    		}  
    	}
        
        
        
        
        
        