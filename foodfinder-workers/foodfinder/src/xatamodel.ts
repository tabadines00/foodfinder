const xataClient = async (db: string, dbkey: string, query: string, params?: string[]): Promise<any> => {
    const response: any = await fetch(db, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + dbkey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statement: query, params: params ? params : [] })
    })
    console.log(response)
    
    return await response.json()
}

export const getUsers = async (db: string, dbkey: string): Promise<any[]> => {
    let query = "SELECT * FROM \"users\";"
    const users = await xataClient(db, dbkey, query)
    return users
}

export const getUser = async (db: string, dbkey: string, id: string): Promise<any> => {
    let query = "SELECT * FROM \"users\" WHERE xata_id=$1;"
    let params = [id]
    const user = await xataClient(db, dbkey, query, params)
    return user
}

export const createUser = async (db: string, dbkey: string, user: any): Promise<any> => {
    let query = "INSERT INTO \"users\" (email, first_name) VALUES ($1,$2) RETURNING *;"
    console.log(user.email, user.first_name)
    let params = [user.email, user.first_name]
    const res = await xataClient(db, dbkey, query, params)
    return res
}
