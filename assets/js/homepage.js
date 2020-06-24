var userForm = document.querySelector("#user-form");
var nameInput = document.querySelector("#username");
var repoContainer = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function(user) {
    var apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
            displayRepos(data,user)
        })}
        else {
            repoContainer.textContent = 'User not found.'
        }
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub")
    })
};
var displayRepos = function(repos,searchTerm) {
    if (repos.lenght < 1) {
        repoContainer.textContent = 'No repositories found.'
        return
    }
    repoContainer.textContent = ''
    repoSearchTerm.textContent = searchTerm
    repos.forEach( x => {
        var repoName = x.owner.login + '/' + x.name
        var repo = document.createElement('a')
        repo.classList = 'list-item flex-row justify-space-between align-center'
        repo.href = `./single-repo.html?repo=${repoName}`
        var title = document.createElement('span')
        title.textContent = repoName
        repo.appendChild(title)
        var status = document.createElement('span')
        status.classList = 'flex-row align-center'
        if (x.open_issues_count > 0){
            status.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + x.open_issues_count + " issue(s)"
        }
        else {
            status.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repo.appendChild(status)
        repoContainer.appendChild(repo)
    });
};
var formSubmitHandler = function(event) {
    event.preventDefault()
    var username = nameInput.value.trim()
    if (username) {
        getUserRepos(username)
        nameInput.value = ""
    }
};
userForm.addEventListener("submit",formSubmitHandler);