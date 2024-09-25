"use server"
import userName from "@/app/api/server/models/UserProject";
import connectToUserProjectDatabase from "@/app/api/server/lib/userProjectMongodb";

const userCreate = async (parameter,proName) => {
    console.log(parameter,proName)
    await connectToUserProjectDatabase()
    const createUser = await userName(parameter)
    const createProject = new createUser(
        {
            projectname: proName
        }
    )
    try {
        await createProject.save()
        return true
    }
    catch (error) {
        return false
    }
}

export default userCreate