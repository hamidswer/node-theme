import axios from 'axios'
import { hideAlert, showAlert } from './alerts'

export const updateData = async (data, type) => {
  try {
    const url =
      type === 'password' ? '/users/updateMyPassword' : '/users/updateMe'
    const res = await axios({
      method: 'PATCH',
      url,
      data
    })
    if (res.data.status === 'success') {
      location.assign('/me')
    }
  } catch (err) {
    showAlert('err', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      // location.assign('/overview')
      hideAlert()
    }, 5000)
  }
}
