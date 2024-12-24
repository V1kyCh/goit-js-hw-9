// 1
const inputTaskEl = document.querySelector('#new-task')
const addTaskBtn = document.querySelector('#add-task')
const listEl = document.querySelector('#task-list')

Object.keys(localStorage).forEach((key) => {
    if (key.includes('itemInfo')) {
        const JSONInfoObject = JSON.parse(localStorage.getItem(key))

        const li = document.createElement('li');
        const text = document.createElement('p')
        const checkbox = document.createElement('input')
        const deleteTaskBtn = document.createElement('button')
        const div = document.createElement('div')
        div.append(checkbox, text)
        li.append(div, deleteTaskBtn)
        listEl.append(li)

        text.textContent = JSONInfoObject.exercise
        li.classList.add(key)

        checkbox.type = 'checkbox'
        checkbox.checked = JSONInfoObject.doOrNot
        checkbox.addEventListener('change', () => {
            JSONInfoObject.doOrNot = checkbox.checked
            localStorage.setItem(key, JSON.stringify(JSONInfoObject))
        })

        deleteTaskBtn.type = 'button'
        deleteTaskBtn.textContent = 'Bидалити'
        deleteTaskBtn.addEventListener('click', () => {
            localStorage.removeItem(deleteTaskBtn.parentElement.classList.value)
            deleteTaskBtn.parentElement.remove()
        })
    }
})

let timer = Object.keys(localStorage).length;
addTaskBtn.addEventListener('click', () => {
    if (inputTaskEl.value !== '') {

        const li = document.createElement('li');
        const text = document.createElement('p')
        const checkbox = document.createElement('input')
        const deleteTaskBtn = document.createElement('button')
        const div = document.createElement('div')
        div.append(checkbox, text)
        li.append(div, deleteTaskBtn)
        listEl.append(li)

        const itemArr = {
            exercise: inputTaskEl.value,
            doOrNot: checkbox.checked
        }

        text.textContent = inputTaskEl.value

        checkbox.type = 'checkbox'
        checkbox.addEventListener('change', () => {
            const itemArrChange = {
                exercise: itemArr.exercise,
                doOrNot: checkbox.checked
            }
            localStorage.setItem(nameItemLC, JSON.stringify(itemArrChange))
        })

        const nameItemLC = 'itemInfo' + timer++
        localStorage.setItem(nameItemLC, JSON.stringify(itemArr))

        li.classList.add(nameItemLC)

        deleteTaskBtn.type = 'button'
        deleteTaskBtn.textContent = 'Bидалити'
        deleteTaskBtn.addEventListener('click', () => {
            localStorage.removeItem(nameItemLC)
            deleteTaskBtn.parentElement.remove()
        })
        inputTaskEl.value = ''
    }
})

// 2

const formInfo = document.querySelector('.form-info')
const inputLogin = document.querySelector('.input-login')
const inputPassword = document.querySelector('.input-password')
const buttonInfo = document.querySelector('.button-info')
const resultText = document.querySelector('.text-info')


formInfo.addEventListener('submit', (e) => {
    if (inputLogin.value !== '' && inputPassword.value !== '') {
        e.preventDefault()
        Object.values(localStorage).map((el) => {
            if (JSON.parse(el).login !== undefined) {
                if (JSON.parse(el).login === inputLogin.value && JSON.parse(el).password === inputPassword.value) {
                    resultText.textContent = 'Ви вже є в програмі!'
                }
            }
        })
        const nameUserLC = 'UserInfo'
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        localStorage.setItem(nameUserLC, JSON.stringify(user))
        inputLogin.value = ''
        inputPassword.value = ''
    }
})

// 3

const bookmarksList = document.querySelector('.bookmarks')
const bookmarksInput = document.querySelector('.bookmark-input-link')
const btnAddBootmark = document.querySelector('.btn-add-bookmark')

