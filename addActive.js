var ref = new Firebase('https://e-picks-purdue.firebaseio.com/');
ref.authWithPassword({
   "email": "user3@example.com",
   "password": "Epicks123"
}, function() {if(error){} else {}});

ref.on('child_added', function(snapshot) {
  snapshot.update({active: 1})
});