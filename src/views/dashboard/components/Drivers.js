import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {
    CAvatar,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibCcMastercard, cilPeople, cilPen, cilTrash } from '@coreui/icons'
import moment from 'moment'

// firestore 
import { getDriver, addDriver } from 'src/firebase/driverCollection'
import { storage } from 'src/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import Modal from './Modal'
import AddDriver from './AddDriverForm'

const Users = () => {

    const [drivers, setDrivers] = useState([])
    const [visible, setVisible] = useState(false)
    const [validated, setValidated] = useState(false)
    const [profileImage, setProfileImage] = useState({})
    const [formData, setFormData] = useState({
        first_name: "Hemanth",
        last_name: "kumar",
        email: "hemanth@gmail.com",
        password: "firebase",
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
        const initData = async () => {
            const resDriver = await getDriver()

            if (resDriver !== null) setDrivers(buildTableData(resDriver))
        }

        initData()
    }, [])

    const getExtension = (name) => {
        return name.split(".").pop()
    }

    const buildTableData = (drivers) => {
        return drivers.map(driver => {
            return {
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
                // usage: {
                //     value: 50,
                //     period: 'Jun 11, 2021 - Jul 10, 2021',
                //     color: 'success',
                // },
                payment: { name: 'Mastercard', icon: cibCcMastercard },
            }
        })
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name != '') setFormData({ ...formData, [name]: value })
    }

    const uploadProfilePicture = () => {
        return new Promise((resolve, reject) => {
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

    const handleSubmit = async () => {
        try {
            setValidated(true)

            const form = document.getElementById('driver-form')
            const url = await uploadProfilePicture()
            const requestData = { ...formData, profile_picture: url }

            setFormData(requestData)

            if (form.checkValidity() === false) return false

            let res = await addDriver(requestData)
            if (res) {
                console.log("res", res)
                setVisible(false)

                toast.success('Driver Added Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } catch (error) {
            console.log("error", error)
        }
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
                                        buttonName={'Add New Driver'}
                                        title={'New Driver'}
                                        form={<AddDriver validated={validated} handleChange={handleChange} setProfileImage={setProfileImage} formData={formData} />}
                                        handleSubmit={handleSubmit}
                                        visible={visible}
                                        setVisible={setVisible}
                                    />
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell className="text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Driver</CTableHeaderCell>
                                        <CTableHeaderCell>Vehicle</CTableHeaderCell>
                                        <CTableHeaderCell>Mobile</CTableHeaderCell>
                                        <CTableHeaderCell>Subscription</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {drivers.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell className="text-center">
                                                <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} className="driver-table-thumbnail" />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.user.name}</div>
                                                <div className="small text-medium-emphasis">
                                                    <span>{item.user.gender} | Registered: {item.user.registered}</span>
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.vehicle.vehicle_no || 'Not Registered'} | Registered: {item.vehicle.area}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.mobile}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.is_subscribed ? 'Active' : 'Not Active'}</div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={item.payment.icon} />
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CIcon size="xl" icon={cilPen} />
                                                <CIcon size="xl" icon={cilTrash} />
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <ToastContainer />
        </>
    )
}

export default Users