import * as types from './ActionTypes';

export const addNewTask = (data) => {

    const { summary, description, priority, createdOn, dueDate, completed } = data;
    return (dispatch, getState) => {
        const { taskDetails } = getState().task;
        const lastData = taskDetails[taskDetails.length - 1];
        const newData = [
            ...taskDetails,
            {
                'id': lastData.id + 1,
                'summary': summary || '',
                'description': description || '',
                'priority': priority || '',
                'createdOn': createdOn || '',
                'dueDate': dueDate || '',
                'completed': completed || false,
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
        const { taskDetails } = getState().task;
        const newData = taskDetails.filter(f => !array.includes(f.id.toString()));
        return dispatch({ type: types.DELETE_TASK, payload: newData });
    }
}

export const editTask = (data) => {
    const { id, summary, description, priority, createdOn, dueDate, completed } = data;
    return (dispatch, getState) => {
        const { taskDetails } = getState().task;
        const newData = taskDetails.filter(data => {
            if (data.id === id) {
                if (summary) data.summary = summary;
                if (description) data.description = description;
                if (priority) data.priority = priority;
                if (createdOn) data.createdOn = createdOn;
                if (dueDate) data.dueDate = dueDate;
                data.completed = completed;
            }
            return data;
        })
        return dispatch({ type: types.EDIT_TASK, payload: newData });
    }
}

export const searchTask = (data) => {
    const { searchInput } = data;

    return (dispatch, getState) => {
        const { taskDetails } = getState().task;

        if (searchInput.length > 0) {
            const newData = taskDetails.filter(data => {
                if (data.summary.toLowerCase().includes(searchInput.toLowerCase()) || data.description
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()))
                    return data
            })
            return dispatch({ type: types.SEARCH_TASK, payload: newData });
        }
        else {
            return dispatch({ type: types.SEARCH_TASK, payload: taskDetails });
        }
    }
}

export const searchTaskList = (searchKey) => {
    return (dispatch, getState) => {
        return dispatch({ type: types.SEARCH_TASK, payload: searchKey.searchInput })
    }
}