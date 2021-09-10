import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8081/users/login',
      data: {
        email,
        password
      }
    })
    if (res.data.status === 'success') {
      hideAlert()
      // location.assign(window.location.href.split('?')[0])
      location.assign('/')
    }
  } catch (err) {
    showAlert('err', 'username or password is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 5000)
  }
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8081/users/logout'
    })
    if ((res.data.status = 'success')) {
      location.assign('/overview')
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again later!')
  }
}

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    })
    if (res.data.status === 'success') {
      hideAlert()
      // location.assign(window.location.href.split('?')[0])
      location.assign('/')
    }
  } catch (err) {
    showAlert('error', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 3000)
  }
}
