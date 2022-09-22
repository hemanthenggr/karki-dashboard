import { CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter, CButton } from '@coreui/react'

const DeleteModal = ({ visible, setVisible, handleDelete }) => {
  console.log("visible", visible);
  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Are You Sure?</CModalTitle>
      </CModalHeader>
      <CModalBody>Do you want to delete?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        <CButton color="danger" type="button" onClick={handleDelete}>Delete</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteModal
