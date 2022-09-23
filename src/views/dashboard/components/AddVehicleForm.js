import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'

const AddVehicle = ({ validated, formData, setFormData, setVehicleDocument, drivers }) => {

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name != '') setFormData({ ...formData, [name]: value })
  }

  return (
    <CForm id='vehicle-form' className="row g-3" noValidate validated={validated}>
      {formData.id ? <CCol md={6}>
        <CFormInput type="text" label="Driver Name" placeholder={formData.driverName} disabled/>
      </CCol> : <CCol md={6}>
        <CFormSelect name="driverId" label="Choose Driver" onChange={handleChange} value={formData.driverId}>{drivers.map(driver => <option key={driver.id} value={driver.id}>{driver.first_name} {driver.last_name}</option>)}</CFormSelect>
      </CCol>}
      <CCol md={6}>
        <CFormSelect name="category_id" label="Vehicle Type" onChange={handleChange} value={formData.category_id}>
          <option value={'Auto'}>Auto</option>
          <option value={'Car'}>Car</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormSelect name="fuel_type" label="Fuel Type" onChange={handleChange} value={formData.fuel_type}>
          <option value={'Petrol'}>Petrol</option>
          <option value={'Diesel'}>Diesel</option>
          <option value={'Gas - CNG'}>Gas - CNG</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Vehicle Number" name="vehicle_no" required feedbackInvalid="Please enter a Vehicle Number." onChange={handleChange} value={formData.vehicle_no} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Vehicle Brand" name="brand" required feedbackInvalid="Please enter a Vehicle Brand." onChange={handleChange} value={formData.brand} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Vehicle Model" name="model" required feedbackInvalid="Please enter a Vehicle Model." onChange={handleChange} value={formData.model} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Vehicle Color" name="color" required feedbackInvalid="Please enter a Vehicle Color." onChange={handleChange} value={formData.color} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Vehicle Seats" name="seats" required feedbackInvalid="Please enter a Vehicle Seats." onChange={handleChange} value={formData.seats} />
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" label="Manufacture Year" name="manufacture_year" required feedbackInvalid="Please enter a Manufacture Year." onChange={handleChange} value={formData.manufacture_year} />
      </CCol>
      <CCol md={6}>
        <CFormSelect name="is_active" label="Vehicle Status" onChange={handleChange} value={formData.is_active}>
          <option value={true}>Active</option>
          <option value={false}>In-Active</option>
        </CFormSelect>
      </CCol>
      <CCol md={12}>
        <CFormInput type="file" label="Vehicle Document(*.pdf)" required={formData.pdf_url ? false : true} feedbackInvalid="Please upload a Vehicle Document." onChange={(e) => { setVehicleDocument(e.target.files[0]) }} />
        <CFormInput type="hidden" name="pdf_url" value={formData.pdf_url} />
      </CCol>
    </CForm>
  )
}

export default AddVehicle
