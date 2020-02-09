export default {
    get: () => {
        return Promise.resolve({
            data: [
                {
                    timeline: {
                        id: 1
                    },
                    id: 2,
                    name: "Old Valley"
                },
                {
                    timeline: {
                        id: 1
                    },
                    id: 3,
                    name: "Little Feather Ln"
                }
            ]
        });
    }
}