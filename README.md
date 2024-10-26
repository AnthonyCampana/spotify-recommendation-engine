## Spotify Recommendation 

Spotify Recommendation

* [x] Users can authenticate using their spotify credentials, to give the app access to user's account information

* [x] Users can select one or up two five of their most recently listened to artists to help assist in the recommendation.

* [x] Users can select one or up to five genres from the multi-select dropdown. This will only be visible once atleast one artist is selected from the previous step.

* [x] Users can submit their recommendation request by selecting the submit button on the middle of the screen. This will only be visible once the user has selected at least one genre.

* [x] Users can view the album image, artist name given from the spotify recommendation algorithm. 

* [x] Users can logout by clicking the "Logout" button at the top right of the screen. Once clicked users will be redirected unauthenticated home page. 

## Project Recording
<img src="videoWalkthrough.mp4" title="Video Walkthrough" alt="Spotify Recommendation engine video walkthrough" />

## Installation and Setup Instructions  
Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:
`npm install`  

To Run Test Suite:  
`npm test`  

To Start Server:
`npm start`  

To Visit App:
`http://localhost:3000/`  

## Reflection

* what is the context of this project ?
    * This project arose from my yurning to discovering new music. Having being exposed to a lot of different instruments, and different types of genres at a young age, Ive always had a deep interest in music. Due to this fondness towards music, being able to discover new artists and musics, lead me to create this application.

* What did you set out to build ?
    * When I designed and developed this application, I wanted user to to be able to receive music recommendation based and existing artists/music they already enjoy. After looking over the Spotify API documentation, I was able to refine my application functionality by being able to pull the user's 5 most recently to artist and an array of genres that users can use to receive a recommendation.    

* What were some unexpected obstacles ?
    * One unexpected obstacle I experienced during the development of this project was implementing the spotify authorization code flow. This proved to be challenging as the documentation was written using the express framework, while I was using React as my framework.  

* What tools did you use to implement this project ?
    * The tool used to develop this application was Javascript, but more specifically the React framework.