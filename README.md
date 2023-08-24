# VanMovie App

## Overview
VanMovie App is a user-friendly platform designed for movie enthusiasts offering the latest insights into popular movies in Vancouver. The app boasts a rich database, coupled with interactive features to elevate the user experience.

### Team Members & Contributions

**Xiaoyang Zhao**:
- 🎬 Successfully integrated the TMDB API and Cineplex API.
- 📊 Laid the groundwork by providing foundational data for the app.
- 📍 Incorporated a location feature for displaying cinema and user locations.
- 🔍 Introduced an advanced search functionality to ease movie discovery.
- 🔄 Ensured real-time data synchronization with APIs for up-to-date movie information.

**Zhi Liu**:
- 📸 Spearheaded the integration of the camera functionality.
- 🖼️ Enhanced user experience through personal information page design.
- 📝 Developed the registration and login interfaces.
- 🛡️ Implemented security measures for user data protection.
- ⚙️ Optimized app performance, ensuring smooth user interactions.

**Ziqi Fo**:
- 📡 Led the data-fetching process from various APIs.
- 🎨 Oversaw app page design, layout, and aesthetics.
- 🔎 Actively involved in bug detection and resolution.
- 🔔 Incorporated a real-time notification feature.
- 💡 Introduced innovative features based on user feedback for continuous improvement.

### Data Model
The VanMovie app's data model encompasses three primary collections:

#### 1. **Movies**

**Description**:  
Latest popular movies being showcased in Vancouver.

**Attributes**:
- `movieID`: Unique identifier of the movie.
- `name`: Name of the movie.
- `releaseDate`: Release date of the movie.
- `genres`: List of genres the movie belongs to.
- `runTime`: Duration of the movie.
- `posterPath`: URL leading to the movie's poster.
- `overview`: Brief description of the movie.

#### 2. **Comments**
**Description**:  
Compilation of reviews and feedback by the app's users.

**Attributes**:
- `commentID`: Unique identifier for the comment.
- `userID`: Identifier of the user who submitted the comment.
- `movieID`: Pertinent movie's identifier.
- `userName`: Commenting user's name.
- `submitDate`: Date of comment submission.
- `content`: Comment content.

#### 3. **Cinemas**



## About Iteration3, what do we have so far:  
### API Integrations
- 🎬 **TMDB API**: This API provides our app with current and popular movies, enriching the movie database.
- 🌏 **Google Map API**: Integrated to display nearby cinemas to users in real-time.
- 🎥 **Cineplex API**: Another valuable source for our movie and cinema database.

### Features & Progress

- **Homepage**:
  - Display of trending movies ensures users are always updated with the cinema world.
  - Detailed view: Users can click on any movie to dive deeper into its synopsis, runtime, and more.
  - Reviews: After viewing the movie details, users can drop their opinions and ratings.
  - 🎲 **Random Movie Recommendation**: A unique button on the homepage surprises users by suggesting a random movie genre.
![Vanmovi1](https://github.com/kayan9896/Vanmovi/assets/122495175/a8235203-b17f-4cd6-89f6-d035ecb2351c)

- **Cinemas Page**:
  - 📍 **Cinema Locator**: Utilizing the Google Map API, users can visually locate nearby cinemas.
  - 📜 A neat list of nearby cinemas is also provided for users who prefer a textual view.
![Vanmovi2](https://github.com/kayan9896/Vanmovi/assets/122495175/7dcfce75-e0ad-42a8-ae09-159550832fd1)

- **Profile Section (Top Right Corner)**:
  - 🖼️ **User Avatar**: Displayed prominently, users can easily change or update their profile picture.
    - 📷 Camera Integration: Users have the option to take a new photo using the device's camera.
    - 📂 Local Photo Upload: Alternatively, users can choose a photo from their device's local storage for the avatar.
  - 📧 User's registered email is shown for easy reference.
  - 💬 **User Comments**: All the reviews and comments made by the user are neatly organized here.
    - 🔧 Edit & Delete: Users have the flexibility to edit their avatars or even delete specific comments they've made in the past.
![Vanmovi3](https://github.com/kayan9896/Vanmovi/assets/122495175/bcf43593-e0b0-4ac3-9761-4ce5fd696dc2)

---
This README reflects the current status of the VanMovie app, highlighting the features and integrations that make our platform unique and user-centric.
