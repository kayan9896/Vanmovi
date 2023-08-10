# VanMovie App

### Team Members

Xiaoyang Zhao, Zhi Liu, Ziqi Fo

### Data Model

The data model of VanMovie app includes the following three collections:

#### 1. Movies

##### Description:

the latest popular movies displayed in Vancouver

##### Attributes:

movieID: unique identifier of the movie

name: name of the movie

releaseDate: release date of the movie

genres: genres which the movie belongs to

runTime: playing time of the movie

posterPath: URL of the movie poster

overview: overall description of the movie

#### 2. Comments:

##### Description:

the movie comments submitted by app users

##### Attributes:

commentID: unique identifier of the comment

userID: unique identifier of the user

movieID: unique identifier of the movie

userName: name of the user

submitDate: date of the comment submitted

content: content of the comment

#### 3. Cinemas:

##### Description:

the Cineplex cinemas in Vancouver

##### Attributes:

cinemaID: unique identifier of the cinema

cinemaName: name of the cinema

location: address of the cinema
