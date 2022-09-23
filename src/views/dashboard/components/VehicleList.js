import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButtonGroup,
  CButton,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash, cilCloudDownload } from '@coreui/icons'

import DeleteModal from './DeleteModal'
import { useState } from 'react'

const VehicleList = ({ vehicles, handleEdit, handleDelete }) => {

  const [dVisible, setdVisible] = useState(false)
  const [vId, setvId] = useState(null)
  const [dId, setdId] = useState(null)

  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>Driver Name</CTableHeaderCell>
          <CTableHeaderCell>Reg Number</CTableHeaderCell>
          <CTableHeaderCell>Brand</CTableHeaderCell>
          <CTableHeaderCell>Model</CTableHeaderCell>
          <CTableHeaderCell>Vehicle Status</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {vehicles.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell>{item.driverName}</CTableDataCell>
            <CTableDataCell>{item.vehicle_no}</CTableDataCell>
            <CTableDataCell>{item.brand}</CTableDataCell>
            <CTableDataCell>{item.model}</CTableDataCell>
            <CTableDataCell><CBadge color={(item.is_active == 'true' || item.is_active == true) ? 'success' : 'danger'}>{item.is_active == 'true' || item.is_active == true ? 'Active' : 'In-Active'}</CBadge></CTableDataCell>
            <CTableDataCell className="text-center">
              <CButtonGroup role="group" aria-label="Basic outlined example">
                <a href={item.pdf_url} className="btn btn btn-outline-primary" download target={'_blank'}><CIcon size="lg" icon={cilCloudDownload} /></a>
                <CButton color="primary" variant="outline" onClick={() => handleEdit(item.id)}>
                  <CIcon size="lg" icon={cilPen} />
                </CButton>
                <CButton color="primary" variant="outline">
                  <CIcon size="lg" icon={cilTrash} onClick={() => { setdVisible(true); setvId(item.id);setdId(item.driverId) }} />
                </CButton>
              </CButtonGroup>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
      <DeleteModal visible={dVisible} setVisible={setdVisible} handleDelete={() => { setdVisible(false); handleDelete(dId, vId) }} />
    </CTable>
  )
}

export default VehicleList
