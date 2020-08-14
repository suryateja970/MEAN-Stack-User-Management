import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private router:Router) { }

  BaseUrl="http://localhost:3000"
  isAuthenticated()
  {
    console.log("is authenticated")
    return !!localStorage.getItem('token')
  }
gettoken()
{
  return localStorage.getItem('token')
}
login(loginForm)
{
  return this.http.post(this.BaseUrl+'/user/login',loginForm)
}
  register(regForm)
  {
   return this.http.post(this.BaseUrl+'/user/register',regForm)
  }
logout()
{
  localStorage.clear();
  this.router.navigate(['/login'])

}

createnote(note)
{
  return this.http.post(this.BaseUrl+'/note/cn',note)
}
getnote()
{
  return this.http.get(this.BaseUrl+'/note/rn')
}
getsinglenote(id)
{
  return this.http.get(this.BaseUrl+'/note/sn?_id='+id);
}
updatenote(id,data)
{
  return this.http.put(this.BaseUrl+'/note/un/'+id,data)
}
deletenote(id)
{
  console.log("service")
  return this.http.delete(this.BaseUrl+'/note/dn/'+id)
}
}
