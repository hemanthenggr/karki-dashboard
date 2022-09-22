import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { cibCcMastercard } from '@coreui/icons'
import moment from 'moment'

// firestore
import { getDriver, addDriver, updateDriver, deleteDriver } from 'src/firebase/driverCollection'
import { storage } from 'src/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// components
import Modal from './components/Modal'
import AddDriver from './components/AddDriverForm'
import DriverList from "./components/DriverList"

const Users = () => {

  const [drivers, setDrivers] = useState([])
  const [tableData, setTableData] = useState([])
  const [visible, setVisible] = useState(false)
  const [validated, setValidated] = useState(false)
  const [profileImage, setProfileImage] = useState({})
  const [formType, setFormType] = useState("add")
  const [title, setTitle] = useState("New Driver")
  const [formData, setFormData] = useState({
    first_name: "Hemanth",
    last_name: "kumar",
    email: "hemanth@gmail.com",
    dob: "",
    gender: "Male",
    mobile: "98766532333",
    profile_picture: "",
    area: "no area",
    is_online: "0",
    is_vehicle_updated: false,
    location: "no update",
    location_lat: 1,
    location_long: 1,
    pincode: "0",
    status: "2",
    file_url: "",
    created_by: "ADMIN",
    created_date: moment().format("DD-MM-YYYY"),
    created_time: moment(moment().format('LTS'), ["h:mm A"]).format("HH:mm"),
    updated_by: "ADMIN",
    updated_date: moment().format("DD-MM-YYYY"),
    updated_time: moment(moment().format('LTS'), ["h:mm A"]).format("HH:mm"),
    device_token: "",
    // vehicle_type: "auto",
    // fuel_type: "petrol",
    // vehicle_number: "",
    // vehicle_brand: "",
    // vehicle_model: "",
    // vehicle_color: "",
    // vehicle_seats: "",
    // manufacture_year: "",
    // file_url: ""
  })

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const resDriver = await getDriver()

    setDrivers(resDriver)

    if (resDriver !== null) setTableData(buildTableData(resDriver))
  }

  const getExtension = (name) => {
    return name.split(".").pop()
  }

  const buildTableData = (drivers) => {
    return drivers.map(driver => {
      return {
        id: driver.id,
        avatar: { src: driver.profile_image, status: driver.is_online == '1' ? 'success' : 'danger' },
        user: {
          name: `${driver.first_name} ${driver.last_name}`,
          email: driver.email,
          dob: driver.dob,
          gender: driver.gender,
          registered: moment(driver.created_date, 'DD-MM-YYYY').format('ll'),
        },
        mobile: driver.mobile,
        vehicle: {
          vehicle_no: driver.vehicle_no,
          area: driver.area
        },
        is_subscribed: driver.is_subscribed,
        is_vehicle_updated: driver.is_vehicle_updated,
        payment: { name: 'Mastercard', icon: cibCcMastercard },
      }
    })
  }

  const uploadProfilePicture = () => {
    return new Promise((resolve, reject) => {
      if (!profileImage.name) resolve(false)
      const imageRef = ref(storage, `/Driver_Profile_Pictures/${formData.email}_${Date.now()}.${getExtension(profileImage.name)}`)

      uploadBytes(imageRef, profileImage).then(() => {
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
      const form = document.getElementById('driver-form')
      if (form.checkValidity() === false) return false

      if (formType == 'add') {
        const url = await uploadProfilePicture()
        let requestData = formData

        if (url) {
          requestData = { ...requestData, profile_image: url }
          setFormData(requestData)
        }

        let res = await addDriver(requestData)
        if (res) {
          setVisible(false)
          showToast('Driver Added Successfully')

          initData()
        }
      } else if (formType == 'update') {
        const url = await uploadProfilePicture()
        let requestData = formData

        if (url) {
          requestData = { ...requestData, profile_image: url }
          setFormData(requestData)
        }
        let res = await updateDriver(requestData.id, requestData)
        if (res) {
          setVisible(false)
          showToast('Driver Updated Successfully')

          initData()
        }
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleEdit = (id) => {
    setVisible(true)
    setFormType('update')
    setTitle('Update Driver')

    let editData = drivers.filter(driver => driver.id == id)[0]
    if (editData) setFormData(editData)
  }

  const handleForm = () => {
    setVisible(true)
    setFormType('add')
    setTitle('New Driver')
  }

  const handleDelete = async (id) => {
    let res = await deleteDriver(id)

    if (res) showToast('Driver Deleted Successfully')

    initData()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className='justify-content-between'>
                <CCol xs={6}>Drivers List</CCol>
                <CCol xs={6} className="text-end">
                  <Modal
                    formType={formType}
                    title={title}
                    form={<AddDriver validated={validated} setFormData={setFormData} setProfileImage={setProfileImage} formData={formData} />}
                    handleSubmit={handleSubmit}
                    visible={visible}
                    setVisible={setVisible}
                    handleForm={handleForm}
                  />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <DriverList drivers={tableData} handleEdit={handleEdit} handleDelete={handleDelete} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  )
}

export default Users
