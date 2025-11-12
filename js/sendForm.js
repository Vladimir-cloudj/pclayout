const sendForm = () => {
    const form = document.querySelector('.modal')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const text = form.querySelector('input[type=text]')
        const tel = form.querySelector("input[type=tel]");
        const email = form.querySelector("input[type=email]");

        const sendObj = {
            text: text.value,
            tel: tel.value,
            email: email.value
        }

        // fetch('https://jsonplcaeholder.typicode.com/todos/1')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Error')
        //         }
        //         return response.json()})
        //     .then(json => {})
        //     .catch(error => {console.warm(error.message);
        //     })

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(sendObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(response => response.json())
            .then(json => {console.log(json)
            .finally(() => {
                console.log('Форма очищена');
                
            })
            })
    })
}

sendForm()