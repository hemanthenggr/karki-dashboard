import { CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter, CButton } from '@coreui/react'

const Modal = ({ title, form, handleSubmit, visible, setVisible }) => {

  return (
    <CModal size="lg" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{form}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        <CButton type="button" onClick={handleSubmit}>{title}</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default Modal
