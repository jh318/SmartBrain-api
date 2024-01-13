const handleApiCall = (req, res, fetch) => {
  const imageUrl = req.body.input
  const returnClarifaiRequestOptions = (url) => {

    const PAT = '';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = '';       
    const APP_ID = '';

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: url,
            },
          },
        },
      ],
    })

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Authorization': 'Key ' + PAT
      },
      body: raw,
    }
    return requestOptions
  }

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/outputs`,
    returnClarifaiRequestOptions(imageUrl)
  )
    .then((response) => response.text())
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.status(400).json("unable to work with API"))
}

handleImage = (req, res, db) => {
  const { id } = req.body
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries)
    })
    .catch((err) => res.status(400).json("unable to get count"))
}

module.exports = {
  handleImage,
  handleApiCall,
}