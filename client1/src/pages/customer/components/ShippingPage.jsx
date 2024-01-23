import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { updateCustomer } from '../../../redux/userHandler';
import { Box, Button, Collapse, Stack, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const ShippingPage = ({ handleNext, profile }) => {
    const { currentUser } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let shippingData = currentUser.shippingData;

    const [formData, setFormData] = useState({
        address: '',
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
    })
    const [errors, setErrors] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
        phoneNo: '',
    });
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [pinCodeError, setPinCodeError] = useState(false);
    const [phoneNoError, setPhoneNoError] = useState(false);

    const [showTab, setShowTab] = useState(false)
    const buttonText = showTab ? 'Cancel' : 'Edit';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    };

    const validateInputs = () => {
        const newErrors = {};

        if (formData.address.trim() === '') {
            newErrors.address = 'Address is required';
        } else {
            newErrors.address = '';
        }

        if (formData.city.trim() === '') {
            newErrors.city = 'City is required';
        } else {
            newErrors.city = '';
        }

        if (formData.state.trim() === '') {
            newErrors.state = 'State is required';
        } else {
            newErrors.state = '';
        }

        if (formData.country.trim() === '') {
            newErrors.country = 'Country is required';
        } else {
            newErrors.country = '';
        }

        if (formData.pinCode.trim() === '' || isNaN(formData.pinCode) || formData.pinCode.length !== 6) {
            newErrors.pinCode = 'Pin Code is required and should be a 6-digit number';
        } else {
            newErrors.pinCode = '';
        }

        if (formData.phoneNo.trim() === '' || isNaN(formData.phoneNo) || formData.phoneNo.length !== 10) {
            newErrors.phoneNo = 'Phone Number is required and should be a 10-digit number';
        } else {
            newErrors.phoneNo = '';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const updateShippingData = (shippingData) => {
        const updatedUser = { ...currentUser, shippingData: shippingData };
        dispatch(updateCustomer(updatedUser, currentUser._id));
    }

    const handleSubmit = () => {
        if (validateInputs()) {
            updateShippingData(formData);
            handleNext();
        }
    }

    const profileSubmitHandler = () => {
        if (validateInputs()) {
            updateShippingData(formData);
        }
    }

    const editHandler = (e) => {
        e.prevenDefault();
        if (isNaN(pinCode) || pinCode.length !== 6) {
            setPinCodeError(true)
        }
        else if (isNaN(phoneNo) || phoneNo.length !== 10) {
            setPhoneNoError(true)
        }
        else {
            setPinCodeError(false)
            setPhoneNoError(false)
            const fields = { address, city, state, country, pinCode, phoneNo }
            setShowTab(false);
        }
    }
    return (
        <React.Fragment>
            {shippingData && Object.keys(shippingData).length > 0 ?
                <React.Fragment>
                    <StyledTypography variant="h6">
                        Address: {shippingData && shippingData.address}
                    </StyledTypography>
                    <StyledTypography variant="h6">
                        City: {shippingData && shippingData.city}
                    </StyledTypography>
                    <StyledTypography variant="h6">
                        State: {shippingData && shippingData.state}
                    </StyledTypography>
                    <StyledTypography variant="h6">
                        Country: {shippingData && shippingData.country}
                    </StyledTypography>
                    <StyledTypography variant="h6">
                        Pin Code: {shippingData && shippingData.pinCode}
                    </StyledTypography>
                    <StyledTypography variant="h6">
                        Phone Number: {shippingData && shippingData.phoneNo}
                    </StyledTypography>


                    {profile ? <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant='contained'
                            onClick={() => { setShowTab(!showTab) }}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
                        </Button>
                    </Box>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={() => navigate("/profile")}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Change
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => { handleNext() }}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Next
                            </Button>
                        </Box>
                    }
                    <Collapse in={showTab} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                flex: '1 1 auto',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: 550,
                                    px: 3,
                                    py: '30px',
                                    width: '100%'
                                }}
                            >
                                <form onSubmit={editHandler}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value) }}
                                            required
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={city}
                                            onChange={(e) => { setCity(e.target.value) }}
                                            required
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Zip/Postal code"
                                            type='number'
                                            value={pinCode}
                                            error={pinCodeError}
                                            helperText={pinCodeError && 'Pin Code should be a 6-digit number'}
                                            onChange={(e) => { setPinCode(e.target.value) }}
                                            required
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            value={country}
                                            onChange={(e) => { setCountry(e.target.value) }}
                                            required
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="State/Province/Region"
                                            value={state}
                                            onChange={(e) => { setState(e.target.value) }}
                                            required
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Phone number"
                                            type='number'
                                            value={phoneNo}
                                            error={phoneNoError}
                                            helperText={phoneNoError && 'Phone Number should be a 10-digit number'}
                                            onChange={(event) => setPhoneNo(event.target.value)}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Stack>
                                    <Button
                                        fullWidth
                                        size="large"
                                        sx={{ mt: 3 }}
                                        variant='contained'
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Collapse>
                </React.Fragment>
                :
                <React.Fragment>
                    <Typography variant='h6' gutterBottom>
                        Shipping address
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                autoComplete='shipping address-line1'
                                variant='standard'
                                onChange={handleInputChange}
                                value={formData.address}

                                error={!!errors.address}
                                helperText={errors.address}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="cit"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete='shipping address-level2'
                                variant='standard'
                                onChange={handleInputChange}
                                value={formData.city}
                                error={!!errors.city}
                                helperText={errors.city}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="pinCode"
                                name="pinCode"
                                label="Zip/Postal Code"
                                fullWidth
                                autoComplete='shipping postal-code'
                                variant='standard'
                                onChange={handleInputChange}
                                value={formData.pinCode}
                                error={!!errors.pinCode}
                                helperText={errors.pinCode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete='shipping Country'
                                variant='standard'
                                onChange={handleInputChange}
                                value={formData.country}
                                error={!!errors.country}
                                helperText={errors.country}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant='standard'
                                onChange={handleInputChange}
                                value={formData.state}
                                error={!!errors.state}
                                helperText={errors.state}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="phoneNo"
                                name="phoneNo"
                                label="Phone number"
                                type='number'
                                fullWidth
                                autoComplete="shipping Phone-number"
                                variant="standard"
                                value={formData.phoneNo}
                                onChange={handleInputChange}
                                error={!!errors.phoneNo}
                                helperText={errors.phoneNo}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {profile ?
                            <Button
                                variant='contained'
                                sx={{ mt: 3, ml: 1 }}
                                onClick={profileSubmitHandler}
                            >
                                Submit
                            </Button>
                            :
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Next
                            </Button>
                        }
                    </Box>
                </React.Fragment>
            }

        </React.Fragment >
    )
}

export default ShippingPage

const StyledTypography = styled(Typography)`
  margin-bottom: 10px;
`;