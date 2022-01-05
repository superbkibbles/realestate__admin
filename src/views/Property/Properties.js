import React, {useEffect, useState} from 'react';

import RegularButton from "../../components/CustomButtons/Button";
import GridContainer from "../../components/Grid/GridContainer";
import propertyApi from "../../api/property/property";
import CardWithPic from "../../components/CarcWithPic/CardWithPic";

const Properties = ({history}) => {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        getAllProperties();
    }, []);

    const getAllProperties = async () => {
        const {data, ok} = await propertyApi.getAllProperties();
        if (!ok) return console.log(data);
        setProperties(data);
    };
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
    return (
        <div>
            <RegularButton
                onClick={() => history.push(`/admin/property/add`)}
                color={"primary"}
            >
                New Property
            </RegularButton>
            <GridContainer>
                {
                    properties.map(property => {
                        return <CardWithPic
                            id={property.id}
                            title={property.title}
                            img={property.property_pic? property.property_pic : null}
                            status={property.status}
                            onDeactivateClick={deactivateClick}
                            onActivateClick={activateClick}
                            onEditClick={() => history.push(`/admin/property/edit/${property.id}`)}
                        />
                    })
                }
            </GridContainer>
        </div>
    );
};

export default Properties;