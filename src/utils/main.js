console.log("manin.js connected!!");

// scheduleService
const scheduleService2 = function (serviceType) {
  const serviceTypeInput = document.getElementById('scheduleService');
  switch (serviceType) {
    case 'One-Time Cleaning':
      serviceTypeInput.dataset.set = 'one-time';
      break;
    case 'Monthly Service':
      serviceTypeInput.dataset.set  = 'monthly';
      break;
    case 'Bi-Monthly Service':
      serviceTypeInput.dataset.set  = 'bi-weekly'; // Adjust as needed
      break;
    default:
      console.error('Invalid service type:', serviceType);
      return; // Do nothing if the service type is not found
  }
  // Open the modal after setting the initial values
  openModal();
};


// submit form
const submitForm = (event) => {
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(event.target);
  const data = {};

  // Handle checkboxes separately
  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  const serviceTypeInput = document.getElementById('scheduleService')
  const selectedFrequency = event.target.querySelector('input[name="frequency"]:checked');

  if (serviceTypeInput) {
    data['frequency'] = serviceTypeInput.dataset.set;
  }
  if (selectedFrequency) {
    data['frequency'] = selectedFrequency.value;
  }
  else {
    // Handle the case when the frequency is not found
    console.error('Frequency not selected');
    // You can provide a default value or display an error message to the user
  }

   const sheet_monkey_url ='https://api.sheetmonkey.io/form/pMsDbnMxfCMY1azX7RVjoP';
   // Make a POST request to the server
   fetch(sheet_monkey_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    // Handle the response from the server
    console.log('Server response:', result);
  })
  .catch(error => {
    console.error('Error sending data to the server:', error);
  });

  // Map service frequencies to corresponding Stripe product URLs
  const productURLs = {
    'monthly': 'https://buy.stripe.com/5kA8zscwD5V51AA5kl',
    'bi-weekly': 'https://buy.stripe.com/bIY170dAHabl1AA7su',
    'one-time': 'https://buy.stripe.com/4gw5nggMTerB0wwfYY',
  };
  console.log(productURLs[data['frequency']])

  // Check if the selected frequency exists in the map
  if ('frequency' in data && productURLs.hasOwnProperty(data['frequency'])) {
    window.open(productURLs[data['frequency']], '_blank');
  } else {
    // Handle the case when the selected frequency is not found
    console.error('Invalid frequency:', data['frequency']);
    // You can provide a fallback URL or display an error message to the user
  }

  closeModal();
};


// Function to open the modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}


// Function to trigger modal on price card click
function scheduleService(serviceType) {
  openModal();
  // You can customize the form based on the service type if needed
}
