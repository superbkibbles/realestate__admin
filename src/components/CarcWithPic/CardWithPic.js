import React from 'react';
import {Container} from "@material-ui/core";

import Card from "../Card/Card";
import photo from "../../views/Agency/test1.jpeg";
import GridItem from "../Grid/GridItem";
import './agencies.css';

const CardWithPic = ({title, id, img, onDeactivateClick, onActivateClick, status, onViewClick, onEditClick}) => {
    return (
        <GridItem xs={6} sm={4} md={4} key={id}>
            <Card style={{backgroundColor: "red !important"}}>
                <Container>
                    <div className="card">
                        {img ?
                            <img src={img} className="img"/> :
                            <img src={photo} className="img"/>
                        }
                        <div className='con'>
                            <div className="actions">
                                <a className='actions__item' onClick={onEditClick}>Edit</a>
                                {onViewClick && <a className='actions__item' onClick={onViewClick}>View</a>}
                                <a
                                    className='actions__item'
                                    onClick={() => status === 'active' ? onDeactivateClick(id) : onActivateClick(id)}>{status === 'active' ? 'Deactivate' : 'Activate'}
                                </a>
                            </div>
                            <h4 style={{
                                textAlign: 'center',
                                margin: 0,
                                marginBottom: '10px',
                                fontWeight: 'bold'
                            }}>{title}</h4>
                        </div>
                    </div>
                </Container>
            </Card>
        </GridItem>
    );
};

export default CardWithPic;