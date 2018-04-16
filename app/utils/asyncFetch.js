const CREDS = 'include'
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) { return response }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
const asyncFetch = async function (obj) {
  const url = obj.url
  const method = obj.method || 'GET'
  const credentials = obj.credentials || CREDS
  const body = obj.obj || null
  let confFetch = { method, credentials }
  if (method === 'POST') { confFetch = { method, credentials, body: JSON.stringify(body) } }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res) })
      .catch(err => { reject(err) })
  })
}

export default asyncFetch
