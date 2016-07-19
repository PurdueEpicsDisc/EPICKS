var myDataRef = new Firebase('https://e-picks-purdue.firebaseio.com/');
myDataRef.authWithPassword({
   "email": "user3@example.com",
   "password": "Epicks123"
}, authHandler() {if(error)}/*, {remember: "sessionOnly"}*/);

myDataRef.on('child_added', function(snapshot) {
  
});