import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Formik} from "formik";
import Image from 'material-ui-image';
import * as Yup from 'yup';

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// Api Request
import agencyApi from '../../../api/agency/agency';
import complexApi from '../../../api/complex/complex';
import {Delete} from "@material-ui/icons";
import {Checkbox} from "@material-ui/core";
import {Autocomplete, Box, TextField} from "@mui/material";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

const validationSchema = Yup.object().shape({
    // name: Yup.string().required(),
    // address: Yup.string().required(),
    // email: Yup.string().email().required(),
    // phone_number: Yup.string().required(),
    // city: Yup.string().required(),
    // country: Yup.string().required(),
    // gps: Yup.object().shape({
    //     long: Yup.string().required(),
    //     lat: Yup.string().required(),
    // }),
});


const useStyles = makeStyles(styles);

const AddComplex = () => {
    const [agencies, setAgencies] = useState([]);
    const [icon, setIcon] = useState('');
    const [iconObj, setIconObj] = useState(null);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        getAllAgencies();
    }, [])

    const handleSubmits = async (values) => {
        const {data, ok} = await complexApi.newComplex(values);
        if (!ok) return console.log(data)

        uploadIcon(data.id).then(() => {
            history.goBack();
        })
    };
    const uploadIcon = async (complexID) => {
        const {data, ok} = await complexApi.uploadImage(iconObj, complexID);
        if (!ok) console.log('Error', data)
    }

    const getAllAgencies = async () => {
        const {data, ok} = await agencyApi.getAllAgencies();
        if (!ok) return console.log(data)
        setAgencies(data);
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Add Complex</h4>
                            <p className={classes.cardCategoryWhite}>
                                Complete Complex profile
                            </p>
                        </CardHeader>
                        <Formik
                            initialValues={{
                                name: '',
                                address: '',
                                price_from: '',
                                price_to: '',
                                city: '',
                                country: 'Iraq',
                                number_of_building: '',
                                number_of_villa: '',
                                services: {
                                    electric: 0,
                                    water_resources: 0,
                                    rubbish: 0,
                                    security_hours: '',
                                },
                                supported_sales: [],
                                amenities: {
                                    car_parking: false,
                                    gardens: false,
                                    primary_school: false,
                                    kindergarten: false,
                                    health_centre: false,
                                    shopping_mall: false,
                                    markets: false,
                                    restaurant: false,
                                    cafe: false,
                                    pharmacy: false,
                                    laundery: false,
                                    gym: false,
                                    barbershop: false,
                                    beauty_center: false,
                                    kids_entertainment: false,
                                    nursery: false,
                                    clinic: false,
                                    bakery: false,
                                    gift_store: false,
                                    electronic_shops: false,
                                    stationary: false,
                                    sweet_shop: false,
                                    mosque: false,
                                    school: false,
                                    hospital: false,
                                    shopping: false,
                                    garden: false,
                                },
                                gps: {
                                    long: '',
                                    lat: '',
                                },
                            }}
                            onSubmit={handleSubmits}
                            validationSchema={validationSchema}
                        >
                            {({handleSubmit, handleChange, handleBlur, values, errors, setFieldValue}) => (
                                <form onSubmit={handleSubmit}>
                                    <CardBody>
                                        {agencies.length > 0 &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <Autocomplete
                                                    multiple
                                                    id="combo-box-demo"
                                                    sx={{width: 300}}
                                                    filterSelectedOptions
                                                    getOptionLabel={(option) => option.name + " " + option.city}
                                                    renderOption={(props, option) => (
                                                        <Box key={option.id} component="li"
                                                             sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                                            {option.name} <strong
                                                            style={{marginLeft: '5px'}}>{option.city}</strong>
                                                        </Box>
                                                    )}
                                                    onChange={(e, v) => {
                                                        const ids = v.map(a => a.id);
                                                        setFieldValue('supported_sales', ids);
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField {...params} label="Agency"/>
                                                    }
                                                    options={agencies}/>
                                            </GridItem>
                                        </GridContainer>
                                        }
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    type="text"
                                                    labelText="Name"
                                                    id="agency-name"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'name',
                                                        onBlur: handleBlur,
                                                        value: values.name
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Address"
                                                    id="address"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'address',
                                                        onBlur: handleBlur,
                                                        value: values.address
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    labelText="Email address"
                                                    id="email-address"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'email',
                                                        onBlur: handleBlur,
                                                        value: values.email
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    labelText="Price from"
                                                    id="price_from"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'price_from',
                                                        onBlur: handleBlur,
                                                        value: values.price_from,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    labelText="Price to"
                                                    id="price_to"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'price_to',
                                                        onBlur: handleBlur,
                                                        value: values.price_to,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    labelText="Number of buildings"
                                                    id="number_of_building"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'number_of_building',
                                                        onBlur: handleBlur,
                                                        value: values.number_of_building,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="City"
                                                    id="city"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'city',
                                                        onBlur: handleBlur,
                                                        value: values.city
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Number of villa"
                                                    id="number_of_villa"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'number_of_villa',
                                                        onBlur: handleBlur,
                                                        value: values.number_of_villa,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Country"
                                                    id="country"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'country',
                                                        onBlur: handleBlur,
                                                        value: values.country,
                                                        disabled: true,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <h3>Services</h3>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Electric"
                                                    id="electric"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'services.electric',
                                                        onBlur: handleBlur,
                                                        value: values.services.electric,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Water resources"
                                                    id="water_resources"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'services.water_resources',
                                                        onBlur: handleBlur,
                                                        value: values.services.water_resources,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Rubbish"
                                                    id="rubbish"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'services.rubbish',
                                                        onBlur: handleBlur,
                                                        value: values.services.rubbish,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Security hours"
                                                    id="security_hours"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'services.security_hours',
                                                        onBlur: handleBlur,
                                                        value: values.services.security_hours,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <h3>Amenities</h3>
                                        <GridContainer>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Car Parking?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.car_parking}
                                                    checked={values.amenities.car_parking}
                                                    onBlur={handleBlur}
                                                    name='amenities.car_parking'
                                                    title={'Car parking?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>gardens?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.gardens}
                                                    checked={values.amenities.gardens}
                                                    onBlur={handleBlur}
                                                    name='amenities.gardens'
                                                    title={'gardens?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Primary school?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.primary_school}
                                                    checked={values.amenities.primary_school}
                                                    onBlur={handleBlur}
                                                    name='amenities.primary_school'
                                                    title={'Primary school?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Kindergarten?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.kindergarten}
                                                    checked={values.amenities.kindergarten}
                                                    onBlur={handleBlur}
                                                    name='amenities.kindergarten'
                                                    title={'Kindergarten?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Health centre?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.health_centre}
                                                    checked={values.amenities.health_centre}
                                                    onBlur={handleBlur}
                                                    name='amenities.health_centre'
                                                    title={'Health centre?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Shopping mall?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.shopping_mall}
                                                    checked={values.amenities.shopping_mall}
                                                    onBlur={handleBlur}
                                                    name='amenities.shopping_mall'
                                                    title={'Shopping mall?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Markets?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.markets}
                                                    checked={values.amenities.markets}
                                                    onBlur={handleBlur}
                                                    name='amenities.markets'
                                                    title={'Markets?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Restaurant?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.restaurant}
                                                    checked={values.amenities.restaurant}
                                                    onBlur={handleBlur}
                                                    name='amenities.restaurant'
                                                    title={'Restaurant?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Cafe?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.cafe}
                                                    checked={values.amenities.cafe}
                                                    onBlur={handleBlur}
                                                    name='amenities.cafe'
                                                    title={'Cafe?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>pharmacy?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.pharmacy}
                                                    checked={values.amenities.pharmacy}
                                                    onBlur={handleBlur}
                                                    name='amenities.pharmacy'
                                                    title={'Pharmacy?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Laundery?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.laundery}
                                                    checked={values.amenities.laundery}
                                                    onBlur={handleBlur}
                                                    name='amenities.laundery'
                                                    title={'Laundery?'}
                                                />
                                            </GridItem>


                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Gym?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.gym}
                                                    checked={values.amenities.gym}
                                                    onBlur={handleBlur}
                                                    name='amenities.gym'
                                                    title={'Gym?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Barbershop?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.barbershop}
                                                    checked={values.amenities.barbershop}
                                                    onBlur={handleBlur}
                                                    name='amenities.barbershop'
                                                    title={'Barbershop?'}
                                                />
                                            </GridItem>


                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Beauty center?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.beauty_center}
                                                    checked={values.amenities.beauty_center}
                                                    onBlur={handleBlur}
                                                    name='amenities.beauty_center'
                                                    title={'Beauty center?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Kids entertainment?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.kids_entertainment}
                                                    checked={values.amenities.kids_entertainment}
                                                    onBlur={handleBlur}
                                                    name='amenities.kids_entertainment'
                                                    title={'Kids entertainment?'}
                                                />
                                            </GridItem>

                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Nursery?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.nursery}
                                                    checked={values.amenities.nursery}
                                                    onBlur={handleBlur}
                                                    name='amenities.nursery'
                                                    title={'Nursery?'}
                                                />
                                            </GridItem>


                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Clinic?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.clinic}
                                                    checked={values.amenities.clinic}
                                                    onBlur={handleBlur}
                                                    name='amenities.clinic'
                                                    title={'Clinic?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Bakery?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.bakery}
                                                    checked={values.amenities.bakery}
                                                    onBlur={handleBlur}
                                                    name='amenities.bakery'
                                                    title={'Bakery?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Gift store?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.gift_store}
                                                    checked={values.amenities.gift_store}
                                                    onBlur={handleBlur}
                                                    name='amenities.gift_store'
                                                    title={'Gift store?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Electronic shops?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.electronic_shops}
                                                    checked={values.amenities.electronic_shops}
                                                    onBlur={handleBlur}
                                                    name='amenities.electronic_shops'
                                                    title={'Electronic shops?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Stationary?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.stationary}
                                                    checked={values.amenities.stationary}
                                                    onBlur={handleBlur}
                                                    name='amenities.stationary'
                                                    title={'Stationary?'}
                                                />
                                            </GridItem>


                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Sweets shop?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.sweet_shop}
                                                    checked={values.amenities.sweet_shop}
                                                    onBlur={handleBlur}
                                                    name='amenities.sweet_shop'
                                                    title={'Sweet shop?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Mosque?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.mosque}
                                                    checked={values.amenities.mosque}
                                                    onBlur={handleBlur}
                                                    name='amenities.mosque'
                                                    title={'Mosque?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>School?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.school}
                                                    checked={values.amenities.school}
                                                    onBlur={handleBlur}
                                                    name='amenities.school'
                                                    title={'School?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Hospital?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.hospital}
                                                    checked={values.amenities.hospital}
                                                    onBlur={handleBlur}
                                                    name='amenities.hospital'
                                                    title={'Hospital?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Shopping?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.shopping}
                                                    checked={values.amenities.shopping}
                                                    onBlur={handleBlur}
                                                    name='amenities.shopping'
                                                    title={'Shopping?'}
                                                />
                                            </GridItem>

                                            <GridItem xs={6} sm={4} md={3}>
                                                <label>Garden?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.amenities.garden}
                                                    checked={values.amenities.garden}
                                                    onBlur={handleBlur}
                                                    name='amenities.garden'
                                                    title={'Garden?'}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Long"
                                                    id="long"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'gps.long',
                                                        onBlur: handleBlur,
                                                        value: values.gps.long
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Lat"
                                                    id="lat"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'gps.lat',
                                                        onBlur: handleBlur,
                                                        value: values.gps.lat
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <input
                                                    style={{display: 'none'}}
                                                    id="raised-button-file"
                                                    multiple
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        if (event.target.files && event.target.files[0]) {
                                                            let img = event.target.files[0];
                                                            setIcon(URL.createObjectURL(img))
                                                            setIconObj(img);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="raised-button-file">
                                                    <Button variant="raised" component="span">
                                                        Upload
                                                    </Button>
                                                </label>
                                            </GridItem>
                                        </GridContainer>
                                        {icon &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                {/*onChange={handleChange} name={'icon'}*/}
                                                <div style={{position: 'relative'}}>
                                                    <Delete onClick={() => {
                                                        setIcon('');
                                                        setIconObj(null);
                                                    }} style={{
                                                        position: 'absolute',
                                                        zIndex: 10,
                                                        right: 10,
                                                        cursor: 'pointer'
                                                    }} color={'error'}/>
                                                    <Image src={icon}/>
                                                </div>

                                            </GridItem>
                                        </GridContainer>
                                        }
                                    </CardBody>
                                    <CardFooter>
                                        <Button round color="primary" onClick={handleSubmit}>Save Agency</Button>
                                        <Button color="transparent" onClick={() => history.goBack()}>cancel</Button>
                                    </CardFooter>
                                </form>
                            )}
                        </Formik>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default AddComplex;