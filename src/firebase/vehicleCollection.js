import { db } from './config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const vehicleCollectionRef = (docId) => {
  return collection(db, `karki_driver/${docId}/vehicle`)
}

const driverCollectionRef = () => {
  return collection(db, `karki_driver`)
}

const getVehicle = async () => {
  try {
    const data = await getDocs(driverCollectionRef())
    let vehicleList = []
    for (let idx = 0; idx < data.docs.length; idx++) {
      const doc = data.docs[idx];
      let docData = doc.data();
      if (docData.is_vehicle_updated == 'true' || docData.is_vehicle_updated == true) {
        let vehicleData = await getVehicleData({ ...docData, docId: doc.id })
        vehicleList = vehicleList.concat(vehicleData)
      }
    }

    return vehicleList
  } catch (error) {
    console.log("getVehicle function", error);
    return []
  }
}

const getVehicleData = async ({ first_name, last_name, docId }) => {
  try {
    const data = await getDocs(vehicleCollectionRef(docId))

    return data.docs.map(doc => ({ ...doc.data(), id: doc.id, driverId: docId, driverName: `${first_name} ${last_name}` }))
  } catch (error) {
    console.log("addVehicle function", error);
    return []
  }
}

const addVehicle = async (data) => {
  try {
    await addDoc(vehicleCollectionRef(data.driverId), data)

    return true
  } catch (error) {
    console.log("addVehicle function", error);
    return false
  }
}

const updateVehicle = async (id, data) => {
  try {
    const vehicleDoc = doc(db, `karki_driver/${data.driverId}/vehicle`, id)
    await updateDoc(vehicleDoc, data)

    return true
  } catch (error) {
    console.log("updateVehicle function", error);
    return false
  }
}

const deleteVehicle = async (dId, vId) => {
  try {
    const vehicleDoc = doc(db, `karki_driver/${dId}/vehicle`, vId)
    await deleteDoc(vehicleDoc)

    return true
  } catch (error) {
    console.log("deleteVehicle function", error);
    return false
  }
}

export {
  getVehicle, addVehicle, updateVehicle, deleteVehicle
}
