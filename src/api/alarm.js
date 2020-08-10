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
  await serverApi.addAlarm(lectureId)
  return loadMyAlarms()
}

export const deleteAlarm = async (lectureId) => {
  await serverApi.deleteAlarm(lectureId)
  return loadMyAlarms()
}
