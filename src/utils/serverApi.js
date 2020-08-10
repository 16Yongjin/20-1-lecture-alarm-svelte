import { messaging } from './firebase'

class ServerApi {
  getUserId() {
    return messaging.getToken()
  }

  request(...args) {
    return fetch(...args).then((res) =>
      res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
    )
  }

  constructor(baseUrl) {
    console.log('initialize serverapi')
    this.baseUrl = baseUrl
  }

  async myAlarms() {
    const userId = await this.getUserId()
    return this.request(`${this.baseUrl}/v1/users/${userId}`)
  }

  async addAlarm(lectureId) {
    const userId = await this.getUserId()
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ userId, lectureId })

    return this.request(`${this.baseUrl}/v1/users`, {
      method: 'POST',
      headers,
      body,
    })
  }

  async deleteAlarm(lectureId) {
    const userId = await this.getUserId()

    return this.request(`${this.baseUrl}/v1/users/${userId}/${lectureId}`, {
      method: 'DELETE',
    })
  }

  async findLectures(courseId) {
    const userId = await this.getUserId()

    return this.request(`${this.baseUrl}/v1/users/${userId}/${courseId}`)
  }

  async searchLectures(query) {
    const userId = await this.getUserId()

    return this.request(
      `${this.baseUrl}/v1/users/${userId}/search?query=${encodeURIComponent(
        query,
      )}`,
    )
  }
}

// const serverApi = new ServerApi("https://premium.api.lecture.hufs.app");
const serverApi = new ServerApi('http://localhost:3000')

export default serverApi
