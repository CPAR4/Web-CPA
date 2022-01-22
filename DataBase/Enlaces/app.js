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
    var CentrosDeAcopio = db.ref().child("Enlaces");
         
    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaenlaces').DataTable({
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

    CentrosDeAcopio.on("child_added", datos => {        
        dataSet = [datos.key, datos.child("Estatus").val(), datos.child("Idper").val(), datos.child("NombreCo").val(), datos.child("CURP").val(), datos.child("Municipio").val(), datos.child("Domicilio").val(), datos.child("Telefono").val(), datos.child("Email").val()];
        table.rows.add([dataSet]).draw();
    });
    CentrosDeAcopio.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("Estatus").val(), datos.child("Idper").val(), datos.child("NombreCo").val(), datos.child("CURP").val(), datos.child("Municipio").val(), datos.child("Domicilio").val(), datos.child("Telefono").val(), datos.child("Email").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    CentrosDeAcopio.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });
          
    $('form').submit(function(e){                         
        e.preventDefault();
        let id = $.trim($('#id').val());        
        let Estatus = $.trim($('#Estatus').val());
        let Idper = $.trim($('#Idper').val());         
        let NombreCo = $.trim($('#NombreCo').val());
        let CURP = $.trim($('#CURP').val());
        let Municipio = $.trim($('#Municipio').val());
        let Domicilio = $.trim($('#Domicilio').val()); 
        let Telefono = $.trim($('#Telefono').val());
        let Email = $.trim($('#Email').val());                                                           
        let idFirebase = id;        
        if (idFirebase == ''){                      
            idFirebase = CentrosDeAcopio.push().key;
        };                
        data = {Estatus:Estatus, Idper:Idper, NombreCo:NombreCo, CURP:CURP, Municipio:Municipio, Domicilio:Domicilio, Telefono:Telefono, Email:Email};             
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        CentrosDeAcopio.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
        $('#id').val('');        
        $('#Estatus').val('');
        $('#Idper').val('');         
        $('#NombreCo').val('');
        $('#CURP').val('');
        $('#Municipio').val('');
        $('#Domicilio').val('');
        $('#Telefono').val('');  
        $('#Email').val('');                   
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });        

    $("#tablaenlaces").on("click", ".btnEditar", function() {    
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaenlaces').dataTable().fnGetData($(this).closest('tr'));               
        let id = fila[0];
        console.log(id);
		let Estatus = $(this).closest('tr').find('td:eq(0)').text(); 
        let Idper = $(this).closest('tr').find('td:eq(1)').text();        
        let NombreCo = parseInt($(this).closest('tr').find('td:eq(2)').text());
        let CURP = parseInt($(this).closest('tr').find('td:eq(3)').text());
        let Municipio = parseInt($(this).closest('tr').find('td:eq(4)').text());
        let Domicilio = parseInt($(this).closest('tr').find('td:eq(5)').text()); 
        let Telefono = parseInt($(this).closest('tr').find('td:eq(6)').text());
        let Email = parseInt($(this).closest('tr').find('td:eq(7)').text());                        
        $('#id').val(id);        
        $('#Estatus').val(Estatus);
        $('#Idper').val(Idper);                
        $('#NombreCo').val(NombreCo);
        $('#CURP').val(CURP);
        $('#Municipio').val(Municipio);     
        $('#Domicilio').val(Domicilio);
        $('#Telefono').val(Telefono); 
        $('#Email').val(Email);                       
        $('#modalAltaEdicion').modal('show');
	});  
  
    $("#tablaenlaces").on("click", ".btnBorrar", function() {   
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
            let fila = $('#tablaenlaces').dataTable().fnGetData($(this).closest('tr'));            
            let id = fila[0];            
            db.ref(`productos/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

});
