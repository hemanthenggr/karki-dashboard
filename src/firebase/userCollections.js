import { db } from './config'
import { collection, getDocs } from 'firebase/firestore'

const userCollectionRef = () => {
    return collection(db, 'karki_user')
}

const getUser = async () => {
    const data = await getDocs(userCollectionRef())

    return data.docs.map(doc => ({...doc.data(), id: doc.id }))
  }

export {
    getUser
}