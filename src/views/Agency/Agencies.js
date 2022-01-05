import React, {useEffect, useState} from "react";
import GridContainer from "components/Grid/GridContainer";
import RegularButton from "components/CustomButtons/Button";
import {useHistory} from "react-router-dom";
import Card from "components/Card/Card";
import GridItem from "components/Grid/GridItem";

import photo from "./test1.jpeg";
import {Container} from "@material-ui/core";
import "./agencies.css";
// api
import agencyApi from '../../api/agency/agency';

export default function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllAgencies();
    }, []);

    const getAllAgencies = async () => {
        const {data, ok} = await agencyApi.getAllAgencies()
        if (!ok) return;
        setAgencies(data);
    };

    const onDeactivateClick = async (agencyID) => {
        await agencyApi.updateAgency(agencyID, [{field: 'status', value: 'inactive'}]);
        setAgencies([]);
        await getAllAgencies();
    };

    const onActivateClick = async (agencyID) => {
        await agencyApi.updateAgency(agencyID, [{field: 'status', value: 'active'}]);
        setAgencies([])
        await getAllAgencies();
    };

    return (
        <div>
            <RegularButton
                onClick={() => history.push("/admin/agency/newagency")}
                color={"primary"}
            >
                New Agency
            </RegularButton>
            <GridContainer>
                {
                    agencies.map((agency) => (
                        <GridItem xs={6} sm={4} md={4} key={agency.id}>
                            <Card style={{backgroundColor: "red !important"}}>
                                <Container>
                                    <div className="card">
                                        {agency.icon ?
                                            <img src={agency.icon} className="img"/>:
                                            <img src={photo} className="img"/>
                                        }
                                        <div className='con'>
                                            <div className="actions">
                                                <a className='actions__item' onClick={() => history.push(`/admin/agency/edit/${agency.id}`)}>Edit</a>
                                                <a className='actions__item' onClick={() => history.push(`/admin/agency/show/${agency.id}`)}>View</a>

                                                <a className='actions__item' onClick={ () => agency.status === 'active' ? onDeactivateClick(agency.id): onActivateClick(agency.id)}>{agency.status === 'active'? 'Deactivate': 'Activate'}</a>
                                            </div>
                                            <h4 style={{
                                                textAlign: 'center',
                                                margin: 0,
                                                marginBottom: '10px',
                                                fontWeight: 'bold'
                                            }}>{agency.name}</h4>
                                        </div>
                                    </div>
                                </Container>
                            </Card>
                        </GridItem>
                    ))
                }
            </GridContainer>
        </div>
    );
}
