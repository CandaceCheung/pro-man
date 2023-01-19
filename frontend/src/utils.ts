export class MakeRequest {
    constructor(private token: string) {}

    get = async <R extends {}>(path: string): Promise<R> => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}${path}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });

        return await res.json();
    };

    post = async <T extends {}, R extends {}>(path: string, reqestBody: T): Promise<R> => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(reqestBody)
        });

        return await res.json();
    };

    put = async <T extends {}, R extends {}>(path: string, reqestBody: T): Promise<R> => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(reqestBody)
        });

        return await res.json();
    };

    delete = async <T extends {}, R extends {}>(path: string, reqestBody: T): Promise<R> => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(reqestBody)
        });

        return await res.json();
    };
}
