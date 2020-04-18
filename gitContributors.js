let userIndex = undefined
const header = document.getElementById('header')
const loadNextUserButton = document.getElementById('loadNextUserButton')
const loadPrevUserButton = document.getElementById('loadPrevUserButton')
const userName = document.getElementById('userName')
const imgAvatar = document.getElementById('imgAvatar')
let gitContributors = undefined

const onClick = (forward, button) => {
    if (gitContributors === undefined) {
        return
    }
    if (userIndex === undefined) {
        userIndex = forward ? 0 : gitContributors.length - 1
    } else {
        if (forward) {
            userIndex = (userIndex + 1) % gitContributors.length
        } else {
            userIndex = (userIndex - 1 + gitContributors.length) % gitContributors.length
        }
    }
    const user = gitContributors[userIndex]
    const nextUser = gitContributors[(userIndex + 1) % gitContributors.length]
    const prevUser = gitContributors[(userIndex - 1 + gitContributors.length) % gitContributors.length]
    loadNextUserButton.innerText = `Next user is ${nextUser.login}`
    loadPrevUserButton.innerText = `Prev user is ${prevUser.login}`
    userName.innerHTML = `Thanks for the contribution <a href="${user.url}">${user.login}</a>`
    imgAvatar.src = user.avatar_url
}

const nextOnClick = () => {
    onClick(true, loadNextUserButton)
}

const prevOnClick = () => {
    onClick(false, loadPrevUserButton)
}

loadNextUserButton.addEventListener('click', nextOnClick)
loadPrevUserButton.addEventListener('click', prevOnClick)

const fetchGitContributors = () => {
    const gitContributorsURL = "https://api.github.com/repos/git/git/contributors"
    fetch(gitContributorsURL)
        .then(r => r.json(), err => {
            console.log(err)
        })
        .then(j => {
            gitContributors = j
            header.innerText = `Shout Out to the ${gitContributors.length} Git Contributors`
            nextOnClick()
        })
}

fetchGitContributors()
