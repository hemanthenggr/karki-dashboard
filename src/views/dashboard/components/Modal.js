import { useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter, CButton } from '@coreui/react'

const Modal = ({ buttonName, title, form, handleSubmit, visible, setVisible }) => {

    return (
        <>
            <CButton onClick={() => setVisible(!visible)}>{buttonName}</CButton>
            <CModal size="lg" scrollable visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>{title}</CModalTitle>
                </CModalHeader>
                <CModalBody>{form}</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                    <CButton type="button" onClick={handleSubmit}>Add Driver</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Modal