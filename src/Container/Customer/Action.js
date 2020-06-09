import * as types from './ActionTypes';

export const addNewCustomer = (data) => {
    const { name, email, phone, customer_id, gender } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const lastData = customerDetails[customerDetails.length - 1];
        const newData = [
            ...customerDetails,
            {
                'id': lastData.id + 1,
                'name': name || '',
                'email': email || '',
                'phone': phone || '',
                'customer_id': customer_id || '',
                'gender': gender || '',
            }
        ]
        return dispatch({ type: types.CREATE_NEW_CUSTOMER, payload: newData });
    }
}


export const deleteTask = (data) => {
    let result = Object.entries(data);
    let array = result.map((val) => {
        return val[0]
    });
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const newData = customerDetails.filter(f => !array.includes(f.id.toString()));
        return dispatch({ type: types.DELETE_TASK, payload: newData });
    }
}

export const editCustomer = (data) => {
    const { id, name, email, phone, customer_id, gender } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const newData = customerDetails.filter(data => {
            if (data.id === id) {
                if (name) data.name = name;
                if (email) data.email = email;
                if (phone) data.phone = phone;
                if (customer_id) data.customer_id = customer_id;
                if (gender) data.gender = gender;
            }
            return data;
        })
        return dispatch({ type: types.EDIT_CUSTOMER, payload: newData });
    }
}
