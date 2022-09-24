import {
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButtonGroup,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilPen, cilTrash } from '@coreui/icons'


import DeleteModal from './DeleteModal'
import { useState } from 'react'

const DriverList = ({ drivers, handleEdit, handleDelete }) => {

  const [dVisible, setdVisible] = useState(false)
  const [dId, setdId] = useState(null)

  return (
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
              <div>{item.is_subscribed ? 'Subscribed' : '-'}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <CButtonGroup role="group" aria-label="Basic outlined example">
                <CButton color="primary" variant="outline" onClick={() => handleEdit(item.id)}>
                  <CIcon size="lg" icon={cilPen} />
                </CButton>
                <CButton color="primary" variant="outline">
                  <CIcon size="lg" icon={cilTrash} onClick={() => {setdVisible(true);setdId(item.id)}} />
                </CButton>
              </CButtonGroup>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
      <DeleteModal visible={dVisible} setVisible={setdVisible} handleDelete={() => {setdVisible(false);handleDelete(dId)}} />
    </CTable>
  )
}

export default DriverList
