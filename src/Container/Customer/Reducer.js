import * as types from './ActionTypes';

const initialState = {
    customerDetails: [
        {
            'id': 1,
            'name': 'Stella Johnson',
            'email': 'stella.johnson@example.com',
            'phone': '+1-215-659-7529',
            'customer_id': 'cust1',
            'gender': "male",
        }, {
            'id': 2,
            'name': 'Garry Sobars',
            'email': 'garry.sobars@example.com',
            'phone': '+1-215-745-7529',
            'customer_id': 'cust2',
            'gender': "male",
        },
        {
            'id': 3,
            'name': 'Alex Dolgove',
            'email': 'alex.dolgove@example.com',
            'phone': '+1-215-748-7855',
            'customer_id': 'cust3',
            'gender': "male",
        }, {
            'id': 4,
            'name': 'Domnic Brown',
            'email': 'domnic.brown@example.com',
            'phone': '+1-215-756-4579',
            'customer_id': 'cust4',
            'gender': "male",
        }, {
            'id': 5,
            'name': 'Kadir M',
            'email': 'kadir.m@example.com',
            'phone': '+1-215-659-7586',
            'customer_id': 'cust5',
            'gender': 'male',
        }, {
            'id': 6,
            'name': 'John Smith',
            'email': 'john.smith@example.com',
            'phone': '+1-215-876-8596',
            'customer_id': 'cust6',
            'gender': 'male',
        }, {
            'id': 7,
            'name': 'Domnic Harris',
            'email': 'domnic.harris@example.com',
            'phone': '+1-215-785-3841',
            'customer_id': 'cust7',
            'gender': 'male',
        }, {
            'id': 8,
            'name': 'Jimmy Jo',
            'email': 'jimmy.jo@example.com',
            'phone': '+1-215-456-5863',
            'customer_id': 'cust8',
            'gender': 'male',
        }
    ],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_CUSTOMER:
        case types.DELETE_CUSTOMER:
        case types.EDIT_CUSTOMER:
            return {
                ...state,
                customerDetails: action.payload,
            }
        default:
            return state
    }
}