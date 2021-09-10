import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const writePost = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/posts',
      data
    })
    if (res.data.status === 'success') {
      hideAlert()
      location.assign(window.location.href.split('?')[0])
    }
  } catch (err) {
    showAlert('err', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 5000)
  }
}
