import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import Image from 'material-ui-image';
import * as Yup from 'yup';

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Autocomplete, Box, Container, TextField} from "@mui/material";
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
import complexApi from "../../../api/complex/complex";
import propertyApi from "../../../api/property/property";

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
    // description: Yup.string().required(),
    // title: Yup.string().required(),
    // floor_number: Yup.number().required(),
    // building_number: Yup.string().required(),
    // direction_face: Yup.string().required(),
    // built_year: Yup.string().matches(/^\d+$/, 'The field should have digits only').min(4).max(4).required(),
    // city: Yup.string().required(),
    // country: Yup.string().required(),
    // property_type: Yup.string().required(),
    // price: Yup.number().required(),
    // currency: Yup.string().required(),
    // rooms: Yup.number().required(),
    // bathrooms: Yup.number().required(),
    // bedrooms: Yup.number().required(),
    // living_rooms: Yup.number().required(),
    // hall: Yup.number().required(),
    // balcony: Yup.number().required(),
    // kitchen: Yup.number().required(),
    // property_kind: Yup.string().required(),
    // space: Yup.number().required(),
    // area: Yup.number().required(),
    // gps: Yup.object().shape({
    //     long: Yup.string().required(),
    //     lat: Yup.string().required(),
    // }),
    // location: Yup.string().required(),
    // building_size: Yup.number().required(),
    // property_no: Yup.string().required(),
    // near_schools: Yup.object().shape({
    //     name: Yup.string().required()
    // }),
    // for_rent: Yup.boolean(),
});


const useStyles = makeStyles(styles);


