$(document).ready(function() {
        const config = {
        //SDK DE FIREBASE
        apiKey: "AIzaSyC5FKpezxJKDMJx78lPzsn-uUs3kSQYw3A",
  authDomain: "cabello-para-el-alma.firebaseapp.com",
  databaseURL: "https://cabello-para-el-alma-default-rtdb.firebaseio.com",
  projectId: "cabello-para-el-alma",
  storageBucket: "cabello-para-el-alma.appspot.com",
  messagingSenderId: "789533339991",
  appId: "1:789533339991:web:ac16344d48d2764927ce12"
    };    

    firebase.initializeApp(config); //inicializamos firebase
    
    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="0.9em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
    var db = firebase.database();
    var Trenzas = db.ref().child("Trenzas");
         
    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablatrenzas').DataTable({
                pageLength : -1,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                data: dataSet,
                columnDefs: [
                    {
                        targets: [0], 
                        visible: false, //ocultamos la columna de ID que es la [0]                        
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar //+ "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                    }
                ]	   
            });

    Trenzas.on("child_added", datos => {        
        dataSet = [datos.key, datos.child("enlace").val(), datos.child("region").val(), datos.child("telefono").val(), datos.child("municipio").val(), datos.child("estado").val(), datos.child("cantidad").val(), datos.child("fecha_ent").val(), datos.child("enviado").val(),datos.child("guia").val(), datos.child("periodo").val()];
        table.rows.add([dataSet]).draw();
    });
    Trenzas.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("enlace").val(), datos.child("region").val(), datos.child("telefono").val(), datos.child("municipio").val(), datos.child("estado").val(), datos.child("cantidad").val(), datos.child("fecha_ent").val(), datos.child("enviado").val(),datos.child("guia").val(), datos.child("periodo").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    Trenzas.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });
          
    $('form').submit(function(e){                         
        e.preventDefault();
        let id = $.trim($('#id').val());        
        let enlace = $.trim($('#enlace').val());
        let region = $.trim($('#region').val());         
        let telefono = $.trim($('#telefono').val());
        let municipio = $.trim($('#municipio').val());
        let estado = $.trim($('#estado').val());
        let cantidad = $.trim($('#cantidad').val()); 
        let fecha_ent = $.trim($('#fecha_ent').val());
        let enviado = $.trim($('#enviado').val());
        let guia = $.trim($('#guia').val());
        let periodo = $.trim($('#periodo').val());                                                            
        let idFirebase = id;        
        if (idFirebase == ''){                      
            idFirebase = Trenzas.push().key;
        };                
        data = {enlace:enlace, region:region, telefono:telefono, municipio:municipio, estado:estado, cantidad:cantidad, fecha_ent:fecha_ent, enviado:enviado , guia:guia,  periodo:periodo};             
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        Trenzas.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
        $('#id').val('');        
        $('#enlace').val('');
        $('#region').val('4');         
        $('#telefono').val('');
        $('#municipio').val('');
        $('#estado').val('Guanajuato');
        $('#cantidad').val('');
        $('#fecha_ent').val('');
        $('#enviado').val('');
        $('#guia').val('');
        $('#periodo').val('');                     
        $("form").trigger("");
        $('#modalAltaEdicion').modal('show');
    });        

    $("#tablatrenzas").on("click", ".btnEditar", function() {    
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablatrenzas').dataTable().fnGetData($(this).closest('tr'));               
        let id = fila[0];
        console.log(id);
		let enlace = $(this).closest('tr').find('td:eq(0)').text(); 
        let region = $(this).closest('tr').find('td:eq(1)').text();        
        let telefono = parseInt($(this).closest('tr').find('td:eq(2)').text());
        let municipio = parseInt($(this).closest('tr').find('td:eq(3)').text());
        let estado = parseInt($(this).closest('tr').find('td:eq(4)').text());
        let cantidad= parseInt($(this).closest('tr').find('td:eq(5)').text()); 
        let fecha_ent = parseInt($(this).closest('tr').find('td:eq(6)').text());
        let enviado = parseInt($(this).closest('tr').find('td:eq(7)').text());
        let guia = parseInt($(this).closest('tr').find('td:eq(8)').text());
        let periodo = parseInt($(this).closest('tr').find('td:eq(9)').text());                
        $('#id').val(id);        
        $('#enlace').val(enlace);
        $('#region').val("4");                
        $('#telefono').val(telefono);
        $('#municipio').val(municipio);
        $('#estado').val("Guanajuato");     
        $('#cantidad').val(cantidad);
        $('#fecha_ent').val(fecha_ent);
        $('#enviado').val(enviado);
        $('#guia').val(guia);
        $('#periodo').val("ENERO 2021 - OCTUBRE 2021");                        
        $('#modalAltaEdicion').modal('show');
	});  
  
    $("#tablatrenzas").on("click", ".btnBorrar", function() {   
        filaEliminada = $(this);
        Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let fila = $('#tablatrenzas').dataTable().fnGetData($(this).closest('tr'));            
            let id = fila[0];            
            db.ref(`productos/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

});
