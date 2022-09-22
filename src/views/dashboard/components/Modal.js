import { CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter, CButton } from '@coreui/react'

const Modal = ({ formType, title, form, handleSubmit, visible, setVisible, handleForm }) => {

  return (
    <>
      <CButton onClick={handleForm}>Add New Driver</CButton>
      <CModal size="lg" scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{form}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
          <CButton type="button" onClick={handleSubmit}>{formType == 'add' ? "Add Driver" : "Update Driver"}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Modal
