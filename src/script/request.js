
const baseUrl = "http://localhost:6278/"

const getAllCompany = async () => {
    try{
        const request = await fetch(baseUrl + "companies")

        const response = await request.json()
        
        return response
    }catch(err) {
        console.log(err)
    }
}

const getCompanyBySector = async (filter) => {
    try{
        const request = await fetch(baseUrl + `companies/${filter}`)

        const response = await request.json()
        
        return response
    }catch(err) {
        console.log(err)
    }
}

export {
    getAllCompany,
    getCompanyBySector,
}