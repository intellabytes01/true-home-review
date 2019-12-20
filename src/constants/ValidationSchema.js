import * as Yup from 'yup';
import { VALIDATE } from './ValidationConst';


export const VALIDATION_SCHEMA = {

    JOB: (Yup.object().shape({

        report: Yup.object().shape({
            scheduledTime: Yup.date().nullable(true).required("Please select a review date"),
            type: Yup.string().nullable(true)
            // .required('Type is required')
            ,
            zoneID: Yup.string().nullable(true)
            // .required('Zone is required')
            ,
            poID: Yup.string().nullable(true).required('PO number is required').max(255, VALIDATE.NAME_MAX),
            lotID: Yup.string().nullable(true).required('Lot id is required').max(255, VALIDATE.NAME_MAX),
            clientID: Yup.string().nullable(true).required('Client Id is required').test("","Please select an option", (value)=>value!=="0"),
            userID: Yup.string().nullable(true).required('Inspector is required')
        }),

        address: Yup.object().shape({
            street: Yup.string()
                .nullable(true)
                .required('Street name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid street name"),
            city: Yup.string()
                .nullable(true)
                .required('City name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid name"),
            state: Yup.string()
                .nullable(true)
                .required('State name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a state valid name"),
            zip: Yup.string()
                .nullable(true)
                .required('Zip is required')
                .matches(/^\d+$/, VALIDATE.ZIP_CODE)
                .min(VALIDATE.ZIP_CODE_MIN_LEN, VALIDATE.ZIP_CODE_MIN)
                .max(VALIDATE.ZIP_CODE_MAX_LEN, VALIDATE.CHAR_LIMIT),
            section: Yup.string()
                .nullable(true)
                .required('Section name is required')
                // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.SECTION_NAME_INVALID)
                .max(255, VALIDATE.CHAR_LIMIT),
            block: Yup.string()
                .nullable(true)
                .required('Block name is required')
                // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.BLOCK_NAME_INVALID)
                .max(255, VALIDATE.CHAR_LIMIT),
            neighborhood: Yup.string()
                .nullable(true)
                .required('Please select an option'),
            lot: Yup.string()
                .nullable(true)
                .required('Lot is required')
                .min(VALIDATE.LOT_MIN_LEN, VALIDATE.LOT_MIN)
                .max(VALIDATE.LOT_MAX_LEN, VALIDATE.LOT_MAX)
                .matches(/^\d+$/, VALIDATE.LOT_INVALID)
        }),

        property: Yup.object().shape({
            squareFeet: Yup.string()
                .nullable(true)
                .required('SquareFeet is required')
                .min(VALIDATE.SQUARE_FEET_MIN_LEN, VALIDATE.SQUARE_FEET_MIN)
                .max(VALIDATE.SQUARE_FEET_MAX_LEN, VALIDATE.SQUARE_FEET_MAX)
                .matches(/^\d+$/, VALIDATE.SQUARE_FEET_INVALID),
            bedrooms: Yup.string()
                .nullable(true)
                .required('Bedrooms is required')
                .min(VALIDATE.BEDROOM_MIN_LEN, VALIDATE.BEDROOM_MIN)
                .max(VALIDATE.BEDROOM_MAX_LEN, VALIDATE.BEDROOM_MAX)
                .matches(/^\d+$/, VALIDATE.BEDROOM_INVALID),
            bathrooms: Yup.string()
                .nullable(true)
                .required('Bathrooms is required')
                .min(VALIDATE.BATHROOMS_MIN_LEN, VALIDATE.BATHROOMS_MIN)
                .max(VALIDATE.BATHROOMS_MAX_LEN, VALIDATE.BATHROOMS_MAX)
                .matches(/^\d+$/, VALIDATE.BATHROOMS_INVALID),
            floors: Yup.string()
                .nullable(true)
                .required('Floors is required')
                .min(VALIDATE.FLOORS_MIN_LEN, VALIDATE.FLOORS_MIN)
                .max(VALIDATE.FLOORS_MAX_LEN, VALIDATE.FLOORS_MAX)
                .matches(/^\d+$/, VALIDATE.FLOORS_INVALID),
            basement: Yup.string()
                .nullable(true)
                .required('Basement is required')
                .min(VALIDATE.BASEMENT_MIN_LEN, VALIDATE.BASEMENT_MIN)
                .max(VALIDATE.BATHROOMS_MAX_LEN, VALIDATE.BASEMENT_MAX)
                .matches(/^\d+$/, VALIDATE.BASEMENT_INVALID),
            idCode: Yup.string()
                .nullable(true)
                .required('IdCode is required')
                .max(255, VALIDATE.NAME_MAX),
        }),

        builders: Yup.array()
                    .nullable(true)
                    // .required('Please select an option')

    })),

    CLIENT_ADD_UPDATE: (Yup.object().shape({

        client: Yup.object().shape({

            companyName: Yup.string()
                .nullable(true)
                .required('Company name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid company name"),
            street: Yup.string()
                .nullable(true)
                .required('Street name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid street name"),
            city: Yup.string()
                .nullable(true)
                .required('City name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid city name"),
            state: Yup.string()
                .nullable(true)
                .required('State name is required')
                .max(255, VALIDATE.CHAR_LIMIT),
                // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid state name"),
            zip: Yup.string()
                .nullable(true)
                .required('Zip is required')
                .matches(/^\d+$/, VALIDATE.ZIP_CODE)
                .min(VALIDATE.ZIP_CODE_MIN_LEN, VALIDATE.ZIP_CODE_MIN)
                .max(VALIDATE.ZIP_CODE_MAX_LEN, VALIDATE.CHAR_LIMIT),
        }),

        manager: Yup.object().shape({

            firstName: Yup.string()
                .nullable(true)
                .required('First name is required')
                .max(255, VALIDATE.CHAR_LIMIT)
                .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name"),
            lastName: Yup.string()
                .nullable(true)
                .required('Last name is required')
                .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name")
                .max(255, VALIDATE.CHAR_LIMIT),
            title: Yup.string()
                .nullable(true)
                .required('Title is required')
                .matches(/^[a-zA-Z0-9 ]*$/, VALIDATE.TITLE_INVALID)
                .max(255, VALIDATE.CHAR_LIMIT),
            phone: Yup.string()
                .nullable(true)
                .required('Phone is required')
                .min(VALIDATE.PHONE_MIN_LEN, VALIDATE.PHONE_MIN)
                .max(VALIDATE.PHONE_MAX_LEN, VALIDATE.PHONE_MAX)
                .matches(/^\d+$/, VALIDATE.PHONE_INVALID),
            email: Yup.string()
                .nullable(true)
                .email(VALIDATE.EMAIL_INVALID)
                .required('Email is required')
                .max(255, VALIDATE.CHAR_LIMIT),

        }),

        zones: Yup.array().of(
            Yup.object().shape({
                zone: Yup.string()
                    .nullable(true)
                    // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.ZONE_INVALID)
                    .required('Zone is required')
                    .max(255, VALIDATE.CHAR_LIMIT),
            })
        ),

        contacts: Yup.array().of(
            Yup.object().shape({
                title: Yup.string()
                    .nullable(true)
                    .required('Title is required')
                    .max(255, VALIDATE.CHAR_LIMIT),
                    // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.TITLE_INVALID),
                name: Yup.string()
                    .nullable(true)
                    .required('Name is required')
                    .matches(/^[a-zA-Z0-9 ]*$/, VALIDATE.NAME_INVALID)
                    .max(255, VALIDATE.CHAR_LIMIT),
                email: Yup.string()
                    .nullable(true)
                    .email(VALIDATE.EMAIL_INVALID)
                    .required('Email is required')
                    .max(255, VALIDATE.CHAR_LIMIT),
                phone: Yup.string()
                    .nullable(true)
                    .required('Phone is required')
                    .min(VALIDATE.PHONE_MIN_LEN, VALIDATE.PHONE_MIN)
                    .max(VALIDATE.PHONE_MAX_LEN, VALIDATE.PHONE_MAX)
                    .matches(/^\d+$/, VALIDATE.PHONE_INVALID),
            })
        ),

        users: Yup.array().of(
            Yup.object().shape({
                firstName: Yup.string()
                    .nullable(true)
                    .required('First name is required')
                    .max(255, VALIDATE.CHAR_LIMIT)
                    .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name"),
                lastName: Yup.string()
                    .nullable(true)
                    .required('Last name is required')
                    .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name")
                    .max(255, VALIDATE.CHAR_LIMIT),
                title: Yup.string()
                    .nullable(true)
                    .required('Title is required')
                    .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.TITLE_INVALID)
                    .max(255, VALIDATE.CHAR_LIMIT),
                phone: Yup.string()
                    .nullable(true)
                    .required('Phone is required')
                    .min(VALIDATE.PHONE_MIN_LEN, VALIDATE.PHONE_MIN)
                    .max(VALIDATE.PHONE_MAX_LEN, VALIDATE.PHONE_MAX)
                    .matches(/^\d+$/, VALIDATE.PHONE_INVALID),
                email: Yup.string()
                    .nullable(true)
                    .email(VALIDATE.EMAIL_INVALID)
                    .required('Email is required')
                    .max(255, VALIDATE.CHAR_LIMIT),
            })),

    })),

    NEIGHBORHOOD_ADD_UPDATE: Yup.object().shape({
        neighborhood: Yup.string()
            .nullable(true)
            .required('ID is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        name: Yup.string()
            .nullable(true)
            .required('Name is required')
            // .matches(/^[a-zA-Z0-9]*$/, "Enter a valid name")
            .max(255, VALIDATE.CHAR_LIMIT),
        city: Yup.string()
            .nullable(true)
            .required('City name is required')
            // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid city name")
            .max(255, VALIDATE.CHAR_LIMIT),
        state: Yup.string()
            .nullable(true)
            .required('State name is required')
            .max(255, VALIDATE.CHAR_LIMIT),
            // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid name"),
        zip: Yup.string()
            .nullable(true)
            .required('Zip is required')
            .matches(/^\d+$/, VALIDATE.ZIP_CODE)
            .min(VALIDATE.ZIP_CODE_MIN_LEN, VALIDATE.ZIP_CODE_MIN)
            .max(VALIDATE.ZIP_CODE_MAX_LEN, VALIDATE.CHAR_LIMIT),
    }),

    SECTION_ADD_UPDATE: Yup.object().shape({
        sectionName: Yup.string()
            .nullable(true)
            .required('Section name is required')
            // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.SECTION_NAME_INVALID)
            .max(255, VALIDATE.CHAR_LIMIT),
        position: Yup.string()
            .nullable(true)
            .required('Position is required')
            .min(VALIDATE.POSITION_MIN_LEN, VALIDATE.POSITION_MIN)
            .max(VALIDATE.POSITION_MAX_LEN, VALIDATE.POSITION_MAX)
            .matches(/^\d+$/, VALIDATE.POSITION_INVALID),
    }),

    SECTION_ROOM_ADD_UPDATE: Yup.object().shape({
        sectionName: Yup.string()
            .nullable(true)
            .required('Please select an option '),
        roomName: Yup.string()
            .nullable(true)
            .required('Room name is required')
            // .matches(/^[a-zA-Z0-9_. -]*$/, "Enter a valid room name")
            .max(255, VALIDATE.CHAR_LIMIT),
    }),

    ROOM_ITEM_ADD_UPDATE: Yup.object().shape({
        roomItemName: Yup.string()
            .nullable(true)
            .required('Section item name is required ')
            // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.ROOM_NAME_INVALID)
            .max(255, VALIDATE.CHAR_LIMIT),
        roomName: Yup.string()
            .nullable(true)
            .required('Please select an option')
    }),

    BUILDER_ADD_UPDATE: Yup.object().shape({
        firstName: Yup.string()
            .nullable(true)
            .required('First name is required')
            .max(255, VALIDATE.CHAR_LIMIT)
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name"),
        lastName: Yup.string()
            .nullable(true)
            .required('Last name is required')
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name")
            .max(255, VALIDATE.CHAR_LIMIT),
        email: Yup.string()
            .nullable(true)
            .email(VALIDATE.EMAIL_INVALID)
            .required('Email is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        phone: Yup.string()
            .nullable(true)
            .required('Phone is required')
            .min(VALIDATE.PHONE_MIN_LEN, VALIDATE.PHONE_MIN)
            .max(VALIDATE.PHONE_MAX_LEN, VALIDATE.PHONE_MAX)
            .matches(/^\d+$/, VALIDATE.PHONE_INVALID),
    }),

    GENERIC_ADD_UPDATE: Yup.object().shape({
        defect_name: Yup.string()
            .nullable(true)
            .required('Defect name is required')
            // .matches(/^[a-zA-Z0-9_. -]*$/, VALIDATE.DEFECT_NAME_INVALID)
            .max(255, VALIDATE.CHAR_LIMIT),
        response: Yup.string()
            .nullable(true)
            .required('Response is required')
            .max(255, VALIDATE.CHAR_LIMIT),
    }),

    DISCLOSURE_ADD_UPDATE: Yup.object().shape({
        disclosure: Yup.string()
            .nullable(true)
            .required('Disclosure name is required')
            // .matches(/^[a-zA-Z0-9_ ]*$/, VALIDATE.DISCLOSURE_INVALID)
            .max(255, VALIDATE.CHAR_LIMIT),
    }),

    USER_ADD: Yup.object().shape({
        firstName: Yup.string()
            .nullable(true)
            .required('First name is required')
            .max(255, VALIDATE.CHAR_LIMIT)
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name"),
        lastName: Yup.string()
            .nullable(true)
            .required('Last name is required')
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name")
            .max(255, VALIDATE.CHAR_LIMIT),
        email: Yup.string()
            .nullable(true)
            .email(VALIDATE.EMAIL_INVALID)
            .required('Email is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        password: Yup.string()
            .nullable(true)
            .required('Password is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        confirmPass: Yup.string()
            .nullable(true)
            .required('Confirm password is required')
            .max(255, VALIDATE.CHAR_LIMIT),
    }),

    USER_UPDATE: Yup.object().shape({
        firstName: Yup.string()
            .nullable(true)
            .required('First name is required')
            .max(255, VALIDATE.CHAR_LIMIT)
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name"),
        lastName: Yup.string()
            .nullable(true)
            .required('Last name is required')
            .matches(/^[a-zA-Z0-9 ]*$/, "Enter a valid name")
            .max(255, VALIDATE.CHAR_LIMIT),
        email: Yup.string()
            .nullable(true)
            .email(VALIDATE.EMAIL_INVALID)
            .required('Email is required')
            .max(255, VALIDATE.CHAR_LIMIT),
        password: Yup.string()
            .nullable(true)
            .max(255, VALIDATE.CHAR_LIMIT),
        confirmPass: Yup.string()
            .nullable(true)
            .max(255, VALIDATE.CHAR_LIMIT),
    }),

    TAG_ADD_UPDATE: Yup.object().shape({
        name: Yup.string()
            .nullable(true)
            .required('Name is required')
            .matches(/^[a-zA-Z0-9 ]*$/, VALIDATE.NAME_INVALID)
            .max(255, VALIDATE.CHAR_LIMIT),
    }),
}