import { useState, useEffect } from 'react'
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
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibCcMastercard, cilPeople } from '@coreui/icons'

// firestore 
import { getUser } from 'src/firebase/userCollections'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const initData = async () => {
            const resUsers = await getUser()

            if (resUsers !== null) setUsers(buildTableData(resUsers))
        }

        initData()
    }, [])

    const buildTableData = (users) => {
        return users.map(user => {
            return {
                avatar: { src: user.profile_image, status: 'success' },
                user: {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    dob: user.dob,
                    gender: user.gender,
                    registered: 'Jan 1, 2021',
                },
                mobile: user.mobile,
                payment: { name: 'Mastercard', icon: cibCcMastercard },
            }
        })
    }

    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>Users List</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">
                                        <CIcon icon={cilPeople} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>User</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Phone</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {users.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center">
                                            <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} className="rounded user-table-thumbnail" />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.user.name}</div>
                                            <div className="small text-medium-emphasis">
                                                <span>{item.user.dob} | Registered: {item.user.registered}</span>
                                            </div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.user.email}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.mobile}</div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CIcon size="xl" icon={item.payment.icon} />
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Users