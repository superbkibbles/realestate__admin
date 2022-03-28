import React, { useEffect, useState } from "react";

import agencyApi from "../../../api/agency/agency";
import complexApi from "../../../api/complex/complex";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import { Formik } from "formik";
import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import { Delete } from "@material-ui/icons";
import Image from "material-ui-image";
import CardFooter from "../../../components/Card/CardFooter";
import * as Yup from "yup";
import { Checkbox, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete, Box, TextField } from "@mui/material";

const validationSchema = Yup.object().shape({});
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

const useStyles = makeStyles(styles);

const EditComplex = ({ match, history }) => {
  const [complex, setComplex] = useState({});
  const [icon, setIcon] = useState("");
  const [iconObj, setIconObj] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const classes = useStyles();

  const [arabicModal, setArabicModal] = useState(false);
  const [kurdishModal, setKurdishModal] = useState(false);
  const [lang, setLang] = useState("");

  useEffect(() => {
    getComplexByID();
    getAllAgencies();
  }, []);

  const getAllAgencies = async () => {
    const { data, ok } = await agencyApi.getAllAgencies();
    if (!ok) return console.log(data);
    setAgencies(data);
  };

  const getComplexByID = async () => {
    const { data, ok } = await complexApi.getComplexByID(
      match.params.complexId
    );
    if (!ok) return console.log(data);
    setComplex(data);
  };
  const handleSubmits = async (values) => {
    const fields = Object.entries(values).map(([key, value]) => ({
      field: key,
      value: value,
    }));
    const { data, ok } = await complexApi.updateComplex(complex.id, fields);
    if (!ok) return console.log(data);
    if (complex.icon && iconObj) deleteIcon();
    if (iconObj)
      return uploadIcon(data.id).then(() => {
        history.goBack();
      });
    history.goBack();
  };

  const deleteIcon = async () => {
    const { data, ok } = await complexApi.deleteIcon(complex.id);
    if (!ok) return console.log(data);
  };

  const uploadIcon = async (complexID) => {
    const { data, ok } = await complexApi.uploadImage(iconObj, complexID);
    if (!ok) console.log("Error", data);
  };

  const handleArabicTranslation = async (values) => {
    const { data, ok } = await complexApi.translateComplex(
      complex.id,
      values,
      lang
    );
    if (!ok) {
      console.log(data);
    }
    setComplex(data)
    setArabicModal(false);
    setKurdishModal(false);
    setLang("");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  if (!complex.id) return "loading";
  return (
    <div>
      <Button
        round
        color="primary"
        onClick={() => {
          setLang("ar");
          setArabicModal(true);
        }}
      >
        Translate to Arabic
      </Button>
      <Button
        round
        color="info"
        onClick={() => {
          setLang("kur");
          setKurdishModal(true);
        }}
      >
        Translate to Kurdish
      </Button>

      <Modal
        open={arabicModal}
        onClose={() => setArabicModal(false)}
        aria-labelledby="modal-Arabic"
        aria-describedby="modal to set Arabic langugage"
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Arabic</h2>
          <Formik
            enableReinitialize
            initialValues={complex.ar}
            onSubmit={handleArabicTranslation}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleArabicTranslation}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Agency Name"
                        id="complex-name-ar"
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
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Description"
                        id="description-ar"
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
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Address"
                        id="address-ar"
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
                </CardBody>
                <CardFooter>
                  <Button round color="primary" onClick={handleSubmit}>
                    Translate
                  </Button>
                  <Button
                    color="transparent"
                    onClick={() => setArabicModal(false)}
                  >
                    cancel
                  </Button>
                </CardFooter>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Kurdish Translate */}
      <Modal
        open={kurdishModal}
        onClose={() => setKurdishModal(false)}
        aria-labelledby="modal-Arabic"
        aria-describedby="modal to set kurdish langugage"
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Kurdish</h2>
          <Formik
            enableReinitialize
            initialValues={complex.kur}
            onSubmit={handleArabicTranslation}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleArabicTranslation}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Agency Name"
                        id="complex-name-kur"
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
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Description"
                        id="description-kur"
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
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="text"
                        labelText="Address"
                        id="address-ar"
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
                </CardBody>
                <CardFooter>
                  <Button round color="primary" onClick={handleSubmit}>
                    Translate
                  </Button>
                  <Button
                    color="transparent"
                    onClick={() => setArabicModal(false)}
                  >
                    cancel
                  </Button>
                </CardFooter>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Complex</h4>
              <p className={classes.cardCategoryWhite}>
                Complete complex profile
              </p>
            </CardHeader>
            <Formik
              enableReinitialize
              initialValues={complex}
              onSubmit={handleSubmits}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        {agencies.length > 0 && (
                          <Autocomplete
                            multiple
                            id="combo-box-demo"
                            sx={{ width: 300 }}
                            defaultValue={() => {
                              const com = [];

                              agencies.forEach((a) => {
                                complex.supported_sales.forEach((id) => {
                                  if (a.id === id) com.push(a);
                                });
                              });
                              return com;
                            }}
                            filterSelectedOptions
                            getOptionLabel={(option) =>
                              option.name + " " + option.city
                            }
                            renderOption={(props, option) => (
                              <Box
                                key={option.id}
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.name}{" "}
                                <strong style={{ marginLeft: "5px" }}>
                                  {option.city}
                                </strong>
                              </Box>
                            )}
                            onChange={(e, v) => {
                              const ids = v.map((a) => a.id);
                              setFieldValue("supported_sales", ids);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label="Agency" />
                            )}
                            options={agencies}
                          />
                        )}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          type="text"
                          labelText="Name"
                          id="name"
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
                          labelText="Price from"
                          id="price_from"
                          inputProps={{
                            onChange: handleChange,
                            name: "price_from",
                            onBlur: handleBlur,
                            value: values.price_from,
                            type: "number",
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
                            name: "price_to",
                            onBlur: handleBlur,
                            value: values.price_to,
                            type: "number",
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
                            name: "number_of_building",
                            onBlur: handleBlur,
                            value: values.number_of_building,
                            type: "number",
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
                          labelText="Number of villa"
                          id="number_of_villa"
                          inputProps={{
                            onChange: handleChange,
                            name: "number_of_villa",
                            onBlur: handleBlur,
                            value: values.number_of_villa,
                            type: "number",
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
                    <h3>Services</h3>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Electric"
                          id="electric"
                          inputProps={{
                            onChange: handleChange,
                            name: "services.electric",
                            onBlur: handleBlur,
                            value: values.services.electric,
                            type: "number",
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
                            name: "services.water_resources",
                            onBlur: handleBlur,
                            value: values.services.water_resources,
                            type: "number",
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
                            name: "services.rubbish",
                            onBlur: handleBlur,
                            value: values.services.rubbish,
                            type: "number",
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
                            name: "services.security_hours",
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
                          name="amenities.car_parking"
                          title={"Car parking?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>gardens?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.gardens}
                          checked={values.amenities.gardens}
                          onBlur={handleBlur}
                          name="amenities.gardens"
                          title={"gardens?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Primary school?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.primary_school}
                          checked={values.amenities.primary_school}
                          onBlur={handleBlur}
                          name="amenities.primary_school"
                          title={"Primary school?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Kindergarten?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.kindergarten}
                          checked={values.amenities.kindergarten}
                          onBlur={handleBlur}
                          name="amenities.kindergarten"
                          title={"Kindergarten?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Health centre?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.health_centre}
                          checked={values.amenities.health_centre}
                          onBlur={handleBlur}
                          name="amenities.health_centre"
                          title={"Health centre?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Shopping mall?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.shopping_mall}
                          checked={values.amenities.shopping_mall}
                          onBlur={handleBlur}
                          name="amenities.shopping_mall"
                          title={"Shopping mall?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Markets?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.markets}
                          checked={values.amenities.markets}
                          onBlur={handleBlur}
                          name="amenities.markets"
                          title={"Markets?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Restaurant?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.restaurant}
                          checked={values.amenities.restaurant}
                          onBlur={handleBlur}
                          name="amenities.restaurant"
                          title={"Restaurant?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Cafe?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.cafe}
                          checked={values.amenities.cafe}
                          onBlur={handleBlur}
                          name="amenities.cafe"
                          title={"Cafe?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>pharmacy?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.pharmacy}
                          checked={values.amenities.pharmacy}
                          onBlur={handleBlur}
                          name="amenities.pharmacy"
                          title={"Pharmacy?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Laundery?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.laundery}
                          checked={values.amenities.laundery}
                          onBlur={handleBlur}
                          name="amenities.laundery"
                          title={"Laundery?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Gym?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.gym}
                          checked={values.amenities.gym}
                          onBlur={handleBlur}
                          name="amenities.gym"
                          title={"Gym?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Barbershop?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.barbershop}
                          checked={values.amenities.barbershop}
                          onBlur={handleBlur}
                          name="amenities.barbershop"
                          title={"Barbershop?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Beauty center?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.beauty_center}
                          checked={values.amenities.beauty_center}
                          onBlur={handleBlur}
                          name="amenities.beauty_center"
                          title={"Beauty center?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Kids entertainment?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.kids_entertainment}
                          checked={values.amenities.kids_entertainment}
                          onBlur={handleBlur}
                          name="amenities.kids_entertainment"
                          title={"Kids entertainment?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Nursery?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.nursery}
                          checked={values.amenities.nursery}
                          onBlur={handleBlur}
                          name="amenities.nursery"
                          title={"Nursery?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Clinic?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.clinic}
                          checked={values.amenities.clinic}
                          onBlur={handleBlur}
                          name="amenities.clinic"
                          title={"Clinic?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Bakery?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.bakery}
                          checked={values.amenities.bakery}
                          onBlur={handleBlur}
                          name="amenities.bakery"
                          title={"Bakery?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Gift store?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.gift_store}
                          checked={values.amenities.gift_store}
                          onBlur={handleBlur}
                          name="amenities.gift_store"
                          title={"Gift store?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Electronic shops?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.electronic_shops}
                          checked={values.amenities.electronic_shops}
                          onBlur={handleBlur}
                          name="amenities.electronic_shops"
                          title={"Electronic shops?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Stationary?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.stationary}
                          checked={values.amenities.stationary}
                          onBlur={handleBlur}
                          name="amenities.stationary"
                          title={"Stationary?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Sweets shop?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.sweet_shop}
                          checked={values.amenities.sweet_shop}
                          onBlur={handleBlur}
                          name="amenities.sweet_shop"
                          title={"Sweet shop?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Mosque?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.mosque}
                          checked={values.amenities.mosque}
                          onBlur={handleBlur}
                          name="amenities.mosque"
                          title={"Mosque?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>School?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.school}
                          checked={values.amenities.school}
                          onBlur={handleBlur}
                          name="amenities.school"
                          title={"School?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Hospital?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.hospital}
                          checked={values.amenities.hospital}
                          onBlur={handleBlur}
                          name="amenities.hospital"
                          title={"Hospital?"}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={4} md={3}>
                        <label>Shopping?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.shopping}
                          checked={values.amenities.shopping}
                          onBlur={handleBlur}
                          name="amenities.shopping"
                          title={"Shopping?"}
                        />
                      </GridItem>

                      <GridItem xs={6} sm={4} md={3}>
                        <label>Garden?</label>
                        <Checkbox
                          onChange={handleChange}
                          value={values.amenities.garden}
                          checked={values.amenities.garden}
                          onBlur={handleBlur}
                          name="amenities.garden"
                          title={"Garden?"}
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
                            Change Icon
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

                    {complex.photo && !icon && (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <Image src={complex.photo} />
                        </GridItem>
                      </GridContainer>
                    )}
                  </CardBody>
                  <CardFooter>
                    <Button round color="primary" onClick={handleSubmit}>
                      Save Complex
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

export default EditComplex;
