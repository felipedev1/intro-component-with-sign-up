document.getElementById('signup').addEventListener('submit', (event) => {
  event.preventDefault()
})

const fields = document.querySelectorAll('[required]')

function customValidation(event) {

  const field = event.target

  function verifyErrors() {
    let foundError = false
    for(let error in field.validity) {
      if(field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError
  }

  function setCustomMessage(fieldName, typeError) {
    const message = {
      text: {
        valueMissing: `${fieldName} cannot be empty`
      },
      email: {
        valueMissing: `${fieldName} cannot be empty`,
        typeMismatch: "Locks like this is not an email"
      },
      password: {
        valueMissing: `${fieldName} cannot be empty`,
      }
    }
    
    return  message[field.type][typeError]
  }

  
  const error = verifyErrors()

  const spanError = field.parentNode.querySelector('.error-message')
  const imgWarning = field.parentNode.querySelector('.warning')

  if(error) {
    const fieldName = field.placeholder
    spanError.innerHTML = setCustomMessage(fieldName, error)
    field.style.borderColor = 'red'
    imgWarning.style.display = 'block'
  } else {
    spanError.innerHTML = ""
    field.style.borderColor = 'green'
    imgWarning.style.display = 'none'
  }

}

for (field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener('blur', customValidation)
}