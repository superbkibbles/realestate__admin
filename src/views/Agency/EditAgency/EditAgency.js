import React, {useEffect, useState} from "react";
import {Formik} from "formik";
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
import {Delete} from "@material-ui/icons";
import Image from "material-ui-image";
import agency from "../../../api/agency/agency";

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
    // phone_number: Yup.string().required(),
    // whatsapp_number: Yup.string().required(),
    // viber_number: Yup.string().required(),
    // city: Yup.string().required(),
    // country: Yup.string().required(),
    // gps: Yup.object().shape({
    //     long: Yup.string().required(),
    //     lat: Yup.string().required(),
    // }),
});


const useStyles = makeStyles(styles);

const EditAgency = ({match, history}) => {
    const [agency, setAgency] = useState({});
    const [icon, setIcon] = useState('');
    const [iconObj, setIconObj] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        getAgencyByID();
    }, []);

    const getAgencyByID = async () => {
        const {data, ok} = await agencyApi.getAgencyByID(match.params.agencyId)
        if (!ok) return console.log(data)
        setAgency(data);
    }
    const handleSubmits = async (values, actions) => {
        const fields = Object.entries(values).map(([key, value]) => ({field: key, value: value}));
        const {data, ok} = await agencyApi.updateAgency(agency.id, fields);
        if (!ok) return console.log(data);
        if (agency.icon && iconObj) deleteIcon();
        if (iconObj) return uploadIcon(data.id).then(() => {
            history.goBack();
        });
        history.goBack();
    }

    const deleteIcon = async () => {
        const {data, ok} = await agencyApi.deleteIcon(agency.id)
        if (!ok) return console.log(data)
    }

    const uploadIcon = async (agencyID) => {
        console.log(agencyID);
        const {data, ok, problem} = await agencyApi.uploadImage(iconObj, agencyID);
        if (!ok) console.log('Error', problem)
        else {

        }
    }

    if (!agency.id) return 'loading'
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Edit Agency</h4>
                            <p className={classes.cardCategoryWhite}>
                                Complete agency profile
                            </p>
                        </CardHeader>
                        <Formik
                            enableReinitialize
                            initialValues={agency}
                            onSubmit={handleSubmits}
                            validationSchema={validationSchema}
                        >
                            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
                                <form onSubmit={handleSubmit}>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    error={errors.name && touched.name}
                                                    success={touched.name && !errors.name}
                                                    type="text"
                                                    labelText="Agency Name"
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
                                                    error={errors.address && touched.address}
                                                    success={touched.address && !errors.address}
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
                                                    error={errors.email && touched.email}
                                                    success={touched.email && !errors.email}
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
                                                    error={errors.phone_number && touched.phone_number}
                                                    success={touched.phone_number && !errors.phone_number}
                                                    labelText="Phone Number"
                                                    id="Phone-number"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'phone_number',
                                                        onBlur: handleBlur,
                                                        value: values.phone_number
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    error={errors.whatsapp_number && touched.whatsapp_number}
                                                    success={touched.whatsapp_number && !errors.whatsapp_number}
                                                    labelText="Whatsapp Number"
                                                    id="whatsapp-number"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'whatsapp_number',
                                                        onBlur: handleBlur,
                                                        value: values.whatsapp_number
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    error={errors.viber_number && touched.viber_number}
                                                    success={touched.viber_number && !errors.viber_number}
                                                    labelText="Viber Number"
                                                    id="viber-number"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'viber_number',
                                                        onBlur: handleBlur,
                                                        value: values.viber_number
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
                                                        value: values.country
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
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="description"
                                                    id="description"
                                                    inputProps={{
                                                        onChange: handleChange,
                                                        name: 'description',
                                                        onBlur: handleBlur,
                                                        value: values.description,
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
                                                        Change Icon
                                                    </Button>
                                                </label>
                                            </GridItem>
                                        </GridContainer>
                                        {icon &&
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
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

                                        {
                                            agency.icon && !icon &&
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={4}>
                                                    <Image
                                                        src={agency.icon}/>
                                                </GridItem>
                                                {/*<div style={{position: 'relative'}}>*/}
                                                {/*    <Delete onClick={() => {*/}
                                                {/*        setIcon('');*/}
                                                {/*        setIconObj(null);*/}
                                                {/*    }} style={{*/}
                                                {/*        position: 'absolute',*/}
                                                {/*        zIndex: 10,*/}
                                                {/*        right: 10,*/}
                                                {/*        cursor: 'pointer'*/}
                                                {/*    }} color={'error'}/>*/}
                                                {/*</div>*/}
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

export default EditAgency;
