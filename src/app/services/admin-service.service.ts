import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Website, personCompRelation, Company, Person, CompanyOwners, partialRelationship} from '../interfaces/allInterfaces';



@Injectable()
export class AdminServiceService {
  // removed for security 
  baseUrl = '';
  //baseUrl = 'http://localhost:8080/';
  websiteByUrl = this.baseUrl + 'getWebsiteByUrl';
  allSites = this.baseUrl + 'getAllWebsites';
  allUrls = this.baseUrl + 'getAllUrls';
  companyById = this.baseUrl + 'getCompanyById?id=';
  personById = this.baseUrl + 'getPersonById?id=';
  allCompanies = this.baseUrl + 'getAllCompanies';
  allPeople = this.baseUrl + 'getAllPeople';
  personCompanies = this.baseUrl+'getRelatedCompaniesByPersonId?id=';
  subCompanies = this.baseUrl+'getSubCompaniesById?id=';
  holdingCompanies = this.baseUrl+'getHoldingCompaniesById?id=';
  companyPeople = this.baseUrl+'getCompanyPeopleById?id=';
  setNewComp = this.baseUrl+'setNewCompany';
  setNewPers = this.baseUrl+'setNewPerson';
  setNewWeb = this.baseUrl+'setNewWebsite';
  setNewPersonCompanyRel = this.baseUrl+'setNewPersonCompanyRelation';
  setNewCompanyOwn = this.baseUrl+'setNewCompanyOwnership';
  updateWeb = this.baseUrl+'updateWebsite';
  relationsByIds = this.baseUrl+'getRelationshipFromCompanyAndPerson?';
  setNewPartialOwnership = this.baseUrl+'setNewCompanyPartialRelationship';
  constructor(private http: HttpClient) { }

  getAllWebsites(): Observable<Website[]> {
    console.log("sites " + this.allSites);
    return this.http.get<Website[]>(this.allSites);
  }

  getAllCompanies(): Observable<Company[]> {
    console.log("sites " + this.allCompanies);
    return this.http.get<Company[]>(this.allCompanies);
  }

  getAllPeople(): Observable<Person[]> {
    console.log("sites " + this.allCompanies);
    return this.http.get<Person[]>(this.allPeople);
  }

  getRelationship(person:Person, company:Company){
    return this.http.get<personCompRelation>(this.relationsByIds+'personId='+person.id+'&companyId='+company.id);
  }

  getHoldingCompanies(id:any){
    return this.http.get<Company[]>(this.holdingCompanies + id);
  }

  getSubCompanies(id:any){
    return this.http.get<Company[]>(this.subCompanies + id);
  }

  getPersonCompanies(id:any): Observable<Company[]> {
    return this.http.get<Company[]>(this.personCompanies + id);
  }

  getCompanyPeople(id:any){
    return this.http.get<Person[]>(this.companyPeople+id);
  }

  getPersonById(id:any){
    return this.http.get<Person>(this.personById+id);
  }

  getCompanyById(id:any){
    return this.http.get<Company>(this.companyById+id);
  }

  setNewCompany(c:Company): Observable<Company>{
    return this.http.post<Company>(this.setNewComp, c)
  }

  setNewPerson(c:Person): Observable<Person>{
    return this.http.post<Person>(this.setNewPers, c)
  }

  setNewWebsite(c:Website): Observable<Website>{
    return this.http.post<Website>(this.setNewWeb, c)
  }

  updateWebsite(c:Website): Observable<Website>{
    return this.http.post<Website>(this.updateWeb, c)
  }

  setNewPersonCompanyRelation(c:personCompRelation): Observable<personCompRelation>{
    return this.http.post<personCompRelation>(this.setNewPersonCompanyRel, c)
  }

  setNewCompanyOwnership(c:CompanyOwners): Observable<CompanyOwners>{
    return this.http.post<CompanyOwners>(this.setNewCompanyOwn, c)
  }

  setPartialRelationship(pc: partialRelationship): Observable<partialRelationship>{
    return this.http.post<partialRelationship>(this.setNewPartialOwnership, pc)
  }
}
