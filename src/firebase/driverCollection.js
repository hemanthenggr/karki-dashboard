import { db } from './config'
import { collection, getDocs, addDoc } from 'firebase/firestore'


const driverCollectionRef = () => {
    return collection(db, 'karki_driver')
}

const getDriver = async () => {
    try {
        const data = await getDocs(driverCollectionRef())
    
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    } catch (error) {
        console.log("addDriver function", error);
        return []
    }
}

const addDriver = async (data) => {
    try {
        await addDoc(driverCollectionRef(), data)
        return true
    } catch (error) {
        console.log("addDriver function", error);
        return false
    }
}

export {
    getDriver, addDriver
}