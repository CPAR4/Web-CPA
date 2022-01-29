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
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>';
    var db = firebase.database();
    var Pulseras = db.ref().child("Pulseras");
         
    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#TablaPulseras').DataTable({
                pageLength : 10,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                data: dataSet,
                columnDefs: [
                    {
                        targets: [0], 
                        visible: false, //ocultamos la columna de ID que es la [0]                        
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar //+ "</button><button class='btn btn-success' data-toggle='tooltip' title='Descargar comprobante'> "+iconoBorrar+"</button></div></div>"
                    }
                ]	   
            });

    Pulseras.on("child_added", datos => {        
    dataSet = [datos.key, datos.child("Nombre").val(), datos.child("Municipio").val(), datos.child("Pulceras_Sol").val(), datos.child("Pulceras_Ven").val(), datos.child("Fecha_Ent").val(), datos.child("Fecha_Dep").val(), datos.child("Periodo").val(),datos.child("Seleccion").val(), datos.child("Notas").val(), /* datos.child("Comprobante") */];
        table.rows.add([dataSet]).draw();
    });
    Pulseras.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("Nombre").val(), datos.child("Municipio").val(), datos.child("Pulceras_Sol").val(), datos.child("Pulceras_Ven").val(), datos.child("Fecha_Ent").val(), datos.child("Fecha_Dep").val(), datos.child("Periodo").val(),datos.child("Seleccion").val(), datos.child("Notas").val(), /* datos.child("Comprobante") */];
        table.row(filaEditada).data(dataSet).draw();
    });
    Pulseras.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });
          
    $('form').submit(function(e){                         
        e.preventDefault();
        let id = $.trim($('#id').val());        
        let Nombre = $.trim($('#Nombre').val());
        let Municipio = $.trim($('#Municipio').val());         
        let Pulceras_Sol = $.trim($('#Pulceras_Sol').val());
        let Pulceras_Ven = $.trim($('#Pulceras_Ven').val());
        let Fecha_Ent = $.trim($('#Fecha_Ent').val());
        let Fecha_Dep = $.trim($('#Fecha_Dep').val()); 
        let Periodo = $.trim($('#Periodo').val()); 
        let Seleccion = $.trim($('#Seleccion').val());
        let Notas = $.trim($('#Notas').val());
       /* let Comprobante = $.trim($('#Comprobante').val()); */                                                         
        let idFirebase = id;        
        if (idFirebase == ''){                      
            idFirebase = Pulseras.push().key;
        };                
        data = {Nombre:Nombre, Municipio:Municipio, Pulceras_Sol:Pulceras_Sol, Pulceras_Ven:Pulceras_Ven, Fecha_Ent:Fecha_Ent, Fecha_Dep:Fecha_Dep,Periodo:Periodo, Seleccion:Seleccion, Notas:Notas, /* Comprobante:Comprobante */ };             
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        Pulseras.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
        $('#id').val('');        
        $('#Nombre').val('');
        $('#Municipio').val('');         
        $('#Pulceras_Sol').val('');
        $('#Pulceras_Ven').val('');
        $('#Fecha_Ent').val('');
        $('#Fecha_Dep').val('');
        $('#Periodo').val('');
        $('#Seleccion').val('');    
        $('#Notas').val('');
       /* $('#Comprobante').val(''); */              
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });        

    $("#TablaPulseras").on("click", ".btnEditar", function() {    
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#TablaPulseras').dataTable().fnGetData($(this).closest('tr'));               
        let id = fila[0];
        console.log(id);
		let Nombre = $(this).closest('tr').find('td:eq(0)').text(); 
        let Municipio = $(this).closest('tr').find('td:eq(1)').text();        
        let Pulceras_Sol = $(this).closest('tr').find('td:eq(2)').text();
        let Pulceras_Ven = $(this).closest('tr').find('td:eq(3)').text();
        let Fecha_Ent = $(this).closest('tr').find('td:eq(4)').text();
        let Fecha_Dep = $(this).closest('tr').find('td:eq(5)').text(); 
        let Seleccion = $(this).closest('tr').find('td:eq(7)').text();
        let Notas = $(this).closest('tr').find('td:eq(8)').text();
       /* let Comprobante = parseInt($(this).closest('tr').find('td:eq(9)').text()); */          
        $('#id').val(id);        
        $('#Nombre').val(Nombre);
        $('#Municipio').val(Municipio);                
        $('#Pulceras_Sol').val(Pulceras_Sol);
        $('#Pulceras_Ven').val(Pulceras_Ven);
        $('#Fecha_Ent').val(Fecha_Ent);     
        $('#Fecha_Dep').val(Fecha_Dep);
        $('#Periodo').val("Enero - Octubre - 2021");
        $('#Seleccion').val(Seleccion);
        $('#Notas').val(Notas);
       /* $('#Comprobante').val(Comprobante); */                          
        $('#modalAltaEdicion').modal('show');
	});  
  
    $("#TablaPulseras").on("click", ".btnBorrar", function() {   
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
            let fila = $('#TablaPulseras').dataTable().fnGetData($(this).closest('tr'));            
            let id = fila[0];            
            db.ref(`productos/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

});
