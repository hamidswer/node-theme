import axios from 'axios'
import { hideAlert, showAlert } from './alerts'
export const deletePost = async (id) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/posts/${id}`,
      data: {}
    })
    location.assign('/')
  } catch (err) {
    showAlert('error', err.response.data.message || 'Something is wrong!')
    setTimeout(function () {
      hideAlert()
    }, 3000)
  }
}
