import React, { useState } from "react";
import { useHistory } from "react-router";
import { Formik } from "formik";
import Image from "material-ui-image";
import * as Yup from "yup";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import agencyApi from "../../../api/agency/agency";
import { Delete } from "@material-ui/icons";
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

const AddAgency = () => {
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [iconObj, setIconObj] = useState(null);

  const [headerPhoto, setHeaderPhoto] = useState("");
  const [headerPhotoObj, setHeaderPhotoObj] = useState(null);

  const history = useHistory();
  const classes = useStyles();

  const handleSubmits = async (values, actions) => {
    setLoading(true);
    const { data, ok, problem } = await agencyApi.newAgency(values);
    if (!ok) {
      setLoading(false);
      console.log("Error", problem);
    } else {
      uploadIcon(data.id).then(() => {
        history.goBack();
        setLoading(false);
      });
    }
    setLoading(false);
  };
  const uploadIcon = async (agencyID) => {
    const { data, ok, problem } = await agencyApi.uploadImage(
      iconObj,
      agencyID,
      headerPhotoObj
    );
    if (!ok) console.log("Error", problem);
    else {
    }
  };

  if (loading) return "loading";
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Agency</h4>
              <p className={classes.cardCategoryWhite}>
                Complete agency profile
              </p>
            </CardHeader>
            <Formik
              initialValues={{
                name: "",
                address: "",
                email: "",
                phone_number: "",
                whatsapp_number: "",
                viber_number: "",
                city: "",
                country: "Iraq",
                gps: {
                  long: "",
                  lat: "",
                },
                description: "",
              }}
              onSubmit={handleSubmits}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          type="text"
                          labelText="Agency Name"
                          id="agency-name"
                          inputProps={{
                            onChange: handleChange,
                            name: "name",
                            onBlur: handleBlur,
                            value: values.name,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                        {errors.agencyName && <p>{errors.agencyName}</p>}
                        {errors.address && <p>{errors.address}</p>}
                        {errors.email && <p>{errors.email}</p>}
                        {errors.agencyName && <p>{errors.agencyName}</p>}
                        {errors.agencyName && <p>{errors.agencyName}</p>}
                        {errors.agencyName && <p>{errors.agencyName}</p>}
                        {errors.agencyName && <p>{errors.agencyName}</p>}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Address"
                          id="address"
                          inputProps={{
                            onChange: handleChange,
                            name: "address",
                            onBlur: handleBlur,
                            value: values.address,
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
                            name: "email",
                            onBlur: handleBlur,
                            value: values.email,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Phone Number"
                          id="Phone-number"
                          inputProps={{
                            onChange: handleChange,
                            name: "phone_number",
                            onBlur: handleBlur,
                            value: values.phone_number,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Whatsapp Number"
                          id="whatsapp-number"
                          inputProps={{
                            onChange: handleChange,
                            name: "whatsapp_number",
                            onBlur: handleBlur,
                            value: values.whatsapp_number,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Viber Number"
                          id="viber-number"
                          inputProps={{
                            onChange: handleChange,
                            name: "viber_number",
                            onBlur: handleBlur,
                            value: values.viber_number,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Background Color"
                          id="background-color"
                          inputProps={{
                            onChange: handleChange,
                            name: "background_color",
                            onBlur: handleBlur,
                            value: values.background_color,
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
                            name: "city",
                            onBlur: handleBlur,
                            value: values.city,
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
                            name: "country",
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
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Long"
                          id="long"
                          inputProps={{
                            onChange: handleChange,
                            name: "gps.long",
                            onBlur: handleBlur,
                            value: values.gps.long,
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
                            name: "gps.lat",
                            onBlur: handleBlur,
                            value: values.gps.lat,
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
                            name: "description",
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
                          style={{ display: "none" }}
                          id="raised-button-file"
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                              let img = event.target.files[0];
                              setIcon(URL.createObjectURL(img));
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
                    {icon && (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <div style={{ position: "relative" }}>
                            <Delete
                              onClick={() => {
                                setIcon("");
                                setIconObj(null);
                              }}
                              style={{
                                position: "absolute",
                                zIndex: 10,
                                right: 10,
                                cursor: "pointer",
                              }}
                              color={"error"}
                            />
                            <Image src={icon} />
                          </div>
                        </GridItem>
                      </GridContainer>
                    )}

                    {/* Header Photo */}

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <input
                          style={{ display: "none" }}
                          id="raised-button-header-file"
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                              let img = event.target.files[0];
                              setHeaderPhoto(URL.createObjectURL(img));
                              setHeaderPhotoObj(img);
                            }
                          }}
                        />
                        <label htmlFor="raised-button-header-file">
                          <Button variant="raised" component="span">
                            Upload Header Photo
                          </Button>
                        </label>
                      </GridItem>
                    </GridContainer>
                    {headerPhoto && (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <div style={{ position: "relative" }}>
                            <Delete
                              onClick={() => {
                                setHeaderPhoto("");
                                setHeaderPhotoObj(null);
                              }}
                              style={{
                                position: "absolute",
                                zIndex: 10,
                                right: 10,
                                cursor: "pointer",
                              }}
                              color={"error"}
                            />
                            <Image src={headerPhoto} />
                          </div>
                        </GridItem>
                      </GridContainer>
                    )}

                    {/* *************************** */}
                  </CardBody>
                  <CardFooter>
                    <Button round color="primary" onClick={handleSubmit}>
                      Save Agency
                    </Button>
                    <Button
                      color="transparent"
                      onClick={() => history.goBack()}
                    >
                      cancel
                    </Button>
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

// const AddAgency = withFormik({
//   // mapPropsToValues: () => ({
//   //   agencyName: "vsdvsd",
//   // }),
//   validationSchema: Yup.object().shape({
//     agencyName: Yup.string().required().min(5)
//   }),
//   enableReinitialize: true,
//   handleSubmit: (values, {props, setSubmitting}) => {
//     console.log(values)
//   },
// })(InnerAddAgency)

export default AddAgency;

/*
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/marc.jpg";
<GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */
