import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Movies';
  isDarkMode!:boolean;
  
  ngOnInit(): void {
    this.initializeTheme();
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setLocalStorage();
    this.initializeTheme();
  }
  setLocalStorage(){
    this.isDarkMode ? localStorage.setItem('theme' , 'dark') : localStorage.setItem('theme' , 'light')
  }
  initializeTheme(){
    const body = document.getElementsByTagName('body')[0];
    const theme = localStorage.getItem('theme');
    if(theme == 'dark'){
      this.isDarkMode = true;
      body.classList.add('dark-theme');
    }else{
      this.isDarkMode = false;
      body.classList.remove('dark-theme')
    }
  }
}
