
(function(){
	
	// ================================= habilities ============================
	const preObjeto = document.getElementById('objeto');
	const ulList = document.getElementById('lista');
	const txtHabilidad = document.getElementById('txtHabilidad');
	const insertHabilidad = document.getElementById('insertHabilidad');
	// Crear Referencia Db
	const dbRefObject = firebase.database().ref().child('objeto');
	const dbRefList = dbRefObject.child('habilidades');

	// Sync cambios objeto
	dbRefObject.on( 'value', snap => {
		preObjeto.innerText = JSON.stringify(snap.val(),null, 3);
	});

	// insert new hability
	insertHabilidad.addEventListener('click', e => {
		//console.log(txtHabilidad.value);
		var update = {}
		const key = txtHabilidad.value;
		const data = {};
		//const newKey =  dbRefList.push().key;
		data[key] = key;
		console.log( JSON.stringify( data,null,3)) ;
		//update[newKey] = data;
		dbRefList.update( data );
	});

	// update hability
	/*
		insertHabilidad.addEventListener('click', e => {
		console.log(txtHabilidad.value);
		dbRefList.child('mongo').set( txtHabilidad.value );
	});
	*/

	//Sync cambios lista
	dbRefList.on('child_added', snap => {
		const li = document.createElement('li');
		const button  = document.createElement('button');
		
		button.className = 'glyphicon glyphicon-remove';
		button.id = snap.key;

		li.innerText = snap.val();
		li.id = snap.key;
		li.appendChild(button);

		ulList.appendChild(li);	
	});

	// delete hability
	$('body').on('click', '.glyphicon.glyphicon-remove', function ()  {
		let idHability = this.id;
		dbRefList.child(idHability).remove();
	});

	//Sync childs changed
	dbRefList.on('child_changed', snap => {
		const liChanged = document.getElementById(snap.key);
		const button  = document.createElement('button');
		
		button.className = 'glyphicon glyphicon-remove';
		button.id = snap.key;

		liChanged.innerText = snap.val();
		liChanged.appendChild(button);
	});

	//sync childs removed
	dbRefList.on('child_removed', snap => {
		const liToRemove = document.getElementById(snap.key);
		liToRemove.remove();
	});

	// ================================= End habilities ============================
	
	// ======================== Upload File ======================
	
	const uploader = document.getElementById('uploader'); 	
	const fileButton = document.getElementById('fileButton'); 	

	fileButton.addEventListener('change', e => {

		//Get file
		let file = e.target.files[0];

		// Set ref to firebase
		let storageRef = firebase.storage().ref('mis_fotos/' + file.name)

		//upload file
		let task = storageRef.put(file);

		// update progressbar
		task.on('state_changed', 

			function progress(snap) {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				uploader.value = percentage;
			},
			function error(e){

			},
			function complete(){

			}
		);

	});
	// ======================== End Upload File ==================
	
	//  =========================== Logouot =======================
	const btnLogout= document.getElementById('btnLogout');

	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	// Check Status User
	firebase.auth().onAuthStateChanged( user => {
		if( !user ) {
			window.location = "index.html";
		}
	});
	// ============================ End Logouot ============================
}());
