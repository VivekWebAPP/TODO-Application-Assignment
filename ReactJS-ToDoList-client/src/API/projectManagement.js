export const createNewProject = async (name, authToken) => {
    try {
        const response = await fetch('https://todo-application-gs3f.onrender.com/project/createANewProject', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
            body: JSON.stringify({ name: name }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error('Failed To Create Project Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getAllProject = async (authToken) => {
    try {
        const response = await fetch('https://todo-application-gs3f.onrender.com/project/getAllProject', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken
            },
        });

        const data = await response.json();

        if (data.error) {
            throw new Error('Failed To Get Project Error');
        }

        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const updateAProject = async (name, id, authToken) => {
    try {
        console.log(id, authToken);
        const response = await fetch(`https://todo-application-gs3f.onrender.com/project/updateAProject/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
            body: JSON.stringify({ name: name }),
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('Failed To Update Project Details Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const deleteProject = async (id, authToken) => {
    try {
        const response = await fetch(`https://todo-application-gs3f.onrender.com/project/deleteAProject/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "AuthToken": authToken,
            },
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('Failed To Delete Project Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}