import { GrupaComponent } from './components/grupa/grupa.component';
import { AutorComponent } from './components/core/autor/autor.component';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { SmerComponent } from './components/smer/smer.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

const Routes = [
  { path: 'projekat', component: ProjekatComponent },
  { path: 'smer', component: SmerComponent },
  { path: 'grupa', component: GrupaComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'author', component: AutorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
