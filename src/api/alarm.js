import { myAlarms } from '../stores'
import serverApi from '../utils/ServerApi'

let reloadLectures = () => {}

export const setReloadLectures = (f) => (reloadLectures = f)

export const loadMyAlarms = async () => {
  const alarms = await serverApi.myAlarms()
  myAlarms.set(alarms)
  reloadLectures()
}

export const addAlarm = async (lectureId) => {
  try {
    await serverApi.addAlarm(lectureId)
  } catch (e) {
    alert('알람은 20개까지만 등록할 수 있어요.')
  }

  return loadMyAlarms()
}

export const deleteAlarm = async (lectureId) => {
  await serverApi.deleteAlarm(lectureId)
  return loadMyAlarms()
}
