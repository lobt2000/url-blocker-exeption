import { Component, OnInit } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface User {
  email: string;
  password: string,
  url: Array<any>
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-chrome-extension';
  url: any;
  currUrl: string = '';
  users: Array<User> = [];
  user: User = {
    email: '',
    password: '',
    url: []
  };
  tab = {
    login: 'login',
    registration: 'registration',
    blocker: 'blocker'
  }
  state: string = '';
  signUpForm: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });
  signInForm: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });

  constructor(private firestore: Firestore, private fb: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCurrentTab();
    chrome.storage.sync.get('user', (items) => {
      console.log(items);

    });

    const collections: any = collection(this.firestore, 'users');

    collectionData(collections).subscribe((res) => {
      console.log(res);
      let user: Array<User> = res.map(el => {
        return {
          email: el['email'],
          password: el['password'],
          url: el['url'] || []
        }
      })
      this.users = [...user];
    })

    setTimeout(() => {
      console.log(this.url);
      // if(this.user)
      // chrome.storage.sync.set([{key: this.url}, {key: this.url}], () => {
      //   console.log('Value is set to ' + this.url);
      // });
    }, 1000)

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        files: ['./assets/infect.js']
      //   func: updateBackgroundColor,
      //   args: [this.color]
      });
    });
  }

  async getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    this.url = tab.url;
  }

  signUp() {
    // console.log(this.users[0].password.trim() == this.password);
    if (!this.users.some(res => res.email == this.signUpForm.value.email) && this.signUpForm.valid) {
      setDoc(doc(this.firestore, "users", `${uuidv4()}`), {
        ...this.signUpForm.getRawValue(),
        url: []
      })
      this.state = this.tab.blocker;
      this.user = { ...this.signUpForm.getRawValue(), url: [] }
    }
  }

  signIn() {
    // console.log(this.users[0].password.trim() == this.password);
    if (this.users.some(res => res.email == this.signInForm.value.email && res.password == this.signInForm.value.password) && this.signInForm.valid) {
      this.state = this.tab.blocker;
      this.user = this.users.find(res => res.email == this.signInForm.value.email) || { ...this.signInForm.getRawValue(), url: [] };
    }
  }

  goToSignInTab() {
    this.state = this.tab.login;
  }

  goToSignUpTab() {
    this.state = this.tab.registration;
  }

  addUrlToUser() {
    this.user.url.push(this.url);
    this.currUrl = '';
  }
}
