var getUserRepos = function(user) {
    var apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })
}
var userForm = document.querySelector("#user-form")
var nameInput = document.querySelector("#username")
var formSubmitHandler = function(event) {
    event.preventDefault()
    var username = nameInput.value.trim()
    if (username) {
        getUserRepos(username)
        nameInput.value = ""
    }
}
userForm.addEventListener("submit",formSubmitHandler)