import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const deleteReview = async (id) => {
  try {
    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8081/reviews/${id}`,
      data: {}
    })
    setTimeout(function () {
      window.location = window.location
    }, 100)
  } catch (err) {
    showAlert('error', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 3000)
  }
}
