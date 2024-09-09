document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('predictionForm');
    const resultDiv = document.getElementById('result');
    const submitButton = document.getElementById('submitBtn');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the normal way
        
        const textInput = document.getElementById('textInput').value;
        
        // Clear previous result
        resultDiv.innerHTML = '';
        
        // Show loading text
        resultDiv.innerHTML = '<p>Processing...</p>';
        
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'text_input': textInput
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display the result in the result div
            if (data.error) {
                resultDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
            } else {
                resultDiv.innerHTML = `<p>Prediction: ${data.result}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p style="color: red;">An error occurred</p>`;
        });
    });
});
