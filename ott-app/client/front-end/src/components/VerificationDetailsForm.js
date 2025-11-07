const VerificationDetailsForm = ({ formData, handleChange }) => {
    return (
        <>
            <div className="mb-2">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" name="givenName" value={formData.givenName} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control" name="familyName" value={formData.familyName} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="addressLines" value={formData.addressLines} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">City</label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label className="form-label">State</label>
                <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
            </div>
        </>
    );
};

export default VerificationDetailsForm;
