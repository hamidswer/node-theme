import '@babel/polyfill'
// Login
import { login, logout, signup } from './login'
const loginForm = document.querySelector('.login-form')
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    login(email, password)
  })
}
const signupForm = document.querySelector('.signup-form')
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#signup-name').value
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value
    const passwordConfirm = document.querySelector(
      '#signup-password-confirm'
    ).value
    signup(name, email, password, passwordConfirm)
    // name.innerText = ''
    // email.innerText = ''
    // password.innerText = ''
    // passwordConfirm.innerText = ''
  })
}
const loginButton = document.querySelector('#login-button')
const signupButton = document.querySelector('#signup-button')
const forgetButton = document.querySelector('.forget-password-text')
const forgetPasswordForm = document.querySelector('.forget-password-form')
loginButton.addEventListener('click', (e) => {
  e.preventDefault()
  loginForm.classList.add('form-active')
  loginButton.classList.add('button-active')
  if (signupButton.classList.contains('button-active')) {
    signupButton.classList.remove('button-active')
  }
  if (signupForm.classList.contains('form-active')) {
    signupForm.classList.remove('form-active')
  }
  if (forgetPasswordForm.classList.contains('form-active')) {
    forgetPasswordForm.classList.remove('form-active')
  }
})
signupButton.addEventListener('click', (e) => {
  e.preventDefault()
  signupForm.classList.add('form-active')
  signupButton.classList.add('button-active')
  if (loginButton.classList.contains('button-active')) {
    loginButton.classList.remove('button-active')
  }
  if (loginForm.classList.contains('form-active')) {
    loginForm.classList.remove('form-active')
  }
  if (forgetPasswordForm.classList.contains('form-active')) {
    forgetPasswordForm.classList.remove('form-active')
  }
})
forgetButton.addEventListener('click', (e) => {
  e.preventDefault()
  if (loginForm.classList.contains('form-active')) {
    loginForm.classList.remove('form-active')
  }
  if (signupForm.classList.contains('form-active')) {
    signupForm.classList.remove('form-active')
  }
  forgetPasswordForm.classList.add('form-active')
})

import { forgetPassword } from './forgetPassword'
if (forgetPasswordForm) {
  forgetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#forget-password-email').value
    forgetPassword(email)
  })
}

import { resetPassword } from './resetPassword'
const resetPasswordForm = document.querySelector('.reset-user-password')
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const password = document.querySelector('#reset-user-new-password').value
    const passwordConfirm = document.querySelector(
      '#reset-user-new-password-confirm'
    ).value
    const token = window.location.href.replace('/users/resetPassword/', '')
    resetPassword(password, passwordConfirm, token)
  })
}
// --------------------------------------------------
// map
import { displayMap } from './mapbox'
const mapBox = document.querySelector('.post-map')
if (mapBox) {
  const mapLocation = JSON.parse(mapBox.dataset.location)
  displayMap(mapLocation)
}
// --------------------------------------------------
// ====================================review stars
const rates = document.querySelectorAll('.post-review-rate')
if (rates) {
  rates.forEach((rate) => {
    const rateLength = Number(rate.innerText)
    rate.innerText = ''
    let img
    for (let i = 0; i < rateLength; i++) {
      img = document.createElement('img')
      img.src = '/static/img/theme/star.png'
      rate.appendChild(img)
    }
  })
}
// form animation
//=====================> animation
// const email = document.querySelector('input[type="email"]')
// const emailText = document.querySelector('.email-text')
// let emailValue = email.attributes.placeholder.value
// let emailCharacters = emailValue.split('')
// const password = document.querySelector('input[type="password"]')
// const passwordText = document.querySelector('.password-text')
// let passwordValue = password.attributes.placeholder.value
// let passwordCharacters = passwordValue.split('')
// let count = 0
// function counter(text, type, characters) {
//   if (count < characters.length) {
//     text.innerHTML += `<p class="${type}-animation-${count}">${characters[count]}</p>`
//     count++
//     counter(text, type, characters)
//   } else {
//   }
// }
// let newCount = 0
// function newCounter(data, type, characters) {
//   data.attributes.placeholder.value = ''
//   if (newCount < characters.length) {
//     let newCharacter = document.querySelector(`.${type}-animation-${newCount}`)
//     newCharacter.classList.add(`${type}-animation-${newCount}${newCount}`)
//     newCount++
//     setTimeout(function () {
//       newCounter(data, type, characters)
//     }, 100)
//   } else {
//   }
// }
// email.addEventListener('click', (e) => {
//   e.preventDefault()
//   if (count !== 0 || newCount !== 0) {
//     count = 0
//     newCount = 0
//   }
//   counter(emailText, 'text', emailCharacters)
//   newCounter(email, 'text', emailCharacters)
// })
// password.addEventListener('click', (e) => {
//   e.preventDefault()
//   if (count !== 0 || newCount !== 0) {
//     count = 0
//     newCount = 0
//   }
//   counter(passwordText, 'password', passwordCharacters)
//   newCounter(password, 'password', passwordCharacters)
// })

//=====================> modal open and close
import { hideAlert } from './alerts'

