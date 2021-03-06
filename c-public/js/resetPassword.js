import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm
      }
    })
    if (res.data.status === 'success') {
      hideAlert()
      location.assign('/')
    }
  } catch (err) {
    showAlert('err', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 5000)
  }
}
