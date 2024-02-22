import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { BASE_API_URL, SuccessStatus, ErrorStatus, Token } from '../constants/constants';
import { Router } from '@angular/router';
import { R3SelectorScopeMode } from '@angular/compiler';
import { LoginComponent } from '../components/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let response =  this.http.post(`${BASE_API_URL}/Account/Login/`, user, { headers })
    response.subscribe((res:any)=>{
      if(res.status == SuccessStatus){
        this.setToken(res.token)
      }
    });
    return response;  
  }

  register(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // console.log(this.http.post(`${BASE_API_URL}/Account/Register/`, user, { headers }));
    
    return this.http.post(`${BASE_API_URL}/Account/Register/`, user, { headers })
    
    
  }

  getUserIdFromToken(token: string): number | null {
    try {
      const payloadBase64 = token.split('.')[1];

      const payloadJson = atob(payloadBase64);

      const payload = JSON.parse(payloadJson);

      return payload.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  getAllUsers(): Observable<User[]> {
    return  this.http.get<User[]>(BASE_API_URL + "/Admin")
  }
  
  getUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(userId);
    
    return this.http.get(BASE_API_URL + `/Admin/${userId}`, { headers })
  }

  upsertUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(BASE_API_URL + "/Admin/upsertUser/", user, { headers }).pipe(
      map((response: any) => {
        if (response && response.status === SuccessStatus) {

          // console.log('User added successfully:', response.message);
        } else {
          console.error('Failed to add user:', response && response.error);
        }

        return response;
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }

  searchUsers(query: string): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Encode the query parameter to ensure it's properly formatted in the URL
    const encodedQuery = encodeURIComponent(query);

    return this.http.get(BASE_API_URL + `/Admin/Search?query=${encodedQuery}`, { headers }).pipe(
      map((response: any) => {
        if (response && response.status === SuccessStatus) {
          // Assuming the API response has a 'users' property containing the array
          return response.users as User[];
        } else {
          console.error('Failed to retrieve users:', response && response.error);
          return [];
        }
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError([]);
      })
    );
  }

  updateUserAccess(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Encode the query parameters to ensure they are properly formatted in the URL
    const encodedUserId = encodeURIComponent(userId.toString());


    return this.http.put(BASE_API_URL + `/Admin/Access/${userId}`, { headers }).pipe(
      map((response: any) => {
        if (response && response.status === SuccessStatus) {
          // Optionally handle successful update logic
          // console.log('User access updated successfully:', response.message);
        } else {
          console.error('Failed to update user access:', response && response.error);
        }

        return response;
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }

  updateProfile(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(BASE_API_URL + '/Home/profile', user, { headers }).pipe(
      map((response: any) => {
        if (response && response.status === SuccessStatus) {
          // Optionally handle successful update logic
          // console.log('Profile updated successfully:', response.message);
        } else {
          console.error('Failed to update profile:', response && response.error);
        }

        return response;
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }


  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete(BASE_API_URL + `/Home/Delete?id=${userId}`, { headers }).pipe(
      map((response: any) => {
        if (response && response.status === SuccessStatus) {
          // Optionally handle successful deletion logic
          // console.log('User deleted successfully:', response.message);
        } else {
          console.error('Failed to delete user:', response && response.error);
        }

        return response;
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }


  setToken(token: string) {
    localStorage.setItem(Token, token)
  }

  unsetToken() {
    localStorage.removeItem(Token);
  }

  getToken(): string {
    return localStorage.getItem(Token) as string;
  }

  IsLoggedIn(): boolean {
    return !!localStorage.getItem(Token);
  }
  IsAdmin():boolean {
    try {
      const payloadBase64 = this.getToken().split('.')[1];

      const payloadJson = atob(payloadBase64);

      const payload = JSON.parse(payloadJson);
      console.log(payload.isAdmin);
      
      return  payload.isAdmin == 'True';
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  isStrongPassword(password: string): boolean {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      return false;
    }

    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return false;
    }

    // If all criteria are met, the password is considered strong
    return true;
  }

}
