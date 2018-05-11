const users = [
    {
        id: '1',
        name: 'Jaison pereira',
        email: 'teste@teste'
    },
    {
        id: '2',
        name: 'roberto',
        email: 'teste@teste'
    }
]


export class User {
    static findAll(): Promise<any[]> {
        return Promise.resolve(users)
    }

    static findById(id: string): Promise<any> {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id == id);
            let user = undefined
            if (filtered.length > 0) {
                user = filtered[0]
            }
            resolve(user)
        })


    }


}