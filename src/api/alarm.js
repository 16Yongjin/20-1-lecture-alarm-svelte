import { myAlarms } from '../stores'
import serverApi from '../utils/ServerApi'

let reloadLectures = () => {}

export const setReloadLectures = (f) => (reloadLectures = f)

export const loadMyAlarms = async () => {
  try {
    const alarms = await serverApi.myAlarms()
    myAlarms.set(alarms)
    reloadLectures()
  } catch (e) {
    alert(e.message)
  }
}

export const addAlarm = async (lectureId) => {
  try {
    await serverApi.addAlarm(lectureId)
  } catch (e) {
    alert(e.message)
  }

  return loadMyAlarms()
}

export const deleteAlarm = async (lectureId) => {
  await serverApi.deleteAlarm(lectureId)
  return loadMyAlarms()
}
