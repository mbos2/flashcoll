export interface User {
  id: string,
  firstName: string,
  lastName: string,
  userImageURL: string,
  // githubUsername: string
}

export interface UserSocialNetworks extends User {
  facebookURL: string,
  githubProfileURL: string,
  instagramURL: string,
  twitterURL: string,
  portfolioURL: string,
  email: string
}