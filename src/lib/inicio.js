let Inicio = {
    render: async () => {
        let view = /*html*/ `

<ul class="menu">
    <li>
        <i class="fas fa-user-circle fa-2x"></i>
        <ul>
            <li><button class="cerrar" id="btnLogOut" type="button">Cerrar sesión</button></li>
        </ul>
    </li>
    <i class="fas fa-heart fa-2x"></i>
    <i class="fas fa-shopping-cart fa-2x"></i>
    <i class="fas fa-search fa-2x"></i>
</ul>
<!-- publicaciones -->

<div class="container-post">

    <!--cuadro para publicacion -->

    <div class="row">
        <div class="col s12 m7">
            <div class="card">
                <div class="card-head title"> <i class="fas fa-user-circle fa-3x"></i>
                    <p>Usuario N</p>
                </div>
                <div class="card-image">
                    
                </div>
                <div class="card-content">
                    <textarea id="nombre" name="textarea" rows="40" cols="110">¿Que está pasando?</textarea>
          
                </div>
                <div class="menu card-footer">
                 
                    <button class=" btn btn-info btn-save" id="boton">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- publicacion guardada/impresa -->


     <div class="row">
        <div class="col s12 m7">
            <div class="card">
                <div class="card-head title"> <i class="fas fa-user-circle fa-3x"></i>
                    <p>Usuario N</p>
                </div>
                <div class="card-image">
                    
                </div>
                <div class="card-content">
                    
        <table class="table my-3">
            <thead>
           
            </thead>
            <tbody id="tabla">
            </tbody>
        </table>
          
                </div>
                <div class="menu card-footer">
                 
                   
                </div>
            </div>
        </div>
    </div>

<!-- publicacion-maqueta -->

    <div class="row">
        <div class="col s12 m7">
            <div class="card">
                <div class="card-head title"> <i class="fas fa-user-circle fa-3x"></i>
                    <p>Usuario N</p>
                </div>
                <div class="card-image">
                    <img src="img/novias.png">
                </div>
                <div class="card-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis, massa vitae rhoncus sollicitudin, et fringilla arcu nisi vitae orci.</p>
                </div>
                <div class="menu card-footer"> <i class="fas fa-heart fa-2x"></i>
                    <i class="fas fa-comment fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
</div>

`

        return view
    },
    after_render: async () => {
         // **************** PUBLICANDO POST *****************  
  //Creando una variable para firebase
  const db = firebase.firestore();
  //-------------------------------------------------------------------
  const btnSavePost = document.getElementsByClassName("btn-save")[0];
  
  // **************** GUARDANDO ELEMENTOS EN FIRESTORE *****************
  
  
  const guardar = () => {
    const nombre = document.getElementById("nombre").value;
  
    db.collection("users").add({
      first: nombre,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("nombre").value = "";
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  
  btnSavePost.addEventListener("click", guardar);
  
  
  // **************** MOSTRANDO ARCHIVOS *****************
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";
  //onSnapshot es una agente de cambio, va a estar vigilando y ayuda a que los cambios se muestren en tiempo real
  db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML  += `
                <tr>
                  <td class="my-3">${doc.data().first}</td>
                  <td class="my-6"><button class="btn btn-danger" onclick="eliminar('${doc.id}')" id="btnEliminar">Eliminar</button></td>
                  <td class="my-6"><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}')">Editar</button></td>
                </tr>
        `
    });
  });
  
  // **************** BORRANDO ELEMENTOS *****************
  const eliminar = (id) => {
    db.collection("users").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  };
  
  
  // **************** EDITANDO POST *****************
  const editar = (id, nombre,) => {
    document.getElementById("nombre").value = nombre;
  
    const botonEditar = document.getElementById("editar");
  //wasingtonRef se utiliza para hacer un update
    botonEditar.onclick = () => {
      const washingtonRef = db.collection("users").doc(id);
      // Set the "users" field of  id
      const nombre = document.getElementById("nombre").value;
  
        return washingtonRef.update({
          first: nombre,
  
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            document.getElementById("nombre").value = "";
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    };

        const btnLogOut = document.getElementById("btnLogOut");
        const logOut = () => firebase.auth().signOut();
        const logOutOnClick = (evt) => {
            evt.preventDefault();
            if (firebase.auth().currentUser) {
                logOut()
                    .then(() => {
                        alert('Hasta Pronto');
                        location.hash = '/login';
                    });
            } else {
                location.hash = '/';
            }

        };
        btnLogOut.addEventListener('click', logOutOnClick);
        /**/
    }

}
export default Inicio;