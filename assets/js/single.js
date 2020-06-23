var issueContainer = document.querySelector('#issues-container')
var limitWarning = document.querySelector("#limit-warning")
var getRepoIssues = function(repo) {
    var apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data)
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            })
        }
        else {alert("There was a problem with your request!")}
    })
};
var displayWarning = function(repo) {
    limitWarning.innerHTML = 
    `To see more than 30 issues, visit <a href="https://github.com/${repo}/issues">https://github.com/${repo}/issues</a>`;
}
var displayIssues = function(issues) {
    if (issues.length < 1) {
        issueContainer.innerHTML = 
        '<div class="list-item"><span>This repo has no open issues!</span></div>';
        return
    }
    issues.forEach(x => {
        var issueE1 = document.createElement('a')
        issueE1.classList = "list-item flex-row justify-space-between align-center"
        issueE1.href = x.html_url
        issueE1.target = '_blank'
        var title = document.createElement('span')
        title.textContent = x.title
        issueE1.appendChild(title)
        var type = document.createElement('span')
        if (x.pull_request) {
            type.textContent = '(Pull Request)'
        }
        else {
            type.textContent = '(Issue)'
        }
        issueE1.appendChild(type)
        issueContainer.appendChild(issueE1)
    });
};