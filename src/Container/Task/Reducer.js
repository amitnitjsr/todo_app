import * as types from './ActionTypes';

const initialState = {
    taskDetails: [
        {
            'id': 1,
            'summary': 'Create a gist',
            'description': 'Create a gist about simulating async action',
            'completed': true,
            'createdOn': '2020-05-26',
            'dueDate': '2020-06-26',
            'priority': 'Low'
        }, {
            'id': 2,
            'summary': 'Create a list',
            'description': 'Create a list about simulating async action',
            'completed': false,
            'createdOn': '2020-03-26',
            'dueDate': '2020-05-26',
            'priority': 'None'
        },
        {
            'id': 3,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': true,
            'createdOn': '2020-05-26',
            'dueDate': '2020-07-26',
            'priority': 'Medium'
        }, {
            'id': 4,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': false,
            'createdOn': '2020-04-26',
            'dueDate': '2020-06-26',
            'priority': 'Low'
        }, {
            'id': 5,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': true,
            'createdOn': '2020-06-26',
            'dueDate': '2020-07-26',
            'priority': 'None'
        }, {
            'id': 6,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': true,
            'createdOn': '2020-05-26',
            'dueDate': '2020-08-26',
            'priority': 'Medium'
        }, {
            'id': 7,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': false,
            'createdOn': '2020-06-26',
            'dueDate': '2020-08-26',
            'priority': 'Low'
        }, {
            'id': 8,
            'summary': 'Create a dropdown',
            'description': 'Create a dropdown about simulating async action',
            'completed': false,
            'createdOn': '2020-02-26',
            'dueDate': '2020-04-26',
            'priority': 'High'
        }
    ],
    completedTask: [],
    pendingTask: [],
}

const getCompletedTask = (list) => {
    return list.filter(f => f.completed === true);
}

const getPendingTask = (list) => {
    return list.filter(f => f.completed === false);
}

const searchDataSet = (searchKey) => {
    let tempData = initialState.taskDetails;
    if (searchKey) {
        tempData = tempData.filter(d => {
            if (d.summary.toUpperCase().includes(searchKey.toUpperCase())) {
                return d;
            }
        });
    }
    return ({ taskDetails: tempData, completedTask: getCompletedTask(tempData), pendingTask: getPendingTask(tempData) })
}

export default (state = initialState, action) => {
    state.completedTask = getCompletedTask(state.taskDetails)
    state.pendingTask = getPendingTask(state.taskDetails)

    switch (action.type) {
        case types.CREATE_NEW_TASK:
        case types.DELETE_TASK:
        case types.EDIT_TASK:
            const data = { ...state, taskDetails: action.payload }
            state.completedTask = getCompletedTask(data.taskDetails);
            state.pendingTask = getPendingTask(data.taskDetails);
            return {
                ...state,
                taskDetails: action.payload,
            }
        case types.SEARCH_TASK:
            return {
                ...state,
                ...searchDataSet(action.payload)
            }
        default:
            return state
    }
}