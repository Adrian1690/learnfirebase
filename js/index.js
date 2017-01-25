

/* 
	const firstText = document.querySelector('#firstText');
	const dbRef = firebase.database().ref().child('text');

	dbRef.on('value', snap => firstText.innerText = snap.val());
*/
(function(){
	const txtEmail= document.getElementById('txtEmail');
	const txtPassword= document.getElementById('txtPassword');
	const btnLogin= document.getElementById('btnLogin');
	const btnSignUp= document.getElementById('btnSignUp');
	const btnLogout= document.getElementById('btnLogout');

	// Evento Login
	btnLogin.addEventListener('click', e => {  //Emac6

		//Obtener email y password
		const	email = txtEmail.value;
		const	password = txtPassword.value;
		const	auth = firebase.auth();

		//Sing In 
		const promise = auth.signInWithEmailAndPassword( email,password );
		promise.catch( e => {
			console.log(e.code, e.message);
		});
	});

	//Evento Registrarse
	btnSignUp.addEventListener('click', e => {

		const	email = txtEmail.value;
		const	password = txtPassword.value;
		const	auth = firebase.auth();

		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch( e  => {
			console.log(e.code, e.message);
		});

	});

	// Logouot
	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut();
	});

	// Check Status User
	firebase.auth().onAuthStateChanged( user => {
		if(user){
			console.log(user);
			btnLogout.classList.remove('hide');
			
			window.location = "home.html";
		}else{
			console.log('No logeado');
			//btnLogout.classList.add('hide');
			
			//window.location = "index.html";
		}
	});
}());
