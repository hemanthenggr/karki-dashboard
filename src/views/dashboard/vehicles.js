import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

// firestore
import { addVehicle, deleteVehicle, getVehicle, updateVehicle } from 'src/firebase/vehicleCollection'
import { getDriver } from 'src/firebase/driverCollection'
import { storage } from 'src/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// components
import Modal from './components/Modal'
import AddVehicle from './components/AddVehicleForm'
import VehicleList from "./components/VehicleList"
import AddButton from './components/AddButton'

const Vehicles = () => {

  const [vehicles, setVehicle] = useState([])
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [vehicleDocument, setVehicleDocument] = useState({})
  const [drivers, setDrivers] = useState({})
  const [title, setTitle] = useState("New Vehicle")
  const initFormData = {
    driverId: "",
    category_id: "",
    fuel_type: "Petrol",
    vehicle_no: "",
    brand: "",
    model: "",
    color: "",
    seats: "",
    manufacture_year: "",
    is_active: false,
    pdf_url: ""
  }
  const [formData, setFormData] = useState(initFormData)

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const resVehicle = await getVehicle()
    const resDriver = await getDriver();

    setVehicle(resVehicle)
    setDrivers(resDriver)
  }

  const getExtension = (name) => {
    return name.split(".").pop()
  }

  const resetForm = () => {
    setFormData(initFormData)
  }

  const uploadDriverDocument = () => {
    return new Promise((resolve, reject) => {
      if (!vehicleDocument.name) resolve(false)
      const imageRef = ref(storage, `/Driver_ID_Documents/${Date.now()}_${formData.vehicle_no}_vehicleDoc.${getExtension(vehicleDocument.name)}`)

      uploadBytes(imageRef, vehicleDocument).then(() => {
        getDownloadURL(imageRef).then(url => {
          resolve(url)
        }).catch(err => {
          console.log("err", err)
          reject(true)
        })
      }).catch(err => {
        console.log("err", err)
        reject(true)
      })
    })
  }

  const showToast = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleSubmit = async () => {
    try {
      setValidated(true)
      const form = document.getElementById('vehicle-form')
      if (form.checkValidity() === false) return false

      let requestData = formData

      const url = await uploadDriverDocument()
      if (url) {
        requestData = { ...requestData, pdf_url: url }
        setFormData(requestData)
      }

      let res = !requestData.id ? await addVehicle(requestData) : await updateVehicle(requestData.id, requestData)
      if (res) {
        setVisible(false)
        showToast(!requestData.id ? 'Vehicle Added Successfully' : 'Vehicle Updated Successfully')

        initData()
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleEdit = (id) => {
    setVisible(true)
    setTitle('Update Vehicle')

    let editData = vehicles.filter(vehicle => vehicle.id == id)[0]
    if (editData) setFormData(editData)
  }

  const handleForm = () => {
    setVisible(true)
    setTitle('New Vehicle')
    resetForm()
  }

  const handleDelete = async (dId, vId) => {
    let res = await deleteVehicle(dId, vId)
    if (res) showToast('Vehicle Deleted Successfully')

    initData()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='justify-content-between'>
                <CCol xs={6}>Vehicles List</CCol>
                <CCol xs={6} className="text-end">
                  <AddButton formButtonTitle={'Add New Vehicle'} handleForm={handleForm} />
                  <Modal
                    title={title}
                    form={drivers && <AddVehicle validated={validated} setFormData={setFormData} setVehicleDocument={setVehicleDocument} formData={formData} drivers={drivers} />}
                    handleSubmit={handleSubmit}
                    visible={visible}
                    setVisible={setVisible}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <VehicleList vehicles={vehicles} handleEdit={handleEdit} handleDelete={handleDelete} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default Vehicles
