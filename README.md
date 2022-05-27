# ideas

## About

This project is about practicing writing. At the begining of each week users are voting for the theme. Top 3 themes are selected. Your goal is to write an article or a story to combine all 3 themes.

## Technical solutions

Text editing is done with `editor.js` library.  
Authentication is done with telegram auth.

## DB confing

User –– user entity  
Post –– user's text  
Vote –– user's vote for the theme  
Theme –– theme for the posts  
![DB structure](readmeResouces/Post.png)

TODO:  
User interaction:

- back
  - Process old User changing username in Telegram
  - Process old User changing First or Last name in Telegram
  - Process old User changing photo in Telegram

Post interaction:

- back
  - Post update dto
  - Post create service (make themes addable)
  - Post delete service
  - Post update service
  - Post editor controller (first time –– create; second time –– update)
- front
  - Post view page (add themes)

Voting interaction:

- back
  - Cors politics for dev and prod domens (event controller)
  - Assign Vote for the socket call (addVote message)
  - Check if the Vote was already assigned (event service)
  - Retreat vote (retreatVote)
  - Check if the Vote could be retreated (event service)
- front
  - Script to send mesages on the event
  - Script to react on messages received

Auth interaction:
Telegram auth -> verifying cache -> create a jwt -> send jwt as a cookie
Interaction on the frontend -> reqest to bakcend -> check
