import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { Website, personCompRelation, Company, Person, CompanyOwners, partialRelationship } from '../interfaces/allInterfaces';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  allWebsites: Website[];
  allPeople: Person[];
  allCompanies: Company[];

  company1: Company;
  company1Holders: Company[];
  company1Subs: Company[];
  company1People: String[];

  company2: Company;
  company2Holders: Company[];
  company2Subs: Company[];
  company2People: String[];

  person: Person;
  personCompanies: String[];

  website: Website;
  webPerson: Person;
  webCompany: Company;

  personName: any;
  personWikipedia: any;
  url: any;
  relationship: any;
  companyName: any;
  companyWikipedia: any;
  partialOwnership: any;

  companyText = null;
  urlText = null;
  personText = null;

  constructor(private adminService: AdminServiceService) {
  }

  getWebsites() {
    this.adminService.getAllWebsites().subscribe(results => {
      this.allWebsites = results;
    });
  }

  getCompanies() {
    this.adminService.getAllCompanies().subscribe(results => {
      this.allCompanies = results;
    });
  }

  getPeople() {
    this.adminService.getAllPeople().subscribe(results => {
      this.allPeople = results;
    });
  }

  getComp1Lists() {
    this.adminService.getHoldingCompanies(this.company1.id).subscribe(results => {
      this.company1Holders = results;
    });
    this.adminService.getSubCompanies(this.company1.id).subscribe(results => {
      this.company1Subs = results;
    });
    this.adminService.getCompanyPeople(this.company1.id).subscribe(results => {
      results.forEach(element => {
        this.adminService.getRelationship(element, this.company1).subscribe(ret => {
          this.company1People = this.company1People.concat(element.personName + " (" + ret.relationship + ")")
        });
      });
    });
  }

  getComp2Lists() {
    this.adminService.getHoldingCompanies(this.company2.id).subscribe(results => {
      this.company2Holders = results;
    });
    this.adminService.getSubCompanies(this.company2.id).subscribe(results => {
      this.company2Subs = results;
    });
    this.adminService.getCompanyPeople(this.company2.id).subscribe(results => {
      results.forEach(element => {
        this.adminService.getRelationship(element, this.company2).subscribe(ret => {
          this.company2People = this.company2People.concat(element.personName + " (" + ret.relationship + ")")
        });
      });
    });
  }

  getPersonCompanies() {
    this.adminService.getPersonCompanies(this.person.id).subscribe(results => {
      results.forEach(element => {
        this.adminService.getRelationship(this.person, element).subscribe(ret => {
          this.personCompanies = this.personCompanies.concat(element.companyName + " (" + ret.relationship + ")")
        });
      });
    });
  }

  getWebsiteData() {
    this.adminService.getPersonById(this.website.personId).subscribe(results => {
      this.webPerson = results;
    });
    this.adminService.getCompanyById(this.website.companyId).subscribe(results => {
      this.webCompany = results;
    });
  }

  setWebsite(w: Website) {
    this.website = w;
    this.getWebsiteData();
  }

  setPerson(p: Person) {
    this.person = p;
    this.personCompanies = [];
    this.getPersonCompanies();
  }

  savePartialCompanyRelationship(){
    let partialRelation: partialRelationship = {
      id:null,
      partialOwnerId: this.company1.id,
      ownedCompanyId: this.company2.id, 
      relationship: this.partialOwnership
    }
    this.adminService.setPartialRelationship(partialRelation).subscribe(ret =>{
      location.reload();
    })
  }

  setCompany(c: Company) {
    if (this.company1 == null) {
      this.company1 = c;
      this.company1People = [];
      this.getComp1Lists();
    } else if (this.company1.id != c.id) {
      this.company2 = c;
      this.company2People = [];
      this.getComp2Lists();
    }
  }

  saveCompanyRelationship() {
    let compRel: CompanyOwners = {
      id: null,
      childCompanyId: this.company2.id,
      parentCompanyId: this.company1.id
    }
    console.log("id: " + this.company1.id);
    this.adminService.setNewCompanyOwnership(compRel).subscribe(ret => {
      
      this.company1 = null;
      this.company2 = null;
      location.reload();
    })
  }

  createNewPerson() {
    let newPerson: Person = {
      id: null,
      personName: this.personName,
      wikiLink: this.personWikipedia,
      companyRelationships: null
    }
    this.adminService.setNewPerson(newPerson).subscribe(ret => {
      this.personName = null;
      this.personWikipedia = null;
      location.reload();
    });
  }

  createNewWebsite() {
    let web: Website = {
      id: null,
      url: this.url,
      companyId: null,
      personId: null
    }
    if (this.company1 != null) {
      web.companyId = this.company1.id;
    } else {
      web.personId = this.person.id;
    }
    this.adminService.setNewWebsite(web).subscribe(ret => {
      this.url = null;
      location.reload();
    })
  }

  saveWebsiteCompanyData() {
    this.website.companyId = this.company1.id;
    this.website.personId = null;

    this.adminService.updateWebsite(this.website).subscribe(ret => {
      location.reload();
    })
  }

  saveWebsitePersonData() {
    this.website.companyId = null;
    this.website.personId = this.person.id;

    this.adminService.updateWebsite(this.website).subscribe(ret => {
      location.reload();
    })
  }

  savePersonCompanyRelationship() {
    let rel: personCompRelation = {
      id: null,
      companyId: this.company1.id,
      personId: this.person.id,
      relationship: this.relationship
    };
    this.adminService.setNewPersonCompanyRelation(rel).subscribe(ret => {
      this.relationship = null;
      location.reload();
    })
  }

  createNewCompany() {
    let comp: Company = {
      id: null,
      companyName: this.companyName,
      wikiLink: this.companyWikipedia,
      childCompanyRelationships: null,
      parentCompanyRelationships: null,
      personRelationships: null
    }
    this.adminService.setNewCompany(comp).subscribe(ret => {
      this.companyName = null;
      this.companyWikipedia = null;
      location.reload();
    })
  }

  clearData() {
    this.person = null;
    this.company1 = null;
    this.company2 = null;
    this.website = null;
    this.company1Holders = null;
    this.company1Subs = null;
    this.company1People = null;
    this.company2Holders = null;
    this.company2Subs = null;
    this.company2People = null;
    this.personCompanies = null;
    this.webCompany = null;
    this.webPerson = null;
    this.personName = null;
    this.personWikipedia = null;
    this.url = null;
    this.relationship = null;
    this.companyName = null;
    this.companyWikipedia = null;
  }

  ngOnInit() {
    this.getWebsites();
    this.getCompanies();
    this.getPeople();
  }

}
