import React, { useState } from 'react'
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const [validated, setValidated] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [formData, setFormData] = useState({
    username: 'hemathenggr@gmail.com',
    password: '',
    email: 'hemathenggr@gmail.com',
    newPassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const form = document.getElementById('register-form')

    setValidated(form.checkValidity())
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const form = e.currentTarget

    setValidated(form.checkValidity())
    setPasswordMatch(formData.password !== formData.newPassword)

    await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  id='register-form'
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      feedbackValid="Looks good!"
                      feedbackInvalid="Please enter username/email"
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      feedbackValid="Looks good!"
                      feedbackInvalid="Please provide a valid password."
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      feedbackValid="Looks good!"
                      feedbackInvalid="Please provide a valid password."
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="newPassword"
                      placeholder="Repeat password"
                      feedbackInvalid={passwordMatch ? "Password does not match." : "Please provide a valid password."}
                      feedbackValid={!passwordMatch ? "Looks good!" : ""}
                      onChange={handleChange}
                      invalid={passwordMatch}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit" disabled={!validated}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
