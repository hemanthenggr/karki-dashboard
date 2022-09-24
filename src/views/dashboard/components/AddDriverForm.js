import { useState } from 'react'
import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'
import DatePicker from "react-datepicker";
import moment from 'moment'

const AddDriver = ({ validated, setProfileImage, formData, setFormData }) => {
  const [startDate, setStartDate] = useState(formData.dob ? new Date(moment(formData.dob, 'DD-MM-YYYY').format().toString()) : new Date())

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name != '') setFormData({ ...formData, [name]: value })
  }

  return (
    <CForm id='driver-form' className="row g-3" noValidate validated={validated}>
      <CCol md={6}>
        <CFormInput type="text" label="First Name" name="first_name" required feedbackInvalid="Please enter a First Name." onChange={handleChange} value={formData.first_name} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Last Name" name="last_name" required feedbackInvalid="Please enter a Last Name." onChange={handleChange} value={formData.last_name} />
      </CCol>
      <CCol md={6}>
        <CFormSelect name="gender" label="Gender" onChange={handleChange} value={formData.gender}>
          <option value={'Male'}>Male</option>
          <option value={'Female'}>Female</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormInput type="email" label="Email" name="email" required feedbackInvalid="Please enter a Email." onChange={handleChange} value={formData.email} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Phone Number" name="mobile" required feedbackInvalid="Please enter a Mobile Number." onChange={handleChange} value={formData.mobile} />
      </CCol>
      <CCol xs={6}>
        <label className='form-label'>Date of Birth</label>
        <DatePicker className='form-control' dateFormat="dd/MM/yyyy" name="dob" selected={startDate} onChange={(date) => { setStartDate(date); setFormData({ ...formData, dob: moment(date).format('DD-MM-YYYY') }) }} required feedbackInvalid="Invalid DOB." />
      </CCol>
      <CCol md={6}>
        <CFormSelect name="status" label="Driver Status" onChange={handleChange} value={formData.status}>
          <option value={'1'}>Active</option>
          <option value={'2'}>In-Active</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormSelect name="is_vehicle_updated" label="Vehicle Status" onChange={handleChange} value={formData.is_vehicle_updated}>
          <option value={'true'}>Updated</option>
          <option value={'false'}>Not Updated</option>
        </CFormSelect>
      </CCol>
      <CCol md={12}>
        <CFormInput type="file" label="Profile Picture" required={formData.profile_image ? false : true} feedbackInvalid="Please upload a Profile Picture." onChange={(e) => { setProfileImage(e.target.files[0]) }} />
        <CFormInput type="hidden" name="profile_picture" value={formData.profile_image} />
      </CCol>
    </CForm>
  )
}

export default AddDriver
