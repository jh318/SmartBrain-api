//const Clarifai require('clarifai');


const returnClarifaiJSONRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'b4cb2fd837f448208f4c2a3be363b9e1';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'jh318';       
  const APP_ID = 'my-first-application-r7vgek';
  // Change these to whatever model and image URL you want to use
  //const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;
  
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
   body: raw
  };

  return requestOptions;
}

const handleApiCall = (req, res) => {
	fetch("https://api.clarifai.com/v2/models/" +  'face-detection'  + "/outputs", 
	returnClarifaiJSONRequestOptions(req.body.input)
	)
	.then(console.log)
	.then(data => { res.json(data); })
	//.then(response => response.json())
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}