const modal = document.querySelector('.login-popup')
const btn = document.getElementById('login')
if (btn) {
  btn.onclick = function () {
    modal.style.display = 'block'
  }
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
    const el = document.querySelector('.alert')
    if (el) {
      hideAlert()
    }
  }
}
// ============================ Loged out
const logOutBtn = document.querySelector('#loggout')
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout)
}
// ============================ update user
import { updateData } from './updateUser'
// ======> name and email
const userInformation = document.querySelector('#settings-user-information')
if (userInformation) {
  userInformation.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.querySelector('#settings-user-name').value)
    form.append('email', document.querySelector('#settings-user-email').value)
    form.append('photo', document.querySelector('#photo').files[0])
    updateData(form, 'datas')
  })
}
// =====> password
const userPasswordForm = document.querySelector('#settings-user-password')
// password passwordConfirm and passwordCurrent should be the same variable our API accepts!
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const passwordCurrent = document.querySelector(
      '#settings-user-current-password'
    ).value
    const password = document.querySelector('#settings-user-new-password').value
    const passwordConfirm = document.querySelector(
      '#settings-user-new-password-confirm'
    ).value
    await updateData({ passwordCurrent, password, passwordConfirm }, 'password')
    passwordCurrent = ''
    password = ''
    passwordConfirm = ''
  })
}
//  ============== post images slideshow
const container = document.querySelectorAll('.slider-image-span')
container.forEach((e) => {
  e.addEventListener('click', () => {
    container.forEach((e) => {
      e.classList.remove('active')
      e.classList.add('deactive')
    })
    e.classList.remove('deactive')
    e.classList.add('active')
  })
})
// =============
//  === write a review
import { writeReview } from './writeReview'
const reviewForm = document.querySelector('.review-form')
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var data = new FormData(reviewForm)
    const textarea = data.get('comment')
    let stars = data.get('stars')
    if (!stars) {
      stars = 5
    }
    writeReview(textarea, Number(stars), window.location.href)
  })
}
// delete reviews
import { deleteReview } from './deleteReview'

const deleteReviews = document.querySelectorAll('.delete-review')
if (deleteReviews) {
  deleteReviews.forEach((e) => {
    e.addEventListener('click', (e) => {
      e.preventDefault()
      const commentId = e.target.getAttribute('data-review-id')
      deleteReview(commentId)
    })
  })
}
//  === write a post
import { writePost } from './writePost'
const writePostForm = document.querySelector('.write-post-form')
if (writePostForm) {
  writePostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.querySelector('#name').value)
    form.append('description', tinymce.get('mytextarea').getContent())
    form.append('image', document.querySelector('#image').files[0])
    writePost(form)
  })
}
//  === edit a post
const editPostButton = document.querySelector('.edit-post')
if (editPostButton) {
  editPostButton.addEventListener('click', (e) => {
    e.preventDefault()
    const link = window.location.href + '/edit'
    window.location.assign(link)
  })
}
import { editPost } from './editPost'
const editPostForm = document.querySelector('.edit-post-form')
if (editPostForm) {
  const urls = window.location.href.split('?')[0].replace('/edit', '')
  editPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.querySelector('#name').value)
    form.append('description', tinymce.get('mytextarea').getContent())
    form.append('image', document.querySelector('#image').files[0])
    editPost(form, urls)
  })
}
// delete reviews
import { deletePost } from './deletePost'

const deletePosts = document.querySelector('.delete-post')
if (deletePosts) {
  deletePosts.addEventListener('click', (e) => {
    e.preventDefault()
    const postId = deletePosts.getAttribute('data-post-id')
    deletePost(postId)
  })
}
// Page navigation
const previousButton = document.querySelector('.btn-previous')
const nextButton = document.querySelector('.btn-next')
if (previousButton && nextButton) {
  let userUrl = String(window.location.href)
  let cookTime
  const sort = function (time) {
    if (userUrl.includes(time)) {
      cookTime = `cookTime=${time}&`
    }
  }
  sort('slow')
  sort('medium')
  sort('fast')
  const next = function (e) {
    e.preventDefault()
    let address = cookTime
      ? `/posts?${cookTime}page=${nextButtonValue + 1}`
      : `/posts?page=${nextButtonValue + 1}`
    window.location.href = address
  }
  const previous = function (e) {
    e.preventDefault()
    let address = cookTime
      ? `/posts?${cookTime}page=${previousButtonValue - 1}`
      : `/posts?page=${previousButtonValue - 1}`
    window.location.href = address
  }
  let pageNumber = Number(window.location.href.split('page=')[1])

  let nextButtonValue = pageNumber || 1
  if (pageNumber > 1) {
    nextButton.style.display = 'none'
    nextButton.removeEventListener('click', next)
  } else {
    nextButton.addEventListener('click', next)
  }

  let previousButtonValue = pageNumber > 1 ? pageNumber : 2
  if (pageNumber > 1) {
    previousButton.style.display = 'block'
    previousButton.addEventListener('click', previous)
  } else {
    previousButton.removeEventListener('click', previous)
  }
}
// ingrediends background image
const ingredientsB = document.querySelector('.post-card-img-2')

if (ingredientsB) {
  const ingredientsBackground = ingredientsB
    .getAttribute('value')
    .replace('/static/', '/static/')
  if (ingredientsBackground) {
    const ingrediends = document.querySelector('.post-image')
    ingrediends.style.backgroundImage = `url('${ingredientsBackground}')`
  }
}
