var userDetailsList = document.getElementById('userDetailsList');

function submitForm(event) {
  event.preventDefault();

  var date = document.getElementById('date').value;
  var email = document.getElementById('email').value;
  var time = document.getElementById('time').value;
  var phone = document.getElementById('phone').value;
  var name = document.getElementById('name').value;

  // Create userDetails object
  var userDetails = {
    date: date,
    email: email,
    time: time,
    phone: phone,
    name: name
  };

  // Add the userDetails object to the list
  addUserDetailsToList(userDetails);

  // Convert the userDetails object to a JSON string
  var userDetailsJSON = JSON.stringify(userDetails);

  // Store the userDetails JSON string in local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  var storedUserDetails = storedUserDetailsJSON ? JSON.parse(storedUserDetailsJSON) : [];

  if (!Array.isArray(storedUserDetails)) {
    // If the data is not an array, initialize an empty array
    storedUserDetails = [];
  }

  storedUserDetails.push(userDetails);
  localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));

  console.log('Submitted Data:');
  console.log('Date:', date);
  console.log('Email:', email);
  console.log('Time:', time);
  console.log('Phone:', phone);
  console.log('Name:', name);

  // Reset the form
  //document.getElementById('myForm').reset();
}

var userDetailsJSON = localStorage.getItem('userDetails');

if (userDetailsJSON) {
  // Parse the userDetails JSON string back to an object
  var storedUserDetails = JSON.parse(userDetailsJSON);

  // Add the retrieved user details to the list
  storedUserDetails.forEach(function(userDetails) {
    addUserDetailsToList(userDetails);
  });
}

function addUserDetailsToList(userDetails) {
  // Create list item element
  var listItem = document.createElement('li');

  // Create paragraph element for displaying user details
  var detailsParagraph = document.createElement('p');
  detailsParagraph.textContent =
    'Name: ' +
    userDetails.name +
    ', Email: ' +
    userDetails.email +
    ', Phone: ' +
    userDetails.phone +
    ', Date: ' +
    userDetails.date +
    ', Time: ' +
    userDetails.time;

  // Create delete button element
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    // Handle delete button click event
    deleteUserDetails(userDetails, listItem);
  });

  // Append the details paragraph and delete button to the list item
  listItem.appendChild(detailsParagraph);
  listItem.appendChild(deleteButton);

  // Append the list item to the user details list
  userDetailsList.appendChild(listItem);
}

function deleteUserDetails(userDetails, listItem) {
  // Retrieve the stored user details from local storage
  var storedUserDetailsJSON = localStorage.getItem('userDetails');
  if (storedUserDetailsJSON) {
    var storedUserDetails = JSON.parse(storedUserDetailsJSON);

    // Find the index of the user details to be deleted
    var index = -1;
    for (var i = 0; i < storedUserDetails.length; i++) {
      var item = storedUserDetails[i];
      if (
        item.name === userDetails.name &&
        item.email === userDetails.email &&
        item.phone === userDetails.phone &&
        item.date === userDetails.date &&
        item.time === userDetails.time
      ) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      // Remove the user details from the stored array
      storedUserDetails.splice(index, 1);

      // Update the local storage with the updated JSON string
      localStorage.setItem('userDetails', JSON.stringify(storedUserDetails));

      // Remove the list item from the user details list
      listItem.parentNode.removeChild(listItem);
    }
  }
}