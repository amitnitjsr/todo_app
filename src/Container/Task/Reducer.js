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
    completeTask: [],
    pendingTask: [],
}

export default (state = initialState, action) => {
    state.completedTask = state.taskDetails.filter(f => f.completed === true);
    state.pendingTask = state.taskDetails.filter(f => f.completed === false);

    switch (action.type) {
        case types.CREATE_NEW_TASK:
        case types.DELETE_TASK:
        case types.EDIT_TASK:
        case types.SEARCH_TASK:
            const data = { ...state, taskDetails: action.payload }
            state.completedTask = data.taskDetails.filter(f => f.completed === true);
            state.pendingTask = data.taskDetails.filter(f => f.completed === false);
            return {
                ...state,
                taskDetails: action.payload,
            }
        default:
            return state
    }
}