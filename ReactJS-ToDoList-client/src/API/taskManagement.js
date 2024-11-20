export const createNewTask = async (id, name, category, color, authToken) => {
    try {
        const response = await fetch(`https://todo-application-gs3f.onrender.com/tasks/createNewTask/${id}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
            body: JSON.stringify({ name: name, category: category, color: color }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error('Failed To Create Task Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getAllTheTask = async (id, authToken) => {
    try {
        const response = await fetch(`https://todo-application-gs3f.onrender.com/tasks/getAllTask/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken
            },
        });

        const data = await response.json();

        if (data.error) {
            throw new Error('Failed To Get Task Error');
        }

        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const updateATask = async (projectId, id, name, category, isDone = false, color, authToken) => {
    try {
        console.log(id, authToken, projectId);
        const response = await fetch(`https://todo-application-gs3f.onrender.com/tasks/updateATask/${projectId}/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
            body: JSON.stringify({ name: name, category: category, isDone: isDone, color: color }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('Failed To Update Task Details Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const deleteUserTask = async (projectId, id, authToken) => {
    try {
        const response = await fetch(`https://todo-application-gs3f.onrender.com/tasks/deleteTask/${projectId}/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('Failed To Delete Task Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}