const NewProperty = ({history}) => {
    const [iconObj, setIconObj] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [complexes, setComplexes] = useState([]);
    const [mainPic, setMainPic] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        getAllAgencies();
        getAllComplexes();
    }, []);

    const getAllAgencies = async () => {
        const {data, ok} = await agencyApi.getAllAgencies();
        if (!ok) return console.log(data)
        setAgencies(data);
    }

    const getAllComplexes = async () => {
        const {data, ok} = await complexApi.getAllComplexes();
        if (!ok) return console.log(data)
        setComplexes(data);
    }

    const handleSubmits = async (values, actions) => {
        const {data, ok} = await propertyApi.newProperty(values);
        if (!ok) {
            return console.log(data)
        }
        uploadMainPic(data.id)
        uploadIcon(data.id).then(() => {
            history.goBack();
        });
    };

    const uploadMainPic = async (propertyId) => {
        if (mainPic) {
            const {data, ok} = await propertyApi.uploadMainPic(propertyId, mainPic);
            if (!ok) return console.log('Error', data)
        }
    }

    const uploadIcon = async (propertyID) => {
        if (iconObj.length > 0) {
            console.log('bigger')
            const {data, ok} = await propertyApi.uploadMedia(propertyID, iconObj);
            if (!ok) return console.log('Error', data)
        }
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Add Property</h4>
                            <p className={classes.cardCategoryWhite}>
                                Complete Property
                            </p>
                        </CardHeader>
                        <Formik
                            initialValues={{
                                description: '',
                                title: '',
                                floor_number: '',
                                building_number: '',
                                direction_face: '',
                                built_year: '',
                                city: '',
                                country: 'Iraq',
                                property_type: '',
                                price: '',
                                currency: '$',
                                rooms: '',
                                bedrooms: '',
                                bathrooms: '',
                                living_rooms: '',
                                hall: '',
                                balcony: '',
                                kitchen: '',
                                property_kind: '',
                                space: '',
                                area: '',
                                location: '',
                                building_size: '',
                                gps: {
                                    long: '',
                                    lat: '',
                                },
                                property_no: '',
                                for_rent: false,
                                agency_id: '',
                                complex_id: '',
                                category: '',
                                is_new: false,
                                promoted: false,
                            }}
                            onSubmit={handleSubmits}
                            validationSchema={validationSchema}
                        >
                            {({handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue}) => (
                                <form onSubmit={handleSubmit}>
                                    <CardBody>
                                        <GridContainer>
                                            {agencies.length > 0 &&
                                            <GridItem xs={12} sm={12} md={6}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    sx={{width: 300}}
                                                    getOptionLabel={(option) => option.name + " " + option.city}
                                                    renderOption={(props, option) => (
                                                        <Box key={option.id} component="li"
                                                             sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                                            {option.name} <strong
                                                            style={{marginLeft: '5px'}}>{option.city}</strong>
                                                        </Box>
                                                    )}
                                                    onChange={(e, v) => setFieldValue('agency_id', v.id)}
                                                    renderInput={(params) =>
                                                        <TextField {...params} label="Agency"/>
                                                    }
                                                    options={agencies}/>
                                            </GridItem>
                                            }
                                            {complexes.length > 0 &&
                                            <GridItem xs={12} sm={12} md={6}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    sx={{width: 300}}
                                                    getOptionLabel={(option) => option.name + " " + option.city}
                                                    renderOption={(props, option) => (
                                                        <Box key={option.id} component="li"
                                                             sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                                            {option.name} <strong
                                                            style={{marginLeft: '5px'}}>{option.city}</strong>
                                                        </Box>
                                                    )}
                                                    onChange={(e, v) => setFieldValue('complex_id', v.id)}
                                                    renderInput={(params) =>
                                                        <TextField {...params} label="Complex"/>
                                                    }
                                                    options={complexes}/>
                                            </GridItem>
                                            }

                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    error={errors.description && touched.description}
                                                    success={touched.description && !errors.description}
                                                    type="text"
                                                    labelText="description"
                                                    id="description"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'description',
                                                        onBlur: handleBlur,
                                                        value: values.description
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    error={errors.title && touched.title}
                                                    success={touched.title && !errors.title}
                                                    labelText="title"
                                                    id="title"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'title',
                                                        onBlur: handleBlur,
                                                        value: values.title
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
                                                    error={errors.floor_number && touched.floor_number}
                                                    success={touched.floor_number && !errors.floor_number}
                                                    labelText="Floor Number"
                                                    id="floor-number"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'floor_number',
                                                        onBlur: handleBlur,
                                                        value: values.floor_number,
                                                        type: 'number'
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    error={errors.building_number && touched.building_number}
                                                    success={touched.building_number && !errors.building_number}
                                                    labelText="Building Number"
                                                    id="building-number"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'building_number',
                                                        onBlur: handleBlur,
                                                        value: values.building_number
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    error={errors.direction_face && touched.direction_face}
                                                    success={touched.direction_face && !errors.direction_face}
                                                    labelText="Direction Face"
                                                    id="direction-face"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'direction_face',
                                                        onBlur: handleBlur,
                                                        value: values.direction_face
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    error={errors.built_year && touched.built_year}
                                                    success={touched.built_year && !errors.built_year}
                                                    labelText="Built Year"
                                                    id="built-year"
                                                    type={'number'}
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'built_year',
                                                        onBlur: handleBlur,
                                                        value: values.built_year,
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
                                                    error={errors.city && touched.city}
                                                    success={touched.city && !errors.city}
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
                                                    error={errors.country && touched.country}
                                                    success={touched.country && !errors.country}
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

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.property_type && touched.property_type}
                                                    success={touched.property_type && !errors.property_type}
                                                    labelText="Property Type"
                                                    id="property_type"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'property_type',
                                                        onBlur: handleBlur,
                                                        value: values.property_type,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                                <CustomInput
                                                    error={errors.currency && touched.currency}
                                                    success={touched.currency && !errors.currency}
                                                    labelText="Currency"
                                                    id="currency"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'currency',
                                                        onBlur: handleBlur,
                                                        value: values.currency,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.price && touched.price}
                                                    success={touched.price && !errors.price}
                                                    labelText="Price"
                                                    id="price"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'price',
                                                        onBlur: handleBlur,
                                                        value: values.price,
                                                        type: 'number'
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.rooms && touched.rooms}
                                                    success={touched.rooms && !errors.rooms}
                                                    labelText="Rooms"
                                                    id="rooms"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'rooms',
                                                        onBlur: handleBlur,
                                                        value: values.rooms,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.bedrooms && touched.bedrooms}
                                                    success={touched.bedrooms && !errors.bedrooms}
                                                    labelText="Bedrooms"
                                                    id="bedrooms"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'bedrooms',
                                                        onBlur: handleBlur,
                                                        value: values.bedrooms,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.bathrooms && touched.bathrooms}
                                                    success={touched.bathrooms && !errors.bathrooms}
                                                    labelText="Bathrooms"
                                                    id="bathrooms"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'bathrooms',
                                                        onBlur: handleBlur,
                                                        value: values.bathrooms,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.living_rooms && touched.living_rooms}
                                                    success={touched.living_rooms && !errors.living_rooms}
                                                    labelText="Living Rooms"
                                                    id="living_rooms"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'living_rooms',
                                                        onBlur: handleBlur,
                                                        value: values.living_rooms,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.hall && touched.hall}
                                                    success={touched.hall && !errors.hall}
                                                    labelText="Hall"
                                                    id="hall"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'hall',
                                                        onBlur: handleBlur,
                                                        value: values.hall,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.balcony && touched.balcony}
                                                    success={touched.balcony && !errors.balcony}
                                                    labelText="Balcony"
                                                    id="balcony"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'balcony',
                                                        onBlur: handleBlur,
                                                        value: values.balcony,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.kitchen && touched.kitchen}
                                                    success={touched.kitchen && !errors.kitchen}
                                                    labelText="Kitchen"
                                                    id="kitchen"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'kitchen',
                                                        onBlur: handleBlur,
                                                        value: values.kitchen,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.property_kind && touched.property_kind}
                                                    success={touched.property_kind && !errors.property_kind}
                                                    labelText="Property Kind"
                                                    id="property_kind"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'property_kind',
                                                        onBlur: handleBlur,
                                                        value: values.property_kind,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.space && touched.space}
                                                    success={touched.space && !errors.space}
                                                    labelText="Space"
                                                    id="space"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'space',
                                                        onBlur: handleBlur,
                                                        value: values.space,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.building_size && touched.building_size}
                                                    success={touched.building_size && !errors.building_size}
                                                    labelText="Building Size"
                                                    id="building_size"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'building_size',
                                                        onBlur: handleBlur,
                                                        value: values.building_size,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.area && touched.area}
                                                    success={touched.area && !errors.area}
                                                    labelText="Area"
                                                    id="area"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'area',
                                                        onBlur: handleBlur,
                                                        value: values.area,
                                                        type: 'number',
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.location && touched.location}
                                                    success={touched.location && !errors.location}
                                                    labelText="Location"
                                                    id="location"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'location',
                                                        onBlur: handleBlur,
                                                        value: values.location,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.property_no && touched.property_no}
                                                    success={touched.property_no && !errors.property_no}
                                                    labelText="Property No"
                                                    id="property_no"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'property_no',
                                                        onBlur: handleBlur,
                                                        value: values.property_no,
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <label>For Rent?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.for_rent}
                                                    onBlur={handleBlur}
                                                    name='for_rent'
                                                    title={'For Rent'}
                                                />
                                                {/*<CustomInput*/}
                                                {/*    labelText="For Rent?"*/}
                                                {/*    id="for_rent"*/}
                                                {/*    inputProps={{*/}
                                                {/*        onChange: handleChange,*/}
                                                {/*        name: 'for_rent',*/}
                                                {/*        onBlur: handleBlur,*/}
                                                {/*        value: values.for_rent,*/}
                                                {/*        type: 'checkbox'*/}
                                                {/*    }}*/}
                                                {/*    formControlProps={{*/}
                                                {/*        fullWidth: true,*/}
                                                {/*    }}*/}
                                                {/*/>*/}
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <label>Is New?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.is_new}
                                                    checked={values.is_new}
                                                    onBlur={handleBlur}
                                                    name='is_new'
                                                    title={'Is New?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <label>Is Commercial?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.is_commercial}
                                                    checked={values.is_commercial}
                                                    onBlur={handleBlur}
                                                    name='is_commercial'
                                                    title={'Is Commercial?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <label>Is Promoted?</label>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={values.promoted}
                                                    checked={values.promoted}
                                                    onBlur={handleBlur}
                                                    name='promoted'
                                                    title={'Is Promoted?'}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="category"
                                                    sx={{width: 300}}
                                                    value={values.category}
                                                    getOptionLabel={(option) => option}
                                                    renderOption={(props, option) => (
                                                        <Box
                                                            key={option.id}
                                                            component="li"
                                                            sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}
                                                        >
                                                            {option}
                                                        </Box>
                                                    )}
                                                    onChange={(e, v) => setFieldValue('category', v)}
                                                    renderInput={(params) =>
                                                        <TextField {...params} label="Category"/>
                                                    }
                                                    options={['house', 'villa', 'land', 'farm', 'apartment']}/>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    error={errors.gps && touched.gps}
                                                    success={touched.gps && !errors.gps}
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
                                                    error={errors.gps && touched.gps}
                                                    success={touched.gps && !errors.gps}
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
                                            <Container>
                                                <h3>Main Property Photo</h3>
                                            </Container>
                                            <GridItem xs={12} sm={12} md={4}>
                                                {
                                                    mainPic &&
                                                    <div style={{position: 'relative'}}>
                                                        <Delete onClick={() => {
                                                            setMainPic(null)
                                                        }} style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            right: 10,
                                                            cursor: 'pointer'
                                                        }} color={'error'}/>
                                                        <Image src={URL.createObjectURL(mainPic)}/>
                                                    </div>
                                                }

                                                <input
                                                    style={{display: 'none'}}
                                                    id="main_pic"
                                                    multiple
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        if (event.target.files && event.target.files[0]) {
                                                            let img = event.target.files[0];
                                                            setMainPic(img);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="main_pic">
                                                    <Button variant="raised" component="span" color={'success'}>
                                                        upload Main Picture
                                                    </Button>
                                                </label>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <input
                                                    style={{display: 'none'}}
                                                    id="raised-button-file"
                                                    multiple
                                                    type="file"
                                                    accept="image/*,video/mp4,video/x-m4v,video/*"
                                                    onChange={(event) => {
                                                        if (event.target.files && event.target.files[0]) {
                                                            let img = event.target.files[0];
                                                            setIconObj([...iconObj, img]);
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
                                        <GridContainer>
                                            {iconObj.map((img) => (
                                                <GridItem key={URL.createObjectURL(img)} xs={12} sm={12} md={4}>
                                                    {/*onChange={handleChange} name={'icon'}*/}
                                                    <div style={{position: 'relative'}}>
                                                        <Delete onClick={() => {
                                                            setIconObj(iconObj.filter(i => i !== img))
                                                        }} style={{
                                                            position: 'absolute',
                                                            zIndex: 10,
                                                            right: 10,
                                                            cursor: 'pointer'
                                                        }} color={'error'}/>
                                                        {
                                                            img.type.includes('video') ?
                                                                <video controls width="250">
                                                                    <source src={URL.createObjectURL(img)}
                                                                            type={'video/webm'}/>
                                                                </video> :
                                                                <Image src={URL.createObjectURL(img)}/>
                                                        }
                                                    </div>

                                                </GridItem>
                                            ))
                                            }
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button round color="primary" onClick={handleSubmit}>Save Property</Button>
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
};

export default NewProperty;