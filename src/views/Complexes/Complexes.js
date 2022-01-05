import React, {useEffect, useState} from 'react';

import RegularButton from "../../components/CustomButtons/Button";
import GridContainer from "../../components/Grid/GridContainer";
import complexApi from "../../api/complex/complex";
import CardWithPic from "../../components/CarcWithPic/CardWithPic";

const Complexes = ({history}) => {
    const [complexes, setComplexes] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        getComplexes();
    }, []);

    const getComplexes = async () => {
        const {data, ok} = await complexApi.getAllComplexes();
        if (!ok) {
            console.log(data)
            return setErrors(data)
        }
        setComplexes(data);
    }

    const deactivateHandler = async (id) => {
        const {data, ok} = await complexApi.updateComplex(id, [
            {
                field: 'status',
                value: 'inactive',
            }
        ]);
        if (!ok) return setErrors(data);
    }

    const activateHandler = async (id) => {
        const {data, ok} = await complexApi.updateComplex(id, [
            {
                field: 'status',
                value: 'active'
            }
        ]);
        if (!ok) return setErrors(data);
    }
    if (!errors && complexes.length < 1) return 'loading'
    // if (complexes.length < 1 && errors.status > 299) return <h3>Something went Wrong!</h3>
    return (
        <div>
            <RegularButton color={'primary'} onClick={() => history.push('/admin/complexes/add')}>
                New Complex
            </RegularButton>
            {
                errors.status > 299 ?
                    <h3>No Complex found!</h3> :
                    <GridContainer>
                        {
                            complexes.map(complex => (
                                <CardWithPic
                                    key={complex.id}
                                    title={complex.name}
                                    status={complex.status}
                                    id={complex.id}
                                    img={complex.photo}
                                    onEditClick={() => history.push(`/admin/complexes/edit/${complex.id}`)}
                                    onDeactivateClick={deactivateHandler}
                                    onActivateClick={activateHandler}
                                    onViewClick={() => history.push(`/admin/complexes/show/${complex.id}`)}
                                />
                            ))
                        }
                    </GridContainer>
            }

        </div>
    );
};

export default Complexes;