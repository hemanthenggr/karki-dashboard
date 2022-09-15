import { useState } from 'react'
import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'
import DatePicker from "react-datepicker";

const AddDriver = ({ validated, handleChange, setProfileImage, formData }) => {
    const [startDate, setStartDate] = useState(new Date())

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
                <CFormInput type="password" label="Password" name="password" required feedbackInvalid="Please enter a Password." onChange={handleChange} value={formData.password} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Phone Number" name="mobile" required feedbackInvalid="Please enter a Mobile Number." onChange={handleChange} value={formData.mobile} />
            </CCol>
            <CCol xs={6}>
                <label className='form-label'>Date of Birth</label>
                <DatePicker className='form-control' name="dob" selected={startDate} onChange={(date) => {setStartDate(date);handleChange(date)}} required feedbackValid="Invalid DOB."/>
            </CCol>
            <CCol md={6}>
                <CFormInput type="file" label="Profile Picture" required feedbackInvalid="Please upload a Profile Picture." onChange={(e) => { setProfileImage(e.target.files[0]) }} />
                <CFormInput type="hidden" name="profile_picture" value={formData.profile_picture} />
            </CCol>
            {/* <hr />
            <CCol md={6}>
                <CFormSelect name="vehicle_type" label="Vehicle Type" onChange={handleChange} value={formData.vehicle_type}>
                    <option value={'auto'}>Auto</option>
                    <option value={'car'}>Car</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CFormSelect name="fuel_type" label="Fuel Type" onChange={handleChange} value={formData.fuel_type}>
                    <option value={'petrol'}>Petrol</option>
                    <option value={'diesel'}>Diesel</option>
                </CFormSelect>
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Vehicle Number" name="vehicle_number" required feedbackInvalid="Please enter a Vehicle Number." onChange={handleChange} value={formData.vehicle_number} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Vehicle Brand" name="vehicle_brand" required feedbackInvalid="Please enter a Vehicle Brand." onChange={handleChange} value={formData.vehicle_brand} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Vehicle Model" name="vehicle_model" required feedbackInvalid="Please enter a Vehicle Model." onChange={handleChange} value={formData.vehicle_model} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Vehicle Color" name="vehicle_color" required feedbackInvalid="Please enter a Vehicle Color." onChange={handleChange} value={formData.vehicle_color} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Vehicle Seats" name="vehicle_seats" required feedbackInvalid="Please enter a Vehicle Seats." onChange={handleChange} value={formData.vehicle_seats} />
            </CCol>
            <CCol md={6}>
                <CFormInput type="text" label="Manufacture Year" name="manufacture_year" required feedbackInvalid="Please enter a Manufacture Year." onChange={handleChange} value={formData.manufacture_year} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="file" label="Vehicle Document(*.pdf)" name="file_url" required feedbackInvalid="Please upload a Vehicle Document." onChange={handleChange} value={formData.first_name} />
                <CFormInput type="hidden" label="Vehicle Document(*.pdf)" name="file_url" value={formData.file_url} />
            </CCol> */}
        </CForm>
    )
}

export default AddDriver