Object.keys(localStorage).forEach((key) => {
    if (key.includes('bookmarkInfoLink')) {
        const JSONInfoObject = JSON.parse(localStorage.getItem(key))

        const liEl = document.createElement('li')
        const linkEl = document.createElement('a')
        const btnEdit = document.createElement('button')
        const btnDelete = document.createElement('button')
        const containerEl = document.createElement('div')

        containerEl.append(btnEdit, btnDelete)
        liEl.append(linkEl, containerEl)
        bookmarksList.append(liEl)

        linkEl.textContent = JSONInfoObject
        linkEl.href = JSONInfoObject

        btnEdit.textContent = 'Редагувати'
        btnDelete.textContent = 'Видалити'


        btnEdit.addEventListener('click', () => {
            linkEl.textContent = ''
            const editLink = document.createElement('input')
            editLink.placeholder = 'Ведіть відреагований лінк'
            editLink.classList.add('edited-link')
            liEl.append(editLink)
            editLink.addEventListener('change', () => {
                linkEl.textContent = editLink.value
                localStorage.setItem(key, JSON.stringify(editLink.value))
                console.log(key)
                editLink.remove()
            })
        })
        btnDelete.addEventListener('click', () => {
            localStorage.removeItem(key)
            btnDelete.parentElement.parentElement.remove()
        })
        liEl.classList.add(key)
    }
})

btnAddBootmark.addEventListener('click', () => {
    if (bookmarksInput.value.includes('https:')) {
        const liEl = document.createElement('li')
        const linkEl = document.createElement('a')
        const btnEdit = document.createElement('button')
        const btnDelete = document.createElement('button')
        const containerEl = document.createElement('div')

        containerEl.append(btnEdit, btnDelete)
        liEl.append(linkEl, containerEl)
        bookmarksList.append(liEl)

        linkEl.textContent = bookmarksInput.value
        linkEl.href = bookmarksInput.value

        btnEdit.textContent = 'Редагувати'
        btnDelete.textContent = 'Видалити'

        const nameLc = 'bookmarkInfoLink' + timer++
        localStorage.setItem(nameLc, JSON.stringify(bookmarksInput.value))


        btnEdit.addEventListener('click', () => {
            linkEl.textContent = ''
            const editLink = document.createElement('input')
            editLink.placeholder = 'Ведіть відреагований лінк'
            liEl.append(editLink)
            editLink.classList.add('edited-link')
            editLink.addEventListener('change', () => {
                linkEl.textContent = editLink.value
                localStorage.setItem(nameLc, JSON.stringify(editLink.value))
                editLink.remove()
            })
        })

        btnDelete.addEventListener('click', () => {
            localStorage.removeItem(nameLc)
            btnDelete.parentElement.parentElement.remove()
        })
        liEl.classList.add(nameLc)
    }
    bookmarksInput.value = ''

})

// 4

const formUserInfo = document.querySelector('.form-user-info')
const userName = document.querySelector('.form-name-input')
const userSurname = document.querySelector('.form-surname-input')
const userEmail = document.querySelector('.form-email-input')
const clearBtn = document.querySelector('.button-clear')

if (localStorage.getItem('userData') !== null) {
    const JsonInfoUser = JSON.parse(localStorage.getItem('userData'))
    document.querySelector('.name').textContent = `імʼя: ${JsonInfoUser.name}`
    document.querySelector('.surname').textContent = `прізвище: ${JsonInfoUser.surname}`
    document.querySelector('.email').textContent = `емейл: ${JsonInfoUser.email}`
    userName.value = JsonInfoUser.name
    userSurname.value =JsonInfoUser.surname
    userEmail.value = JsonInfoUser.email
}

formUserInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    let user = {
        name: userName.value,
        surname: userSurname.value,
        email: userEmail.value
    }
    localStorage.setItem('userData', JSON.stringify(user))
    document.querySelector('.name').textContent = `імʼя: ${userName.value}`
    document.querySelector('.surname').textContent = `прізвище: ${userSurname.value}`
    document.querySelector('.email').textContent = `емейл: ${userEmail.value}`
    const UserObjLc = JSON.parse(localStorage.getItem('userData'))

    const editInfo = (variableName, QSName, ukrName, whereToSour) => {
        variableName.addEventListener('change', ()=> {
            whereToSour = variableName.value
            localStorage.setItem('userData', JSON.stringify(UserObjLc))
            document.querySelector(QSName).textContent = `${ukrName}: ${variableName.value}`
            if(userSurname.value === '') {
                document.querySelector(QSName).textContent = ''
            }
        })
    }
    editInfo(userName, '.name', 'імʼя',UserObjLc.name )
    editInfo(userSurname, '.surname',"прізвище",UserObjLc.surname)
    editInfo(userEmail, '.email','емейл',UserObjLc.email)
})

clearBtn.addEventListener('click',()=> {
    document.querySelector('.name').textContent = ''
    document.querySelector('.surname').textContent = ''
    document.querySelector('.email').textContent = ''
    localStorage.removeItem('userData')
    userName.value = ''
    userSurname.value =''
    userEmail.value = ''
})