import {gql} from 'apollo-boost';
const getDrs = gql`
    {
        doctors{
            id
            name
        }
    }
`;

const getPatients = gql`
    {
        patients{
            id
            name
            dob
        }
    }
`;
const addPatient = gql`
    mutation($name: String!, $dob: String!, $cPhone: String!, $eName: String!, $ephone: String!, $erxn: String!){
        addPatient(name:$name, dob:$dob, cPhone:$cPhone, eName:$eName, ephone:$ephone, erxn:$erxn){
            name
            dob
            id
        }
    }
`;
export {getDrs, getPatients, addPatient};