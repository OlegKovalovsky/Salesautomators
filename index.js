// API token for authenticating requests to the Pipedrive API
const API_TOKEN = 'aa5c20b7e87b8c683fec462334eac1b63718618f';

// Function for submitting the form
function submitForm() {
    // Finding the form submission button
    const button = document.querySelector('.create-job-button');
    
    // Changing the text and style of the button to indicate that the request is being sent
    button.textContent = 'Request is sent';
    button.style.backgroundColor = '#ff0000';
    button.style.color = '#fff';

    // Collecting data from the form fields to create a new person
    const personData = {
        name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    // Sending a POST request to create a new person
    fetch(`https://api.pipedrive.com/v1/persons?api_token=${API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
    })
    // Handling the response to the person creation request
    .then(response => response.json())
    .then(personResponse => {
        if (personResponse.success) {
            // If the person is successfully created, save their ID
            const personId = personResponse.data.id;

            // Collecting data from the form fields to create a new deal
            const dealData = {
                title: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value} - ${document.getElementById('jobType').value}`,
                person_id: personId,
                custom_fields: {
                    'address': document.getElementById('address').value,
                    'city': document.getElementById('city').value,
                    'state': document.getElementById('state').value,
                    'zip_code': document.getElementById('zipCode').value,
                    'area': document.getElementById('area').value,
                    'start_date': document.getElementById('startDate').value,
                    'start_time': document.getElementById('startTime').value,
                    'end_time': document.getElementById('endTime').value,
                    'test_select': document.getElementById('testSelect').value
                }
            };

            // Sending a POST request to create a new deal
            fetch(`https://api.pipedrive.com/v1/deals?api_token=${API_TOKEN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dealData)
            })
            // Handling the response to the deal creation request
            .then(response => response.json())
            .then(dealResponse => {
                if (dealResponse.success) {
                    // If the deal is successfully created, display a success message and log the response
                    alert('Deal created successfully');
                    console.log(dealResponse);
                } else {
                    // If there is an error creating the deal, display an error message and log the response
                    alert('Error creating deal: ' + JSON.stringify(dealResponse));
                    console.log(dealResponse);
                }
            })
            // Handling errors when creating the deal
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // If there is an error creating the person, display an error message and log the response
            alert('Error creating person: ' + JSON.stringify(personResponse));
            console.log(personResponse);
        }
    })
    // Handling errors when creating the person
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function for saving information (placeholder)
function saveInfo() {
    // Implementation of the save information function will go here
}
