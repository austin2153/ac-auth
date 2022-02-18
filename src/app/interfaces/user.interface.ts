export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // token retrieval getter
  get token(){
    // return null if empty or expired
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}



// Property Name	Type	Description
// idToken	string	A Firebase Auth ID token for the authenticated user.
// email	string	The email for the authenticated user.
// refreshToken	string	A Firebase Auth refresh token for the authenticated user.
// expiresIn	string	The number of seconds in which the ID token expires.
// localId	string	The uid of the authenticated user.
// registered	boolean	Whether the email is for an existing account.