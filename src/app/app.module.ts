//Modulos de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Modulos propios

//Modulos externos

//Componentes
import { AppComponent } from './app.component';

//Otros
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from 'src/temps/temps';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig.firebase), AngularFirestoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
