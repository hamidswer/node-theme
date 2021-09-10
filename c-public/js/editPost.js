import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const editPost = async (data, urls) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${urls}`,
      data
    })
    if (res.data.status === 'success') {
      hideAlert()
      location.assign(window.location.href.split('?')[0].replace('/edit', ''))
    }
  } catch (err) {
    showAlert('err', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 5000)
  }
}
