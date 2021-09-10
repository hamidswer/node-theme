import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const writeReview = async (review, rating, urls) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${urls}/reviews`,
      data: {
        review,
        rating
      }
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
