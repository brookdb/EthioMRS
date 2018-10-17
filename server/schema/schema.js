//initializers
const graphql = require('graphql');
const _ = require('lodash');

const PatientMDL = require('../models/patient');
const DoctorMDL = require('../models/doctor');
const VisitMDL = require('../models/visit');
const LabMDL = require('../models/lab');
const TestMDL = require('../models/tests');
const VitalsMDL = require('../models/vitals');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull
    }= graphql;
    


//schema
const contactType = new GraphQLObjectType({
    name: 'contact',
    fields:() => ({
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        pobox: {type: GraphQLString}
        })
});
const EciType = new GraphQLObjectType({
    name: 'eci',
    fields: () => ({
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        relation: {type: GraphQLString}
    })
});
const PatientType = new GraphQLObjectType({
    name: 'patient',
    description: 'contains all the necessary information about a patient',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        dob: {type: GraphQLString},
        contact: {type: contactType},
        eci: {type: EciType},
        visits:{
            type: new GraphQLList(visitType),
            resolve(parent, args){
                return VisitMDL.find({patientid: parent.id});
            }
        },
        mednote: {type: GraphQLString},
        balance: {type: GraphQLFloat},
        deceased: {type: GraphQLBoolean}
    })
});

const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    description: 'contains all the necessary information about a doctor',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        specialty:{type: GraphQLString},
        visits: {
            type: visitType,
            resolve(parent, args){
                return VisitMDL.find({doctorid: parent.id});
            }
        }
        
    })
});
const VitalsType = new GraphQLObjectType({
    name: 'vitals',
    description: 'contains all the necessary information about a visit',
    fields: ()=> ({
        date: {type: GraphQLString},
        height: {type: GraphQLString},
        weight: {type: GraphQLString},
        BMI: {type: GraphQLString},
        temperature: {type: GraphQLString},
        pulse: {type: GraphQLString},
        respiratory: {type: GraphQLString},
        bloodpressure: {type: GraphQLString},
        oxygensat: {type: GraphQLString}
    })
});
const visitType = new GraphQLObjectType({
    name: 'visit',
    description: 'contains all the necessary information about a visit',
    fields: ()=> ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        patient: {
            type: PatientType,
            resolve(parent, args){
                return PatientMDL.findById(parent.patientid);
            }
        },
        doctor: {
            type: DoctorType,
            resolve(parent, args){
                return DoctorMDL.findById(parent.doctorid);
            }
        },
        vitals: {
            type: VitalsType,
            resolve(parent, args){
                return VitalsMDL.findById(parent.vitalsid);
            }
        },
        initialnotes: {type: GraphQLString},
        endnotes: {type: GraphQLString},
        payment: {type: GraphQLFloat},       
        active: {type: GraphQLBoolean},
        labs: {
            type: LabType,
            resolve(parent, args){
                return LabMDL.find({visitid: parent.id});
            }
        }
    })
});
const LabType = new GraphQLObjectType({
    name: 'lab',
    description: 'contains all the necessary information about a lab',
    fields: ()=> ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        notes: {type: GraphQLString},
        tests: {
            type: TestType,
            resolve(parent, args){
                return TestMDL.find({labid: parent.id});
            }
        },
        payment: {type:GraphQLFloat},
        paied: {type: GraphQLBoolean}
        
    })
});
const TestType = new GraphQLObjectType({
    name: 'test',
    description: 'contains all the necessary information about a test',
    fields: ()=>({
        id: {type: GraphQLID},
        testname: {type: GraphQLString},
        result: {type: GraphQLString},
        notes: {type: GraphQLString}
    })
})
//queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    
    fields: {
        patient:{
            type: PatientType,
            description: 'query to get a patient. takes in patient id argument returns the patient data',
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return PatientMDL.findById(args.id);
            }
        },
        visistsOn:{
            type: GraphQLList(visitType),
            description: 'query to get a visit based on a date',
            args:{date: {type: GraphQLString}},
            resolve(parent, args){
                return VisitMDL.find({date: args.date});
            }
        },
        visitsOf:{
            type: GraphQLList(visitType),
            description: 'query to get a visit based on patient',
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return VisitMDL.find({patientid: args.id});
            }
        },
        visits:{
            type: GraphQLList(visitType),
            description: 'query to get all visit',
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return VisitMDL.find({});
            }
        },
        doctor: {
            type: DoctorType,
            description: 'query to get a doctor based on id',
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return DoctorMDL.findById(args.id);
            }
        },
        doctors: {
            type: GraphQLList(DoctorType),
            description: 'query to get all doctors',
            resolve(parents, args){
                return DoctorMDL.find({});
            }
        },
        patients: {
            type: GraphQLList(PatientType),
            description: 'query to get all patients',
            resolve(parents, args){
                return PatientMDL.find({});
            }
        }
    }
});

//mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPatient: {
            type: PatientType,
            description: 'Add a new patient',
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                dob: {type:new GraphQLNonNull(GraphQLString)},
                cEmail: {type: GraphQLString},
                cPhone: {type: new GraphQLNonNull(GraphQLString)},
                cPobox: {type: GraphQLString},
                eName: {type: new GraphQLNonNull(GraphQLString)},
                ephone: {type: new GraphQLNonNull(GraphQLString)},
                erxn: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: (root, args) => {
                let contact= {
                    phone: args.cPhone,
                    email: args.cEmail,
                    pobox: args.cPobox
                };
                let eci = {
                    name: args.eName,
                    phone: args.ephone,
                    relation: args.erxn
                };
                let patient = PatientMDL({
                    name: args.name,
                    dob: args.dob,
                    contact: contact,
                    eci: eci
                });
                return patient.save();
            }
        },
        addDoctor: {
            type: DoctorType,
            description: 'Add a new Doctor',
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                specialty: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root, args) => {
                let doctor = new DoctorMDL({
                    name: args.name,
                    specialty: args.specialty
                });
                return doctor.save();
            }
        },
        addVisit: {
            type: visitType,
            description: 'makes a new visit appointment for the patient',
            args: {
                
                apntdate: {type: new GraphQLNonNull(GraphQLString)},
                patientid: {type: new GraphQLNonNull(GraphQLString)},
                initialnotes: {type: new GraphQLNonNull(GraphQLString)},
                active: {type: GraphQLBoolean}
            },
            resolve: (root, args) => {
                let visit = new VisitMDL({
                    apntdate: args.apntdate,
                    patientid: args.patientid,
                    initialnotes: args.initialnotes,
                    active: false
                });
                return visit.save();
          
            }
        },
        activateVisit: {
            type: visitType,
            description: 'sets up secondary visit information',
            args: {
                payment: {type: new GraphQLNonNull(GraphQLFloat)},
                visitid: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: (root, args) => {
                var date = new Date();
                return VisitMDL.update(
                    {_id: args.visitid},
                    {
                        payment: args.payment,
                        active: true,
                        startdate: date.getTimestamp()+""
                        
                    },
                    function(err, affected, resp) {
                        console.log(resp);
                    }
                )
            }
        }
        
    }
});

//export
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});