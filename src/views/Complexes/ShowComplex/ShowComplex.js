import React, {useEffect, useState} from 'react';
import propertyApi from "../../../api/property/property";

import GridContainer from "../../../components/Grid/GridContainer";
import CardWithPic from "../../../components/CarcWithPic/CardWithPic";

const ShowComplex = ({match, history}) => {
    const [properties, setProperties] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        getProperties();
    }, []);
    const getProperties = async () => {
        const {data, ok} = await propertyApi.searchProperties([
            {
                field: "complex_id",
                value: match.params.complexId
            },
        ]);
        if (!ok) {
            console.log(data)
            return setErrors(data)
        }
        setProperties(data)
    }
    const deactivateClick = async (id) => {
        const {data, ok} = await propertyApi.updateProperty(id, [{
            field: 'status',
            value: 'inactive',
        }])
        if (!ok) return console.log(data)
    }

    const activateClick = async (id) => {
        const {data, ok} = await propertyApi.updateProperty(id, [{
            field: 'status',
            value: 'active',
        }])
        if (!ok) return console.log(data)
    }

    if (errors && errors.status === 404) return <h3>Nothing found!</h3>
    if (errors && errors.status > 300) return <h3>Something went wrong!</h3>
    if (properties.length < 1 && !errors) return <h3>loading</h3>
    return (
        <GridContainer>
            <GridContainer>
                {
                    properties.map(property => {
                        return <CardWithPic
                            key={property.id}
                            id={property.id}
                            title={property.title}
                            img={property.property_pic ? property.property_pic : null}
                            status={property.status}
                            onDeactivateClick={deactivateClick}
                            onActivateClick={activateClick}
                            onEditClick={() => history.push(`/admin/property/edit/${property.id}`)}
                        />
                    })
                }
            </GridContainer>
        </GridContainer>
    );
};

export default ShowComplex;