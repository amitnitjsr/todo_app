import * as types from './ActionTypes';

export const addNewTask = (data) => {

    const { summary, description, priority, createdOn, dueDate } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const lastData = customerDetails[customerDetails.length - 1];
        const newData = [
            ...customerDetails,
            {
                'id': lastData.id + 1,
                'summary': summary || '',
                'description': description || '',
                'priority': priority || '',
                'createdOn': createdOn || '',
                'dueDate': dueDate || '',
            }
        ]
        return dispatch({ type: types.CREATE_NEW_TASK, payload: newData });
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

export const editTask = (data) => {
    const { id, summary, description, priority, createdOn, dueDate } = data;
    return (dispatch, getState) => {
        const { customerDetails } = getState().customer;
        const newData = customerDetails.filter(data => {
            if (data.id === id) {
                if (summary) data.summary = summary;
                if (description) data.description = description;
                if (priority) data.priority = priority;
                if (createdOn) data.createdOn = createdOn;
                if (dueDate) data.dueDate = dueDate;
            }
            return data;
        })
        return dispatch({ type: types.EDIT_TASK, payload: newData });
    }
}
