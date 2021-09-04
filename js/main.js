
// VARIABLES
const usernameInput = document.getElementById('username-input');
const submitBtn = document.querySelector('#submit-btn');

// Object to store user data
let newUser = {
  login: '',
  id: '',
  bio: '',
  blog: '',
  followers: '',
}


// Event listener for button click
submitBtn.addEventListener('click', () => {
  // api call to github
  fetchUser(usernameInput.value).then(userData => {
    // object value assignment
    newUser.login = userData["login"];
    newUser.id = userData["id"];
    newUser.bio = userData["bio"];
    newUser.blog = userData["blog"];
    newUser.followers = userData["followers"];
  });
});




// fetchUser('Jason-Donmoyer').then(userData => {
//   newUser.login = userData["login"];
//   newUser.id = userData["id"];
//   newUser.bio = userData["bio"];
//   newUser.blog = userData["blog"];
//   newUser.followers = userData["followers"];
// });




// Async function to api.github.com
async function fetchUser(username) { 
  const response = await fetch('https://api.github.com/users/' + username); 
  const userData = await response.json(); 
  console.log(userData); 
  return userData; }