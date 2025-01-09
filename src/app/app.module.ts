import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TodosComponent } from './pages/todos/todos.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { FilterComponent } from './components/filter/filter.component';
import { BtnComponent } from './components/btn/btn.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TodoMessageComponent } from './components/todo-message/todo-message.component';
import { TodoMessageFormComponent } from './components/todo-message-form/todo-message-form.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarComponent } from './components/calendar/calendar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    NavigationItemComponent,
    FooterComponent,
    LogoComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    TodosComponent,
    PageHeadingComponent,
    FilterComponent,
    BtnComponent,
    TodoItemComponent,
    TodoListComponent,
    ErrorMessageComponent,
    TodoMessageComponent,
    TodoMessageFormComponent,
    CreateTaskFormComponent,
    CalendarComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatTabsModule,
  ],
  providers: [provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
