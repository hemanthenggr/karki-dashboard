import { CButton } from '@coreui/react'

const AddButton = ({ formButtonTitle, handleForm }) => {
  return <CButton onClick={handleForm}>{formButtonTitle}</CButton>
}

export default AddButton
